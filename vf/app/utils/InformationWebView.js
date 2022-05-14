import React, { Component } from 'react'
import {
    BackHandler,
    Platform,
    View,
    ActivityIndicator,
    SafeAreaView
} from 'react-native'
import { WebView } from 'react-native-webview'
import { DashBoardHeader } from '../general/DashBoardHeader'
import Loader from './Loader'
import GeneralStyles from '../../styles/GeneralStyles'


class InformationWebView extends Component {

    webView = {
        canGoBack: false,
        ref: null,
    }

    state = {
        loading: false
    }

    constructor(props) {
        super(props)
    }


    showSpinner() {
        this.setState({ loading: true })
    }

    hideSpinner() {
        this.setState({ loading: false })
    }


    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack()
            return true
        }
        return false
    }


    render() {
        let navParams = this.props.navigation.state.params
        return (
            <SafeAreaView
                style={GeneralStyles.safeArea}>
                <View style={{ flex: 1, backgroundColor: '#F2F5FA' }}>
                    <DashBoardHeader
                        onPressLeft={_ => this.props.navigation.goBack()}
                        icon={require('../assets/ic_back.png')}
                        showRight={false}
                        heading={navParams.title} />

                    <WebView
                        incognito={true}
                        onLoadStart={() => this.showSpinner()}
                        onLoad={() => this.hideSpinner()}
                        source={{ uri: navParams.url }}
                        ref={(webView) => { this.webView.ref = webView }}
                    />

                    {this.state.loading ?
                        <Loader />
                        : null}
                </View>
            </SafeAreaView >
        )
    }
}



export default InformationWebView