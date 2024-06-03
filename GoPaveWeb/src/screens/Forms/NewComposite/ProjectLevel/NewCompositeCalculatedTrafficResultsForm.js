import React , { Component } from 'react';
import { CalculatedTrafficResultsForm  } from 'Components';
import { reduxForm } from 'redux-form';
import { 
  NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM
} from  'Constants';

class NewCompositeCalculatedTrafficResultsForm extends Component {
  render() {
    return (
      <CalculatedTrafficResultsForm showRightBorder={true} {...this.props} />
    );
  }
}

NewCompositeCalculatedTrafficResultsForm = reduxForm({
  form: NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
  destroyOnUnmount: false
})(NewCompositeCalculatedTrafficResultsForm);


export default NewCompositeCalculatedTrafficResultsForm;