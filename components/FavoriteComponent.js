import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {
        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id.toString() })}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        }

        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }

        const isFavorite = (dishId) => this.props.favorites.some((el) => el === dishId)
        const favorites = this.props.dishes.dishes.filter((dish) => isFavorite(dish.id))

        return (
            <FlatList
                data={favorites}
                renderItem={renderMenuItem}
                keyExtracor={(item) => item.id.toString()}
            />
        );
    }

}

export default connect(mapStateToProps)(Favorites);