import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";

export const Header = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Icon style={{ margin: 15 }} name='chevron-left' color='#F39015' size={25} />
            </TouchableOpacity>
        </View>
    )
}