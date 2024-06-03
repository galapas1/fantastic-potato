import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FieldInput, Dropdown } from 'Components';
import { Field, Fields, reduxForm, formValueSelector, getFormValues, change, untouch } from 'redux-form';
import { connect } from 'react-redux';
import { pluck, compact } from 'underscore';

import '../../../../components/Forms/Forms.scss';

import { structureTableLayerValues } from 'Data/appValues';
import { setCurrentProjectUnitType } from 'Actions';
import { getUnits                  } from 'HelperFunctions/getUnits';

import { each } from 'underscore';
import { browserHistory, withRouter } from 'react-router';
import { FooterForm } from 'Components';
import NewCompositeCommonOtherStructureForm from './NewCompositeCommonOtherStructureForm'
import NewCompositeBstStructureForm from './BST/NewCompositeBstStructureForm'
import NewCompositeHmaStructureForm from './HMA/NewCompositeHmaStructureForm'
import NewCompositePavementStructureForm from './NewCompositePavementStructureForm'
import { 
    CEMENT_TREATED_BASE,
    ROLLER_COMPACTED_BASE,
  FULL_DEPTH_RECLAMATION,
  LEAN_CONCRETE_BASE,
  HOTMIX_WARMMIX_ASPHALT_BASE,
  BITUMINOUS_STABILIZED_BASE,
  CEMENT_MODIFIED_SUBGRADE,
  LIME_MODIFIED_SUBGRADE,
  GRANULAR_BASE,
  CEMENT_TREATED_BASE_DROPDOWN_VALUE,
  RCC_BASE_DROPDOWN_VALUE,
  FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE,
  LEAN_CONCRETE_BASE_DROPDOWN_VALUE,
  HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE,
  BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE,
  CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE,
  LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE,
  GRANULAR_BASE_DROPDOWN_VALUE,
  METRIC_CEMENT_TREATED_BASE_DROPDOWN_VALUE,
  METRIC_RCC_BASE_DROPDOWN_VALUE,
  METRIC_FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE,
  METRIC_LEAN_CONCRETE_BASE_DROPDOWN_VALUE,
  METRIC_HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE,
  METRIC_BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE,
  METRIC_CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE,
  METRIC_LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE,
  METRIC_GRANULAR_BASE_DROPDOWN_VALUE,
  STRUCTURE_LAYER_MEMBERS
} from 'Data/appValues';

import {
    NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
    NEW_COMPOSITE_BST_STRUCTURE_FORM,
    NEW_COMPOSITE_HMA_STRUCTURE_FORM,  
    BST,
    HDG    
} from 'Constants';

//First Case with 1 Subbase Layer
const OneLayerSubbaseL1Values = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)' }, { name: ROLLER_COMPACTED_BASE, subName: '(RCC)' }, { name: FULL_DEPTH_RECLAMATION }, { name: LEAN_CONCRETE_BASE, subName: '(LCB, Econocrete)' }, { name: HOTMIX_WARMMIX_ASPHALT_BASE }, { name: BITUMINOUS_STABILIZED_BASE }, { name: CEMENT_MODIFIED_SUBGRADE }, { name: LIME_MODIFIED_SUBGRADE }, { name: GRANULAR_BASE }];
const OneLayerSubbaseL2Values = [];
const OneLayerSubbaseL3Values = [];

//Second Case with 2 Subbase Layers
const TwoLayerSubbaseL1Values = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)' }, { name: ROLLER_COMPACTED_BASE, subName: '(RCC)' }, { name: FULL_DEPTH_RECLAMATION }, { name: HOTMIX_WARMMIX_ASPHALT_BASE }];
const TwoLayerSubbaseL2Values = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)' }, { name: ROLLER_COMPACTED_BASE, subName: '(RCC)' }, { name: FULL_DEPTH_RECLAMATION }, { name: LEAN_CONCRETE_BASE, subName: '(LCB, Econocrete)' }, { name: BITUMINOUS_STABILIZED_BASE }, { name: CEMENT_MODIFIED_SUBGRADE }, { name: LIME_MODIFIED_SUBGRADE }, { name: GRANULAR_BASE }];
const TwoLayerSubbaseL3Values = [];

//Third Case with 3 Subbase Layer
const ThreeSubbaseL1Values = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)' }, { name: ROLLER_COMPACTED_BASE, subName: '(RCC)' }, { name: FULL_DEPTH_RECLAMATION }, { name: HOTMIX_WARMMIX_ASPHALT_BASE }];
const ThreeSubbaseL2Values = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)' }, { name: ROLLER_COMPACTED_BASE, subName: '(RCC)' }, { name: FULL_DEPTH_RECLAMATION }, { name: LEAN_CONCRETE_BASE, subName: '(LCB, Econocrete)' }, { name: BITUMINOUS_STABILIZED_BASE }, { name: GRANULAR_BASE }];
const ThreeSubbaseL3Values = [{ name: CEMENT_MODIFIED_SUBGRADE }, { name: LIME_MODIFIED_SUBGRADE }, { name: GRANULAR_BASE }];


class NewCompositeOtherStructureFormTableArrayFields extends Component {
    
   setParentDropdownValue(index, isUnitTypeMetric, name) {
       const { setArrayFieldValueOnDropdownValueChange } = this.props;     

       let cementTreatedBaseValue;
       let rccBaseValue;
    let fulldepthreclamationValue;
    let leanConcreteBaseValue;
    let hotMixOrWarmMixAsphaltBaseValue;
    let bituminousStabilizedBaseValue;
    let cementModifiedSubgradeBaseValue;
    let limeModificedSubgradeBaseValue;
    let granularBaseValue;  

    if (isUnitTypeMetric) {
      cementTreatedBaseValue = METRIC_CEMENT_TREATED_BASE_DROPDOWN_VALUE,
      rccBaseValue = METRIC_RCC_BASE_DROPDOWN_VALUE,
      fulldepthreclamationValue = METRIC_FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE,
      leanConcreteBaseValue = METRIC_LEAN_CONCRETE_BASE_DROPDOWN_VALUE;
      hotMixOrWarmMixAsphaltBaseValue = METRIC_HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE;
      bituminousStabilizedBaseValue = METRIC_BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE;
      cementModifiedSubgradeBaseValue = METRIC_CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE;
      limeModificedSubgradeBaseValue = METRIC_LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE;
      granularBaseValue = METRIC_GRANULAR_BASE_DROPDOWN_VALUE;
    } else {
        cementTreatedBaseValue = CEMENT_TREATED_BASE_DROPDOWN_VALUE,
            rccBaseValue = RCC_BASE_DROPDOWN_VALUE,
      fulldepthreclamationValue = FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE,
      leanConcreteBaseValue = LEAN_CONCRETE_BASE_DROPDOWN_VALUE;
      hotMixOrWarmMixAsphaltBaseValue = HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE;
      bituminousStabilizedBaseValue = BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE;
      cementModifiedSubgradeBaseValue = CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE;
      limeModificedSubgradeBaseValue = LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE;
      granularBaseValue = GRANULAR_BASE_DROPDOWN_VALUE;
    }

    if (name === CEMENT_TREATED_BASE || name === ROLLER_COMPACTED_BASE || name === LEAN_CONCRETE_BASE || name === FULL_DEPTH_RECLAMATION ) {
        this.props.doesAnyFieldContainLimeORCement(true);  
    } else {
      if (this.props.fields.length === 1) {
        this.props.doesAnyFieldContainLimeORCement(false);  
      } else {
        let boolean = this.doesAnyFieldContainLimeOrCementLayer(index)
        this.props.doesAnyFieldContainLimeORCement(boolean);   
      }
    }

    if (name === CEMENT_TREATED_BASE) {
       setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, cementTreatedBaseValue);
       setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.2);
       setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfRupture]`, 200);
    } 
    else if (name === ROLLER_COMPACTED_BASE) {
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, rccBaseValue);
           setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.15);
           setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfRupture]`, 650);
       } 

   else if (name === FULL_DEPTH_RECLAMATION) {
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, fulldepthreclamationValue);
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.2);
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfRupture]`, 200);
    } else if (name === LEAN_CONCRETE_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`,leanConcreteBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.2);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfRupture]`, 40);
    } else if (name === HOTMIX_WARMMIX_ASPHALT_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, hotMixOrWarmMixAsphaltBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.35);

    } else if (name === BITUMINOUS_STABILIZED_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, bituminousStabilizedBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.35);
    } else if (name === CEMENT_MODIFIED_SUBGRADE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, cementModifiedSubgradeBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.25);
    } else if (name === LIME_MODIFIED_SUBGRADE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, limeModificedSubgradeBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.25);
    } else if (name === GRANULAR_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, granularBaseValue);
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][poissonsRatio]`, 0.35);
    }
  }

  fieldsthatContainLimeOrCemenet() {
    let fieldsthatContainLimeOrCemenet = [];
     each(this.props.fields.getAll(), function(layer, index) {
         if (layer.layerTypeName === LEAN_CONCRETE_BASE || layer.layerTypeName === CEMENT_TREATED_BASE || layer.layerTypeName === ROLLER_COMPACTED_BASE || layer.layerTypeName === FULL_DEPTH_RECLAMATION || layer.layerTypeName === CEMENT_MODIFIED_SUBGRADE) {
        fieldsthatContainLimeOrCemenet.push(index)
      }  
    })

     return fieldsthatContainLimeOrCemenet;
  }

  doesAnyFieldContainLimeOrCementLayer(dontCheckThisLayer) {
    let isLimeOrCementNamePresent = false;
    each(this.props.fields.getAll(), function(layer, index) {
        if (index !== dontCheckThisLayer && (layer.layerTypeName === LEAN_CONCRETE_BASE || layer.layerTypeName === CEMENT_TREATED_BASE || layer.layerTypeName === ROLLER_COMPACTED_BASE || layer.layerTypeName === FULL_DEPTH_RECLAMATION || layer.layerTypeName === CEMENT_MODIFIED_SUBGRADE)) {
        isLimeOrCementNamePresent = true;
      }  
    })
     return isLimeOrCementNamePresent;
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    const { calculateValues, zIndexValues, informParentComponentDidUpdate, setNillCalculatorValues, isUnitTypeMetric } = this.props;
    const isLimeOrCementNamePresent = this.doesAnyFieldContainLimeOrCementLayer();
    const fieldsthatContainLimeOrCemenet = this.fieldsthatContainLimeOrCemenet();   

  

    let SubL1Values = []
    let SubL2Values = []
    let SubL3Values = []

    if (this.props.pavementStructureType === BST) {
    if (this.props.BSTnewCompositeStructureNumberOfLayersDropdown === 1) {
        SubL1Values = OneLayerSubbaseL1Values;
        SubL2Values = OneLayerSubbaseL2Values;
        SubL3Values = OneLayerSubbaseL3Values;
    }
    if (this.props.BSTnewCompositeStructureNumberOfLayersDropdown === 2) {
        SubL1Values = TwoLayerSubbaseL1Values;
        SubL2Values = TwoLayerSubbaseL2Values;
        SubL3Values = TwoLayerSubbaseL3Values;    }
    if (this.props.BSTnewCompositeStructureNumberOfLayersDropdown === 3) {
        SubL1Values = ThreeSubbaseL1Values;
        SubL2Values = ThreeSubbaseL2Values;
        SubL3Values = ThreeSubbaseL3Values;
    }
    }

    if (this.props.pavementStructureType === HDG) {
        if (this.props.HMAnewCompositeStructureNumberOfLayersDropdown === 1) {
            SubL1Values = OneLayerSubbaseL1Values;
            SubL2Values = OneLayerSubbaseL2Values;
            SubL3Values = OneLayerSubbaseL3Values;
        }
        if (this.props.HMAnewCompositeStructureNumberOfLayersDropdown === 2) {
            SubL1Values = TwoLayerSubbaseL1Values;
            SubL2Values = TwoLayerSubbaseL2Values;
            SubL3Values = TwoLayerSubbaseL3Values;
        }
        if (this.props.HMAnewCompositeStructureNumberOfLayersDropdown === 3) {
            SubL1Values = ThreeSubbaseL1Values;
            SubL2Values = ThreeSubbaseL2Values;
            SubL3Values = ThreeSubbaseL3Values;
        }
    }
   

    return (
      <div style={{width: '100%'}}>
        {this.props.fields.map((member, index) =>
          <div key={index} style={{marginBottom: 3,  paddingRight: 5, backgroundColor: "gray", display: "flex", height: 49, position: "relative", zIndex: zIndexValues[index], width: "inherit", }}>
            <div style={{width: "33%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Field component={Dropdown} name={`${member}.layerTypeName`} list={(index === 0) ? SubL1Values : ((index === 1) ? SubL2Values : SubL3Values)} setParentDropdownValue={this.setParentDropdownValue.bind(this, index, isUnitTypeMetric)} defaultValue={{name: "Choose Layer"}} />
            </div>
            <div style={{width: isLimeOrCementNamePresent ? '23%' : "33%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 4}}>
                        <Field 
              name={`${member}.modulusOfElasticity`} 
              component={FieldInput}
              onChange={ informParentComponentDidUpdate }
              type="text" 
              dontShowError='true' 
              className="form-group-div-input structure-form-input" 
              errorClassName="subgrade-table-error" 
              calculateValues={calculateValues}
              setNillCalculatorValues={setNillCalculatorValues}
              spanValue={getUnits('psi', isUnitTypeMetric)}
              customInputWidth='100%'
               />
            </div>
            <div style={{width: isLimeOrCementNamePresent ? '16%' : "18%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                           <Field 
               name={`${member}.layerThickness`} 
               component={FieldInput} 
               onChange={ informParentComponentDidUpdate }
               type="text" 
               dontShowError='true' 
               className="form-group-div-input structure-form-input" 
               errorClassName="subgrade-table-error" 
               calculateValues={calculateValues}
               setNillCalculatorValues={setNillCalculatorValues}
               spanValue={getUnits('in', isUnitTypeMetric)}
               customInputWidth='100%'
               />
            </div>
            <div style={{width: isLimeOrCementNamePresent ? '12%' : "16%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 4}}>
              <Field 
              name={`${member}.poissonsRatio`} 
              component={FieldInput}
              type="text" 
              dontShowError='true' 
              className="form-group-div-input structure-form-input" 
              errorClassName="subgrade-table-error" 
              calculateValues={calculateValues}
              setNillCalculatorValues={setNillCalculatorValues}
              customInputWidth='100%'
               />
            </div>

            { isLimeOrCementNamePresent && fieldsthatContainLimeOrCemenet.indexOf(index) !== -1 &&  
            <div style={{width: "16%", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Field 
               name={`${member}.modulusOfRupture`} 
               component={FieldInput} 
               type="text" 
               dontShowError='true' 
               className="form-group-div-input structure-form-input" 
               errorClassName="subgrade-table-error" 
               calculateValues={calculateValues}
               setNillCalculatorValues={setNillCalculatorValues}
               spanValue={getUnits('psi', isUnitTypeMetric)} 
               customInputWidth='100%'
               />
            </div>}
          </div>

        )}  
      </div>
    )
    
  }
 
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    const BSTstructureSelector = formValueSelector(NEW_COMPOSITE_BST_STRUCTURE_FORM);
    const HMAstructureSelector = formValueSelector(NEW_COMPOSITE_HMA_STRUCTURE_FORM);      

    const BSTnewCompositeStructureNumberOfLayersDropdown = BSTstructureSelector(state, NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const HMAnewCompositeStructureNumberOfLayersDropdown = HMAstructureSelector(state, NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);

    const pavementStructureType =  state.currentProject.newCompositeFormValues.type;

    return {
        BSTnewCompositeStructureNumberOfLayersDropdown, HMAnewCompositeStructureNumberOfLayersDropdown, pavementStructureType,
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

NewCompositeOtherStructureFormTableArrayFields = connect(
    mapStateToProps, mapDispatchToProps
)(NewCompositeOtherStructureFormTableArrayFields);

export default NewCompositeOtherStructureFormTableArrayFields;

