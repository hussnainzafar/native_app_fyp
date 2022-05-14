import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';;
import SplashScreen from './components/splash/SplashScreen';
import Login from './components/login/Login';
import RationWelcome from './components/welcome/RationWelcome';
import RequestRation from './components/welcome/RequestRation';
import Signup from './components/signup/Signup';
import DashBoard from './components/dashboard/Dashboard';
import UserMenu from './components/userMenu/UserMenu';

import DonorList from './components/users/donors/DonorList';
import NGOList from './components/users/ngos/NGOList';
import InformationWebView from './utils/InformationWebView';


const TempAppStack = createAppContainer(createStackNavigator({
    login: Login,
    signup: Signup,
    welcome: RationWelcome,
    requestRation: RequestRation,
    dashboard: DashBoard,
    donorList: DonorList,
    ngoList: NGOList,
    userMenu: UserMenu,
    infoWebView:InformationWebView,
    userMenu: {
        screen: props => <UserMenu
            navigation={props.navigation}
            navigationHome={props.screenProps.navigationHome} />
    },

},
    {
        initialRouteName: 'welcome',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }));
function AppStack(props) {
    return (
        <TempAppStack screenProps={{navigationHome: props.screenProps.navigation }} />
    );
}

const TempAuthStack = createAppContainer(createStackNavigator({
    login: Login,
    signup: Signup,
    welcome: RationWelcome,
    requestRation: RequestRation,
    dashboard: DashBoard,
    donorList: DonorList,
    userMenu: UserMenu,
    ngoList: NGOList,
    infoWebView:InformationWebView,
    userMenu: {
        screen: props => <UserMenu
            navigation={props.navigation}
            navigationHome={props.screenProps.navigationHome} />
    },
},
    {
        initialRouteName: 'welcome',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }));

function AuthStack(props) {

    return (
        <TempAuthStack screenProps={{navigationHome: props.screenProps.navigation }} />
    );
}
const AppContainer = createAppContainer(createSwitchNavigator(
    {
        
        App: {
            screen: AppStack, screen: props => <AppStack screenProps={{ navigation: props.navigation }} />
        },
        Auth: {
            screen: AuthStack, screen: props => <AuthStack screenProps={{ navigation: props.navigation}} />
        },
    },
    
));

export default AppContainer