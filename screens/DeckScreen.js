import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect }  from 'react-redux';
import { MapView } from 'expo';
import { Card, Buttom } from 'react-native-elements';


import Swipe from '../components/Swipe';
import * as actions from '../actions/index';


 class DeckScreen extends Component {
     renderCard(job) {
         return(
             <Card containerStyle={styles.containerStyle} title={job.title}>
                 <View style={{ height: 100, width: 350}}>

                     <Image
                             style={styles.image}
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
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likedJob(job)}
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
        marginTop: 20
    },
    containerStyle: {
        height: 600
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',

    },
    container: {
        backgroundColor:'green',
        flex: 1,
    },
    child: {
        flex: 1,
        backgroundColor: 'blue',
        transform: [
            { perspective: 850 },
            { translateX: - Dimensions.get('window').width * 0.24 },
            { rotateY: '60deg'},

        ],
    }
}



function mapStateToProps({jobs}) {
     return { jobs }
}

export default connect(mapStateToProps, actions)(DeckScreen);
