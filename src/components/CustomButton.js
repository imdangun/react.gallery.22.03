import React from 'react'
import {StyleSheet, View, Pressable, Text} from 'react-native'

function CustomBotton({onPress, title, hasMarginBottom, theme}) {
    const isPrimary = theme === 'primary'

    return (
        <View style={[hasMarginBottom && styles.margin]}>
            <Pressable 
                onPress={onPress}
                style={[styles.wrapper, isPrimary && styles.primaryWrapper]}
                android_ripple={{color: isPrimary ? '#ffffff' : '#6200ee'}}>
                <Text style={[styles.text, 
                    isPrimary ? styles.primaryText : styles.secondaryText]}>
                    {title}
                </Text>
            </Pressable>
        </View>
    )
}

CustomBotton.defaultProps = {
    theme: 'primary'
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
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },
    margin: {
        marginBottom: 8
    },
    primaryWrapper: {
        backgroundColor: '#6200ee'
    },
    primaryText: {
        color: 'white'
    },
    secondaryText: {
        color: '#6200ee'
    }
})

export default CustomBotton