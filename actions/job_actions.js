import axios from 'axios';
import { Location } from 'expo';
import qs from 'qs';



import { FETCH_JOBS} from "./types";

 const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';
//
const buildJobUrl = (zip) => {
    const query = qs.stringify({location: zip});
    return `${JOB_ROOT_URL}${query}`;
}


export const fetchJobs = (region) => async (dispatch) => {
    try {
        let zip = await Location.reverseGeocodeAsync(region);
        const url = buildJobUrl(zip);
       let { data } = await axios.get(url);
       dispatch({ type: FETCH_JOBS, payload: data })
        console.log(data);
    } catch(err) {
        console.log(err);
    }

    }

