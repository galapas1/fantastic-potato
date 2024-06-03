import React , { Component } from 'react';
import { connect } from 'react-redux';
import { FieldInput } from 'Components';
import { Field } from 'redux-form';
import '../../../../components/Forms/Forms.scss';
import { setCurrentProjectUnitType } from 'Actions';
import { getUnits } from 'HelperFunctions/getUnits';
import { 
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
  SUBGRADE_MODULUS_OF_ELASTICITY,
  METRIC
} from  'Constants';

class NewCompositeCommonOtherSubgradeForm extends Component {
  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{fontWeight: "bold", display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{width: "100%", textAlign: "center", paddingTop: 20, paddingBottom: 15}}>SUBGRADE</div>
        <div style={{width: "100%", height: "100%", paddingRight: 20, paddingLeft: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{width: "100%", borderBottom: "1px solid", paddingBottom: 10}}>
           <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
             <div className="form-group-div" style={{fontWeight: "normal", width: '100%'}}>
                <label  style={{fontWeight: "bold"}} className="form-label">Thickness to Rigid Foundation</label>
                <Field className="form-group-div-input" name={THICKNESS_TO_RIGID_FOUNDATION} type="text" component={FieldInput} 
                       spanValue={getUnits('in', this.props.unitType === METRIC)} />
             </div>
              <div className="form-group-div" style={{fontWeight: "normal", width: '100%'}}>
                <label  style={{fontWeight: "bold"}} className="form-label">Poisson's Ratio</label>
                <Field className="form-group-div-input" name={SUBGRADE_POISSONS_RATIO} type="text" component={FieldInput} />
             </div>
            </div>
          </div>
          <div className="form-group-div" style={{fontWeight: "normal", marginTop: 20, width: '100%'}}>
            <label  style={{fontWeight: "bold"}} className="form-label">Modulus of Elasticty</label>
            <Field className="form-group-div-input" name={SUBGRADE_MODULUS_OF_ELASTICITY} type="text" component={FieldInput}
                   spanValue={getUnits('psi', this.props.unitType === METRIC)} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

NewCompositeCommonOtherSubgradeForm = connect(
    mapStateToProps, mapDispatchToProps
)(NewCompositeCommonOtherSubgradeForm)

export default NewCompositeCommonOtherSubgradeForm;
