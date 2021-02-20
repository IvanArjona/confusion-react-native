import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    };
};

function RenderItem({ item }) {
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
                <RenderItem item={this.props.dishes.dishes.find((dish) => dish.featured)} />
                <RenderItem item={this.props.promotions.promotions.find((promo) => promo.featured)} />
                <RenderItem item={this.props.leaders.leaders.find((leader) => leader.featured)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);