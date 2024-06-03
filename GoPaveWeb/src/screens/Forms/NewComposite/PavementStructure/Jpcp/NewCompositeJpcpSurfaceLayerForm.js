import React , { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { extend } from 'underscore';
import  { validate, warn } from 'Validation/ConcreteFormValidation';
import NewCompositeCommonJpcpSurfaceLayerForm from '../NewCompositeCommonJpcpSurfaceLayerForm'
import { 
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  NEW_COMPOSITE_JPCP_MODULE,
  MACROFIBRES_IN_CONCRETE,
  EDGE_SUPPORT,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from  'Constants';

class NewCompositeJpcpSurfaceLayerForm extends Component {

  render() {
    return (
      <NewCompositeCommonJpcpSurfaceLayerForm flexStrengthOutputForm={NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM} module={NEW_COMPOSITE_JPCP_MODULE}  {...this.props} />
    );
  }
}

NewCompositeJpcpSurfaceLayerForm = reduxForm({
  form: NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  validate,
  warn, 
  destroyOnUnmount: false,
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
    [CONCRETE_DROPDOWN]: '28-Day Flex Strength',
    [EDGE_SUPPORT]: 'Yes',
    [MACROFIBRES_IN_CONCRETE]: 'No',
    [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
  }
})(NewCompositeJpcpSurfaceLayerForm);

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;

    if (unitType == METRIC) {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              edgeSupport: 'Yes',
              macrofibresInConcrete: 'No',
              modulusOfElasticity: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
            }
        };
    }
    else {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              edgeSupport: 'Yes',
              macrofibresInConcrete: 'No',
              modulusOfElasticity: US_CONCRETE_MODULUS_OF_ELASTICITY,
            }
        };
    }
}

NewCompositeJpcpSurfaceLayerForm = connect(
  state => {
    const selector = formValueSelector(NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM);
    const concreteDropdown = selector(state, CONCRETE_DROPDOWN);
    const compressiveStrength = selector(state, COMPRESSIVE_STREGTH);
    const splitTensileStrength = selector(state, SPLIT_TESILE_STRENGTH);
    const flexuralStrength = selector(state, CALCULATED_FLEXURAL_STRENGTH);
    const modulusOfElasticity = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    const macrofibersInConcrete = selector(state, MACROFIBRES_IN_CONCRETE);
    const edgeSupport = selector(state, EDGE_SUPPORT);
    const unitType = state.currentProject.projectDetails.unitType;
    return {
      concreteDropdown, compressiveStrength, splitTensileStrength, flexuralStrength, modulusOfElasticity, macrofibersInConcrete, edgeSupport, unitType
    }
  }
)(NewCompositeJpcpSurfaceLayerForm)

function mapDispatchToProps(dispatch) {
  return {
    destroyForm: (form) => {
        dispatch(destroy(form));
    },
  };
}

NewCompositeJpcpSurfaceLayerForm = connect(mapStateToProps, mapDispatchToProps)(NewCompositeJpcpSurfaceLayerForm);

export default NewCompositeJpcpSurfaceLayerForm;
