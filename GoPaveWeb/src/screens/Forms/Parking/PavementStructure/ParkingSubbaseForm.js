import React , { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { FieldInput, ConcreteSurfaceTableStructureLayersForm, RadioButton } from 'Components';
import { reduxForm, formValueSelector, Field} from 'redux-form';
import { showParkingUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import { connect } from 'react-redux';

import '../../../../components/Forms/Forms.scss';

import { validate } from 'Validation/StructureFormValidation';

import { structureTableLayerValues } from 'Data/appValues';
import { getUnits                  } from 'HelperFunctions/getUnits';

import { 
  PARKING_SUBBASE_FORM,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  PARKING_MODULE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  STRUCTURE_LAYER_MEMBERS,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 0}, {name: 1}];
const radioKButtonTooltipMessage = 'Check to override this calculated K-value  <br /> with a user-defined K-Value';
const radioKButtonTooltipID = 'parkingSubbaseRadioButton';

class ParkingStructureForm extends Component {

  dropdownValues() {
    return dropdownValues;
  }

  changeToUserDefinedOutput() {
    this.props.showParkingUserDefinedCompositeKValueRadioButtonValue(true);
  }

  renderCompositeKValueOutput() {
    if (this.props[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON]) {
      return (
        <div className='form-group-div' style={{width: '90%'}}>
          <RadioButton {...this.props}/>
        </div>
      )
    } else {
       return (
         <div className='form-group-div' style={{width: '90%'}}>
               <ReactTooltip id={radioKButtonTooltipID} multiline={true} place="right" type='info' effect="solid" /> 

               <div style={{ display: 'flex',  width: "100%" }}>
                   <label style={{ width: "80%", textAlign: "center" }} >Calculated Composite K-Value of Substructure</label>
                   <label style={{ width: "20%", textAlign: "right" }} >Override</label>                  
               </div>
                        
          <div style={{ display: 'flex', alignItems: 'center' }}>
                   <Field name={COMPOSITE_K_VALUE_SUBSTRUCTURE} component={FieldInput} type='text' className='form-group-div-input' spanValue={getUnits('psi/in', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} isCalculatedOutput={true} />
            <div onClick={this.changeToUserDefinedOutput.bind(this)} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{width: 12, height: 12, border: '2px solid', borderColor: '#3299CC', cursor: 'pointer'}}></div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', 
        width: '100%'}}>
        <div style={{  width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 20}}>STRUCTURE</div>
        <div style={{height: '100%', width: '100%', paddingLeft: 20, paddingRight: 20, borderLeft: '1px solid'}}>
         <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <ConcreteSurfaceTableStructureLayersForm structureTableLayerValues={structureTableLayerValues} structureTableLayerForm={PARKING_SUBBASE_FORM} kValueOutputForm={PARKING_SUBBASE_FORM} dropdownLabel='Subbase Layers' module={PARKING_MODULE} dropdownValues={this.dropdownValues.bind(this)} title='Parking Concrete Surface' {...this.props} />
           {this.renderCompositeKValueOutput()}
          </div>
        </div>
      </div>
    );
  }
}

ParkingStructureForm = reduxForm({
  form: PARKING_SUBBASE_FORM,
  destroyOnUnmount: false,
  validate,
  touchOnChange: true,
  initialValues: {
    [STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN]: 0,
    [COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE]: COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED
  }
})(ParkingStructureForm);

function mapStateToProps(state) {
    const structureSelector = formValueSelector(PARKING_SUBBASE_FORM);

    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const showCompositeKValueRadioButton = state.currentProject.parkingFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];

    const unitType = state.currentProject.projectDetails.unitType;
    return {
        structureNumberOfLayersDropdown,
        showCompositeKValueRadioButton,
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showParkingUserDefinedCompositeKValueRadioButtonValue: (value) => {
            dispatch(showParkingUserDefinedCompositeKValueRadioButtonValue(value))
        }
    };
}

ParkingStructureForm = connect(
    mapStateToProps, mapDispatchToProps      
)(ParkingStructureForm)

export default ParkingStructureForm;
