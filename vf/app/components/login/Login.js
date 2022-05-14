import React, { Fragment } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GeneralStyles from '../../../styles/GeneralStyles';
import { RationTextLogo } from '../../general/RationTextLogo';
import styles from './styles';
import { Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from "react-native-vector-icons/FontAwesome5";
import { saveValue } from '../../storage/LocalStorage';
import { saveUserInReduxStore, loginUser, saveTokenInReduxStore } from '../../redux/actions/login/LoginActions';
import { connect } from 'react-redux';
import { validateEmail, showMessageAlert, alertAppTitle } from '../../utils/Utilities';
import Loader from '../../utils/Loader';

let height = Dimensions.get('window').height
class Login extends React.Component {

    state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        hidePass: true,
        loading: false
    }

    saveLoginInfo() {
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

        let requestBody = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({ loading: true })

        auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          console.log(data);
          if(data?.user){
              this.props.navigation.navigate("dashboard")
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });

        // this.props.loginUser(requestBody, this.onSuccess, this.onFailure)
    }
    onSuccess = (response) => {
        console.log(response);

        this.setState({ loading: false })

        this.props.saveUserInReduxStore(response.data.user)
        this.props.saveTokenInReduxStore(response.data.token)
        saveValue('user', JSON.stringify(response.data));
        this.props.navigation.replace('dashboard')
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

    render() {
        return (
            <Fragment>
                <SafeAreaView style={GeneralStyles.safeAreaTop} />
                <SafeAreaView style={GeneralStyles.safeAreaGreen}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={GeneralStyles.scrollFlex}>
                        <ImageBackground source={require('../../assets/login_bg.png')} style={{ flex: 1 }} >
                            <RationTextLogo ImageStyle={[styles.rationLogoImage, { marginTop: height / 100 * 5 }]} />

                            <View style={[GeneralStyles.centerAlignView]}>

                                <View style={[styles.loginContainer]}>
                                    <Text style={styles.loginHeadingText}>
                                        Login
                                    </Text>
                                    <Text style={[styles.inputTextHeading, { marginTop: 50 }]}>
                                        Email
                                    </Text>
                                    <Input
                                        value={this.state.email}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        onChangeText={text => this.setState({ ...this.state, email: text })}
                                        inputStyle={styles.inputText}
                                        inputContainerStyle={styles.inputTextContainer}
                                        errorStyle={styles.errorInput}
                                        errorMessage={this.state.emailError}
                                        onFocus={() => this.setState({ ...this.state, ['emailError']: '' })}
                                    />
                                    <View style={styles.whiteLineInputText}></View>

                                    <Text style={[styles.inputTextHeading, { marginTop: 20 }]}>
                                        Password
                                    </Text>
                                    <View style={GeneralStyles.rowDirection}>
                                        <View style={{ flex: 1 }}>
                                            <Input
                                                value={this.state.password}
                                                onChangeText={text => this.setState({ ...this.state, password: text })}
                                                inputStyle={styles.inputText}
                                                inputContainerStyle={styles.inputTextContainer}
                                                errorStyle={styles.errorInput}
                                                secureTextEntry={this.state.hidePass}
                                                errorMessage={this.state.passwordError}
                                                onFocus={() => this.setState({ ...this.state, ['passwordError']: '' })}
                                            />
                                        </View>
                                        <View style={{ marginEnd: 20, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={_ => this.setState({ hidePass: !this.state.hidePass })}>
                                                <Icon
                                                    name={this.state.hidePass ? 'eye' : 'eye-slash'}
                                                    color='#fff' size={15} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={styles.whiteLineInputText}></View>

                                    <View style={styles.loginButtonContainer}>
                                        <View style={GeneralStyles.defaultFlex}>
                                            <TouchableOpacity>
                                                <Text style={styles.greyText}>
                                                    Forgot password?
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={GeneralStyles.defaultFlex}>
                                            <TouchableOpacity
                                                onPress={_ => this.saveLoginInfo()}
                                                style={styles.loginButton}>
                                                <Text style={styles.loginButtonText}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.signupTextContainer}>
                                <Text style={styles.greyText}>Don't have an account?</Text>
                                <TouchableOpacity
                                    onPress={_ => this.props.navigation.navigate('signup')}>
                                    <Text style={styles.loginButtonText}> Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        {this.state.loading ? <Loader /> : null}

                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    let { login } = state;
    return {
        ...login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (params, success, failure) => {
            dispatch(loginUser(params, success, failure))
        },
        saveUserInReduxStore: (user) => {
            dispatch(saveUserInReduxStore(user));
        },
        saveTokenInReduxStore: (token) => {
            dispatch(saveTokenInReduxStore(token));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);