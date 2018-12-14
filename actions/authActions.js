import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";
import { Facebook } from 'expo';

// Using AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');
//will return a Promise

export const facebookLogin = () => {
  return async dispatch => {
      let token = await AsyncStorage.getItem('fb_token');

      if(token) {
          // Dispatch action confirming user is logged in
          dispatch({
              type: FACEBOOK_LOGIN_SUCCESS,
              payload: token
          })
      } else {
          //    procced to FB login
          doFacebookLogin(dispatch);

      }
  }
}

//Helper function
const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('301172757186055', {
        persmissions: ['public_profile']
    });

    if(type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL});
    }
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
}
