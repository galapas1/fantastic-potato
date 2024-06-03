import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import './Forms.scss';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { each, extend, omit, isEqual, keys, pick, findWhere, isEmpty, find } from 'underscore';
import { addNotification, saveProject, showModal, showNonSignedInUserMessage } from 'Actions';
import PreviousProjectStateSelector from 'Selectors/previous_project_state'
import { panelValues } from 'Data/PanelValues';
import { saveProjectTypesFromFormTypes, formsPresentInDifferentModules } from 'Data/appValues';
import { touch, formValueSelector, isPristine, getFormSyncErrors, getFormValues, getFormNames, getFormMeta } from 'redux-form';
import { parkingProjectLevelRouterLeaveValidation, parkingPavementStructureFormRouterLeaveValidation } from 'Forms/Parking/components/ParkingRouterLeaveValidation';
import { newCompositeProjectLevelRouterLeaveValidation, newCompositePavementStructureFormRouterLeaveValidation} from 'Forms/NewComposite/components/NewCompositeRouterLeaveValidation';
import { concreteProjectLevelRouterLeaveValidation,concretePavementStructureFormRouterLeaveValidation  } from 'Forms/Concrete/components/ConcreteRouterLeaveValidation';
import { overlayProjectLevelRouterLeaveValidation, overlayPavementStructureFormRouterLeaveValidation } from 'Forms/Overlay/components/OverlayRouterLeaveValidation';
import { intermodalPavementStructureFormRouterLeaveValidation } from 'Forms/Intermodal/components/IntermodalRouterLeaveValidation';
import {
  CONCRETE_GLOBAL_FORM,
  CONCRETE_TRAFFIC_FORM,
  OVERLAY_TRAFFIC_FORM,
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  TRAFFIC_SPECTRUM_DROPDOWN,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  NEW_COMPOSITE_TRAFFIC_FORM,
  OVERLAY_GLOBAL_FORM,
  CONCRETE_CONCRETE_FORM,
  CONCRETE_STRUCTURE_FORM,
  CONCRETE_SUBGRADE_FORM,
  PARKING_TRAFFIC_FORM,
  PARKING_SUBGRADE_FORM,
  PARKING_CONCRETE_FORM,
  PARKING_SUBBASE_FORM,
  CALIFORNIA_BEARING_RATIO,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  COMPRESSIVE_STREGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  SPLIT_TESILE_STRENGTH,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  USER_DEFINED_COMPOSITE_K_VALUE,
  CONCRETE_DROPDOWN,
  SUBGRADE_DROPDOWN,
  NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
  NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  INPUT_MRSG_VALUE,
  RESISTANCE_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
  OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  EXISTING_THICKNESS,
  JOINT_CRACKING_TIME_TO_LIVE,
  FATIGUE_ADJUSTMENT_FACTOR,
  DURABILITY_ADJUSTMENT_FACTOR,
  OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  PROJECT_LEVEL_FORM,
  PAVEMENT_STRUCTURE_FORM,
  SUMMARY_FORM,
  STREET,
  CONCRETE,
  NEW_COMPOSITE,
  OVERLAY,
  PARKING,
  INTERMODAL,
  JPCP,
  RCC,
  UNBONDED_ASPHALT,
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
  STRUCTURE_LAYER_MEMBERS,
  PROJECT_TYPES,
  USER_PROJECTS_CONFIRMATION_MODAL,
  SAVE_DESIGN ,
  VALUES,
  PROJECT_LEVEL_COLUMNS,
  PAVEMENTS_STRUCTURE_COLUMNS,
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  GENERATE_PDF_REPORT_MODAL,
  OVERWRITE_MODAL,
  OVERWRITE_SAVE,
  SIGN_IN_MODAL,
  HDG, 
  BST,
  NEW_COMPOSITE_OTHER,
  NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_HMA_SUBGRADE_FORM, 
  NEW_COMPOSITE_HMA_STRUCTURE_FORM,
  NEW_COMPOSITE_BST_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_BST_SUBGRADE_FORM, 
  NEW_COMPOSITE_BST_STRUCTURE_FORM,
  NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_OTHER_SUBGRADE_FORM, 
  NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
  SUBGRADE_MODULUS_OF_ELASTICITY,
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
  INTERMODAL_STRUCTURE_FORM,
  INTERMODAL_SUBGRADE_FORM,
  INTERMODAL_CONCRETE_FORM
} from  'Constants';

const INPUTS_TO_BE_FOCUSSED = 'inputsToBeFocussed';
const IS_FORM_INVALID = 'isFormInvalid';
const ARE_ERRORS_PRESENT = 'areErrorsPresent';

/*
  Needs formType to be passed to it
*/

class FooterForm extends Component {

  static contextTypes = {
    summaryContext: PropTypes.object,
  };

  onGenerateButtonClick(summaryContext) {
    const { showModal, generatePdf } = this.props;
    showModal(GENERATE_PDF_REPORT_MODAL, null, null, summaryContext)
  }

  checkPavementStructureOptions(currentPavementFormValues, savedPavementFormValues ) {

    if (isEqual(savedPavementFormValues, currentPavementFormValues)) {
      return;
    }
    // If a user is saving for the first time on Pavement Structure Form, then we dont need ot check of save or update 
    if (isEmpty(savedPavementFormValues)) {
      return;
    }

    const currentPavementFormFields = keys(currentPavementFormValues);
    const savedPavementFormFields = keys(savedPavementFormValues);
    let isSave;
    let isUpdate;
    let isSaveOrUpdate;

    // need to check members separately since it is an nested object
    if (!isEqual(currentPavementFormValues['members'], savedPavementFormValues['members'])) {
      let unequalNumberOfkeys;
      each(currentPavementFormValues.members, function(member, index) {
       const keysOfCurrentMember = keys(currentPavementFormValues['members'][index]);
       const keysOfSavedMember = keys(savedPavementFormValues['members'][index]);
       if (keysOfCurrentMember.length !== keysOfSavedMember.length) {
         isSave = true;
         unequalNumberOfkeys = true;
       } else if (!unequalNumberOfkeys && currentPavementFormValues['members'][index] && currentPavementFormValues['members'][index][MODULUS_OF_ELASTICITY] &&  savedPavementFormValues['members'][index] && savedPavementFormValues['members'][index][MODULUS_OF_ELASTICITY] && currentPavementFormValues['members'][index][MODULUS_OF_ELASTICITY]!== savedPavementFormValues['members'][index][MODULUS_OF_ELASTICITY] ) {
         isUpdate = true
      } else if (!unequalNumberOfkeys && currentPavementFormValues['members'][index] && currentPavementFormValues['members'][index][LAYER_THICKNESS]  && savedPavementFormValues['members'][index] && savedPavementFormValues['members'][index][LAYER_THICKNESS] &&  currentPavementFormValues['members'][index][LAYER_THICKNESS] !== savedPavementFormValues['members'][index][LAYER_THICKNESS] ) {
         isUpdate = true
      } 
      
      })
    }
    
    // need to omit memebrs because they have alreadyu been compared
    currentPavementFormValues = omit(currentPavementFormValues, 'members');
    savedPavementFormValues = omit(savedPavementFormValues, 'members');

    if (keys(currentPavementFormValues).length === keys(savedPavementFormValues).length) {
       // are the keys Deep Equal
       if (isEqual(currentPavementFormFields,savedPavementFormFields )) {
         if (isEqual(currentPavementFormValues,savedPavementFormValues )) {
          isSave = true;
         } else {
          isUpdate = true;
         }

       } else {
         // differnt keys were updated, (still same number of keys though )
         isSave = true;
       }
    } else {
      // if length went down, then updated
      if (savedPavementFormFields.length > currentPavementFormFields.length) {
         isUpdate = true;
      } else {
        // find common keys and check if same value
        let commonInputs =  currentPavementFormFields.filter(function(n) {
           return savedPavementFormFields.indexOf(n) !== -1;
        });

        let formDifferent = false;
        each(commonInputs, function(input) {
          if (!isEqual(currentPavementFormValues[input], savedPavementFormValues[input])) {
             formDifferent = true;
          }
        })
        if (formDifferent) {
          isUpdate = true;
        } else {
           isSave = true;
        }
      }
    }

    if (isSave) {
      isSaveOrUpdate = {
        isSave: true
      }
    } 

    if (isUpdate) {
      isSaveOrUpdate = {
        isUpdate: true
      }
    }
    return isSaveOrUpdate;
  }

  doesProjectLevelFormNeedToBeSavedOrUpdated() {
    let isSave;
    let isUpdate;
    let isSaveOrUpdate;

    const { formValues, previousProjectData } = this.props;
    const { projectType, constructionType } = this.props.params;

    const currentFormCurrentProjectValues = formValues.projectValues;
    const savedFormCurrentProjectValues = previousProjectData.formValues.projectValues;

    if (!isEqual(currentFormCurrentProjectValues, savedFormCurrentProjectValues )) {
      // Form has been updated -  dispatch update action
      isSaveOrUpdate = {
        isUpdate: true
      }
      return isSaveOrUpdate; // if project values are different then, we dont need to query form values at all
    }

    let FormValues = findWhere(panelValues[VALUES], {projectType: projectType});

    if (projectType === STREET) {
      FormValues = findWhere(panelValues[STREET][VALUES], {constructionType: constructionType});
    }

    // intermodal work-around
    if(FormValues === undefined) {
        if (!!savedFormCurrentProjectValues) {
          isSaveOrUpdate = {
            isUpdate: true
          }
        } else {
          isSaveOrUpdate = {
            isSave: true
          }
        }
        return isSaveOrUpdate;
    }

    let projectLevelForms = FormValues[PROJECT_LEVEL_COLUMNS];

    // Combine traffic + global Form inputs into one
    let currentTrafficFormValues = {};
    let savedTrafficFormValues = {};

    if(formValues && projectLevelForms) {
      each(formValues.forms, function(values, form) {
        if (projectLevelForms.indexOf(form) !== -1) {
          extend(currentTrafficFormValues, values.formValues);
        }
      })

      each(previousProjectData.formValues.forms, function(values, form) {
        if (projectLevelForms.indexOf(form) !== -1) {
          extend(savedTrafficFormValues, values.formValues);
        }
      })
    }

    const currentTrafficFormVFields = keys(currentTrafficFormValues);
    const savedTrafficFormVFields = keys(savedTrafficFormValues);

    if (keys(currentTrafficFormValues).length === keys(savedTrafficFormValues).length) {
       // are the keys Deep Equal
       if (isEqual(currentTrafficFormVFields,savedTrafficFormVFields )) {
        // yes - Deep Euqual the Traffic Form
         if (isEqual(currentTrafficFormValues,savedTrafficFormValues )) {
          isSave = true;
         } else {
          isUpdate = true;
         }

       } else {
         // differnt keys were updated, (still same number of keys though )
         isSave = true;
       }
    } else {
      // if length went down, then updated
      if (savedTrafficFormVFields.length > currentTrafficFormVFields.length) {
         isUpdate = true;
      } else {
        // find common keys and check if same value
        let commonInputs =  currentTrafficFormVFields.filter(function(n) {
           return savedTrafficFormVFields.indexOf(n) !== -1;
        });

        let formDifferent = false;
        each(commonInputs, function(input) {
          if (!isEqual(currentTrafficFormValues[input], savedTrafficFormValues[input])) {
             formDifferent = true;
          }
        })
        if (formDifferent) {
          isUpdate = true;
        } else {
          isSave = true;
        }
      }
    }

    if (isSave) {
      isSaveOrUpdate = {
        isSave: true
      }
    } 

    if (isUpdate) {
      isSaveOrUpdate = {
        isUpdate: true
      }
    }

    return isSaveOrUpdate;
  }

  doesPavementStructureFormNeedToBeSavedOrUpdated() {
    let isSave;
    let isUpdate;
    let isSaveOrUpdate = {};
    const { formValues, previousProjectData, pavementStructureType  } = this.props;
    const { projectType, constructionType } = this.props.params;
    const currentFormCurrentProjectValues = formValues.projectValues;
    const savedFormCurrentProjectValues = previousProjectData.formValues.projectValues;
    let pavementStrutureForms;

    if (projectType === STREET) {
      const values = panelValues[STREET][VALUES];
      const FormValues = findWhere(values, {constructionType: constructionType});
      if (constructionType === CONCRETE) {
        pavementStrutureForms = FormValues[PAVEMENTS_STRUCTURE_COLUMNS][pavementStructureType];  // tihs is an array
      } else if (constructionType === OVERLAY || constructionType === NEW_COMPOSITE) {
        pavementStrutureForms = FormValues[PAVEMENTS_STRUCTURE_COLUMNS]; // this is an object now
      }
      
    } else if (projectType === PARKING) {
       const FormValues = findWhere(panelValues[VALUES], {projectType: PARKING});
       pavementStrutureForms = FormValues[PAVEMENTS_STRUCTURE_COLUMNS]; // tihs is an array
    }
    
    if (!isEqual(currentFormCurrentProjectValues, savedFormCurrentProjectValues )) {
      return isSaveOrUpdate; // if project values are different then, we dont need to query form values at all
    }


    let currentPavementFormValues = {};
    each(pavementStrutureForms, function(pvalues, pavementStructureOption) {
        currentPavementFormValues[pavementStructureOption] = {};
    })
    each(formValues.forms, function(values, form) {
      // Need to do different things for Concrete, Parking, Intermodal and Composite, overlay (since these modules dont share values between pavement structure forms)

      if ((projectType === STREET && constructionType === CONCRETE)  || projectType === PARKING) {
        if (pavementStrutureForms.indexOf(form) !== -1) {
          // for overlay and new compsoite, need to append forms Name to values
          extend(currentPavementFormValues, values.formValues);  
        }       
      } else { // for overlays and new composites
          each(pavementStrutureForms, function(pValues, pavementStructureOption) {
             if (pavementStrutureForms[pavementStructureOption].indexOf(form) !== -1) {
               extend(currentPavementFormValues[pavementStructureOption], values.formValues); 
             }
          })
      }
    })

    let savedPavementFormValues = {};
    each(pavementStrutureForms, function(pvalues, pavementStructureOption) {
        savedPavementFormValues[pavementStructureOption] = {};
    })
    each(previousProjectData.formValues.forms, function(values, form) {
      if ((projectType === STREET && constructionType === CONCRETE)  || projectType === PARKING) {
        if (pavementStrutureForms.indexOf(form) !== -1) {
          extend(savedPavementFormValues, values.formValues);  
        }
      } else {
         each(pavementStrutureForms, function(pValues, pavementStructureOption) {
          if (pavementStrutureForms[pavementStructureOption].indexOf(form) !== -1) {
            extend(savedPavementFormValues[pavementStructureOption], values.formValues); 
          }
        })
      }
    });

    let isSaveOrUpdateOption = {};

    if (((projectType === STREET && constructionType === CONCRETE)  || projectType === PARKING)) {
      isSaveOrUpdateOption = this.checkPavementStructureOptions(currentPavementFormValues, savedPavementFormValues);  
    } else {
      let self = this;
      each(currentPavementFormValues, function(values, option) {
         extend(isSaveOrUpdateOption, self.checkPavementStructureOptions(currentPavementFormValues[option], savedPavementFormValues[option]));
      })
    }

    extend(isSaveOrUpdate, isSaveOrUpdateOption);
    return isSaveOrUpdate;
  }

  onSaveProject() {
    const { formType, constructionType, projectType } = this.props.params;
    const { isUserSignedIn,
            currentProjectName,
            currentProjectType,
            currentProjectUnitType,
            formValues,
            previousProjectData,
            currentProjectId,
            currentProjectDescription,
            currentProjectRoute,
            currentProjectDesigner,
            currentProjectZipCode,
            currentProjectDateCreated,
            currentProjectLastModified,
            currentOwnersAgency,
            showModal,
            currentFolderId,
            showNonSignedInUserMessage} = this.props;
    let isFormPristine;
    let saveOrUpdate;
    
    // Need to remove certain properties form project Details before comparison is made to previousProjectDetails
    let savedFormValues = extend({}, formValues);
    savedFormValues.projectDetails = omit(savedFormValues.projectDetails, 'projectFormType', 'lastModified', 'dateCreated');

    // Value is used to show folders to the users
    if (isUserSignedIn) {
      // First need to check if there is any difference betwen saved and current values. IF yes, then need to inspect values for different forms
        let sameForm = false;
        if (isEqual(savedFormValues, previousProjectData.formValues)) {
          sameForm = true;
        } 

        if(sameForm) {
           const messageShownToUser = 'You have not changed anything since your last save';
           this.props.addNotification(messageShownToUser, 'warning', 5, messageShownToUser);
           return;
        }

        saveOrUpdate = this.doesProjectLevelFormNeedToBeSavedOrUpdated();

        if (formType === PAVEMENT_STRUCTURE_FORM || formType === SUMMARY_FORM ) {
            extend(saveOrUpdate, this.doesPavementStructureFormNeedToBeSavedOrUpdated());
        }

      // Need to know when to show 2 different modals 1) IF user overided data, then show confirmation modal  2) if user adds data, then just show save modal
      let getProjectTypeFromRouter;
      if (projectType === PARKING || projectType === NEW_COMPOSITE || projectType === INTERMODAL) {
        getProjectTypeFromRouter = saveProjectTypesFromFormTypes[projectType]
      } else if (projectType === STREET ) {
        getProjectTypeFromRouter = saveProjectTypesFromFormTypes[constructionType]
      }

      let projectValues = 
        { name          : currentProjectName, 
          folderId      : currentFolderId,
          folderName    : this.getFolderName(currentFolderId),
          id            : currentProjectId, 
          unitType      : currentProjectUnitType,
          description   : currentProjectDescription,
          route         : currentProjectRoute,
          designer      : currentProjectDesigner,
          zipCode       : currentProjectZipCode,
          dateCreated   : currentProjectDateCreated,
          lastModified  : currentProjectLastModified,
          ownersAgency  : currentOwnersAgency,
          body          : JSON.stringify(formValues)
        };

      // need to account for if user had saved as a differnt project Type and now is trying to save with a different type
      let projectTypeToSaveWith;
      
      // If project has been saved, then compare saved Project Type and current route
      if (currentProjectId) {
        if (currentProjectType !== getProjectTypeFromRouter ) {
          projectTypeToSaveWith = getProjectTypeFromRouter;
        } else {
          projectTypeToSaveWith = currentProjectType;
        }
      } else {
        projectTypeToSaveWith = getProjectTypeFromRouter;
      }

      extend(projectValues, {projectType: projectTypeToSaveWith});
      
        // If a project has been saved before, then user needs to choose between save and overwrite. If project has not been saved before, then user needs to save
        if (currentProjectId) {
            if (saveOrUpdate.isUpdate) {
                showModal(OVERWRITE_MODAL, null, OVERWRITE_SAVE ,projectValues);
            }
            else if (saveOrUpdate.isSave) {
                showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN ,projectValues);
            }
        } else {
         showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues);
      }
    } else {
      showNonSignedInUserMessage(true);
      // Need to know when to show 2 different modals 1) IF user overided data, then show confirmation modal  2) if user adds data, then just show save modal
      let getProjectTypeFromRouter;
      if (projectType === PARKING || projectType === NEW_COMPOSITE || projectType === INTERMODAL) {
        getProjectTypeFromRouter = saveProjectTypesFromFormTypes[projectType]
      } else if (projectType === STREET ) {
        getProjectTypeFromRouter = saveProjectTypesFromFormTypes[constructionType]
      }

      // At this point, only formValues and projectType need to be passed along. Project Name and Folder Id will be added  in UserProjectsConfirmation model
      let projectValues = 
        { projectType: getProjectTypeFromRouter,
          unitType   : currentProjectUnitType,
          body: JSON.stringify(formValues)
        };
      showModal(SIGN_IN_MODAL, null, null, null, showModal.bind(this, USER_PROJECTS_CONFIRMATION_MODAL, null, SAVE_DESIGN , projectValues));
    }
  }


  focusInputs(inputsToBeFocussed) {
    const self= this;
    if (inputsToBeFocussed && inputsToBeFocussed.length > 0) {
      each(inputsToBeFocussed, function(inputArray) {
        const form = inputArray[0];
        const input = inputArray[1]
        self.props.focus(form, input);
      })
    }
  }

  showErrors(routerLeaveValidationObj) {
    let messageShownToUser;
    if (routerLeaveValidationObj[IS_FORM_INVALID]) {
       messageShownToUser = 'You cannot move onto the next step without filling out all the inputs';
       this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
    } else if (routerLeaveValidationObj[ARE_ERRORS_PRESENT]) {
       messageShownToUser = 'You have errors in the forms. You cannot move on without correcting these errors';
       this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
    }
  }

  navigatetoProjectPanelsPage() {
     let linkObject;
     let link;
     const { projectType } = this.props.params;
    if (projectType === PARKING || projectType === INTERMODAL) {
      link = `/${PROJECT_TYPES}`
    } else {
      link = `/${PROJECT_TYPES}/${projectType}`
    }
    linkObject = ({ pathname: link, state: { transition: 'slideIn' }});
    this.props.router.push(linkObject)
  }

  navigateToProjectLevelPage() {
    const { projectType, constructionType } = this.props.params;
    let link;
    if (projectType === PARKING || projectType === INTERMODAL) {
      link = `/${PROJECT_TYPES}/${projectType}/${PROJECT_LEVEL_FORM}`;
    } else {
     link = `/${PROJECT_TYPES}/${projectType}/${constructionType}/${PROJECT_LEVEL_FORM}`;    
    }

    this.props.router.push(link);
  }

  getFolderName(folderId) {

    const folderObject = find(this.props.folders, function(folder) {
      return folder.id === folderId;
    })

    if (!folderObject) {
      return null;
    }

    if (folderObject.name === 'root') {
      return 'Project Folder';
    }

    return folderObject.name;
  }

  navigateToSummaryPage() {
    let pavementStructureRouterLeaveValdiationObject;
    const { projectType, constructionType } = this.props.params;
    const { pavementStructureType, router } = this.props;
    let link;
    const parkingOrIntermodalLink = `/${PROJECT_TYPES}/${projectType}/${SUMMARY_FORM}`;  
    const streetSummaryLink = `/${PROJECT_TYPES}/${projectType}/${constructionType}/${SUMMARY_FORM}/${pavementStructureType}`;

    if (projectType ===  STREET) {
      if (constructionType === NEW_COMPOSITE) {
        pavementStructureRouterLeaveValdiationObject = newCompositePavementStructureFormRouterLeaveValidation(this.props);
      } else if  (constructionType === CONCRETE) {
        pavementStructureRouterLeaveValdiationObject = concretePavementStructureFormRouterLeaveValidation(this.props);
      } else if  (constructionType === OVERLAY) {
        pavementStructureRouterLeaveValdiationObject = overlayPavementStructureFormRouterLeaveValidation(this.props);
      } 
    } else if (projectType === PARKING) {
      pavementStructureRouterLeaveValdiationObject = parkingPavementStructureFormRouterLeaveValidation(this.props);
    } else if (projectType === INTERMODAL) {
      pavementStructureRouterLeaveValdiationObject = intermodalPavementStructureFormRouterLeaveValidation(this.props);
    } 
    
    if (!pavementStructureRouterLeaveValdiationObject) {
      return;
    }

    let inputsToBeFocussed =  pavementStructureRouterLeaveValdiationObject[INPUTS_TO_BE_FOCUSSED];
    this.focusInputs(inputsToBeFocussed);

    if (pavementStructureRouterLeaveValdiationObject[IS_FORM_INVALID] || pavementStructureRouterLeaveValdiationObject[ARE_ERRORS_PRESENT]) {
      this.showErrors(pavementStructureRouterLeaveValdiationObject);
      return;
    } else {
      // If user is going to Summary Form from Pavement Structure Form
      if (projectType === PARKING || projectType === INTERMODAL) {
       link = parkingOrIntermodalLink;    
      } else {
        // For modules which are not parking or newComposite
        link = streetSummaryLink
      } 
    }

    router.push(link);
  }

navigateToPavementStructurePage() {

    const { projectType, constructionType, formType } = this.props.params;
    const { router, intermodalSelectedVehicles } = this.props;
    let link;
    let projectLevelRouterLeaveValdiationObject;
    
    const parkingOrIntermodalLink = `/${PROJECT_TYPES}/${projectType}/${PAVEMENT_STRUCTURE_FORM}`;
    const streetPavementStructureLink = `/${PROJECT_TYPES}/${projectType}/${constructionType}/${PAVEMENT_STRUCTURE_FORM}`;  

    if (projectType ===  STREET) {
      if (constructionType === NEW_COMPOSITE) {
         projectLevelRouterLeaveValdiationObject = newCompositeProjectLevelRouterLeaveValidation(this.props);
      } else if  (constructionType === CONCRETE) {
         projectLevelRouterLeaveValdiationObject = concreteProjectLevelRouterLeaveValidation(this.props);
      } else if  (constructionType === OVERLAY) {
         projectLevelRouterLeaveValdiationObject = overlayProjectLevelRouterLeaveValidation(this.props);
      } 
    } else if (projectType === PARKING) {
      projectLevelRouterLeaveValdiationObject = parkingProjectLevelRouterLeaveValidation(this.props);
    }

    // For intermodal, as long as user has chosen one vehicle on Project Level page, he can continue to pavement structure form
    if (projectType === INTERMODAL) {
      if (intermodalSelectedVehicles.length > 0) {
        link = parkingOrIntermodalLink;
        router.push(link);
      } else {
        let message = 'Choose at least one vehicle to move onto Pavement Structure Page'
        this.props.addNotification(message, 'error', 5, message);
        return;
      }
    }
    
    if (!projectLevelRouterLeaveValdiationObject) {
      return;
    }

    if (formType === PROJECT_LEVEL_FORM) {
      let inputsToBeFocussed = projectLevelRouterLeaveValdiationObject[INPUTS_TO_BE_FOCUSSED];
      this.focusInputs(inputsToBeFocussed);
      if (projectLevelRouterLeaveValdiationObject[IS_FORM_INVALID] || projectLevelRouterLeaveValdiationObject[ARE_ERRORS_PRESENT]) {
        this.showErrors(projectLevelRouterLeaveValdiationObject);
        return;
      } else {
      // No errors when going from ProjectLevelForm to PavementStructureForm
       link = projectType === PARKING ? parkingOrIntermodalLink : streetPavementStructureLink;
     }
    } else {
      // If I am going to Pavement Structure Form from Summary Form or i am on Pavement Structure Form and i click on Pavement Structure Form 
      link = projectType === PARKING ? parkingOrIntermodalLink : streetPavementStructureLink;
   }
  
    router.push(link);
  }
 
  render() {
    const { formType } = this.props;

    if (!formType) {
        return null;
    }

    if (formType === PROJECT_LEVEL_FORM) {
      return (
         <div className='footer' style={{ zIndex: 100,  display: 'flex', alignItems: 'center'}}>
            <button onClick={this.navigatetoProjectPanelsPage.bind(this)} style={{backgroundColor: "#3299CC", color: "white", display: 'flex', alignItems: 'center'}} className='btn btn-primary'> 
            <i className='fa fa-chevron-left' style={{paddingRight: 10}} ></i>
            <div>Change Design Type</div>
            </button>
            <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>                    
                      <div className='nav-text'>Privacy Policy</div>
                  </a> 
            </div>

            <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                    <div className='nav-text'>Terms of Service</div>
                </a>
            </div>
          <div style={{display: "flex"}}>
              <button onClick={this.onSaveProject.bind(this)} className='btn btn-primary' style={{backgroundColor: "#669900", color: "white", marginRight: 10, paddingLeft: 20, paddingRight: 20}}>SAVE</button>
               <button onClick={this.navigateToPavementStructurePage.bind(this)} className='btn btn-primary' style={{backgroundColor: "#3299CC", color: "white"}} >PAVEMENT STRUCTURE</button>
            </div>
        </div>
      )    
    } else if (formType === PAVEMENT_STRUCTURE_FORM) {
      return (
         <div className='footer' style={{zIndex: 100,  display: 'flex', alignItems: 'center'}}>
              <button onClick={this.navigateToProjectLevelPage.bind(this)} style={{ backgroundColor: "#3299CC", color: "white" }} className='btn btn-primary'>Project Level</button>  
              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Privacy Policy</div>
                  </a>
              </div>

              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Terms of Service</div>
                  </a>
              </div>
           <div style={{display: "flex"}}>
              <button onClick={this.onSaveProject.bind(this)} style={{backgroundColor: "#669900", color: "white", marginRight: 10}} className='btn btn-primary'>SAVE</button>
          <button onClick={this.navigateToSummaryPage.bind(this)} style={{backgroundColor: "#3299CC", color: "white"}} className='btn btn-primary' >DESIGN SUMMARY</button>
            </div> 
        </div>
      )
    } else if (formType === SUMMARY_FORM) {
      return (
        <div className='footer'  style={{paddingRight: 49, paddingLeft: 49, zIndex: 100,  display: 'flex', alignItems: 'center'}}>
              <button onClick={browserHistory.goBack} style={{ backgroundColor: "#3299CC", color: "white" }} className='btn btn-primary'>PAVEMENT STRUCTURE</button> 
              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Privacy Policy</div>
                  </a>
              </div>

              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Terms of Service</div>
                  </a>
              </div>
          <div style={{display: "flex"}}>
            <div style={{display: "flex"}}>
            <button  onClick={this.onSaveProject.bind(this)} style={{backgroundColor: "#669900", color: "white", marginRight: 10, paddingLeft: 20, paddingRight: 20}} className='btn btn-primary'>SAVE</button>
            <button onClick={this.onGenerateButtonClick.bind(this, this.context.summaryContext)} style={{backgroundColor: "#3299CC", color: "white"}} className='btn btn-primary'>GENERATE REPORT</button>
          </div> 
          </div> 
        </div>
      )
    } else if (formType === 'pavementTypeForm') {
      return (
          <div className='footer' style={{ zIndex: 100, display: 'flex', alignItems: 'center' }}>
              <button onClick={this.navigateToProjectLevelPage.bind(this)} style={{ backgroundColor: "#3299CC", color: "white" }} className='btn btn-primary'>Project Level</button>  
        
              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Privacy Policy</div>
                  </a>
              </div>

              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Terms of Service</div>
                  </a>
              </div>
              <div style={{ display: "flex" }}></div>
         
        </div>
      )
    } else if (formType === 'MyProjects') {
      return (
          <div className='footer' style={{ zIndex: 100, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: "flex" }}></div>
              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Privacy Policy</div>
                  </a>
              </div>

              <div style={{ display: "flex" }}>
                  <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                      <div className='nav-text'>Terms of Service</div>
                  </a>
              </div>
              <div style={{ display: "flex" }}></div>
          </div>
      )
    }   
  }
}

// For New Composite section, type needs to gathered from the redux store and appended to the url
function mapStateToProps(state, ownProps) {
  let pavementStructureType;
  let intermodalSelectedVehicles;

  const isUserSignedIn               = state.auth.authenticated;
  const currentProjectName           = state.currentProject.projectDetails.name;
  const currentProjectType           = state.currentProject.projectDetails.projectType;
  const currentProjectUnitType       = state.currentProject.projectDetails.unitType;
  const currentProjectId             = state.currentProject.projectDetails.id;
  const currentFolderId              = state.currentProject.projectDetails.folderId;
  const currentProjectDescription    = state.currentProject.projectDetails.description;

  const currentProjectRoute          = state.currentProject.projectDetails.route;
  const currentProjectDesigner       = state.currentProject.projectDetails.designer;
  const currentProjectZipCode        = state.currentProject.projectDetails.zipCode;
  const currentProjectDateCreated    = state.currentProject.projectDetails.dateCreated;
  const currentProjectLastModified   = state.currentProject.projectDetails.lastModified;
  const currentOwnersAgency          = state.currentProject.projectDetails.ownersAgency;

  const folders = state.userFolders.folders;

  const { projectType, constructionType,  } = ownProps.params;

  if(projectType === INTERMODAL) {
    intermodalSelectedVehicles =  state.currentProject.intermodalFormValues.selectedVehicles;
  }
  //Traffic Form
  let trafficFormSelector;
  let trucksPerDay;
  let trafficGrowthRate;
  let directionalDistribution;
  let designLaneDistribution;
  let trafficSpectrumDropdown;
  let trafficFormInputsDropdown;
  let designLife;
  let isTrafficFormPristine;
  let trafficFormErrors;
  let trafficForm;
  let trafficFormInputDropdown;

  // Global Form
  let globalForm;
  let globalFormSelector;
  let percentageOfSlabs;
  let isGlobalFormPristine;
  let globalFormErrors;
  let reliability;

  // Mrsg form
  let mrsgForm;
  let structureLayerForm;
  let parkingPavementStructureTableRowChosen;
  let mrsgFormSelector;
  let structureFormSelector;
  let compositeKValueRadioButtonValue;
  let userDefinedCompositeKValue;
  let showCompositeKValueRadioButton;
  let californiaBearingRatio;
  let inputMrsgValue;
  let resistanceValue;
  let subgradeDropdown;
  let structureDropdown;
  let mrsgFormErrors;

  //Flexural Output Form 
  let flexuralOutputForm;
  let flexuralOutputFormSelector;
  let compressiveStrength;
  let splitTensileStrength;
  let twentyEightDayFlexStrength;
  let concreteModulusOfElasticity;
  let concreteDropdown;
  let structureFormValues;
  let structureLayerMembers;

  let flexOutputFormErrors;
  let structureLayerFormErrors;
  let isFlexOutputFormPristine;
  let isMrsgFormPristine;
  let isStructureLayersFormPristine;
  let isPavementFormPristine;

  //New Composite Pavement Structure Form - These need separate form names because they are different from every other part of the app
  let newCompositeOtherSurfaceLayerForm;
  let newCompositeOtherSubgradeForm;
  let newCompositeOtherStructureForm;

  let newCompositeOtherSurfaceLayerFormSelector;
  let newCompositeOtherSubgradeFormSelector;
  let newCompositeOtherStructureFormSelector;

  let newCompositeOtherStructureFormErrors;
  let newCompositeOtherSurfaceLayerFormErrors;
  let newCompositeOtherSubgradeFormErrors;

  let surfaceLayerPoissonsRatio;
  let otherSurfaceModulusOFElasticity;
  let surfaceLayerThickness;
  let allowableDamagePerLayer;

  let subgradePoissonsRatio;
  let otherSubgradeModulusOFElasticity;
  let thicknessToRigidFoundation;

  // only for Overlay Module
  let existingThickness;
  let timeToLive;
  let durabilityAdjustmentFactor;
  let fatigueAdjustmentFactor;

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

  // If a module does not have a traffic form, then no need to grab any values from the redux store
  // if (!trafficForm && projectType) {
  //   return {};
  // }

  if (trafficForm) {
    trafficFormSelector = formValueSelector(trafficForm);
    trucksPerDay = trafficFormSelector(state, TRUCKS_PER_DAY);
    trafficGrowthRate = trafficFormSelector(state, TRAFFIC_GROWTH_RATE);
    directionalDistribution = trafficFormSelector(state, DIRECTIONAL_DISTRIBUTION);
    designLaneDistribution = trafficFormSelector(state, DESIGN_LANE_DISTRIBUTION);
    trafficSpectrumDropdown = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    trafficFormInputsDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    designLife = trafficFormSelector(state, DESIGN_LIFE);
    isTrafficFormPristine = isPristine(trafficForm)(state);
    trafficFormErrors = getFormSyncErrors(trafficForm)(state);   
  }

  // Having a global form is not necessary for all modules
  if (globalForm) {
    globalFormSelector = formValueSelector(globalForm);
    reliability = globalFormSelector(state, RELIABILITY);
    percentageOfSlabs = globalFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);
    isGlobalFormPristine = isPristine(globalForm)(state);
    globalFormErrors = getFormSyncErrors(globalForm)(state);   
  }

  if (projectType ===  STREET && constructionType === CONCRETE) {
    trafficFormInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
  }

  //only parking has global inputs
  if (projectType === PARKING) {
    reliability = trafficFormSelector(state, RELIABILITY);
    percentageOfSlabs = trafficFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);  
  }
 
  if (projectType ===  STREET) {
    if (constructionType === NEW_COMPOSITE) {
      pavementStructureType = state.currentProject.newCompositeFormValues.type
      if (pavementStructureType === JPCP) {
        mrsgForm = NEW_COMPOSITE_JPCP_SUBGRADE_FORM;
        structureLayerForm = NEW_COMPOSITE_JPCP_STRUCTURE_FORM;
        flexuralOutputForm = NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM;
        showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.jpcpShowCompositeKValueRadioButton;
      } else if (pavementStructureType === RCC) {
        mrsgForm = NEW_COMPOSITE_RCC_SUBGRADE_FORM;
        structureLayerForm = NEW_COMPOSITE_RCC_STRUCTURE_FORM;
        flexuralOutputForm = NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM;
        showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.rccShowCompositeKValueRadioButton;
      } else if (pavementStructureType === HDG) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_HMA_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_HMA_STRUCTURE_FORM
      } else if (pavementStructureType === BST) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_BST_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_BST_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_BST_STRUCTURE_FORM
      } else if (pavementStructureType === NEW_COMPOSITE_OTHER) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_OTHER_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_OTHER_STRUCTURE_FORM
      }
    } else if (constructionType === CONCRETE) {
      mrsgForm = CONCRETE_SUBGRADE_FORM;
      structureLayerForm = CONCRETE_STRUCTURE_FORM;
      flexuralOutputForm = CONCRETE_CONCRETE_FORM;
      pavementStructureType = state.currentProject.concreteFormValues.pavementStructureType;
      showCompositeKValueRadioButton = state.currentProject.concreteFormValues.showCompositeKValueRadioButton;
    } else if (constructionType === OVERLAY) {
      pavementStructureType = state.currentProject.overlayFormValues.pavementStructureType;
      if (pavementStructureType === UNBONDED_ASPHALT) {
        mrsgForm = OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM;
        structureLayerForm = OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedAsphaltShowCompositeKValueRadioButton;
      } else if (pavementStructureType === UNBONDED_CONCRETE) {
        mrsgForm = OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM;
        structureLayerForm = OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedConcreteShowCompositeKValueRadioButton;
      } else if (pavementStructureType === BONDED_CONCRETE) {
        mrsgForm = OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM;
        structureLayerForm = OVERLAY_BONDED_CONCRETE_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_BONDED_CONCRETE_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.bondedConcreteShowCompositeKValueRadioButton;
      } 
    } 
  } else if (projectType === PARKING) {
    mrsgForm = PARKING_SUBGRADE_FORM;
    structureLayerForm = PARKING_SUBBASE_FORM;
    flexuralOutputForm = PARKING_CONCRETE_FORM;
    showCompositeKValueRadioButton = state.currentProject.parkingFormValues.showCompositeKValueRadioButton;  
    parkingPavementStructureTableRowChosen =  state.currentProject.parkingFormValues.parkingPavementStructureTableRowChosen; 
  } else if (projectType === INTERMODAL) {
    mrsgForm = INTERMODAL_SUBGRADE_FORM;
    structureLayerForm = INTERMODAL_STRUCTURE_FORM;
    flexuralOutputForm = INTERMODAL_CONCRETE_FORM;
    showCompositeKValueRadioButton = state.currentProject.intermodalFormValues.showCompositeKValueRadioButton;
  }
  // For eveything except new Composite Other forms
  if (mrsgForm && structureLayerForm && flexuralOutputForm) {
    mrsgFormSelector = formValueSelector(mrsgForm);
    structureFormSelector = formValueSelector(structureLayerForm);
    flexuralOutputFormSelector = formValueSelector(flexuralOutputForm);

    if (projectType ===  STREET && constructionType === OVERLAY) {
      if (pavementStructureType === UNBONDED_CONCRETE || pavementStructureType === BONDED_CONCRETE) {
        existingThickness = mrsgFormSelector(state, EXISTING_THICKNESS);
        timeToLive = mrsgFormSelector(state, JOINT_CRACKING_TIME_TO_LIVE);
      }
      if (pavementStructureType === BONDED_CONCRETE) {
        durabilityAdjustmentFactor = mrsgFormSelector(state, DURABILITY_ADJUSTMENT_FACTOR);
        fatigueAdjustmentFactor = mrsgFormSelector(state, FATIGUE_ADJUSTMENT_FACTOR);
      }
    }

    compositeKValueRadioButtonValue = structureFormSelector(state, COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE);
    userDefinedCompositeKValue = structureFormSelector(state, USER_DEFINED_COMPOSITE_K_VALUE);

    // New Compsite has global inputs in structure layers form and user defined k values in mrsg form
    if (projectType ===  STREET && constructionType === NEW_COMPOSITE) {
      reliability = mrsgFormSelector(state, RELIABILITY);
      percentageOfSlabs = mrsgFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);
    }


    californiaBearingRatio = mrsgFormSelector(state, CALIFORNIA_BEARING_RATIO);
    inputMrsgValue = mrsgFormSelector(state, INPUT_MRSG_VALUE);
    californiaBearingRatio = mrsgFormSelector(state, CALIFORNIA_BEARING_RATIO);
    resistanceValue = mrsgFormSelector(state, RESISTANCE_VALUE);
    subgradeDropdown = mrsgFormSelector(state, SUBGRADE_DROPDOWN);

    //Flexural Output Form
    compressiveStrength = flexuralOutputFormSelector(state, COMPRESSIVE_STREGTH);
    splitTensileStrength = flexuralOutputFormSelector(state, SPLIT_TESILE_STRENGTH);
    twentyEightDayFlexStrength = flexuralOutputFormSelector(state, TWENTYEIGHTDAY_FLEX_STRENGTH);
    concreteModulusOfElasticity = flexuralOutputFormSelector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    concreteDropdown = flexuralOutputFormSelector(state, CONCRETE_DROPDOWN);

    structureFormValues = getFormValues(structureLayerForm)(state);
    structureLayerMembers = structureFormSelector(state, STRUCTURE_LAYER_MEMBERS);

    //Struture Form
    flexOutputFormErrors = getFormSyncErrors(flexuralOutputForm)(state);
    structureLayerFormErrors = getFormSyncErrors(structureLayerForm)(state);
    mrsgFormErrors = getFormSyncErrors(mrsgForm)(state);

    isFlexOutputFormPristine = isPristine(flexuralOutputForm)(state);
    isMrsgFormPristine = isPristine(mrsgForm)(state);
    isStructureLayersFormPristine = isPristine(structureLayerForm)(state);
    isPavementFormPristine = isMrsgFormPristine && isStructureLayersFormPristine && isFlexOutputFormPristine 
  }

  if (newCompositeOtherSurfaceLayerForm && newCompositeOtherSubgradeForm && newCompositeOtherStructureForm ) {
    newCompositeOtherSurfaceLayerFormSelector = formValueSelector(newCompositeOtherSurfaceLayerForm);
    newCompositeOtherSubgradeFormSelector = formValueSelector(newCompositeOtherSubgradeForm);
    newCompositeOtherStructureFormSelector = formValueSelector(newCompositeOtherStructureForm);

    surfaceLayerPoissonsRatio = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_POISSONS_RATIO);
    otherSurfaceModulusOFElasticity = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_LAYER_MODULUS_ELASTICITY);
    surfaceLayerThickness = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_LAYER_THICKNESS);
    allowableDamagePerLayer = newCompositeOtherSurfaceLayerFormSelector(state, ALLOWABLE_DAMAGE_PER_LAYER);

    newCompositeOtherStructureFormErrors = getFormSyncErrors(newCompositeOtherStructureForm)(state);
    newCompositeOtherSurfaceLayerFormErrors = getFormSyncErrors(newCompositeOtherSurfaceLayerForm)(state);
    newCompositeOtherSubgradeFormErrors = getFormSyncErrors(newCompositeOtherSubgradeForm)(state);

    subgradePoissonsRatio = newCompositeOtherSubgradeFormSelector(state, SUBGRADE_POISSONS_RATIO);
    otherSubgradeModulusOFElasticity = newCompositeOtherSubgradeFormSelector(state, SUBGRADE_MODULUS_OF_ELASTICITY);
    thicknessToRigidFoundation = newCompositeOtherSubgradeFormSelector(state, THICKNESS_TO_RIGID_FOUNDATION);
    
    structureLayerMembers = newCompositeOtherStructureFormSelector(state, STRUCTURE_LAYER_MEMBERS);
  }

    // Saving a project
    // Need to return forms present + values in those forms
    // Also, need to return currentProjet 
    const allFormsPresentInProject = getFormNames()(state);
    let formValues = {};
    let formValuesNow = {};
    let moduleForms;
    let projectValuesToSave;
   
    if (projectType === STREET) {
      if (constructionType === CONCRETE) {
        projectValuesToSave = 'concreteFormValues';
        moduleForms = formsPresentInDifferentModules[CONCRETE];
      } else if (constructionType === OVERLAY) {
        projectValuesToSave = 'overlayFormValues';
        moduleForms = formsPresentInDifferentModules[OVERLAY];
      } else if (constructionType === NEW_COMPOSITE) {
        projectValuesToSave = 'newCompositeFormValues';
        moduleForms = formsPresentInDifferentModules[NEW_COMPOSITE];
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
    const previousProjectData =  PreviousProjectStateSelector(state);

  return {
     trafficForm,
     globalForm,
     trucksPerDay,
     trafficGrowthRate,
     directionalDistribution,
     designLaneDistribution,
     trafficSpectrumDropdown,
     trafficFormInputsDropdown,
     designLife,
     reliability,
     percentageOfSlabs,
     isTrafficFormPristine,
     isGlobalFormPristine,
     trafficFormErrors,
     globalFormErrors,
     isPavementFormPristine,
     structureLayerMembers,
     concreteModulusOfElasticity,
     flexOutputFormErrors,
     structureFormValues,
     concreteDropdown,
     californiaBearingRatio,
     twentyEightDayFlexStrength,
     compressiveStrength,
     splitTensileStrength,
     mrsgForm,
     structureLayerForm,
     flexuralOutputForm,
     structureLayerFormErrors,
     compositeKValueRadioButtonValue,
     userDefinedCompositeKValue,
     parkingPavementStructureTableRowChosen,
     showCompositeKValueRadioButton,
     inputMrsgValue,
     resistanceValue,
     subgradeDropdown,
     structureDropdown,
     mrsgFormErrors,
     pavementStructureType,
     trafficFormInputDropdown,
     existingThickness,
     timeToLive,
     durabilityAdjustmentFactor,
     fatigueAdjustmentFactor,
     isUserSignedIn,
     currentProjectName,
     currentProjectType,
     currentProjectUnitType,
     currentProjectId,
     formValues,
     previousProjectData,
     currentProjectDescription,
     currentOwnersAgency,
     currentProjectRoute,
     currentProjectDesigner,
     currentProjectZipCode,
     currentProjectDateCreated,
     currentProjectLastModified,
     currentFolderId,
     folders,
     surfaceLayerPoissonsRatio,
     otherSurfaceModulusOFElasticity,
     surfaceLayerThickness,
     allowableDamagePerLayer,
     subgradePoissonsRatio,
     otherSubgradeModulusOFElasticity,
     thicknessToRigidFoundation,
     newCompositeOtherSurfaceLayerForm,
     newCompositeOtherSubgradeForm,
     newCompositeOtherStructureForm,
     newCompositeOtherStructureFormErrors,
     intermodalSelectedVehicles,
     newCompositeOtherSurfaceLayerFormErrors,
     newCompositeOtherSubgradeFormErrors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNotification: (message, level, autoDismiss, uid) => {
      dispatch(addNotification(message, level, autoDismiss, uid));
    },
    focus: (form, field) => {
      dispatch(touch(form, field));
    },
    saveProject: () => {
      dispatch(saveProject());
    },
    showModal: (modal, routingParams, module, projectParams, callback) => {
      dispatch(showModal(modal, routingParams, module, projectParams, callback))
    },
    showNonSignedInUserMessage: (boolean) => {
      dispatch(showNonSignedInUserMessage(boolean));
    },
  };
}

FooterForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterForm));

export default FooterForm;
