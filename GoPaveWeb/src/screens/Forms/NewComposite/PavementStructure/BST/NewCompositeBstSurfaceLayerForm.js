import React , { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import  { validate, warn } from 'Validation/NewCompositeOtherSurfaceLayerFormValidation';
import NewCompositeCommonOtherSurfaceLayerForm from '../NewCompositeCommonOtherSurfaceLayerForm'
import { 
  NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
} from  'Constants';

class NewCompositeBSTSurfaceLayerForm extends Component {
  render() {
    return (
     <NewCompositeCommonOtherSurfaceLayerForm {...this.props}/>
    );
  }
}

NewCompositeBSTSurfaceLayerForm = reduxForm({
  form:  NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [SURFACE_POISSONS_RATIO]: 0.35,
    [SURFACE_LAYER_MODULUS_ELASTICITY]: 300000,
    [SURFACE_LAYER_THICKNESS]: 0.25,
    [ALLOWABLE_DAMAGE_PER_LAYER]: 25
  }
})(NewCompositeBSTSurfaceLayerForm);

NewCompositeBSTSurfaceLayerForm = connect(
  state => {
    const pavementStructureType =  state.currentProject.newCompositeFormValues.type;
    const unitType = state.currentProject.projectDetails.unitType;

    return {
     pavementStructureType, unitType
    }
  }
)(NewCompositeBSTSurfaceLayerForm)

export default NewCompositeBSTSurfaceLayerForm;
