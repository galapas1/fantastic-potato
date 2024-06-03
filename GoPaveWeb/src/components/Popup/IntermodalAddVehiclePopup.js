import React, { Component } from 'react';
import './Popup.scss';
import { connect } from 'react-redux';
import { untouch, touch, change, reduxForm, formValueSelector} from 'redux-form';
import { showModal, addNotification, setUserVehicleWheelCount, setUserVehicleWheelPostions, addIntermodalVehicle } from 'Actions';
import IntermodalAddVehicle from 'Forms/Intermodal/ProjectLevel/IntermodalAddVehicle';
import {
  INTERMODAL_CUSTOM_VEHICLE_POPUP,
  INTERMODAL_ADD_VEHICLE_FORM
} from  'Constants';

const popupStyle = {
  left: '5%',
  width: '90%',
  overflowY: 'auto'
};

const gearConfigValues = {
  0: 'Zero',
  1: 'Single',
  2: 'Dual',
  3: 'Tri',
  4: 'Quad'
}

class IntermodalAddVehiclePopup extends Component {

  render() {
   return (
     <div className={(this.props.currentPopup === INTERMODAL_CUSTOM_VEHICLE_POPUP && this.props.showPopup) ? 'render-popup asphalt-analysis-popup-height' : 'base-popup'} style={popupStyle}>
        <i style={{float: "right", fontSize: 30, paddingTop: 10, paddingRight: 10}} onClick={this.props.hidePopup} className="fa fa-times" ></i>
        <IntermodalAddVehicle wheelCount={this.props.wheelCount} wheelPos={this.props.wheelPos} {...this.props}/>
     </div>
   )
  }
}

function validate(values) {
  const errors = {};

  if (!values.vehicleName) {
    errors.vehicleName = 'Please enter a unique name';
  }

  return errors;
}


// // Set up initial Values based on which pavement type is chosen first
function mapStateToProps(state) {
  const selector = formValueSelector(INTERMODAL_ADD_VEHICLE_FORM);
  const wheelCount = selector(state, 'wheelCount');
  const wheelPos = state.currentProject.intermodalFormValues.wheelPos
  const vehicleName = selector(state, 'vehicleName');
  const vehiclePressure = selector(state, 'contactPressure');
  const vehicleContactArea = selector(state, 'contactArea');
  const vehicleGrossWeight = selector(state, 'grossWeight');
  const vehicleGearConfiguration = selector(state, 'gearConfiguration');
  let id;
  if (state.currentProject.popup &&  state.currentProject.popup.popupDetails && state.currentProject.popup.popupDetails.id) {
    id = state.currentProject.popup.popupDetails.id;  
  }

  const vehicles =  state.currentProject.intermodalFormValues.vehicles;
  return {
    wheelCount: wheelCount,
    wheelPos: wheelPos,
    vehicleName: vehicleName,
    contactPressure: vehiclePressure,
    contactArea: vehicleContactArea,
    grossWeight: vehicleGrossWeight,
    gearConfiguration: vehicleGearConfiguration,
    vehicles: vehicles,
    id: id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams, module) => {
      dispatch(showModal(modal, routingParams, module))
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    untouch: (form, field) => {
      dispatch(untouch(form, field));
    },
    focusElement: (form, field) => {
      dispatch(touch(form, field));
    },
    addNotification: (message, level, autoDismiss, uid) => {
      dispatch(addNotification(message, level, autoDismiss, uid));
    },
    setUserVehicleWheelCount: (value) => {
      dispatch(setUserVehicleWheelCount(value));
    },
    setUserVehicleWheelPostions:(value) => {
      dispatch(setUserVehicleWheelPostions(value));
    },
    addIntermodalVehicle: (vehicle, id, callback) => {
      dispatch(addIntermodalVehicle(vehicle, id)).then(() => {
        if (callback) {
          callback()
        }
      }); 
    },
  };
}

IntermodalAddVehiclePopup = connect(
 mapStateToProps, mapDispatchToProps      
)(IntermodalAddVehiclePopup)

IntermodalAddVehiclePopup = reduxForm({
  form: INTERMODAL_ADD_VEHICLE_FORM,
  validate,
  touchOnChange: true
})(IntermodalAddVehiclePopup);

export default IntermodalAddVehiclePopup;

