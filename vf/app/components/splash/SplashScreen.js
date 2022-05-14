import React, { Fragment } from 'react';
import {
    View,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import { RationTextLogo } from '../../general/RationTextLogo';
import GeneralStyles from '../../../styles/GeneralStyles';



class SplashScreen extends React.Component {
    render() {
        return (
            <Fragment>
                <SafeAreaView style={GeneralStyles.safeAreaTop} />
                <SafeAreaView style={GeneralStyles.safeAreaGreen}>
                    <View style={GeneralStyles.whiteBackground}>
                        <ImageBackground source={require('../../assets/splash_bg.png')} style={GeneralStyles.centerAlignView}>
                            <RationTextLogo ImageStyle={{ height: 250, width: 250 }} />
                        </ImageBackground>
                    </View>
                </SafeAreaView>
            </Fragment>

        );
    }
}



export default SplashScreen;