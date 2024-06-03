import {
  AUTH_ERROR_MESSAGE,
  AUTH_SUCCESS_MESSAGE, 
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  REMOVER_SPINNER,
  ADD_SPINNER,
  SIGNOUT_SUCCESS,
  SET_AUTH_NON_SIGNED_IN_USER,
  SHOW_NON_SIGNED_IN_USER_MESSAGE
} from '../actions/types';

const initialState = {
  isNonSignedInUser: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_ERROR_MESSAGE: 
       return {...state, error: action.payload};
    case AUTH_SUCCESS_MESSAGE: 
      return {...state, sucessMessage: action.payload};
    case SIGNIN_REQUEST:
      return {...state, isFetching: true};
    case SIGNOUT_SUCCESS:
      return {...state, authenticated: false}
    case SIGNIN_SUCCESS:
      return {...state, authenticated: true};
    case REMOVER_SPINNER:
      return {...state, isFetching: false};
    case ADD_SPINNER: 
      return {...state, isFetching: true};
    case SET_AUTH_NON_SIGNED_IN_USER:
      return {...state, isNonSignedInUser: action.payload};
    case SHOW_NON_SIGNED_IN_USER_MESSAGE:
      return {...state, showNonSignedInUserMessage: action.payload};
  }
  return state;
}
