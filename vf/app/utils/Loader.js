import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator
                animating={true}
                size="large"
                color='#F39015' />
        </View>
    )
}
export default Loader;

