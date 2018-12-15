import { combineReducers }  from 'redux';
import auth from './authReducer';
import jobs from './jobsReducer';
import deck from './deckReducer';
import likedJob from './likeReducer';


export default combineReducers(
    {
        auth: auth,
        jobs: jobs,
        deck: deck,
        likedJob: likedJob,
    }
    );
