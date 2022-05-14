import AsyncStorage from '@react-native-community/async-storage';

export const saveValue = ( key, value) => {
    storeData = async () => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
        }
    }
    storeData();
}

export const removeItem = (key) => {
    removeValue = async () => {
        try {
          await AsyncStorage.removeItem(key)
        } catch(e) {
          // remove error
        }
    }
    removeValue();
}


export const getValue = (key) => {
    //let value = null
    return async () => {
        try {
            const tempValue = await AsyncStorage.getItem(key);
            //value = tempValue;
        } catch(e) {
        }
    }
}
