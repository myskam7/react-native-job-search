import React, { Component } from 'react';
import {View, Text, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

//SCRREN_WIDTH ads dynamics to different size devices
const SCREEN_WIDTH = Dimensions.get('window').width;
//to see how far card is swiped
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;




class Swipe extends Component {
    static defaultProps = {  //???
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
        keyProp: 'id'
    }

    constructor(props) {
        super(props);
        this.position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                this.position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (e, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipe('right');
                } else if(gesture.dx < -SWIPE_THRESHOLD){
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });
        this.state = { index: 0 }
    }

    //UNSAFE COMPONENT
    //componentWillReceiveProp() will compare outgoing data array to a new data array
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data){
            this.setState({ index: 0 });
        }

    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }



    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.position, {
            toValue: {x: x, y: 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.nextCard(direction));// .start() waits for swipe to be done before running the function inside
    }



    nextCard(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.position.setValue({x: 0, y: 0});
        this.setState({ index: this.state.index + 1});
    }



    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }


    getCardStyle() {
        //card rotation rangge
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate: rotate}]
        }
    }


    renderCards() {
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }
        const deck = this.props.data.map((item, i) => {
            if(i < this.state.index) {return null; }
            if(i === this.state.index){
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}// ref to id in deckScreen
                        style={[this.getCardStyle(), styles.cardStyle, {width: SCREEN_WIDTH}]}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={item[this.props.keyProp]} style={[
                    styles.cardStyle,
                    {zIndex: i * -1, top: 10 * (i - this.state.index), width: SCREEN_WIDTH  - i}]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse(); // to bring cards from the bottom of the stack to top
        return deck;
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}


const styles = {
    cardStyle: {
        position: 'absolute',
        // width: SCREEN_WIDTH,
        // elevation: 100,
        height: 300
    }
}

export default Swipe;
