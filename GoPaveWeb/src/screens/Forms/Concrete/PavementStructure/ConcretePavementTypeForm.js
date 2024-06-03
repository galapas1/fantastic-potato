import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import './ConcretePavementStructureForm.scss';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType,
         showModal, addPavementStructureType } from 'Actions';
import { withRouter } from 'react-router';
import { panelValues } from 'Data/PanelValues';
import { FooterForm } from 'Components';
import {
  CONCRETE_MODULE,
  CONCRETE_CRCP_MODAL,
  CONCRETE_RCC_MODAL,
  JPCP,
  RCC,
  CRCP,
  PROJECT_LEVEL_FORM,
  PAVEMENT_STRUCTURE_FORM,
  SUMMARY_FORM
} from  'Constants';

class ConcretePavementTypeForm extends Component {
    shouldComponentUpdate(nextProps) {
        if (!nextProps.params.formType) {
            return false;
        }
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }

 // If pavement Type is already chosen, then render that Pavement Structure Form
  componentWillMount() {
    const { projectType, constructionType } = this.props.params;
    const { pavementStructureType, router } = this.props;
    if (pavementStructureType) {
      const link = `/projectTypes/${projectType}/${constructionType}/${PAVEMENT_STRUCTURE_FORM}/${pavementStructureType}`;
      router.push(link);
    }
  }

  callModal(modalType, pavementStructureType) {
    this.props.addPavementStructureType(CONCRETE_MODULE, pavementStructureType);
    this.props.showModal(modalType, this.props.params);
  }

  navigateToThreeColumnForm() {
    const { projectType, constructionType } = this.props.params;
    const { router } = this.props;
    const link = `/projectTypes/${projectType}/${constructionType}/${PROJECT_LEVEL_FORM}`;
    router.push(link);
  }

  navigateToSummaryPage() {
    const { projectType, constructionType, type } = this.props.params;
    const { router } = this.props;
    const link = `/projectTypes/${projectType}/${constructionType}/${SUMMARY_FORM}/${type}`;
    router.push(link);
  }

  callJpcpForms() {
    const { projectType, constructionType, formType } = this.props.params;
    const { router, addPavementStructureType } = this.props;
    const link = `/projectTypes/${projectType}/${constructionType}/${formType}/${JPCP}`;
    addPavementStructureType(CONCRETE_MODULE, JPCP);
    router.push(link);
  }

  render() {
    return (
        <div style={{display: "flex", zIndex: 10, flexDirection: "column", flex: 1, justifyContent: "space-between"}}>
          <div style={{paddingLeft: 20, paddingTop: 20}}>
            <label style={{fontSize: 16, color: '#0FAFAF', marginBottom: 15, paddingLeft: 60}}>Select Pavement Design Type</label>
           
            <div style={{ display: 'flex', marginTop: 20 }}>
                    <div style={{ width: '33%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.callJpcpForms.bind(this)} style={{ width: 380, height: 280, backgroundImage: 'url(/images/JPCP.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "10%" }}></div>
                <label>Jointed-Plain Concrete Pavement (JPCP)</label>
            </div>
                    <div style={{ width: '33%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.callModal.bind(this, CONCRETE_RCC_MODAL, RCC)} style={{ width: 380, height: 280, backgroundImage: 'url(/images/RCC.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "10%" }}></div>
                <label>Roller-Compacted Concrete (RCC)</label>
            </div>
                    <div style={{ width: '33%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.callModal.bind(this, CONCRETE_CRCP_MODAL, CRCP)} style={{ width: 380, height: 280, backgroundImage: 'url(/images/CRCP.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "10%" }}></div>
                <label>Continuously Reinforced Concrete Pavement (CRCP)</label>
            </div>
                    </div>
          </div>
          <FooterForm formType='pavementTypeForm' {...this.props} />
        </div>
    );
  }
}

function mapStateToProps(state) {
    const unitType       = state.currentProject.projectDetails.unitType;
    const pavementStructureType = state.currentProject.concreteFormValues.pavementStructureType;
    return {
        pavementStructureType, unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams) => {
      dispatch(showModal(modal, routingParams));
    },
    addPavementStructureType: (module, type) => {
      dispatch(addPavementStructureType(module, type));
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

ConcretePavementTypeForm = withRouter(connect(
    mapStateToProps, mapDispatchToProps         
)(ConcretePavementTypeForm));

export default ConcretePavementTypeForm;
