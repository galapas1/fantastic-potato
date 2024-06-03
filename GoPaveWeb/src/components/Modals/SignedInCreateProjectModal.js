import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ModalWrapper, ToggleButton } from 'Components';
import { initialize, touch, destroy, reset } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentProjectName,
         setCurrentProjectType,
         setCurrentProjectUnitType,
         setCurrentProjectRoute,
         setCurrentProjectDescription,
         setCurrentProjectOwnersAgency,
         setCurrentProjectZipCode,
         setCurrentProjectDesigner,
         setCurrentProjectId,
         setStateToInitialState,
         setConcreteProjectValues,
         setParkingProjectValues,
         setIntermodalProjectValues,
         setCompositeProjectValues,
         setOverlayProjectValues,
         addOrEditProject,
         setCurrentProjectFolderId,
         setCurrentProjectFormType } from 'Actions';
import { each, keys, find } from 'underscore';
import './Modals.scss';
import { saveProjectTypesFromCreateProjectModal, projectTypesToDisplayToUser } from 'Data/appValues';
import {
 CREATE_PROJECT,
 EDIT_PROJECT,
 PROJECT_LEVEL_FORM,
 PAVEMENT_STRUCTURE_FORM,
 SUMMARY_FORM,
 STREET,
 CONCRETE,
 NEW_COMPOSITE,
 OVERLAY,
 PARKING,
 INTERMODAL,
 METRIC,
 US
} from  'Constants';

const PROJECT_NAME             = 'projectName';
const PROJECT_UNIT_TYPE        = 'projectUnitType';
const PROJECT_DESCRIPTION      = 'projectDescription';
const PROJECT_ZIP_CODE         = 'projectZipCode';
const PROJECT_ROUTE            = 'projectRoute';
const PROJECT_DESIGNER         = 'projectDesigner';
const PROJECT_OWNERS_AGENCY    = 'projectOwnersAgency';
const SAVE_BUTTON_DISABLED     = 'saveButtonDisabled'
const SAME_NAME_ERROR          = 'sameNameError'
const DID_PROJECT_NAME_CHANGE  = 'didProjectNameChange';

const modalStyle = {
  width: 600,
  height: 500,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 10,
  display: 'table',
  textAlign: 'center'
}

class SignedInCreateProjectModal extends Component {

  constructor(props) {
    super(props);
    if (props.module === EDIT_PROJECT) {
      this.state = {
        [PROJECT_NAME]: `${props.projectValues.name}`,
        [PROJECT_DESIGNER]: `${props.projectValues.designer}`,
        [PROJECT_DESCRIPTION]: `${props.projectValues.description}`,
        [PROJECT_ZIP_CODE]: `${props.projectValues.zipCode}`,
        [PROJECT_OWNERS_AGENCY]: `${props.projectValues.ownersAgency}`,
        [PROJECT_UNIT_TYPE]: `${props.projectValues.unitType}`,
        [PROJECT_ROUTE]: `${props.projectValues.route}`,
        [SAVE_BUTTON_DISABLED]: true,
        [SAME_NAME_ERROR]: false,
        [DID_PROJECT_NAME_CHANGE]: false
      }
    } else if (props.module === CREATE_PROJECT) {
      this.state = {
        [PROJECT_NAME]: '',
        [PROJECT_DESIGNER]:'',
        [PROJECT_DESCRIPTION]: '',
        [PROJECT_ZIP_CODE]:'',
        [PROJECT_OWNERS_AGENCY]:'',
        [PROJECT_ROUTE]: '',
        [PROJECT_UNIT_TYPE]: US,
        [SAVE_BUTTON_DISABLED]: true,
        [SAME_NAME_ERROR]: false,
      }
    }
  }

  onConfimButtonClick() {
    const { setCurrentProjectName,
            setCurrentProjectDescription,
            setCurrentProjectZipCode,
            setCurrentProjectOwnersAgency,
            setCurrentProjectRoute,
            setCurrentProjectUnitType,
            setCurrentProjectType,
            setCurrentProjectId,
            setCurrentProjectDesigner,
            hideModal,
            router,
            module } = this.props;
    const { projectName } = this.state;
   
    const isProjectNameAlreadyPresent = this.isProjectNameAlreadyPresent(projectName);
    if (this.state[DID_PROJECT_NAME_CHANGE] && isProjectNameAlreadyPresent) {
       this.setState({[SAME_NAME_ERROR]: true});
       return;
    }
    //Need to set projectValues and project Details to initial state
    setStateToInitialState();

    const self = this;
    //Need to destroy current forms
    each(this.props.formsToDelete, function(form, formKey) {
     self.props.destroyForm(formKey); 
     self.props.destroyForm(formKey);   
    })

    // Any values set in popup are applied to redux store
    setCurrentProjectName          (this.state[PROJECT_NAME]);
    setCurrentProjectDesigner      (this.state[PROJECT_DESIGNER]);
    setCurrentProjectUnitType      (this.state[PROJECT_UNIT_TYPE]);
    setCurrentProjectDescription   (this.state[PROJECT_DESCRIPTION]);
    setCurrentProjectZipCode       (this.state[PROJECT_ZIP_CODE]);
    setCurrentProjectOwnersAgency  (this.state[PROJECT_OWNERS_AGENCY]);
    setCurrentProjectRoute         (this.state[PROJECT_ROUTE]);
    setCurrentProjectType          (saveProjectTypesFromCreateProjectModal[this.state.projectType]);

    // If a user starts a new project, we need to set Id to empty string
    if (module === CREATE_PROJECT) {
      setCurrentProjectId('');  
    }

    hideModal(); 
    router.push('/projectTypes');
  }

  onSaveProjectValues() {
    const { projectName,
            projectUnitType,
            projectDesigner,
            projectRoute,
            projectDescription,
            projectOwnersAgency,
            projectZipCode   } = this.state;
    const projectType = this.props.projectValues.projectType;
    const projectId = this.props.projectValues.id;
    const formValues = this.props.projectValues.body;
    let projectValues;

    const isProjectNameAlreadyPresent = this.isProjectNameAlreadyPresent(projectName);
    if (this.state[DID_PROJECT_NAME_CHANGE] && isProjectNameAlreadyPresent) {
       this.setState({[SAME_NAME_ERROR]: true});
    } else {
      console.log("SignedInCreateProjectModal - onSaveProjectValues - projectUnitType" + projectUnitType);
      projectValues =  { id            : projectId,
                         projectType   : projectType,
                         unitType      : projectUnitType,
                         name          : projectName,
                         description   : projectDescription,
                         route         : projectRoute,
                         designer      : projectDesigner,
                         zipCode       : projectZipCode,
                         ownersAgency  : projectOwnersAgency,
                         body          : formValues }
      this.props.addOrEditProject(projectValues, 'Update Design was successful');
        console.log("SignedInCreateProjectModal SAVE PROJ VALUES: " + projectUnitType);
       this.setState({[SAME_NAME_ERROR]: false});
    }
  }

  loadProject() {
    const { router,
            setStateToInitialState,
            setCurrentProjectName,
            setCurrentProjectZipCode,
            setCurrentProjectFormType,
            setCurrentProjectFolderId,
            setCurrentProjectDesigner,
            setCurrentProjectRoute,
            setCurrentProjectOwnersAgency,
            setCurrentProjectDescription,
            setOverlayProjectValues,
            setConcreteProjectValues,
            setCompositeProjectValues,
            setParkingProjectValues,
            setIntermodalProjectValues,
            setCurrentProjectId,
            setCurrentProjectType,
            setCurrentProjectUnitType,
            projectValues } = this.props;

    const { projectName,
            projectUnitType,
            projectDesigner,
            projectRoute,
            projectDescription,
            projectOwnersAgency,
            projectZipCode } = this.state;

    console.log("SignedInCreateProjectModal - loadProject");
    console.log(projectValues);

    const formValues           = JSON.parse(projectValues.body);
    const savedProjectType     = projectValues.projectType;
    const savedProjectId       = projectValues.id;
    const savedProjectFolderId = projectValues.folderId;
    const formType = formValues.projectDetails.projectFormType;

    //Need to set projectValues and project Details to initial state
    setStateToInitialState();
    
    //Need to destroy current forms
    const self = this;
    each(this.props.formsToDelete, function(form, formKey) {
     self.props.destroyForm(formKey);   
    })

    let projectType;
    let constructionType;
    let pavementType;

    setCurrentProjectId(savedProjectId);
    setCurrentProjectType(savedProjectType);
    setCurrentProjectFolderId(savedProjectFolderId);

    // Any edited values are added to current Project
    setCurrentProjectName(projectName);
    console.log("     UnitType: " + projectUnitType);
    console.log("   ProjectUnitType: " + projectUnitType);
    setCurrentProjectUnitType(projectUnitType);
    setCurrentProjectDesigner(projectDesigner);
    setCurrentProjectRoute(projectRoute);
    setCurrentProjectDescription(projectDescription);
    setCurrentProjectZipCode(projectZipCode);
    setCurrentProjectOwnersAgency(projectOwnersAgency);
    setCurrentProjectFormType(formType);

    const savedFormProjectValues = formValues.projectValues;

    if (savedProjectType === 'STREET_OVERLAY') {
      projectType = STREET;
      constructionType = OVERLAY;
      if (formType === PAVEMENT_STRUCTURE_FORM || formType === SUMMARY_FORM) {
        pavementType = savedFormProjectValues.pavementStructureType;
      }
      setOverlayProjectValues(savedFormProjectValues);
    } else if (savedProjectType === 'STREET_CONCRETE') {
      projectType = STREET;
      constructionType = CONCRETE;
      if (formType === PAVEMENT_STRUCTURE_FORM || formType === SUMMARY_FORM ) {
        pavementType = savedFormProjectValues.pavementStructureType;
      }
      setConcreteProjectValues(savedFormProjectValues);
    } else if (savedProjectType === 'STREET_COMPOSITE') {
      projectType = STREET;
      constructionType = NEW_COMPOSITE;
      if (formType === PAVEMENT_STRUCTURE_FORM || formType === SUMMARY_FORM) {
        pavementType = savedFormProjectValues.type;
      }
      setCompositeProjectValues(savedFormProjectValues);
    }  else if (savedProjectType === 'PARKING') {
      projectType = PARKING;
      setParkingProjectValues(savedFormProjectValues);
    }  else if (savedProjectType === 'INTERMODAL') {
      projectType = INTERMODAL;
      setIntermodalProjectValues(savedFormProjectValues);
    }  

    // 3. dispatch initializaion of values
    each(formValues.forms, function(formValues, form) {
      const fields = keys(formValues.formValues);
      self.props.initialize(form, formValues.formValues);

      const that = self;
      each(fields, function(field) {
        that.props.touch(form, field);
      })
    })

    let link;
    if (formType === PROJECT_LEVEL_FORM) {
      if (projectType === PARKING) {
         link = `/projectTypes/${projectType}/${formType}`;
       } else {
         link = `/projectTypes/${projectType}/${constructionType}/${formType}`;
       }
      
    } else if (formType === PAVEMENT_STRUCTURE_FORM || formType === SUMMARY_FORM) {
       if (projectType === PARKING) {
         link = `/projectTypes/${projectType}/${formType}`;
       } else {
        link = `/projectTypes/${projectType}/${constructionType}/${formType}/${pavementType}`;
       }   
    } 
  
    router.push(link);
  }

  isProjectNameAlreadyPresent(projectName) {
    return find(this.props.projects , function(project) {
      return project.name === projectName
    })
  }

  // Controls disabled state of same button based on whether entered values are different from passed in values
  handleInputChange(input, event) {
    const { projectValues } = this.props;
    const value = event.target.value;
    this.setState({[SAVE_BUTTON_DISABLED]: true})
    this.setState({[DID_PROJECT_NAME_CHANGE]: false})
    if (input === PROJECT_NAME) {
      if (value !== projectValues.name) {
        this.setState({[DID_PROJECT_NAME_CHANGE]: true})
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_NAME]: value})

    } else if (input === PROJECT_DESIGNER) {
      if (value !== projectValues.designer) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_DESIGNER]: value})    
    } else if (input === PROJECT_DESCRIPTION) {
      if (value !== projectValues.description) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_DESCRIPTION]: value})     
    } else if (input === PROJECT_ZIP_CODE) {
      if (value !== projectValues.zipCode) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_ZIP_CODE]: value})   
    } else if (input === PROJECT_OWNERS_AGENCY) {
      if (value !== projectValues.ownersAgency) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_OWNERS_AGENCY]: value})
    } else if (input === PROJECT_UNIT_TYPE) {
      if (value !== projectValues.unitType) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_UNIT_TYPE]: value})
    } else if (input === PROJECT_ROUTE) {
      if (value !== projectValues.route) {
        this.setState({[SAVE_BUTTON_DISABLED]: false});
      }
      this.setState({[PROJECT_ROUTE]: value})
    } 
  }

  setProjectUnitType(value) {
    this.setState({[PROJECT_UNIT_TYPE]: value})
  }

  render() {
    const { module } = this.props;
    const { projectName,
            projectUnitType,
            projectDesigner,
            projectRoute,
            projectDescription,
            projectOwnersAgency,
            projectZipCode,
            saveButtonDisabled,
            sameNameError } = this.state;

    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle} customStyle={{border: '1px solid lightblue' }} > 
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', height: 'inherit', alignItems: 'flex-end', paddingBottom: 10}}>
            <div style={{paddingTop: 5, color: '#0FAFAF', fontSize: 18, marginBottom: 25, width: '100%'}}>{`${this.props.module === CREATE_PROJECT ? 'CREATE NEW DESIGN' : 'EDIT DESIGN'}`}</div>
            <div style={{display: 'flex', height: '100%', width: '100%'}}>
              <div style={{width: '50%', height: '90%', borderRight: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>ENTER DESIGN NAME</div>
                  <input value={projectName} onChange={this.handleInputChange.bind(this, PROJECT_NAME)} style={{borderRadius: 20, border: '1px solid', borderColor: sameNameError ? 'red' : 'gray', paddingLeft: 20, height: 30}}/>  
                  {sameNameError && <div style={{color: 'red', fontSize: 10}}>Please enter a unique design name</div>}
               </div>
                
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>DESIGNERS NAME</div>
                  <input value={projectDesigner} onChange={this.handleInputChange.bind(this, PROJECT_DESIGNER)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>ROUTE</div>
                  <input value={projectRoute} onChange={this.handleInputChange.bind(this, PROJECT_ROUTE)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               <div style={{display: 'flex', flexDirection: 'column', height: '40%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>PROJECT DESCRIPTION</div>
                  <textarea value={projectDescription} onChange={this.handleInputChange.bind(this, PROJECT_DESCRIPTION )} style={{borderRadius: 20, height: '90%', resize: 'none', paddingLeft: 15, paddingRight: 15, paddingTop: 5, borderColor: 'grey'}}/>
               </div>
              </div>
              <div style={{width: '50%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>OWNER/AGENCY</div>
                  <input value={projectOwnersAgency} onChange={this.handleInputChange.bind(this, PROJECT_OWNERS_AGENCY )} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
                <div style={{display: 'flex', flexDirection: 'column', height: '20%', width: '80%'}}>
                  <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>ZIP CODE <span style={{fontStyle: 'italic'}}>(Project location)</span></div>
                  <input value={projectZipCode} onChange={this.handleInputChange.bind(this, PROJECT_ZIP_CODE )} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30}}/>  
               </div>
               {module === CREATE_PROJECT && <div style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 25}}>
                <label style={{fontWeight: 'bold'}} className='form-label'></label>               
              </div>}
               {module === EDIT_PROJECT && 
              <div>
                <div style={{fontSize: 10, marginBottom: 5, fontWeight: 600}}>PROJECT TYPE</div>
                <div>{projectTypesToDisplayToUser[this.props.projectValues.projectType]}</div>
              </div> }
              </div>
            </div>
            {module === CREATE_PROJECT && <button onClick={this.onConfimButtonClick.bind(this)} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white'}} className='btn'>START PROJECT</button> }
            {module === EDIT_PROJECT && 
              <div style={{width: '50%'}}>
                <button onClick={this.onSaveProjectValues.bind(this)} disabled={saveButtonDisabled} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginRight: 20}} className='btn'>SAVE</button> 
                <button onClick={this.loadProject.bind(this)} style={{width: '40%', backgroundColor: 'rgb(50, 153, 204)', color: 'white'}} className='btn'>EDIT DESIGN</button> 
              </div>}
  
            
          </div>
        </ModalWrapper>
      </div>
    )
    
  }
}

const mapStateToProps = state => {
  return {
    formsToDelete: state.form,
    module: state.currentProject.modal.module,
    projectValues: state.currentProject.modal.projectValues, // passed in from the modal
    isUserSignedIn: state.auth.authenticated,
    projects: state.userProjects.projects, // need this to check for unique design name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectName: (values) => {
      dispatch(setCurrentProjectName(values));
    },
    setCurrentProjectType: (values) => {
      dispatch(setCurrentProjectType(values));
    },
    setCurrentProjectUnitType: (values) => {
      dispatch(setCurrentProjectUnitType(values));
    },
    setCurrentProjectUnitTypeStatus: (values) => {
      dispatch(setCurrentProjectUnitTypeStatus(values));
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
    setCurrentProjectFormType: (value) => {
      dispatch(setCurrentProjectFormType(value));
    },
    setCurrentProjectId: (id) => {
      dispatch(setCurrentProjectId(id));
    },
    setCurrentProjectFolderId: (folderId) => {
      dispatch(setCurrentProjectFolderId(folderId));
    },
    setStateToInitialState: () => {
      dispatch(setStateToInitialState());
    },
    setOverlayProjectValues: (values) => {
      dispatch(setOverlayProjectValues(values));
    },
    setConcreteProjectValues: (values) => {
      dispatch(setConcreteProjectValues(values));
    },
    setParkingProjectValues: (values) => {
      dispatch(setParkingProjectValues(values));
    },
    setCompositeProjectValues: (values) => {
      dispatch(setCompositeProjectValues(values));
    },
    setIntermodalProjectValues: (values) => {
      dispatch(setIntermodalProjectValues(values));
    },
    initialize: (form, values) => {
      dispatch(initialize(form, values));
    },
    destroyForm: (form) => {
      dispatch(destroy(form));
    },
    touch: (form, values) => {
      dispatch(touch(form, values));
    },
     addOrEditProject: (projectValues, message) => {
      dispatch(addOrEditProject(projectValues, message));
    }
  };
}

SignedInCreateProjectModal = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignedInCreateProjectModal));

export default SignedInCreateProjectModal;
