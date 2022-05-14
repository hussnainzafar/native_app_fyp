import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    errorInput: {
        color: 'red',
        marginLeft: 0
    },
    inputText: {
        color: '#514C4C'
    },
    cancelContainer: {
        flex: 1,
        marginTop: 30
    },
    cancelButtonText: {
        color: '#869764',
        fontSize: 16
    },
    requestRationButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },
    cancelButton: {
        marginStart: 10
    },
    requestSubmitButton: {
        marginTop: 20,
        marginEnd: 5,
        backgroundColor: '#F39015',
        borderRadius: 10,
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'flex-end'
    },
    Alert_Main_View: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#009688",
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,

    },

    Alert_Title: {

        fontSize: 25,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '28%'

    },

    Alert_Message: {

        fontSize: 22,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '42%'

    },

    buttonStyle: {

        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    }

});

export default styles