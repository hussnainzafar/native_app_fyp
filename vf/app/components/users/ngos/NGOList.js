import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    Alert
} from 'react-native';
import GeneralStyles from '../../../../styles/GeneralStyles';
import { DashBoardHeader } from '../../../general/DashBoardHeader';
import Filter from '../../fliter/Filter';
import NGOListItem from './NGOListItem';

class NGOList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filterCity: '',
            filterName: '',
            filterArea: ''
        };

    }

    searchFilter = () => {
        if(this.state.filterName.trim()=='' && this.state.filterCity.trim()=='' && this.state.filterArea.trim()=='')
        {
            Alert.alert("Please enter name, area or city to search");
            return
        }
        Alert.alert("Search Clicked.");
    }

    Show_Custom_Alert(visible) {
        this.setState({ showFilter: visible });
    }

    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <DashBoardHeader
                        onPressLeft={_ => this.props.navigation.goBack()}
                        icon={require('../../../assets/ic_back.png')}
                        iconRight={require('../../../assets/ic_search.png')}
                        showRight={true}
                        onPressRight={_ => this.Show_Custom_Alert(true)}
                        heading={'NGOs'} />
                    <View style={GeneralStyles.whiteBackground}>
                        <FlatList
                            style={{ marginStart: 20, marginEnd: 20 }}
                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]}
                            renderItem={({ item }) =>
                                <NGOListItem />
                            }
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    {this.state.showFilter ?
                        <Filter
                            filterArea={this.state.filterArea}
                            filterCity={this.state.filterCity}
                            filterName={this.state.filterName}
                            onChangeFilterCity={text => this.setState({ filterCity: text })}
                            onChangeFilterArea={text => this.setState({ filterArea: text })}
                            onChangeFilterName={text => this.setState({ filterName: text })}
                            searchFilter={_ => this.searchFilter()}
                            showFilter={this.state.showFilter}
                            Show_Custom_Alert={_ => this.Show_Custom_Alert(!this.state.showFilter)} /> : null}
                </View>
            </SafeAreaView >
        );
    }
}

export default NGOList