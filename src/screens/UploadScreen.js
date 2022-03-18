import React, {useEffect, useRef, useState, useCallback} from 'react'
import {StyleSheet, View, TextInput, Image, 
    useWindowDimensions, Animated, Keyboard} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'
import IconRightButton from '../components/IconRightButton'
import storage from '@react-native-firebase/storage'
import {useUserContext} from '../contexts/UserContext'
import {v4} from 'uuid'
import {createPost} from '../lib/posts'

function UploadScreen() {
    const route = useRoute()
    const {res} = route.params || {}
    const {width} = useWindowDimensions()
    const animation = useRef(new Animated.Value(width)).current
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const [description, setDescription] = useState('')

    const navigation = useNavigation()

    const {user} = useUserContext()
    const onSubmit = useCallback(async () => {
        navigation.pop()
        const asset = res.assets[0]

        const extension = asset.fileName.split('.').pop()
        const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`)
        await reference.putString(asset.base64, 'base64', {
            contentType: asset.type
        })
        const photoUrl = await reference.getDownloadURL()
        await createPost({description, photoUrl, user})
    }, [res, user, description, navigation])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name='send'/>
        })
    }, [navigation, onSubmit])

    useEffect(() => {
        const didShow = Keyboard.addListener('keyboardDidShow', () =>
            setIsKeyboardOpen(true)
        )

        const didHide = Keyboard.addListener('keyboardDidHide', () => 
            setIsKeyboardOpen(false)
        )

        return () => {
            didShow.remove()
            didHide.remove()
        }
    }, [])

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isKeyboardOpen ? 0 : width,
            useNativeDriver: false,
            duration: 150,
            delay: 100
        }).start()
    }, [isKeyboardOpen, width, animation])

    return (
        <View style={styles.block}>
            <Animated.Image source={{uri: res.assets[0]?.uri}}
                style={[styles.image, {height: animation}]}
                resizeMode='cover'/>
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder='사진에 대한 설명을 기술하세요.'
                textAlignVertical='top'
                value={description}
                onChangeText={setDescription}/>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    image: {width: '100%'},
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16
    }
})

export default UploadScreen