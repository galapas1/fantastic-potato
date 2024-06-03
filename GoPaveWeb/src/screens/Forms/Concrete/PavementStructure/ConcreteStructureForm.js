import React , { Component } from 'react';
import { FieldInput, ConcreteSurfaceTableStructureLayersForm, RadioButton } from 'Components';
import { reduxForm, formValueSelector, Field} from 'redux-form';
import { setCurrentProjectUnitType,
         showConcreteUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { validate } from 'Validation/StructureFormValidation';
import { pngCollector, saveImages } from 'Actions';
import ReactTooltip from 'react-tooltip';

import { structureTableLayerValues } from 'Data/appValues';
import { getUnits } from 'HelperFunctions/getUnits';

import {
  CONCRETE_STRUCTURE_FORM,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  CONCRETE_MODULE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  STRUCTURE_LAYER_MEMBERS,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 0}, {name: 1}, {name: 2}, {name: 3}];
const radioKButtonTooltipMessage = 'Check to override this calculated K-value  <br /> with a user-defined K-Value';
const radioKButtonTooltipID = 'concreteStructureRadioButton';
const jpcpSubbaseTableTitle = 'JOINTED PLAIN CONCRETE SURFACE';
const rccSubbaseTableTitle = 'ROLLER-COMPACTED CONCRETE SURFACE';
const crcpSubbaseTableTitle = 'CONTINUOUSLY REINFORCED CONCRETE SURFACE';

class ConcreteStructureForm extends Component {

  dropdownValues() {
   return dropdownValues;
  }

  changeToUserDefinedOutput() {
      this.props.showConcreteUserDefinedCompositeKValueRadioButtonValue(true);
 
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
               
               <div style={{ display: 'flex', width: "100%", fontSize: 11}}>
                   <label style={{ width: "80%", textAlign: "center"}} >Calculated Composite K-Value of Substructure</label>
                   <label style={{ width: "20%", textAlign: "right" }} >Override</label>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
                   <Field name={COMPOSITE_K_VALUE_SUBSTRUCTURE} component={FieldInput} type='text' className='form-group-div-input' spanValue={getUnits('psi/in', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} isCalculatedOutput={true} />
            <div onClick={this.changeToUserDefinedOutput.bind(this)} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{width: 12, height: 12, border: '2px solid', borderColor: '#3299CC', cursor: 'pointer'}}></div>
          </div>
        </div>
      )
    }
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    let formTitle;
    let subbaseLayerTableTitle;
    const { type } = this.props.params;

    if (type === 'JPCP') {
      subbaseLayerTableTitle = jpcpSubbaseTableTitle;
      formTitle = 'STRUCTURE';
    } else if (type === 'RCC') {
      subbaseLayerTableTitle = rccSubbaseTableTitle;
      formTitle = 'STRUCTURE';
    } else {
      subbaseLayerTableTitle = crcpSubbaseTableTitle;
      formTitle  = 'STRUCTURE';
    }

    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%',
        width: '100%'}}>
        <div style={{ width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 20}}>{formTitle}</div>
        <div style={{height: '100%', width: '100%', paddingLeft: 20, paddingRight: 20, borderRight: '1px solid'}}>
         <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <ConcreteSurfaceTableStructureLayersForm structureTableLayerForm={CONCRETE_STRUCTURE_FORM} kValueOutputForm={CONCRETE_STRUCTURE_FORM} dropdownLabel='Subbase Layers' module={CONCRETE_MODULE} structureTableLayerValues={structureTableLayerValues} dropdownValues={this.dropdownValues.bind(this)} title={subbaseLayerTableTitle} {...this.props} />
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

ConcreteStructureForm = reduxForm({
  form: CONCRETE_STRUCTURE_FORM,
  destroyOnUnmount: false,
  validate,
  touchOnChange: true,
  initialValues: {
    [STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN]: 1,
    [STRUCTURE_LAYER_MEMBERS]: [{}],
    [COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE]: COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED
  }
})(ConcreteStructureForm);

function mapStateToProps(state) {
    const structureSelector = formValueSelector(CONCRETE_STRUCTURE_FORM);
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const showCompositeKValueRadioButton = state.currentProject.concreteFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        structureNumberOfLayersDropdown,
        showCompositeKValueRadioButton,
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    showConcreteUserDefinedCompositeKValueRadioButtonValue: (value) => {
      dispatch(showConcreteUserDefinedCompositeKValueRadioButtonValue(value))
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

ConcreteStructureForm = connect(
    mapStateToProps, mapDispatchToProps      
)(ConcreteStructureForm)

export default ConcreteStructureForm;
