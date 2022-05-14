import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
var widthContainer = Dimensions.get('window').width

export default class NGOListItem extends Component {

    render() {
        return (
            <CardView
                cardElevation={3}
                cornerRadius={15}
                style={styles.mainContainer}>
                <Image source={require('../../../assets/rations_splash_logo.png')}
                    resizeMode='contain'
                    style={{ height: 50, width: 50, borderRadius: 10, }} />

                <View
                    style={styles.userInfo}>
                    <Text
                        numberOfLines={1}
                        style={[styles.username, { width: widthContainer - 200 }]}>
                        Jazib Umer 
                        </Text>
                    <Text
                        style={styles.location}>
                        Lahore, Pakistan
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.follow}>
                    <Image
                        source={require('../../../assets/ic_heart.png')}
                        resizeMode='contain'
                        style={styles.inActiveHeart} />
                </TouchableOpacity>
            </CardView>
        );
    }
}
