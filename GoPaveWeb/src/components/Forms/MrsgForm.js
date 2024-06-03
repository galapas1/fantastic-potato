import React , { Component } from 'react';
import { FieldInput, Dropdown, HelpScreenTooltip, SmallHelpScreenConfig } from 'Components';
import './Forms.scss';
import { Field, change, untouch, reset } from 'redux-form';
import { connect } from 'react-redux';
import { pick, extend, debounce, isEqual, isUndefined} from 'underscore';
import { setCurrentProjectUnitType,
         calculateMSRGValue, calculateCompositeKValueOfSubstructure, showPopup } from 'Actions';
import { getUnits } from 'HelperFunctions/getUnits';
import ReactTooltip from 'react-tooltip';
import {
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS,
  METRIC,
  CALC_MRSG_HELP_SCREEN,
  MRSG_HELP_SCREEN,
  CBR_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from  'Constants';
const CBR_VALUE = "CBR"
const R_VALUE = "R-Value"

const subGradeValues = [{
  name: DROPDOWN_KNOWN_MSRG_VALUE
}, {
  name: CBR_VALUE,
  subName: "(California Bearing Ratio)"
}, {
  name: R_VALUE,
  subName: "(Resistance Value)"
  }
]

const backendTypes = {
  californiaBearingRatio: "ConvertCBR",
  resistanceValue: "ConvertRValue"
}

// Help screens 
const HELP_MRSG_FORM_CALC_MRSG_TOOLTIP_ID = 'helpMRSGFormCalcMRSGTooltipId';
const HELP_MRSG_FORM_MRSG_TOOLTIP_ID = 'helpMRSGFormMRSGTooltipId';
const HELP_MRSG_FORM_CBR_TOOLTIP_ID = 'helpMRSGFormCBRTooltipId';

class MrsgForm extends Component {

  componentWillMount() {
   this.delayedCallback = debounce(function (cb) {
      cb();   
   }, 1000);
    }


  // FieldInput sets the first parameter errorPresent. onlyStructureFormChanged is a parameter only set in this file
  setNillCalculatorValues(errorPresent, onlyStructureFormChanged) {
    this.props.changeFieldValue(this.props.kvalueOutputForm, COMPOSITE_K_VALUE_SUBSTRUCTURE, '');  
    
    if (!onlyStructureFormChanged && (this.props.subgradeDropdown === CBR_VALUE || this.props.subgradeDropdown === R_VALUE)) {
      this.props.changeFieldValue(this.props.mrsgOutputForm, CALCULATED_MRSG_VALUE, '');
    }
  }

  untouchAndSetCalculatedValueToNil(props, field, isChangeCalculatedValue) {
    props.untouch(this.props.mrsgOutputForm, field, '');
    props.changeFieldValue(this.props.mrsgOutputForm, field, '');
    if (isChangeCalculatedValue) {
      props.changeFieldValue(this.props.mrsgOutputForm, CALCULATED_MRSG_VALUE, '');    
    } 
    // When dropdown value changes, COMPOSITE_K_VALUE from concrete form resets to null, because it depends on MRSG value
    props.changeFieldValue(this.props.kvalueOutputForm ,COMPOSITE_K_VALUE_SUBSTRUCTURE, '' );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subgradeDropdown !== this.props.subgradeDropdown) {
      if (nextProps.subgradeDropdown === CBR_VALUE ) {
         this.untouchAndSetCalculatedValueToNil(nextProps, CALIFORNIA_BEARING_RATIO, true)
      } else if (nextProps.subgradeDropdown === R_VALUE) {
         this.untouchAndSetCalculatedValueToNil(nextProps, RESISTANCE_VALUE, true)
         // Dont set value to nil if Asphalt Analysis Form is selected
      } else if (nextProps.subgradeDropdown === DROPDOWN_KNOWN_MSRG_VALUE &&  nextProps.trafficFormInputDropdown !== TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
        this.untouchAndSetCalculatedValueToNil(nextProps, INPUT_MRSG_VALUE);
      }
    }

    // Changing Structure Form should trigger calculator
    if (nextProps.structureNumberOfLayersDropdown !== this.props.structureNumberOfLayersDropdown) {
      const onlyStructureChange = true;
      this.setNillCalculatorValues(null, onlyStructureChange);
      this.delayedCallback(this.calculateValues.bind(this, onlyStructureChange));
    }
    // Need to do a deep comparison of the objects and trigger calcualtor if values change
    if (!isEqual(nextProps[STRUCTURE_LAYER_MEMBERS], this.props[STRUCTURE_LAYER_MEMBERS])) {
      const onlyStructureChange = true;
      this.delayedCallback(this.calculateValues.bind(this, onlyStructureChange));
    }

    //If subgrade resilient modulus is updated in AA form, then compoiste -  calculator needs to run
     if (nextProps[INPUT_MRSG_VALUE] !== this.props[INPUT_MRSG_VALUE] && nextProps.trafficFormInputDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
      this.delayedCallback(this.calculateValues.bind(this));
     }
   }

   // Usually called from inputs after a debounce delay. This delay lets the state to update which allows for errors to show up and dissapear. 
   // If this is called form somewhere else, a delaye (not necessarily a debounce delay) needs to be provided to allow the redux state to upate
   // before calculators are run
   // Need the parameter onlyStructureFormChanged because  this component runs the calcualtors for both Structure and Subgrade Form. 
   // If only the structure form is changed, then this method needs to know that so that it can not run some calcualations
   // For example, if structure form table layers has been changed, but all table layers have not been filled out, then MRSSG only calculator should not re run
  calculateValues(onlyStructureFormChanged) {
    let mrsg;
    const { modulusOfElasticity, layerThickness, structureLayerMembers, subgradeDropdown, unitType } = this.props;

    let structureNumberOfLayersDropdown = structureLayerMembers ? structureLayerMembers.length : 1;
    let structureValues;
    let calculatorParams= {};

    if (unitType === METRIC) {
      extend(calculatorParams, {convertToMetric: true});
    }

    if (subgradeDropdown === DROPDOWN_KNOWN_MSRG_VALUE) {
      if (this.props.subgradeFormErrors && this.props.subgradeFormErrors[INPUT_MRSG_VALUE]) {
        return;
      }
      mrsg = this.props[INPUT_MRSG_VALUE];
      if (!mrsg) {
        return;
      }

      let mrsgObject = {mrsgValue: mrsg};
      extend(calculatorParams,structureValues, mrsgObject);
      if (structureNumberOfLayersDropdown === 0) {
        structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
        extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
        extend(calculatorParams,structureValues, mrsgObject);
        this.props.calculateCompositeKValueOfSubstructure(calculatorParams, this.props.kvalueOutputForm);
        return;
      }

      if (!(this.props.structureFormErrors &&
            this.props.structureFormErrors[STRUCTURE_LAYER_MEMBERS]) &&
            modulusOfElasticity.length === structureNumberOfLayersDropdown &&
            layerThickness.length === structureNumberOfLayersDropdown) {

        structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
        extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
        extend(calculatorParams,structureValues, mrsgObject);
        this.props.calculateCompositeKValueOfSubstructure(calculatorParams, this.props.kvalueOutputForm);
        return;
      }

    } else {
      let inputProperty;
      let inputValue;
      let inputName;
      if (subgradeDropdown === CBR_VALUE) {
        inputProperty = pick(this.props, CALIFORNIA_BEARING_RATIO);
        inputValue = this.props[CALIFORNIA_BEARING_RATIO];
        inputName = CALIFORNIA_BEARING_RATIO;
        calculatorParams["mrsgType"] = backendTypes[CALIFORNIA_BEARING_RATIO];
        
      } else {
        inputProperty = pick(this.props, RESISTANCE_VALUE);
        inputValue = this.props[RESISTANCE_VALUE];
        inputName = RESISTANCE_VALUE;
        calculatorParams["mrsgType"] = backendTypes[RESISTANCE_VALUE];
      }

      if (this.props.subgradeFormErrors && this.props.subgradeFormErrors[inputName]) {
        return;
      }

      if (isUndefined(inputValue) || isNaN(inputValue)) {
        return;
      }

      extend(calculatorParams, inputProperty);
      // If strutcure is present, then run combined calcualtor. If no strucure is present then run onlyMRsg calculator
      if (structureNumberOfLayersDropdown === 0) {
          structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
          extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
          extend(calculatorParams,structureValues);
          this.props.calculateMSRGValue(calculatorParams, true, this.props.kvalueOutputForm, this.props.mrsgOutputForm);
          return;
      } else if (!(this.props.structureFormErrors && this.props.structureFormErrors[STRUCTURE_LAYER_MEMBERS]) && modulusOfElasticity.length === structureNumberOfLayersDropdown && layerThickness.length === structureNumberOfLayersDropdown) {
        structureValues = pick(this.props, MODULUS_OF_ELASTICITY, LAYER_THICKNESS);
        extend(structureValues, {numberOfSubLayers: structureNumberOfLayersDropdown});
        extend(calculatorParams,structureValues);
        this.props.calculateMSRGValue(calculatorParams, true, this.props.kvalueOutputForm, this.props.mrsgOutputForm);
        return;  
      }

      // 2 conditions for running mrsOnly input Calculator
      // 1) - Structure values are not present 2) User has to input MRSG value
      // Condition under which to not run calculator - If only structure values were changed
      // If structure is not present or is not valid, then run MRSG only calculator
      if (onlyStructureFormChanged) {
        return;
      }
      this.props.calculateMSRGValue(calculatorParams, false, this.props.kvalueOutputForm, this.props.mrsgOutputForm);
    }

  }

  renderInputs() {

    if (this.props[SUBGRADE_DROPDOWN] === DROPDOWN_KNOWN_MSRG_VALUE) {
      const isDisabled = this.props.trafficFormInputDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && this.props.showEditAnalysisButton;
      return (
          <div className="form-group-div">
          <HelpScreenTooltip id={HELP_MRSG_FORM_MRSG_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={MRSG_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[MRSG_HELP_SCREEN]['title']} showPopup={this.props.showPopup} secondParagraph={SmallHelpScreenConfig[MRSG_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[MRSG_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
          <label  style={{fontWeight: "bold"}} className='form-label'>MRSG Value</label>        
          <Field name={INPUT_MRSG_VALUE} component={FieldInput} tooltipId='mrsgInput' showTooltip={isDisabled} toolTipMessage='You can set MRSG value <br /> in the Asphalt Design form' isFieldDisabled={isDisabled} type="text" className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this, INPUT_MRSG_VALUE)} spanValue={getUnits('psi', this.props.unitType === METRIC)} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_MRSG_FORM_MRSG_TOOLTIP_ID} />
        </div>
      );
    } else if (this.props[SUBGRADE_DROPDOWN] === CBR_VALUE) {
        return (
            <div className='form-group-div-parent' style={{ width: '100%' }}>
                <div className='form-group-div'>
              <HelpScreenTooltip id={HELP_MRSG_FORM_CBR_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={CBR_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[CBR_HELP_SCREEN]['title']} showPopup={this.props.showPopup} secondParagraph={SmallHelpScreenConfig[CBR_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[CBR_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

          <label  style={{fontWeight: "bold", textTransform: "uppercase"}} className='form-label'>CBR Value</label>
          <Field name={CALIFORNIA_BEARING_RATIO} component={FieldInput} type='text' className='form-group-div-input' calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="%" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_MRSG_FORM_CBR_TOOLTIP_ID} />
                </div>
          <div className="form-group-div">
            <label  style={{fontWeight: "bold"}} className="form-label">Calculated MRSG Value</label>
          
                      <Field name={CALCULATED_MRSG_VALUE} component={FieldInput} type="text" className='form-group-div-input' readOnly={true} type="text" isCalculatedOutput={true} spanValue={getUnits('psi', this.props.unitType === METRIC)} customInputWidth='75%' />
            
          </div>
        </div>
      );
    } else if (this.props[SUBGRADE_DROPDOWN] === R_VALUE) {
        return (
            <div className='form-group-div-parent' style={{ width: '100%' }}>
                <div className='form-group-div'>
          <label style={{fontWeight: "bold", textTransform: "uppercase"}} className='form-label'>R Value</label>
           <Field name={RESISTANCE_VALUE} component={FieldInput} type='text' className='form-group-div-input' setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} calculateValues={this.calculateValues.bind(this)} />
                </div>
           <div className="form-group-div">
           <label style={{ fontWeight: "bold" }} className="form-label">Calculated MRSG Value</label>
          
                      <Field name={CALCULATED_MRSG_VALUE} component={FieldInput} type="text" className='form-group-div-input' isCalculatedOutput={true} spanValue={getUnits('psi', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} />
         
          </div>
        </div>
      );
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
    const isDisabled = this.props.trafficFormInputDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && this.props.showEditAnalysisButton;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="form-group-div">
                <div style={{ display: "flex" }}>
                    <HelpScreenTooltip id={HELP_MRSG_FORM_CALC_MRSG_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={CALC_MRSG_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[CALC_MRSG_HELP_SCREEN]['title']} showPopup={this.props.showPopup} secondParagraph={SmallHelpScreenConfig[CALC_MRSG_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[CALC_MRSG_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
                    <Field name={SUBGRADE_DROPDOWN} component={Dropdown} list={subGradeValues} defaultValue={{ name: DROPDOWN_KNOWN_MSRG_VALUE }} tooltipId='subgradeDropdown' showTooltip={isDisabled} toolTipMessage='You can set MRSG value <br /> in the Asphalt Design form' isFieldDisabled={this.props.trafficFormInputDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && this.props.showEditAnalysisButton} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_MRSG_FORM_CALC_MRSG_TOOLTIP_ID} style={{zIndex: 1000}}/>
           </div>
         </div>
          {this.renderInputs()}
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
    calculateMSRGValue: (valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm) => {
      dispatch(calculateMSRGValue(valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm));
      },
    showPopup: (popup, popupDetails) => {
        dispatch(showPopup(popup, popupDetails));
    },
    destroyForm: (form) => {
        dispatch(destroy(form));
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    untouch: (form, field, value) => {
      dispatch(untouch(form, field, value));
    },
    calculateCompositeKValueOfSubstructure: (valueObject, kvalueOutputForm) => {
      dispatch(calculateCompositeKValueOfSubstructure(valueObject, kvalueOutputForm));
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    },
  };
}

MrsgForm = connect(mapStateToProps, mapDispatchToProps)(MrsgForm)

export default MrsgForm;
