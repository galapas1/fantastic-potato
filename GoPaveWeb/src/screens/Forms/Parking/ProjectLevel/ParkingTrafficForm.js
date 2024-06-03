import React, { Component } from 'react';
import ReactTooltip         from 'react-tooltip';
import         { connect  } from 'react-redux';
import         { reduxForm,
                 Field,
                 change,
                 initialize,
                 destroy,
                 reset } from 'redux-form';
import         { GlobalForm,
                 Dropdown,
                 FieldInput,
                 HelpScreenTooltip,
                 SmallHelpScreenConfig } from 'Components';

import { validate                             } from 'Validation/ParkingTrafficFormValidation';
import { showPopup,
         setCurrentProjectUnitType }            from 'Actions'; 
import { parkingTrafficSpectrumDropdownValues } from 'Data/appValues';

import {
  PARKING_TRAFFIC_FORM,
  PARKING_SUBGRADE_FORM,
  DESIGN_LIFE,
  TRAFFIC_SPECTRUM_DROPDOWN, 
  TRUCKS_PER_DAY,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
  DESIGN_LIFE_HELP_SCREEN,
  TRUCKS_PER_DAY_HELP_SCREEN,
  SELECT_SPECTRUM_HELP_SCREEN,
  HELP_SCREEN_POPUP
} from  'Constants';

const defaultValue = { name: DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE };

const HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID = 'helpTrafficFormDesignLifeTooltipId';
const HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID = 'helpTrafficFormTrafficSpectrumTooltipId';
const HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID = 'helpTrucksPerDayTooltipId';

class ParkingTrafficForm extends Component {    

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        if(this.props.unitType != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(unitType);
        }
        return true;
    }

    render() {
        const { constructionType, projectType, type } = this.props.params; 

        return (
            <div> <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
                <div style={{ paddingLeft: -30, paddingTop: 10 }}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <div style={{ paddingRight: 30, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                       </div></div></div>

      <div className="parkingTrafficForm" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%', marginLeft: '50%'}}>
        <div style={{width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 15}}>TRAFFIC</div>
        <div style={{width: '100%', height: '100%'}}>
         <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className='form-group-div' style={{flexDirection: 'column', position: 'relative', zIndex: 4}}>
                                <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} popup={HELP_SCREEN_POPUP} helpScreenType={SELECT_SPECTRUM_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['title']} showPopup={this.props.showPopup} secondParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['secondParagraph'][this.props.unitType]} firstParagraph={SmallHelpScreenConfig[SELECT_SPECTRUM_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />
                                <Field name={TRAFFIC_SPECTRUM_DROPDOWN} component={Dropdown} list={parkingTrafficSpectrumDropdownValues} defaultValue={defaultValue} showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRAFFIC_SPECTRUM_DROPDOWN_TOOLTIP_ID} />
            </div>
            <div className='form-group-div' style={{ paddingBottom: 20}}>
                                <HelpScreenTooltip id={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID} helpScreenType={DESIGN_LIFE_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[DESIGN_LIFE_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                                <label className='form-label font-weight-bold'>Design Life</label>
                                <Field name={DESIGN_LIFE} className='form-group-div-input' type='text' component={FieldInput} spanValue='(Years)' showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_DESIGN_LIFE_TOOLTIP_ID}/>
            </div>
            <div className='form-group-div' style={{borderBottom: '1px solid', paddingBottom: 20}} >
                                <HelpScreenTooltip id={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID} helpScreenType={TRUCKS_PER_DAY_HELP_SCREEN} helpScreenTitle={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['title']} showPopup={this.props.showPopup} popup={HELP_SCREEN_POPUP} firstParagraph={SmallHelpScreenConfig[TRUCKS_PER_DAY_HELP_SCREEN]['firstParagraph'][this.props.unitType]} isShow={this.props.isHelp} />

                                <label className='form-label font-weight-bold'>Trucks/Day</label>
                                <Field name={TRUCKS_PER_DAY} component={FieldInput} type='text' className='form-group-div-input' showHelpTooltip={this.props.isHelp} helptooltipId={HELP_TRAFFIC_FORM_TRUCKS_PER_DAY_TOOLTIP_ID}/>
            </div>
          </div>
          <div style={{width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 15}}>GLOBAL</div>
          <GlobalForm height='40%' {...this.props} />
        </div>
      </div></div>
    )  
  }
}

ParkingTrafficForm = reduxForm({
  form: PARKING_TRAFFIC_FORM,
  validate,
  touchOnChange   : true,
  destroyOnUnmount: false,
  initialValues: {
    [TRAFFIC_SPECTRUM_DROPDOWN]:  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE
   }
})(ParkingTrafficForm);

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
        changeFieldValue: (form, field, value) => {
            dispatch(change(form, field, value));
        },
        destroyForm: (form) => {
            dispatch(destroy(form));
        },
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(PARKING_TRAFFIC_FORM));
            dispatch(reset(PARKING_SUBGRADE_FORM));
        }
    };
}

ParkingTrafficForm = connect(
    null, mapDispatchToProps
)(ParkingTrafficForm)

export default ParkingTrafficForm;
