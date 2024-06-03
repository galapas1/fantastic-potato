import React , { Component } from 'react';
import { AsphaltAnalysisTrafficForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormSyncErrors, reset } from 'redux-form';
import { compact, pluck,  } from 'underscore';
import { validate, warn } from 'Validation/TrafficFormValidation';
import { setCurrentProjectUnitType } from 'Actions';
import {
  CONCRETE_TRAFFIC_FORM,
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  TRAFFIC_SPECTRUM_DROPDOWN,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  CONCRETE_ASPHALT_ANALYIS_FORM,
  ASPHALT_ANALYSIS_FORM_LAYERS,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  CONCRETE_MODULE,
  CONCRETE_ASPHALT_ANALYSIS_POPUP,
  CONCRETE_GLOBAL_FORM,
  CONCRETE_CONCRETE_FORM,
  CONCRETE_STRUCTURE_FORM,
  CONCRETE_SUBGRADE_FORM,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE
} from  'Constants';

class ConcreteTrafficForm extends Component {
    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        if(this.props.unitType != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(unitType);
        }
        return true;
    }

    render() {

        const { constructionType, projectType, type } = this.props.params; 

      return (
          <div> <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
              <div style={{ paddingLeft: -30, paddingTop: 10 }}>
              <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                     <div style={{ paddingRight: 30, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
              <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
              <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
              <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{constructionType}</div></div></div></div>
      <AsphaltAnalysisTrafficForm 
       asphaltAnalysisForm={CONCRETE_ASPHALT_ANALYIS_FORM} 
       asphaltAnalysisPopup={CONCRETE_ASPHALT_ANALYSIS_POPUP} 
       module={CONCRETE_MODULE} 
       outputForm={CONCRETE_GLOBAL_FORM}
       {...this.props} /></div>
    )  
  }
}

ConcreteTrafficForm = reduxForm({
  form: CONCRETE_TRAFFIC_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [TRAFFIC_SPECTRUM_DROPDOWN]:  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
    [TRAFFIC_FORM_INPUTS_DROPDOWN]: TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO
   } 
})(ConcreteTrafficForm);

function mapStateToProps(state, ownProps) {
    const selector = formValueSelector(CONCRETE_TRAFFIC_FORM);
    const trucksPerDay = selector(state, TRUCKS_PER_DAY);
    const trafficGrowthRate = selector(state, TRAFFIC_GROWTH_RATE);
    const directionalDistribution = selector(state, DIRECTIONAL_DISTRIBUTION);
    const designLaneDistribution = selector(state, DESIGN_LANE_DISTRIBUTION);
    const designLife = selector(state, DESIGN_LIFE);
    const trafficFormErrors = getFormSyncErrors(CONCRETE_TRAFFIC_FORM)(state);
    const trafficFormInputsDropdown = selector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const trafficSpectrumDropdown = selector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.concreteFormValues.showEditAnalysisButton;
    const asphaltAnlaysFormValues = state.currentProject.concreteFormValues.asphaltAnalysisFormValues;
    const overallStandardDeviation = asphaltAnlaysFormValues[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION];
    const trafficSummaryFormValues = state.currentProject.concreteFormValues.trafficSummaryFormValues;
    const trafficFormInputsDropdownDisbaled = state.currentProject.concreteFormValues.trafficFormInputsDropdownDisbaled;

    // Asphalt Analysis Form
    const asphaltAnalysisSelector = formValueSelector(CONCRETE_ASPHALT_ANALYIS_FORM);
    const asphaltAnalysisLayers = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_LAYERS);
    const layerCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT));
    const drainageCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT));
    const layerThickness = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS));
    const reliability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_RELIABILITY);
    const subgradeResilientModulus = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS);
    const initialServiceability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY);
    const terminalServiceability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY);
    const unitType = state.currentProject.projectDetails.unitType;
    return {
      trucksPerDay, trafficGrowthRate , directionalDistribution, asphaltAnlaysFormValues, designLaneDistribution, designLife, trafficFormErrors, trafficFormInputsDropdown, showEditAnalysisButton, trafficSpectrumDropdown, trafficSummaryFormValues, layerCoefficient,
      drainageCoefficient, layerThickness, reliability, overallStandardDeviation, subgradeResilientModulus, initialServiceability, terminalServiceability, trafficFormInputsDropdownDisbaled, unitType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(CONCRETE_TRAFFIC_FORM));
            dispatch(reset(CONCRETE_GLOBAL_FORM));
            dispatch(reset(CONCRETE_STRUCTURE_FORM));
            dispatch(reset(CONCRETE_CONCRETE_FORM));
            dispatch(reset(CONCRETE_SUBGRADE_FORM));
        }
    };
}

ConcreteTrafficForm = connect(
    mapStateToProps, mapDispatchToProps
)(ConcreteTrafficForm)

export default ConcreteTrafficForm;
