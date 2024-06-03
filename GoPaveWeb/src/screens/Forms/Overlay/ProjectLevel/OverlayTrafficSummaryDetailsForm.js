import React , { Component } from 'react';
import { TrafficSummaryDetailsForm } from 'Components';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import { setCurrentProjectUnitType } from 'Actions';
import {
  OVERLAY_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  OVERLAY_MODULE
} from  'Constants';

class OverlayTrafficSummaryDetailsForm extends Component {
    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        if(this.props.unitType != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(unitType);
        }
        return true;
    }

  render() {
    return (
      <TrafficSummaryDetailsForm module={OVERLAY_MODULE} {...this.props}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(OVERLAY_TRAFFIC_FORM));
        }
    };
}

function mapStateToProps(state) {
    const trafficSelector = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const trafficDropdown = trafficSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const customTrafficSpectrumFormValues =  state.currentProject.overlayFormValues.customTrafficSpectrumFormValues;
    const initialCustomTrafficSpectrumFormValues = state.currentProject.overlayFormValues.initialCustomTrafficSpectrumFormValues;
    return {
      trafficDropdown, customTrafficSpectrumFormValues, initialCustomTrafficSpectrumFormValues
    };
}

OverlayTrafficSummaryDetailsForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayTrafficSummaryDetailsForm)

export default OverlayTrafficSummaryDetailsForm;
