import React , { Component } from 'react';
import { FieldInput, Dropdown, HelpScreenTooltip, SmallHelpScreenConfig, HelpScreenTooltipSimple } from 'Components';
import { Field, change, untouch, reset } from 'redux-form';
import { connect } from 'react-redux';
import { pick, extend } from 'underscore';
import { setCurrentProjectUnitType,
         calculateFlexuralStrength, showPopup } from 'Actions';
import { getUnits } from 'HelperFunctions/getUnits';
import ReactTooltip from 'react-tooltip';
import './Forms.scss';
import { 
  COMPRESSIVE_STREGTH,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC,
  CALC_FLEX_HELP_SCREEN,
  FLEX_STRENGTH_HELP_SCREEN,
  ELASTICITY_HELP_SCREEN,
  COMPRESSIVE_HELP_SCREEN,
  TENSILE_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from  'Constants';

const concreteValues = [{name: '28-Day Flex Strength'}, {name: 'Compressive Strength'}, {name: 'Modulus of Elasticity'}, {name: 'Split Tensile Strength'}];

const backendTypes = {
  compressiveStrength: 'CompressiveStrength',
  splitTensileStrength: 'SplitTensileStrength',
  modulusOfElasticity: 'ModulusOfElasticity'
}

const HELP_FLEX_FORM_CALC_FLEX_TOOLTIP_ID = 'helpFlexFormCalcFlexTooltipId';
const HELP_FLEX_FORM_FLEX_STRENGTH_TOOLTIP_ID = 'helpFlexFormFlexStrengthTooltipId';
const HELP_FLEX_FORM_ELASTICITY_TOOLTIP_ID = 'helpFlexFormFlexElasticityTooltipId';
const HELP_FLEX_FORM_COMPRESSIVE_TOOLTIP_ID = 'helpFlexFormFlexCompressiveTooltipId';
const HELP_FLEX_FORM_TENSILE_TOOLTIP_ID = 'helpFlexFormFlexTensileTooltipId';

class FlexuralOutputForm extends Component {

   componentDidUpdate() {
        ReactTooltip.rebuild();
    }

  setNillCalculatorValues(errorPresent, didModulusInputChange) {
    if  (didModulusInputChange) {
       if (this.props.concreteDropdown === 'Modulus of Elasticity') {
         this.props.changeFieldValue(this.props.flexStrengthOutputForm, CALCULATED_FLEXURAL_STRENGTH, '');
       }
       return;
    } else {
      this.props.changeFieldValue(this.props.flexStrengthOutputForm, CALCULATED_FLEXURAL_STRENGTH, '');
    }
  }

  calculateValues(propValues, didModulusInputChange) {
    let calculatorParams = {};
    let props;

    if (propValues) {
      props = propValues;
    } else {
      props = this.props;
    }

    if (props.unitType === METRIC) {
      extend(calculatorParams, {convertToMetric: true});
    }

    let inputName;
    const { concreteDropdown} = props;

    if (concreteDropdown === 'Compressive Strength') {
      if (didModulusInputChange) {
        return;
      }
      inputName = COMPRESSIVE_STREGTH;
    } else if (concreteDropdown === 'Split Tensile Strength') {
        if (didModulusInputChange) {
          return;
        }
      inputName = SPLIT_TESILE_STRENGTH;
    } else if  (concreteDropdown === 'Modulus of Elasticity') {
      inputName = CONCRETE_MODULUS_OF_ELASTICITY;
    }
    calculatorParams['strengthType'] = backendTypes[inputName];
    let subGradeValue = pick(props, inputName);

    extend(calculatorParams, subGradeValue);
    this.props.calculateFlexuralStrength(calculatorParams, this.props.flexStrengthOutputForm);
  }

  untouchAndSetCalculatedValueToNil(props, field, isChangeCalculatedValue) {
    props.untouch(this.props.flexStrengthOutputForm, field, '');
    props.changeFieldValue(this.props.flexStrengthOutputForm, field, ''); 
    if (isChangeCalculatedValue) {
      props.changeFieldValue(this.props.flexStrengthOutputForm, CALCULATED_FLEXURAL_STRENGTH, '');  
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.concreteDropdown !== this.props.concreteDropdown ) {
      if (nextProps.concreteDropdown === 'Compressive Strength' ) {
         this.untouchAndSetCalculatedValueToNil(nextProps, COMPRESSIVE_STREGTH, true)
      } else if (nextProps.concreteDropdown === 'Modulus of Elasticity') {
        this.calculateValues(nextProps);
      } else if (nextProps.concreteDropdown === 'Split Tensile Strength') {
        this.untouchAndSetCalculatedValueToNil(nextProps, SPLIT_TESILE_STRENGTH, true);
      } else if (nextProps.concreteDropdown === '28-Day Flex Strength') {
        this.untouchAndSetCalculatedValueToNil(nextProps, TWENTYEIGHTDAY_FLEX_STRENGTH, false);
      } 
    }    
  }

  renderInput() {

    if (this.props.concreteDropdown === '28-Day Flex Strength' ) {
      return(
        <div className='form-group-div-parent' style={{width: '100%'}}>
          <div className='form-group-div'>
                  <HelpScreenTooltip id={HELP_FLEX_FORM_FLEX_STRENGTH_TOOLTIP_ID} helpScreenType={FLEX_STRENGTH_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[FLEX_STRENGTH_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[FLEX_STRENGTH_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                  <label style={{ fontWeight: 'bold' }} className='form-label'>3rd Point Loading 28-Day Flex Strength</label>
                  <Field className='form-group-div-input' name={TWENTYEIGHTDAY_FLEX_STRENGTH} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} style={{ borderRight: 0 }} type='text' spanValue={getUnits('psi', this.props.unitType === METRIC)} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_FLEX_FORM_FLEX_STRENGTH_TOOLTIP_ID} />
          </div>
          {this.renderModulusOfElasticityInput()}
        </div>
      )
    } else if (this.props.concreteDropdown === 'Compressive Strength' ) {
      return (
        <div className='form-group-div-parent' style={{width: '100%'}}>
              <div className='form-group-div'>
                  <HelpScreenTooltipSimple id={HELP_FLEX_FORM_COMPRESSIVE_TOOLTIP_ID} helpScreenType={COMPRESSIVE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[COMPRESSIVE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[COMPRESSIVE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

            <label  style={{fontWeight: 'bold'}} className='form-label'>Compressive Strength</label>
            <Field className='form-group-div-input' calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} name={COMPRESSIVE_STREGTH} type='text' spanValue={getUnits('psi', this.props.unitType === METRIC)} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_FLEX_FORM_COMPRESSIVE_TOOLTIP_ID}  />
          </div> 
          {this.renderModulusOfElasticityInput()}
          {this.renderCalculatedFlexOutput()}
        </div>
      )
    } else if (this.props.concreteDropdown === 'Split Tensile Strength' ) {
      return (
        <div className='form-group-div-parent' style={{width: '100%'}}>
              <div className='form-group-div'>
                  <HelpScreenTooltipSimple id={HELP_FLEX_FORM_TENSILE_TOOLTIP_ID} helpScreenType={TENSILE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TENSILE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TENSILE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

            <label  style={{fontWeight: 'bold'}} className='form-label'>Split Tensile Strength</label>
            <Field className='form-group-div-input' calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} name={SPLIT_TESILE_STRENGTH} type='text' spanValue={getUnits('psi', this.props.unitType === METRIC)} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_FLEX_FORM_TENSILE_TOOLTIP_ID} />
          </div>
          {this.renderModulusOfElasticityInput()}
          {this.renderCalculatedFlexOutput()}
        </div>
      )
    } else if (this.props.concreteDropdown === 'Modulus of Elasticity') {
      return (
        <div className='form-group-div-parent' style={{width: '100%'}}>
          {this.renderModulusOfElasticityInput()} 
          {this.renderCalculatedFlexOutput()}
        </div>
      )
    }
   }

  renderCalculatedFlexOutput() {
    return (
      <div className='form-group-div'>
        <label  style={{fontWeight: 'bold'}} className='form-label'>Calculated Flexural Strength</label>
        <div style={{display: 'flex', alignItems: 'center', width: 'inherit'}}>
          <Field className='form-group-div-input' name={CALCULATED_FLEXURAL_STRENGTH} readOnly={true} type='text' component={FieldInput} isCalculatedOutput={true} spanValue={getUnits('psi', this.props.unitType === METRIC)} customInputWidth='75%'/>
        </div>
      </div>
    );
   }

   renderModulusOfElasticityInput() {
      return (
        <div className='form-group-div'>
              <HelpScreenTooltip id={HELP_FLEX_FORM_ELASTICITY_TOOLTIP_ID} helpScreenType={ELASTICITY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[ELASTICITY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[ELASTICITY_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

              <label style={{ fontWeight: 'bold' }} className='form-label'>Modulus of Elasticity</label>
              <Field className='form-group-div-input' calculateValues={this.calculateValues.bind(this, null, true)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this, true)} name={CONCRETE_MODULUS_OF_ELASTICITY} type='text' spanValue={getUnits('psi', this.props.unitType === METRIC)} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_FLEX_FORM_ELASTICITY_TOOLTIP_ID} />
        </div>
    );
   }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      if (this.props.unitType !== unitType) {
          setCurrentProjectUnitType(unitType);
      }
      return true;
  }

  render() {
    return (
         <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className='form-group-div'>
                <HelpScreenTooltipSimple id={HELP_FLEX_FORM_CALC_FLEX_TOOLTIP_ID} helpScreenType={CALC_FLEX_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[CALC_FLEX_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[CALC_FLEX_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

           <div style={{display: 'flex'}}>
                    <Field list={concreteValues} name={CONCRETE_DROPDOWN} component={Dropdown} defaultValue={{ name: '28-Day Flex Strength' }} style={{ zIndex: 100 }} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_FLEX_FORM_CALC_FLEX_TOOLTIP_ID} />
          </div>
          </div>
          {this.renderInput()}
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
    calculateFlexuralStrength: (valueObject, flexStrengthOutputForm) => {
      dispatch(calculateFlexuralStrength(valueObject, flexStrengthOutputForm));
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
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

FlexuralOutputForm = connect(
    mapStateToProps, mapDispatchToProps        
)(FlexuralOutputForm)

export default FlexuralOutputForm;
