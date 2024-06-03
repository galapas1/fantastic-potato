import {
  PARKING_PAVEMENT_STRUCTURE_SET_ROW_CHOSEN,
  PARKING_SET_K_VALUE_GRAPH_VALUES,
  PARKING_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  PARKING_SET_RELIABILITY_GRAPH_VALUES,
  PARKING_SET_DESIGN_LIFE_GRAPH_VALUES, 
  PARKING_SET_SLABS_CRACKED_GRAPH_VALUES,
  PARKING_SET_FATIGUE_USED_VALUE,
  PARKING_SET_EROSION_USED_VALUE,
  PARKING_SET_CRACKING_VALUES,
  PARKING_SET_FAULTING_VALUES,
  PARKING_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  PARKING_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  PARKING_SET_CURRENT_PROJECT_VALUES,
  SET_STATE_TO_INITIAL_STATE
} from '../actions/types';

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATE_TO_INITIAL_STATE: 
          return initialState;
    case PARKING_SET_CURRENT_PROJECT_VALUES: 
      return {...state, ...action.payload};
    case PARKING_PAVEMENT_STRUCTURE_SET_ROW_CHOSEN: 
      return {...state, parkingPavementStructureTableRowChosen: action.payload};
    case PARKING_SET_K_VALUE_GRAPH_VALUES: 
      return {...state, parkingKValueGraphData: action.payload};
    case PARKING_SET_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, parkingFlexuralStrengthGraphData: action.payload};
    case PARKING_SET_RELIABILITY_GRAPH_VALUES: 
      return {...state, parkingReliabilityGraphData: action.payload};
    case PARKING_SET_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, parkingDesignLifeGraphData: action.payload};
    case PARKING_SET_SLABS_CRACKED_GRAPH_VALUES: 
        return { ...state, parkingSlabsCrackedGraphData: action.payload };
    case PARKING_SET_EROSION_USED_VALUE:
        return { ...state, parkingErosionUsedValue: action.payload };
    case PARKING_SET_FATIGUE_USED_VALUE:
          return { ...state, parkingFatigueUsedValue: action.payload };
    case PARKING_SET_CRACKING_VALUES:
          return { ...state, parkingCrackingValues: action.payload };
    case PARKING_SET_FAULTING_VALUES:
          return { ...state, parkingFaultingValues: action.payload };
    case PARKING_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, showCompositeKValueRadioButton: action.payload};
    case PARKING_SET_TRAFFIC_SUMMARY_FORM_VALUES: 
      return {...state, trafficSummaryFormValues: action.payload};
  }

  return state;
}
