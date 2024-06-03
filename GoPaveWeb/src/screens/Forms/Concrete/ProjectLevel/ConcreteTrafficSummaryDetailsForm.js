import React , { Component } from 'react';
import { TrafficSummaryDetailsForm } from 'Components';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import {
  CONCRETE_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  CONCRETE_MODULE
} from  'Constants';

class ConcreteTrafficSummaryDetailsForm extends Component {

  render() {
    return (
      <TrafficSummaryDetailsForm module={CONCRETE_MODULE} {...this.props}/>
    );
  }
}

ConcreteTrafficSummaryDetailsForm = connect(
  state => {
    const trafficSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);
    const trafficDropdown = trafficSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const customTrafficSpectrumFormValues =  state.currentProject.concreteFormValues.customTrafficSpectrumFormValues;
    const initialCustomTrafficSpectrumFormValues = state.currentProject.concreteFormValues.initialCustomTrafficSpectrumFormValues;
    return {
      trafficDropdown, customTrafficSpectrumFormValues, initialCustomTrafficSpectrumFormValues
    }
  }
)(ConcreteTrafficSummaryDetailsForm)

export default ConcreteTrafficSummaryDetailsForm;
