import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';

function RenderDish({ dish }) {
    if (dish) {
        return (
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
}

function Dishdetail(props) {
    return (
        <RenderDish dish={props.dish} />
    );
}

export default Dishdetail;