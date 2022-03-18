import React, {useState} from 'react'
import {View, Pressable, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import UploadModeModal from './UploadModeModal'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'

const TABBAR_HEIGHT = 49

const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: true
}

function CameraButton() {
    const [modalVisible, setModalVisible] = useState(false)
    const bottom = TABBAR_HEIGHT / 2
    const navigation = useNavigation()

    const onPickImage = res => {
        if(!res.didCancel || res) navigation.push('Upload', {res})
    }

    const onLaunchCamera = () => launchCamera(imagePickerOption, onPickImage)
    const onLaunchImageLibrary = () => launchImageLibrary(imagePickerOption, onPickImage)

    const onPress = () => setModalVisible(true)

    return (
        <>
            <View style={[styles.wrapper, {bottom}]}>
                <Pressable 
                    android_ripple={{color: '#ffffff'}}
                    style={styles.circle}
                    onPress={() => setModalVisible(true)}>
                    <Icon name='camera-alt' color='white' size={24}/>
                </Pressable>
            </View>
            <UploadModeModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLaunchCamera={onLaunchCamera}
                onLaunchImageLibrary={onLaunchImageLibrary}/>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 5,
        borderRadius: 27,
        height: 54,
        width: 54,
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -27}],
        elevation: 5,
        overflow: 'hidden'
    },
    circle: {
        backgroundColor: '#6200ee',
        borderRadius: 27,
        height: 54,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CameraButton