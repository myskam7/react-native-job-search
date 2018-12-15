import React, { Component } from 'react';
import { View, Text, AsyncStorage, Platform} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

 class AuthScreens extends Component {

     static navigationOptions = {
         tabBarVisible: false,
         styles: {
             marginTop: Platform.OS === 'android' ? 24 : 0
         }
     }

     componentDidMount() {
         this.props.facebookLogin();
         this.onAuthComplete(this.props);
         // AsyncStorage.removeItem('fb_token');

     }

     componentWillReceiveProps(nextProps){
         this.onAuthComplete(nextProps);
     }


     onAuthComplete(props) {
         if(props.token){
             this.props.navigation.navigate('Main');
         }

     }


    render() {
        return(
            <View style={AuthScreens.navigationOptions.styles}>

            </View>
        )
    }
}

function mapStateToProps({auth}) {
     return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreens);

