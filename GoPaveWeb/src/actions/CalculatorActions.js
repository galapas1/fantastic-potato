
import {change} from 'redux-form';
import axios from 'axios';
import { addNotification, showLoaderModal, hideLoaderModal} from './ModalsNotificationsActions';
import {extend} from 'underscore';
import {
  BASE_URL,
  TOTAL_TRUCKS_PER_DAY,
  AVG_TRUCKS_PER_DAY,
  CALCULATED_MRSG_VALUE,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  CALCULATED_FLEXURAL_STRENGTH,
  ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER,
  ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS,
  ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY,
  ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE,
  CONCRETE_MODULE,
  OVERLAY_MODULE,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR,
  EFFECTIVE_THICKNESS,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  CONCRETE_CRCP_SUMMARY_FORM,
  LOADING_INDICATOR_MODAL
} from 'Constants'

import {
  UPDATE_CONCRETE_ASPHALT_ANALSIS_FORM_VALUES,
  UPDATE_OVERLAY_ASPHALT_ANALSIS_FORM_VALUES
} from './types';

import thunk from 'redux-thunk';

const TRUCK_TRAFFIC_CALCULATOR_URL = BASE_URL + "/api/calculations/Trucktraffic";
const ASPHALT_ANALYSIS_CALCULATOR_URL = BASE_URL + "/api/calculations/AsphaltAnalysis";
const MSRG_CALCULATOR_URL = BASE_URL + "/api/calculations/MrsgValue";
const FLEXURAL_STRENGTH_URL = BASE_URL + "/api/calculations/FlexuralStrength";
const COMPOSITE_K_VALUE_URL = BASE_URL + "/api/calculations/CompositeKValueOfSubstructure";
const UPDATE_MRSG_AND_COMPOSITE_K_VALUE = BASE_URL + "/api/calculations/MrsgUpdateWithCompositeKValue";
const JOINT_CRACKING_ADJUSTMENT_FACTOR_URL= BASE_URL + "/api/calculations/JointCrackingAdjustmentFactor";
const JOINT_CRACKING_ADJUSTMENT_FACTOR_AND_EXISTING_THICKNESS_URL= BASE_URL + "/api/calculations/JointCrackingAFWithEffectiveThickness";

export function calculateTruckTraffic(trafficValues, outputForm) {
  return (dispatch) => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(TRUCK_TRAFFIC_CALCULATOR_URL , trafficValues)
      .then(response => {
        dispatch(hideLoaderModal());
        const avgTrucksPerDay = response.data[AVG_TRUCKS_PER_DAY];
        const totalTrucks = response.data[TOTAL_TRUCKS_PER_DAY];
        dispatch(change(outputForm, AVG_TRUCKS_PER_DAY, parseFloat(avgTrucksPerDay.replace(/\,/g,''))));
        dispatch(change(outputForm, TOTAL_TRUCKS_PER_DAY, parseFloat(totalTrucks.replace(/\,/g,''))));
        dispatch(addNotification('Calculation was successful', 'success', 5, 'calculateTruckTraffic'));
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateTruckTrafficError'));
      });
  };
}

// If isOnlyCalculate flag is passed, then just need to perform calculation and update AA form values (no need to show values in Traffic form --> which occues when user hits // save )
export function calculateAsphaltAnalysis(formValues, isOnlyCalculate, message, asphaltAnalysisForm, outputForm) {
  return (dispatch) => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    return axios.post(ASPHALT_ANALYSIS_CALCULATOR_URL , formValues)
      .then(response => {
        dispatch(hideLoaderModal());
        const avgTrucksPerDay = parseFloat(response.data[AVG_TRUCKS_PER_DAY].replace(/\,/g,''));
        const totalTrucks = parseFloat(response.data[TOTAL_TRUCKS_PER_DAY].replace(/\,/g,''));
        const flexibleEsals =  parseFloat(response.data.flexibleEsals.replace(/\,/g,''));
        const structuralNumber = parseFloat(response.data.structuralNumber.replace(/\,/g,''));
        let messageToUser;
        if (message) {
          messageToUser = message;
        } else {
          messageToUser = 'Calculation was successful';
        }

        dispatch(addNotification(messageToUser, 'success', 5, 'calculateAsphaltAnalysis'));
        // Update redux state asphaltAnalysis form values
        if (isOnlyCalculate) {
           dispatch(change(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER, structuralNumber));
           dispatch(change(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS, flexibleEsals));
           dispatch(change(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY, avgTrucksPerDay));
           dispatch(change(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE, totalTrucks));
        } else {
          let asphaltAnalysiObject = {};
          extend(asphaltAnalysiObject, {
            [ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY]: avgTrucksPerDay,
            [ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER]: structuralNumber,
            [ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS]: flexibleEsals,
            [ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE]: totalTrucks,
          })
          dispatch(change(outputForm, AVG_TRUCKS_PER_DAY ,  avgTrucksPerDay));
          dispatch(change(outputForm, TOTAL_TRUCKS_PER_DAY, totalTrucks));
          dispatch(updateAsphaltAnalysisFormValues(module, asphaltAnalysiObject));
        }
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateAsphaltAnalysis'));
      });
  };
}

export function calculateMSRGValue(msrgValues, shouldUpdateMrsgAndCompositeKValue, kvalueOutputForm, mrsgOutputForm) {
  let url;
  if (shouldUpdateMrsgAndCompositeKValue) {
     url = UPDATE_MRSG_AND_COMPOSITE_K_VALUE
  } else {
     url = MSRG_CALCULATOR_URL
  }

  return dispatch => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(url , msrgValues)
      .then(response => {
        dispatch(hideLoaderModal());
        const mrsgValue = response.data.mrsgValue;
        dispatch(change(mrsgOutputForm, CALCULATED_MRSG_VALUE, parseFloat(mrsgValue.replace(/\,/g,''))));
        if (shouldUpdateMrsgAndCompositeKValue) {
          const compositeKValueOfSubstructure = response.data[COMPOSITE_K_VALUE_SUBSTRUCTURE];
          dispatch(change(kvalueOutputForm, COMPOSITE_K_VALUE_SUBSTRUCTURE, parseFloat(compositeKValueOfSubstructure.replace(/\,/g,''))));
        }
        dispatch(addNotification('Calculation was successful', 'success', 5, 'calculateMSRGValue'));
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateMSRGValueError'));
      });

  };
}

export function calculateFlexuralStrength(values, flexStrengthOutputForm) {
  return dispatch => {
   dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(FLEXURAL_STRENGTH_URL , values)
      .then(response => {
       dispatch(hideLoaderModal());
        const calculatedFlexuralStrength = response.data[CALCULATED_FLEXURAL_STRENGTH];
        dispatch(change(flexStrengthOutputForm, CALCULATED_FLEXURAL_STRENGTH, parseFloat(calculatedFlexuralStrength.replace(/\,/g,''))));
        dispatch(addNotification('Calculation was successful', 'success', 5, 'calculateFlexuralStrength'));
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateFlexuralStrengthError'));
      });
  };
}

export function calculateCompositeKValueOfSubstructure(values, kvalueOutputForm) {
  return dispatch => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(COMPOSITE_K_VALUE_URL , values)
      .then(response => {
       dispatch(hideLoaderModal());
        const compositeKValueOfSubstructure = response.data[COMPOSITE_K_VALUE_SUBSTRUCTURE];
        dispatch(change(kvalueOutputForm, COMPOSITE_K_VALUE_SUBSTRUCTURE, parseFloat(compositeKValueOfSubstructure.replace(/\,/g,''))));
        dispatch(addNotification('Calculation was successful', 'success', 5, 'calculateCompositeKValueOfSubstructure'));
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateCompositeKValueOfSubstructureError'));
      });
  };
}

export function calculateJoingCrackingAdjustmentFactor(values, isBonded, shouldCalculateExistingThicknessToo) {
  let url;
  if (shouldCalculateExistingThicknessToo) {
     url = JOINT_CRACKING_ADJUSTMENT_FACTOR_AND_EXISTING_THICKNESS_URL;
  } else {
     url = JOINT_CRACKING_ADJUSTMENT_FACTOR_URL;
  }
  return dispatch => {
    dispatch(showLoaderModal(LOADING_INDICATOR_MODAL));
    axios.post(url , values)
      .then(response => {
       dispatch(hideLoaderModal());;
        let effectiveThickness;
        const jointCrackingAdjustmentFactor = response.data.jointCrackingAdjustmentFactor;
        if (isBonded) {
          dispatch(change(OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM, JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR, parseFloat(jointCrackingAdjustmentFactor.replace(/\,/g,''))));
          if (shouldCalculateExistingThicknessToo) {
            effectiveThickness = response.data[EFFECTIVE_THICKNESS];
            dispatch(change(OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS, parseFloat(effectiveThickness.replace(/\,/g,''))));
          }
        } else {
          dispatch(change(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR, parseFloat(jointCrackingAdjustmentFactor.replace(/\,/g,''))));
          if (shouldCalculateExistingThicknessToo) {
            effectiveThickness = response.data[EFFECTIVE_THICKNESS];
            dispatch(change(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS, parseFloat(effectiveThickness.replace(/\,/g,''))));
          }
        }
      })
      .catch(() => {
        dispatch(hideLoaderModal());
        dispatch(addNotification('Calculation was not successful', 'error', 5, 'calculateMSRGValueError'));
      });

  };
}

export function updateAsphaltAnalysisFormValues(module, values) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = UPDATE_CONCRETE_ASPHALT_ANALSIS_FORM_VALUES;
  } else if (module === OVERLAY_MODULE) {
    type = UPDATE_OVERLAY_ASPHALT_ANALSIS_FORM_VALUES;
  }
  return {
    type: type,
    payload: values
  };
}
