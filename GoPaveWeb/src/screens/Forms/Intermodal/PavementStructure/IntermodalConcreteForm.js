import React , { Component } from 'react';
import { FlexuralOutputForm } from 'Components';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { extend } from 'underscore';
import  { validate, warn } from 'Validation/ConcreteFormValidation';
import { 
  INTERMODAL_CONCRETE_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  INTERMODAL_MODULE,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from  'Constants';

class IntermodalConcreteForm extends Component {

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>CONCRETE</div>
        <div style={{height: "100%", width: "100%"}}>
         <div style={{width: "100%", display: "flex", flexDirection: "column", height: "inherit", borderRight: "1px solid", alignItems: "center"}}>
          <FlexuralOutputForm flexStrengthOutputForm={INTERMODAL_CONCRETE_FORM} module={INTERMODAL_MODULE} {...this.props} />
        </div>
        </div>
      </div>
    );
  }
}

IntermodalConcreteForm = reduxForm({
  form: INTERMODAL_CONCRETE_FORM,
  destroyOnUnmount: false,
  validate, 
  warn,
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
    [CONCRETE_DROPDOWN]: '28-Day Flex Strength',
    [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
  }
})(IntermodalConcreteForm);

function mapStateToProps(state, ownProps) {
    const unitType = state.currentProject.projectDetails.unitType;

    if (unitType == METRIC) {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              modulusOfElasticity: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
            }
        };
    }
    return {
        initialValues: { 
          concreteDropdown: '28-Day Flex Strength',
          modulusOfElasticity: US_CONCRETE_MODULUS_OF_ELASTICITY,
        }
    };
}

IntermodalConcreteForm = connect(
  state => {
    const selector = formValueSelector(INTERMODAL_CONCRETE_FORM);
    const concreteDropdown = selector(state, CONCRETE_DROPDOWN);
    const compressiveStrength = selector(state, COMPRESSIVE_STREGTH);
    const splitTensileStrength = selector(state, SPLIT_TESILE_STRENGTH);
    const flexuralStrength = selector(state, CALCULATED_FLEXURAL_STRENGTH);
    const modulusOfElasticity = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    const unitType = state.currentProject.projectDetails.unitType;

    return {
      concreteDropdown, compressiveStrength, splitTensileStrength, flexuralStrength, modulusOfElasticity, unitType
    }
  }
)(IntermodalConcreteForm)

function mapDispatchToProps(dispatch) {
  return {
    destroyForm: (form) => {
        dispatch(destroy(form));
    },
  };
}

IntermodalConcreteForm = connect(mapStateToProps, mapDispatchToProps)(IntermodalConcreteForm);

export default IntermodalConcreteForm;
