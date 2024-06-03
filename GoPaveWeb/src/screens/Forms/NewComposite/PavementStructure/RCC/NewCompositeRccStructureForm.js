import React , { Component } from 'react';
import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import { validate } from 'Validation/StructureFormValidation';
import NewCompositeCommonJpcpStructureForm from '../NewCompositeCommonJpcpStructureForm'
import { showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue } from 'Actions';
import { 
  NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  NEW_COMPOSITE_RCC_MODULE,
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  STRUCTURE_LAYER_MEMBERS,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
} from  'Constants';

const radioKButtonTooltipMessage = 'Check to override this calculated K-value  <br /> with a user-defined K-Value';
const radioKButtonTooltipID = 'newCompositeRccStructureRadioButton';

class NewCompositeRccStructureForm extends Component {

  render() {
    return (
      <NewCompositeCommonJpcpStructureForm structureTableLayerForm={NEW_COMPOSITE_RCC_STRUCTURE_FORM} kValueOutputForm={NEW_COMPOSITE_RCC_STRUCTURE_FORM} outputForm={NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM} layerTitle='Roller-Compacted Concrete Surface' dropdownLabel='Subbase Layers' dropdownLayerInitialValues={[{defaultValue:{name: "Cement-Treated", subName: "(CTB)"}, initialDropdownStyle: {backgroundColor: '#dddddd'}}]} module={NEW_COMPOSITE_RCC_MODULE}  radioKButtonTooltipMessage={radioKButtonTooltipMessage} radioKButtonTooltipID={radioKButtonTooltipID}  showNewCompositeUserDefinedCompositeKValueRadioButtonValue={this.props.showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue} {...this.props} />
    );
  }
}

NewCompositeRccStructureForm = reduxForm({
  form: NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    structureNumberOfLayersDropdown: 2,
    [STRUCTURE_LAYER_MEMBERS]: [{layerTypeName: 'Cement Treated',  modulusOfElasticity: 600000}, {}],
    [COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE]: COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED
  }
})(NewCompositeRccStructureForm);

NewCompositeRccStructureForm = connect(
  state => {
    const structureSelector = formValueSelector(NEW_COMPOSITE_RCC_STRUCTURE_FORM);
    const structureNumberOfLayersDropdown = structureSelector(state, STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN);
    const showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.rccShowCompositeKValueRadioButton;
    const showEditAnalysisButton = state.currentProject.newCompositeFormValues.showEditAnalysisButton;
    const unitType = state.currentProject.projectDetails.unitType;
    return {
     structureNumberOfLayersDropdown, showCompositeKValueRadioButton, showEditAnalysisButton, unitType
    }
  }
)(NewCompositeRccStructureForm)

function mapDispatchToProps(dispatch) {
  return {
    showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue: (value) => {
      dispatch(showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue(value))
    },
  };
}

NewCompositeRccStructureForm = connect(
 null, mapDispatchToProps      
)(NewCompositeRccStructureForm)

export default NewCompositeRccStructureForm;
