import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Platform } from 'react-native';
import { DISHES } from '../shared/dishes';
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

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
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
                <MenuNavigator />
            </View>
        );
    }
}

export default Main;