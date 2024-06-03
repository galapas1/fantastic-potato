import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldInput, ToggleButton, FlexuralOutputForm, HelpScreenTooltip, SmallHelpScreenConfig, HelpScreenTooltipSimple } from 'Components';
import { Field, reduxForm, formValueSelector, change, untouch, initialize, destroy } from 'redux-form';
import { showPopup } from 'Actions';
import '../../../../components/Forms/Forms.scss';
import ReactTooltip from 'react-tooltip';
import { pick, extend } from 'underscore';
import  { validate, warn } from 'Validation/ConcreteFormValidation';
import {
  CONCRETE_CONCRETE_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  LOAD_TRANSFER_COEFFICIENT,
  DRAINAGE_COEFFICIENT,
  INIITAL_SERVICABILITY,
  TERMINAL_SERVICABILITY,
  CONCRETE_MODULUS_OF_ELASTICITY,
  CONCRETE_MODULE,
  MACROFIBRES_IN_CONCRETE,
  EDGE_SUPPORT,
  RESIDUAL_STRENGTH,
  RCC,
  JPCP,
  CRCP,
  FIBERS_HELP_SCREEN,
  EDGE_SUPPORT_HELP_SCREEN,
  LOAD_TRANSFER_HELP_SCREEN,
  LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN,
  DRAINAGE_COEFFICIENT_HELP_SCREEN,
  INITIAL_SERVICEABILITY_HELP_SCREEN,
  TERMINAL_SERVICEABILITY_HELP_SCREEN,
  HELP_SCREEN_POPUP,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from 'Constants';

const HELP_CONCRETE_FORM_FIBERS_TOOLTIP_ID = 'helpConcreteFormFibersTooltipId';
const HELP_CONCRETE_FORM_EDGE_SUPPORT_TOOLTIP_ID = 'helpConcreteFormEdgeSupportTooltipId';

const HELP_CONCRETE_FORM_DRAINAGE_COEFFICIENT_TOOLTIP_ID = 'helpConcreteFormDrainageCoefficientTooltipId';
const HELP_CONCRETE_FORM_LOAD_TRANSFER_COEFFICIENT_TOOLTIP_ID = 'helpConcreteFormLoadTransferTooltipId';
const HELP_CONCRETE_FORM_INITIAL_SERVICEABILITY_TOOLTIP_ID = 'helpConcreteFormInitialServiceabilityTooltipId';
const HELP_CONCRETE_FORM_TERMINAL_SERVICEABILITY_TOOLTIP_ID = 'helpConcreteFormTerminalServiceabilityTooltipId';

class ConcreteConcreteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    } 

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

  setParentValue(value) {
    let loadTranferValue;
    if (value === 'Yes') {
      loadTranferValue = 2.5;
    } else if (value === 'No') {
      loadTranferValue = 2.9;
    }
    this.props.changeFieldValue(CONCRETE_CONCRETE_FORM, LOAD_TRANSFER_COEFFICIENT, loadTranferValue)
  }

  renderCRCPinputs() {

    if (this.props.params.type === 'CRCP') {
      return (
         <div  className="form-group-div"  style={{width: '85%', marginTop: 10}}>
            <div style={{display: "flex", alignItems: "center", marginBottom: 10, justifyContent: "space-between", width: "100%"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_LOAD_TRANSFER_COEFFICIENT_TOOLTIP_ID} helpScreenType={LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                      <label style={{ fontSize: 9 }} >Load Transfer Coefficient</label>
                      <Field name={LOAD_TRANSFER_COEFFICIENT} className='form-group-div-input concrete-form-coefficient-input' type="text" noUnits={true} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_LOAD_TRANSFER_COEFFICIENT_TOOLTIP_ID} />
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_DRAINAGE_COEFFICIENT_TOOLTIP_ID} helpScreenType={DRAINAGE_COEFFICIENT_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DRAINAGE_COEFFICIENT_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DRAINAGE_COEFFICIENT_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

                      <label style={{ fontSize: 9 }}>Drainage Coefficient</label>
                      <Field name={DRAINAGE_COEFFICIENT} className='form-group-div-input concrete-form-coefficient-input' type="text" noUnits={true} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_DRAINAGE_COEFFICIENT_TOOLTIP_ID}/>
              </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_INITIAL_SERVICEABILITY_TOOLTIP_ID} helpScreenType={INITIAL_SERVICEABILITY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[INITIAL_SERVICEABILITY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[INITIAL_SERVICEABILITY_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

                      <label style={{ fontSize: 9 }} >Iniital Servicability</label>
                      <Field name={INIITAL_SERVICABILITY} className='form-group-div-input concrete-form-coefficient-input' type="text" noUnits={true} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_INITIAL_SERVICEABILITY_TOOLTIP_ID} />
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_TERMINAL_SERVICEABILITY_TOOLTIP_ID} helpScreenType={TERMINAL_SERVICEABILITY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TERMINAL_SERVICEABILITY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TERMINAL_SERVICEABILITY_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

                      <label style={{ fontSize: 9 }}>Terminal Servicability</label>
                      <Field name={TERMINAL_SERVICABILITY} className='form-group-div-input concrete-form-coefficient-input' type="text" noUnits={true} component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_TERMINAL_SERVICEABILITY_TOOLTIP_ID} />
              </div>
            </div>
        </div>
      )
    }
  }

  renderMicroFiberInputs() {
    if (this.props.params.type === 'JPCP') {
      return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          <div style={{display: "flex", justifyContent: "center", width: "75%", borderTop: "1px solid grey"}}>
            <div style={{ width: "50%", marginTop: 10, display: "flex", alignItems: "center", flexDirection: 'column',justifyContent: "space-between"}}>
                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_FIBERS_TOOLTIP_ID} helpScreenType={FIBERS_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[FIBERS_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[FIBERS_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

                      <label style={{ fontWeight: "bold" }} className="form-label">Macrofibers in Concrete</label>
                      <Field name={MACROFIBRES_IN_CONCRETE} options={['Yes', 'No']} buttonSelected={this.props[MACROFIBRES_IN_CONCRETE]} component={ToggleButton} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_FIBERS_TOOLTIP_ID}/>
            </div>
            <div style={{ width: "50%", marginTop: 10, display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-between"}}>

                      <HelpScreenTooltip id={HELP_CONCRETE_FORM_EDGE_SUPPORT_TOOLTIP_ID} helpScreenType={EDGE_SUPPORT_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[EDGE_SUPPORT_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[EDGE_SUPPORT_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

                      <label style={{ fontWeight: "bold" }} className="form-label">Edge Support</label>
                      <Field name={EDGE_SUPPORT} options={['Yes', 'No']} buttonSelected={this.props[EDGE_SUPPORT]} component={ToggleButton} setParentValue={this.setParentValue.bind(this)} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_EDGE_SUPPORT_TOOLTIP_ID}/>
            </div>
         </div>
          {this.props[MACROFIBRES_IN_CONCRETE] === 'Yes' && <div className="form-group-div">
                  <HelpScreenTooltip id={HELP_CONCRETE_FORM_FIBERS_TOOLTIP_ID} helpScreenType={FIBERS_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[FIBERS_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[FIBERS_HELP_SCREEN]['firstParagraph'[this.props.unitType]]} isShow={this.props.isHelp} />

          <label  style={{fontWeight: "bold", marginTop: 20}} className="form-label">Residual Strength</label>
          <Field className='form-group-div-input' name={RESIDUAL_STRENGTH} type="text" spanValue="%" component={FieldInput} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_CONCRETE_FORM_FIBERS_TOOLTIP_ID}  />
          </div>} 
        </div>
      )
    } else {
      return (
        <div style={{display: "flex", justifyContent: "center", width: "75%", borderTop: "1px solid grey"}}>
          <div style={{marginRight: 15, width: "100%", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <label style={{fontWeight: "bold"}} className="form-label">Edge Support</label>
            <Field name={EDGE_SUPPORT} options={['Yes', 'No']} buttonSelected={this.props[EDGE_SUPPORT]} component={ToggleButton} setParentValue={this.setParentValue.bind(this)}/>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>CONCRETE</div>
        <div style={{height: "100%", width: "100%"}}>
         <div style={{width: "100%", display: "flex", flexDirection: "column", height: "inherit", borderRight: "1px solid", alignItems: "center"}}>
          <FlexuralOutputForm flexStrengthOutputForm={CONCRETE_CONCRETE_FORM} module={CONCRETE_MODULE} {...this.props} />
          {this.renderMicroFiberInputs()}
          {this.renderCRCPinputs()}
        </div>
        </div>
      </div>
    );
  }
}

ConcreteConcreteForm = reduxForm({
  form: CONCRETE_CONCRETE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  enableReinitialize: true,
})(ConcreteConcreteForm);

// Set up initial Values based on which pavement type is chosen first
function mapStateToProps(state, ownProps) {
    const { type } = ownProps.params;
    const unitType = state.currentProject.projectDetails.unitType;

    let initialValues = { 
        [CONCRETE_DROPDOWN]: '28-Day Flex Strength', 
        [LOAD_TRANSFER_COEFFICIENT]: 2.5, 
        [DRAINAGE_COEFFICIENT]: 1.00, 
        [INIITAL_SERVICABILITY]: 4.5,
        [TERMINAL_SERVICABILITY]: 2.25,
        [MACROFIBRES_IN_CONCRETE]: 'No', 
        [RESIDUAL_STRENGTH]: 15 
    }

    if (type === CRCP) {
        if (unitType == METRIC) {
          extend(initialValues, { 
              [LOAD_TRANSFER_COEFFICIENT]: 2.5, 
              [DRAINAGE_COEFFICIENT]: 1.00, 
              [INIITAL_SERVICABILITY]: 4.5,
              [TERMINAL_SERVICABILITY]: 2.25,
              [EDGE_SUPPORT]: 'Yes',
              [CONCRETE_MODULUS_OF_ELASTICITY]: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        } else {
          extend(initialValues, { 
              [LOAD_TRANSFER_COEFFICIENT]: 2.5, 
              [DRAINAGE_COEFFICIENT]: 1.00, 
              [INIITAL_SERVICABILITY]: 4.5,
              [TERMINAL_SERVICABILITY]: 2.25,
              [EDGE_SUPPORT]: 'Yes',
              [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        }
    } else if (type === RCC ) {
        if (unitType == METRIC) {
          extend(initialValues, {
              [EDGE_SUPPORT]: 'No',
              [CONCRETE_MODULUS_OF_ELASTICITY]: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        } else {
          extend(initialValues, {
              [EDGE_SUPPORT]: 'No',
              [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        }
    } else if (type === JPCP ) {
        if (unitType == METRIC) {
          extend(initialValues, {
              [EDGE_SUPPORT]: 'Yes',
              [CONCRETE_MODULUS_OF_ELASTICITY]: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        } else {
          extend(initialValues, {
              [EDGE_SUPPORT]: 'Yes',
              [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
          })
        }
    }
    return {
        initialValues: initialValues
    };
}

ConcreteConcreteForm = connect(
  state => {
    const selector = formValueSelector(CONCRETE_CONCRETE_FORM);
    const concreteDropdown = selector(state, CONCRETE_DROPDOWN);
    const compressiveStrength = selector(state, COMPRESSIVE_STREGTH);
    const splitTensileStrength = selector(state, SPLIT_TESILE_STRENGTH);
    const flexuralStrength = selector(state, CALCULATED_FLEXURAL_STRENGTH);
    const modulusOfElasticity = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    const macrofibersInConcrete = selector(state, MACROFIBRES_IN_CONCRETE);
    const edgeSupport = selector(state, EDGE_SUPPORT);
    const unitType = state.currentProject.projectDetails.unitType;

    return {
      concreteDropdown, compressiveStrength, splitTensileStrength, flexuralStrength, modulusOfElasticity, macrofibersInConcrete, edgeSupport, unitType
    }
  }
)(ConcreteConcreteForm)

function mapDispatchToProps(dispatch) {
  return {
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
  };
}

ConcreteConcreteForm = connect(mapStateToProps, mapDispatchToProps)(ConcreteConcreteForm);

export default ConcreteConcreteForm;
