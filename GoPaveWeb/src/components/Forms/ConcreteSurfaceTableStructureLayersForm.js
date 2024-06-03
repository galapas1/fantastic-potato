import React , { Component } from 'react';
import { Dropdown } from 'Components';
import { FieldArray, Field, Fields, change } from 'redux-form';
import { connect } from 'react-redux';
import './Forms.scss';
import { debounce } from 'underscore';
import StructureFormTableArrayFields from './StructureFormTableArrayFields';
import { pngCollector, saveImages } from 'Actions';
import {
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  STRUCTURE_LAYER_MEMBERS, 
  METRIC
} from  'Constants';

const fieldNames = [STRUCTURE_LAYER_MEMBERS];

const renderAllErrors = fields => {
   const { meta } = fields[STRUCTURE_LAYER_MEMBERS];
   const numberOfLayers = fields.numberOfLayers;
   let items = [];
   for (let i = 0; i < numberOfLayers; i++) {

    const modulusTouched = meta[i] && meta[i][MODULUS_OF_ELASTICITY] && meta[i][MODULUS_OF_ELASTICITY].touched;
    const modulusError = meta[i] && meta.error && meta.error[i] && meta.error[i][MODULUS_OF_ELASTICITY];
    const thicknessTouched = meta[i] && meta[i][LAYER_THICKNESS] && meta[i][LAYER_THICKNESS].touched;
    const thiicknessError = meta[i] && meta.error && meta.error[i] && meta.error[i][LAYER_THICKNESS];

    items.push(
      <div style={{fontSize: 12}} key={i}>
        {modulusTouched && modulusError && <div>{`Layer ${i+ 1} Modulus of Elasticity -  ${meta.error[i][MODULUS_OF_ELASTICITY]} `}</div>}
        {thicknessTouched && thiicknessError && <div>{`Layer ${i+ 1} Layer Thickness - ${meta.error[i][LAYER_THICKNESS]} `}</div>}
      </div>
    )

   }
   if (items) {
    return <div style={{color: 'red', marginBottom: 10}}>{items}</div>;
   }
   return null;

}

class ConcreteSurfaceTableStructureLayersForm extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.structureNumberOfLayersDropdown !== this.props.structureNumberOfLayersDropdown) {
      const newDropdownValue = nextProps.structureNumberOfLayersDropdown;
      const oldDropdownValue = this.props.structureNumberOfLayersDropdown;
      this.setArrayFieldValues(oldDropdownValue, newDropdownValue);
    }
  }

  componentWillMount() {
   this.delayedCallback = debounce(function (cb) {
      cb();
   }, 750);
  }

  addFieldToStructureLayer(number) {
    for (let i = 0; i < number; i++) {
      this.arrayFieldRef.getRenderedComponent().props.fields.push({});
    }
  }

  removeFieldToStructureLayer(number) {
    for (let i = 0; i < number; i++) {
      this.arrayFieldRef.getRenderedComponent().props.fields.pop();
    }
  }

  setArrayFieldValues(oldDropdownValue, newDropdownValue) {
    let difference;
    if (oldDropdownValue < newDropdownValue) {
      difference = newDropdownValue - oldDropdownValue;
      this.addFieldToStructureLayer(difference);
    } else {
      difference = oldDropdownValue - newDropdownValue;
      this.removeFieldToStructureLayer(difference)
    }
  }

  setNillCalculatorValues() {
    this.props.changeFieldValue(this.props.kValueOutputForm, COMPOSITE_K_VALUE_SUBSTRUCTURE, '');
  }

  setArrayFieldValueOnDropdownValueChange(field, value) {
    this.props.changeFieldValue(this.props.structureTableLayerForm, field, value);
  }

  render() {
    return (
      <div>
        <div className='form-group-div'>
         <div style={{display: "flex", width: "100%", flexDirection: "column"}}>
          <label style={{fontWeight: "bold"}} className="form-label">{this.props.dropdownLabel}</label>
          <Field name={STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN} list={this.props.dropdownValues()} defaultValue={{name: 1}} style={{position: 'relative', zIndex: 101}}isSmallDropdown='true' component={Dropdown} />
        </div>
        </div>
         <div ref="PavementStructureSubbase" className='form-group-div' style={{width: "100%", display: "flex"}}>
            <div style={{fontSize: 10, width: "100%"}}>
              <label style={{ fontWeight: "bold", width: "50%", textAlign: "center"}}>Layer Type</label>
              <label style={{ fontWeight: "bold", width: "30%", textAlign: "center"}}>Resilient Modulus</label>
              <label style={{ fontWeight: "bold", width: "20%", textAlign: "center"}}>Layer Thickness</label>
            </div>
            <div style={{width: "100%", border: "1px solid gray", backgroundColor: "silver", marginBottom: 3, textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 30}}>
              <label style={{margin: 0}}>{this.props.title}</label>
            </div>
            { this.props.bondBreaker && 
                <div style={{width: "100%", border: "1px solid gray", backgroundColor: 'black', marginBottom: 3, textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 20}}>
                <label style={{margin: 0}}>BOND BREAKER</label>
              </div> }
            { this.props.existingConcrete && 
               <div style={{width: "100%", border: "1px solid gray", backgroundColor: "gray", marginBottom: 3, textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 30}}>
                 <label style={{margin: 0}}>EXISTING CONCRETE SECTION</label>
               </div>
            }
            <FieldArray ref={(el) => { this.arrayFieldRef = el;}} withRef setArrayFieldValueOnDropdownValueChange={this.setArrayFieldValueOnDropdownValueChange.bind(this)} name={STRUCTURE_LAYER_MEMBERS} zIndexValues={[100, 90, 80]} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} component={StructureFormTableArrayFields} dropdownLayerInitialValues={this.props.dropdownLayerInitialValues} structureTableLayerValues={this.props.structureTableLayerValues} compositeJpcpLimitedStructureTableLayerValues={this.props.compositeJpcpLimitedStructureTableLayerValues} compositeJPCPmodule={this.props.compositeJPCPmodule} isUnitTypeMetric={this.props.unitType === METRIC} withRef informParentComponentDidUpdate={this.componentDidUpdate.bind(this)}/>

            <div style={{ width: "100%", border: "1px solid gray", backgroundColor: "saddlebrown", textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 30}}>
              <label style={{margin: 0}}>SubGrade</label>
            </div>
        </div>
        <Fields numberOfLayers={this.props.structureNumberOfLayersDropdown} names={fieldNames} component={renderAllErrors}/>
      </div>
    );
  }

  componentDidUpdate() {
    var imgRefs = [ { fields: [
                          { type: 'png', ref: this.refs.PavementStructureSubbase, image: '', key: '@PavementStructureSubbase', w: 400, h: 100 },
                      ]
                    }];
    if(this.props.anyTouched) {
      pngCollector(0, this, imgRefs, saveImages);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
  };
}

ConcreteSurfaceTableStructureLayersForm = connect(
 null, mapDispatchToProps
)(ConcreteSurfaceTableStructureLayersForm)

export default ConcreteSurfaceTableStructureLayersForm;
