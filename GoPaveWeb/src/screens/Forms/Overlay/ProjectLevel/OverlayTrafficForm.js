import React , { Component } from 'react';
import { AsphaltAnalysisTrafficForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormSyncErrors, reset } from 'redux-form';
import { compact, pluck,  } from 'underscore';
import  { validate, warn } from 'Validation/TrafficFormValidation';
import { setCurrentProjectUnitType } from 'Actions'; 
import {
  OVERLAY_TRAFFIC_FORM,
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
  OVERLAY_ASPHALT_ANALYIS_FORM,
  ASPHALT_ANALYSIS_FORM_LAYERS,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  OVERLAY_MODULE,
  OVERLAY_ASPHALT_ANALYSIS_POPUP,
  OVERLAY_GLOBAL_FORM,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM
} from  'Constants';

class OverlayTrafficForm extends Component {
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
          <div>
            <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
              <div style={{ paddingLeft: -30, paddingTop: 10 }}>
                  <div style={{ paddingLeft: 30,
                                display: 'flex',
                                width: '500px',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>

                      <div style={{ paddingRight: 30, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                      <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                      <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                      <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Overlay</div>
                 </div>
              </div>

      <AsphaltAnalysisTrafficForm 
        asphaltAnalysisForm={OVERLAY_ASPHALT_ANALYIS_FORM} 
        asphaltAnalysisPopup={OVERLAY_ASPHALT_ANALYSIS_POPUP} 
        module={OVERLAY_MODULE} 
        outputForm={OVERLAY_GLOBAL_FORM}
        {...this.props} />

     </div></div>
    )  
  }
}

OverlayTrafficForm = reduxForm({
  form: OVERLAY_TRAFFIC_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [TRAFFIC_SPECTRUM_DROPDOWN]: DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
    [TRAFFIC_FORM_INPUTS_DROPDOWN]: TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO
   } 
})(OverlayTrafficForm);

function mapStateToProps(state) {
    const selector = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const trucksPerDay = selector(state, TRUCKS_PER_DAY);
    const trafficGrowthRate = selector(state, TRAFFIC_GROWTH_RATE);
    const directionalDistribution = selector(state, DIRECTIONAL_DISTRIBUTION);
    const designLaneDistribution = selector(state, DESIGN_LANE_DISTRIBUTION);
    const designLife = selector(state, DESIGN_LIFE);
    const trafficFormErrors = getFormSyncErrors(OVERLAY_TRAFFIC_FORM)(state);
    const trafficFormInputsDropdown = selector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const trafficSpectrumDropdown = selector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.overlayFormValues.showEditAnalysisButton;
    const asphaltAnlaysFormValues = state.currentProject.overlayFormValues.asphaltAnalysisFormValues;
    const overallStandardDeviation = asphaltAnlaysFormValues[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION];
    const trafficSummaryFormValues = state.currentProject.overlayFormValues.trafficSummaryFormValues;
    const trafficFormInputsDropdownDisbaled = state.currentProject.overlayFormValues.trafficFormInputsDropdownDisbaled;

    // Asphalt Analysis Form
    const asphaltAnalysisSelector = formValueSelector(OVERLAY_ASPHALT_ANALYIS_FORM);
    const asphaltAnalysisLayers = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_LAYERS);
    const layerCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT));
    const drainageCoefficient = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT));
    const layerThickness = compact(pluck(asphaltAnalysisLayers, ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS));
    const reliability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_RELIABILITY);
    const subgradeResilientModulus = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS);
    const initialServiceability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY);
    const terminalServiceability = asphaltAnalysisSelector(state, ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY);

    return {
        trucksPerDay,
        trafficGrowthRate,
        directionalDistribution,
        asphaltAnlaysFormValues,
        designLaneDistribution,
        designLife,
        trafficFormErrors,
        trafficFormInputsDropdown,
        showEditAnalysisButton,
        trafficSpectrumDropdown,
        trafficSummaryFormValues,
        layerCoefficient,
        drainageCoefficient,
        layerThickness,
        reliability,
        overallStandardDeviation,
        subgradeResilientModulus,
        initialServiceability,
        terminalServiceability,
        trafficFormInputsDropdownDisbaled,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(OVERLAY_TRAFFIC_FORM));
            dispatch(reset(OVERLAY_GLOBAL_FORM));
            dispatch(reset(OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM));
            dispatch(reset(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM));
            dispatch(reset(OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM));
        }
    };
}

OverlayTrafficForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayTrafficForm)

export default OverlayTrafficForm;
