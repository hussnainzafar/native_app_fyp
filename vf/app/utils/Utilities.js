import { Alert } from 'react-native'
import validator from 'validator'

export const alertAppTitle = 'Rations.in'
export const configHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
export const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
}

export const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true
    }
}

export function showMessageAlert(title, message, onOk = _ => { }, cancelable) {
    Alert.alert(
        title,
        message,
        [
            { text: 'OK', onPress: () => onOk() },
        ],
        { cancelable: cancelable }
    )
}