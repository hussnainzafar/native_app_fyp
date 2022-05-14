import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Dialog } from 'react-native-simple-dialogs';
import { Input } from 'react-native-elements'
import GeneralStyles from '../../../styles/GeneralStyles';

let height = Dimensions.get('window').height

export default class Filter extends Component {

    state = {
        postalCode: ''
    }
    render() {  

        return (

            <Dialog
                animationType='fade'
                visible={this.props.showFilter}
                title="Filter"
                dialogStyle={{ backgroundColor: '#fff', top: -height / 100 * 18 }}
            >

                <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
                    <Input
                        placeholder='Search by name'
                        placeholderTextColor='grey'
                        value={this.props.filterName}
                        onChangeText={text => this.props.onChangeFilterName(text)}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder='Search by area'
                        placeholderTextColor='grey'
                        value={this.props.filterArea}
                        onChangeText={text => this.props.onChangeFilterArea(text)}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder='Search by city'
                        placeholderTextColor='grey'
                        value={this.props.filterCity}
                        onChangeText={text => this.props.onChangeFilterCity(text)}
                        inputStyle={styles.inputText}
                    />
                    <View style={GeneralStyles.rowDirection}>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity
                                onPress={_ => { this.props.Show_Custom_Alert() }}
                                style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={GeneralStyles.defaultFlex}>
                            <TouchableOpacity
                                onPress={_ => this.props.searchFilter()}
                                style={[styles.requestSubmitButton, { marginBottom: 20 }]} >
                                <Text style={styles.requestRationButtonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Dialog>


        );
    }
}