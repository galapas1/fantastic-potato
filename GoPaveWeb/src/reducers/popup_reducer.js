import {
  SHOW_POPUP,
  HIDE_POPUP,
  SET_STATE_TO_INITIAL_STATE
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  let popupDetails = '';
  let graphData;

  switch (action.type) {
    case SHOW_POPUP:
      if (!action.popup) {
        return state;
      }
      if(action.popupDetails) {
        popupDetails = action.popupDetails
      }
      if(action.graphData) {
        graphData = action.graphData;
      }

      return {...state, showPopup: true, currentPopup: action.popup, popupDetails: popupDetails, graphData: graphData}
    case HIDE_POPUP:
      return {...state, showPopup: false, currentPopup: false};
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;

  }
  return state;
}
