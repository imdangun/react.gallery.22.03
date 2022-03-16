import React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import CustomButton from '../components/CustomButton'
import {useNavigation} from '@react-navigation/native'

function SignButtons({isSignUp, onSubmit, loading}) {
    const navigation = useNavigation()
    const primaryTitle = isSignUp ? '회원가입' : '로그인'
    const secondaryTitle = isSignUp ? '로그인' : '회원가입'

    const onSecondaryButtonPress = () => {
        if(isSignUp) navigation.goBack()
        else navigation.push('SignIn', {isSignUp: true})
    }

    const component = loading ? (
        <View style={styles.spinnerWrapper}>
            <ActivityIndicator size={32} color='#6200ee'/>
        </View>
    ) : ( 
        <View style={styles.buttons}>
            <CustomButton 
                title={primaryTitle}                 
                onPress={onSubmit}
                hasMarginBottom/>
            <CustomButton 
                title={secondaryTitle}
                onPress={onSecondaryButtonPress}
                theme='secondary'/>
        </View>   
    )

    return component
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 64
    },
    spinnerWrapper: {
        marginTop: 64,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignButtons