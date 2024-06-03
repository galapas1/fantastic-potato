import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import './OverlayPavementStructureForm.scss';
import { connect } from 'react-redux';
import { showModal,
         addPavementStructureType,
         setCurrentProjectUnitType } from 'Actions';
import { withRouter } from 'react-router';
import { panelValues } from 'Data/PanelValues';
import { FooterForm } from 'Components';
import {
  OVERLAY_MODULE,
  OVERLAY_BONDED_ASPHALT_MODAL,
  PAVEMENT_STRUCTURE_FORM,
  UNBONDED_ASPHALT,
  BONDED_CONCRETE,
  UNBONDED_CONCRETE
} from  'Constants';

class OverlayPavementTypeForm extends Component {

  componentWillMount() {
    const { pavementStructureType, router  } = this.props;
    const { projectType, constructionType } = this.props.params;
    if (pavementStructureType) {
      const link = `/projectTypes/${projectType}/${constructionType}/${PAVEMENT_STRUCTURE_FORM}/${pavementStructureType}`;
      router.push(link);
    }
  }

  callModal(type) {
    this.props.showModal(type);
  }

  navigateToPavementStructurePage(type) {
    const { projectType, constructionType, formType } = this.props.params;
    const { addPavementStructureType, router  } = this.props;
    const link = `/projectTypes/${projectType}/${constructionType}/${formType}/${type}`;
    addPavementStructureType(OVERLAY_MODULE, type);
    router.push(link);
  }


  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    return (
        <div style={{display: "flex", zIndex: 10, flexDirection: "column", flex: 1, justifyContent: "space-between"}}>        
          <div style={{ paddingLeft: 20, paddingTop: 20 }}>
              <label style={{ fontSize: 16, color: '#0FAFAF', marginBottom: 15, paddingLeft: 60 }}>Select Overlay Type</label>
                         
              <div style={{ display: 'flex', marginTop: 20 }}>
                  <div style={{ width: '50%', height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.navigateToPavementStructurePage.bind(this, BONDED_CONCRETE)} style={{ width: 400, height: 200, backgroundImage: 'url(/images/BCC.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "25%" }}></div>
                      <label>Bonded Concrete</label>
                  </div>
                  <div style={{ width: '50%', height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.navigateToPavementStructurePage.bind(this, UNBONDED_CONCRETE)} style={{ width: 400, height: 200, backgroundImage: 'url(/images/UBCC.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "25%" }}></div>
                      <label>Unbonded Concrete</label>
                  </div></div>
                  <div style={{ display: 'flex', marginTop: 20 }}>
                  <div style={{ width: '50%', height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.navigateToPavementStructurePage.bind(this, UNBONDED_ASPHALT)} style={{ width: 400, height: 200, backgroundImage: 'url(/images/UBCOA.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "25%" }}></div>
                      <label>Unbonded Asphalt</label>
                  </div>
                  <div style={{ width: '50%', height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                        <div onClick={this.callModal.bind(this, OVERLAY_BONDED_ASPHALT_MODAL, null, OVERLAY_MODULE)} style={{ width: 400, height: 200, backgroundImage: 'url(/images/BCOA.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover', borderRadius: "25%" }}></div>
                      <label>Bonded Asphalt</label>
                  </div>
              </div>
          </div>
         <FooterForm formType='pavementTypeForm' {...this.props} />
        </div>
    );
  }
}

function mapStateToProps(state) {
//    const unitType = state.currentProject.projectDetails.unitType;
    const pavementStructureType = state.currentProject.concreteFormValues.pavementStructureType;
    return {
        pavementStructureType, //unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams, module) => {
      dispatch(showModal(modal, routingParams, module));
    },
    addPavementStructureType: (module, type) => {
      dispatch(addPavementStructureType(module, type));
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

OverlayPavementTypeForm = withRouter(connect(
    mapStateToProps, mapDispatchToProps         
)(OverlayPavementTypeForm));

export default OverlayPavementTypeForm;
