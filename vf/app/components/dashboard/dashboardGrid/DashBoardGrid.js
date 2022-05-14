import React, { Component } from 'react'
import {
    View,
    Text,
}
    from 'react-native'
import styles from '../styles'
import CardView from 'react-native-cardview'


export default class DashboardGrid extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CardView
                    cardElevation={3}
                    cornerRadius={20}
                    style={{
                        margin: 10, backgroundColor: '#fff'
                    }} >
                    <View
                        style={styles.gridContainer}>
                        <Text style={{ color: '#F39015', fontSize: 35 , fontWeight:'bold'}}>521</Text>

                        <Text style={{ color: '#869764', fontSize: 22, fontWeight:'bold' }}>Donor</Text>
                    </View>
                </CardView>
            </View>

        )
    }
}

