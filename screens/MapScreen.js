import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView, Permissions } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

 class MapScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            mapLoaded: false,
            region: {
                latitude: 37,
                longitude: -122,
                latitudeDelta: 0.04,
                longitudeDelta: 0.09,
            }}

    }

     async componentDidMount() {

         await Permissions.askAsync(Permissions.LOCATION);

         this.setState({ mapLoaded: true });

     }

    onRegionChange = (region) => {
        console.log(region);
        this.setState({ region })
    }

     onButtonPress = () => {
        this.props.fetchJobs(this.state.region)
     }

    render() {
        if(!this.state.mapLoaded){
            return (
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return(
            <View style={styles.container} >
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.region}
                        onRegionChange={this.onRegionChange}
                    />
                <View style={styles.buttonStyle}>
                    <Button
                        large
                        title="Search Area"
                        backgroundColor="#009688"
                        icon={{ name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>

            </View>


                );
            }
        }

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
};

export default connect(null, actions)(MapScreen);

