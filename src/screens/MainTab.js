import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {useUserContext} from '../contexts/UserContext'

function MainTab() {
    const {user} = useUserContext()
    return (
        <View style={styles.block}>
            {user.photoUrl && (
                <Image source={{uri: user.photoUrl}}
                    style={{width: 128, height: 128, marginBottom: 16}}
                    resizeMode='cover'/>
            )}
            <Text style={styles.text}>Hello, {user.displayName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 24
    }
})

export default MainTab