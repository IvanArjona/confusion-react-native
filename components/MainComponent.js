import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView, SafeAreView } from 'react-navigation';
import { View, Text, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';

const navigationOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    },
    headerLeft: <Icon name="menu" size={24}
        color="white"
        onPress={() => navigation.toggleDrawer()}
    />
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    initialRouteName: 'Home',
    navigationOptions
});

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
    initialRouteName: 'About',
    navigationOptions
});

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color="white"
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
    initialRouteName: 'Contact',
    navigationOptions
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon name="home" type="font-awesome" size={24} color={tintColor} />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon name="info" type="font-awesome" size={24} color={tintColor} />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon name="list" type="font-awesome" size={24} color={tintColor} />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon name="address-card" type="font-awesome" size={22} color={tintColor} />
            )
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    inDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        });
    }

    render() {
        const paddingTop = Platform.OS === 'ios' || Platform.OS === 'web' ? 0 : Expo.Constants.statusBarHeight

        return (
            <View style={{ flex: 1, paddingTop: paddingTop }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default Main;