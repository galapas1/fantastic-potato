import React , { Component } from 'react';
import { FieldInput, ConcreteSurfaceTableStructureLayersForm, RadioButton } from 'Components';
import { reduxForm, formValueSelector, Field, reset} from 'redux-form';
import { showIntermodalUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import { setCurrentProjectUnitType } from 'Actions';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { validate } from 'Validation/StructureFormValidation';
import { pngCollector, saveImages } from 'Actions';
import ReactTooltip from 'react-tooltip';

import { structureTableLayerValues } from 'Data/appValues';
import { getUnits } from 'HelperFunctions/getUnits';

import {
  INTERMODAL_STRUCTURE_FORM,
  INTERMODAL_SUBGRADE_FORM,
  INTERMODAL_CONCRETE_FORM,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  INTERMODAL_MODULE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  STRUCTURE_LAYER_MEMBERS,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 0}, {name: 1}, {name: 2}, {name: 3}];
const radioKButtonTooltipMessage = 'Check to override this calculated K-value  <br /> with a user-defined K-Value';
const radioKButtonTooltipID = 'intermodalStructureRadioButton';

class IntermodalStructureForm extends Component {

  dropdownValues() {
   return dropdownValues;
  }

  changeToUserDefinedOutput() {
      this.props.showIntermodalUserDefinedCompositeKValueRadioButtonValue(true);
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
               <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' /> 

               <div style={{ display: 'flex', width: "100%" }}>
                   <label style={{ width: "80%", textAlign: "center" }} >Calculated Composite K-Value of Substructure</label>
                   <label style={{ width: "20%", textAlign: "right" }} >Override</label>
               </div>

          <div style={{display: 'flex', alignItems: 'center'}}>
                   <Field name={COMPOSITE_K_VALUE_SUBSTRUCTURE} component={FieldInput} type='text' className='form-group-div-input' spanValue={getUnits('psi/in', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} isCalculatedOutput={true} />
            <div onClick={this.changeToUserDefinedOutput.bind(this)} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{width: 12, height: 12, border: '2px solid', borderColor: '#3299CC', cursor: 'pointer'}}></div>
          </div>
        </div>
      )
    }
  }

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
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%',
        width: '100%'}}>
        <div style={{ width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 20}}>STRUCTURE</div>
        <div style={{height: '100%', width: '100%', paddingLeft: 20, paddingRight: 20}}>
         <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <ConcreteSurfaceTableStructureLayersForm structureTableLayerForm={INTERMODAL_STRUCTURE_FORM} kValueOutputForm={INTERMODAL_STRUCTURE_FORM} dropdownLabel='Subbase Layers' module={INTERMODAL_MODULE} structureTableLayerValues={structureTableLayerValues} dropdownValues={this.dropdownValues.bind(this)} title='Concrete Surface' {...this.props} />
           {this.renderCompositeKValueOutput()}
          </div>
        </div>

      </div>
    );
  }

  componentDidUpdate() {
    var imgRefs = [ { fields: [
                      ]
                    }];
    if(this.props.anyTouched) {
      pngCollector(0, this, imgRefs, saveImages);
    }
  }
}

IntermodalStructureForm = reduxForm({
  form: INTERMODAL_STRUCTURE_FORM,
  destroyOnUnmount: false,
  validate,
  touchOnChange: true,
  initialValues: {
    [STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN]: 1,
    [STRUCTURE_LAYER_MEMBERS]: [{}],
    [COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE]: COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED
  }
})(IntermodalStructureForm);

function mapStateToProps(state) {
    const structureSelector = formValueSelector(INTERMODAL_STRUCTURE_FORM);
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const showCompositeKValueRadioButton = state.currentProject.intermodalFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        structureNumberOfLayersDropdown,
        showCompositeKValueRadioButton,
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    showIntermodalUserDefinedCompositeKValueRadioButtonValue: (value) => {
      dispatch(showIntermodalUserDefinedCompositeKValueRadioButtonValue(value))
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    },
    resetForm: () => {
        dispatch(reset(INTERMODAL_STRUCTURE_FORM));
        dispatch(reset(INTERMODAL_SUBGRADE_FORM));
        dispatch(reset(INTERMODAL_CONCRETE_FORM));
    }
  };
}

IntermodalStructureForm = connect(
    mapStateToProps, mapDispatchToProps      
)(IntermodalStructureForm)

export default IntermodalStructureForm;
