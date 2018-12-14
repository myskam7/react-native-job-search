import { combineReducers }  from 'redux';
import auth from './authReducer';
import jobs from './jobsReducer';
import deck from './deckReducer';


export default combineReducers(
    {
        auth: auth,
        jobs: jobs,
        deck: deck
    }
    );
