import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_STATE_TO_INITIAL_STATE,
  SHOW_LOADER_MODAL,
  HIDE_LOADER_MODAL
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  // Routing Params is used to direct user to a certain url from the modal
  let routingParams = '';
  let module = '';

  // Project Values is used to delete, share or copy projects/folders
  let projectValues = {};
  let callback;

  switch (action.type) {
    case SHOW_MODAL:
      if (!action.modal) {
        return state;
      }
      if(action.routingParams) {
        routingParams = action.routingParams
      }
      if(action.module) {
        module = action.module
      }
      if(action.projectValues) {
        projectValues = action.projectValues
      }
      if(action.callback) {
        callback = action.callback
      }

      return {...state, currentModal: action.modal, routingParams: routingParams, module: module, projectValues: projectValues, callback: callback}
    case HIDE_MODAL:
      return {...state, currentModal: false};
    case SHOW_LOADER_MODAL:
      return {...state, loaderModal: action.modal}
    case HIDE_LOADER_MODAL:
      return {...state, loaderModal: false};
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;
    
  }
  return state;
}

