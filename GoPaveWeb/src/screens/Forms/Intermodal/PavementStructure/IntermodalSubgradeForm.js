import React , { Component } from 'react';
import { MrsgForm } from 'Components';
import '../../../../components/Forms/Forms.scss';
import { Field, reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { pluck, compact} from 'underscore';
import { validate, warn } from 'Validation/SubgradeFormValidation';
import { setCurrentProjectUnitType } from 'Actions';
import {
  INTERMODAL_SUBGRADE_FORM,
  INTERMODAL_STRUCTURE_FORM, 
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  DEPTH_OF_RIGID_DROPDOWN,
  LOSS_OF_SUPPORT_DROPDOWN,
  CONCRETE_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  INTERMODAL_MODULE,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';

class IntermodalSubgradeForm extends Component {

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
         <MrsgForm module={INTERMODAL_MODULE} kvalueOutputForm={INTERMODAL_STRUCTURE_FORM} mrsgOutputForm={INTERMODAL_SUBGRADE_FORM} {...this.props} />
      </div>
    </div>
    );
  }
}

IntermodalSubgradeForm = reduxForm({
  form: INTERMODAL_SUBGRADE_FORM,
  destroyOnUnmount: false,
  validate, 
  warn,
  touchOnChange: true,
  initialValues: {
    [SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE,
  }
})(IntermodalSubgradeForm);

function mapStateToProps(state) {
    const subgradeSelector = formValueSelector(INTERMODAL_SUBGRADE_FORM);
    const structureSelector = formValueSelector(INTERMODAL_STRUCTURE_FORM);
    const californiaBearingRatio = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const resistanceValue = subgradeSelector(state, RESISTANCE_VALUE);
    const subgradeDropdown = subgradeSelector(state, SUBGRADE_DROPDOWN);
    const depthOfRigidDropdown = subgradeSelector(state, DEPTH_OF_RIGID_DROPDOWN);
    const lossOfSupportDropdown = subgradeSelector(state, LOSS_OF_SUPPORT_DROPDOWN);
    const structureLayerMembers = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const calculatedMrsgValue = subgradeSelector(state, CALCULATED_MRSG_VALUE);
    const inputMrsgValue = subgradeSelector(state, INPUT_MRSG_VALUE);
    const trafficFormSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);
    const trafficFormInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const subgradeFormErrors = getFormSyncErrors(INTERMODAL_SUBGRADE_FORM)(state);
    const structureFormErrors = getFormSyncErrors(INTERMODAL_STRUCTURE_FORM)(state);
    const unitType = state.currentProject.projectDetails.unitType;

    return {
      californiaBearingRatio, resistanceValue, modulusOfElasticity, layerThickness, subgradeDropdown, calculatedMrsgValue, trafficFormInputDropdown, inputMrsgValue, structureNumberOfLayersDropdown, depthOfRigidDropdown, lossOfSupportDropdown,
      structureLayerMembers, subgradeFormErrors, structureFormErrors, // unitType
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

IntermodalSubgradeForm = connect(
    mapStateToProps, mapDispatchToProps
)(IntermodalSubgradeForm)

export default IntermodalSubgradeForm;
