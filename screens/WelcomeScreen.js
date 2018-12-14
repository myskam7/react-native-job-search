import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    {text: 'Welcome to the App'},
    {text: 'Swipe your location'}
];

class WelcomeScreen extends Component {

    static navigationOptions = {
        tabBarVisible: false
    }

    onSlidesComplete = () => {
       this.props.navigation.navigate('Auth');
    }

    render() {
        return(
                <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        )
    }
}
export default WelcomeScreen;
