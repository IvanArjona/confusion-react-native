import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    };
};

function RenderItem({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />;
    }

    if (errMess) {
        return (
            <Text>{errMess}</Text>
        );
    }

    if (!item) {
        return (
            <View></View>
        );
    }

    return (
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl + item.image }}
        >
            <Text style={{ margin: 10 }}>
                {item.description}
            </Text>
        </Card>
    );
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.find((dish) => dish.featured)}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.find((promo) => promo.featured)}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.leaders.leaders.find((leader) => leader.featured)}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);