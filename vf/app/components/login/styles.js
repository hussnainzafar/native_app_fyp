import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    rationLogoImage: {
        height: 200,
        width: 200,
        alignSelf:'center'
    },
    loginButton: {
        marginEnd: 5,
        backgroundColor: '#F39015',
        borderRadius: 10,
        paddingStart: 25,
        paddingEnd: 25,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'flex-end'
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    inputTextHeading: {
        color: '#fff',
    },
    errorInput: {
        color: 'red',
        marginLeft: -10
    },
    inputText: {
        color: '#fff'
    },
    loginContainer: {
        alignSelf: 'flex-start',
        marginStart: 40,
        marginEnd: 20,
    },
    loginHeadingText: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
    },
    inputTextContainer: {
        width: '100%',
        marginStart: -10
    },
    whiteLineInputText: {
        height: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: -25,
        marginEnd: 5
    },
    loginButtonContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    signupTextContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf:'center',
        marginBottom: 20
    },
    greyText: {
        color: '#D5D5D5',
        marginTop: 15
    }
})