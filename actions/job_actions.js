import axios from 'axios';
import { Location } from 'expo';
import qs from 'qs';


import { FETCH_JOBS, LIKE_JOB } from "./types";
import Geocoder from 'react-native-geocoding';
import { GOOGLE_GEOCOORDS_API_KEY } from 'react-native-dotenv'

//

Geocoder.init(GOOGLE_GEOCOORDS_API_KEY);


// const card = Geocoder.from(job.location)
//     .then(json => {
//         location = json.results[0].geometry.location;
//
//     })
//     .catch(error => console.warn(error));

 const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';
//
const buildJobUrl = (zip) => {
    const query = qs.stringify({location: zip});
    return `${JOB_ROOT_URL}${query}`;
}

// const getLatLong = (job) => {
//
// }

export const fetchJobs = (region, cb) => async (dispatch) => {
    try {
        let zip = await Location.reverseGeocodeAsync(region);
        const url = buildJobUrl(zip);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        console.log(data);
        cb();
    } catch(err) {
        console.log(err);
    }
    }


    export const likedJob = (job) => async (dispatch) => {
    try {
        await Geocoder.from(job.location)
            .then(json => {
                let local = json.results[0].geometry.location;
                let data = {...job, local}
                console.log(data);
                dispatch({
                    ...job,
                    payload: data,
                    type: LIKE_JOB
                })
            })
      } catch(err) {
        console.log(err);
    }


    }
