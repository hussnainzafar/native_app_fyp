import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import GeneralStyles from '../../../../styles/GeneralStyles';
import NGOListItem from './NGOListItem';

class NGOSection extends React.Component {

    state = {

    }

    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <FlatList
                        style={{ marginStart: 20, marginEnd:20 , marginBottom:20}}
                        data={[1, 2, 3]}
                        renderItem={({ item }) =>
                            <NGOListItem />
                        }
                        keyExtractor={(item, index) => index.toString()} />

                </View>
            </SafeAreaView >
        );
    }
}

export default NGOSection