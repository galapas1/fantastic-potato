import React, { Component } from 'react';
import { AsphaltAnalysisForm } from 'Components';
import { Field, FieldArray, reduxForm, formValueSelector, getFormSyncErrors, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {   compact, pluck } from 'underscore';
import { validate, warn } from 'Validation/AsphaltAnalysisFormValidation';
import { setCurrentProjectUnitType } from 'Actions'; 
import {
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  OVERLAY_ASPHALT_ANALYIS_FORM,
  ASPHALT_ANALYSIS_FORM_LAYERS,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  ASPHALT_ANALYSIS_LAYERS_DROPDOWN,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  OVERLAY_ASPHALT_ANALYSIS_POPUP,
  OVERLAY_TRAFFIC_FORM,
  OVERLAY_GLOBAL_FORM,
  OVERLAY_MODULE,
  DESIGN_LIFE
} from  'Constants';

class OverlayAsphaltAnalysisForm extends Component {

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }
  render() {
    return (
      <AsphaltAnalysisForm 
        asphaltAnalysisPopup={OVERLAY_ASPHALT_ANALYSIS_POPUP} // Needed to display correct popup
        asphaltAnalysisForm={OVERLAY_ASPHALT_ANALYIS_FORM} // Needed to set calculator outputs
        trafficForm={OVERLAY_TRAFFIC_FORM} // Needed to set calculator outputs
        globalForm={OVERLAY_GLOBAL_FORM}  // Needed to set TRAFFIC_FORM_INPUTS_DROPDOWN value
        reliabilityForm={OVERLAY_GLOBAL_FORM} // Needed to set RELIABILITY value
        outputForm={OVERLAY_GLOBAL_FORM} // Needed to set calculator outputs, can be the same or different from reliability Form
        module={OVERLAY_MODULE} 
        {...this.props} />
    )
  }
}

OverlayAsphaltAnalysisForm = reduxForm({
  form: OVERLAY_ASPHALT_ANALYIS_FORM,
  touchOnChange: true,
  validate,
  warn
})(OverlayAsphaltAnalysisForm);

OverlayAsphaltAnalysisForm = connect(
  state => {
    const selector = formValueSelector(OVERLAY_ASPHALT_ANALYIS_FORM);
    const asphaltAnalysisLayers = selector(state, ASPHALT_ANALYSIS_FORM_LAYERS);
    const asphaltAnalysisFormErrors = getFormSyncErrors(OVERLAY_ASPHALT_ANALYIS_FORM)(state);
    const asphaltAnalysisNumberOfLayersDropdown = selector(state, ASPHALT_ANALYSIS_LAYERS_DROPDOWN);
    const layerCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT));
    const drainageCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT));
    const layerThickness = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS));
    const reliability = selector(state, ASPHALT_ANALYSIS_FORM_RELIABILITY);
    const overallStandardDeviation = selector(state, ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION);
    const subgradeResilientModulus = selector(state, ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS);
    const initialServiceability = selector(state, ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY);
    const terminalServiceability = selector(state, ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY);
    const trafficSummaryFormValues = state.currentProject.overlayFormValues.trafficSummaryFormValues;
    const editDefaultParametres = state.currentProject.overlayFormValues.editDefaultParametres;
    const asphaltAnlaysisEnteredFormValues = getFormValues(OVERLAY_ASPHALT_ANALYIS_FORM)(state);
    const showEditAnalysisButton = state.currentProject.overlayFormValues.showEditAnalysisButton;
    const asphaltAnlaysisFormValues = state.currentProject.overlayFormValues.asphaltAnalysisFormValues;
    const trafficFormSelector = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const designLife = trafficFormSelector(state, DESIGN_LIFE);
//    const unitType = state.currentProject.projectDetails.unitType;
    return {
      asphaltAnalysisLayers, 
      editDefaultParametres,
      asphaltAnalysisFormErrors, 
      reliability, 
      trafficSummaryFormValues, 
      overallStandardDeviation, 
      subgradeResilientModulus,
      layerCoefficient,
      drainageCoefficient,
      layerThickness,
      initialServiceability,
      terminalServiceability,
      showEditAnalysisButton,
      asphaltAnlaysisEnteredFormValues,
      asphaltAnlaysisFormValues,
      asphaltAnalysisNumberOfLayersDropdown,
      designLife,
//      unitType
    };
  }
)(OverlayAsphaltAnalysisForm)

function mapStateToProps(state) {
    return {
        initialValues: state.currentProject.overlayFormValues.overlayAsphaltAnalysisFormValues // pull initial values from account reducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

OverlayAsphaltAnalysisForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayAsphaltAnalysisForm)

export default OverlayAsphaltAnalysisForm;
