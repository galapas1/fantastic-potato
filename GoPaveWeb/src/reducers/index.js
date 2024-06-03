import { combineReducers }         from 'redux';
import { reducer as formReducer }  from 'redux-form';

import authReducer                 from './auth_reducer';
import currentProjectReducer       from './current_project_reducer';
import userProjectsReducer         from './user_projects_reducer';
import userFoldersReducer          from './user_folders_reducer';

import { SET_STORE_STATE_TO_NILL } from '../actions/types';

const initialState = {}

// Currently this is set up for a non-logged in user
const rootReducer = (state, action) => {
  if (action.type === SET_STORE_STATE_TO_NILL) {
    state = undefined;
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  auth          : authReducer,
  form          : formReducer, // form Values for the current project loaded in the app
  currentProject: currentProjectReducer,
  userProjects  : userProjectsReducer,   // only for signed in user
  userFolders   : userFoldersReducer,    // only for signed in user
});

export default rootReducer;
