import React , { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { extend } from 'underscore';
import  { validate, warn } from 'Validation/ConcreteFormValidation';
import NewCompositeCommonJpcpSurfaceLayerForm from '../NewCompositeCommonJpcpSurfaceLayerForm'
import { 
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  NEW_COMPOSITE_RCC_MODULE,
  MACROFIBRES_IN_CONCRETE,
  EDGE_SUPPORT,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from  'Constants';

class NewCompositeRccSurfaceLayerForm extends Component {

  render() {
    return (
      <NewCompositeCommonJpcpSurfaceLayerForm flexStrengthOutputForm={NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM} module={NEW_COMPOSITE_RCC_MODULE} {...this.props} />
    );
  }
}

NewCompositeRccSurfaceLayerForm = reduxForm({
  form: NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  validate,
  warn, 
  destroyOnUnmount: false,
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
     [CONCRETE_DROPDOWN]: '28-Day Flex Strength',
     [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
     [EDGE_SUPPORT]: 'No'
   }
})(NewCompositeRccSurfaceLayerForm);

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;

    if (unitType == METRIC) {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              edgeSupport: 'No',
              modulusOfElasticity: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
            }
        };
    }
    else {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              edgeSupport: 'No',
              modulusOfElasticity: US_CONCRETE_MODULUS_OF_ELASTICITY,
            }
        };
    }
}

NewCompositeRccSurfaceLayerForm = connect(
  state => {
    const selector = formValueSelector(NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM);
    const concreteDropdown = selector(state, CONCRETE_DROPDOWN);
    const compressiveStrength = selector(state, COMPRESSIVE_STREGTH);
    const splitTensileStrength = selector(state, SPLIT_TESILE_STRENGTH);
    const flexuralStrength = selector(state, CALCULATED_FLEXURAL_STRENGTH);
    const modulusOfElasticity = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    const edgeSupport = selector(state, EDGE_SUPPORT);
    const unitType = state.currentProject.projectDetails.unitType;
    return {
      concreteDropdown, compressiveStrength, splitTensileStrength, flexuralStrength, modulusOfElasticity, edgeSupport, unitType
    }
  }
)(NewCompositeRccSurfaceLayerForm)

function mapDispatchToProps(dispatch) {
  return {
    destroyForm: (form) => {
        dispatch(destroy(form));
    },
  };
}

NewCompositeRccSurfaceLayerForm = connect(mapStateToProps, mapDispatchToProps)(NewCompositeRccSurfaceLayerForm);

export default NewCompositeRccSurfaceLayerForm;
