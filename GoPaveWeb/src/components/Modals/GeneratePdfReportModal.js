import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ModalWrapper } from 'Components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentProjectName,
         setCurrentProjectRoute,
         setCurrentProjectUnitType,
         setCurrentProjectDescription,
         setCurrentProjectOwnersAgency,
         setCurrentProjectZipCode,
         setCurrentProjectDesigner } from 'Actions';
import './Modals.scss';

const modalStyle = {
  width: 600,
  height: 400,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 10,
  display: 'table',
  textAlign: 'center'
}

const PROJECT_NAME             = 'projectName';
const PROJECT_UNIT_TYPE        = 'projectUnitType';
const PROJECT_DESCRIPTION      = 'projectDescription';
const PROJECT_ZIP_CODE         = 'projectZipCode';
const PROJECT_ROUTE            = 'projectRoute';
const PROJECT_DESIGNER         = 'projectDesigner';
const PROJECT_OWNERS_AGENCY    = 'projectOwnersAgency';

class GeneratePdfReportModal extends Component {

   onGeneratePdfButtonClick() {      
        this.props.hideModal();    
    if(this.props.summaryContext && (typeof this.props.summaryContext == 'object')) {
        let context = this.props.summaryContext;        
      if(context.props.generatePdf && (typeof context.props.generatePdf == 'function')) {
          context.props.generatePdf(context);
      }
    }
    }

 

  handleInputChange(input, event) {
    const { setCurrentProjectName,
            setCurrentProjectUnitType,
            setCurrentProjectDesigner,
            setCurrentProjectDescription,
            setCurrentProjectZipCode,
            setCurrentProjectOwnersAgency,
            setCurrentProjectRoute } = this.props;
    const value = event.target.value;
    if (input === PROJECT_NAME) {
      setCurrentProjectName(value);
    } else if (input === PROJECT_UNIT_TYPE) {
      setCurrentProjectUnitType(value);  
    } else if (input === PROJECT_DESIGNER) {
      setCurrentProjectDesigner(value);  
    } else if (input === PROJECT_DESCRIPTION) {
      setCurrentProjectDescription(value);    
    } else if (input === PROJECT_ZIP_CODE) {
      setCurrentProjectZipCode(value);  
    } else if (input === PROJECT_OWNERS_AGENCY) {
      setCurrentProjectOwnersAgency(value);
    } else if (input === PROJECT_ROUTE) {
      setCurrentProjectRoute(value);
    } 
  }

  render() {
    const { isUserSignedIn,
            currentProjectName,
            currentProjectDesigner,
            currentProjectRoute,
            currentProjectZipCode,
            currentProjectOwnersAgency,
            currentProjectDescription  }  = this.props;
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle} customStyle={{border: '1px solid lightblue' }} > 
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', height: 'inherit', alignItems: 'flex-end', paddingBottom: 10}}>
            <div style={{paddingTop: 5, color: '#0FAFAF', fontSize: 18, marginBottom: 25, width: '100%'}}>{isUserSignedIn ? 'EDIT DESIGN DETAILS' : 'ADD DESIGN DETAILS'}</div>
            <div style={{display: 'flex', height: '100%', width: '100%'}}>
              <div style={{width: '50%', height: '90%', borderRight: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>DESIGN NAME</div>
                  <input value={currentProjectName} onChange={this.handleInputChange.bind(this, PROJECT_NAME)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>DESIGNERS NAME</div>
                  <input value={currentProjectDesigner} onChange={this.handleInputChange.bind(this, PROJECT_DESIGNER)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>ROUTE</div>
                  <input value={currentProjectRoute} onChange={this.handleInputChange.bind(this, PROJECT_ROUTE)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>ZIP CODE <span style={{fontStyle: 'italic'}}>(Project location)</span></div>
                  <input value={currentProjectZipCode} onChange={this.handleInputChange.bind(this, PROJECT_ZIP_CODE )} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
              </div>
              <div style={{width: '50%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>OWNER/AGENCY</div>
                  <input value={currentProjectOwnersAgency} onChange={this.handleInputChange.bind(this, PROJECT_OWNERS_AGENCY )} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               <div style={{display: 'flex', flexDirection: 'column', height: '60%', width: '80%', marginBottom: 10}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>PROJECT DESCRIPTION</div>
                  <textarea value={currentProjectDescription} onChange={this.handleInputChange.bind(this, PROJECT_DESCRIPTION )} style={{borderRadius: 20, height: '90%', resize: 'none', paddingLeft: 15, paddingRight: 15, paddingTop: 5, borderColor: 'grey'}}/>
               </div>
              </div>
            </div>
            <div>
                  
            <button onClick={this.onGeneratePdfButtonClick.bind(this)} style={{ backgroundColor: 'rgb(102, 153, 0)', color: "white" }} className='btn btn-primary'>DOWNLOAD AND VIEW REPORT</button>
            </div>
          </div>
        </ModalWrapper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserSignedIn            : state.auth.authenticated,
    currentProjectName        : state.currentProject.projectDetails.name,
    currentProjectType        : state.currentProject.projectDetails.projectType,
    currentUnitType           : state.currentProject.projectDetails.unitType,
    currentProjectDescription : state.currentProject.projectDetails.description,
    currentProjectRoute       : state.currentProject.projectDetails.route,
    currentProjectDesigner    : state.currentProject.projectDetails.designer,
    currentProjectZipCode     : state.currentProject.projectDetails.zipCode,
    currentProjectOwnersAgency: state.currentProject.projectDetails.ownersAgency,
    summaryContext            : state.currentProject.modal.projectValues
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectName: (values) => {
      dispatch(setCurrentProjectName(values));
    },
    setCurrentProjectUnitType: (values) => {
      dispatch(setCurrentProjectUnitType(values));
    },
    setCurrentProjectRoute: (values) => {
      dispatch(setCurrentProjectRoute(values));
    },
    setCurrentProjectDescription: (values) => {
      dispatch(setCurrentProjectDescription(values));
    },
    setCurrentProjectOwnersAgency: (values) => {
      dispatch(setCurrentProjectOwnersAgency(values));
    },
    setCurrentProjectZipCode: (values) => {
      dispatch(setCurrentProjectZipCode(values));
    },
    setCurrentProjectDesigner: (values) => {
      dispatch(setCurrentProjectDesigner(values));
    },
  };
}

GeneratePdfReportModal  = withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneratePdfReportModal));

export default GeneratePdfReportModal;
