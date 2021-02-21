import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, AirbnbRating } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish({ dish, favorite, onPressFavorite, onPressEdit }) {

    handleViewRef = (ref) => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        return dx < -200;
    };

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        return dx > 200;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then((endState) => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            // Right to left
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to favorites?',
                    `Are you sure you wish to add ${dish.name} to your favorites?`,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => favorite ? console.log('Already favorite') : onPressFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            // Left to right
            else if (recognizeComment(gestureState)) {
                onPressEdit();
            }
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title,
            message: `${title}: ${message} ${url}`,
            url
        }, {
            dialogTitle: `Share ${title}`
        });
    };

    if (dish) {
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            raised
                            reverse
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => favorite ? console.log('Already favorite') : onPressFavorite()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => onPressEdit()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return (
            <View></View>
        );
    }
}

function RenderComments({ comments }) {
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>-- {item.author}, {(new Date(item.date)).toISOString()}</Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCommentModal: false,
            rating: 5,
            author: '',
            comment: ''
        };
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleCommentModal() {
        this.setState({
            showCommentModal: !this.state.showCommentModal
        });
    }

    resetCommentForm() {
        this.setState({
            rating: 5,
            author: '',
            comment: ''
        });
    }

    handleComment() {
        this.props.postComment({
            dishId: this.props.navigation.getParam('dishId', ''),
            rating: this.state.rating,
            author: this.state.author,
            comment: this.state.comment
        });
        this.toggleCommentModal();
        this.resetCommentForm();
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        const dish = this.props.dishes.dishes[+dishId];
        const isFavorite = this.props.favorites.some((favoriteId) => favoriteId === dishId);
        const comments = this.props.comments.comments.filter((comment) => comment.dishId === dishId);

        return (
            <ScrollView>
                <RenderDish
                    dish={dish}
                    favorite={isFavorite}
                    onPressFavorite={() => this.markFavorite(dishId)}
                    onPressEdit={() => this.toggleCommentModal()}
                />
                <RenderComments comments={comments}/>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.showCommentModal}
                    onDismiss={() => { this.toggleCommentModal(); this.resetCommentForm() }}
                    onRequestClose={() => { this.toggleCommentModal(); this.resetCommentForm() }}
                >
                    <View style={styles.modal}>
                        <AirbnbRating
                            showrating
                            count={5}
                            minValue={1}
                            defaultRating={5}
                            onFinishRating={(rating) => this.setState({rating})}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={<Icon name="user" type="font-awesome" />}
                            onChangeText={(author) => this.setState({ author })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={<Icon name="comment" type="font-awesome" size={22} />}
                            onChangeText={(comment) => this.setState({ comment })}
                        />
                        <View style={styles.formRow}>
                            <Button
                                style={{ margin: 10 }}
                                onPress={() => { this.handleComment() }}
                                color='#512DA8'
                                title='Submit'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Button
                                style={{ margin: 10 }}
                                onPress={() => { this.toggleCommentModal(); this.resetCommentForm() }}
                                color='gray'
                                title='Close'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 40
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);