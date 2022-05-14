
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        padding: 15,
        marginTop: 5,
        marginBottom:5,
        marginStart: 7,
        marginEnd: 7,
        flexDirection: 'row'
    },
    userInfo: {
        justifyContent: "flex-start",
        marginEnd: 5,
        marginStart: 10
    },
    follow: {
        position: 'absolute',
        right: 10,
        height: 30,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        color: '#514C4C',
        fontSize: 15,
        fontWeight:'bold'
    },
    location: {
        marginTop:5,
        color: '#969696',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
    activeHeart: {
        height: 20,
        width: 20,
        tintColor: 'red'
    },
    inActiveHeart: {
        height: 20,
        width: 20,
    }
});