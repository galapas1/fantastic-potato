import React , { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import NewCompositeCommonOtherSubgradeForm from '../NewCompositeCommonOtherSubgradeForm';
import  { validate, warn } from 'Validation/NewCompositeOtherSubgradeFormValidation';
import { 
  NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
} from  'Constants';

class NewCompositeOtherSubgradeForm extends Component {
  render() {
    return (
      <NewCompositeCommonOtherSubgradeForm {...this.props} />
    );
  }
}

NewCompositeOtherSubgradeForm = reduxForm({
  form: NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
  validate, 
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [THICKNESS_TO_RIGID_FOUNDATION]: 200,
    [SUBGRADE_POISSONS_RATIO]: 0.35
  }
})(NewCompositeOtherSubgradeForm);

NewCompositeOtherSubgradeForm = connect(
  state => {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
       unitType
    }
  }
)(NewCompositeOtherSubgradeForm);

export default NewCompositeOtherSubgradeForm;
