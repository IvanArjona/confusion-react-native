import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { View, Platform } from 'react-native';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
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