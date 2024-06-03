import React , { Component } from 'react';
import { FieldInput } from 'Components';
import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import NewCompositeCommonOtherStructureForm from '../NewCompositeCommonOtherStructureForm'
import  { validate } from 'Validation/NewCompositeOtherStructureFormValidation';
import { 
  NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
  NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  STRUCTURE_LAYER_MEMBERS

} from  'Constants';

class NewCompositeOtherStructureForm extends Component {

  render() {
    return (
      <NewCompositeCommonOtherStructureForm structureTableLayerForm={NEW_COMPOSITE_OTHER_STRUCTURE_FORM} title='OTHER SURFACE' dropdownLabel='Subbase Layers' {...this.props} />
    );
  }
}

NewCompositeOtherStructureForm = connect(
  state => {
    const structureSelector = formValueSelector(NEW_COMPOSITE_OTHER_STRUCTURE_FORM);
    const newCompositeStructureNumberOfLayersDropdown = structureSelector(state, NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const unitType = state.currentProject.projectDetails.unitType;
    return {
      newCompositeStructureNumberOfLayersDropdown, unitType
    }
  }
)(NewCompositeOtherStructureForm);

NewCompositeOtherStructureForm = reduxForm({
  form: NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    newCompositeStructureNumberOfLayersDropdown: 1,
    [STRUCTURE_LAYER_MEMBERS]: [{}]
  }
})(NewCompositeOtherStructureForm);

export default NewCompositeOtherStructureForm;
