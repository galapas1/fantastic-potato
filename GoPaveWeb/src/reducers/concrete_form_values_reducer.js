import {
  CONCRETE_ADD_PAVEMENT_STRUCTURE_TYPE,
  CONCRETE_REMOVE_PAVEMENT_STRUCTURE_TYPE,
  CONCRETE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  CONCRETE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  CONCRETE_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  CONCRETE_SET_K_VALUE_GRAPH_VALUES,
  CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
  CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
  CONCRETE_EDIT_ASPHALT_ANALYSIS_BUTTON,
  CONCRETE_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES,
  CONCRETE_SET_ASPHALT_ANALSIS_FORM_VALUES,
  UPDATE_CONCRETE_ASPHALT_ANALSIS_FORM_VALUES,
  CONCRETE_SET_MRSG_INPUT_VALUE,
  CONCRETE_SET_JPCP_DOWELED_K_VALUE_GRAPH_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_K_VALUE_GRAPH_VALUES,
  CONCRETE_SET_JPCP_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  CONCRETE_SET_JPCP_DOWELED_RELIABILITY_GRAPH_VALUES, 
  CONCRETE_SET_JPCP_UNDOWELED_RELIABILITY_GRAPH_VALUES, 
  CONCRETE_SET_JPCP_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
  CONCRETE_SET_JPCP_DOWELED_CRACKING_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_CRACKING_VALUES,
  CONCRETE_SET_JPCP_DOWELED_FAULTING_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_FAULTING_VALUES,
  CONCRETE_SET_JPCP_DOWELED_FATIGUE_USED_VALUE,
  CONCRETE_SET_JPCP_UNDOWELED_FATIGUE_USED_VALUE,
  CONCRETE_SET_JPCP_DOWELED_EROSION_USED_VALUE,
  CONCRETE_SET_JPCP_UNDOWELED_EROSION_USED_VALUE,
  CONCRETE_SET_RCC_K_VALUE_GRAPH_VALUES,
  CONCRETE_SET_RCC_FLEXURAL_STRENGTH_GRAPH_VALUES,
  CONCRETE_SET_RCC_RELIABILITY_GRAPH_VALUES,
  CONCRETE_SET_RCC_DESIGN_LIFE_GRAPH_VALUES, 
  CONCRETE_SET_RCC_SLABS_CRACKED_GRAPH_VALUES,
  CONCRETE_SET_RCC_FATIGUE_USED_VALUE,
  CONCRETE_SET_RCC_EROSION_USED_VALUE,
  CONCRETE_SET_RCC_CRACKING_VALUES,
  CONCRETE_SET_RCC_FAULTING_VALUES,
  CONCRETE_SET_JPCP_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
  CONCRETE_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED,
  CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  CONCRETE_SET_CURRENT_PROJECT_VALUES,
  SET_STATE_TO_INITIAL_STATE
} from '../actions/types';

const initialState = { 
  asphaltAnalysisFormValues: {
    asphaltAnalysisLayers: [
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}, 
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}, 
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}, 
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}, 
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}, 
    {asphaltAnalysisLayerTypeDropdown: 'Select Material'}],
    reliability: 85,
    overallStandardDeviation: 0.45,
    initialServiceability: 4.5,
    terminalServiceability:2.5,
    asphaltAnalysisNumberOfLayersDropdown: '1 Layer'
  },
  trafficFormInputsDropdownDisbaled: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;
    case CONCRETE_SET_CURRENT_PROJECT_VALUES: 
      return {...state, ...action.payload};
    case CONCRETE_ADD_PAVEMENT_STRUCTURE_TYPE: 
      return {...state, pavementStructureType: action.payload};
    case CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, showCompositeKValueRadioButton: action.payload};
    case CONCRETE_REMOVE_PAVEMENT_STRUCTURE_TYPE: 
      return {...state, pavementStructureType: ""};
    case CONCRETE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, customTrafficSpectrumFormValues: action.payload};
    case CONCRETE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, initialCustomTrafficSpectrumFormValues: action.payload};
    case CONCRETE_SET_TRAFFIC_SUMMARY_FORM_VALUES: 
      return {...state, trafficSummaryFormValues: action.payload};
    case CONCRETE_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED: 
      return {...state, trafficFormInputsDropdownDisbaled: action.payload};
    case CONCRETE_SET_K_VALUE_GRAPH_VALUES: 
      return {...state, crcpKValueGraphData: action.payload};
    case CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, crcpFlexuralStrengthGraphData: action.payload};
    case CONCRETE_SET_RELIABILITY_GRAPH_VALUES: 
      return {...state, crcpReliabilityGraphData: action.payload};
    case CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, crcpDesignLifeGraphData: action.payload};
    case CONCRETE_SET_RCC_K_VALUE_GRAPH_VALUES: 
      return {...state, rccKValueGraphData: action.payload};
    case CONCRETE_SET_RCC_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, rccFlexuralStrengthGraphData: action.payload};
    case CONCRETE_SET_RCC_RELIABILITY_GRAPH_VALUES: 
      return {...state, rccReliabilityGraphData: action.payload};
    case CONCRETE_SET_RCC_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, rccDesignLifeGraphData: action.payload};
    case CONCRETE_SET_RCC_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, rccSlabsCrackedGraphData: action.payload};
    case CONCRETE_SET_RCC_EROSION_USED_VALUE: 
      return {...state, rccErosionUsedValue: action.payload};
    case CONCRETE_SET_RCC_FATIGUE_USED_VALUE: 
      return {...state, rccFatigueUsedValue: action.payload};
    case CONCRETE_SET_RCC_CRACKING_VALUES: 
      return {...state, rccCrackingValues: action.payload};
    case CONCRETE_SET_RCC_FAULTING_VALUES: 
      return {...state, rccFaultingValues: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, jpcpDoweledKValueGraphData: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, jpcpUndoweledKValueGraphData: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, jpcpDoweledFlexuralStrengthGraphData: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, jpcpUndoweledFlexuralStrengthGraphData: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, jpcpDoweledReliabilityGraphData: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, jpcpUndoweledReliabilityGraphData: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, jpcpDoweledSlabsCrackedGraphData: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, jpcpUndoweledSlabsCrackedGraphData: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, jpcpDoweledDesignLifeGraphData: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, jpcpUndoweledDesignLifeGraphData: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_FATIGUE_USED_VALUE: 
      return {...state, jpcpDoweledFatigueUsedValue: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_FATIGUE_USED_VALUE: 
      return {...state, jpcpUndoweledFatigueUsedValue: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_EROSION_USED_VALUE: 
      return {...state, jpcpDoweledErosionUsedValue: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_EROSION_USED_VALUE: 
      return {...state,jpcpUndoweledErosionUsedValue: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_CRACKING_VALUES: 
      return {...state, jpcpDoweledCrackingValues: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_CRACKING_VALUES: 
      return {...state, jpcpUndoweledCrackingValues: action.payload};
    case CONCRETE_SET_JPCP_DOWELED_FAULTING_VALUES: 
      return {...state, jpcpDoweledFaultingValues: action.payload};
    case CONCRETE_SET_JPCP_UNDOWELED_FAULTING_VALUES: 
      return {...state, jpcpUndoweledFaultingValues: action.payload};
    case CONCRETE_EDIT_ASPHALT_ANALYSIS_BUTTON: 
      return {...state, showEditAnalysisButton: action.payload};
    case CONCRETE_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES: 
      return {...state, editDefaultParametres: action.payload};
    case CONCRETE_SET_ASPHALT_ANALSIS_FORM_VALUES: 
      return {...state, asphaltAnalysisFormValues: action.payload};
    case CONCRETE_SET_MRSG_INPUT_VALUE: 
      return {...state, mrsgInputValue: action.payload};
    case UPDATE_CONCRETE_ASPHALT_ANALSIS_FORM_VALUES: 
      return {...state, asphaltAnalysisFormValues: {
        ...state.asphaltAnalysisFormValues, ...action.payload
      }}
  }

  return state;
}
