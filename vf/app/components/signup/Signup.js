import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Platform,
} from 'react-native';
import GeneralStyles from '../../../styles/GeneralStyles';
import styles from './styles';
import storage from '@react-native-firebase/storage';
import { Header } from '../../general/Header';
import { Input } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessageAlert, alertAppTitle, validateEmail, validatePhoneNumber } from '../../utils/Utilities';
import { SIGNUP_URL, TERMS_WEBVIEW } from '../../general/Constants';
import Loader from '../../utils/Loader';
import { onBoardingApiCalls } from '../../utils/OnBoardingRequests';
import CheckBox from '@react-native-community/checkbox';
import Icon from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



class Signup extends React.Component {

    state = {
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        userName: '',
        userNameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        countryCode: '',
        countryCodeError: '',
        phoneNumber: '',
        phoneNumberError: '',
        address: '',
        addressError: '',
        city: '',
        cityError: '',
        stateInput: '',
        stateError: '',
        postalCode: '',
        postalCodeError: '',
        facebookLink: '',
        facebookLinkError: '',
        typeDrop: 'donor',
        cityDrop: '',
        stateDrop: '',
        dropDownOpen: false,
        dropDownOpen2: false,
        dropDownOpen3: false,

        isTermsAccepted: false,
        loading: false,
        selectedImage: "",

        value: null,
        value2: null,
        value3: null,
        items: [
            { label: 'Donor', value: 'donor' },
            { label: 'NGO', value: 'ngo' },
            { label: 'Volunteer', value: 'volunteer' },
            { label: 'Needy', value: 'needy' },
        ],
        items2: [
            { label: 'Lahore', value: 'lahore' },
            { label: 'Karachi', value: 'karachi' },
        ],
        items3: [
            { label: 'Pakistan', value: 'pakistan' },
            { label: 'US', value: 'US' },
        ]
    }

    doSignUp() {

        const filename = this.state.selectedImage.substring(this.state.selectedImage.lastIndexOf("/") + 1);
        const uploadUri = Platform.OS === 'ios' ? this.state.selectedImage.replace("file://", "") : this.state.selectedImage;

        console.log(uploadUri);
        storage().ref("image/", "filename").putFile(uploadUri).then(()=>{
            storage().ref("image/", "filename").getDownloadURL().then((url)=>{
                console.log(url);
            })
            .catch((error)=>{
                console.log(error);
            })
        }).catch((error)=>{
            console.log(error);
        })

        return

        if (this.state.firstName.trim() === '') {
            this.setState({
                ...this.state,
                firstNameError: 'First name is required'
            });
            return;
        }
        if (this.state.lastName.trim() === '') {
            this.setState({
                ...this.state,
                lastNameError: 'Last name is required'
            });
            return;
        }
        if (this.state.userName.trim() === '') {
            this.setState({
                ...this.state,
                userNameError: 'Username is required'
            });
            return;
        }
        if (this.state.email.trim() === '') {
            this.setState({
                ...this.state,
                emailError: 'Email is required'
            });
            return;
        }
        if (!validateEmail(this.state.email)) {
            this.setState({
                ...this.state,
                emailError: 'Please enter a valid email'
            });
            return;
        }
        if (this.state.password.trim() === '') {
            this.setState({
                ...this.state,
                passwordError: 'Password is required'
            });
            return;
        }
        if (this.state.password.trim().length < 8) {
            this.setState({
                ...this.state,
                passwordError: 'Password characters must b greater than 8'
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
        if (this.state.address.trim() === '') {
            this.setState({
                ...this.state,
                addressError: 'Address is required'
            });
            return;
        }
        if (this.state.city.trim() === '') {
            this.setState({
                ...this.state,
                cityError: 'City is required'
            });
            return;
        }
        if (this.state.stateInput.trim() === '') {
            this.setState({
                ...this.state,
                stateError: 'State is required'
            });
            return;
        }
        if (this.state.postalCode.trim() === '') {
            this.setState({
                ...this.state,
                postalCodeError: 'Postal code is required'
            });
            return;
        }
        if (this.state.facebookLink.trim() === '') {
            this.setState({
                ...this.state,
                facebookLinkError: 'Facebook is required'
            });
            return;
        }
        if (this.state.cityDrop === null) {
            showMessageAlert(alertAppTitle, 'Please select area city')
            return;
        }
        if (this.state.stateDrop === null) {
            showMessageAlert(alertAppTitle, 'Please select area state')
            return;
        }
        if (!this.state.isTermsAccepted) {
            showMessageAlert(alertAppTitle, 'Please accept terms and conditions')
            return;
        }

        this.setState({ loading: true })
        let requestBody = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            type: this.state.value,
            city: this.state.city,
            country: this.state.stateDrop,
            postal_code: this.state.postalCode,
            phone: this.state.countryCode + this.state.phoneNumber,
            street_address: this.state.address,
            username: this.state.userName,
            state: this.state.stateInput,
            area_covered: this.state.value2 + ", " + this.state.value3,
            fb_link: this.state.facebookLink,
            is_term_accept: this.state.isTermsAccepted ? '1' : '0'
        }
        // this.setState({ loading: true })
        // onBoardingApiCalls(SIGNUP_URL, requestBody, this.onSuccess, this.onFailure)

        this.gotoSignUp(SIGNUP_URL, requestBody, this.onSuccess, this.onFailure)
    }

    gotoSignUp = (url, postData, onSuccess, onFailure) => {

        auth()
            .createUserWithEmailAndPassword(postData.email, postData.password)
            .then((data) => {
                if (data?.user) {
                    database()
                        .ref("User")
                        .child(data?.user?.uid)
                        .set({
                            first_name: postData.first_name,
                            last_name: postData.first_name,
                            email: postData.email,
                            password: postData.password,
                            type: postData.type,
                            city: postData.city,
                            country: postData.country,
                            postal_code: postData.postal_code,
                            phone: postData.phone,
                            street_address: postData.street_address,
                            username: postData.username,
                            state: postData.state,
                            area_covered: postData.area_covered,
                            fb_link: postData.fb_link,
                            is_term_accept: postData.is_term_accept
                        }).then(() => {
                            this.setState({ loading: true })
                            this.props.navigation.navigate("login")
                            console.log("set Data")
                        })
                }
            })
            .catch(error => {
                this.setState({ loading: true })
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }

                console.error(error);
            });
    }

    onSuccess = (response) => {
        this.setState({ loading: false })
        if (response.data != undefined) {
            showMessageAlert(alertAppTitle, response.data.data.message)
            this.props.navigation.goBack()
        }
    }

    onFailure = (error) => {
        this.setState({ loading: false })
        if (error != undefined) {
            if (error.status_code == 422)
                showMessageAlert(alertAppTitle, error.message)
        }
        else {
            showMessageAlert(alertAppTitle, 'Something went wrong.\nPlease try again!')
        }
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

    setOpen2(open) {
        this.setState({
            dropDownOpen2: open
        });
    }

    setValue2(callback) {
        this.setState(state => ({
            value2: callback(state.value)
        }));
    }

    setItems2(callback) {
        this.setState(state => ({
            items2: callback(state.items)
        }));
    }

    setOpen3(open) {
        this.setState({
            dropDownOpen3: open
        });
    }

    setValue3(callback) {
        this.setState(state => ({
            value3: callback(state.value)
        }));
    }

    setItems3(callback) {
        this.setState3(state => ({
            items: callback(state.items)
        }));
    }

    gotoImagePicker = () => {
        launchImageLibrary({
            mediaType: 'photo'
        }, (data) => {
            if(data && data.assets){
            this.setState({ selectedImage: data?.assets[0]?.uri })
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <Header onPress={_ => this.props.navigation.goBack()} />
                    <Text style={[styles.requestRationHeading,]}>
                        Sign up
                    </Text>



                    <KeyboardAwareScrollView contentContainerStyle={GeneralStyles.scrollFlex}>

                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <TouchableOpacity onPress={() => { this.gotoImagePicker() }} style={{ borderWidth: 3, borderColor: '#F39015', width: 100, alignItems: 'center', justifyContent: 'center', height: 100, borderRadius: 200 }}>
                                {this.state.selectedImage === "" ?
                                    <Icon style={{ margin: 15 }} name='user' color='#F39015' size={50} />
                                    :
                                    <Image source={{uri: this.state.selectedImage}} style={{width: 94, height: 94, borderRadius: 100}} ></Image>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 30, zIndex: 1, }}>

                            <DropDownPicker
                                items={this.state.items}
                                zIndex={1000}
                                open={this.state.dropDownOpen}
                                value={this.state.value}
                                setOpen={(open) => this.setOpen(open)}
                                setValue={(value) => this.setValue(value)}
                                setItems={(item) => this.setItems(item)}
                                arrowColor={'#F39015'}
                                containerStyle={{ zIndex: 1000 }}
                                style={{ zIndex: 1 }}
                            // arrowSize={25}
                            // arrowStyle={Platform.OS == 'android' ? styles.dropDownStyleArrowAndroid : styles.dropDownStyleArrow}
                            // labelStyle={styles.dropDownLabel}
                            // defaultValue={this.state.typeDrop}
                            // containerStyle={styles.dropDownContainer}
                            // style={styles.dropDownStyle}
                            // dropDownStyle={styles.dropDownStyle}
                            // onChangeItem={item => this.setState({
                            //     typeDrop: item.value
                            // })} 
                            />
                            <View style={GeneralStyles.rowDirection}>
                                <View style={GeneralStyles.defaultFlex}>
                                    <Text style={styles.inputTextHeading}>
                                        First name
                                    </Text>
                                    <Input
                                        value={this.state.firstName}
                                        onChangeText={text => this.setState({ ...this.state, firstName: text })}
                                        inputStyle={[styles.inputText]}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.firstNameError}
                                        onFocus={() => this.setState({ ...this.state, ['firstNameError']: '' })}
                                    />
                                </View>
                                <View style={GeneralStyles.defaultFlex}>
                                    <Text style={styles.inputTextHeading}>
                                        Last name
                                    </Text>
                                    <Input
                                        value={this.state.lastName}
                                        onChangeText={text => this.setState({ ...this.state, lastName: text })}
                                        inputStyle={styles.inputText}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.lastNameError}
                                        onFocus={() => this.setState({ ...this.state, ['lastNameError']: '' })}
                                    />
                                </View>

                            </View>
                            <Text style={styles.inputTextHeading}>
                                Username
                            </Text>
                            <Input
                                value={this.state.userName}
                                autoCapitalize='none'
                                onChangeText={text => this.setState({ ...this.state, userName: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.userNameError}
                                onFocus={() => this.setState({ ...this.state, ['userNameError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                Email
                            </Text>
                            <Input
                                keyboardType='email-address'
                                value={this.state.email}
                                autoCapitalize='none'
                                onChangeText={text => this.setState({ ...this.state, email: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.emailError}
                                onFocus={() => this.setState({ ...this.state, ['emailError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                Password
                            </Text>
                            <Input
                                value={this.state.password}
                                onChangeText={text => this.setState({ ...this.state, password: text })}
                                inputStyle={styles.inputText}
                                secureTextEntry={true}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.passwordError}
                                onFocus={() => this.setState({ ...this.state, ['passwordError']: '' })}
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
                            <View style={GeneralStyles.rowDirection}>
                                <View style={GeneralStyles.defaultFlex}>
                                    <Text style={styles.inputTextHeading}>
                                        City
                                    </Text>
                                    <Input
                                        value={this.state.city}
                                        onChangeText={text => this.setState({ ...this.state, city: text })}
                                        inputStyle={[styles.inputText]}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.cityError}
                                        onFocus={() => this.setState({ ...this.state, ['cityError']: '' })}
                                    />
                                </View>
                                <View style={GeneralStyles.defaultFlex}>
                                    <Text style={styles.inputTextHeading}>
                                        State
                                    </Text>
                                    <Input
                                        value={this.state.stateInput}
                                        onChangeText={text => this.setState({ ...this.state, stateInput: text })}
                                        inputStyle={styles.inputText}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.stateError}
                                        onFocus={() => this.setState({ ...this.state, ['stateError']: '' })}
                                    />
                                </View>

                            </View>
                            <Text style={styles.inputTextHeading}>
                                Postal code
                            </Text>
                            <Input
                                keyboardType='phone-pad'
                                value={this.state.postalCode}
                                onChangeText={text => this.setState({ ...this.state, postalCode: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.postalCodeError}
                                onFocus={() => this.setState({ ...this.state, ['postalCodeError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                Facebook link
                            </Text>
                            <Input
                                value={this.state.facebookLink}
                                onChangeText={text => this.setState({ ...this.state, facebookLink: text })}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                errorMessage={this.state.facebookLinkError}
                                onFocus={() => this.setState({ ...this.state, ['facebookLinkError']: '' })}
                            />
                            <Text style={styles.inputTextHeading}>
                                {'Area(covered)'}
                            </Text>
                            <View style={[GeneralStyles.rowDirection, { marginBottom: this.state.dropDownOpen ? 100 : 20 }]}>
                                <View style={[GeneralStyles.defaultFlex, { zIndex: 1 }]}>
                                    <DropDownPicker
                                        items={this.state.items2}
                                        zIndex={1000}
                                        open={this.state.dropDownOpen2}
                                        value={this.state.value2}
                                        setOpen={(open) => this.setOpen2(open)}
                                        setValue={(value) => this.setValue2(value)}
                                        setItems={(item) => this.setItems2(item)}
                                        arrowColor={'#F39015'}
                                        containerStyle={{ zIndex: 1000 }}
                                        style={{ zIndex: 1 }}
                                    />
                                </View>
                                <View style={[GeneralStyles.defaultFlex, { zIndex: 1 }]}>
                                    <DropDownPicker
                                        items={this.state.items3}
                                        zIndex={1000}
                                        open={this.state.dropDownOpen3}
                                        value={this.state.value3}
                                        setOpen={(open) => this.setOpen3(open)}
                                        setValue={(value) => this.setValue3(value)}
                                        setItems={(item) => this.setItems3(item)}
                                        arrowColor={'#F39015'}
                                        containerStyle={{ zIndex: 1000 }}
                                        style={{ zIndex: 1 }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    disabled={false}
                                    boxType={'square'}
                                    value={this.state.isTermsAccepted}
                                    tintColor={'#F39015'}
                                    animationDuration={0.1}
                                    onCheckColor={'#F39015'}
                                    onTintColor={'#F39015'}
                                    onValueChange={value => this.setState({ isTermsAccepted: !this.state.isTermsAccepted })}
                                    style={{ height: 15, width: 15, marginStart: 10, }}
                                />
                                <Text style={{ marginStart: 10 }}>I accept</Text>
                                <TouchableOpacity
                                    onPress={_ => this.props.navigation.navigate('infoWebView', { title: 'Terms and Conditions', url: TERMS_WEBVIEW })}>
                                    <Text style={{
                                        textDecorationLine: 'underline',
                                    }}>{' terms & conditions'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={GeneralStyles.rowDirection}>
                                <View style={styles.backLoginContainer}>
                                    <TouchableOpacity
                                        boxType='square'
                                        onPress={_ => this.props.navigation.goBack()}
                                        style={styles.backLoginButton}>
                                        <Text style={styles.backLoginButtonText}>Back to Login</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={GeneralStyles.defaultFlex}>
                                    <TouchableOpacity
                                        onPress={_ => this.doSignUp()}
                                        style={[styles.requestSubmitButton, { marginBottom: 20 }]} >
                                        <Text style={styles.requestRationButtonText}>Sign up</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.loading ? <Loader /> : null}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView >
        );
    }
}


export default Signup