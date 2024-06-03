import React , { Component } from 'react';
import './Forms.scss';
import { FieldInput, Dropdown, HelpScreenTooltip, SmallHelpScreenConfig } from 'Components';
import { connect } from 'react-redux';
import { calculateTruckTraffic, showPopup, calculateAsphaltAnalysis, setTrafficFormInputDisabled } from 'Actions';
import { Field, change, initialize, destroy } from 'redux-form';
import { pick, map, extend, any, isUndefined } from 'underscore';
import ReactTooltip from 'react-tooltip';
import { trafficSpectrumDropdownValues } from 'Data/appValues';
import {
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  AVG_TRUCKS_PER_DAY, 
  TOTAL_TRUCKS_PER_DAY,
  TRAFFIC_SPECTRUM_DROPDOWN,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  CUSTOM_TRAFFIC_SUMMARY_POPUP,
  TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO,
  TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
  INIITAL_SERVICABILITY,
  TERMINAL_SERVICABILITY,  
  CONCRETE_MODULUS_OF_ELASTICITY, 
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  METRIC,
  DESIGN_LIFE_HELP_SCREEN,
  SELECT_SPECTRUM_HELP_SCREEN,
  TRUCKS_PER_DAY_HELP_SCREEN,
  TRAFFIC_GROWTH_RATE_HELP_SCREEN,
  DIRECTIONAL_DISTRIBUTION_HELP_SCREEN,
  DESIGN_LANE_DISTRIBUTION_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from  'Constants';

const trafficFormDropdownValues = [{name: TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO}, {name: TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN}];

const defaultValue  = {name: 'Select Spectrum Type'};

const TRAFFIC_FORM_DROPDOWN_TOOLTIP_ID = 'trafficFormDropdownTooltipId';
// Help screens 
const HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID = 'helpTrafficFormDesignLifeTooltipId';
const HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID = 'helpTrafficFormTrafficSpectrumTooltipId';
//const HELP_TRAFFIC_FORM_TRAFFIC_INPUTS_DROPDOWN_TOOLTIP_ID = 'helpTrafficFormTrafficInputsTooltipId';
const HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID = 'helpTrucksPerDayTooltipId';
const HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID = 'helpTrafficGrowthRateTooltipId';
const HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID = 'helpDirectionalDistributionTooltipId';
const HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID = 'helpDesignLaneDistributionTooltipId';

const formInputToolTipErrors = {
    default: 'Select a Traffic Spectrum <br />and enter a value for Design Life <br />to enable traffic options',
  trafficSpectrumPresentDesignLifeAbsent: 'Enter a value for Design Life <br />to enable traffic options',
  designLifePresentTrafficSpectrumAbsent: 'Select a Traffic Spectrum <br />to enable traffic options',
  designLifeError: 'Enter a valide value for Design Life <br />to enable traffic options'
}

class AsphaltAnalysisTrafficForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      formInputToolTipErrors: formInputToolTipErrors['default']
    };
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  getAsphaltAnalysisValues(passedInProps) {

   let props;
    if (passedInProps) {
      props = passedInProps;
    } else {
      props = this.props;
    }

   let calculatorParams = {};
      extend(calculatorParams, pick(props, 
        INIITAL_SERVICABILITY,
        TERMINAL_SERVICABILITY,  
        CONCRETE_MODULUS_OF_ELASTICITY, 
        DESIGN_LIFE,
        ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
        ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
        ASPHALT_ANALYSIS_FORM_RELIABILITY,
        ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
        ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
        ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
      ));

      let singleItems = props.trafficSummaryFormValues['singleItems'];
      let tandemItems = props.trafficSummaryFormValues['tandemItems'];
      let tridemItems = props.trafficSummaryFormValues['tridemItems'];
      
      const singleAxleWeight = map(singleItems, function(item) {
        return item.axleLoad;
       })

      const singleAxlesPer1000 = map(singleItems, function(item) {
        return item.axlesPer1000;
      })
      const tandemAxleWeight = map(tandemItems, function(item) {
        return item.axleLoad;
      })
      const tandemAxlesPer1000 = map(tandemItems, function(item) {
        return item.axlesPer1000;
      })
      const tridemAxleWeight = map(tridemItems, function(item) {
        return item.axleLoad;
      })
      const tridemAxlesPer1000 = map(tridemItems, function(item) {
        return item.axlesPer1000;
      })
      extend(calculatorParams, {singleAxleWeight:singleAxleWeight}, {singleAxlesPer1000:singleAxlesPer1000}, {tridemAxleWeight:tridemAxleWeight}, {tridemAxlesPer1000:tridemAxlesPer1000}, {tandemAxleWeight:tandemAxleWeight}, {tandemAxlesPer1000:tandemAxlesPer1000});

      return calculatorParams;
  }

  performAsphaltAnalysisCalculations(message, props) {
    const calculatorParams = this.getAsphaltAnalysisValues(props);
    if (props.unitType === METRIC) {
      extend(calculatorParams, {convertToMetric: true});
    }
    props.calculateAsphaltAnalysis(calculatorParams, null, message, this.props.asphaltAnalysisForm, this.props.outputForm);
  }

  checkIfTrafficInputsHaveErrors(arrayOfInputs, trafficFormErrors) {
    if (!trafficFormErrors) {
      return;
    }
    return any(arrayOfInputs, function(element) {
      return trafficFormErrors[element];
    });
  }

  componentWillReceiveProps(nextProps) {
    // Anytime Traffic Spectrum is changed, need to run the Asphalt Analysis Calculations
    if (nextProps.trafficSummaryFormValues && nextProps.trafficSummaryFormValues !== this.props.trafficSummaryFormValues) {
      if (this.props[TRAFFIC_FORM_INPUTS_DROPDOWN] === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && this.props.showEditAnalysisButton) {
         this.performAsphaltAnalysisCalculations('Asphalt Analysis calculation was run and it was successful', nextProps);  
      }
    }

    // What happens when you change the value of the Traffic Form Dropdown
    if (nextProps[TRAFFIC_FORM_INPUTS_DROPDOWN] !== this.props[TRAFFIC_FORM_INPUTS_DROPDOWN]) {
      this.setNillCalculatorValues();
      if (nextProps[TRAFFIC_FORM_INPUTS_DROPDOWN] === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
        if (nextProps.showEditAnalysisButton) {
          let calculatorValues = this.getAsphaltAnalysisValues(nextProps);
          if (nextProps.unitType === METRIC) {
           extend(calculatorValues, {convertToMetric: true});
          }
          this.props.calculateAsphaltAnalysis(calculatorValues, null, 'Asphalt Analysis Calculation was rerun and was successful', this.props.asphaltAnalysisForm, this.props.outputForm, this.initalizeAndShowForm.bind(this))
        } else {
          this.props.initializeAsphaltAnalysisForm(this.props.asphaltAnalysisForm, this.props.asphaltAnlaysFormValues);
          this.props.showPopup(this.props.asphaltAnalysisPopup);   
        }
      } else {
        this.calculateTruckTraffic();
      }
    }

    // Setting error message for the Form input dropdown that shows up
    if (nextProps[DESIGN_LIFE] && nextProps[TRAFFIC_SPECTRUM_DROPDOWN] !== 'Select Spectrum Type') {
      this.props.setTrafficFormInputDisabled(this.props.module, false);
    }

    if (nextProps[DESIGN_LIFE] && nextProps[TRAFFIC_SPECTRUM_DROPDOWN] === 'Select Spectrum Type') {
      this.setState({formInputToolTipErrors: formInputToolTipErrors['designLifePresentTrafficSpectrumAbsent'] });
    }

    if (!nextProps[DESIGN_LIFE] && nextProps[TRAFFIC_SPECTRUM_DROPDOWN] !== 'Select Spectrum Type') {
      this.setState({formInputToolTipErrors: formInputToolTipErrors['trafficSpectrumPresentDesignLifeAbsent'] });
    }

    if (nextProps[DESIGN_LIFE] && nextProps[TRAFFIC_SPECTRUM_DROPDOWN] !== 'Select Spectrum Type' && this.props.trafficFormErrors && this.props.trafficFormErrors[DESIGN_LIFE]) {
      this.setState({formInputToolTipErrors: formInputToolTipErrors['designLifeError'] });
    }   
  }

  setTrafficSpectrumParentDropdownValue(item) {
      if (item === 'Custom Traffic Spectrum') {
        this.props.showPopup(CUSTOM_TRAFFIC_SUMMARY_POPUP);
      } 
  }

  setFormInputsDropdownParentDropdownValue(item) {
    this.setState({trafficFormInputsDropdown: item});
  }

  // This is mainly called from FieldInput control when the input has an error. Because this can be called from anywhere else too, parameter 
  // errorPresent is added which FormInputControl passes back to this file
  setNillCalculatorValues(errorPresent) {
    this.props.changeFieldValue(this.props.outputForm, AVG_TRUCKS_PER_DAY, '');
    this.props.changeFieldValue(this.props.outputForm, TOTAL_TRUCKS_PER_DAY, '');
    if (this.props[TRAFFIC_FORM_INPUTS_DROPDOWN] === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && errorPresent) {
       this.props.setTrafficFormInputDisabled(this.props.module, true);
    }
  }

  calculateTruckTraffic() {
    const { trafficFormErrors } = this.props;
    let trafficValues = pick(this.props, TRUCKS_PER_DAY, TRAFFIC_GROWTH_RATE, DIRECTIONAL_DISTRIBUTION, DESIGN_LANE_DISTRIBUTION, DESIGN_LIFE);
    let trafficInputs = [TRUCKS_PER_DAY, TRAFFIC_GROWTH_RATE, DIRECTIONAL_DISTRIBUTION, DESIGN_LANE_DISTRIBUTION, DESIGN_LIFE];
    const self = this;
    const anyTrafficValuesAreUndefined = any(trafficInputs, function(input) {
       return isUndefined(self.props[input]);
    })
    if(!anyTrafficValuesAreUndefined && !this.checkIfTrafficInputsHaveErrors(trafficInputs, trafficFormErrors)) {
      this.props.calculateTruckTraffic(trafficValues, this.props.outputForm);
    }  
  }
  
  // This is called after a state change ==> current props have updated values. This is called from FormInputControl
  calculateValues() {
    if (this.props[TRAFFIC_FORM_INPUTS_DROPDOWN] === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
      if (this.props.showEditAnalysisButton) {
        this.performAsphaltAnalysisCalculations('Asphalt Analysis calculation was run and it was successful', this.props);
      }
    } else {
      this.calculateTruckTraffic();
    }
  }

  // This is the callback provided when user chooses AA design from FieldInput Dropdown. Global form truck output needs to populate before AA form is brought to the screen. 
  initalizeAndShowForm() {
    this.props.initializeAsphaltAnalysisForm(this.props.asphaltAnalysisForm, this.props.asphaltAnlaysFormValues),
    this.props.showPopup(this.props.asphaltAnalysisPopup);
  }

  showPopup() {
    this.props.showPopup(this.props.asphaltAnalysisPopup);
  }
  
  onClickEditButton() {
    this.props.initializeAsphaltAnalysisForm(this.props.asphaltAnalysisForm, this.props.asphaltAnlaysFormValues);
    this.props.showPopup(this.props.asphaltAnalysisPopup);
  }
    

  renderDropdownInputs() {

    if (this.props.trafficFormInputsDropdown === TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <div className="form-group-div" >
                  <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID} helpScreenType={TRUCKS_PER_DAY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

            <label className="form-label font-weight-bold">Trucks/Day</label>
            <Field name={TRUCKS_PER_DAY} component={FieldInput} type='text' className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID} />
          </div>
              <div className="form-group-div">
                  <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID} helpScreenType={TRAFFIC_GROWTH_RATE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TRAFFIC_GROWTH_RATE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TRAFFIC_GROWTH_RATE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

            <label className='form-label font-weight-bold'>Traffic Growth Rate</label>
            <Field name={TRAFFIC_GROWTH_RATE} component={FieldInput} type='text' className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(% per year)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID} />
          </div>
              <div className="form-group-div">
                  <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID} helpScreenType={DIRECTIONAL_DISTRIBUTION_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DIRECTIONAL_DISTRIBUTION_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DIRECTIONAL_DISTRIBUTION_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

            <label className='form-label font-weight-bold'>Directional Distribution</label>
            <Field name={DIRECTIONAL_DISTRIBUTION} component={FieldInput} type='text' className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID}/>
          </div>
              <div className="form-group-div">
                  <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID} helpScreenType={DESIGN_LANE_DISTRIBUTION_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} secondParagraph={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

          <label className='form-label font-weight-bold'>Design Lane Distribution</label>
          <Field name={DESIGN_LANE_DISTRIBUTION} component={FieldInput} type='text' className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID} />
          </div>
        </div>
     )
    } else {
      if (this.props.showEditAnalysisButton){
        return (
          <div onClick={this.onClickEditButton.bind(this)}  style={{display: this.props.trafficFormErrors && this.props.trafficFormErrors[DESIGN_LIFE] ? 'none' : 'flex', alignItems: 'center', cursor: 'pointer'}}>
           <div style={{backgroundImage: 'url(/icons/ACPA_Edit.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 20 }}></div>
           <div style={{color: 'rgb(50, 153, 204)'}}>Edit</div>
          </div>
        )
      }
    } 
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", width: "100%"}}>
        <ReactTooltip id={TRAFFIC_FORM_DROPDOWN_TOOLTIP_ID} multiline={true} place='top'type='warning' effect="solid" class='extraClass' /> 
        <div style={{width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 15}}>TRAFFIC</div>
        <div style={{width: "100%", borderRight: "1px solid", height: "100%"}}>
         <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="form-group-div" style={{flexDirection: "column", position: "relative", zIndex: 4}}>
               <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={SELECT_SPECTRUM_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['title']} showPopup={this.props.showPopup}  secondParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
              <Field name={TRAFFIC_SPECTRUM_DROPDOWN} component={Dropdown} list={trafficSpectrumDropdownValues} setParentDropdownValue={this.setTrafficSpectrumParentDropdownValue.bind(this)} defaultValue={defaultValue} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} />
            </div>
            <div  className="form-group-div" style={{borderBottom: '1px solid', paddingBottom: 20}}>
              <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID} helpScreenType={DESIGN_LIFE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp}/>
              <label className='form-label font-weight-bold'>Design Life</label>
              <Field name={DESIGN_LIFE} className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} type="text" component={FieldInput} spanValue="(Years)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID} />
            </div>
           <div className="form-group-div" style={{flexDirection: "column", position: "relative", zIndex: 3}}> 
               <Field name={TRAFFIC_FORM_INPUTS_DROPDOWN} component={Dropdown} tooltipId={TRAFFIC_FORM_DROPDOWN_TOOLTIP_ID} isFieldDisabled={this.props.trafficFormInputsDropdownDisbaled} showTooltip={true} toolTipMessage={this.state.formInputToolTipErrors} list={trafficFormDropdownValues} setParentDropdownValue={this.setFormInputsDropdownParentDropdownValue.bind(this)} defaultValue={{name: TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO}} />
           </div>
            {this.renderDropdownInputs()}
          </div>
        </div>
      </div>
    )  
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType
    };
}

function mapDispatchToProps(dispatch) {
  return {
    calculateTruckTraffic: (trafficValue, outputForm) => {
      dispatch(calculateTruckTraffic(trafficValue, outputForm));
    },
    showPopup: (popup, popupDetails) => {
      dispatch(showPopup(popup, popupDetails));
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    }, 
    initializeAsphaltAnalysisForm: (form, formValues) => {
      dispatch(initialize(form, formValues))  
    },
    destroyForm: (form) => {
      dispatch(destroy(form));
    },
    setTrafficFormInputDisabled: (module, isDisabled) => {
      dispatch(setTrafficFormInputDisabled(module, isDisabled));
    },
    calculateAsphaltAnalysis: (formValues, isOnlyCalculate, message, aaForm, outputForm, callback) =>  {
      dispatch(calculateAsphaltAnalysis(formValues, isOnlyCalculate, message, aaForm, outputForm)).then(() => {
        if (callback) {
          callback()
        }
      }); 
    },
  };
}

AsphaltAnalysisTrafficForm = connect(
 mapStateToProps ,  mapDispatchToProps         
)(AsphaltAnalysisTrafficForm)

 export default AsphaltAnalysisTrafficForm;
