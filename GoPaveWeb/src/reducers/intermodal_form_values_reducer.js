import {
SET_STATE_TO_INITIAL_STATE,
SET_USER_VEHICLES,
ADD_SELECTED_USER_VEHICLE,
REMOVE_SELECTED_USER_VEHICLE,
SET_INTERMODAL_ADD_VEHICLE_WHEEL_COUNT,
SET_INTERMODAL_ADD_VEHICLE_WHEEL_POSITIONS,
INTERMODAL_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
INTERMODAL_SET_SUMMARY_PAGE_VEHICLES_INFO,
INTERMODAL_SET_CURRENT_PROJECT_VALUES,
ADD_USER_VEHICLE,
UPDATE_USER_VEHICLE
} from '../actions/types';

const initialState = {
  wheelPos: [],
  selectedVehicles: [],
  vehicles: []
}

export default function(state = initialState, action) {

  let vehicles;
  switch (action.type) {
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;
    case INTERMODAL_SET_CURRENT_PROJECT_VALUES:
      return {...state, ...action.payload};
    case SET_USER_VEHICLES:
     return {...state, vehicles: action.payload}
    case ADD_USER_VEHICLE:
      return {...state, 
        vehicles: [...state.vehicles, action.payload]}
    case UPDATE_USER_VEHICLE:
      vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload.id)
      return {...state, 
        vehicles: [...vehicles, action.payload]}
    case INTERMODAL_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, showCompositeKValueRadioButton: action.payload};
    case INTERMODAL_SET_SUMMARY_PAGE_VEHICLES_INFO: 
      return {...state, summaryVehiclesInfo: action.payload};
    case ADD_SELECTED_USER_VEHICLE:
     return {...state, 
      selectedVehicles: [...state.selectedVehicles, action.payload]}
    case REMOVE_SELECTED_USER_VEHICLE:
     return {...state, 
       selectedVehicles: [
                          ...state.selectedVehicles.slice(0, action.payload),
                          ...state.selectedVehicles.slice(action.payload + 1)
                        ]};
    case SET_INTERMODAL_ADD_VEHICLE_WHEEL_COUNT:
      return {...state, wheelCount: action.payload}
    case SET_INTERMODAL_ADD_VEHICLE_WHEEL_POSITIONS:
      return {...state, wheelPos: action.payload}
  }
  return state;
}
