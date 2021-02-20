import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { View, Platform } from 'react-native';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';

const navigationOptions = {
    headerStyle: {
        backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    }
};

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
    Menu: { screen: Menu },
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

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us'
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
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

export default Main;