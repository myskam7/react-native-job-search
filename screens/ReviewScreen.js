import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import {Button, Card} from 'react-native-elements';
import { MapView } from 'expo';

import { connect } from 'react-redux';
import * as actions from '../actions/index';


class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
        title: 'Review Jobs',
        headerRight: (
            <Button
                title='Settings'
                onPress={() => navigation.navigate('Settings')}
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0, 122, 255, 1)"
            />
        ),
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
        }
    }


    renderLikedJobs = () => {

        return this.props.likedJob.map(job => {
            return (
                <Card key={job.id}>
                    <View style={{height: 300}}>
                        <MapView
                            key={job.id}
                            scrollEnabled={false}
                            style={{flex: 1}}
                            cacheEnabled={true}
                            initialRegion={{
                                latitude: job.local.lat,
                                longitude: job.local.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >

                        </MapView>
                        <View style={styles.cardWrapper}>
                            <Text>{job.company}</Text>
                            <Text>{job.created_at}</Text>
                        </View>
                        <Button
                            backgroundColor="#03A9F4"
                            title="Click to Apply"
                            onPress={() => Linking.openURL(job.url)}
                        />
                    </View>
                </Card>

            );
console.log(latlong)

        });

    }
    render() {
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const styles = {
    cardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    }
}

function mapStateToProps(state){
  return {likedJob: state.likedJob}
}

export default connect(mapStateToProps)(ReviewScreen)
