import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import GeneralStyles from '../../../styles/GeneralStyles';
import styles from './styles';
import { Header } from '../../general/Header';
import { Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validatePhoneNumber, showMessageAlert, alertAppTitle } from '../../utils/Utilities';
import { REQUEST_RATION_URL } from '../../general/Constants';
import Loader from '../../utils/Loader';
import { onBoardingApiCalls } from '../../utils/OnBoardingRequests';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class RequestRation extends React.Component {

    state = {
        fullName: '',
        fullNameError: '',
        address: '',
        addressError: '',
        countryCode: '',
        countryCodeError: '',
        phoneNumber: '',
        phoneNumberError: '',
        loading: false,
        items: [
            { label: 'Accessories', value: 'accessories' },
            { label: 'Ration', value: 'ration' },
            { label: 'Food', value: 'food' },
            { label: 'HouseHoldItem', value: 'Household item' },
            { label: 'Fund', value: 'fund' },
        ],
    }

    getUsersNumbers = (postData) => {

        database()
            .ref("RequestForRation")
            .child(postData.phone)
            .set({
                name: postData.name,
                phone: postData.phone,
                location: postData.location,
                request_type: postData.requestType
            }).then(() => {
                alert("Your request has been post successfully!\nSomeone will contact you soon.")
                this.props.navigation.goBack()
                console.log("set Data")
            })

    }


    requestRationSubmit() {



        if (this.state.fullName.trim() === '') {
            this.setState({
                ...this.state,
                fullNameError: 'Name is required'
            });
            return;
        }
        if (this.state.address.trim() === '') {
            this.setState({
                ...this.state,
                addressError: 'Address is required'
            });
            return;
        }
        if (this.state.countryCode.trim() === '') {
            this.setState({
                ...this.state,
                countryCodeError: 'Country code is required'
            });
            return;
        }
        if (this.state.phoneNumber.trim() === '') {
            this.setState({
                ...this.state,
                phoneNumberError: 'Phone number is required'
            });
            return;
        }
        if (!validatePhoneNumber(this.state.countryCode + this.state.phoneNumber)) {
            this.setState({
                ...this.state,
                phoneNumberError: 'Please enter a valid phone number'
            });
            return;
        }

        let requestBody = {
            name: this.state.fullName,
            phone: this.state.countryCode + this.state.phoneNumber,
            location: this.state.address,
            requestType: this.state.value
        }
        this.setState({ loading: true })
        this.gotoRequestForRation(requestBody)
        // onBoardingApiCalls(REQUEST_RATION_URL, requestBody, this.onSuccess, this.onFailure)
    }

    gotoRequestForRation = (postData) => {

        let date = new Date()
        let newDate = new Date(date.setMonth(date.getMonth() + 1));

        database()
            .ref("RequestForRation")
            .child(postData.phone)
            .once("value")
            .then((snapshot) => {
                console.log(snapshot.exists())
                if (snapshot.exists()) {
                    const dateLimit = JSON.parse(snapshot.child('time_limit').toJSON())
                    console.log(dateLimit)
                    console.log(new Date().getTime())
                    if (JSON.parse(dateLimit) > new Date().getTime()) {
                        this.setState({ loading: false })
                        alert("This phone number is already exist.")
                    } else {
                        database()
                            .ref("RequestForRation")
                            .child(postData.phone)
                            .set({
                                name: postData.name,
                                phone: postData.phone,
                                location: postData.location,
                                request_type: postData.requestType,
                                time_limit: JSON.stringify(newDate.getTime())
                            }).then(() => {
                                alert("Your request has been post successfully!\nSomeone will contact you soon.")
                                this.props.navigation.goBack()
                                console.log("set Data")
                            })

                    }
                } else {
                    database()
                        .ref("RequestForRation")
                        .child(postData.phone)
                        .set({
                            name: postData.name,
                            phone: postData.phone,
                            location: postData.location,
                            request_type: postData.requestType,
                            time_limit: JSON.stringify(newDate.getTime())
                        }).then(() => {
                            alert("Your request has been post successfully!\nSomeone will contact you soon.")
                            this.props.navigation.goBack()
                            console.log("set Data")
                        })

                }
            })

    }

    onSuccess = (response) => {
        this.setState({ loading: false })
        if (response == 'success') {
            showMessageAlert(alertAppTitle, 'Your request has been post successfully!\nSomeone will contact you soon.')
            this.resetState()
        }
        else
            showMessageAlert(alertAppTitle, 'You have already posted a request.\nPlease try again after one month')
    }

    onFailure = (error) => {
        this.setState({ loading: false })
        showMessageAlert(alertAppTitle, 'Something went wrong.\nPlease try again!')
    }

    resetState() {
        this.setState({ fullName: '', address: '', phoneNumber: '', countryCode: '' });
    }
    setOpen(open) {
        this.setState({
            dropDownOpen: open
        });
    }

    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }


    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <Header onPress={_ => this.props.navigation.goBack()} />
                    <KeyboardAwareScrollView bounces={false} contentContainerStyle={GeneralStyles.scrollFlex}>
                        <View style={{ marginHorizontal: 30 }}>
                            <Text style={styles.requestRationHeading}>
                                Request for Ration
                            </Text>

                            <DropDownPicker

                                items={this.state.items}
                                zIndex={1000}
                                open={this.state.dropDownOpen}
                                value={this.state.value}
                                setOpen={(open) => this.setOpen(open)}
                                setValue={(value) => {
                                    this.setValue(value)
                                }}
                                setItems={(item) => this.setItems(item)}
                                arrowColor={'#F39015'}
                                containerStyle={{ zIndex: 1000 }}
                                style={{ zIndex: 1 }}
                            />

                            <Text style={styles.inputTextHeading}>
                                Full name
                            </Text>
                            <Input
                                value={this.state.fullName}
                                onChangeText={text => this.setState({ ...this.state, fullName: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.fullNameError}
                                onFocus={() => this.setState({ ...this.state, ['fullNameError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                Street address
                            </Text>
                            <Input
                                value={this.state.address}
                                onChangeText={text => this.setState({ ...this.state, address: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.addressError}
                                onFocus={() => this.setState({ ...this.state, ['addressError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                Phone
                            </Text>
                            <View style={GeneralStyles.rowDirection}>
                                <View style={{ flex: 0.3 }}>
                                    <Input
                                        keyboardType='phone-pad'
                                        value={this.state.countryCode}
                                        onChangeText={text => this.setState({ ...this.state, countryCode: text })}
                                        inputStyle={[styles.inputText]}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.countryCodeError}
                                        onFocus={() => this.setState({ ...this.state, ['countryCodeError']: '' })}
                                    />
                                </View>
                                <View style={GeneralStyles.defaultFlex}>
                                    <Input
                                        keyboardType='phone-pad'
                                        value={this.state.phoneNumber}
                                        onChangeText={text => this.setState({ ...this.state, phoneNumber: text })}
                                        inputStyle={styles.inputText}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.phoneNumberError}
                                        onFocus={() => this.setState({ ...this.state, ['phoneNumberError']: '' })}
                                    />
                                </View>

                            </View>
                            <TouchableOpacity
                                onPress={_ => this.requestRationSubmit()}
                                style={styles.requestSubmitButton} >
                                <Text style={styles.requestRationButtonText}>Submit</Text>
                            </TouchableOpacity>
                            {this.state.loading ? <Loader /> : null}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        );
    }
}


export default RequestRation