import React , { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { setCurrentProjectUnitType } from 'Actions';

import { FieldInput, ConcreteSurfaceTableStructureLayersForm,  RadioButton } from 'Components';
import { Field} from 'redux-form';

import '../../../../components/Forms/Forms.scss';

import { structureTableLayerValues,
         compositeJpcpLimitedStructureTableLayerValues } from 'Data/appValues';
import { getUnits                                      } from 'HelperFunctions/getUnits';

import { 
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 1}, {name: 2}, {name: 3}];

class NewCompositeCommonJpcpStructureForm extends Component {

  dropdownValues() {
    return dropdownValues;
  }

 changeToUserDefinedOutput() {
    this.props.showNewCompositeUserDefinedCompositeKValueRadioButtonValue(true);
  }

  renderCompositeKValueOutput() {
    if (this.props.showCompositeKValueRadioButton) {
      return (
        <div className='form-group-div' style={{width: '90%'}}>
          <RadioButton {...this.props}/>        
        </div>
      )
    } else {
       return (
         <div className='form-group-div' style={{width: '90%'}}>
          <ReactTooltip id={this.props.radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid'/> 

          <div style={{ display: 'flex', width: "100%" }}>
              <label style={{ width: "80%", textAlign: "center" }} >Calculated Composite K-Value of Substructure</label>
              <label style={{ width: "20%", textAlign: "right" }} >Override</label>
          </div>

          <div style={{display: 'flex', alignItems: 'center'}}>
            <Field name={COMPOSITE_K_VALUE_SUBSTRUCTURE} component={FieldInput} type='text' className='form-group-div-input' spanValue={getUnits('psi/in', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} isCalculatedOutput={true} />
          <div onClick={this.changeToUserDefinedOutput.bind(this)} data-tip={this.props.radioKButtonTooltipMessage} data-for={this.props.radioKButtonTooltipID} style={{width: 12, height: 12, border: '2px solid', borderColor: '#3299CC', cursor: 'pointer'}}></div>
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
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{  width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>STRUCTURE</div>
        <div style={{height: "100%", width: "100%", paddingLeft: 20, paddingRight: 20, borderLeft: '1px solid'}}>
         <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <ConcreteSurfaceTableStructureLayersForm structureTableLayerValues={structureTableLayerValues} compositeJpcpLimitedStructureTableLayerValues={compositeJpcpLimitedStructureTableLayerValues} compositeJPCPmodule={true} structureTableLayerForm={this.props.structureTableLayerForm} kValueOutputForm={this.props.kValueOutputForm} dropdownValues={this.dropdownValues.bind(this)} title={this.props.layerTitle} {...this.props} />
          {this.renderCompositeKValueOutput()}
          </div>
        </div>
      </div>
    );
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

NewCompositeCommonJpcpStructureForm = connect(
    mapStateToProps, mapDispatchToProps
)(NewCompositeCommonJpcpStructureForm)

export default NewCompositeCommonJpcpStructureForm;
