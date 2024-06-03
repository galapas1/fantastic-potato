import React , { Component } from 'react';
import { Dropdown, MrsgForm } from 'Components';
import '../../../../components/Forms/Forms.scss';
import { Field, reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { pluck, compact} from 'underscore';
import  { validate, warn } from 'Validation/SubgradeFormValidation';
import ReactTooltip from 'react-tooltip';
import {
  CONCRETE_SUBGRADE_FORM,
  CONCRETE_STRUCTURE_FORM, 
  CALCULATED_MRSG_VALUE,
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS, 
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  SUBGRADE_DROPDOWN,
  DEPTH_OF_RIGID_DROPDOWN,
  LOSS_OF_SUPPORT_DROPDOWN,
  CONCRETE_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  CONCRETE_MODULE,
  DROPDOWN_KNOWN_MSRG_VALUE,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';

const DEPTH_OF_RIGID_VALUE = ">10 (ft)";
const LOSS_OF_SUPPORT_VALUE = "0";
const depthOfRigidFoudationDropdownValues = [{name: 1, subName: '(ft)'}, {name: 2, subName: '(ft)'}, {name: 3, subName: '(ft)'}, {name: 4, subName: '(ft)'}, {name: 5, subName: '(ft)'}, {name: 6, subName: '(ft)'}, {name: 7, subName: '(ft)'}, {name: 8, subName: '(ft)'}, {name: 9, subName: '(ft)'}, {name: 10, subName: '(ft)'}, {name: '>10', subName: '(ft)' }]
const lossOfSupportDropdownValues = [{name: 0}, {name: 1}, {name: 2}, {name: 3}];

class ConcreteSubgradeForm extends Component {

  render() {
    const type  = this.props.params.type;
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>SUBGRADE</div>
        <div style={{height: "100%", width: "100%", borderRight:  '1px solid'}}>
         <MrsgForm module={CONCRETE_MODULE} kvalueOutputForm={CONCRETE_STRUCTURE_FORM} mrsgOutputForm={CONCRETE_SUBGRADE_FORM} {...this.props} />
         {type === 'CRCP' &&   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10}}>
          
          </div>}
        <ReactTooltip id='subgradeDropdown' multiline={true} place="right" type='warning' effect="solid"/> 
        <ReactTooltip id='mrsgInput' multiline={true} place="right" type='warning' effect="solid"/> 
      </div>
    </div>
    );
  }
}

ConcreteSubgradeForm = reduxForm({
  form: CONCRETE_SUBGRADE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE,
    [DEPTH_OF_RIGID_DROPDOWN]: DEPTH_OF_RIGID_VALUE,
    [LOSS_OF_SUPPORT_DROPDOWN]: LOSS_OF_SUPPORT_VALUE,
  }
})(ConcreteSubgradeForm);

ConcreteSubgradeForm = connect(
  state => {
    const subgradeSelector = formValueSelector(CONCRETE_SUBGRADE_FORM);
    const structureSelector = formValueSelector(CONCRETE_STRUCTURE_FORM);
    const californiaBearingRatio = subgradeSelector(state, CALIFORNIA_BEARING_RATIO);
    const resistanceValue = subgradeSelector(state, RESISTANCE_VALUE);
    const subgradeDropdown = subgradeSelector(state, SUBGRADE_DROPDOWN);
    const depthOfRigidDropdown = subgradeSelector(state, DEPTH_OF_RIGID_DROPDOWN);
    const lossOfSupportDropdown = subgradeSelector(state, LOSS_OF_SUPPORT_DROPDOWN);
    const structureLayerMembers = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const modulusOfElasticity = compact(pluck(structureLayerMembers, MODULUS_OF_ELASTICITY));
    const layerThickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const calculatedMrsgValue = subgradeSelector(state, CALCULATED_MRSG_VALUE);
    const inputMrsgValue = subgradeSelector(state, INPUT_MRSG_VALUE);
    const trafficFormSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);
    const trafficFormInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.concreteFormValues.showEditAnalysisButton;
    const asphaltAnalysisConceteMrsgValue = state.currentProject.concreteFormValues.mrsgInputValue;
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const subgradeFormErrors = getFormSyncErrors(CONCRETE_SUBGRADE_FORM)(state);
    const structureFormErrors = getFormSyncErrors(CONCRETE_STRUCTURE_FORM)(state);
    const unitType = state.currentProject.projectDetails.unitType;

    return {
      californiaBearingRatio, resistanceValue, modulusOfElasticity, layerThickness, subgradeDropdown, calculatedMrsgValue, trafficFormInputDropdown,showEditAnalysisButton, asphaltAnalysisConceteMrsgValue, inputMrsgValue, structureNumberOfLayersDropdown, depthOfRigidDropdown, lossOfSupportDropdown,
      structureLayerMembers, subgradeFormErrors, structureFormErrors, unitType
    }
  }
)(ConcreteSubgradeForm)

export default ConcreteSubgradeForm;
