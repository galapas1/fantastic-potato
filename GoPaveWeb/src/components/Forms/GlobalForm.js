import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldInput, HelpScreenTooltip, HelpScreenTooltipSimple, SmallHelpScreenConfig } from 'Components';
import { Field, change, initialize, destroy } from 'redux-form';
import { showPopup } from 'Actions';
import { each, pick, extend, map, isUndefined } from 'underscore';
import './Forms.scss';
import ReactTooltip from 'react-tooltip';
import { 
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
  RELIABILITY_HELP_SCREEN,
  SLABS_CRACKED_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from 'Constants';

// Help screens 
const HELP_GLOBAL_FORM_RELIABILITY_TOOLTIP_ID = 'helpGlobalFormReliabilityTooltipId';
const HELP_GLOBAL_FORM_SLABS_CRACKED_TOOLTIP_ID = 'helpGlobalFormSlabsCrackedTooltipId';

class GlobalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {           
        };
    }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }
  render() {

    const isDisabled = this.props.trafficFormInputDropdownValue === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && this.props.showEditAnalysisButton
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <div className="form-group-div" style={{ width: '90%' }} >
          <HelpScreenTooltip id={HELP_GLOBAL_FORM_RELIABILITY_TOOLTIP_ID} helpScreenType={RELIABILITY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[RELIABILITY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[RELIABILITY_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
          <label className='form-label'>Reliability</label>
          <Field className="form-group-div-input font-weight-normal" name={RELIABILITY} showTooltip={isDisabled} toolTipMessage='Reliability value is set by <br /> the Asphalt Design form' isFieldDisabled={isDisabled} type='text' component={FieldInput} spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_GLOBAL_FORM_RELIABILITY_TOOLTIP_ID} />
            </div>

            <div className="form-group-div" style={{ width: '90%' }} >
          <HelpScreenTooltip id={HELP_GLOBAL_FORM_SLABS_CRACKED_TOOLTIP_ID} helpScreenType={SLABS_CRACKED_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[SLABS_CRACKED_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[SLABS_CRACKED_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
          <label className='form-label'>% of Slabs Cracked at End of Design Life</label>

          <Field name={PERCENTAGE_OF_CRACKED_SLABS} component={FieldInput} type='text' className="form-group-div-input width-input" spanValue="(%)" showHelpTooltip={this.props.isHelp} helptooltipId={HELP_GLOBAL_FORM_SLABS_CRACKED_TOOLTIP_ID} />
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
        showPopup: (popup, popupDetails) => {
            dispatch(showPopup(popup, popupDetails));
        },
        destroyForm: (form) => {
            dispatch(destroy(form));
        },
    };
}

GlobalForm = connect(
    mapStateToProps, mapDispatchToProps
)(GlobalForm)
     
export default GlobalForm;

  
