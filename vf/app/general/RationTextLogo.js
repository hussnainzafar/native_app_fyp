import React from 'react'
import {  View, Image } from 'react-native'

export const RationTextLogo = ({  ImageStyle }) => {
    return (
        <View>
            <Image resizeMode='contain' source={require('../assets/rations_splash_logo.png')} style={ImageStyle} />
        </View>
    )
}