import React , { Component } from 'react';
import { FieldInput, Dropdown, HelpScreenTooltip, SmallHelpScreenConfig } from 'Components';
import { Field, change, untouch, reset } from 'redux-form';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType, showPopup } from 'Actions';
import ReactTooltip from 'react-tooltip';
import { getUnits } from 'HelperFunctions/getUnits';
import './Forms.scss';
import {
    LAYER_MODULUS_HELP_SCREEN,
    LAYER_THICKNESS_HELP_SCREEN,
    HELP_SCREEN_POPUP
} from 'Constants';
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
  STRUCTURE_LAYER_MEMBERS,
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
} from 'Data/appValues';

const HELP_STRUCTURE_FORM_MODULUS_TOOLTIP_ID = 'helpStructureFormModulusTooltipId';
const HELP_STRUCTURE_FORM_THICKNESS_TOOLTIP_ID = 'helpStructureFormThicknessTooltipId';

class StructureFormTableArrayFields extends Component {


    componentDidUpdate() {
        ReactTooltip.rebuild();
    }
  
  setParentDropdownValue(index, isUnitTypeMetric, name) {
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
    const { setArrayFieldValueOnDropdownValueChange } = this.props;
    if (name === CEMENT_TREATED_BASE) {
       setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, cementTreatedBaseValue);
    } else if (name === ROLLER_COMPACTED_BASE) {
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, rccBaseValue);
    }
    else if (name === FULL_DEPTH_RECLAMATION) {
        setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, fulldepthreclamationValue);
    }
    else if (name === LEAN_CONCRETE_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`,leanConcreteBaseValue);
    } else if (name === HOTMIX_WARMMIX_ASPHALT_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, hotMixOrWarmMixAsphaltBaseValue);
    } else if (name === BITUMINOUS_STABILIZED_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, bituminousStabilizedBaseValue);
    } else if (name === CEMENT_MODIFIED_SUBGRADE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, cementModifiedSubgradeBaseValue);
    } else if (name === LIME_MODIFIED_SUBGRADE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, limeModificedSubgradeBaseValue);
    } else if (name === GRANULAR_BASE) {
      setArrayFieldValueOnDropdownValueChange(`structureLayerMembers[${index}][modulusOfElasticity]`, granularBaseValue);
    }
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      if (this.props.unitType !== unitType) {
          setCurrentProjectUnitType(unitType);
      }
      return true;
  }

  render() {
    const { calculateValues, zIndexValues, informParentComponentDidUpdate, setNillCalculatorValues, dropdownLayerInitialValues, structureTableLayerValues, compositeJpcpLimitedStructureTableLayerValues, isUnitTypeMetric } = this.props;
    return (
      <div style={{width: '100%'}}>
        {this.props.fields.map((member, index) => {
          let dropdownLayerInitialValueObject;
          let isDisabled;
          let hideIcon;
          let defaultValue;
          let initialDropdownStyle;
          if (dropdownLayerInitialValues) {
            dropdownLayerInitialValueObject = dropdownLayerInitialValues[index];
            if (dropdownLayerInitialValueObject) {
              isDisabled = dropdownLayerInitialValueObject['isDisabled'];
              hideIcon = dropdownLayerInitialValueObject['hideIcon'];
              defaultValue = dropdownLayerInitialValueObject['defaultValue'];  
              initialDropdownStyle=dropdownLayerInitialValueObject['initialDropdownStyle']
            }
          }
          return (
              <div key={index} style={{marginBottom: 3,  paddingRight: 5, backgroundColor: "gray", display: "flex", height: 49, position: "relative", zIndex: zIndexValues[index], width: "inherit", }}>
              <div style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_STRUCTURE_FORM_MODULUS_TOOLTIP_ID} helpScreenType={LAYER_MODULUS_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[LAYER_MODULUS_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[LAYER_MODULUS_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />


                      <Field component={Dropdown} name={`${member}.structureLayerTypeDropdown`} setParentDropdownValue={this.setParentDropdownValue.bind(this, index, isUnitTypeMetric)} list={(index === 0 && compositeJpcpLimitedStructureTableLayerValues) ? compositeJpcpLimitedStructureTableLayerValues : structureTableLayerValues} isFieldDisabled={isDisabled} defaultValue={defaultValue ? defaultValue : { name: "Choose Layer" }} initialDropdownStyle={initialDropdownStyle} hideDropdownIcon={hideIcon} />
              </div>
              <div style={{width: "30%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 4}}>
                      <HelpScreenTooltip id={HELP_STRUCTURE_FORM_MODULUS_TOOLTIP_ID} helpScreenType={LAYER_MODULUS_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[LAYER_MODULUS_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[LAYER_MODULUS_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

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
                showHelpTooltip={this.props.isHelp} helptooltipId={HELP_STRUCTURE_FORM_MODULUS_TOOLTIP_ID}
                customInputWidth='100%'
                 />
              </div>
              <div style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_STRUCTURE_FORM_THICKNESS_TOOLTIP_ID} helpScreenType={LAYER_THICKNESS_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[LAYER_THICKNESS_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[LAYER_THICKNESS_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

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
                 showHelpTooltip={this.props.isHelp} helptooltipId={HELP_STRUCTURE_FORM_THICKNESS_TOOLTIP_ID}
                 customInputWidth='100%' />
              </div>
          </div>
          )
        }
          
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
        untouch: (form, field, value) => {
            dispatch(untouch(form, field, value));
        },
        showPopup: (popup, popupDetails) => {
            dispatch(showPopup(popup, popupDetails));
        },
        destroyForm: (form) => {
            dispatch(destroy(form));
        },
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
    };
}

StructureFormTableArrayFields = connect(
    mapStateToProps, mapDispatchToProps
)(StructureFormTableArrayFields)

export default StructureFormTableArrayFields;

