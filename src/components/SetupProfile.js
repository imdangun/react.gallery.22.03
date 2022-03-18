import {useNavigation, useRoute} from '@react-navigation/native'
import React, {useState} from 'react'
import {StyleSheet, View, Pressable, Image, ActivityIndicator} from 'react-native'
import {signOut} from '../lib/auth'
import {createUser} from '../lib/users'
import BorderedInput from './BorderedInput'
import CustomButton from './CustomButton'
import {useUserContext} from '../contexts/UserContext'
import {launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

function SetupProfile() {
    const [displayName, setDisplayName] = useState('')
    const navigation = useNavigation()
    const {setUser} = useUserContext()
    const [response, setResponse] = useState(null)

    const {params} = useRoute()
    const {uid} = params || {}

    const [loading, setLoading] = useState(false)
    const onSubmit = async () => {
        setLoading(true)
        let photoUrl = null

        if(response) {
            const asset = response.assets[0]
            const extension = asset.fileName.split('.').pop()
            const reference = storage().ref(`/profile/${uid}.${extension}`)
            console.log('hi', reference)
         
            await reference.putString(asset.base64, 'base64', {
                contentType: asset.type,
            })

            photoUrl = response ? await reference.getDownloadURL() : null
        }

        const user = {
            id: uid,
            displayName,
            photoUrl
        }
        createUser(user)
        setUser(user)
    }

    const onCancel = () => {
        signOut()
        navigation.goBack()
    }

    const onSelectImage = () => {       
        launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 512,
            maxHeight: 512,
            includeBase64: true
        }, res => {
            if(!res.didCancel) setResponse(res)
        })
    }

    return (
        <View style={styles.block}>
            <Pressable style={styles.circle} onPress={onSelectImage}>
                <Image style={styles.circle} source={
                    response ? {uri: response?.assets[0]?.uri} :
                        require('../assets/basic_profile_img.png')}/>
            </Pressable>
            <View style={styles.form}>
                <BorderedInput
                    placeholder='닉네임'
                    value={displayName}
                    onChangeText={setDisplayName}
                    onSubmitEditing={onSubmit}
                    returnKeyType='next'/>
                {loading ? (
                    <ActivityIndicator size={32} color='#6200ee' style={styles.spinner}/>
                ) : (
                    <View style={styles.buttons}>
                        <CustomButton title='다음' onPress={onSubmit} hasMarginBottom/>
                        <CustomButton title='취소' onPress={onCancel} theme='secondary'/>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 16,
        width: '100%'
    },
    circle: {
        backgroundColor: '#cdcdcd',
        borderRadius: 64,
        width: 128,
        height: 128
    },
    form: {
        marginTop: 16,
        width: '100%'
    },
    buttons: {
        marginTop: 48
    }
})

export default SetupProfile