import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

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
            <Card title="Contact Information">
                {contactInfo}
            </Card>
        );
    }
}

export default Contact;