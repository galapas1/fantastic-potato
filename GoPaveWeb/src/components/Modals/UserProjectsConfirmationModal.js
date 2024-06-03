import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ModalWrapper, Dropdown } from 'Components';
import { connect } from 'react-redux';
import { deleteProject, deleteFolder, addOrEditProject, shareProject, addProjectErrorMessage, addProjectShareErrorMessage, addOrEditFolder, addFolderErrorMessage, addNewFolderAndAddNewProject } from 'Actions';
import './Modals.scss';
import { find, map, reject, extend } from 'underscore';
import UserProjectsSelector from 'Selectors/user_projects_by_folder';
import ReactTooltip from 'react-tooltip';
import Loader from 'halogen/ClipLoader';
import {
 SHARE_DESIGN,
 DELETE_FOLDER,
 DELETE_DESIGN,
 COPY_DESIGN,
 EDIT_FOLDER,
 SHARE,
 COPY,
 CONFIRM,
 SAVE_DESIGN,
 SAVE
} from  'Constants';

const modalStyle = {
  width: 350,
  height: 170,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 10,
  display: 'table',
  textAlign: 'center'
}

const saveFolderOnlyOneFolderTooltipMessage = 'You only have one folder';
const saveFolderOnlyOneFolderTooltipID = 'saveFolderOnlyOneFolder';

class UserProjectsConfirmationModal extends Component {

  constructor(props){
    super(props);
    const defaultProjectFolderValue = props.folderName ? props.folderName : 'Project Folder'
    this.state = {
      inputProjectValue:'',
      saveFolderDropdownValue: `${defaultProjectFolderValue}`,
      addNewFolderNewFolderValue: '',
      copyFolderNewFolderNameValue:  `${props.folderName}`,
      shareProjectEmailAddress:'',
      addNewFolder: false,
      copyProjectName: `${props.projectName}_1`
    }
  }
  componentWillMount() {
    this.props.addProjectErrorMessage('');
    this.props.addProjectShareErrorMessage('');
    this.props.addFolderErrorMessage('');
  }

  componentDidUpdate() {
   ReactTooltip.rebuild();
  }

  handleCopyFolderNameInputChange(event) {
    this.setState({copyFolderNewFolderNameValue: event.target.value})
  }

  handleNewFolderNameInputChange(event) {
    this.setState({addNewFolderNewFolderValue: event.target.value})
  }

  handleCopyProjectNameInputChange(event) {
    this.setState({copyProjectName: event.target.value})
  }

  handleShareProjectInputChange(event) {
    this.setState({shareProjectEmailAddress: event.target.value})
  }

  handleSaveInputChange(event) {
    this.setState({inputProjectValue: event.target.value})
  }

  setParentDropdownValue(value) {
    this.setState({saveFolderDropdownValue: value});
  }

  onConfirmButtonClick() {
    const { module,
            projectId,
            deleteProject,
            deleteFolder,
            projectType,
            unitType,
            projectName,
            addOrEditProject,
            shareProject,
            folderId,
            folderName,
            addOrEditFolder,
            addFolderErrorMessage,
            addProjectErrorMessage,
            addProjectShareErrorMessage,
            body,
            projectDescription,
            projectRoute,
            projectDesigner,
            projectZipCode,
            projectOwnersAgency,
            userProjectsByFolder,
            addNewFolderAndAddNewProject,
            callback } = this.props;

    const { addNewFolderNewFolderValue, addNewFolder, inputProjectValue, saveFolderDropdownValue, copyProjectName, copyFolderNewFolderNameValue } = this.state;

    let currentProjectName;
    let currentFolderName;
    let projectValues;
    let projectAlreadyExists;
    let currentFolderId;
    let editFolderValues;
    if (module === DELETE_DESIGN ) {
      deleteProject(projectId, 'Delete Design was successful', 'Delete Design was not successful');
    } else if (module === DELETE_FOLDER ) {
      // get projects associated with folderID
      const folderProjects = this.getProjectIds(userProjectsByFolder[folderId]);
      deleteFolder(folderId, 'Delete Folder was successful', 'Delete Folder was not successful', folderProjects );
    } else if (module === COPY_DESIGN ) {
      if (this.isProjectNameAlreadyPresent(copyProjectName)) {
         addProjectErrorMessage('Please enter a unique design name');
         return;
      }
       addOrEditProject({name: copyProjectName, projectType:projectType, folderId: projectId, body:body}, 'Copy Folder was successful', 'Copy  Folder was not successful' );
    } else if (module === EDIT_FOLDER ) {
      if( folderName === copyFolderNewFolderNameValue ) {
        addFolderErrorMessage('You have not changed folder name');
        return;
      }

      if (copyFolderNewFolderNameValue === '') {
        addFolderErrorMessage('Value cannot be empty');
        return;
      }
      editFolderValues = {name: copyFolderNewFolderNameValue, id: folderId}
      addOrEditFolder(editFolderValues, 'Folder Name was updated');
    } else if (module === SAVE_DESIGN) {

      if (!projectName && inputProjectValue === '' ) {
        addProjectErrorMessage('You have not entered any design name');
        return;
      } else  if (!projectName && this.isProjectNameAlreadyPresent(inputProjectValue)) {
         addProjectErrorMessage('Please enter a unique design name');
         return;
      } else {
         addProjectErrorMessage('');
      }

      if(addNewFolder && addNewFolderNewFolderValue === '' ) {
        addFolderErrorMessage('You have not entered any folder name');
        return;
      } else if (addNewFolder && this.isFoldernameAlreadyPresent(addNewFolderNewFolderValue)){
         addFolderErrorMessage('Please enter a unique folder name');
         return;
      } else  {
         addFolderErrorMessage('');
      }

      // If a Project id was passed by the Footer Form, that means this project has been saved to the database
      if (projectId) {
         projectAlreadyExists = true;
      }

      // If a Project name was passed by the Footer Form, that means this project has a name. If not, need to grab the name from the input on the page
      if (projectName) {
        currentProjectName = projectName;
      } else {
        currentProjectName = inputProjectValue;
      }
      // Folder value is the dropdown value that user chooses if user is choosing a folder value, if user is creating folder, then need to check addNewFolderNewFolderValue state value
      if (addNewFolder) {
        currentFolderName = addNewFolderNewFolderValue;
      } else {
        currentFolderName = saveFolderDropdownValue;
      }

      currentFolderId = this.getFolderId(currentFolderName)

      const message = 'Design was successfully updated';
      projectValues = { projectType   : projectType,
                        unitType      : unitType,
                        name          : currentProjectName,
                        description   : projectDescription,
                        route         : projectRoute,
                        designer      : projectDesigner,
                        zipCode       : projectZipCode,
                        ownersAgency  : projectOwnersAgency,
                        body          : body };

      if (projectAlreadyExists) {
        extend(projectValues, {id: projectId});
      }

      if (!currentFolderId) {
        addNewFolderAndAddNewProject({name: addNewFolderNewFolderValue}, projectValues, null, callback);
      } else {
        extend(projectValues, {folderId: currentFolderId});
        addOrEditProject(projectValues, message, callback);
      }
    } else if (module === SHARE_DESIGN) {
        shareProject({ id: projectId,
                       sendToEmailAddress: this.state.shareProjectEmailAddress },
            "Project successfully shared", callback);
    }
  }

  isFoldernameAlreadyPresent(folderName) {
    return find(this.props.folders , function(folder) {
      return folder.name === folderName
    })
  }

  isProjectNameAlreadyPresent(projectName) {
    return find(this.props.projects , function(project) {
      return project.name === projectName
    })
  }

  getFolderId(folderName) {

    if (folderName === 'Project Folder') {
      return 1;
    }

    const folderObject = find(this.props.folders, function(folder) {
      return folder.name === folderName;
    })

    if (!folderObject) {
      return null;
    }

    return folderObject.id;
  }

  getProjectIds(arrayOfProjects) {
    return map(arrayOfProjects, function(project) {
      return project.id
    })
  }

  onClickSelectFolderLabel() {
    this.setState({addNewFolder: false});
    this.props.addFolderErrorMessage('');
  }

  renderFolderDropdown () {
    const { module, folderDropdownList, addFolderError } = this.props;
    const { addNewFolder, addNewFolderNewFolderValue } = this.state;
    const isDisabled = folderDropdownList.length === 1;
    if (module === SAVE_DESIGN) {
      if (addNewFolder) {
        return (
          <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
          <label style={{fontSize: 12}}> New Folder Name</label>
          <div style={{width: '100%', display: 'flex', flexDirection:'column'}}>
           <div style={{width: 'inherit', display: 'flex'}}>
             <input value={addNewFolderNewFolderValue} onChange={this.handleNewFolderNameInputChange.bind(this)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30, width: '70%', borderColor: addFolderError ? 'red' : '', marginLeft: 50}} placeholder='Enter unique folder name'/>
            </div>
             {addFolderError && <div style={{color: 'red', fontSize:10}}>{addFolderError}</div>}
           </div>
          <div onClick={this.onClickSelectFolderLabel.bind(this)} style={{display: 'flex',  marginTop: 3, marginLeft: 110, width: '100%', cursor: 'pointer'}}>
            <div style={{backgroundImage: 'url(/icons/Backicon.png)', backgroundRepeat: 'no-repeat',height: 15, width: 15, marginRight: 10 }}></div>
            <label style={{fontSize: 11, cursor: 'pointer', color: '#3299CC'}}>SELECT FOLDER</label>
          </div>
          </div>
        )

      } else {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
          <label style={{fontSize: 12}}>Folder Name</label>
          <ReactTooltip id={saveFolderOnlyOneFolderTooltipID} multiline={true} place='right' type='warning' effect='solid'/>
          <Dropdown style={{ zIndex: 11, width: 230}} list={folderDropdownList}  tooltipId={saveFolderOnlyOneFolderTooltipID} showTooltip={isDisabled} toolTipMessage={saveFolderOnlyOneFolderTooltipMessage} isFieldDisabled={isDisabled} defaultValue={{name: this.state.saveFolderDropdownValue}} dropdownContainerStyle={{border: addFolderError ? '1px solid red' : '1px solid grey'}} setParentDropdownValue={this.setParentDropdownValue.bind(this)} dropdownListStyle={{border: '1px solid grey'}}/>
          <div onClick={() => this.setState({addNewFolder: true})}style={{display: 'flex',  marginTop: 3, marginLeft: 10, cursor: 'pointer'}}>
            <i style={{ fontSize: 10, marginTop: 2, marginRight: 5, color: '#3299CC'}} className='fa fa-plus nav-icon' ></i>
            <label style={{fontSize: 11, cursor: 'pointer', color: '#3299CC'}}>CREATE NEW FOLDER</label>
          </div>
          </div>
        )

      }
    }
  }

  renderConfirmationButton(buttonText, backgroundColor) {
    const { module, isProjectFetching, folders, isFolderFetching } =  this.props;
    if (module === SAVE_DESIGN || module === DELETE_DESIGN || module === COPY_DESIGN) {
       if (isProjectFetching) {
        return (
          <div style={{display: 'flex', width: '100%'}}>
           <div className='spinnerClass' style={{height: 20, width: 99}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
           <button onClick={this.onConfirmButtonClick.bind(this)} style={{width: '40%', backgroundColor: backgroundColor}} disabled={true} className='btn btn-primary'>{buttonText}</button>
          </div>
        )
       } else {
         return (
           <button onClick={this.onConfirmButtonClick.bind(this)} disabled={module === SAVE_DESIGN && isFolderFetching ? true : ''} style={{width: '40%', backgroundColor: backgroundColor}}className='btn btn-primary'>{buttonText}</button>
          )
       }
    } else if (module === DELETE_FOLDER) {
      if (isFolderFetching) {
        return (
          <div style={{display: 'flex', width: '100%'}}>
           <div className='spinnerClass' style={{height: 20, width: 99}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
           <button onClick={this.onConfirmButtonClick.bind(this)} style={{width: '40%', backgroundColor: backgroundColor}} disabled={true} className='btn btn-primary'>{buttonText}</button>
          </div>
        )
       } else {
         return (
           <button onClick={this.onConfirmButtonClick.bind(this)} style={{width: '40%', backgroundColor: backgroundColor}}className='btn btn-primary'>{buttonText}</button>
          )
       }

    } else if (module === SHARE_DESIGN) {
        return (
         <button onClick={this.onConfirmButtonClick.bind(this)} style={{width: '40%', backgroundColor: backgroundColor}} disabled={!folders} className='btn btn-primary'>{buttonText}</button>
      )
    }
  }

  renderSaveInput() {
    const { module, projectName, addProjectError } =  this.props;
    const { inputProjectValue } = this.state;

    if (module === SAVE_DESIGN) {
      if (projectName) {
        return (
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <label style={{fontSize: 12}}>Design Name</label>
            {projectName}
          </div>
        )
      } else {
         return  (
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
             <label style={{fontSize: 12}}>Design Name</label>
             <div style={{width: '70%'}} >
               <input value={inputProjectValue} onChange={this.handleSaveInputChange.bind(this)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30, width: '100%', borderColor: addProjectError ? 'red' : ''}} placeholder='Enter unique design name' />
             </div>
             {addProjectError && <div style={{color: 'red', fontSize: 10}}>{addProjectError}</div>}
          </div>
         )
      }
    }
  }

  showEditFolderButtonAndSpinner() {
     const { isFolderFetching } =  this.props;
     if (isFolderFetching) {
        return (
          <div style={{display: 'flex', width: '100%'}}>
           <div className='spinnerClass' style={{height: 20, width: 99, marginTop: 10}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
           <button onClick={this.onConfirmButtonClick.bind(this)} style={{backgroundColor: 'rgb(102, 153, 0)', color: 'white', width: '40%', marginTop: 15}} disabled={true} className='btn btn-primary'>EDIT FOLDER</button>
          </div>
        )
     } else {
     return (
       <button onClick={this.onConfirmButtonClick.bind(this)} style={{backgroundColor: 'rgb(102, 153, 0)', color: 'white', width: '40%', marginTop: 15}}  className='btn btn-primary'>EDIT FOLDER</button>
      )
     }
  }

  moveCaretAtEnd(e) {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  }

  renderEditFolder() {
    const { module, folderName, addFolderError } =  this.props;
    const { copyFolderNewFolderNameValue } = this.state;
    if (module === EDIT_FOLDER) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
          <div style={{display: 'flex', height: '70%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{ marginBottom: 5, fontWeight: 600, color: 'rgb(102, 153, 0)'}}>EDIT FOLDER NAME</div>
              <div>
                <label style={{fontSize: 12, margin: 0}}>Folder Name</label>
                <div style={{ marginBottom: 10}}>{folderName}</div>
              </div>
              <input placeholder='New Folder Name' value={copyFolderNewFolderNameValue} onChange={this.handleCopyFolderNameInputChange.bind(this)} style={{borderRadius: 20, width: '80%',border: '1px solid gray', paddingLeft: 20, height: 30, borderColor: addFolderError ? 'red' : ''}} autoFocus onFocus={this.moveCaretAtEnd.bind(this)} />
              {addFolderError && <div style={{color: 'red', fontSize: 10}}>{addFolderError}</div>}
           </div>
          {this.showEditFolderButtonAndSpinner()}
        </div>
      )
    }
  }

  renderCopyProject() {
    const { module, addProjectError, projectName } =  this.props;
    if (module === COPY_DESIGN) {
      return (
        <div style={{display: 'flex', height: '70%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div>
              <label style={{fontSize: 12, margin: 0}}>Design Name</label>
              <div style={{ marginBottom: 10}}>{projectName}</div>
            </div>
            <input value={this.state.copyProjectName} onChange={this.handleCopyProjectNameInputChange.bind(this)} style={{borderRadius: 20, width: '80%',border: '1px solid gray', paddingLeft: 20, height: 30, borderColor: addProjectError ? 'red' : ''}} autoFocus onFocus={this.moveCaretAtEnd.bind(this)}/>
            {addProjectError && <div style={{color: 'red', fontSize: 10}}>{addProjectError}</div>}
         </div>
      )
    }
  }

  renderDeleteLabel() {
    const { module, projectName, folderName} =  this.props;
    if (module === DELETE_DESIGN || module === DELETE_FOLDER) {
      return (
        <div>
         <label style={{fontSize: 12}}>{`${module === DELETE_DESIGN ? 'DESIGN NAME' : 'FOLDER NAME'}`}</label>
         <div>
          {module === DELETE_DESIGN ? projectName : folderName}
         </div>
        </div>
      )
    }
  }
  renderShareDesignInput() {
    const { module, addProjectShareError } = this.props;
    if (module === SHARE_DESIGN) {
      return (
          <div style={{width: '90%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <input placeholder='Enter email address' 
               value={this.state.shareProjectEmailAddress}
               onChange={this.handleShareProjectInputChange.bind(this)}
               style={{borderRadius: 20, width: '80%',
                       border: '1px solid',
                       borderColor: addProjectShareError ? 'red' : 'gray', paddingLeft: 20, height: 30}}/>
           {addProjectShareError && <div style={{color: 'red', fontSize: 10}}>{addProjectShareError}</div>}
        </div>
       )
    }
  }

  render() {
    let buttonText;
    let modalTitle;
    let backgroundColor;
    let height;
    let borderStyle;
    let titleColor;
    const { module } = this.props;
    if (module === SHARE_DESIGN) {
      buttonText = SHARE;
      modalTitle = SHARE_DESIGN;
      backgroundColor = 'rgb(50, 153, 204)';
      height = 170;
      borderStyle = '1px solid rgb(50, 153, 204)';
      titleColor = 'rgb(50, 153, 204)';
    } else if (module === COPY_DESIGN) {
      buttonText = COPY;
      modalTitle = COPY_DESIGN;
      backgroundColor = 'rgb(50, 153, 204)';
      height = 170;
      borderStyle = '1px solid rgb(50, 153, 204)';
      titleColor = 'rgb(50, 153, 204)';
    } else if (module === DELETE_DESIGN) {
      buttonText = CONFIRM;
      modalTitle = DELETE_DESIGN;
      backgroundColor = 'red';
      borderStyle = '1px solid red';
      height = 170;
      titleColor = 'red';
    } else if (module === DELETE_FOLDER) {
       buttonText = CONFIRM;
       modalTitle = DELETE_FOLDER;
       backgroundColor = 'red';
       borderStyle = '1px solid red';
       height = 170;
       titleColor = 'red';
    } else if (module === SAVE_DESIGN) {
       buttonText = SAVE;
       modalTitle = SAVE_DESIGN;
       backgroundColor = 'rgb(102, 153, 0)';
       height = 270;
       borderStyle = '1px solid lightblue';
       titleColor = 'rgb(102, 153, 0)';
    } else if (module === EDIT_FOLDER) {
       height = 220;
       borderStyle = '1px solid rgb(102, 153, 0)';

    }
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle} customStyle={{border: borderStyle, height: height }} >
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', height: 'inherit', alignItems: 'center', paddingBottom: 10}}>
            <div  style={{paddingTop: 5, color: titleColor}}>{modalTitle}</div>
            {this.renderShareDesignInput()}
            {this.renderDeleteLabel()}
            {this.renderSaveInput()}
            {this.renderFolderDropdown()}
            {this.renderCopyProject()}
            {this.renderEditFolder()}
            {this.renderConfirmationButton(buttonText, backgroundColor)}
          </div>
        </ModalWrapper>
      </div>
    )

  }
}

function mapStateToProps(state) {

  const folderDropdownList =
    reject(state.userFolders.folders, function(folder) {
      return folder.name === 'root'
    }).
    map(function(object) {
      return {name: object.name};
    });

   folderDropdownList.push({name: 'Project Folder'});

  return {
    module                        : state.currentProject.modal.module,
    projectId                     : state.currentProject.modal.projectValues.id,
    folderName                    : state.currentProject.modal.projectValues.folderName,
    projectName                   : state.currentProject.modal.projectValues.name,
    projectDescription            : state.currentProject.modal.projectValues.description,
    projectRoute                  : state.currentProject.modal.projectValues.route,
    projectDesigner               : state.currentProject.modal.projectValues.designer,
    projectZipCode                : state.currentProject.modal.projectValues.zipCode,
    projectDateCreated            : state.currentProject.modal.projectValues.dateCreated,
    projectLastModified           : state.currentProject.modal.projectValues.lastModified,
    projectOwnersAgency           : state.currentProject.modal.projectValues.ownersAgency,
    folderId                      : state.currentProject.modal.projectValues.folderId,
    folders                       : state.userFolders.folders,
    projects                      : state.userProjects.projects,
    userSelectedCurrentProjectName: state.currentProject.modal.projectValues.currentProjectName,
    projectType                   : state.currentProject.modal.projectValues.projectType,
    unitType                      : state.currentProject.modal.projectValues.unitType,
    formValues                    : state.currentProject.modal.projectValues.formValues,
    addProjectError               : state.userProjects.addProjectError,
    addProjectShareError          : state.userProjects.addProjectShareError,
    isProjectFetching             : state.userProjects.isFetching,
    addFolderError                : state.userFolders.addFolderError,
    isFolderFetching              : state.userFolders.isFetching,
    userProjectsByFolder          : UserProjectsSelector(state),
    folderDropdownList            : folderDropdownList,
    body                          : state.currentProject.modal.projectValues.body,
    callback                      : state.currentProject.modal.callback
  };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteProject: (id, successMessage, errorMessage) => {
            dispatch(deleteProject(id, successMessage, errorMessage));
        },
        deleteFolder: (id, successMessage, errorMessage, arrayOfProjectIds) => {
            dispatch(deleteFolder(id, successMessage, errorMessage, arrayOfProjectIds));
        },
        addOrEditProject: (projectValues, message, callback) => {
            dispatch(addOrEditProject(projectValues, message)).then(() => {
                if (callback) {
                    callback()
                }
            });
        },
        shareProject: (shareProjectValues, message, callback) => {
            dispatch(shareProject(shareProjectValues, message));
        },
        addProjectErrorMessage: (errorMessage) => {
            dispatch(addProjectErrorMessage(errorMessage));
        },
        addProjectShareErrorMessage: (errorMessage) => {
            dispatch(addProjectShareErrorMessage(errorMessage));
        },
        addOrEditFolder: (projectValues, message) => {
            dispatch(addOrEditFolder(projectValues, message));
        },
        addFolderErrorMessage: (errorMessage) => {
            dispatch(addFolderErrorMessage(errorMessage));
        },
        addNewFolderAndAddNewProject: (folderValues, projectValues, message, callback) => {
            dispatch(addNewFolderAndAddNewProject(folderValues, projectValues, message)).then(() => {
                if (callback) {
                    callback()
                }
            });
        },
    };
}

UserProjectsConfirmationModal  = connect(mapStateToProps, mapDispatchToProps)(UserProjectsConfirmationModal);

export default UserProjectsConfirmationModal;
