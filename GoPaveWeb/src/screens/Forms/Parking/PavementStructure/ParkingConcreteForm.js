import React , { Component } from 'react';
import { FieldInput, FlexuralOutputForm } from 'Components';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { extend } from 'underscore';
import { validate, warn } from 'Validation/ConcreteFormValidation';
import { setCurrentProjectUnitType } from 'Actions';

import { 
  PARKING_CONCRETE_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  PARKING_MODULE,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from  'Constants';

class ParkingConcreteForm extends Component {

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      //setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>CONCRETE</div>
        <div style={{height: "100%", width: "100%"}}>
         <div style={{width: "100%", display: "flex", flexDirection: "column", height: "inherit", alignItems: "center"}}>
          <FlexuralOutputForm flexStrengthOutputForm={PARKING_CONCRETE_FORM} module={PARKING_MODULE} {...this.props} />
        </div>
        </div>
      </div>
    );
  }
}

ParkingConcreteForm = reduxForm({
  form: PARKING_CONCRETE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
      [CONCRETE_DROPDOWN]: DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
      [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
  },
})(ParkingConcreteForm);

ParkingConcreteForm = connect(
  state => {
      const selector = formValueSelector(PARKING_CONCRETE_FORM);
      const concreteDropdown = selector(state, CONCRETE_DROPDOWN);
      const compressiveStrength = selector(state, COMPRESSIVE_STREGTH);
      const splitTensileStrength = selector(state, SPLIT_TESILE_STRENGTH);
      const flexuralStrength = selector(state, CALCULATED_FLEXURAL_STRENGTH);
      const modulusOfElasticity = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
      const unitType = state.currentProject.projectDetails.unitType;
      return {
          concreteDropdown, compressiveStrength, splitTensileStrength, flexuralStrength, modulusOfElasticity, unitType
      };
  }
)(ParkingConcreteForm);

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;

    if (unitType == METRIC) {
      return {
        initialValues: {
          concreteDropdown: DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
          modulusOfElasticity: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
        }
      }
    }
    return {
        initialValues: {
          concreteDropdown: DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
          modulusOfElasticity: US_CONCRETE_MODULUS_OF_ELASTICITY,
       }
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

ParkingConcreteForm = connect(
    mapStateToProps, mapDispatchToProps
)(ParkingConcreteForm)

export default ParkingConcreteForm;
