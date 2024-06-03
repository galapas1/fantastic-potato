import React , { Component } from 'react';
import { setCurrentProjectUnitType } from 'Actions';
import { MrsgForm } from 'Components';
import '../../../../components/Forms/Forms.scss';
import { Field, reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { extend, pluck, compact} from 'underscore';
import  { validate, warn } from 'Validation/SubgradeFormValidation';
import ReactTooltip from 'react-tooltip';
import {
  OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM, 
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  OVERLAY_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  OVERLAY_UA_MODULE,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';

class OverlayUnbondedAsphaltSubgradeForm extends Component {
  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>SUBGRADE</div>
        <div style={{height: "100%", width: "100%", borderRight:  '1px solid'}}>
         <MrsgForm kvalueOutputForm={OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM} mrsgOutputForm={OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM} module={OVERLAY_UA_MODULE} {...this.props} />
          <ReactTooltip id={SUBGRADE_DROPDOWN} multiline={true} place="right" type='warning' effect="solid"/> 
          <ReactTooltip id='mrsgInput' multiline={true} place="right" type='warning' effect="solid"/> 
        </div>
    </div>
    );
  }
}

OverlayUnbondedAsphaltSubgradeForm = reduxForm({
  form: OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN]: 1,
    [SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE
  }
})(OverlayUnbondedAsphaltSubgradeForm);

function mapStateToProps(state) {
    const subgradeSelector  = formValueSelector(OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM);
    const structureSelector = formValueSelector(OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM);

    const californiaBearingRatio          = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const resistanceValue                 = subgradeSelector(state, RESISTANCE_VALUE);
    const subgradeDropdown                = subgradeSelector(state, SUBGRADE_DROPDOWN);
    const structureLayerMembers           = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity             = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness                  = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const calculatedMrsgValue             = subgradeSelector(state, CALCULATED_MRSG_VALUE);
    const inputMrsgValue                  = subgradeSelector(state, INPUT_MRSG_VALUE);
    const trafficFormSelector             = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const trafficFormInputDropdown        = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const showEditAnalysisButton          = state.currentProject.overlayFormValues.showEditAnalysisButton;
    const asphaltAnalysisConceteMrsgValue = state.currentProject.overlayFormValues.mrsgInputValue;
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);

    const subgradeFormErrors  = getFormSyncErrors(OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM)(state);
    const structureFormErrors = getFormSyncErrors(OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM)(state);

//    const unitType = state.currentProject.projectDetails.unitType;

    return {
        californiaBearingRatio,
        resistanceValue,
        modulusOfElasticity,
        layerThickness,
        subgradeDropdown,
        calculatedMrsgValue,
        trafficFormInputDropdown,
        showEditAnalysisButton,
        asphaltAnalysisConceteMrsgValue,
        inputMrsgValue,
        structureNumberOfLayersDropdown,
        structureLayerMembers,
        subgradeFormErrors,
        structureFormErrors,
//        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

OverlayUnbondedAsphaltSubgradeForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayUnbondedAsphaltSubgradeForm);

export default OverlayUnbondedAsphaltSubgradeForm;
