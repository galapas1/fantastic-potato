import React , { Component } from 'react';
import { connect } from 'react-redux';
import { FieldInput } from 'Components';
import { Field } from 'redux-form';
import '../../../../components/Forms/Forms.scss';
import { getUnits } from 'HelperFunctions/getUnits';
import { setCurrentProjectUnitType } from 'Actions';
import { 
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  ALLOWABLE_DAMAGE_PER_LAYER,
  SURFACE_LAYER_THICKNESS,
  METRIC
} from  'Constants';

class NewCompositeCommonOtherSurfaceLayerForm extends Component {
  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
      <div style={{fontWeight: "bold", display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{width: "100%", textAlign: "center", paddingTop: 20, paddingBottom: 15}}>SURFACE LAYER</div>
        <div style={{width: "100%", height: "100%", borderRight: "1px solid", paddingRight: 20, paddingLeft: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{width: "100%", borderBottom: "1px solid", paddingBottom: 10}}>
           <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
             <div className="form-group-div" style={{fontWeight: "normal", width: '100%'}}>
                <label  style={{fontWeight: "bold"}} className="form-label">Poisson's Ratio</label>
                <Field className="form-group-div-input" name={SURFACE_POISSONS_RATIO} type="text" component={FieldInput} />
             </div>
              <div className="form-group-div" style={{fontWeight: "normal", width: '100%'}}>
                <label  style={{fontWeight: "bold"}} className="form-label">Modulus of Elasticty</label>
                <Field className="form-group-div-input" name={SURFACE_LAYER_MODULUS_ELASTICITY} type="text" component={FieldInput} spanValue={getUnits('psi', this.props.unitType === METRIC)} component={FieldInput} />
             </div>
            </div>
          </div>
          <div className="form-group-div" style={{fontWeight: "normal", marginTop: 20, width: '100%'}}>
            <label  style={{fontWeight: "bold"}} className="form-label">Surface Layer Thickness</label>
            <Field className="form-group-div-input" name={SURFACE_LAYER_THICKNESS} type="text" component={FieldInput} spanValue={getUnits('in', this.props.unitType === METRIC)} />
          </div>
          <div className="form-group-div" style={{fontWeight: "normal", marginTop: 20, width: '100%'}}>
            <label  style={{fontWeight: "bold"}} className="form-label">Allowable Damage Per Layer</label>
            <Field className="form-group-div-input" name={ALLOWABLE_DAMAGE_PER_LAYER} type="text" component={FieldInput} spanValue="%" />
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

NewCompositeCommonOtherSurfaceLayerForm = connect(
    mapStateToProps, mapDispatchToProps
)(NewCompositeCommonOtherSurfaceLayerForm)

export default NewCompositeCommonOtherSurfaceLayerForm;
