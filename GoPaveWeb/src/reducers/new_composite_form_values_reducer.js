import {
NEW_COMPOSITE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES, 
NEW_COMPOSITE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES, 
NEW_COMPOSITE_SET_TRAFFIC_SUMMARY_FORM_VALUES,
NEW_COMPOSITE_ADD_PAVEMENT_STRUCTURE_TYPE,
NEW_COMPOSITE_JPCP_SET_DOWELED_K_VALUE_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_K_VALUE_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_RELIABILITY_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_CRACKING_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_CRACKING_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_FAULTING_VALUES,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_FAULTING_VALUES,
NEW_COMPOSITE_JPCP_SET_DOWELED_FATIGUE_USED_VALUE,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_FATIGUE_USED_VALUE,
NEW_COMPOSITE_JPCP_SET_DOWELED_EROSION_USED_VALUE,
NEW_COMPOSITE_JPCP_SET_UNDOWELED_EROSION_USED_VALUE,
NEW_COMPOSITE_RCC_SET_K_VALUE_GRAPH_VALUES,
NEW_COMPOSITE_RCC_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
NEW_COMPOSITE_RCC_SET_RELIABILITY_GRAPH_VALUES,
NEW_COMPOSITE_RCC_SET_DESIGN_LIFE_GRAPH_VALUES,
NEW_COMPOSITE_RCC_SET_SLABS_CRACKED_GRAPH_VALUES,
NEW_COMPOSITE_RCC_SET_FATIGUE_USED_VALUE,
NEW_COMPOSITE_RCC_SET_EROSION_USED_VALUE,
NEW_COMPOSITE_RCC_SET_CRACKING_VALUES,
NEW_COMPOSITE_RCC_SET_FAULTING_VALUES,
NEW_COMPOSITE_JPCP_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
NEW_COMPOSITE_RCC_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
NEW_COMPOSITE_SET_CURRENT_PROJECT_VALUES,
SET_STATE_TO_INITIAL_STATE,
NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DESIGN_LAYER_VALUES,
NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DESIGN_LAYER_VALUES,
NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DESIGN_LAYER_VALUES,
NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_GRAPH_VALUES,
NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_GRAPH_VALUES,
NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_GRAPH_VALUES,
NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
} from '../actions/types';

const initialState = { 
  type: 'JPCP'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;
    case NEW_COMPOSITE_SET_CURRENT_PROJECT_VALUES: 
      return {...state, ...action.payload};
    case NEW_COMPOSITE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, customTrafficSpectrumFormValues: action.payload};
    case NEW_COMPOSITE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, initialCustomTrafficSpectrumFormValues: action.payload};
    case NEW_COMPOSITE_SET_TRAFFIC_SUMMARY_FORM_VALUES: 
      return {...state, trafficSummaryFormValues: action.payload};
    case NEW_COMPOSITE_ADD_PAVEMENT_STRUCTURE_TYPE: 
      return {...state, type: action.payload};
    case NEW_COMPOSITE_JPCP_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, jpcpShowCompositeKValueRadioButton: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, jpcpDoweledKValueGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, jpcpUndoweledKValueGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, jpcpDoweledFlexuralStrengthGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, jpcpUndoweledFlexuralStrengthGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, jpcpDoweledReliabilityGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, jpcpUndoweledReliabilityGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, jpcpDoweledSlabsCrackedGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, jpcpUndoweledSlabsCrackedGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, jpcpDoweledDesignLifeGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, jpcpUndoweledDesignLifeGraphData: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_FATIGUE_USED_VALUE: 
      return {...state, jpcpDoweledFatigueUsedValue: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_FATIGUE_USED_VALUE: 
      return {...state, jpcpUndoweledFatigueUsedValue: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_EROSION_USED_VALUE: 
      return {...state, jpcpDoweledErosionUsedValue: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_EROSION_USED_VALUE: 
      return {...state, jpcpUndoweledErosionUsedValue: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_CRACKING_VALUES: 
      return {...state, jpcpDoweledCrackingValues: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_CRACKING_VALUES: 
      return {...state, jpcpUndoweledCrackingValues: action.payload};
    case NEW_COMPOSITE_JPCP_SET_DOWELED_FAULTING_VALUES: 
      return {...state, jpcpDoweledFaultingValues: action.payload};
    case NEW_COMPOSITE_RCC_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, rccShowCompositeKValueRadioButton: action.payload};
    case NEW_COMPOSITE_JPCP_SET_UNDOWELED_FAULTING_VALUES: 
      return {...state, jpcpUndoweledFaultingValues: action.payload};
    case NEW_COMPOSITE_RCC_SET_K_VALUE_GRAPH_VALUES: 
      return {...state, rccKValueGraphData: action.payload};
    case NEW_COMPOSITE_RCC_SET_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, rccFlexuralStrengthGraphData: action.payload};
    case NEW_COMPOSITE_RCC_SET_RELIABILITY_GRAPH_VALUES: 
      return {...state, rccReliabilityGraphData: action.payload};
    case NEW_COMPOSITE_RCC_SET_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, rccDesignLifeGraphData: action.payload};
    case NEW_COMPOSITE_RCC_SET_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, rccSlabsCrackedGraphData: action.payload};
    case NEW_COMPOSITE_RCC_SET_EROSION_USED_VALUE: 
      return {...state, rccErosionUsedValue: action.payload};
    case NEW_COMPOSITE_RCC_SET_FATIGUE_USED_VALUE: 
      return {...state, rccFatigueUsedValue: action.payload};
    case NEW_COMPOSITE_RCC_SET_CRACKING_VALUES: 
      return {...state, rccCrackingValues: action.payload};
    case NEW_COMPOSITE_RCC_SET_FAULTING_VALUES: 
      return {...state, rccFaultingValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_GRAPH_VALUES: 
      return {...state, asphaltSummaryHdgGraphValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES: 
      return {...state, asphaltSummaryHdgGraphDamageReferenceLinesValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DESIGN_LAYER_VALUES: 
      return {...state, asphaltSummaryHdgGraphDesignlayerValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_GRAPH_VALUES: 
      return {...state, asphaltSummaryBstGraphValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES: 
      return {...state, asphaltSummaryBstGraphDamageReferenceLinesValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DESIGN_LAYER_VALUES: 
      return {...state, asphaltSummaryBstGraphDesignlayerValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_GRAPH_VALUES: 
      return {...state, asphaltSummaryOtherGraphValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES: 
      return {...state, asphaltSummaryOtherGraphDamageReferenceLinesValues: action.payload};
    case NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DESIGN_LAYER_VALUES: 
      return {...state, asphaltSummaryOtherGraphDesignlayerValues: action.payload};
      
  }

  return state;
}
