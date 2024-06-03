import React, { Component } from 'react';
import { ModalWrapper } from 'Components';
import { connect } from 'react-redux';
import { showModal, addOrEditProject, hideModal, setStateToInitialState, setCurrentProjectId, setStoreStateToNill } from 'Actions';
import { omit, each } from 'underscore';
import { destroy } from 'redux-form';
import './Modals.scss';
import Loader from 'halogen/ClipLoader';
import {
 USER_PROJECTS_CONFIRMATION_MODAL,
 SAVE_DESIGN,
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_NEW_PROJECT_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_HOME_MODAL, 
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_MY_DESIGNS_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_MY_DESIGNS_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL,
 NON_SIGNED_IN_CREATE_PROJECT_MODAL,
 OVERWRITE_SAVE,
 SIGNED_IN_CREATE_PROJECT_MODAL,
 CREATE_PROJECT,
 SIGN_IN_MODAL
} from  'Constants';

const modalStyle = {
   width: 500,
   height: 180,
   backgroundColor: 'white',
   borderRadius: 20,
   padding: 10,
   display: 'table',
   textAlign: 'center'
}

class OverwriteModal extends Component {

  clearFormsAndRenderHomePage() {
     const {router, setStateToInitialState, formsToDelete, setCurrentProjectId} = this.props;
      setStateToInitialState();
      //Need to destroy current forms
      const self = this;
      each(formsToDelete, function(form, formKey) {
       self.props.destroyForm(formKey);   
      })

      // Need to set Current project Id to empty
      setCurrentProjectId('');
      router.push('/');
  }

  onClickOverwriteButton(isNewProjectDesign) {
    const { projectId,
            projectType,
            unitType,
            body,
            projectDescription,
            projectRoute,
            projectDesigner,
            projectZipCode,
            ownersAgency,
            name,
            addOrEditProject,
            showModal,
            module,
            folderId,
            isUserSignedIn,
            router } = this.props;
    let projectValues = { id            : projectId,
                          folderId      : folderId,
                          projectType   : projectType,
                          name          : name,
                          description   : projectDescription,
                          route         : projectRoute,
                          designer      : projectDesigner,
                          zipCode       : projectZipCode,
                          ownersAgency  : ownersAgency,
                          body          : body,
                          unitType      : unitType };
    
    if (isUserSignedIn) {
      if (isNewProjectDesign) {
        if (module ===  LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_NEW_PROJECT_MODAL) {
          addOrEditProject(projectValues, 'Project was successfully updated', showModal.bind(this, SIGNED_IN_CREATE_PROJECT_MODAL, null, CREATE_PROJECT)); 
        } else if (module ===  LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_HOME_MODAL) {
          addOrEditProject(projectValues, 'Project was successfully updated', this.clearFormsAndRenderHomePage.bind(this));
        } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_MY_DESIGNS_MODAL) {
          addOrEditProject(projectValues, 'Project was successfully updated', this.props.router.push.bind(this, '/myDesigns'));
        } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL) {
          showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues, showModal.bind(this, SIGNED_IN_CREATE_PROJECT_MODAL, null, CREATE_PROJECT));
        } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL) {
          showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues, this.clearFormsAndRenderHomePage.bind(this));
        } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_MY_DESIGNS_MODAL) {
          showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues, this.props.router.push.bind(this, '/myDesigns'));
        }
      } else {
        addOrEditProject(projectValues, 'Project was successfully updated', this.props.hideModal.bind(this));
      }  
    } else {
      if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL) {
        showModal(SIGN_IN_MODAL, null, null, null, showModal.bind(this, USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues,  router.push.bind(this, '/')));
      } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL) {
        showModal(SIGN_IN_MODAL, null, null, null, showModal.bind(this, USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues, showModal.bind(this, NON_SIGNED_IN_CREATE_PROJECT_MODAL)));
      }
    }
  } 

  onClickContinueWithoutSaving = () => {
    const { module, router, showModal, hideModal, isUserSignedIn, setStoreStateToNill } = this.props;
    if (isUserSignedIn) {
      if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL || module === LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_HOME_MODAL ) {
        hideModal();
        this.clearFormsAndRenderHomePage();
        router.push('/');
      } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_MY_DESIGNS_MODAL || module === LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_MY_DESIGNS_MODAL) {
        hideModal();
        router.push('/myDesigns');
      } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL || module === LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_NEW_PROJECT_MODAL) {
        showModal(SIGNED_IN_CREATE_PROJECT_MODAL, null, CREATE_PROJECT);
      }  
    } else {
      if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL) {
        hideModal();
        setStoreStateToNill();
        router.push('/');
      } else if (module === LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL) {
        setStoreStateToNill();
        router.push('/projectTypes');
        showModal(NON_SIGNED_IN_CREATE_PROJECT_MODAL);
      }
    }
  } 

  render() {
    const { module, isProjectFetching, isNonSignedInUser } =  this.props;
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle} customStyle={{border: '1px solid red' }}> 
          <div style={{display: "flex", flexDirection: "column", height: 'inherit', width: '95%', alignItems: 'center'}}>
           <div  style={{paddingTop: 5, color: 'red', marginBottom: 20}}>{this.props.module === OVERWRITE_SAVE ? 'OVERWRITE SAVED DESIGN' : 'EXIT AND LOSE UNSAVED CHANGES' }</div>
           { module === OVERWRITE_SAVE && <div style={{marginBottom: 10, display: 'flex', }}>
             <i className="fa fa-exclamation-triangle" style={{color: 'red', fontSize: 20, marginRight: 10}}></i>
             <label style={{fontSize: 12}}>You have edited your saved design. Previously saved values will be overwritten.</label>
           </div>}
           {!isNonSignedInUser && module === OVERWRITE_SAVE && <label style={{color: 'red', marginBottom: 20}}>Do you want to overwrite the saved design or save as new?</label>}
           {module !== OVERWRITE_SAVE &&  <div style={{marginBottom: 10, display: 'flex', }}>
             <i className="fa fa-exclamation-triangle" style={{color: 'red', fontSize: 20, marginRight: 10}}></i>
             <label style={{fontSize: 12}}>You have unsaved changes. All unsaved changes will be lost.</label>
           </div>}
           {!isNonSignedInUser && module !== OVERWRITE_SAVE && <label style={{ color: 'red', marginBottom: 20 }}>Do you want to Save and Continue or Exit and Lose changes?</label>}
            {isNonSignedInUser && module !== OVERWRITE_SAVE && <label style={{color: 'red', marginBottom: 20}}>Do you want to save changes? If so, choose to login/register and then save.</label>}
           {!isNonSignedInUser && module !== OVERWRITE_SAVE && <div style={{width: '95%', display: 'flex', marginLeft: 50}}>
            <button onClick={this.onClickContinueWithoutSaving} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>Exit Without Saving</button> 
            <button disabled={isProjectFetching} onClick={this.onClickOverwriteButton.bind(this, true)} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>Save and Continue</button> 
            {isProjectFetching && <div className='spinnerClass' style={{height: 20}}><Loader color='#3299CC' size='25px' margin='1px'/></div>}
           </div>
           }
           {!isNonSignedInUser && module === OVERWRITE_SAVE &&  <div style={{width: '60%', display: 'flex'}}>
            <button onClick={() => this.props.showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , omit(this.props.projectValues, 'id', 'name',
          'projectId'))} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>SAVE AS NEW</button>
            <button disabled={isProjectFetching} onClick={this.onClickOverwriteButton.bind(this, null)} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 30}} className='btn'>OVERWRITE</button> 
           {isProjectFetching && <div className='spinnerClass' style={{height: 20, width: 99}}><Loader color='#3299CC' size='25px' margin='1px'/></div>}
           </div>}
           {isNonSignedInUser && module !== OVERWRITE_SAVE && <div style={{width: '95%', display: 'flex', marginLeft: 50}}>
            <button onClick={this.onClickContinueWithoutSaving} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>Continue Without Saving</button> 
            <button disabled={isProjectFetching} onClick={this.onClickOverwriteButton.bind(this, true)} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>Login and Save</button> 
            {isProjectFetching && <div className='spinnerClass' style={{height: 20}}><Loader color='#3299CC' size='25px' margin='1px'/></div>}
           </div>
           }

          </div>
        </ModalWrapper>
      </div>
    )   
  }
}

function mapStateToProps(state) {
  return {
    module             : state.currentProject.modal.module,
    projectValues      : state.currentProject.modal.projectValues,
    projectId          : state.currentProject.modal.projectValues.id,
    folderId           : state.currentProject.modal.projectValues.folderId,
    name               : state.currentProject.modal.projectValues.name,
    projectType        : state.currentProject.modal.projectValues.projectType,
    unitType           : state.currentProject.modal.projectValues.unitType,
    projectDescription : state.currentProject.modal.projectValues.description,
    projectRoute       : state.currentProject.modal.projectValues.route,
    projectDesigner    : state.currentProject.modal.projectValues.designer,
    projectZipCode     : state.currentProject.modal.projectValues.zipCode,
    projectDateCreated : state.currentProject.modal.projectValues.dateCreated, 
    projectLastModified: state.currentProject.modal.projectValues.lastModified,
    ownersAgency       : state.currentProject.modal.projectValues.ownersAgency,
    body               : state.currentProject.modal.projectValues.body, 
    formsToDelete      : state.form,
    isProjectFetching  : state.userProjects.isFetching,
    isNonSignedInUser  : state.auth.isNonSignedInUser,
    isUserSignedIn     : state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams, module, projectParams, callback) => {
      dispatch(showModal(modal, routingParams, module, projectParams, callback))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    addOrEditProject: (projectValues, message, callback) => {
      dispatch(addOrEditProject(projectValues, message)).then(() => {
        if (callback) {
          callback()
        }
      }); 
    },
    setStateToInitialState: () => {
      dispatch(setStateToInitialState());
    },
    destroyForm: (form) => {
      dispatch(destroy(form));
    },
    setCurrentProjectId: (id) => {
      dispatch(setCurrentProjectId(id));
    },
    setStoreStateToNill: () => {
      dispatch(setStoreStateToNill());
    },
  };
}

OverwriteModal  = connect(mapStateToProps, mapDispatchToProps)(OverwriteModal);

export default OverwriteModal;
