import React, { Component } from 'react';
import { TrafficSummaryDetailsForm } from 'Components';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import { setCurrentProjectUnitType } from 'Actions'; 

import {
  NEW_COMPOSITE_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  NEW_COMPOSITE_MODULE
} from  'Constants';

class NewCompositeTrafficSummaryDetailsForm extends Component {
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
            <TrafficSummaryDetailsForm module={NEW_COMPOSITE_MODULE} {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    const trafficSelector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trafficDropdown = trafficSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const customTrafficSpectrumFormValues =  state.currentProject.newCompositeFormValues.customTrafficSpectrumFormValues;
    const initialCustomTrafficSpectrumFormValues = state.currentProject.newCompositeFormValues.initialCustomTrafficSpectrumFormValues;

//    const unitType = state.currentProject.projectDetails.unitType;
    return {
       // unitType, 
        trafficDropdown, customTrafficSpectrumFormValues, initialCustomTrafficSpectrumFormValues
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(NEW_COMPOSITE_TRAFFIC_FORM));
        }
    };
}

NewCompositeTrafficSummaryDetailsForm = connect(
    mapStateToProps, mapDispatchToProps
)(NewCompositeTrafficSummaryDetailsForm)

export default NewCompositeTrafficSummaryDetailsForm;
