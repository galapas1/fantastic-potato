import {
  MY_PROJECTS_SET_CURRENTLY_SELECTED_FOLDER,
  SET_USER_FOLDERS,
  ADD_USER_FOLDER,
  ADD_FOLDER_ERROR_MESSAGE,
  ADD_FOLDER_ADD_SPINNER,
  ADD_FOLDER_REMOVE_SPINNER,
  SET_USER_FOLDERS_AND_PROJECTS_TO_NILL
} from '../actions/types';

const initialState = { 
  currentlySelectedFolder: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_FOLDERS:
      return {...state, folders: action.payload };
    case MY_PROJECTS_SET_CURRENTLY_SELECTED_FOLDER:
      return {...state, currentlySelectedFolder: action.payload};
    case ADD_USER_FOLDER:
      return {...state, folders: {
          ...state.folders, [action.payload.id]: action.payload
      }};
    case ADD_FOLDER_ERROR_MESSAGE:
      return {...state, addFolderError: action.payload};
    case ADD_FOLDER_ADD_SPINNER:
      return {...state, isFetching: true};
    case SET_USER_FOLDERS_AND_PROJECTS_TO_NILL:
      return initialState;  
    case ADD_FOLDER_REMOVE_SPINNER:
      return {...state, isFetching: false};
    default:
      return state;
  }
}