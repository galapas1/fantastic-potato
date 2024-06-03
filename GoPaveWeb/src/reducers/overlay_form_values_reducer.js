import {
  OVERLAY_ADD_PAVEMENT_STRUCTURE_TYPE,
  OVERLAY_REMOVE_PAVEMENT_STRUCTURE_TYPE,
  OVERLAY_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  OVERLAY_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  OVERLAY_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  OVERLAY_EDIT_ASPHALT_ANALYSIS_BUTTON,
  OVERLAY_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES,
  OVERLAY_SET_ASPHALT_ANALSIS_FORM_VALUES,
  UPDATE_OVERLAY_ASPHALT_ANALSIS_FORM_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_K_VALUE_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_EROSION_USED_VALUE, 
  OVERLAY_BONDED_CONCRETE_SET_FATIGUE_USED_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_CRACKING_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_FAULTING_VALUES,
  OVERLAY_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_RELIABILITY_GRAPH_VALUES, 
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES, 
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_EROSION_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_EROSION_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_RELIABILITY_GRAPH_VALUES, 
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES, 
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_EROSION_USED_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_EROSION_USED_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_SET_MRSG_INPUT_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_SET_CURRENT_PROJECT_VALUES,
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
    case OVERLAY_SET_CURRENT_PROJECT_VALUES: 
      return {...state, ...action.payload};
    case OVERLAY_ADD_PAVEMENT_STRUCTURE_TYPE: 
      return {...state, pavementStructureType: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, unbondedAsphaltShowCompositeKValueRadioButton: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, bondedConcreteShowCompositeKValueRadioButton: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE: 
      return {...state, unbondedConcreteShowCompositeKValueRadioButton: action.payload};
    case OVERLAY_REMOVE_PAVEMENT_STRUCTURE_TYPE: 
      return {...state, pavementStructureType: ""};
    case OVERLAY_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, customTrafficSpectrumFormValues: action.payload};
    case OVERLAY_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES: 
      return {...state, initialCustomTrafficSpectrumFormValues: action.payload};
    case OVERLAY_SET_TRAFFIC_SUMMARY_FORM_VALUES: 
      return {...state, trafficSummaryFormValues: action.payload};
    case OVERLAY_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED: 
      return {...state, trafficFormInputsDropdownDisbaled: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_K_VALUE_GRAPH_VALUES: 
      return {...state, bondedConcreteKValueGraphData: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, bondedConcreteFlexuralStrengthGraphData: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_RELIABILITY_GRAPH_VALUES: 
      return {...state, bondedConcreteReliabilityGraphData: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, bondedConcreteDesignLifeGraphData: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, bondedConcreteSlabsCrackedGraphData: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_EROSION_USED_VALUE: 
      return {...state, bondedConcreteErosionUsedValue: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_FATIGUE_USED_VALUE: 
      return {...state, bondedConcreteFatigueUsedValue: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_CRACKING_VALUES: 
      return {...state, bondedConcreteCrackingValues: action.payload};
    case OVERLAY_BONDED_CONCRETE_SET_FAULTING_VALUES: 
      return {...state, bondedConcreteFaultingValues: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, unbondedConcreteDoweledKValueGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, unbondedConcreteUndoweledKValueGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, unbondedConcreteDoweledFlexuralStrengthGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, unbondedConcreteUndoweledFlexuralStrengthGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, unbondedConcreteDoweledReliabilityGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, unbondedConcreteUndoweledReliabilityGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, unbondedConcreteDoweledSlabsCrackedGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, unbondedConcreteUndoweledSlabsCrackedGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, unbondedConcreteDoweledDesignLifeGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, unbondedConcreteUndoweledDesignLifeGraphData: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FATIGUE_USED_VALUE: 
      return {...state, unbondedConcreteDoweledFatigueUsedValue: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FATIGUE_USED_VALUE: 
      return {...state, unbondedConcreteUndoweledFatigueUsedValue: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_EROSION_USED_VALUE: 
      return {...state, unbondedConcreteDoweledErosionUsedValue: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_EROSION_USED_VALUE: 
      return {...state, unbondedConcreteUndoweledErosionUsedValue: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_CRACKING_VALUES: 
      return {...state, unbondedConcreteDoweledCrackingValues: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_CRACKING_VALUES: 
      return {...state, unbondedConcreteUndoweledCrackingValues: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FAULTING_VALUES: 
      return {...state, unbondedConcreteDoweledFaultingValues: action.payload};
    case OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FAULTING_VALUES: 
      return {...state, unbondedConcreteUndoweledFaultingValues: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, unbondedAsphaltDoweledKValueGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_K_VALUE_GRAPH_VALUES: 
      return {...state, unbondedAsphaltUndoweledKValueGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, unbondedAsphaltDoweledFlexuralStrengthGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES: 
      return {...state, unbondedAsphaltUndoweledFlexuralStrengthGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, unbondedAsphaltDoweledReliabilityGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES: 
      return {...state, unbondedAsphaltUndoweledReliabilityGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, unbondedAsphaltDoweledSlabsCrackedGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES: 
      return {...state, unbondedAsphaltUndoweledSlabsCrackedGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, unbondedAsphaltDoweledDesignLifeGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES: 
      return {...state, unbondedAsphaltUndoweledDesignLifeGraphData: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FATIGUE_USED_VALUE: 
      return {...state, unbondedAsphaltDoweledFatigueUsedValue: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FATIGUE_USED_VALUE: 
      return {...state, unbondedAsphaltUndoweledFatigueUsedValue: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_EROSION_USED_VALUE: 
      return {...state, unbondedAsphaltDoweledErosionUsedValue: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_EROSION_USED_VALUE: 
      return {...state, unbondedAsphaltUndoweledErosionUsedValue: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_CRACKING_VALUES: 
      return {...state, unbondedAsphaltDoweledCrackingValues: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_CRACKING_VALUES: 
      return {...state, unbondedAsphaltUndoweledCrackingValues: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FAULTING_VALUES: 
      return {...state, unbondedAsphaltDoweledFaultingValues: action.payload};
    case OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FAULTING_VALUES: 
      return {...state, unbondedAsphaltUndoweledFaultingValues: action.payload};
    case OVERLAY_EDIT_ASPHALT_ANALYSIS_BUTTON: 
      return {...state, showEditAnalysisButton: action.payload};
    case OVERLAY_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES: 
      return {...state, editDefaultParametres: action.payload};
    case OVERLAY_SET_ASPHALT_ANALSIS_FORM_VALUES: 
      return {...state, asphaltAnalysisFormValues: action.payload};
    case OVERLAY_SET_MRSG_INPUT_VALUE: 
      return {...state, mrsgInputValue: action.payload};
    case UPDATE_OVERLAY_ASPHALT_ANALSIS_FORM_VALUES: 
      return {...state, asphaltAnalysisFormValues: {
          ...state.overlayAsphaltAnalysisFormValues, ...action.payload
      }}
  }

  return state;
}
