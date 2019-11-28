import axios from 'axios';
import {
  FETCH_RESPONSES_REQUEST,
  FETCH_RESPONSES_SUCCESS,
  FETCH_RESPONSES_FAILURE,
  ADD_RESPONSE,
  FETCH_ADD_RESPONSE_FAILURE,
} from '../../constants/ActionTypes'


const fetchResponsesRequest = () => {
  return {
    type: FETCH_RESPONSES_REQUEST
  }
}

const fetchResponsesSucess = responses => {
    return {
        type: FETCH_RESPONSES_SUCCESS,
        payload: responses
    }
}

const fetchResponsesFailure = error => {
    return {
        type: FETCH_RESPONSES_FAILURE,
        payload: error
    }
}
const fetchAddResponseSucess = responses => {
  return {
      type: ADD_RESPONSE,
      payload: responses
  }
}

const fetchAddResponseFailure = error => {
  return {
      type: FETCH_ADD_RESPONSE_FAILURE,
      payload: error
  }
}


export const fetchResponses = (id) => {
  return function(dispatch, getState) {
      dispatch(fetchResponsesRequest())
      let base64 = require('base-64');
      const user = localStorage.getItem('username');
      const pass = localStorage.getItem('password');
       axios.get(process.env.REACT_APP_API_HOST+'/comments/responses/'+id, {
        headers: {'Authorization' : 'Basic '+ base64.encode(user+ ":"+ pass)},
      })
        .then( res =>{
          let result = [];

          Object.values(res.data).forEach(item => {
              result = result.concat(item);
          });
          console.log(result);
          dispatch(fetchResponsesSucess(result))
        })
        .catch(error => {
          console.log(error)
          dispatch(fetchResponsesFailure(error))
        })
    }
}
//
export const fetchAddResponse = (state) => {
  return function(dispatch, getState) {
      dispatch(fetchResponsesRequest())
      let base64 = require('base-64');
      const user = localStorage.getItem('username');
      const pass = localStorage.getItem('password');
       axios.post(process.env.REACT_APP_API_HOST+'/comments/createResponse',{
         description: state.description,
         userId: state.user_id,
         challengeId: state.challenge_id,
         commentId: state.comment_id},{
        headers: {'Authorization' : 'Basic '+ base64.encode(user+ ":"+ pass)},
      })
        .then( res =>{
          console.log(res.data);
          dispatch(fetchAddResponseSucess(res.data))
        })
        .catch(error => {
          console.log(error)
          dispatch(fetchAddResponseFailure(error))
        })
    }
}
