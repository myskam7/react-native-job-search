import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect }  from 'react-redux';
import { MapView } from 'expo';
import { Card, Buttom } from 'react-native-elements';


import Swipe from '../components/Swipe';
import * as actions from '../actions/index';


 class DeckScreen extends Component {
     renderCard(job) {
         return(
             <Card containerStyle={styles.containerStyle} title={job.title}>
                 <View style={{height: 100}}>
                     {/*<MapView*/}
                         {/*scrollEnabled={false}*/}
                         {/*style={{flex: 1}}*/}
                         {/*cacheEnabled={true}*/}
                         {/*initialRegion={{ job.location}}*/}
                     {/*>*/}
                     {/*</MapView>*/}
                     <Image
                         style={{width: 100, height: 100, alignItems: 'center', overflow: 'hidden'}}
                         source={{uri: job.company_logo}}
                     />
                 </View>

                 <View style={styles.cardWrapper}>

                     <Text>{job.company}</Text>
                     <Text>{job.created_at}</Text>
                 </View>
                 <Text style={{height: 300, overflow: 'hidden'}}>{job.description.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<ul>/g, '').replace(/<\/ul>/g, '').replace(/<li>/g, '').replace(/<\/li>/g, '')}</Text>
             </Card>
         )

     }

     renderNoMoreCards = () => {
         return (
             <Card title="No more jobs for this location!"/>
         )
     }


    render() {
        return(
            <View style={{marginTop: 50, height: 200}}>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    onSwipeRight{job => this.props.likeJ(job)}
                    onSwipeLeft{job => this.props.dislikeJ(job)}
                    renderNoMoreCards={this.renderNoMoreCards}
                    keyProp="id"
                />

            </View>
        )
    }
}

const styles = {
    cardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    containerStyle: {
        height: 600
    }
}



function mapStateToProps({jobs}) {
     return { jobs: jobs}
}

export default connect(mapStateToProps, actions)(DeckScreen);
