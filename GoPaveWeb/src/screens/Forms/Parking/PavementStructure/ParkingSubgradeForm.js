import React , { Component  } from 'react';
import         { FieldInput } from 'Components';

import '../../../../components/Forms/Forms.scss';

import { Field, reduxForm, formValueSelector, getFormSyncErrors, change } from 'redux-form';

import { calculateMSRGValue,
         setParkingPavementStructureRowChosenValue,
         setCurrentProjectUnitType } from 'Actions';

import { connect } from 'react-redux';
import { pluck, compact, debounce, extend, isEqual, isUndefined, pick } from 'underscore';
import { validate, warn } from 'Validation/ParkingSubgradeFormValidation';
import { getUnits } from 'HelperFunctions/getUnits';
import {
  PARKING_SUBGRADE_FORM,
  PARKING_SUBBASE_FORM, 
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  CALIFORNIA_BEARING_RATIO,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  STRUCTURE_LAYER_MEMBERS,
  METRIC
} from  'Constants';

class ParkingSubgradeForm extends Component {

  componentWillMount() {
   this.delayedCallback = debounce(function (cb) {
      cb();   
   }, 1000);
  }

 // FieldInput sets the first parameter errorPresent. onlyStructureFormChanged is a parameter only set in this file
  setNillCalculatorValues(errorPresent, onlyStructureFormChanged) {
    this.props.changeFieldValue(PARKING_SUBBASE_FORM, COMPOSITE_K_VALUE_SUBSTRUCTURE, ''); 
    this.props.setParkingPavementStructureRowChosenValue(null);

    
    if (!onlyStructureFormChanged) {
      this.props.changeFieldValue(PARKING_SUBGRADE_FORM, CALCULATED_MRSG_VALUE, '');
    }
  }

  componentWillReceiveProps(nextProps) {
    // These lines of code control when the calculator is called. CALIFORNIA_BEARING_RATIO input in this form is not paseed a calculateValues props 
    // because only one place should trigger the calculator. Since both selecting a CBR value (from the table) and inputing a value is possible, 
    // calculator is triggered from here
    if(nextProps[CALIFORNIA_BEARING_RATIO] !== this.props[CALIFORNIA_BEARING_RATIO]) {
      this.delayedCallback(this.calculateValues.bind(this, false, nextProps[CALIFORNIA_BEARING_RATIO] ));
    }

    // Changing Structure Form should trigger calculator
    if (nextProps.structureNumberOfLayersDropdown !== this.props.structureNumberOfLayersDropdown) {
      const onlyStructureChange = true;
      this.setNillCalculatorValues(null, onlyStructureChange);
      this.delayedCallback(this.calculateValues.bind(this, onlyStructureChange));
    }

    // Need to do a deep comparison of the objects
    if (!isEqual(nextProps.structureLayerMembers, this.props.structureLayerMembers)) {
      const onlyStructureChange = true;
      this.delayedCallback(this.calculateValues.bind(this, onlyStructureChange));
    }
  }

  setParkingPavementStructureTableValue(value) {
    let rowChosen;
    if (value > 1 && value < 4.0 || value === 1) {
      rowChosen = 'FirstRow';
    } else if (value > 4 && value < 8 || value === 4) {
      rowChosen = 'SecondRow';
    } else if (value > 8 && value < 20 || value === 20) {
      rowChosen = 'ThirdRow';
    } else {
      rowChosen = '';
    }

    this.props.setParkingPavementStructureRowChosenValue(rowChosen);

  }

  calculateValues(onlyStructureChange, californiaBearingRatio) {
    const { unitType, modulusOfElasticity, layerThickness, structureNumberOfLayersDropdown } = this.props;

    let calculatorParams = {mrsgType: 'ConvertCBR'};
    let structureValues;
    let calculatorCaliforniaBearingRatio = californiaBearingRatio || this.props.californiaBearingRatio;
    if (this.props.subgradeFormErrors && this.props.subgradeFormErrors[CALIFORNIA_BEARING_RATIO]) {
      return;
    }

    if (isUndefined(calculatorCaliforniaBearingRatio) || isNaN(calculatorCaliforniaBearingRatio)) {
      return;
    }

    if (calculatorCaliforniaBearingRatio) {
      extend(calculatorParams, {[CALIFORNIA_BEARING_RATIO]:calculatorCaliforniaBearingRatio});
    }

    if (unitType === METRIC) {
      extend(calculatorParams, {convertToMetric: true});
    }

    if (structureNumberOfLayersDropdown === 0) {
        structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
        extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
        extend(calculatorParams,structureValues);
        this.props.calculateMSRGValue(calculatorParams, true, PARKING_SUBBASE_FORM, PARKING_SUBGRADE_FORM);
        return;
      } else if (!(this.props.structureFormErrors && this.props.structureFormErrors.structureLayerMembers) && modulusOfElasticity.length === structureNumberOfLayersDropdown && layerThickness.length === structureNumberOfLayersDropdown) {
        structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
        extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
        extend(calculatorParams,structureValues);
        this.props.calculateMSRGValue(calculatorParams, true, PARKING_SUBBASE_FORM, PARKING_SUBGRADE_FORM);
        return;  
      }
      // 2 conditions for running mrsOnly input Calculator
      // 1) - Structure values are not present 2) User has to input MRSG value
      // Condition under which to not run calculator - If only structure values were changed
      // If structure is not present or is not valid, then run MRSG only calculator
      if (onlyStructureChange) {
        return;
      }

      this.props.calculateMSRGValue(calculatorParams, false, PARKING_SUBBASE_FORM, PARKING_SUBGRADE_FORM);
    
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      //setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>SUBGRADE</div>
        <div style={{height: "100%", width: "100%", borderRight:  '1px solid', display: 'flex', justifyContent: 'center', flex: 1}}>
          <div className="form-group-div" >
            <label className="form-label font-weight-bold">Subgrade CBR Value</label>
            <Field name={CALIFORNIA_BEARING_RATIO} component={FieldInput} type='text' className="form-group-div-input" placeholder='Select Soil Above or Input' setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} setParentValueAndPassValueBack={this.setParkingPavementStructureTableValue.bind(this)} />
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20}}>
              <label style={{fontWeight: "bold"}} className="form-label">Calculated MRSG Value</label>
              <div style={{display: "flex", alignItems: "center"}}>
                            <Field name={CALCULATED_MRSG_VALUE} component={FieldInput} type="text" className='form-group-div-input'
                                   isCalculatedOutput={true}
                                   spanValue={getUnits('psi', this.props.unitType === METRIC)}
                                   component={FieldInput}
                                   customInputWidth='75%'
                                   setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} readOnly={true} />
              </div>  
            </div>
          </div> 
      </div>
    </div>
    );
  }
}

ParkingSubgradeForm = reduxForm({
  form: PARKING_SUBGRADE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
})(ParkingSubgradeForm);

function mapStateToProps(state) {
    const subgradeSelector = formValueSelector(PARKING_SUBGRADE_FORM);
    const subbaseSelector = formValueSelector(PARKING_SUBBASE_FORM);
    const californiaBearingRatio = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const structureLayerMembers = subbaseSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const structureNumberOfLayersDropdown = subbaseSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const subgradeFormErrors = getFormSyncErrors(PARKING_SUBGRADE_FORM)(state);
    const structureFormErrors = getFormSyncErrors(PARKING_SUBBASE_FORM)(state);

    const unitType = state.currentProject.projectDetails.unitType;

    return {
        modulusOfElasticity,
        layerThickness,
        structureNumberOfLayersDropdown,
        subgradeFormErrors,
        structureFormErrors,
        californiaBearingRatio,
        structureLayerMembers,
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        calculateMSRGValue: (valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm) => {
            dispatch(calculateMSRGValue(valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm));
        },
        changeFieldValue: (form, field, value) => {
            dispatch(change(form, field, value));
        },
        setParkingPavementStructureRowChosenValue: (value) => {
            dispatch(setParkingPavementStructureRowChosenValue(value))
        },
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

ParkingSubgradeForm = connect(
    mapStateToProps, mapDispatchToProps
)(ParkingSubgradeForm)

export default ParkingSubgradeForm;
