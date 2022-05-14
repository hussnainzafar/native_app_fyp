import React, { Fragment } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import GeneralStyles from '../../../styles/GeneralStyles';
import styles from './styles';
import { removeItem } from '../../storage/LocalStorage';
import { connect } from 'react-redux';


let height = Dimensions.get('window').height
class UserMenu extends React.Component {

    state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        hidePass: true
    }

    logOut() {
        removeItem('user')
        this.props.navigationHome.navigate('splash')
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={GeneralStyles.safeAreaTop} />
                <SafeAreaView style={GeneralStyles.safeAreaGreen}>
                    <ScrollView  contentContainerStyle={GeneralStyles.scrollFlex}>
                        
                        <View style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image resizeMode='contain' source={require('../../assets/temp_avatar.png')}
                            style={[{ height: 200, width: 200, }]} />
                            <Text style={styles.userName}>{this.props.user.first_name+' '+this.props.user.last_name}</Text>
                            <Text style={styles.userType}>Donor</Text>
                            <TouchableOpacity
                                style={[GeneralStyles.rowDirection,
                                { marginStart: 20, marginTop: 50, marginEnd: 20, }]}>
                                <View style={[GeneralStyles.rowDirection, GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_user.png')}
                                        style={styles.menuIcon} />
                                    <Text style={styles.menuText}>My Profile</Text>
                                </View>
                                <View style={[GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_forward_white.png')}
                                        style={styles.menuArrow} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[GeneralStyles.rowDirection, { marginStart: 20, marginTop: 30, marginEnd: 20, }]}>
                                <View style={[GeneralStyles.rowDirection, GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_volunteer.png')}
                                        style={styles.menuIcon} />
                                    <Text style={styles.menuText}>My Volunteers</Text>
                                </View>
                                <View style={[GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_forward_white.png')}
                                        style={styles.menuArrow} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[GeneralStyles.rowDirection,
                                { marginStart: 20, marginTop: 30, marginEnd: 20, }]}>
                                <View style={[GeneralStyles.rowDirection, GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_donations.png')}
                                        style={styles.menuIcon} />
                                    <Text style={styles.menuText}>My Donations</Text>
                                </View>
                                <View style={[GeneralStyles.defaultFlex]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_forward_white.png')}
                                        style={styles.menuArrow} />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={[GeneralStyles.rowDirection, { bottom: 15, flex: 2, position: 'absolute', marginStart: 20 }]}>
                            <TouchableOpacity
                                style={[GeneralStyles.rowDirection, GeneralStyles.defaultFlex]}
                                onPress={_ => this.logOut()}>
                                <Text style={[styles.menuText, { marginEnd: 5 }]}>Log out</Text>
                                <Image resizeMode='contain'
                                    source={require('../../assets/ic_logout.png')}
                                    style={styles.menuIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={_ => this.props.navigation.goBack()}>
                                <View style={[GeneralStyles.rowDirection,]}>
                                    <Image resizeMode='contain'
                                        source={require('../../assets/ic_back_white.png')}
                                        style={styles.backArrow} />
                                    <Text style={[styles.backText, { alignSelf: 'flex-end' }]}>Back</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    let { loginState } = state;
    return {
        ...loginState
    }
}
export default connect(mapStateToProps, null)(UserMenu);
