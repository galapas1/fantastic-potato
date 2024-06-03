import React , { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import  { validate, warn } from 'Validation/NewCompositeOtherSurfaceLayerFormValidation';
import NewCompositeCommonOtherSurfaceLayerForm from '../NewCompositeCommonOtherSurfaceLayerForm'
import { 
  NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM,
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
} from  'Constants';

class NewCompositeHmaSurfaceLayerForm extends Component {
  render() {
    return (
     <NewCompositeCommonOtherSurfaceLayerForm {...this.props}/>
    );
  }
}

NewCompositeHmaSurfaceLayerForm = reduxForm({
  form: NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  initialValues: {
    [SURFACE_POISSONS_RATIO]: 0.35,
    [SURFACE_LAYER_MODULUS_ELASTICITY]: 500000,    
    [ALLOWABLE_DAMAGE_PER_LAYER]: 25
  }
})(NewCompositeHmaSurfaceLayerForm);

NewCompositeHmaSurfaceLayerForm = connect(
  state => {
    const pavementStructureType =  state.currentProject.newCompositeFormValues.type;
    const unitType = state.currentProject.projectDetails.unitType;

    return {
     pavementStructureType, unitType
    }
  }
)(NewCompositeHmaSurfaceLayerForm)

export default NewCompositeHmaSurfaceLayerForm;
