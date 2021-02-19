import React, { Component } from 'react';
import { View } from 'react-native';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

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
        return (
            <View>
                <Menu
                    dishes={this.state.dishes}
                    onPress={(dishId) => this.inDishSelect(dishId)}
                />
                <Dishdetail
                    dish={this.state.dishes.find((dish) => dish.id === this.state.selectedDish)}
                />
            </View>
        );
    }
}

export default Main;