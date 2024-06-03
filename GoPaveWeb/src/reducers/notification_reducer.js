import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CREATE_NEW_PROJECT
} from '../actions/types';

const initialState = {};
 
export default function notification(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {...state, message: action.message, level: action.level, autoDismiss: action.autoDismiss, uid: action.uid };
    case REMOVE_NOTIFICATION:
      return {...state, message: "" , level: ""  };
    case CREATE_NEW_PROJECT: 
      return initialState;
    default:
      return state;
  }
}