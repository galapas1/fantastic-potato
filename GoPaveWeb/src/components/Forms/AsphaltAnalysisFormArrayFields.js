import React , { Component } from 'react';
import { connect } from 'react-redux';
import { FieldInput, Dropdown } from 'Components';
import { Field } from 'redux-form';
import { getUnits } from 'HelperFunctions/getUnits';
import { setCurrentProjectUnitType } from 'Actions';
import './Forms.scss';
import {
  ASPHALT_CEMENT_CONCRETE,
  ASPHALT_TREATED_AGGREGRIATE_BASE,
  BITUM_TREATED_AGGREGRIATE_BASE,
  CEMENT_TREATED_AGGREGRIATE_BASE,
  CEMENT_FLY_TREATED_AGGREGRIATE_BASE,
  GRADED_STONE_BASE,
  CRUSHED_STONE_BASE,
  GRANULAR_SUBBASE,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN,
  ASPHALT_ANALYSIS_LAYERS
} from  'Constants';

const dropdownValues = [ 
 {name: ASPHALT_CEMENT_CONCRETE}, 
 {name: ASPHALT_TREATED_AGGREGRIATE_BASE}, 
 {name: BITUM_TREATED_AGGREGRIATE_BASE}, 
 {name: CEMENT_TREATED_AGGREGRIATE_BASE}, 
 {name: CEMENT_FLY_TREATED_AGGREGRIATE_BASE},
 {name: GRADED_STONE_BASE},
 {name: CRUSHED_STONE_BASE},
 {name: GRANULAR_SUBBASE}
 ];

class AsphaltAnalysisFormArrayFields extends Component {

  setParentDropdownValue(index, name) {
    //let field = this.props.fields.get(index);
    if (this.props.setArrayFieldValueOnDropdownValueChange) {
      this.props.setArrayFieldValueOnDropdownValueChange(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT}]`, 1);
    }
    if (name === ASPHALT_CEMENT_CONCRETE) {
      this.props.setArrayFieldValueOnDropdownValueChange(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT}]`, 0.44);
    } 
    if (this.props.checkIfAllFieldsAreValidAndAutomaticallyCalculate) {
      this.props.checkIfAllFieldsAreValidAndAutomaticallyCalculate();
    }
  }

  setParentValue() {
    if (this.props.checkIfAllFieldsAreValidAndAutomaticallyCalculate) {
      this.props.checkIfAllFieldsAreValidAndAutomaticallyCalculate();
    }
  }

  setNillCalculatorValues() {
    if (this.props.setNillCalculatorValues) {
      this.props.setNillCalculatorValues();
    }
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    let zIndexValues = this.props.zIndexValues;
    const dropdownValue = this.props.dropdownValue();
    const isUnitTypeMetric = this.props.isUnitTypeMetric;
    return (
      <div style={{width: '100%', marginLeft: 20}}>
        {this.props.fields.map((member, index) =>
          <div style={{display: 'flex', marginBottom: 10, position: 'relative', justifyContent: 'space-between', zIndex: zIndexValues[index]}} key={index} >
            <div style={{width: '10%', paddingTop: 5, fontWeight: 'bold'}}>LAYER {index + 1}</div>
            <Field 
              component={Dropdown} 
              name={`${member}.${ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN}`} 
              isFieldDisabled={index + 1 > dropdownValue ? true : false} 
              setParentDropdownValue={this.setParentDropdownValue.bind(this, index)} 
              list={dropdownValues} 
              defaultValue={{name: 'Select Material'}} 
              style={{ marginRight: 30, width: '24%'}}/>
            <div className="form-group-div" style={{width: '22%'}}>
              <Field  
                className="form-group-div-input asphalt-analysis-input"
                isFieldDisabled={index + 1 > dropdownValue ? true : false} 
                alignInput='flex-start'
                name={`${member}[${ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT}]`} 
                customInputWidth='65%' 
                type="text" 
                style={{ borderRadius: 20, marginRight: 10}} 
                component={FieldInput}
                setValueToNil={`${index + 1 > dropdownValue ? true : false}`}
                setParentValue={this.setParentValue.bind(this)}
                setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}
              /> 
            </div>
            <div className="form-group-div" style={{width: '22%'}}>
              <Field 
                className="form-group-div-input asphalt-analysis-input" 
                name={`${member}.${ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT}`} 
                isFieldDisabled={index + 1 > dropdownValue ? true : false} 
                alignInput='flex-start'
                customInputWidth='65%' 
                type="text" 
                style={{ borderRadius: 20, marginRight: 10}} 
                component={FieldInput} 
                setValueToNil={`${index + 1 > dropdownValue ? true : false}`}
                setParentValue={this.setParentValue.bind(this)}
                setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}
              /> 
            </div>
            <div className="form-group-div" style={{width: '22%'}}>
              <Field 
                className="form-group-div-input asphalt-analysis-input" 
                name={`${member}.${ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS}`} 
                isFieldDisabled={index + 1 > dropdownValue ? true : false} 
                alignInput='flex-start'
                customInputWidth='65%' 
                type="text" 
                style={{ borderRadius: 20, marginRight: 10 }} 
                component={FieldInput} 
                spanValue={`(${getUnits('in', isUnitTypeMetric)})`}  
                setValueToNil={`${index + 1 > dropdownValue ? true : false}`}
                setParentValue={this.setParentValue.bind(this)}
                setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}
              /> 
            </div>
          </div>
        )}  
      </div>
    )
    
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

AsphaltAnalysisFormArrayFields = connect(
    mapStateToProps, mapDispatchToProps
)(AsphaltAnalysisFormArrayFields)

export default AsphaltAnalysisFormArrayFields;
