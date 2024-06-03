import React , { Component } from 'react';
import { TrafficSummaryDetailsForm } from 'Components';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  PARKING_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  PARKING_MODULE
} from  'Constants';

class ParkingTrafficSummaryDetailsForm extends Component {

  render() {
    return (
      <TrafficSummaryDetailsForm module={PARKING_MODULE} {...this.props}/>
    );
  }
}

ParkingTrafficSummaryDetailsForm = connect(
  state => {
    const trafficSelector = formValueSelector(PARKING_TRAFFIC_FORM);
    const trafficDropdown = trafficSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const customTrafficSpectrumFormValues =  state.currentProject.parkingFormValues.customTrafficSpectrumFormValues;
    const initialCustomTrafficSpectrumFormValues = state.currentProject.parkingFormValues.initialCustomTrafficSpectrumFormValues;
    return {
      trafficDropdown, customTrafficSpectrumFormValues, initialCustomTrafficSpectrumFormValues
    }
  }
)(ParkingTrafficSummaryDetailsForm)

export default ParkingTrafficSummaryDetailsForm;
