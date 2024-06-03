import React , { Component } from 'react';
import { NormalTrafficForm } from 'Components';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, getFormSyncErrors, reset} from 'redux-form';
import { validate, warn } from 'Validation/TrafficFormValidation';
import { setCurrentProjectUnitType } from 'Actions'; 
import {
  US,
  NEW_COMPOSITE_TRAFFIC_FORM,
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION,
  DESIGN_LANE_DISTRIBUTION,
  DESIGN_LIFE,
  TRAFFIC_SPECTRUM_DROPDOWN,
  NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
  NEW_COMPOSITE_MODULE,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE
} from  'Constants';

class NewCompositeTrafficForm extends Component {

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        if(this.props.unitType != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(unitType);
        }
        return true;
    }

    componentWillMount() {
        const { setCurrentProjectUnitType, unitType } = this.props;
        if(US != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(US);
        }
    }

    render() {
        const { constructionType, projectType, type } = this.props.params; 

        return (
            <div> <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
                <div style={{ paddingLeft: -30, paddingTop: 10 }}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <div style={{ paddingRight: 30, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Composite</div></div></div>
      <NormalTrafficForm 
      module={NEW_COMPOSITE_MODULE}
      outputForm={NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM}
      {...this.props} /></div></div>
    )  
  }
}

NewCompositeTrafficForm = reduxForm({
  form: NEW_COMPOSITE_TRAFFIC_FORM,
  validate,
  warn,
  touchOnChange: true,
  destroyOnUnmount: false,
  initialValues: {
    [TRAFFIC_SPECTRUM_DROPDOWN]:  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE
   } 
})(NewCompositeTrafficForm);

NewCompositeTrafficForm = connect(
  state => {
    const selector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trucksPerDay = selector(state, TRUCKS_PER_DAY);
    const trafficGrowthRate = selector(state, TRAFFIC_GROWTH_RATE);
    const directionalDistribution = selector(state, DIRECTIONAL_DISTRIBUTION);
    const designLaneDistribution = selector(state, DESIGN_LANE_DISTRIBUTION);
    const designLife = selector(state, DESIGN_LIFE);
    const trafficFormErrors = getFormSyncErrors(NEW_COMPOSITE_TRAFFIC_FORM)(state);
    return {
      trucksPerDay, trafficGrowthRate , directionalDistribution, designLaneDistribution, designLife, trafficFormErrors
    }
  }
)(NewCompositeTrafficForm)

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        resetForm: () => {
            dispatch(reset(NEW_COMPOSITE_TRAFFIC_FORM));
            dispatch(reset(NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM));
        }
    };
}

NewCompositeTrafficForm = connect(
    null, mapDispatchToProps
)(NewCompositeTrafficForm)

export default NewCompositeTrafficForm;
