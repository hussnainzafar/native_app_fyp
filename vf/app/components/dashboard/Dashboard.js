import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    ScrollView
} from 'react-native';
import GeneralStyles from '../../../styles/GeneralStyles';
import { DashBoardHeader } from '../../general/DashBoardHeader';
import DashboardGrid from '../dashboard/dashboardGrid/DashBoardGrid'
import DonorSection from '../users/donors/DonorSection';
import { DashBoardSection } from '../../general/DashBoardSection';
import NGOSection from '../users/ngos/NGOSection';

class DashBoard extends React.Component {

    state = {

    }

    render() {
        return (
            <SafeAreaView style={GeneralStyles.safeArea}>
                <View style={GeneralStyles.whiteBackground}>
                    <DashBoardHeader onPressLeft={_ => this.props.navigation.navigate('userMenu')} icon={require('../../assets/ic_menu.png')} heading={'Wellbeing Planner'} />
                    <ScrollView contentContainerStyle={GeneralStyles.scrollFlex}>
                        <View style={GeneralStyles.defaultFlex}>
                            <FlatList
                                style={{ margin: 20 }}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                data={[1, 2, 3, 4]}
                                numColumns={2}
                                renderItem={({ item }) =>
                                    <DashboardGrid />
                                }
                                keyExtractor={(item, index) => index.toString()} />
                            <DashBoardSection onPressViewAll={_ => this.props.navigation.navigate('donorList')} sectionHeading={'Donor'} />
                            <DonorSection />
                            <DashBoardSection onPressViewAll={_ => this.props.navigation.navigate('ngoList')} sectionHeading={'NGOs'} />
                            <NGOSection/>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}

export default DashBoard