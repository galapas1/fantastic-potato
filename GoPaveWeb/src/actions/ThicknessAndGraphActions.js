import axios from 'axios';
import {change, initialize} from 'redux-form';
import {showLoaderModal, hideLoaderModal, addNotification } from './ModalsNotificationsActions';
import {extend, each, filter, map, max} from 'underscore';
import { asphaltSummaryLayerGraphValues, asphaltSummaryLayerGraphLayerValues, allSubbaseLayers } from 'Data/appValues';
import thunk from 'redux-thunk';

import {
  CONCRETE_SET_K_VALUE_GRAPH_VALUES,
  CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
  CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
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
  CONCRETE_SET_RCC_FATIGUE_USED_VALUE,
  CONCRETE_SET_RCC_EROSION_USED_VALUE,
  CONCRETE_SET_RCC_CRACKING_VALUES,
  CONCRETE_SET_RCC_FAULTING_VALUES,
  CONCRETE_SET_JPCP_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
  CONCRETE_SET_JPCP_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
  CONCRETE_SET_RCC_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_K_VALUE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_RELIABILITY_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_CRACKING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FAULTING_VALUES,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FATIGUE_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_EROSION_USED_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_EROSION_USED_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_K_VALUE_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_SLABS_CRACKED_GRAPH_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_EROSION_USED_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_FATIGUE_USED_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_CRACKING_VALUES,
  OVERLAY_BONDED_CONCRETE_SET_FAULTING_VALUES,
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
  PARKING_SET_K_VALUE_GRAPH_VALUES,
  PARKING_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
  PARKING_SET_RELIABILITY_GRAPH_VALUES,
  PARKING_SET_DESIGN_LIFE_GRAPH_VALUES, 
  PARKING_SET_SLABS_CRACKED_GRAPH_VALUES,
  PARKING_SET_FATIGUE_USED_VALUE,
  PARKING_SET_EROSION_USED_VALUE,
  PARKING_SET_CRACKING_VALUES,
  PARKING_SET_FAULTING_VALUES,
  NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DESIGN_LAYER_VALUES,
  NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DESIGN_LAYER_VALUES,
  NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DESIGN_LAYER_VALUES,
  NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_GRAPH_VALUES,
  NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_GRAPH_VALUES,
  NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_GRAPH_VALUES,
  NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
  NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
  NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES,
  INTERMODAL_SET_SUMMARY_PAGE_VEHICLES_INFO
} from './types';

import {
  BASE_URL,
  CONCRETE_CRCP_SUMMARY_FORM,
  CONCRETE_JPCP_SUMMARY_FORM,
  CONCRETE_RCC_SUMMARY_FORM,
  SINGLE_AXLE_WEIGHT,
  SINGLE_AXLE_PER_1000,
  SINGLE_AXLE_EXPECTED_REPETITIONS,
  SINGLE_AXLE_STRESS_RATIO,
  SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW,
  SINGLE_AXLE_FATIGUE_CONSUMED,
  TANDEM_AXLE_WEIGHT,
  TANDEM_AXLE_PER_1000,
  TANDEM_AXLE_EXPECTED_REPETITIONS,
  TANDEM_AXLE_STRESS_RATIO,
  TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW,
  TANDEM_AXLE_FATIGUE_CONSUMED,
  TRIDEM_AXLE_WEIGHT,
  TRIDEM_AXLE_PER_1000,
  TRIDEM_AXLE_EXPECTED_REPETITIONS,
  TRIDEM_AXLE_STRESS_RATIO,
  TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW,
  TRIDEM_AXLE_FATIGUE_CONSUMED,
  SINGLE_AXLE_ALLOWABLE_REPETIONS,
  SINGLE_AXLE_DAMAGE,
  TANDEM_AXLE_ALLOWABLE_REPETIONS,
  TANDEM_AXLE_DAMAGE,
  TRIDEM_AXLE_ALLOWABLE_REPETIONS,
  TRIDEM_AXLE_DAMAGE,
  AXLE_WEIGHT,
  AXLE_PER_1000,
  AXLE_EXPECTED_REPETITIONS,
  AXLE_STRESS_RATIO,
  AXLE_ALLOWABLE_REPETIONS_LOW,
  AXLE_ALLOWABLE_REPETIONS,
  AXLE_FATIGUE_CONSUMED,
  AXLE_DAMAGE,
  SUMMARY_FORM_TOGGLE,
  JPCP_SUMMARY_FORM_THICKNESS_TOGGLE,
  SUMMARY_FORM_SENSITIVITY,
  SUMMARY_FORM_DOWELED,
  RCC_DESIGN_THICKNESS,
  RCC_MINIMUM_REQUIRED_THICKNESS,
  RCC_MAXIMUM_JOINT_SPACING,
  SUMMARY_FORM_DESIGN_THICKNESS,
  SUMMARY_FORM_TOTAL_FATIGUE,
  SUMMARY_FORM_TOTAL_EROSION_USED,
  SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS,
  SUMMARY_FORM_MAXIMUM_JOINT_SPACING,
  SUMMARY_FORM_VEHICLES,
  JPCP_DOWELED_DESIGN_THICKNESS,
  JPCP_UNDOWELED_DESIGN_THICKNESS,
  JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS,
  JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS,
  JPCP_DOWELED_MAXIMUM_JOINT_SPACING,
  JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING,
  CRCP_DESIGN_THICKNESS,
  CRCP_STEEL_SPACING,
  CRCP_MINIMUM_REQUIRED_THICKNESS,
  OVERLAY_UNBONDED_ASPHALT_SUMMARY_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  EFFECTIVE_THICKNESS,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_BONDED_DESIGN_THICKNESS,
  OVERLAY_BONDED_MINIMUM_REQUIRED_THICKNESS,
  OVERLAY_BONDED_MAXIMUM_JOINT_SPACING,
  OVERLAY_BONDED_CONCRETE_SUMMARY_FORM,
  OVERLAY_UNBONDED_CONCRETE_SUMMARY_FORM,
  NEW_COMPOSITE_JPCP_SUMMARY_FORM,
  NEW_COMPOSITE_RCC_SUMMARY_FORM,
  PARKING_SUMMARY_FORM,
  PARKING_DESIGN_THICKNESS,
  PARKING_MINIMUM_REQUIRED_THICKNESS, 
  PARKING_MAXIMUM_JOINT_SPACING,
  UNBONDED_ASPHALT, 
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
  STREET,
  CONCRETE,
  NEW_COMPOSITE,
  OVERLAY,
  PARKING,
  JPCP,
  CRCP, 
  RCC,
  LOADING_INDICATOR_MODAL,
  NEW_COMPOSITE_HDG_SUMMARY_FORM,
  MINIMUM_REQUIRED_THICKNESS,
  INTERMODAL,
  INTERMODAL_SUMMARY_FORM,
  INTERMODAL_DESIGN_THICKNESS,
  INTERMODAL_MINIMUM_REQUIRED_THICKNESS, 
  INTERMODAL_MAXIMUM_JOINT_SPACING,
  INTERMODAL_STRESS_RATIO,
  HDG,
  BST,
  NEW_COMPOSITE_OTHER,
  NEW_COMPOSITE_BST_SUMMARY_FORM,
  NEW_COMPOSITE_OTHER_SUMMARY_FORM,
  SURFACE_LAYER_THICKNESS
} from 'Constants'

// CRCP urls
const CRCP_THICKNESS_URL = BASE_URL + "/api/calculations/CrcpThickness";
const CRCP_FLEXURAL_STRENGTH_GRAPH_URL = BASE_URL + "/api/calculations/PlotCrcpStrengthSensitivity";
const CRCP_RELIABILITY_GRAPH_URL = BASE_URL + "/api/calculations/PlotCrcpReliabilitySensitivity";
const CRCP_DESIGN_LIFE_GRAPH_URL = BASE_URL + "/api/calculations/PlotCrcpDesignLifeSensitivity";
const CRCP_K_VALUE_GRAPH_URL = BASE_URL + "/api/calculations/PlotCrcpKValueSensitivity";
const CRCP_STEEL_THICKNESS_URL = BASE_URL + "/api/calculations/CrcpSteel";
//JPCP urls
const JPCP_THICKNESS_URL = BASE_URL + "/api/calculations/JpcpThickness";
const JPCP_FLEXURAL_STRENGTH_GRAPH_URL = BASE_URL + "/api/calculations/PlotJpcpStrengthSensitivity";
const JPCP_RELIABILITY_GRAPH_URL = BASE_URL + "/api/calculations/PlotJpcpReliabilitySensitivity";
const JPCP_DESIGN_LIFE_GRAPH_URL = BASE_URL + "/api/calculations/PlotJpcpDesignLifeSensitivity";
const JPCP_K_VALUE_GRAPH_URL = BASE_URL + "/api/calculations/PlotJpcpKValueSensitivity";
const JPCP_SLABS_CRACKED_URL = BASE_URL + "/api/calculations/PlotJpcpSlabsCrackedSensitivity";

//RCC urls
const RCC_THICKNESS_URL = BASE_URL + "/api/calculations/RccThickness";
const RCC_FLEXURAL_STRENGTH_GRAPH_URL = BASE_URL + "/api/calculations/PlotRccStrengthSensitivity";
const RCC_RELIABILITY_GRAPH_URL = BASE_URL + "/api/calculations/PlotRccReliabilitySensitivity";
const RCC_DESIGN_LIFE_GRAPH_URL = BASE_URL + "/api/calculations/PlotRccDesignLifeSensitivity";
const RCC_K_VALUE_GRAPH_URL = BASE_URL + "/api/calculations/PlotRccKValueSensitivity";
const RCC_SLABS_CRACKED_URL = BASE_URL + "/api/calculations/PlotRccSlabsCrackedSensitivity";

// New Composite Asphalt Thickness urls
const NEW_COMPOSITE_ASPHALT_THICKNESS_URL = BASE_URL + "/api/calculations/CompositeWithAsphaltSurfaceUsingIncrementalThickness";
const NEW_COMPOSITE_ASPHALT_ANALYSIS_URL = BASE_URL + "/api/calculations/CompositeWithAsphaltSurface";

const OVERLAY_THICKNESS_URL = BASE_URL + "/api/calculations/OverlayThickness";
const OVERLAY_RELIABILITY_GRAPH_URL = BASE_URL + "/api/calculations/PlotOverlayReliabilitySensitivity";
const OVERLAY_DESIGN_LIFE_GRAPH_URL = BASE_URL + "/api/calculations/PlotOverlayDesignLifeSensitivity";
const OVERLAY_K_VALUE_GRAPH_URL = BASE_URL + "/api/calculations/PlotOverlayKValueSensitivity";
const OVERLAY_SLABS_CRACKED_URL = BASE_URL + "/api/calculations/PlotOverlaySlabsCrackedSensitivity";
const OVERLAY_FLEXURAL_STRENGTH_GRAPH_URL = BASE_URL + "/api/calculations/PlotOverlayStrengthSensitivity";

const PARKING_THICKNESS_URL = BASE_URL + "/api/calculations/ParkingThickness";
const PARKING_RELIABILITY_GRAPH_URL = BASE_URL + "/api/calculations/PlotParkingReliabilitySensitivity";
const PARKING_DESIGN_LIFE_GRAPH_URL = BASE_URL + "/api/calculations/PlotParkingDesignLifeSensitivity";
const PARKING_K_VALUE_GRAPH_URL = BASE_URL + "/api/calculations/PlotParkingKValueSensitivity";
const PARKING_SLABS_CRACKED_URL = BASE_URL + "/api/calculations/PlotParkingSlabsCrackedSensitivity";
const PARKING_FLEXURAL_STRENGTH_GRAPH_URL = BASE_URL + "/api/calculations/PlotParkingStrengthSensitivity";

const EFFECTIVE_THICKNESS_URL= BASE_URL + "/api/calculations/EffectiveThickness";

const INTERMODAL_THICKNESS_URL = BASE_URL + "/api/calculations/IntermodalThickness";

export function calculateEffectiveThickness(values, isBonded) {
  return dispatch => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(EFFECTIVE_THICKNESS_URL , values)
      .then(response => {
        dispatch(hideLoaderModal());
        const effectiveThickness = response.data[EFFECTIVE_THICKNESS];
        if (isBonded) {
          dispatch(change(OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS, parseFloat(effectiveThickness.replace(/\,/g,''))));
        } else {
          dispatch(change(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS, parseFloat(effectiveThickness.replace(/\,/g,''))));
        }
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateMSRGValueError'));
      });

  };
}

export function calculateCRCPSteelValues(values) {
  return dispatch => {
    dispatch(showLoaderModal('LOADING_INDICATOR_MODAL'));
    return axios.post(CRCP_STEEL_THICKNESS_URL , values)
      .then(response => {
         dispatch(hideLoaderModal());
         const numberOfBarsPerLane = response.data.numberOfBarsPerLane;
         const steelSpacing = response.data.steelSpacing;
         const steelWeightLanePerMile = response.data.steelWeightLanePerMile;
         dispatch(change(CONCRETE_CRCP_SUMMARY_FORM, 'numberOfBarsPerLane', numberOfBarsPerLane));
         dispatch(change(CONCRETE_CRCP_SUMMARY_FORM, 'steelSpacing', steelSpacing));
         dispatch(change(CONCRETE_CRCP_SUMMARY_FORM, 'steelWeightLanePerMile', steelWeightLanePerMile));

      })
   
  };
}

export function calculateCRCPThickness(values) {
  return dispatch => {
    return axios.post(CRCP_THICKNESS_URL , values)
      .then(response => {
         const summaryFormValues = {};
         const designThickness = response.data.designThickness;
         const minimumRequiredThickness = response.data.minimumRequiredThickness;
         extend(summaryFormValues, {[CRCP_DESIGN_THICKNESS]: designThickness}, {[CRCP_MINIMUM_REQUIRED_THICKNESS]: minimumRequiredThickness}, {[SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY});
         dispatch(initialize(CONCRETE_CRCP_SUMMARY_FORM, summaryFormValues));
      })

  };
}

export function getCRCPKValueGraphValues(values) {

  return dispatch => {
    return axios.post(CRCP_K_VALUE_GRAPH_URL , values)
      .then(response => {
         dispatch(setKValueGraphValue(response.data.dataPoints));
      })

  };
}

export function getCRCPConcreteStrengthGraphValues(values) {
  return dispatch => {
    return axios.post(CRCP_FLEXURAL_STRENGTH_GRAPH_URL , values)
      .then(response => {
         dispatch(setFlexuralStrengthGraphValue(response.data.dataPoints));
      })

  };
}

export function getCRCPReliabilityGraphValues(values) {
  return dispatch => {
    return axios.post(CRCP_RELIABILITY_GRAPH_URL , values)
      .then(response => {
         dispatch(setReliabilityGraphValue(response.data.dataPoints));
      })

  };
}

export function getCRCPDesignLifeGraphValues(values, truckValues) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(CRCP_DESIGN_LIFE_GRAPH_URL , formParams)
      .then(response => {
         dispatch(setDesignLifeGraphValue(response.data.dataPoints));
      })

  };
}

export function calculateJPCPThickness(constructionType, values) {
  return dispatch => {
    return axios.post(JPCP_THICKNESS_URL , values)
      .then(response => {
        const summaryFormValues = {};
        const doweledSummaryFormValues = response.data.doweledThickness;
        const undoweledSummaryFormValues = response.data.undoweledThickness;

        const doweledDesignThickness = doweledSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];
        const undoweledDesignThickness = undoweledSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];

        const doweledTotalFatigueUsed = doweledSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];
        const undoweledTotalFatigueUsed = undoweledSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];

        const doweledTotalErosionUsed = doweledSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];
        const undoweledTotalErosionUsed = undoweledSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];

        dispatch(setJPCPDoweledFatigueUsedValue(constructionType, doweledTotalFatigueUsed));
        dispatch(setJPCPUndoweledFatigueUsedValue(constructionType, undoweledTotalFatigueUsed));
        dispatch(setJPCPDoweledErosionUsedValue(constructionType, doweledTotalErosionUsed));
        dispatch(setJPCPUndoweledErosionUsedValue(constructionType, undoweledTotalErosionUsed));

        let jpcpDoweledCrackingObject = {};
        let jpcpUndoweledCrackingObject = {};
        let jpcpDoweledFaultingObject = {};
        let jpcpUndoweledFaultingObject = {};

        let singleDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[ SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };

        let singleUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };

        let singleDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[ TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        let singleUndoweledFaultingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemUndoweledFaultingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemUndoweledFaultingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        extend(jpcpDoweledCrackingObject, {singleItems: singleDoweledCrackingObject, tandemItems: tandemDoweledCrackingObject, tridemItems: tridemDoweledCrackingObject });

        extend(jpcpUndoweledCrackingObject, {singleItems: singleUndoweledCrackingObject, tandemItems: tandemUndoweledCrackingObject, tridemItems: tridemUndoweledCrackingObject } );

        extend(jpcpDoweledFaultingObject, {singleItems: singleDoweledFaultingObject, tandemItems: tandemDoweledFaultingObject, tridemItems: tridemDoweledFaultingObject });

        extend(jpcpUndoweledFaultingObject, {singleItems: singleUndoweledFaultingObject, tandemItems: tandemUndoweledFaultingObject, tridemItems: tridemUndoweledFaultingObject });

        dispatch(setJPCPDoweledCrackingValues(constructionType, jpcpDoweledCrackingObject));
        dispatch(setJPCPUndoweledCrackingValues(constructionType, jpcpUndoweledCrackingObject));
        dispatch(setJPCPDoweledFaultingValues(constructionType, jpcpDoweledFaultingObject));
        dispatch(setJPCPUndoweledFaultingValues(constructionType, jpcpUndoweledFaultingObject));

        const doweledMinimumRequiredThickness = doweledSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];
        const undoweledMinimumRequiredThickness = undoweledSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];

        const doweledMaximumJointSpacing = doweledSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING];
        const undoweledMaximumJointSpacing  = undoweledSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING];
        extend(summaryFormValues,
          {[JPCP_DOWELED_DESIGN_THICKNESS]: doweledDesignThickness},
          {[JPCP_UNDOWELED_DESIGN_THICKNESS]: undoweledDesignThickness},
          {[JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS]: doweledMinimumRequiredThickness},
          {[JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS]: undoweledMinimumRequiredThickness},
          {[JPCP_DOWELED_MAXIMUM_JOINT_SPACING]: doweledMaximumJointSpacing},
          {[JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING]: undoweledMaximumJointSpacing},
          {[SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY},
          {[JPCP_SUMMARY_FORM_THICKNESS_TOGGLE]: SUMMARY_FORM_DOWELED }
         );

       if (constructionType === CONCRETE) {
         dispatch(initialize(CONCRETE_JPCP_SUMMARY_FORM, summaryFormValues));
       }

      if (constructionType === OVERLAY) {
         dispatch(initialize(OVERLAY_UNBONDED_ASPHALT_SUMMARY_FORM, summaryFormValues));
       }

      if (constructionType === NEW_COMPOSITE) {
         dispatch(initialize(NEW_COMPOSITE_JPCP_SUMMARY_FORM, summaryFormValues));
       }
      })
  };
}
export function getJPCPKValueGraphValues(constructionType, values) {

  return dispatch => {
    return axios.post(JPCP_K_VALUE_GRAPH_URL , values)
      .then(response => {
         dispatch(setJPCPDoweledKValueGraphValue(constructionType, response.data.doweledDataPoints));
         dispatch(setJPCPUndoweledKValueGraphValue(constructionType, response.data.undoweledDataPoints));
      })

  };
}

export function getJPCPConcreteStrengthGraphValues(constructionType, values) {
  return dispatch => {
    return axios.post(JPCP_FLEXURAL_STRENGTH_GRAPH_URL , values)
      .then(response => {
         dispatch(setJPCPDoweledFlexuralStrengthGraphValue(constructionType, response.data.doweledDataPoints));
         dispatch(setJPCPUndoweledFlexuralStrengthGraphValue(constructionType, response.data.undoweledDataPoints));
      })

  };
}

export function getJPCPReliabilityGraphValues(constructionType, values) {
  return dispatch => {
    return axios.post(JPCP_RELIABILITY_GRAPH_URL , values)
      .then(response => {
         dispatch(setJPCPDoweledReliabilityGraphValue(constructionType, response.data.doweledDataPoints));
         dispatch(setJPCPUndoweledReliabilityGraphValue(constructionType, response.data.undoweledDataPoints));
      })

  };
}

export function getJPCPDesignLifeGraphValues(constructionType, values, truckValues) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(JPCP_DESIGN_LIFE_GRAPH_URL , formParams)
      .then(response => {
         dispatch(setJPCPDoweledDesignLifeGraphValue(constructionType, response.data.doweledDataPoints));
         dispatch(setJPCPUndoweledDesignLifeGraphValue(constructionType, response.data.undoweledDataPoints));
      })

  };
}

export function getJPCPSlabsCrackedGraphValues(constructionType, values, truckValues) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(JPCP_SLABS_CRACKED_URL , formParams)
      .then(response => {
         dispatch(setJPCPDoweledSlabsCrackedGraphValue(constructionType, response.data.doweledDataPoints));
         dispatch(setJPCPUndoweledSlabsCrackedGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

export function calculateRCCThickness(constructionType, values) {
  return dispatch => {
    return axios.post(RCC_THICKNESS_URL , values)
      .then(response => {
        const summaryFormValues = {};
        const rccSummaryFormValues = response.data.undoweledThickness;
        const rccDesignThickness = rccSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];
        const rccTotalFatigueUsed = rccSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];
        const rccTotalErosionUsed = rccSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];
        const rccMinimumRequiredThickness = rccSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];

        const rccMaximumJointSpacing = rccSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING ];
        dispatch(setRCCFatigueUsedValue(constructionType, rccTotalFatigueUsed));
        dispatch(setRCCErosionUsedValue(constructionType, rccTotalErosionUsed));

        let rccCrackingObject = {};
        let rccFaultingObject = {};

        let singleDoweledCrackingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  rccSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: rccSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: rccSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemDoweledCrackingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: rccSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: rccSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: rccSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemDoweledCrackingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  rccSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: rccSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: rccSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };


        let singleDoweledFaultingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  rccSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: rccSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: rccSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemDoweledFaultingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  rccSummaryFormValues[ TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: rccSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: rccSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemDoweledFaultingObject = {
          [AXLE_WEIGHT]: rccSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: rccSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  rccSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: rccSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: rccSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: rccSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        extend(rccCrackingObject, {singleItems: singleDoweledCrackingObject, tandemItems: tandemDoweledCrackingObject, tridemItems: tridemDoweledCrackingObject });
        extend(rccFaultingObject, {singleItems: singleDoweledFaultingObject, tandemItems: tandemDoweledFaultingObject, tridemItems: tridemDoweledFaultingObject });

        dispatch(setRCCCrackingValues(constructionType,rccCrackingObject));
        dispatch(setRCCFaultingValues(constructionType, rccFaultingObject));

        extend(summaryFormValues,
          {[RCC_DESIGN_THICKNESS]: rccDesignThickness},
          {[RCC_MINIMUM_REQUIRED_THICKNESS]: rccMinimumRequiredThickness},
          {[RCC_MAXIMUM_JOINT_SPACING]: rccMaximumJointSpacing},
          {[SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY},
         );

        if (constructionType === CONCRETE) {
          dispatch(initialize(CONCRETE_RCC_SUMMARY_FORM, summaryFormValues));
        }

        if (constructionType === NEW_COMPOSITE) {
          dispatch(initialize(NEW_COMPOSITE_RCC_SUMMARY_FORM, summaryFormValues));
        }

      })
  };
}

export function getRCCKValueGraphValues(constructionType, values) {

  return dispatch => {
    return axios.post(RCC_K_VALUE_GRAPH_URL , values)
      .then(response => {
         dispatch(setRCCKValueGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

export function getRCCConcreteStrengthGraphValues(constructionType, values) {
  return dispatch => {
    return axios.post(RCC_FLEXURAL_STRENGTH_GRAPH_URL , values)
      .then(response => {
         dispatch(setRCCFlexuralStrengthGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

export function getRCCReliabilityGraphValues(constructionType, values) {
  return dispatch => {
    return axios.post(RCC_RELIABILITY_GRAPH_URL , values)
      .then(response => {
         dispatch(setRCCReliabilityGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

export function getRCCDesignLifeGraphValues(constructionType, values, truckValues) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(RCC_DESIGN_LIFE_GRAPH_URL , formParams)
      .then(response => {
         dispatch(setRCCDesignLifeGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

export function getRCCSlabsCrackedGraphValues(constructionType, values, truckValues) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(RCC_SLABS_CRACKED_URL , formParams)
      .then(response => {
         dispatch(setRCCSlabsCrackedGraphValue(constructionType, response.data.undoweledDataPoints));
      })
  };
}

// New Composite Asphalt
export function calculateNewCompositeAsphaltThickness(type, values) {
  return dispatch => {
//    return axios.post(NEW_COMPOSITE_ASPHALT_THICKNESS_URL , values)
    return axios.post(NEW_COMPOSITE_ASPHALT_ANALYSIS_URL , values)
      .then(response => {
        const designLife = response.data.responseDetails.DesignLife;
        const minimumThickness = response.data.responseDetails.SurfaceThickness;
        const surfaceLayerThickness = response.data.responseDetails.SurfaceLayerThickness;
        const summaryFormDesignLayerValues = response.data.responseDetails.LayerNames.filter(function(layer) {
          console.log("[INFO]: Adding '" + layer + "' to graph values");
          return !!layer && asphaltSummaryLayerGraphValues.indexOf(layer) !== -1;
         });

        const  { PercentPredictedDamageByAnalysisLayerAndYear,  YearCalculatedDamageEqualsAllowableDamage } = response.data.responseDetails;
        let allowableDamageReferenceLines = filter(YearCalculatedDamageEqualsAllowableDamage, function(value) {
          return value !== 1000;
        }).map(function(value) {
          return Math.round(value); 
        })

        const xValue = 'designLife';
        let graphData = [];
        for (let i = 0; i < designLife + 10; i++) {
          let graphValue = {};
          extend(graphValue, {[xValue]: i});
          graphData.push(graphValue);
        }
        each(summaryFormDesignLayerValues, function(layer, index) {
          let yAxisForDesignName = asphaltSummaryLayerGraphLayerValues[layer].yAxisValue;
          for (let i = 0; i < designLife + 10; i++) {
            let graphValue = graphData[i];
            let yValueKey = yAxisForDesignName;

            if(PercentPredictedDamageByAnalysisLayerAndYear[index]) {
                extend(graphValue, {[yValueKey]: PercentPredictedDamageByAnalysisLayerAndYear[index][i] });
            }
          }
        })
        let form
        if (type === HDG) {
          form = NEW_COMPOSITE_HDG_SUMMARY_FORM;  
        } else if (type === BST) {
          form = NEW_COMPOSITE_BST_SUMMARY_FORM;
        } else if (type === NEW_COMPOSITE_OTHER) {
          form = NEW_COMPOSITE_OTHER_SUMMARY_FORM;
        }

        dispatch(initialize(form, {[MINIMUM_REQUIRED_THICKNESS]: minimumThickness, [SURFACE_LAYER_THICKNESS]: surfaceLayerThickness }));
        dispatch(setAsphaltSummaryFormGraphValues(type, graphData));
        dispatch(setAsphaltSummaryFormGraphDamgeReferenceLinesValues(type, allowableDamageReferenceLines));
        dispatch(setAsphaltSummaryFormDesignLayerValues(type, summaryFormDesignLayerValues));
      })
      .catch(error => {
          console.log("[ERROR]: calculateNewCompositeAsphaltThickness, " + error);
         dispatch(hideLoaderModal());
         if (error.message === 'The results file could not be read, please check your inputs') {
          this.props.addNotification('Error with calculator', error, 5, 'Error with calculator' )
         }
      });
  };
}

export function setAsphaltSummaryFormDesignLayerValues(compositeType, object) {
  let type;
  if (compositeType === HDG) {
    type = NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DESIGN_LAYER_VALUES;  
  } else if (compositeType === BST) {
    type = NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DESIGN_LAYER_VALUES;
  } else if (compositeType === NEW_COMPOSITE_OTHER) {
    type = NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DESIGN_LAYER_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setAsphaltSummaryFormGraphValues(compositeType, object) {
  let type;
  if (compositeType === HDG) {
    type = NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_GRAPH_VALUES;  
  } else if (compositeType === BST) {
    type = NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_GRAPH_VALUES;
  } else if (compositeType === NEW_COMPOSITE_OTHER) {
    type = NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setAsphaltSummaryFormGraphDamgeReferenceLinesValues(compositeType, array) {
  let type;
  if (compositeType === HDG) {
    type = NEW_COMPOSITE_ASPHALT_HDG_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES;  
  } else if (compositeType === BST) {
    type = NEW_COMPOSITE_ASPHALT_BST_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES;
  } else if (compositeType === NEW_COMPOSITE_OTHER) {
    type = NEW_COMPOSITE_ASPHALT_OTHER_SUMMARY_FORM_DAMAGE_REFERENCE_LINE_VALUES;
  }
  return {
    type: type,
    payload: array
  };
}



//Parking
export function calculateParkingThickness(values) {
  return dispatch => {
    return axios.post(PARKING_THICKNESS_URL , values)
      .then(response => {
        const summaryFormValues = response.data.undoweledThickness;
        const designThickness = summaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];
        const ParkingTotalFatigueUsed = summaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];
        const ParkingTotalErosionUsed = summaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];
        const minimumRequiredThickness = summaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];
        const maximumJointSpacing = summaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING];

        dispatch(setParkingFatigueUsedValue(ParkingTotalFatigueUsed));
        dispatch(setParkingErosionUsedValue(ParkingTotalErosionUsed));

        let parkingCrackingObject = {};
        let parkingFaultingObject = {};

        let singleDoweledCrackingObject = {
            [AXLE_WEIGHT]: summaryFormValues[SINGLE_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[SINGLE_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[SINGLE_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS_LOW]: summaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
            [AXLE_FATIGUE_CONSUMED]: summaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemDoweledCrackingObject = {
            [AXLE_WEIGHT]: summaryFormValues[TANDEM_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[TANDEM_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[TANDEM_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS_LOW]: summaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
            [AXLE_FATIGUE_CONSUMED]: summaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemDoweledCrackingObject = {
            [AXLE_WEIGHT]: summaryFormValues[TRIDEM_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[TRIDEM_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS_LOW]: summaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
            [AXLE_FATIGUE_CONSUMED]: summaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };


        let singleDoweledFaultingObject = {
            [AXLE_WEIGHT]: summaryFormValues[SINGLE_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[SINGLE_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[SINGLE_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS]: summaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
            [AXLE_DAMAGE]: summaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemDoweledFaultingObject = {
            [AXLE_WEIGHT]: summaryFormValues[TANDEM_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[TANDEM_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[TANDEM_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS]: summaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
            [AXLE_DAMAGE]: summaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemDoweledFaultingObject = {
            [AXLE_WEIGHT]: summaryFormValues[TRIDEM_AXLE_WEIGHT],
            [AXLE_PER_1000]: summaryFormValues[TRIDEM_AXLE_PER_1000],
            [AXLE_EXPECTED_REPETITIONS]: summaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
            [AXLE_STRESS_RATIO]: summaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
            [AXLE_ALLOWABLE_REPETIONS]: summaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
            [AXLE_DAMAGE]: summaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        extend(parkingCrackingObject, { singleItems: singleDoweledCrackingObject, tandemItems: tandemDoweledCrackingObject, tridemItems: tridemDoweledCrackingObject });
        extend(parkingFaultingObject, { singleItems: singleDoweledFaultingObject, tandemItems: tandemDoweledFaultingObject, tridemItems: tridemDoweledFaultingObject });

        dispatch(setParkingCrackingValues(parkingCrackingObject));
        dispatch(setParkingFaultingValues(parkingFaultingObject));

        extend(summaryFormValues, 
          {[PARKING_DESIGN_THICKNESS]: designThickness}, 
          {[PARKING_MINIMUM_REQUIRED_THICKNESS]: minimumRequiredThickness},  
          { [PARKING_MAXIMUM_JOINT_SPACING]: maximumJointSpacing }, 
          { [SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY },
         );

        dispatch(initialize(PARKING_SUMMARY_FORM, summaryFormValues));  
    }) 
  };
}

export function getParkingKValueGraphValues(values) {

    return dispatch => {
        return axios.post(PARKING_K_VALUE_GRAPH_URL, values)
            .then(response => {
                dispatch(setParkingKValueGraphValue(response.data.undoweledDataPoints));
            })
    };
}

export function getParkingConcreteStrengthGraphValues(values) {
    return dispatch => {
        return axios.post(PARKING_FLEXURAL_STRENGTH_GRAPH_URL, values)
            .then(response => {
                dispatch(setParkingFlexuralStrengthGraphValue(response.data.undoweledDataPoints));
            })
    };
}

export function getParkingReliabilityGraphValues(values) {
    return dispatch => {
        return axios.post(PARKING_RELIABILITY_GRAPH_URL, values)
            .then(response => {
                dispatch(setParkingReliabilityGraphValue(response.data.undoweledDataPoints));
            })
    };
}

export function getParkingDesignLifeGraphValues(values, truckValues) {
    let formParams = extend({}, values, truckValues);
    return dispatch => {
        return axios.post(PARKING_DESIGN_LIFE_GRAPH_URL, formParams)
            .then(response => {
                dispatch(setParkingDesignLifeGraphValue(response.data.undoweledDataPoints));
            })
    };
}

export function getParkingSlabsCrackedGraphValues(values) {
    return dispatch => {
        return axios.post(PARKING_SLABS_CRACKED_URL, values)
            .then(response => {
                dispatch(setParkingSlabsCrackedGraphValue(response.data.undoweledDataPoints));
            })
    };
}



//Intermodal
export function calculateIntermodalThickness(values) {
  return dispatch => {
    return axios.post(INTERMODAL_THICKNESS_URL , values)
      .then(response => {
        const designThickness = response.data.DesignThickness;
        const maximumJointSpacing = response.data.MaximumJointSpacing;
        const minimumRequiredThickness = response.data.ThicknessValue;
        const stressRatio = response.data.StressRatio;
        // Need to create table values, object of arrays
        const maximumAnglesRawValues = response.data.MaximumAngleRaw;
        const maximumStressRawValues = response.data.MaximumStressRaw;
        const thicknessValuesRawValues = response.data.ThicknessValuesRaw;
        const vehiclesNamesRawsValues = response.data.VehicleNamesRaw;
        const allowablerepetitionsRawValues = response.data.TotalRepetionsRawStr; 

        let validVehicles;
        let vehiclesInfo = [];
        validVehicles = filter (vehiclesNamesRawsValues, function(vehicle) {
          return !!vehicle;
        })

        let maxThicknessValue = max(thicknessValuesRawValues);

        for (let i = 0; i <  validVehicles.length; i++) {
          let values = {}
          values['name'] = vehiclesNamesRawsValues[i];
          values['angle'] = maximumAnglesRawValues[i];
          values['stressRatio'] = maximumStressRawValues[i];
          values['allowableRepetitions'] = allowablerepetitionsRawValues[i];
          values['thickness'] = thicknessValuesRawValues[i];
          if (maxThicknessValue === thicknessValuesRawValues[i]) {
            values['maxThickness'] = true;
          }
          vehiclesInfo.push(values);
        }



        dispatch(setIntermodalSummaryPageVehiclesInfo(vehiclesInfo));
        let summaryFormValues = {};
        extend(summaryFormValues, 
          {[INTERMODAL_DESIGN_THICKNESS]: designThickness}, 
          {[INTERMODAL_MINIMUM_REQUIRED_THICKNESS]: minimumRequiredThickness},  
          {[INTERMODAL_MAXIMUM_JOINT_SPACING]: maximumJointSpacing}, 
          { [INTERMODAL_STRESS_RATIO]: stressRatio }, 
          { [SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_VEHICLES },
         );

        dispatch(initialize(INTERMODAL_SUMMARY_FORM, summaryFormValues));  
    }) 
  };
}




export function calculateBondedConcreteOverlayThickness(values) {
  return dispatch => {
    return axios.post(OVERLAY_THICKNESS_URL , values)
      .then(response => {
        const summaryFormValues = {};
        const bondedConcreteSummaryFormValues = response.data.undoweledThickness;
        const bondedConcreteDesignThickness = bondedConcreteSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];
        const bondedConcreteTotalFatigueUsed = bondedConcreteSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];
        const bondedConcreteTotalErosionUsed = bondedConcreteSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];
        const bondedConcreteMinimumRequiredThickness = bondedConcreteSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];

        const bondedConcreteMaximumJointSpacing = bondedConcreteSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING ];
        dispatch(setOverlayBondedConcreteFatigueUsedValue(bondedConcreteTotalFatigueUsed));
        dispatch(setOverlayBondedConcreteErosionUsedValue(bondedConcreteTotalErosionUsed));

        let bondedConcreteCrackingObject = {};
        let bondedConcreteFaultingObject = {};

        let singleDoweledCrackingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  bondedConcreteSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: bondedConcreteSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: bondedConcreteSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemDoweledCrackingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: bondedConcreteSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: bondedConcreteSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: bondedConcreteSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemDoweledCrackingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  bondedConcreteSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };


        let singleDoweledFaultingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  bondedConcreteSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: bondedConcreteSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: bondedConcreteSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemDoweledFaultingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  bondedConcreteSummaryFormValues[ TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: bondedConcreteSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: bondedConcreteSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemDoweledFaultingObject = {
          [AXLE_WEIGHT]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  bondedConcreteSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: bondedConcreteSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        extend(bondedConcreteCrackingObject, {singleItems: singleDoweledCrackingObject, tandemItems: tandemDoweledCrackingObject, tridemItems: tridemDoweledCrackingObject });
        extend(bondedConcreteFaultingObject, {singleItems: singleDoweledFaultingObject, tandemItems: tandemDoweledFaultingObject, tridemItems: tridemDoweledFaultingObject });

        dispatch(setOverlayBondedConcreteCrackingValues(bondedConcreteCrackingObject));
        dispatch(setOverlayBondedConcreteFaultingValues(bondedConcreteFaultingObject));

        extend(summaryFormValues,
          {[OVERLAY_BONDED_DESIGN_THICKNESS]: bondedConcreteDesignThickness},
          {[OVERLAY_BONDED_MINIMUM_REQUIRED_THICKNESS]: bondedConcreteMinimumRequiredThickness},
          {[OVERLAY_BONDED_MAXIMUM_JOINT_SPACING]: bondedConcreteMaximumJointSpacing},
          {[SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY},
         );

        dispatch(initialize(OVERLAY_BONDED_CONCRETE_SUMMARY_FORM, summaryFormValues));
      })

  };
}

export function calculateUnbondedConcreteOverlayThickness(values) {
  return dispatch => {
    return axios.post(OVERLAY_THICKNESS_URL , values)
      .then(response => {
        const summaryFormValues = {};
        const doweledSummaryFormValues = response.data.doweledThickness;
        const undoweledSummaryFormValues = response.data.undoweledThickness;

        const doweledDesignThickness = doweledSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];
        const undoweledDesignThickness = undoweledSummaryFormValues[SUMMARY_FORM_DESIGN_THICKNESS];

        const doweledTotalFatigueUsed = doweledSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];
        const undoweledTotalFatigueUsed = undoweledSummaryFormValues[SUMMARY_FORM_TOTAL_FATIGUE];

        const doweledTotalErosionUsed = doweledSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];
        const undoweledTotalErosionUsed = undoweledSummaryFormValues[SUMMARY_FORM_TOTAL_EROSION_USED];

        dispatch(setOverlayUnbondedConcreteDoweledFatigueUsedValue(doweledTotalFatigueUsed));
        dispatch(setOverlayUnbondedConcreteUndoweledFatigueUsedValue(undoweledTotalFatigueUsed));
        dispatch(setOverlayUnbondedConcreteDoweledErosionUsedValue(doweledTotalErosionUsed));
        dispatch(setOverlayUnbondedConcreteUndoweledErosionUsedValue(undoweledTotalErosionUsed));

        let overlayDoweledCrackingObject = {};
        let overlayUndoweledCrackingObject = {};
        let overlayDoweledFaultingObject = {};
        let overlayUndoweledFaultingObject = {};

        let singleDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[ SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemDoweledCrackingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: doweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: doweledSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };

        let singleUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[SINGLE_AXLE_FATIGUE_CONSUMED]
        };

        let tandemUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[TANDEM_AXLE_FATIGUE_CONSUMED]
        };

        let tridemUndoweledCrackingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS_LOW]: undoweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS_LOW],
          [AXLE_FATIGUE_CONSUMED]: undoweledSummaryFormValues[TRIDEM_AXLE_FATIGUE_CONSUMED]
        };

        let singleDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[ TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemDoweledFaultingObject = {
          [AXLE_WEIGHT]: doweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: doweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  doweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: doweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: doweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: doweledSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        let singleUndoweledFaultingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[SINGLE_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[SINGLE_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[SINGLE_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[SINGLE_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[SINGLE_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[SINGLE_AXLE_DAMAGE]
        };

        let tandemUndoweledFaultingObject = {
         [AXLE_WEIGHT]: undoweledSummaryFormValues[TANDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TANDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]:  undoweledSummaryFormValues[TANDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TANDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[TANDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[TANDEM_AXLE_DAMAGE]
        };

        let tridemUndoweledFaultingObject = {
          [AXLE_WEIGHT]: undoweledSummaryFormValues[TRIDEM_AXLE_WEIGHT],
          [AXLE_PER_1000]: undoweledSummaryFormValues[TRIDEM_AXLE_PER_1000],
          [AXLE_EXPECTED_REPETITIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_EXPECTED_REPETITIONS],
          [AXLE_STRESS_RATIO]: undoweledSummaryFormValues[TRIDEM_AXLE_STRESS_RATIO],
          [AXLE_ALLOWABLE_REPETIONS]: undoweledSummaryFormValues[TRIDEM_AXLE_ALLOWABLE_REPETIONS],
          [AXLE_DAMAGE]: undoweledSummaryFormValues[TRIDEM_AXLE_DAMAGE]
        };

        extend(overlayDoweledCrackingObject, {singleItems: singleDoweledCrackingObject, tandemItems: tandemDoweledCrackingObject, tridemItems: tridemDoweledCrackingObject });

        extend(overlayUndoweledCrackingObject, {singleItems: singleUndoweledCrackingObject, tandemItems: tandemUndoweledCrackingObject, tridemItems: tridemUndoweledCrackingObject } );

        extend(overlayDoweledFaultingObject, {singleItems: singleDoweledFaultingObject, tandemItems: tandemDoweledFaultingObject, tridemItems: tridemDoweledFaultingObject });

        extend(overlayUndoweledFaultingObject, {singleItems: singleUndoweledFaultingObject, tandemItems: tandemUndoweledFaultingObject, tridemItems: tridemUndoweledFaultingObject });

        dispatch(setOverlayUnbondedConcreteDoweledCrackingValues(overlayDoweledCrackingObject));
        dispatch(setOverlayUnbondedConcreteUndoweledCrackingValues(overlayUndoweledCrackingObject));
        dispatch(setOverlayUnbondedConcreteDoweledFaultingValues(overlayDoweledFaultingObject));
        dispatch(setOverlayUnbondedConcreteUndoweledFaultingValues(overlayUndoweledFaultingObject));

        const doweledMinimumRequiredThickness = doweledSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];
        const undoweledMinimumRequiredThickness = undoweledSummaryFormValues[SUMMARY_FORM_MINIMUM_REQUIRED_THICKNESS];

        const doweledMaximumJointSpacing = doweledSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING];
        const undoweledMaximumJointSpacing  = undoweledSummaryFormValues[SUMMARY_FORM_MAXIMUM_JOINT_SPACING];
        extend(summaryFormValues,
          {[JPCP_DOWELED_DESIGN_THICKNESS]: doweledDesignThickness},
          {[JPCP_UNDOWELED_DESIGN_THICKNESS]: undoweledDesignThickness},
          {[JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS]: doweledMinimumRequiredThickness},
          {[JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS]: undoweledMinimumRequiredThickness},
          {[JPCP_DOWELED_MAXIMUM_JOINT_SPACING]: doweledMaximumJointSpacing},
          {[JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING]: undoweledMaximumJointSpacing},
          {[SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY},
          {[JPCP_SUMMARY_FORM_THICKNESS_TOGGLE]: SUMMARY_FORM_DOWELED }
         );
        dispatch(initialize(OVERLAY_UNBONDED_CONCRETE_SUMMARY_FORM, summaryFormValues));

    })
  };

}

export function getOverlayKValueGraphValues(values, isBonded) {

  return dispatch => {
    return axios.post(OVERLAY_K_VALUE_GRAPH_URL , values)
      .then(response => {
         if (isBonded) {
           dispatch(setOverlayBondedConcreteKValueGraphValue(response.data.undoweledDataPoints));
         } else {
          dispatch(setOverlayUnbondedConcreteDoweledKValueGraphValue(response.data.doweledDataPoints));
          dispatch(setOverlayUnbondedConcreteUndoweledKValueGraphValue(response.data.undoweledDataPoints));
         }
      })
  };
}

export function getOverlayConcreteStrengthGraphValues(values, isBonded) {
  return dispatch => {
    return axios.post(OVERLAY_FLEXURAL_STRENGTH_GRAPH_URL , values)
      .then(response => {
        if (isBonded) {
          dispatch(setOverlayBondedConcreteFlexuralStrengthGraphValue(response.data.undoweledDataPoints));
        } else {
          dispatch(setOverlayUnbondedConcreteDoweledFlexuralStrengthGraphValue(response.data.doweledDataPoints));
          dispatch(setOverlayUnbondedConcreteUndoweledFlexuralStrengthGraphValue(response.data.undoweledDataPoints));
        }
      })
  };
}

export function getOverlayReliabilityGraphValues(values, isBonded) {
  return dispatch => {
    return axios.post(OVERLAY_RELIABILITY_GRAPH_URL , values)
      .then(response => {
         if (isBonded) {
          dispatch(setOverlayBondedConcreteReliabilityGraphValue(response.data.undoweledDataPoints));
         } else {
          dispatch(setOverlayUnbondedConcreteDoweledReliabilityGraphValue(response.data.doweledDataPoints));
          dispatch(setOverlayUnbondedConcreteUndoweledReliabilityGraphValue(response.data.undoweledDataPoints));
         }
      })
  };
}

export function getOverlayDesignLifeGraphValues(values, truckValues, isBonded) {
  let formParams = extend({}, values, truckValues);
  return dispatch => {
    return axios.post(OVERLAY_DESIGN_LIFE_GRAPH_URL , formParams)
      .then(response => {
        if (isBonded) {
          dispatch(setOverlayBondedConcreteDesignLifeGraphValue(response.data.undoweledDataPoints));
        } else {
          dispatch(setOverlayUnbondedConcreteDoweledDesignLifeGraphValue(response.data.doweledDataPoints));
          dispatch(setOverlayUnbondedConcreteUndoweledDesignLifeGraphValue(response.data.undoweledDataPoints));
        }
    })
  };
}

export function getOverlaySlabsCrackedGraphValues(values, isBonded) {
  return dispatch => {
    return axios.post(OVERLAY_SLABS_CRACKED_URL , values)
      .then(response => {
        if (isBonded) {
          dispatch(setOverlayBondedConcreteSlabsCrackedGraphValue(response.data.undoweledDataPoints));
        } else {
          dispatch(setOverlayUnbondedConcreteDoweledSlabsCrackedGraphValue(response.data.doweledDataPoints));
          dispatch(setOverlayUnbondedConcreteUndoweledSlabsCrackedGraphValue(response.data.undoweledDataPoints));
        }
    })
  };
}

export function getSummaryFormValues(projectType, constructionType, type, values, truckValues, isAsphaltAnalysis) {
  
  if (projectType === PARKING) {
    return dispatch => Promise.all([
      dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
      dispatch(calculateParkingThickness(values)),
      dispatch(getParkingKValueGraphValues(values)),
      dispatch(getParkingConcreteStrengthGraphValues(values)),
      dispatch(getParkingReliabilityGraphValues(values)),
      dispatch(getParkingDesignLifeGraphValues(values, truckValues)),
      dispatch(getParkingSlabsCrackedGraphValues(values)) 
    ]).then(() => {
      dispatch(hideLoaderModal());
     });   
  } else if (projectType === INTERMODAL) {
    return dispatch => Promise.all([
      dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
      dispatch(calculateIntermodalThickness(values)),
    ]).then(() => {
      dispatch(hideLoaderModal());
     });
  } else if (projectType === STREET) {
    if (constructionType === CONCRETE) {
      if (type === CRCP) {
        if (isAsphaltAnalysis) {
          return dispatch => Promise.all([
            dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
            dispatch(calculateCRCPThickness(values)),
            dispatch(getCRCPKValueGraphValues(values)),
            dispatch(getCRCPConcreteStrengthGraphValues(values)),
            dispatch(getCRCPReliabilityGraphValues(values)),
          ]).then(() => {
            dispatch(hideLoaderModal());
           }); 
        } else  {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateCRCPThickness(values)),
          dispatch(getCRCPKValueGraphValues(values)),
          dispatch(getCRCPConcreteStrengthGraphValues(values)),
          dispatch(getCRCPReliabilityGraphValues(values)),
          dispatch(getCRCPDesignLifeGraphValues(values, truckValues))  
        ]).then(() => {
          dispatch(hideLoaderModal());
         });   
        }
      } else if (type === JPCP) {
        return dispatch => Promise.all([
            dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
            dispatch(calculateJPCPThickness(constructionType, values)),
            dispatch(getJPCPKValueGraphValues(constructionType, values)),
            dispatch(getJPCPConcreteStrengthGraphValues(constructionType, values)),
            dispatch(getJPCPReliabilityGraphValues(constructionType, values)),
            dispatch(getJPCPDesignLifeGraphValues(constructionType, values, truckValues)),
            dispatch(getJPCPSlabsCrackedGraphValues(constructionType, values))
          ]).then(() => {
            dispatch(hideLoaderModal());
           }); 
      } else if (type === RCC) {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateRCCThickness(constructionType, values)),
          dispatch(getRCCKValueGraphValues(constructionType, values)),
          dispatch(getRCCConcreteStrengthGraphValues(constructionType, values)),
          dispatch(getRCCReliabilityGraphValues(constructionType, values)),
          dispatch(getRCCDesignLifeGraphValues(constructionType, values, truckValues)),
          dispatch(getRCCSlabsCrackedGraphValues(constructionType, values))
        ]).then(() => {
          dispatch(hideLoaderModal());
         });
      } 
    } else if (constructionType === OVERLAY) {
      if (type === UNBONDED_ASPHALT) {
        if (isAsphaltAnalysis) {
          return dispatch => Promise.all([
            dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
            dispatch(calculateJPCPThickness( constructionType, values)),
            dispatch(getJPCPKValueGraphValues(constructionType, values)),
            dispatch(getJPCPConcreteStrengthGraphValues(constructionType, values)),
            dispatch(getJPCPReliabilityGraphValues(constructionType, values)),
            dispatch(getJPCPSlabsCrackedGraphValues(constructionType, values))
          ]).then(() => {
            dispatch(hideLoaderModal());
           }); 
        } else  {
          return dispatch => Promise.all([
            dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
            dispatch(calculateJPCPThickness(constructionType, values)),
            dispatch(getJPCPKValueGraphValues(constructionType, values)),
            dispatch(getJPCPConcreteStrengthGraphValues(constructionType, values)),
            dispatch(getJPCPReliabilityGraphValues(constructionType,values)),
            dispatch(getJPCPDesignLifeGraphValues(constructionType, values, truckValues)),
            dispatch(getJPCPSlabsCrackedGraphValues(constructionType, values))
          ]).then(() => {
            dispatch(hideLoaderModal());
         });
        }
      } else if (type === BONDED_CONCRETE) {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateBondedConcreteOverlayThickness(values)),
          dispatch(getOverlayKValueGraphValues(values, true)),
          dispatch(getOverlayConcreteStrengthGraphValues(values, true)),
          dispatch(getOverlayReliabilityGraphValues(values, true)),
          dispatch(getOverlayDesignLifeGraphValues(values, truckValues, true)),
          dispatch(getOverlaySlabsCrackedGraphValues(values, true))
        ]).then(() => {
          dispatch(hideLoaderModal());
         });
      } else if (type === UNBONDED_CONCRETE) {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateUnbondedConcreteOverlayThickness(values)),
          dispatch(getOverlayKValueGraphValues(values, false)),
          dispatch(getOverlayConcreteStrengthGraphValues(values, false)),
          dispatch(getOverlayReliabilityGraphValues(values, false)),
          dispatch(getOverlayDesignLifeGraphValues(values, truckValues, false)),
          dispatch(getOverlaySlabsCrackedGraphValues(values, false))
        ]).then(() => {
          dispatch(hideLoaderModal());
         });
      }
    } else if (constructionType === NEW_COMPOSITE) {
     if (type === JPCP) {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateJPCPThickness(constructionType, values)),
          dispatch(getJPCPKValueGraphValues(constructionType, values)),
          dispatch(getJPCPConcreteStrengthGraphValues(constructionType, values)),
          dispatch(getJPCPReliabilityGraphValues(constructionType, values)),
          dispatch(getJPCPDesignLifeGraphValues(constructionType, values, truckValues)),
          dispatch(getJPCPSlabsCrackedGraphValues(constructionType, values))
        ]).then(() => {
          dispatch(hideLoaderModal());
         });
     } else if (type === RCC) {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateRCCThickness(constructionType, values)),
          dispatch(getRCCKValueGraphValues(constructionType, values)),
          dispatch(getRCCConcreteStrengthGraphValues(constructionType, values)),
          dispatch(getRCCReliabilityGraphValues(constructionType, values)),
          dispatch(getRCCDesignLifeGraphValues(constructionType, values, truckValues)),
          dispatch(getRCCSlabsCrackedGraphValues(constructionType, values))
        ]).then(() => {
          dispatch(hideLoaderModal());
         });
     } else {
        return dispatch => Promise.all([
          dispatch(showLoaderModal(LOADING_INDICATOR_MODAL)),
          dispatch(calculateNewCompositeAsphaltThickness(type, values)),
        ]).then(() => {
          dispatch(hideLoaderModal());
        });
     }
    }
  }

}


export function setKValueGraphValue(object) {
  return {
    type: CONCRETE_SET_K_VALUE_GRAPH_VALUES,
    payload: object
  };
}

export function setFlexuralStrengthGraphValue(object) {
  return {
    type: CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
    payload: object
  };
}

export function setReliabilityGraphValue(object) {
  return {
    type: CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
    payload: object
  };
}

export function setDesignLifeGraphValue(object) {
  return {
    type: CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
    payload: object
  };
}

export function setJPCPDoweledKValueGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_K_VALUE_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_K_VALUE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_K_VALUE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledKValueGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_K_VALUE_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_K_VALUE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_K_VALUE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledFlexuralStrengthGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledFlexuralStrengthGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledReliabilityGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_RELIABILITY_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_RELIABILITY_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_RELIABILITY_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledReliabilityGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_RELIABILITY_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledDesignLifeGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_DESIGN_LIFE_GRAPH_VALUES;
  } else if (constructionType === OVERLAY ) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledDesignLifeGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}


export function setJPCPDoweledSlabsCrackedGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_SLABS_CRACKED_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledSlabsCrackedGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}


export function setJPCPDoweledCrackingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_CRACKING_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_CRACKING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_CRACKING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledCrackingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_CRACKING_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_CRACKING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_CRACKING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledFaultingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_FAULTING_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FAULTING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_FAULTING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledFaultingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_FAULTING_VALUES;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FAULTING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_FAULTING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledFatigueUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_FATIGUE_USED_VALUE;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_FATIGUE_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_FATIGUE_USED_VALUE
  }
  return {
    type:  type,
    payload: object
  };
}

export function setJPCPUndoweledFatigueUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_FATIGUE_USED_VALUE;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_FATIGUE_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_FATIGUE_USED_VALUE;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPDoweledErosionUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_DOWELED_EROSION_USED_VALUE;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_DOWELED_EROSION_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_DOWELED_EROSION_USED_VALUE;
  }
  return {
    type: type,
    payload: object
  };
}

export function setJPCPUndoweledErosionUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_JPCP_UNDOWELED_EROSION_USED_VALUE;
  } else if (constructionType === OVERLAY) {
    type = OVERLAY_UNBONDED_ASPHALT_SET_UNDOWELED_EROSION_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_JPCP_SET_UNDOWELED_EROSION_USED_VALUE;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCKValueGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_K_VALUE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_K_VALUE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCFlexuralStrengthGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_FLEXURAL_STRENGTH_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_FLEXURAL_STRENGTH_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCReliabilityGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_RELIABILITY_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_RELIABILITY_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCDesignLifeGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_DESIGN_LIFE_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_DESIGN_LIFE_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCSlabsCrackedGraphValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_SLABS_CRACKED_GRAPH_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_SLABS_CRACKED_GRAPH_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCFatigueUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_FATIGUE_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_FATIGUE_USED_VALUE;
  }
  return {
    type:  type,
    payload: object
  };
}

export function setRCCErosionUsedValue(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_EROSION_USED_VALUE;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_EROSION_USED_VALUE;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCCrackingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_CRACKING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_CRACKING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

export function setRCCFaultingValues(constructionType, object) {
  let type;
  if (constructionType === CONCRETE) {
    type = CONCRETE_SET_RCC_FAULTING_VALUES;
  } else if (constructionType === NEW_COMPOSITE) {
    type = NEW_COMPOSITE_RCC_SET_FAULTING_VALUES;
  }
  return {
    type: type,
    payload: object
  };
}

//Overly bonded
export function setOverlayBondedConcreteKValueGraphValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_K_VALUE_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayBondedConcreteFlexuralStrengthGraphValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayBondedConcreteReliabilityGraphValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_RELIABILITY_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayBondedConcreteDesignLifeGraphValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_DESIGN_LIFE_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayBondedConcreteSlabsCrackedGraphValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_SLABS_CRACKED_GRAPH_VALUES,
    payload: object
  };
}


export function setOverlayBondedConcreteFatigueUsedValue(object) {
  return {
    type:  OVERLAY_BONDED_CONCRETE_SET_FATIGUE_USED_VALUE,
    payload: object
  };
}

export function setOverlayBondedConcreteErosionUsedValue(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_EROSION_USED_VALUE,
    payload: object
  };
}

export function setOverlayBondedConcreteCrackingValues(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_CRACKING_VALUES,
    payload: object
  };
}

export function setOverlayBondedConcreteFaultingValues(object) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_FAULTING_VALUES,
    payload: object
  };
}

//Overly Unbonded
export function setOverlayUnbondedConcreteDoweledKValueGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_K_VALUE_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledKValueGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_K_VALUE_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledFlexuralStrengthGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledFlexuralStrengthGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FLEXURAL_STRENGTH_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledReliabilityGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_RELIABILITY_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledReliabilityGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_RELIABILITY_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledDesignLifeGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_DESIGN_LIFE_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledDesignLifeGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_DESIGN_LIFE_GRAPH_VALUES,
    payload: object
  };
}


export function setOverlayUnbondedConcreteDoweledSlabsCrackedGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_SLABS_CRACKED_GRAPH_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledSlabsCrackedGraphValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_SLABS_CRACKED_GRAPH_VALUES,
    payload: object
  };
}


export function setOverlayUnbondedConcreteDoweledCrackingValues(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_CRACKING_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledCrackingValues(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_CRACKING_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledFaultingValues(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FAULTING_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledFaultingValues(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FAULTING_VALUES,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledFatigueUsedValue(object) {
  return {
    type:  OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_FATIGUE_USED_VALUE,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledFatigueUsedValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_FATIGUE_USED_VALUE,
    payload: object
  };
}

export function setOverlayUnbondedConcreteDoweledErosionUsedValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_DOWELED_EROSION_USED_VALUE,
    payload: object
  };
}

export function setOverlayUnbondedConcreteUndoweledErosionUsedValue(object) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_UNDOWELED_EROSION_USED_VALUE,
    payload: object
  };
}


export function setParkingKValueGraphValue(object) {
  return {
    type: PARKING_SET_K_VALUE_GRAPH_VALUES,
    payload: object
  };
}

export function setParkingFlexuralStrengthGraphValue(object) {
  return {
    type: PARKING_SET_FLEXURAL_STRENGTH_GRAPH_VALUES,
    payload: object
  };
}

export function setParkingReliabilityGraphValue(object) {
  return {
    type: PARKING_SET_RELIABILITY_GRAPH_VALUES,
    payload: object
  };
}

export function setParkingDesignLifeGraphValue(object) {
  return {
    type: PARKING_SET_DESIGN_LIFE_GRAPH_VALUES,
    payload: object
  };
}

export function setParkingSlabsCrackedGraphValue(object) {
  return {
    type: PARKING_SET_SLABS_CRACKED_GRAPH_VALUES,
    payload: object
  };
}

export function setParkingFatigueUsedValue(object) {    
    return {
        type: PARKING_SET_FATIGUE_USED_VALUE,     
        payload: object
    };
}

export function setParkingErosionUsedValue(object) {
    return {
        type: PARKING_SET_EROSION_USED_VALUE,
        payload: object
    };
}

export function setParkingCrackingValues(object) {
    return {
        type: PARKING_SET_CRACKING_VALUES,
        payload: object
    };
}

export function setParkingFaultingValues(object) {
    return {
        type: PARKING_SET_FAULTING_VALUES,
        payload: object
    };
}

export function setIntermodalSummaryPageVehiclesInfo(values) {
  return {
    type: INTERMODAL_SET_SUMMARY_PAGE_VEHICLES_INFO,
    payload: values
  };
}
