import React from 'react'
import {StyleSheet, View, Pressable, Text} from 'react-native'

function CustomBottom({onPress, title, hasMarginBottom}) {
    return (
        <View style={[hasMarginBottom && styles.margin]}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    overflow: {
        borderRadius: 4,
        overflow: 'hidden'
    },
    wrapper: {
        borderRadius: 4,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200ee'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },
    margin: {
        marginBottom: 8
    }
})

export default CustomBottom