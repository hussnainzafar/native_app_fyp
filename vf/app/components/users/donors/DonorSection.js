import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import DonorListItem from './DonorListItem';
import GeneralStyles from '../../../../styles/GeneralStyles';
import Loader from '../../../utils/Loader';
import { GetDonorsUsers } from '../../../redux/actions/donors/DonorActions';
import { connect } from 'react-redux';

class DonorSection extends React.Component {

    state = {

    }
    
    componentDidMount() {
        this.props.getDonorList(this.props.token, this.onSuccess, this.onFailure)
    }

    onSuccess = (response) => {

    }

    onFailure = (error) => {

    }

    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <FlatList
                        style={{ marginStart: 20, marginEnd: 20, marginBottom: 20 }}
                        data={this.props.donorsArray.slice(0, 3)}
                        renderItem={({ item }) =>
                            <DonorListItem {...item}/>
                        }
                        keyExtractor={(item, index) => index.toString()} />

                </View>
                {this.props.isGettingDonorsData ? <Loader /> : null}

            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    let { loginState, donorsState } = state;
    return {
        ...loginState, ...donorsState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDonorList: (token, success, failure) => {
            dispatch(GetDonorsUsers(token, success, failure))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorSection);
