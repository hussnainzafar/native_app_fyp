import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import GeneralStyles from '../../styles/GeneralStyles';
import Icon from "react-native-vector-icons/FontAwesome5";

export const DashBoardSection = ({ sectionHeading, onPressViewAll }) => {
    return (
        <View style={[GeneralStyles.rowDirection, { marginStart: 30, marginEnd: 30, marginTop: 10, marginBottom: 10 }]}>
            <View style={GeneralStyles.defaultFlex}>
                <Text style={{ color: '#514C4C', fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start' }}>{sectionHeading}</Text>
            </View>
            <TouchableOpacity
                onPress={onPressViewAll}
            >
                <View style={[GeneralStyles.rowDirection, GeneralStyles.defaultFlex, { alignSelf: 'flex-end', marginTop: 5 }]}>
                    <Text style={GeneralStyles.viewAll}>View all</Text>
                    <Icon style={{ marginTop: Platform.OS == 'android' ? 4:3, marginStart: 4 } }
                        name='chevron-right'
                        color='#969696'
                        size={10} />
                </View>
            </TouchableOpacity>
        </View>
    )
}