import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    {text: 'Welcome to the App', color: '#ff5c33'},
    {text: 'Swipe your location', color: '#3399ff'},
    {text: 'Click Next to Continue!', color: '#00ffcc'}
];

class WelcomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = { token: null }
    }

    static navigationOptions = {
        tabBarVisible: false,
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        if(token){
            this.props.navigation.navigate('Map');
            // this.setState({token});
        } else {
            this.setState({ token: false });
        }

    }

    onSlidesComplete = () => {
       this.props.navigation.navigate('Auth');
    }

    render() {
        if(_.isNull(this.state.token)){
            return <AppLoading />
        }

        return(
                <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        )
    }
}
export default WelcomeScreen;
