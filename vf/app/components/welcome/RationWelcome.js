import React, { Fragment } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Platform
} from 'react-native';
import { RationTextLogo } from '../../general/RationTextLogo';
import Icon from "react-native-vector-icons/FontAwesome5";
import GeneralStyles from '../../../styles/GeneralStyles';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';

class RationWelcome extends React.Component {

    componentDidMount=()=>{
        SplashScreen.hide()
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={GeneralStyles.safeAreaTop} />
                <SafeAreaView style={GeneralStyles.safeAreaGreen}>
                    <ScrollView bounces={false} contentContainerStyle={GeneralStyles.scrollFlex}>
                        <ImageBackground source={require('../../assets/splash_bg.png')} style={GeneralStyles.centerAlignView}>
                            <RationTextLogo ImageStyle={styles.rationLogoImage} />
                            <TouchableOpacity
                                onPress={_ => this.props.navigation.navigate('requestRation')}
                                style={styles.requestRationButton}>
                                <Text style={styles.requestRationButtonText}>Request for Ration</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={_ => this.props.navigation.replace('login')}
                                style={{ marginTop: 10 }} >
                                <View style={GeneralStyles.rowDirection}>
                                    <Text style={styles.skipText}>Skip</Text>
                                    <Icon style={Platform.OS == 'ios' ? { marginTop: 5, marginStart: 3 } : { marginTop: 7, marginStart: 3 }} 
                                    name='chevron-right' color='#869764' size={10} />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}


export default RationWelcome