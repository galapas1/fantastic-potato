import React , { Component } from 'react';
import './Forms.scss';
import { FieldInput, Dropdown, HelpScreenTooltip, SmallHelpScreenConfig } from 'Components';
import { connect } from 'react-redux';
import { calculateTruckTraffic, showPopup} from 'Actions';
import { Field, change, initialize, destroy} from 'redux-form';
import { pick, map, isUndefined, any, extend } from 'underscore';
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
  CUSTOM_TRAFFIC_SUMMARY_POPUP,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
  DESIGN_LIFE_HELP_SCREEN,  
  SELECT_SPECTRUM_HELP_SCREEN,
  TRUCKS_PER_DAY_HELP_SCREEN,
  TRAFFIC_GROWTH_RATE_HELP_SCREEN,
  DIRECTIONAL_DISTRIBUTION_HELP_SCREEN,
  DESIGN_LANE_DISTRIBUTION_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from 'Constants';


// Help screens 
const HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID = 'helpTrafficFormDesignLifeTooltipId';
const HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID = 'helpTrafficFormTrafficSpectrumTooltipId';
const HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID = 'helpTrucksPerDayTooltipId';
const HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID = 'helpTrafficGrowthRateTooltipId';
const HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID = 'helpDirectionalDistributionTooltipId';
const HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID = 'helpDesignLaneDistributionTooltipId';


class NormalTrafficForm extends Component {

  setTrafficSpectrumDropdownParentDropdownValue(item) {

    if (item === 'Custom Traffic Spectrum') {
      this.props.showPopup(CUSTOM_TRAFFIC_SUMMARY_POPUP);
    }
  }

  setNillCalculatorValues() {
    this.props.changeFieldValue(this.props.outputForm, AVG_TRUCKS_PER_DAY, '');
    this.props.changeFieldValue(this.props.outputForm, TOTAL_TRUCKS_PER_DAY, '');
  }

  checkIfTrafficInputsHaveErrors(arrayOfInputs, trafficFormErrors) {
    if (!trafficFormErrors) {
      return;
    }
    return any(arrayOfInputs, function(element) {
      return trafficFormErrors[element];
    });
  }
  componentDidUpdate() {
      ReactTooltip.rebuild();
  }

  calculateValues() {
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

  render() {

    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", width: "100%"}}>
        <div style={{width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 15}}>TRAFFIC</div>
        <div style={{width: "100%", borderRight: "1px solid", height: "100%"}}>
         <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="form-group-div" style={{flexDirection: "column", position: "relative", zIndex: 4}}>
                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={SELECT_SPECTRUM_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['title']} showPopup={this.props.showPopup} secondParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
                        <Field name={TRAFFIC_SPECTRUM_DROPDOWN} component={Dropdown} list={trafficSpectrumDropdownValues} setParentDropdownValue={this.setTrafficSpectrumDropdownParentDropdownValue.bind(this)} defaultValue={{ name: DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE }} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} />
            </div>
            <div className="form-group-div" >

                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID} helpScreenType={DESIGN_LIFE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                <label className='form-label font-weight-bold'>Design Life</label>
              

                <Field name={DESIGN_LIFE} className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} type="text" component={FieldInput} spanValue="(Years)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID} />
            </div>
            <div className="form-group-div" >
                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID} helpScreenType={TRUCKS_PER_DAY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

              <label data-tip="hello world" className="form-label font-weight-bold">Trucks/Day</label>
               <Field name={TRUCKS_PER_DAY} component={FieldInput} type='text' className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID} />
            </div>
            <div className="form-group-div">
                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID} helpScreenType={TRAFFIC_GROWTH_RATE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TRAFFIC_GROWTH_RATE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TRAFFIC_GROWTH_RATE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

              <label className='form-label font-weight-bold'>Traffic Growth Rate</label>
              <Field name={TRAFFIC_GROWTH_RATE} component={FieldInput} className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(% per year)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRAFFIC_GROWTH_RATE_TOOLTIP_ID} />
            </div>
            <div className="form-group-div">
                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID} helpScreenType={DIRECTIONAL_DISTRIBUTION_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DIRECTIONAL_DISTRIBUTION_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DIRECTIONAL_DISTRIBUTION_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                        <label className='form-label font-weight-bold'>Directional Distribution</label>
                        <Field name={DIRECTIONAL_DISTRIBUTION} component={FieldInput} className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DIRECTIONAL_DISTRIBUTION_TOOLTIP_ID} />
            </div>
            <div className="form-group-div" style={{ paddingBottom: 20 }}>
                        <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID} helpScreenType={DESIGN_LANE_DISTRIBUTION_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} secondParagraph={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['secondParagraph']} firstParagraph={SmallHelpScreenConfig[DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                        <label className='form-label font-weight-bold'>Design Lane Distribution</label>
                        <Field name={DESIGN_LANE_DISTRIBUTION} component={FieldInput} className="form-group-div-input" calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DESIGN_LANE_DISTRIBUTION_TOOLTIP_ID} />
            </div>           
          </div>
        </div>
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
    calculateTruckTraffic: (trafficValue, outputForm) => {
      dispatch(calculateTruckTraffic(trafficValue, outputForm));
    },
    showPopup: (popup, popupDetails) => {
        dispatch(showPopup(popup, popupDetails));
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    destroyForm: (form) => {
        dispatch(destroy(form));
    },
  };
}

NormalTrafficForm = connect(
 mapStateToProps ,  mapDispatchToProps         
)(NormalTrafficForm)

 export default NormalTrafficForm;
