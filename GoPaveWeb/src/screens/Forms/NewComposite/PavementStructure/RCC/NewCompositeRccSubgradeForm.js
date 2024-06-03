
import React , { Component } from 'react';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import { connect } from 'react-redux';
import { pluck, compact} from 'underscore';
import  { validate, warn } from 'Validation/SubgradeFormValidation';
import NewCompositeCommonJpcpSubgradeForm from '../NewCompositeCommonJpcpSubgradeForm'
import {
  NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  NEW_COMPOSITE_RCC_STRUCTURE_FORM, 
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  NEW_COMPOSITE_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  NEW_COMPOSITE_RCC_MODULE,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';

class NewCompositeRccSubgradeForm extends Component {

   render() {
    return (
      <NewCompositeCommonJpcpSubgradeForm kvalueOutputForm={NEW_COMPOSITE_RCC_STRUCTURE_FORM} mrsgOutputForm={NEW_COMPOSITE_RCC_SUBGRADE_FORM}  module={NEW_COMPOSITE_RCC_MODULE} {...this.props} />
    );
  }
}

NewCompositeRccSubgradeForm = reduxForm({
  form: NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE
  }
})(NewCompositeRccSubgradeForm);

NewCompositeRccSubgradeForm = connect(
  state => {
    const subgradeSelector = formValueSelector(NEW_COMPOSITE_RCC_SUBGRADE_FORM);
    const structureSelector = formValueSelector(NEW_COMPOSITE_RCC_STRUCTURE_FORM);
    const californiaBearingRatio = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const resistanceValue = subgradeSelector(state, RESISTANCE_VALUE);
    const subgradeDropdown = subgradeSelector(state, SUBGRADE_DROPDOWN);
    const structureLayerMembers = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const calculatedMrsgValue = subgradeSelector(state, CALCULATED_MRSG_VALUE);
    const inputMrsgValue = subgradeSelector(state, INPUT_MRSG_VALUE);
    const trafficFormSelector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trafficFormInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const asphaltAnalysisConceteMrsgValue = state.currentProject.newCompositeFormValues.mrsgInputValue;
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const subgradeFormErrors = getFormSyncErrors(NEW_COMPOSITE_RCC_SUBGRADE_FORM)(state);
    const structureFormErrors = getFormSyncErrors(NEW_COMPOSITE_RCC_STRUCTURE_FORM)(state);
    const pavementStructureType =  state.currentProject.newCompositeFormValues.type;
    const unitType = state.currentProject.projectDetails.unitType;
    
    return {
      californiaBearingRatio, resistanceValue, modulusOfElasticity, layerThickness, subgradeDropdown, calculatedMrsgValue, trafficFormInputDropdown, asphaltAnalysisConceteMrsgValue, inputMrsgValue, structureNumberOfLayersDropdown,
      structureLayerMembers, subgradeFormErrors, structureFormErrors, pavementStructureType, unitType
    }
  }
)(NewCompositeRccSubgradeForm)

export default NewCompositeRccSubgradeForm;
