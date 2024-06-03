import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import './Navbar.scss';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PreviousProjectStateSelector from 'Selectors/previous_project_state';
import {  getFormValues, getFormNames, isPristine, destroy } from 'redux-form';
import { withRouter } from 'react-router';
import { showModal, addNotification, setStateToInitialState, setCurrentProjectId, showNonSignedInUserMessage, setStoreStateToNill } from 'Actions';
import { each, extend, omit, isEqual, pick } from 'underscore';

import { saveProjectTypesFromFormTypes,
         formsPresentInDifferentModules } from 'Data/appValues';
import {
 SIGN_IN_MODAL,
 SIGN_UP_MODAL,
 NON_SIGNED_IN_CREATE_PROJECT_MODAL,
 SIGNED_IN_CREATE_PROJECT_MODAL,
 STREET,
 CONCRETE,
 NEW_COMPOSITE,
 OVERLAY,
 PARKING,
 INTERMODAL,
 NEW_COMPOSITE_TRAFFIC_FORM, 
 CONCRETE_TRAFFIC_FORM,
 CONCRETE_GLOBAL_FORM,
 OVERLAY_TRAFFIC_FORM,
 OVERLAY_GLOBAL_FORM,
 PARKING_TRAFFIC_FORM,
 CREATE_PROJECT,
 OVERWRITE_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_MY_DESIGNS_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_NEW_PROJECT_MODAL,
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_HOME_MODAL, 
 LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_MY_DESIGNS_MODAL
} from  'Constants';

class Navbar extends Component {

  callSignInModal() {
    const { showNonSignedInUserMessage, showModal } = this.props;
    showNonSignedInUserMessage(false);
    showModal(SIGN_IN_MODAL);
  }

  callSignUpModal() {
    const { showModal } = this.props;
    showModal(SIGN_UP_MODAL);
  }

  renderSignedInNavItem() {
    const { isUserSignedIn } = this.props;
    if (isUserSignedIn) {
      return (
         <li onClick={this.onNavigatePage.bind(this, 'My Designs')} className='menu-item' style={{cursor: 'pointer'}}>
           <i className='fa fa-user-circle-o nav-icon' style={{color: 'darkGray'}}></i>
          <div className='nav-text' style={{cursor: 'pointer'}}>My Designs</div> 
        </li>
      );
    } else {
      return (
        <li className='menu-item'>
          <div>
            <i className='fa fa-sign-in nav-icon' style={{color: 'darkGray'}}></i>
            <div onClick= {this.callSignInModal.bind(this)} className='nav-text' style={{cursor: 'pointer'}}>Log In</div> 
          </div>
            <div onClick= {this.callSignUpModal.bind(this)} className='nav-text' style={{cursor: 'pointer'}}>Signup</div>
        </li>
      );  
    }
  }

  renderNavbarPages(navbarOption) {
    const {router, showModal, setStateToInitialState, formsToDelete, setCurrentProjectId, isUserSignedIn} = this.props;

    if (isUserSignedIn) {
      if (navbarOption === 'Home') {
        // Need to set projectValues and project Details to initial state
        setStateToInitialState();
        //Need to destroy current forms
        const self = this;
        each(formsToDelete, function(form, formKey) {
         self.props.destroyForm(formKey);   
        })

        // Need to set Current project Id to nul
        setCurrentProjectId('');

        router.push('/');
      } else if (navbarOption === 'My Designs') {
        router.push('/myDesigns');
      } else if (navbarOption === 'New Design') {
         showModal(SIGNED_IN_CREATE_PROJECT_MODAL, null,CREATE_PROJECT );
       }

    } else {
      if (navbarOption === 'Home') {
        setStoreStateToNill();
        router.push('/');
      } else if (navbarOption === 'New Design') {
         showModal(NON_SIGNED_IN_CREATE_PROJECT_MODAL, null,CREATE_PROJECT );
       }  
    }
  }

  onNavigatePage(navbarOption) {
    const {isProjectLevelPristine, isUserSignedIn, formValues, previousProjectData, currentProjectId, showModal, unitType } = this.props;
    const { projectType, constructionType, formType } = this.props.params;
    if (isUserSignedIn) {
      // if user is on a form, then we need to check if user has unsaved changes
      if (formType) {
        const { id, folderId, unitType, name, description, route, designer, zipCode, ownersAgency, dateCreated, lastModified } = formValues.projectDetails;
        let projectValues = {
           name: name, 
           description: description, 
           unitType: unitType,
           route: route , 
           designer: designer , 
           zipCode: zipCode , 
           ownersAgency: ownersAgency ,  
           body: JSON.stringify(formValues) 
        };
        // if project has been already saved
        if (currentProjectId) {
           // Need to remove certain properties form project Details before comparison is made to previousProjectDetails
           let savedFormValues = extend({}, formValues);
           savedFormValues.projectDetails = omit(savedFormValues.projectDetails, 'projectFormType', 'lastModified', 'dateCreated');
    
           let changesMade;
            if (isEqual(savedFormValues, previousProjectData.formValues)) {
              changesMade = false;
            } else {
               changesMade = true
            }

            extend(projectValues, 
              {id: id},
              {folderId: folderId},
              {dateCreated: dateCreated},
              {lastModified: lastModified},
              {projectType: formValues.projectDetails.projectType}
            )
            if(changesMade) {
              if (navbarOption === 'New Design') {
                showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_NEW_PROJECT_MODAL , projectValues);
              } else if (navbarOption === 'Home') {
                showModal(OVERWRITE_MODAL, null,  LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_HOME_MODAL , projectValues);
              } else if (navbarOption === 'My Designs') {
                showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_SAVED_MY_DESIGNS_MODAL  , projectValues);
              }
               return;
            } else {
              this.renderNavbarPages(navbarOption);
            }
          
        } else {
          if (isProjectLevelPristine) {
            this.renderNavbarPages(navbarOption)  
          } else {
            // If user has not saved to database, then we need to figure out project type from route
            let getProjectTypeFromRouter;
            if (projectType === PARKING || projectType === NEW_COMPOSITE || projectType === INTERMODAL) {
              getProjectTypeFromRouter = saveProjectTypesFromFormTypes[projectType]
            } else if (projectType === STREET ) {
              getProjectTypeFromRouter = saveProjectTypesFromFormTypes[constructionType]
            }

            extend(projectValues, {projectType: getProjectTypeFromRouter});

            if (navbarOption === 'Home') {
               showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL , projectValues);
            } else if (navbarOption === 'My Designs') {
               showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_MY_DESIGNS_MODAL , projectValues);
            } else if (navbarOption === 'New Design') {
              showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL , projectValues);
            }

          }
        } 
      } else {
        this.renderNavbarPages(navbarOption)
      }

    } else {
      if (formType) {
        if (isProjectLevelPristine) {
          this.renderNavbarPages(navbarOption)  
        } else {
          // If user has not saved to database, then we need to figure out project type from route
          let getProjectTypeFromRouter;
          if (projectType === PARKING || projectType === NEW_COMPOSITE || projectType === INTERMODAL) {
            getProjectTypeFromRouter = saveProjectTypesFromFormTypes[projectType]
          } else if (projectType === STREET ) {
            getProjectTypeFromRouter = saveProjectTypesFromFormTypes[constructionType]
          }

          // At this point, only formValues and projectType need to be passed along. Project Name and Folder Id will be added  in UserProjectsConfirmation model
          let projectValues = {
           projectType: getProjectTypeFromRouter,   
           unitType: unitType,
           body: JSON.stringify(formValues) };

          if (navbarOption === 'Home') {
             showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_HOME_MODAL , projectValues);
          } else if (navbarOption === 'New Design') {
            showModal(OVERWRITE_MODAL, null, LOSE_UNSAVED_CHANGES_OVERWRITE_UNSAVED_NEW_PROJECT_MODAL , projectValues);
          }
        }
      } else {
        this.renderNavbarPages(navbarOption)
      }
    }
  }

  render() {
    return (

      <ul className='menu'>
        <li className='menu-item' style={{alignItems: 'center'}}>
          <div style={{backgroundImage: 'url(/images/Logo.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: 50, height: 50, marginTop: 10}}></div>
        </li>
        <li onClick={this.onNavigatePage.bind(this, 'Home')} className='menu-item' style={{cursor: 'pointer'}}>
            <i className='fa fa-home nav-icon' style={{color: 'darkGray'}}></i>
            <div className='nav-text'>Home</div>
        </li>
        <li onClick={this.onNavigatePage.bind(this, 'New Design')} className='menu-item' style={{cursor: 'pointer'}}>
             <i className='fa fa-plus nav-icon' style={{color: 'darkGray'}}></i>
            <div className='nav-text'>New Design</div>  
        </li>
        {this.renderSignedInNavItem()}
        <li className='menu-item'>
          <a target='_blank' href='http://resources.pavementdesigner.org' style={{color: 'darkGray', textDecoration: 'none'}}>
            <i className='fa fa-info-circle nav-icon' ></i>
            <div className='nav-text'>Resources</div> 
          </a> 
        </li>
        <li className='menu-item'>
          <a target='_blank' href='http://support.pavementdesigner.org' style={{color: 'darkGray', textDecoration: 'none'}}>
            <i className='fa fa-question-circle nav-icon'></i>
            <div className='nav-text'>Support</div> 
          </a> 
        </li>
        <li style={{height: 40, width: 100, backgroundColor: 'lightGrey'}}></li>
      </ul>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let pavementStructureType;

  const isUserSignedIn =  state.auth.authenticated;
  const formsToDelete = state.form;

  const { projectType, constructionType, formType } = ownProps.params;

   let trafficForm;
   let globalForm;
   let isTrafficFormPristine;
   let isGlobalFormPristine;
   let isProjectLevelPristine;

   if (projectType ===  STREET) {
    if (constructionType === NEW_COMPOSITE) {
      trafficForm = NEW_COMPOSITE_TRAFFIC_FORM;
    } else if (constructionType === CONCRETE) {
      trafficForm = CONCRETE_TRAFFIC_FORM;
      globalForm = CONCRETE_GLOBAL_FORM;
    }  else if (constructionType === OVERLAY) {
      trafficForm = OVERLAY_TRAFFIC_FORM;
      globalForm = OVERLAY_GLOBAL_FORM;
    } 
  } else if (projectType === PARKING) {
    trafficForm = PARKING_TRAFFIC_FORM;  
  }

   isTrafficFormPristine = isPristine(trafficForm)(state);
   isProjectLevelPristine = isTrafficFormPristine;

   if(globalForm) {
     isGlobalFormPristine = isPristine(globalForm)(state);
     isProjectLevelPristine = isTrafficFormPristine &&  isGlobalFormPristine;
   }

    // Saving a project
    // Need to return forms present + values in those forms
    // Also, need to return currentProjet 
    let allFormsPresentInProject;
    let formValues = {};
    let formValuesNow = {};
    let moduleForms;
    let projectValuesToSave;
    let previousProjectData;
    let currentProjectName;
    let currentProjectType;
    let currentProjectUnitType;
    let currentProjectId;

    if (formType) {
      currentProjectName           = state.currentProject.projectDetails.name;
      currentProjectType           = state.currentProject.projectDetails.projectType;
      currentProjectUnitType       = state.currentProject.projectDetails.unitType;
      currentProjectId             = state.currentProject.projectDetails.id;
      allFormsPresentInProject     = getFormNames()(state);

      if (projectType === STREET) {
         if (constructionType === CONCRETE) {
            projectValuesToSave = 'concreteFormValues';
            moduleForms = formsPresentInDifferentModules[CONCRETE]
         } else if (constructionType === OVERLAY) {

            projectValuesToSave = 'overlayFormValues';
            moduleForms = formsPresentInDifferentModules[OVERLAY]
         } else if (constructionType === NEW_COMPOSITE) {
             projectValuesToSave = 'newCompositeFormValues';
            moduleForms = formsPresentInDifferentModules[NEW_COMPOSITE]
         }
      }  else if (projectType === PARKING) {
         projectValuesToSave = 'parkingFormValues';
         moduleForms = formsPresentInDifferentModules[PARKING];
      } else if (projectType === INTERMODAL) {
         projectValuesToSave = 'intermodalFormValues';
         moduleForms = formsPresentInDifferentModules[INTERMODAL];
      }
      
      let formsToSave;
      if (moduleForms) {
        formsToSave = allFormsPresentInProject.filter(function(n) {
          return moduleForms.indexOf(n) !== -1;
        });   
      }

      each(formsToSave, function(form) {
         const currentFormValues = getFormValues(form)(state);
         //const formMetaData = getFormMeta(form)(state);
         if (currentFormValues) {
           extend(formValuesNow, 
            {[form]: 
              {formValues: currentFormValues
              //formMetaData: formMetaData
              }
            }) 
         }
        })
      extend(formValues, {forms: formValuesNow});
      const currentProjectValuesToSave = state.currentProject[projectValuesToSave];
      extend(formValues, {projectValues: currentProjectValuesToSave}, pick(state.currentProject, 'projectDetails'));
      previousProjectData =  PreviousProjectStateSelector(state);
    }
   
  return {
      pavementStructureType,
      isUserSignedIn,
      currentProjectName,
      currentProjectType,
      currentProjectUnitType,
      currentProjectId,
      formValues,
      previousProjectData,
      projectType,
      isProjectLevelPristine,
      formsToDelete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams, module, projectValues) => {
      dispatch(showModal(modal,routingParams, module, projectValues))
    },
    addNotification: (message, level, autoDismiss, uid) => {
      dispatch(addNotification(message, level, autoDismiss, uid));
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
    showNonSignedInUserMessage: (boolean) => {
      dispatch(showNonSignedInUserMessage(boolean));
    },
    setStoreStateToNill: (boolean) => {
      dispatch(setStoreStateToNill(boolean));
    },
  };
}

Navbar = connect(
 mapStateToProps, mapDispatchToProps         
)(Navbar)

export default withRouter(Navbar);
