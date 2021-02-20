import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const addressLines = [
    '121, Clear Water Bay Road',
    'Clear Water Bay, Kowloon',
    'HONG KONG',
    'Tel: +852 1234 5678',
    'Fax: +852 8765 4321',
    'Email: confusion@food.net'
]

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {
        const contactInfo = addressLines.map((line, i) =>
            <Text key={i} style={{ margin: 10 }}>{line}</Text>
        );

        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card title="Contact Information">
                    {contactInfo}
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;