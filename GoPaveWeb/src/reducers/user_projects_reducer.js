import {
  SET_USER_PROJECTS,
  ADD_PROJECT_ERROR_MESSAGE,
  ADD_PROJECT_SHARE_ERROR_MESSAGE,
  ADD_PROJECT_ADD_SPINNER,
  ADD_PROJECT_REMOVE_SPINNER,
  UPDATE_USER_PROJECT,
  ADD_USER_PROJECT,
  SET_USER_FOLDERS_AND_PROJECTS_TO_NILL
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROJECTS:
      return {...state, projects: action.payload };
    case ADD_PROJECT_ERROR_MESSAGE:
      return {...state, addProjectError: action.payload};
    case ADD_PROJECT_SHARE_ERROR_MESSAGE:
      return {...state, addProjectShareError: action.payload};
    case ADD_PROJECT_ADD_SPINNER:
      return {...state, isFetching: true};
    case ADD_PROJECT_REMOVE_SPINNER:
      return {...state, isFetching: false};
    case ADD_USER_PROJECT:
      return {...state, projects: {
        ...state.projects, [action.payload.id]: action.payload
      }};
    // case UPDATE_USER_PROJECT:
    //   return {...state, projects: {
    //     ...state.projects, [action.payload.id]: action.payload
    //   }};
    case SET_USER_FOLDERS_AND_PROJECTS_TO_NILL:
      return initialState;
    default:
      return state;
  }
}
