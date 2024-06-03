import React, { Component } from 'react';
import '../Popup/Popup.scss';
import { connect } from 'react-redux';
import { Dropdown } from 'Components';
import { Field, FieldArray, reduxForm, formValueSelector, touch, change, reset } from 'redux-form';
import  CustomTrafficFormArrayFields from './CustomTrafficFormArrayFields';
import { filter, each } from 'underscore';
import { TrafficSummaryDetailsData } from 'Data/trafficSummary';
import { setCurrentProjectUnitType,
         setCustomTrafficSpectrumFormValues, addNotification, setTrafficSummaryDetailFormValues } from 'Actions';
import { isUndefined, extend } from 'underscore';
import { validate } from 'Validation/CustomTrafficSummaryPopupValidation';
import { trafficSpectrumDropdownValues } from 'Data/appValues';
import { getUnits } from 'HelperFunctions/getUnits';

import {
  CUSTOM_TRAFFIC_SUMMARY_POPUP,
  CUSTOM_TRAFFIC_POPUP_FORM,
  SINGLE_CUSTOM_TRAFFIC_SPECTRUM,
  TANDEM_CUSTOM_TRAFFIC_SPECTRUM,
  TRIDEM_CUSTOM_TRAFFIC_SPECTRUM,
  CUSTOM_TRAFFIC_POPUP_FORM_TRAFFIC_SPECTRUM_DROPDOWN,
  METRIC
} from  'Constants';

const popupStyle = {
  left: '15%',
  width: '70%',
  overflowY: 'auto'
}

class CustomTrafficSpectrumForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enabledFormFields: {
        singleCustomTrafficSpectrum: 10,
        tandemCustomTrafficSpectrum: 10,
        tridemCustomTrafficSpectrum: 10,
      }
    }
  }

  // This method controls which fields are enabed when Custom Traffic Spectum is selected. Uses component state value enabledFormFields
  // When this form is rendered initially, first layer is enabled for all spectrums.
  // If a user enters valid set of values, then the next layer in that spectrum is enabled by passing the fields a setEnabledFormFields props which 
  // sets the fields to be disabled based on certain conditions
  setEnabledFormFields(name, value) {
    const enabledFormFields = extend(this.state.enabledFormFields, {[name]: value});
    this.setState({enabledFormFields: enabledFormFields});
  }

  setTrafficSpectrumDropdownParentDropdownValue(item) {
    const { unitType } = this.props;
    const useMetric = (unitType === METRIC ? 1 : 0);

    this.props.resetForm(CUSTOM_TRAFFIC_POPUP_FORM);
    // When Custom Traffic Spectrum option is selected, only the first layer for all spectrums needs to be enabled
    if (item === 'Custom Traffic Spectrum') {
      this.setEnabledFormFields(SINGLE_CUSTOM_TRAFFIC_SPECTRUM, 10);
      this.setEnabledFormFields(TANDEM_CUSTOM_TRAFFIC_SPECTRUM, 10);
      this.setEnabledFormFields(TRIDEM_CUSTOM_TRAFFIC_SPECTRUM, 10);
    } else if (TrafficSummaryDetailsData[item] && TrafficSummaryDetailsData[item][useMetric]) {
      const spectrumValues = TrafficSummaryDetailsData[item][useMetric];
      this.props.changeFieldValue(CUSTOM_TRAFFIC_POPUP_FORM, SINGLE_CUSTOM_TRAFFIC_SPECTRUM , spectrumValues['singleItems']);
      this.props.changeFieldValue(CUSTOM_TRAFFIC_POPUP_FORM, TANDEM_CUSTOM_TRAFFIC_SPECTRUM , spectrumValues['tandemItems']);
      this.props.changeFieldValue(CUSTOM_TRAFFIC_POPUP_FORM, TRIDEM_CUSTOM_TRAFFIC_SPECTRUM , spectrumValues['tridemItems']);  
    }
  }

  checkForErrors(property) {
    const self = this;
    let haveAllInputsBeenFilledOut  = true;
    each(this.props[property], function(member, index){
      if (!(isUndefined(member.axleLoad) || isUndefined(member.axlesPer1000))) {
        return;
      }
      if (member.axleLoad && isUndefined(member.axlesPer1000)) {
        haveAllInputsBeenFilledOut  = false;
        self.props.focusElement(CUSTOM_TRAFFIC_POPUP_FORM, `${property}[${index}].axlesPer1000`);
      }
     if (member.axlesPer1000 && isUndefined(member.axleLoad)) {
        haveAllInputsBeenFilledOut  = false;
        self.props.focusElement(CUSTOM_TRAFFIC_POPUP_FORM, `${property}[${index}].axleLoad`);
     }
    })
    return haveAllInputsBeenFilledOut;
  }

  applyFormValues() {
    // If form errors are present, dont update Traffic Summary form and dont close popup
    const haveAllCorrespondingSingleSpectrumValuesBeenFilledOut = this.checkForErrors('singleCustomTrafficSpectrum')
    const haveAllCorrespondingTandemSpectrumValuesBeenFilledOut = this.checkForErrors('tandemCustomTrafficSpectrum')
    const haveAllCorrespondingTridemSpectrumValuesBeenFilledOut = this.checkForErrors('tridemCustomTrafficSpectrum')

    if (haveAllCorrespondingSingleSpectrumValuesBeenFilledOut && haveAllCorrespondingTandemSpectrumValuesBeenFilledOut && haveAllCorrespondingTridemSpectrumValuesBeenFilledOut) {
      this.props.setCustomTrafficSpectrumFormValues(this.props.module, this.props.customTrafficValuesObject);
      this.props.setTrafficSummaryDetailFormValues(this.props.module, this.props.customTrafficValuesObject);
      this.props.hidePopup();  
    } else {
       this.props.addNotification('Corresponding Axle Loads and Axles per 1000 inputs need to be filled out before changes can be applied.', 'error', 5);
    }
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div className={(this.props.currentPopup === CUSTOM_TRAFFIC_SUMMARY_POPUP && this.props.showPopup) ? 'render-popup custom-traffic-summary-popup-height' : 'base-popup'} style={popupStyle}>
       <i style={{float: "right", fontSize: 25, paddingTop: 5, paddingRight: 10, position: 'relative', zIndex: 11}} onClick={this.props.hidePopup} className='fa fa-times' ></i>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
          <div style={{display: 'flex', width: '100%', marginBottom: 10, marginLeft: 40, zIndex: 10}}>
            <div style={{width: '40%'}}>
              <Field name={CUSTOM_TRAFFIC_POPUP_FORM_TRAFFIC_SPECTRUM_DROPDOWN} list={trafficSpectrumDropdownValues} component={Dropdown} setParentDropdownValue={this.setTrafficSpectrumDropdownParentDropdownValue.bind(this)} defaultValue={{name: "Custom Traffic Spectrum"}} />
            </div>
            <div style={{color: '#3299CC', fontWeight: 'bold', marginBottom: 8}}>CUSTOM TRAFFIC SPECTRUM</div>
          </div>
          <div style={{display: "flex", width: '100%', marginLeft: 30}}>
            <div style={{width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid'}}>
              <div style={{marginBottom: 10}}>SINGLE</div>
              <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
              <div style={{width: '80%', display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5}}>
                <div style={{width: '40%'}}>Axle Load ({getUnits('kips', this.props.unitType === METRIC)})</div>
                <div style={{width: '40%'}}>Axles / 1000</div>
              </div>
                <FieldArray setEnabledFormFields={this.setEnabledFormFields.bind(this)} isCustomTrafficPopupDropdown={this.props.customTrafficSpectrumDropdown === 'Custom Traffic Spectrum'} enabledFormFields={this.state.enabledFormFields} name={SINGLE_CUSTOM_TRAFFIC_SPECTRUM} component={CustomTrafficFormArrayFields} />
            </div>
            <div style={{width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid'}}>
              <div style={{marginBottom: 12}}>TANDEM</div>
              <div style={{display: 'flex'}}>
                <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
                <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
              </div>
              <div style={{width: '80%', display: 'flex', fontSize: 12, justifyContent: 'space-between', marginBottom: 5}}>
                <div style={{width: '40%'}}>Axle Load ({getUnits('kips', this.props.unitType === METRIC)})</div>
                <div style={{width: '40%'}}>Axles / 1000</div>
              </div>
                <FieldArray setEnabledFormFields={this.setEnabledFormFields.bind(this)} isCustomTrafficPopupDropdown={this.props.customTrafficSpectrumDropdown === 'Custom Traffic Spectrum'} enabledFormFields={this.state.enabledFormFields} name={TANDEM_CUSTOM_TRAFFIC_SPECTRUM} component={CustomTrafficFormArrayFields} />
            </div>
            <div style={{width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{marginBottom: 10}}>TRIDEM</div>
              <div style={{display: 'flex'}}>
                <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
                <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
                <div style={{backgroundImage: 'url(/images/Axel_icon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 52, marginBottom: 10 }}></div>
              </div>
              <div style={{width: '80%', display: 'flex',fontSize: 12, justifyContent: 'space-between', marginBottom: 5}}>
                <div style={{width: '40%'}}>Axle Load ({getUnits('kips', this.props.unitType === METRIC)})</div>
                <div style={{width: '40%'}}>Axles / 1000</div>
              </div>
                <FieldArray setEnabledFormFields={this.setEnabledFormFields.bind(this)} isCustomTrafficPopupDropdown={this.props.customTrafficSpectrumDropdown === 'Custom Traffic Spectrum'} enabledFormFields={this.state.enabledFormFields} name={TRIDEM_CUSTOM_TRAFFIC_SPECTRUM} component={CustomTrafficFormArrayFields} />
            </div>
          </div>
          <div style={{width: '95%', display: 'flex', justifyContent: 'flex-end', paddingTop: 5}}>
            <button onClick={this.applyFormValues.bind(this)} style={{backgroundColor: '#669900', width: 50}}>Apply</button>
          </div>
         
       </div>
      </div>
    )
   }
}

CustomTrafficSpectrumForm = reduxForm({
  form: CUSTOM_TRAFFIC_POPUP_FORM,
  validate,
  touchOnBlur: false,
  destroyOnUnmount: false,
  initialValues: {
    singleCustomTrafficSpectrum: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    tandemCustomTrafficSpectrum: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    tridemCustomTrafficSpectrum: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    popupFormCustomTrafficSpectumDropdown: 'Custom Traffic Spectrum'
  }
})(CustomTrafficSpectrumForm);

function mapStateToProps(state) {
    const selector = formValueSelector(CUSTOM_TRAFFIC_POPUP_FORM);

    const singleCustomTrafficSpectrum   = selector(state, SINGLE_CUSTOM_TRAFFIC_SPECTRUM);
    const tandemCustomTrafficSpectrum   = selector(state, TANDEM_CUSTOM_TRAFFIC_SPECTRUM);
    const tridemCustomTrafficSpectrum   = selector(state, TRIDEM_CUSTOM_TRAFFIC_SPECTRUM);
    const customTrafficSpectrumDropdown = selector(state, CUSTOM_TRAFFIC_POPUP_FORM_TRAFFIC_SPECTRUM_DROPDOWN);

    const singleCustomTrafficSpectrumValues = filter(singleCustomTrafficSpectrum, function(object) {
        return !isUndefined(object.axleLoad) && !isUndefined(object.axlesPer1000);
    });
    const tandemCustomTrafficSpectrumValues = filter(tandemCustomTrafficSpectrum, function(object) {
        return !isUndefined(object.axleLoad) && !isUndefined(object.axlesPer1000);
    });
    const tridemCustomTrafficSpectrumValues = filter(tridemCustomTrafficSpectrum, function(object) {
        return !isUndefined(object.axleLoad) && !isUndefined(object.axlesPer1000);
    });

    const customTrafficValuesObject = {
        singleItems: singleCustomTrafficSpectrumValues,
        tandemItems: tandemCustomTrafficSpectrumValues,
        tridemItems: tridemCustomTrafficSpectrumValues
    };

    const unitType = state.currentProject.projectDetails.unitType;

    return {
        customTrafficValuesObject, 
        singleCustomTrafficSpectrum, 
        tandemCustomTrafficSpectrum, 
        tridemCustomTrafficSpectrum,
        customTrafficSpectrumDropdown,
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    setCustomTrafficSpectrumFormValues: (module, values) => {
      dispatch(setCustomTrafficSpectrumFormValues(module, values));
    },
    focusElement: (form, field) => {
      dispatch(touch(form, field));
    },
    addNotification: (message, level, autoDismiss) => {
      dispatch(addNotification(message, level, autoDismiss));
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    resetForm:(form) => {
      dispatch(reset(form));
    },
    setTrafficSummaryDetailFormValues: (module, values) => {
      dispatch(setTrafficSummaryDetailFormValues(module, values));
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

CustomTrafficSpectrumForm = connect(
    mapStateToProps, mapDispatchToProps        
)(CustomTrafficSpectrumForm)

export default CustomTrafficSpectrumForm;
