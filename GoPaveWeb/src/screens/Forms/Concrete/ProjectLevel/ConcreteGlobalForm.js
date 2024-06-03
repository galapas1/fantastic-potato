import React , { Component } from 'react';
import { FieldInput, CalculatedTrafficResultsForm, GlobalForm, HelpScreenTooltip, SmallHelpScreenConfig } from 'Components';
import { reduxForm, formValueSelector } from 'redux-form';
import '../../../../components/Forms/Forms.scss';
import { connect } from 'react-redux';
import { openNewProject, showPopup, setCurrentProjectUnitType } from 'Actions';
import  { validate } from 'Validation/GlobalFormValidation';
import ReactTooltip from 'react-tooltip';
import UserProject from '../../../../components/Projects/user_projects'
import { 
  CONCRETE_GLOBAL_FORM,
  CONCRETE_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  HELP_SCREEN_POPUP
} from  'Constants';

class ConcreteGlobalForm extends Component {

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <ReactTooltip id='globalForm' multiline={true} place="right" type='warning' effect="solid"/> 
        <div style={{fontWeight:'bold', width: '100%', textAlign: 'center', paddingTop: 20, paddingBottom: 15}}>GLOBAL</div>
        <div style={{height: "100%", width: "100%", borderRight:  '1px solid'}}>
          <GlobalForm 
           trafficFormInputDropdownValue={this.props.trafficFormInputDropdownValue} 
           showEditAnalysisButton={this.props.showEditAnalysisButton}
           height='40%'
           {...this.props} />
           <CalculatedTrafficResultsForm />

           <ReactTooltip multiline={true} place="right" type='warning' effect="solid"/>  
        </div>
      </div>
    );
  }
}

ConcreteGlobalForm = reduxForm({
  form: CONCRETE_GLOBAL_FORM,
  validate,
  destroyOnUnmount: false,
  touchOnChange: true
})(ConcreteGlobalForm);

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;

    const trafficFormSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);

    const trafficFormInputDropdownValue = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.concreteFormValues.showEditAnalysisButton;
    return {
      trafficFormInputDropdownValue, showEditAnalysisButton, unitType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

ConcreteGlobalForm = connect(
    mapStateToProps, mapDispatchToProps
)(ConcreteGlobalForm)

export default ConcreteGlobalForm;
