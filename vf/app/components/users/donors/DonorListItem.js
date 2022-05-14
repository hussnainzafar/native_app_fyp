import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
var widthContainer = Dimensions.get('window').width

export default class DonorListItem extends Component {

    state = {
        isFavorite: false
    }
    render() {
        return (
            <CardView
                cardElevation={3}
                cornerRadius={15}
                style={styles.mainContainer}>
                <Image source={{ uri: this.props.picture }}
                    resizeMode='contain'
                    style={{ height: 50, width: 50, borderRadius: 10, }} />

                <View
                    style={styles.userInfo}>
                    <Text
                        numberOfLines={1}
                        style={[styles.username, { width: widthContainer - 200 }]}>
                        {this.props.first_name + ' ' + this.props.last_name}
                    </Text>
                    <Text
                        style={styles.location}>
                        {this.props.street_address}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={_ => this.setState({ isFavorite: !this.state.isFavorite })}
                    style={styles.follow}>
                    <Image
                        source={require('../../../assets/ic_heart.png')}
                        resizeMode='contain'
                        style={this.state.isFavorite ? styles.activeHeart : styles.inActiveHeart} />
                </TouchableOpacity>
            </CardView>
        );
    }
}
