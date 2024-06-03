import React , { Component } from 'react';
import { FieldInput, MrsgForm, HelpScreenTooltip, SmallHelpScreenConfig, HelpScreenTooltipSimple } from 'Components';
import { Field, reduxForm, formValueSelector, getFormSyncErrors, change, untouch, initialize, destroy, reset  } from 'redux-form';
import { calculateJoingCrackingAdjustmentFactor, calculateEffectiveThickness } from 'Actions';
import { setCurrentProjectUnitType, showPopup } from 'Actions';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { getUnits } from 'HelperFunctions/getUnits';
import  { validate, warn } from 'Validation/SubgradeFormValidation';
import { extend, compact, pluck, pick} from 'underscore';
import ReactTooltip from 'react-tooltip';
import { 
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  OVERLAY_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  OVERLAY_UA_MODULE,
  OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
  JOINT_CRACKING_TIME_TO_LIVE,
  JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR,
  EXISTING_THICKNESS, 
  EFFECTIVE_THICKNESS,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS,
  JC_ADJUSTMENT_FACTOR_HELP_SCREEN, 
  HELP_SCREEN_POPUP,
  METRIC
} from 'Constants';

const HELP_BONDED_OVERLAY_FORM_JC_ADJUSTMENT_FACTOR_TOOLTIP_ID = 'helpBondedOverlayFormJCAdjustmentFactorTooltipId';

class OverlayUnbondedExistingConcreteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

  calculateJointCrackingFactor() {
    const calculatorValues = pick(this.props, JOINT_CRACKING_TIME_TO_LIVE);
    extend(calculatorValues, {isBonded: false});

    if (this.props[EXISTING_THICKNESS]) {
      extend(calculatorValues, pick(this.props, EXISTING_THICKNESS));
      this.props.calculateJoingCrackingAdjustmentFactor(calculatorValues, false, true); 
    } else {
      this.props.calculateJoingCrackingAdjustmentFactor(calculatorValues, false, false); 
    }
  }

  calculateEffectiveThickness() {
    if ( !this.props[EXISTING_THICKNESS] || !this.props[JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR]) {
     return;
    }
    const calculatorValues = pick(this.props, EXISTING_THICKNESS, JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR);
    extend(calculatorValues, {isBonded: false});
    this.props.calculateEffectiveThickness(calculatorValues, false);
  }

  setJointAndCracksAdjustmentFactorNillCalculatorValues() {
    this.props.changeFieldValue(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR , ''); 
    this.props.changeFieldValue(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS , '');
  }

  setEffectiveThicknessNillCalculatorValues() {
    this.props.changeFieldValue(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM, EFFECTIVE_THICKNESS , '');  
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
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>EXISTING CONCRETE</div>
        <div style={{height: "100%", width: "100%"}}>
          <div style={{display: "flex", alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%', borderRight:  '1px solid'}}>
            <div style={{width: "100%"}}>
              <div className='form-group-div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                  <label style={{fontSize: 9}} >Thickness</label>
                  <Field className='form-group-div-input'
                         name={EXISTING_THICKNESS}
                         parentInputWidth='50%'
                         calculateValues={this.calculateEffectiveThickness.bind(this)}
                         setNillCalculatorValues={this.setEffectiveThicknessNillCalculatorValues.bind(this)}
                         type="text" 
                         spanValue={getUnits('in', this.props.unitType === METRIC)}
                         component={FieldInput} />
                </div>
              </div>
              <div className='form-group-div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%'}}>
                                <HelpScreenTooltip id={HELP_BONDED_OVERLAY_FORM_JC_ADJUSTMENT_FACTOR_TOOLTIP_ID} helpScreenType={JC_ADJUSTMENT_FACTOR_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[JC_ADJUSTMENT_FACTOR_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[JC_ADJUSTMENT_FACTOR_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                                <label style={{ fontSize: 9 }}>Unrepaired Deteriorated Joints, Cracks and Other</label>
                                <Field className='form-group-div-input'
                                       name={JOINT_CRACKING_TIME_TO_LIVE}
                                       calculateValues={this.calculateJointCrackingFactor.bind(this)}
                                       setNillCalculatorValues={this.setJointAndCracksAdjustmentFactorNillCalculatorValues.bind(this)}
                                       type="text" 
                                       spanValue={getUnits("#/mile", this.props.unitType === METRIC)}
                                       component={FieldInput}
                                       showHelpTooltip={this.props.isHelp}
                                       helptooltipId={HELP_BONDED_OVERLAY_FORM_JC_ADJUSTMENT_FACTOR_TOOLTIP_ID} />
                </div>
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%'}}>
                  <label style={{fontSize: 9}}>Joints/Cracks Adjustment Factor</label>
                  <Field name={JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR} component={FieldInput} type="text" className='form-group-div-input' readOnly={true} type="text" isCalculatedOutput={true} />
                </div>
              </div>
              <div className='form-group-div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                  <label style={{fontSize: 9}}>Effective Thickness</label>
                  <Field name={EFFECTIVE_THICKNESS}
                         component={FieldInput}
                         type="text"
                         className='form-group-div-input'
                         parentInputWidth='50%'
                         readOnly={true}
                         type="text"
                         isCalculatedOutput={true} 
                         spanValue={getUnits("in", this.props.unitType === METRIC)} />
                </div>
              </div>
            </div>
            <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: '50%', width: '100%'}}>
            <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>SUBGRADE</div>
             <div style={{height: "100%", width: "100%"}}>
               <MrsgForm kvalueOutputForm={OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM} mrsgOutputForm={OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM} module={OVERLAY_UA_MODULE} height='100%' {...this.props} />
               <ReactTooltip id={SUBGRADE_DROPDOWN} multiline={true} place="right" type='warning' effect="solid"/> 
              <ReactTooltip id='mrsgInput' multiline={true} place="right" type='warning' effect="solid"/> 
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OverlayUnbondedExistingConcreteForm = reduxForm({
  form: OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE
  }
})(OverlayUnbondedExistingConcreteForm);

function mapStateToProps(state) {
    const subgradeSelector                = formValueSelector(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM);
    const structureSelector               = formValueSelector(OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM);
    const californiaBearingRatio          = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const resistanceValue                 = subgradeSelector(state, RESISTANCE_VALUE);
    const subgradeDropdown                = subgradeSelector(state, SUBGRADE_DROPDOWN);
    const structureLayerMembers           = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity             = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness                  = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const calculatedMrsgValue             = subgradeSelector(state, CALCULATED_MRSG_VALUE);
    const inputMrsgValue                  = subgradeSelector(state, INPUT_MRSG_VALUE);
    const trafficFormSelector             = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const trafficFormInputDropdown        = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const showEditAnalysisButton          = state.currentProject.overlayFormValues.showEditAnalysisButton;
    const asphaltAnalysisConceteMrsgValue = state.currentProject.overlayFormValues.mrsgInputValue;
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const subgradeFormErrors              = getFormSyncErrors(OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM)(state);
    const structureFormErrors             = getFormSyncErrors(OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM)(state);
    const jointCrackingTimeToLive         = subgradeSelector(state, JOINT_CRACKING_TIME_TO_LIVE);
    const jointCrackingAdjustmentFactor   = subgradeSelector(state, JOINTS_AND_CRACKS_ADJUSTMENT_FACTOR);
    const existingThickness               = subgradeSelector(state, EXISTING_THICKNESS);

//    const unitType = state.currentProject.projectDetails.unitType;

    return {
        californiaBearingRatio,
        resistanceValue,
        modulusOfElasticity,
        layerThickness,
        subgradeDropdown,
        calculatedMrsgValue,
        trafficFormInputDropdown,showEditAnalysisButton,
        asphaltAnalysisConceteMrsgValue,
        inputMrsgValue,
        structureNumberOfLayersDropdown,
        structureLayerMembers,
        subgradeFormErrors,
        structureFormErrors,
        jointCrackingTimeToLive,
        existingThickness,
        jointCrackingAdjustmentFactor,
//        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        calculateJoingCrackingAdjustmentFactor: (jointCrackingTimeToLive, isBonded, shouldCalculateExistingThicknessToo) => {
            dispatch(calculateJoingCrackingAdjustmentFactor(jointCrackingTimeToLive, isBonded, shouldCalculateExistingThicknessToo));
        },
        calculateEffectiveThickness: (values, isBonded) => {
            dispatch(calculateEffectiveThickness(values, isBonded));
        },
        changeFieldValue: (form, field, value) => {
            dispatch(change(form, field, value));
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

OverlayUnbondedExistingConcreteForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayUnbondedExistingConcreteForm)

export default OverlayUnbondedExistingConcreteForm;
