import React, {useRef} from 'react'
import BorderedInput from './BorderedInput'

function SignForm({isSignUp, onSubmit, form, onChangeText}) {
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    return (
        <>
            <BorderedInput
                placeholder='이메일'                
                value={form.email}
                onChangeText={value => onChangeText({name: 'email', value})}
                autoCompleteType='email'
                keboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current.focus()}
                hasMarginBottom/>
            <BorderedInput
                placeholder='비밀번호'               
                value={form.password}
                onChangeText={value => onChangeText({name: 'password', value})}                
                returnKeyType={isSignUp ? 'next' : 'done'}
                onSubmitEditing={() => {
                    if(isSignUp) confirmPasswordRef.current.focus()
                    else onSubmit()
                }}
                ref={passwordRef}
                hasMarginBottom={isSignUp}
                secureTextEntry/>
            {isSignUp && (
                <BorderedInput
                    placeholder='비밀번호확인'
                    value={form.confirmPassword}
                    onChangeText={value => onChangeText({name: 'confirmPassword', value})}
                    returnKeyType='done'
                    onSubmitEditing={onSubmit}
                    ref={confirmPasswordRef}
                    secureTextEntry/>
            )}
        </>
    )
}

export default SignForm