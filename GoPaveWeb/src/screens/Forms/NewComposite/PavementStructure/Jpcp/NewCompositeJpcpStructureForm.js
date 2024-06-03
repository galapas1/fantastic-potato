import React , { Component } from 'react';
import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import { validate } from 'Validation/StructureFormValidation';
import { showNewCompositeJpcpUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import NewCompositeCommonJpcpStructureForm from '../NewCompositeCommonJpcpStructureForm'
import { 
  NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  NEW_COMPOSITE_JPCP_MODULE,
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  STRUCTURE_LAYER_MEMBERS,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  METRIC
} from  'Constants';

const radioKButtonTooltipMessage = 'Check to override this calculated K-value  <br /> with a user-defined K-Value';
const radioKButtonTooltipID = 'newCompositeJpcpStructureRadioButton';
var initialelasticity = 100000;



class NewCompositeJpcpStructureForm extends Component {

    render() {
        const isMetric = this.props.unitType === METRIC;  
        initialelasticity
        if (isMetric) {
            initialelasticity = 5200
        };
    return (
      <NewCompositeCommonJpcpStructureForm structureTableLayerForm={NEW_COMPOSITE_JPCP_STRUCTURE_FORM}  kValueOutputForm={NEW_COMPOSITE_JPCP_STRUCTURE_FORM} flexStrengthOutputForm={NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM} layerTitle='Jointed Plain Concrete Surface' dropdownLabel='Subbase Layers' module={NEW_COMPOSITE_JPCP_MODULE} dropdownLayerInitialValues={[{defaultValue:{name: "Cement-Treated", subName: "(CTB)"}, initialDropdownStyle: {backgroundColor: '#dddddd'}}]} radioKButtonTooltipMessage={radioKButtonTooltipMessage} radioKButtonTooltipID={radioKButtonTooltipID} showNewCompositeUserDefinedCompositeKValueRadioButtonValue={this.props.showNewCompositeJpcpUserDefinedCompositeKValueRadioButtonValue} {...this.props} />
    );
  }
}

NewCompositeJpcpStructureForm = reduxForm({
  form: NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN]: 2,
      [STRUCTURE_LAYER_MEMBERS]: [{ layerTypeName: 'Cement Treated', modulusOfElasticity: initialelasticity}, {}],
    [COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE]: COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED
  }
})(NewCompositeJpcpStructureForm);

NewCompositeJpcpStructureForm = connect(
  state => {
    const structureSelector = formValueSelector(NEW_COMPOSITE_JPCP_STRUCTURE_FORM);
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const showEditAnalysisButton = state.currentProject.newCompositeFormValues.showEditAnalysisButton;
    const showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.jpcpShowCompositeKValueRadioButton;
    const unitType = state.currentProject.projectDetails.unitType;
    return {
     structureNumberOfLayersDropdown, showCompositeKValueRadioButton, showEditAnalysisButton, unitType
    }
  }
)(NewCompositeJpcpStructureForm)

function mapDispatchToProps(dispatch) {
  return {
    showNewCompositeJpcpUserDefinedCompositeKValueRadioButtonValue: (value) => {
      dispatch(showNewCompositeJpcpUserDefinedCompositeKValueRadioButtonValue(value))
    },
  };
}

NewCompositeJpcpStructureForm = connect(
 null, mapDispatchToProps      
)(NewCompositeJpcpStructureForm)

export default NewCompositeJpcpStructureForm;
