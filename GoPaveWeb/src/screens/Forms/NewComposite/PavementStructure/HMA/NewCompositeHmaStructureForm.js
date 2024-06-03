import React , { Component } from 'react';
import { FieldInput } from 'Components';
import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import  { validate } from 'Validation/NewCompositeOtherStructureFormValidation';
import NewCompositeCommonOtherStructureForm from '../NewCompositeCommonOtherStructureForm'
import { 
  NEW_COMPOSITE_HMA_STRUCTURE_FORM,
  NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';

class NewCompositeHmaStructureForm extends Component {

  render() {
    return (
      <NewCompositeCommonOtherStructureForm structureTableLayerForm={NEW_COMPOSITE_HMA_STRUCTURE_FORM} title='HMA / WMA DENSE GRADED SURFACE' dropdownLabel='Subbase Layers' {...this.props} />
    );
  }
}

NewCompositeHmaStructureForm = connect(
  state => {
    const structureSelector = formValueSelector(NEW_COMPOSITE_HMA_STRUCTURE_FORM);
    const newCompositeStructureNumberOfLayersDropdown = structureSelector(state, NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const unitType = state.currentProject.projectDetails.unitType;

    return {
      newCompositeStructureNumberOfLayersDropdown, unitType
    }
  }
)(NewCompositeHmaStructureForm);

NewCompositeHmaStructureForm = reduxForm({
  form: NEW_COMPOSITE_HMA_STRUCTURE_FORM,
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    newCompositeStructureNumberOfLayersDropdown: 1,
    [STRUCTURE_LAYER_MEMBERS]: [{}]
  }
})(NewCompositeHmaStructureForm);

export default NewCompositeHmaStructureForm;
