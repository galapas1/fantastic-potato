import React , { Component } from 'react';
import {  CalculatedTrafficResultsForm, GlobalForm } from 'Components';
import { reduxForm, formValueSelector } from 'redux-form';
import '../../../../components/Forms/Forms.scss';
import { connect } from 'react-redux';
import { validate } from 'Validation/GlobalFormValidation';
import { setCurrentProjectUnitType } from 'Actions'; 
import ReactTooltip from 'react-tooltip';
import { 
  OVERLAY_GLOBAL_FORM,
  OVERLAY_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
} from  'Constants';

class OverlayGlobalForm extends Component {

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }

  componentDidUpdate() {
   ReactTooltip.rebuild();
  }
  
 render() {
    return (
      <div style={{fontWeight: "bold", display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <ReactTooltip id='globalForm' multiline={true} place="right" type='warning' effect="solid"/> 
        <div style={{width: '100%', textAlign: 'center', paddingTop: 20, paddingBottom: 15}}>GLOBAL</div>
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


OverlayGlobalForm = reduxForm({
  form: OVERLAY_GLOBAL_FORM,
  validate,
  touchOnChange: true,
  destroyOnUnmount: false
})(OverlayGlobalForm);

function mapStateToProps(state) {
    const trafficFormSelector = formValueSelector(OVERLAY_TRAFFIC_FORM);

    const trafficFormInputDropdownValue = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.overlayFormValues.showEditAnalysisButton;

    return {
      trafficFormInputDropdownValue, showEditAnalysisButton
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

OverlayGlobalForm = connect(
        mapStateToProps, mapDispatchToProps
)(OverlayGlobalForm)

export default OverlayGlobalForm;
