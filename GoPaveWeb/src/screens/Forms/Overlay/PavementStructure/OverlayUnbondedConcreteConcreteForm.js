import React , { Component } from 'react';
import { setCurrentProjectUnitType } from 'Actions';
import { FieldInput, ToggleButton, FlexuralOutputForm } from 'Components';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { extend } from 'underscore';
import  { validate, warn } from 'Validation/ConcreteFormValidation';
import { 
  OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  COMPRESSIVE_STREGTH,
  SPLIT_TESILE_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  CONCRETE_DROPDOWN,
  CONCRETE_MODULUS_OF_ELASTICITY,
  OVERLAY_UA_MODULE,
  MACROFIBRES_IN_CONCRETE,
  EDGE_SUPPORT,
  RESIDUAL_STRENGTH,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  METRIC,
  US,
  US_CONCRETE_MODULUS_OF_ELASTICITY,
  METRIC_CONCRETE_MODULUS_OF_ELASTICITY
} from  'Constants';

class OverlayUnbondedConcreteConcreteForm extends Component {
  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>CONCRETE</div>
        <div style={{height: "100%", width: "100%"}}>
          <div style={{width: "100%", display: "flex", flexDirection: "column", height: "inherit", borderRight: "1px solid", alignItems: "center"}}>
          <FlexuralOutputForm flexStrengthOutputForm={OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM} module={OVERLAY_UA_MODULE} {...this.props} />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <div style={{display: "flex", justifyContent: "center", width: "75%", borderTop: "1px solid grey"}}>
            <div style={{ width: "50%", marginTop: 10, display: "flex", alignItems: "center", flexDirection: 'column',justifyContent: "space-between"}}>
              <label style={{fontWeight: "bold"}} className="form-label">Macrofibers in Concrete</label>
              <Field name={MACROFIBRES_IN_CONCRETE} options={['Yes', 'No']} buttonSelected={this.props[MACROFIBRES_IN_CONCRETE]} component={ToggleButton}/>
            </div>
            <div style={{ width: "50%", marginTop: 10, display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-between"}}>
              <label style={{fontWeight: "bold"}} className="form-label">Edge Support</label>
              <Field name={EDGE_SUPPORT} options={['Yes', 'No']} buttonSelected={this.props[EDGE_SUPPORT]} component={ToggleButton}/>
            </div>
            </div>
            {this.props[MACROFIBRES_IN_CONCRETE] === 'Yes' &&  <div className="form-group-div">
            <label  style={{fontWeight: "bold", marginTop: 20}} className="form-label">Residual Strength</label>
            <Field className="form-group-div-input"  name={RESIDUAL_STRENGTH} type="text" spanValue="%" component={FieldInput} />
            </div>} 
          </div>
        </div>
        </div>
      </div>
    );
  }
}

OverlayUnbondedConcreteConcreteForm = reduxForm({
  form: OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  validate,
  warn,
  destroyOnUnmount: false,
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
    [CONCRETE_DROPDOWN]: '28-Day Flex Strength',
    [CONCRETE_MODULUS_OF_ELASTICITY]: US_CONCRETE_MODULUS_OF_ELASTICITY,
    [EDGE_SUPPORT]: 'Yes',
    [MACROFIBRES_IN_CONCRETE]: 'No',
    [RESIDUAL_STRENGTH]: 15
  }
})(OverlayUnbondedConcreteConcreteForm);

function mapStateToProps(state, ownProps) {
    const unitType = state.currentProject.projectDetails.unitType;

    if (unitType == METRIC) {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              modulusOfElasticity: METRIC_CONCRETE_MODULUS_OF_ELASTICITY,
              macrofibresInConcrete: 'No',
              edgeSupport: 'Yes',
              residualStrength: 15,
            }
        };
    }
    else {
        return {
            initialValues: { 
              concreteDropdown: '28-Day Flex Strength',
              modulusOfElasticity: US_CONCRETE_MODULUS_OF_ELASTICITY,
              macrofibresInConcrete: 'No',
              edgeSupport: 'Yes',
              residualStrength: 15,
            }
        };
    }
}

OverlayUnbondedConcreteConcreteForm = connect(
  state => {
    const selector = formValueSelector(OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM);

    const concreteDropdown      = selector(state, CONCRETE_DROPDOWN);
    const compressiveStrength   = selector(state, COMPRESSIVE_STREGTH);
    const splitTensileStrength  = selector(state, SPLIT_TESILE_STRENGTH);
    const flexuralStrength      = selector(state, CALCULATED_FLEXURAL_STRENGTH);
    const modulusOfElasticity   = selector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    const macrofibersInConcrete = selector(state, MACROFIBRES_IN_CONCRETE);
    const edgeSupport           = selector(state, EDGE_SUPPORT);

    return {
        concreteDropdown,
        compressiveStrength,
        splitTensileStrength,
        flexuralStrength,
        modulusOfElasticity,
        macrofibersInConcrete,
        edgeSupport,
    };
  }
)(OverlayUnbondedConcreteConcreteForm);

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

OverlayUnbondedConcreteConcreteForm = connect(
    mapStateToProps, mapDispatchToProps
)(OverlayUnbondedConcreteConcreteForm)

export default OverlayUnbondedConcreteConcreteForm;
