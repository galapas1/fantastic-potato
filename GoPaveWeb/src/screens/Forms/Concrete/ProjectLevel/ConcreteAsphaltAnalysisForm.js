import React, { Component } from 'react';
import { AsphaltAnalysisForm } from 'Components';
import { Field, FieldArray, reduxForm, formValueSelector, getFormSyncErrors, getFormValues  } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { compact, pluck } from 'underscore';
import  { validate, warn } from 'Validation/AsphaltAnalysisFormValidation';
import { setCurrentProjectUnitType } from 'Actions'; 
import {
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  CONCRETE_ASPHALT_ANALYIS_FORM,
  ASPHALT_ANALYSIS_FORM_LAYERS,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  ASPHALT_ANALYSIS_LAYERS_DROPDOWN,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  CONCRETE_ASPHALT_ANALYSIS_POPUP,
  CONCRETE_TRAFFIC_FORM,
  CONCRETE_GLOBAL_FORM, 
  CONCRETE_MODULE,
  DESIGN_LIFE
} from  'Constants';

class ConcreteAsphaltAnalysisForm extends Component {
    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }
    render() {
        return (
            <AsphaltAnalysisForm 
            asphaltAnalysisPopup={CONCRETE_ASPHALT_ANALYSIS_POPUP} // Needed to display correct popup
            asphaltAnalysisForm={CONCRETE_ASPHALT_ANALYIS_FORM} // Needed to set calculator outputs
            trafficForm={CONCRETE_TRAFFIC_FORM} // Needed to set TRAFFIC_FORM_INPUTS_DROPDOWN value
            reliabilityForm={CONCRETE_GLOBAL_FORM} // Needed to set RELIABILITY value
            outputForm={CONCRETE_GLOBAL_FORM} // Needed to set calculator outputs, can be the same or different from reliability Form
            module={CONCRETE_MODULE} // Needed so that appropriate redux store values are changed
            {...this.props} />
        )
    }
}

ConcreteAsphaltAnalysisForm = reduxForm({
  form: CONCRETE_ASPHALT_ANALYIS_FORM,
  touchOnChange: true,
  validate,
  warn
})(ConcreteAsphaltAnalysisForm);

function mapStateToProps(state) {
    const selector = formValueSelector(CONCRETE_ASPHALT_ANALYIS_FORM);
    const asphaltAnalysisLayers = selector(state, ASPHALT_ANALYSIS_FORM_LAYERS);
    const asphaltAnalysisFormErrors = getFormSyncErrors(CONCRETE_ASPHALT_ANALYIS_FORM)(state);

    const asphaltAnalysisNumberOfLayersDropdown = selector(state, ASPHALT_ANALYSIS_LAYERS_DROPDOWN);
    const layerCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT));
    const drainageCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT));
    const layerThickness = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS));
    const reliability = selector(state, ASPHALT_ANALYSIS_FORM_RELIABILITY);
    const overallStandardDeviation = selector(state, ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION);
    const subgradeResilientModulus = selector(state, ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS);

    const initialServiceability = selector(state, ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY);
    const terminalServiceability = selector(state, ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY);
    
    const trafficSummaryFormValues = state.currentProject.concreteFormValues.trafficSummaryFormValues;
    const editDefaultParametres = state.currentProject.concreteFormValues.editDefaultParametres;
    const asphaltAnlaysisEnteredFormValues = getFormValues(CONCRETE_ASPHALT_ANALYIS_FORM)(state);
    const showEditAnalysisButton = state.currentProject.concreteFormValues.showEditAnalysisButton;
    const asphaltAnlaysisFormValues = state.currentProject.concreteFormValues.asphaltAnalysisFormValues;
    const trafficFormSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);
    const designLife = trafficFormSelector(state, DESIGN_LIFE);
    const initialValues = state.currentProject.concreteFormValues.asphaltAnalysisFormValues; // pull initial values from concrete Form values reducer

//    const unitType = state.currentProject.projectDetails.unitType;

    return {
      initialValues,
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

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

ConcreteAsphaltAnalysisForm = connect(
    mapStateToProps, mapDispatchToProps
)(ConcreteAsphaltAnalysisForm)

export default ConcreteAsphaltAnalysisForm;

