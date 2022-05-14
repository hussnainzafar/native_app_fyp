import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import GeneralStyles from '../../styles/GeneralStyles';
import CardView from 'react-native-cardview'

export const DashBoardHeader = ({ onPressLeft, heading, icon, showRight, onPressRight, iconRight }) => {
    return (
        <View>
            <CardView
                cardElevation={2}
                cornerRadius={10}
                style={{
                    marginBottom: 5, marginTop: -10, backgroundColor: '#fff', justifyContent: 'center'
                }} >
                <View style={{ alignSelf: 'center', position: 'absolute', top: showRight ? 22 : 15 }}>
                    <Text style={{ alignSelf: 'center', fontSize: showRight ? 20 : 25, fontWeight: 'bold', color: '#514C4C', }}>
                        {heading}
                    </Text>
                </View>
                <View style={[GeneralStyles.rowDirection, { padding: 15 }]}>
                    <TouchableOpacity onPress={onPressLeft}>
                        <Image source={icon}
                            resizeMode='contain'
                            style={{ height: 20, width: 20, marginTop: 10, alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={[GeneralStyles.defaultFlex,]}>

                        {showRight ? <TouchableOpacity onPress={onPressRight}>
                            <Image source={iconRight}
                                resizeMode='contain'
                                style={{ height: 25, width: 25, marginTop: 5, marginEnd: 10, alignSelf: 'flex-end' }} />
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </CardView>
        </View>
    )
}