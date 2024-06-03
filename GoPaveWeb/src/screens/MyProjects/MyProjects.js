import React, { Component } from 'react';
import '../../components/Forms/Forms.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setMyProjectsSelectedFolder, showModal, addOrEditFolder, addFolderErrorMessage, signOutRequest } from 'Actions';
import UserProjectsSelector from 'Selectors/user_projects_by_folder';
import { isEmpty, find, each, keys } from 'underscore';
import Loader from 'halogen/ClipLoader';
import { FooterForm } from 'Components';
import './MyProjects.scss';
import {
 SHARE_DESIGN,
 DELETE_FOLDER,
 DELETE_DESIGN,
 COPY_DESIGN,
 EDIT_FOLDER,
 USER_PROJECTS_CONFIRMATION_MODAL,
 SIGNED_IN_CREATE_PROJECT_MODAL,
 EDIT_PROJECT
} from  'Constants';
class MyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      dropdownVisible: true,
      newFolderDropdownVisible: false,
      folderValue:''
    }
  }

  onClickDeleteFolderModal(nameOfFolder, folderId) {
    this.props.showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, DELETE_FOLDER, {folderName: nameOfFolder, folderId: folderId});
  }

  handleInputChange(event) {
    this.setState({folderValue: event.target.value})
  }

  addFolder(folderName) {
    const message = 'Folder was successfully added';
    const { addOrEditFolder } = this.props;
    addOrEditFolder({name:folderName} , message, this.onCloseAddFolderForm.bind(this));
  }

  showButtonAndSpinner() {
    const { isFetching } = this.props;
    const { folderValue } = this.state;
    if (isFetching) {
       return (
         <div style={{display: 'flex', justifyContent: 'space-between', width: '85%', alignItems: 'center'}}>
            <div className='spinnerClass' style={{height: 20, width: 100, marginTop: 10, marginLeft: 20}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
            <button disabled={true} style={{ backgroundColor: 'rgb(102, 153, 0)', color: 'white', marginTop: 15, marginRight: 15, fontSize: 12}} className='btn'>CREATE FOLDER</button>
         </div>
       )
     } else {
        return <button onClick={this.addFolder.bind(this, folderValue)} style={{ backgroundColor: 'rgb(102, 153, 0)', color: 'white', fontSize: 12,  marginTop: 15, marginRight: 15}} className='btn'>CREATE FOLDER</button>
     }
  }

  onCloseAddFolderForm() {
    this.setState({newFolderDropdownVisible: false});
    this.props.addFolderErrorMessage('');
    this.setState({folderValue: ''})
  }

  getFormattedDate(dateString) {
    const DateObject = new Date(Date.parse(dateString));
    return `${(DateObject.getMonth() + 1)}/${DateObject.getDate()}/${DateObject.getFullYear()}`;
  }

  onLoadProject(values) {
    const { showModal } = this.props;
    showModal(SIGNED_IN_CREATE_PROJECT_MODAL, null, EDIT_PROJECT, values);
  }

  handleLogout = () => {
    const { router, logout } = this.props;
    router.push('/');
    logout();
  }

  render() {
    const { dropdownVisible, newFolderDropdownVisible, folderValue } = this.state;
    const { userFolders, setMyProjectsSelectedFolder, userProjectsByFolder, rootFolderId, addFolderError, showModal, currentlySelectedFolder, isUserSignedIn  } = this.props;
    return (
      <div className='user-form' style={{backgroundImage: 'url(/images/concretebackground.png)'}}> 
       <div className='background-div' style={{opacity: '0.93'}}></div>
       {isUserSignedIn && <div onClick={this.handleLogout} style={{width: '10%', color: 'black', zIndex: 10, marginRight: 50, borderRadius: 20, border: '1px solid', marginTop: 5, marginBottom: 5, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>LOGOUT</div>}
       <div className='user-form-header' style={{justifyContent: 'center', marginTop: isUserSignedIn ? '' : 20}}>
          <label style={{fontSize: 25}}>MY DASHBOARD</label>
       </div>  
       <div style={{display: 'flex', flex: 1, zIndex: 1, width: '95%', marginRight: 'auto', marginLeft: 'auto', paddingTop: 30, paddingLeft: 50,fontSize: 13}}>
         <div style={{width: '30%', display: 'flex', flexDirection: 'column'}}>
           <div style={{color: 'rgb(15, 175, 175)', textAlign: 'center', fontSize: 20, marginBottom: 20}}>PROJECT FOLDERS</div>
           <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', position: 'relative'}}>
           <div style={{textAlign: 'center'}}>
             <label style={{width: '50%'}}>Project List</label>
           </div>
            <div className='menu' style={{display: 'flex', flexDirection: 'column', width: '100%', zIndex: 1}}>
              <div onClick={() => setMyProjectsSelectedFolder(rootFolderId)} style={{display: 'flex', border: '1px solid', height: 40, alignItems: 'center', cursor: 'pointer'}}>
               <i className={`fa ${dropdownVisible ? 'fa-angle-down' : 'fa-angle-up' } nav-icon`} style={{fontSize: 20, paddingRight: 10, paddingLeft: 10, cursor: 'pointer'}} onClick={() => this.setState({dropdownVisible: !dropdownVisible})}></i>
               <div style={{backgroundImage: 'url(/icons/Folder.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 10 }}></div>
               <div style={{fontWeight: 500, width: '43%'}}>PROJECT FOLDER</div>  
              </div>
              <div className={`add-new-folder ${newFolderDropdownVisible ? `new-folder-dropdown-visible` : ''}`} style={{ backgroundColor: 'lightgrey', position: 'absolute', width: 'inherit', top: 62, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: 12 }}>
                 <div style={{display: 'flex', height: '33%', width: '100%',paddingTop: 15, justifyContent: 'center'}}>
                   <div style={{color: 'rgb(15, 175, 175)', width: '85%', textAlign: 'center', marginLeft: 15}}>ADD NEW FOLDER</div>
                   <i className='fa fa-times' style={{color: 'rgb(15, 175, 175)', float: 'right', fontSize: 20, }} onClick={this.onCloseAddFolderForm.bind(this)} ></i>
                 </div>
                 <div style={{display: 'flex', height: '33%', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{ marginBottom: 5, fontWeight: 600}}>FOLDER NAME</div>
                    <input value={folderValue} onChange={this.handleInputChange.bind(this)} style={{borderRadius: 20, border: '1px solid gray', paddingLeft: 20, height: 30, width: '75%', borderColor: addFolderError ? 'red' : ''}}/>  
                    {addFolderError && <div style={{color: 'red'}}>{addFolderError}</div>}
                 </div>
                 {this.showButtonAndSpinner()}
              </div>
               <ul className={`list ${dropdownVisible ? `dropdown-visible` : ''}`}>
                   {!isEmpty(userProjectsByFolder) && userFolders && !isEmpty(userFolders) && Object.keys(userProjectsByFolder).map((key, index) => {
                    const folder = userFolders[key];
                    // Dont show Root designs (these get their own divs)
                    if (folder.name === 'root') {
                      return null;
                     }
                    
                    return (
                    <li key={index} style={{display: 'flex', border: '1px solid', height: 40, justifyContent: 'space-between', alignItems: 'center', paddingRight: 15}}>
                       <div onClick={() => setMyProjectsSelectedFolder(folder.id)} style={{display: 'flex', cursor: 'pointer', paddingLeft: 45, width: '85%', alignItems: 'center', marginRight: 5}}>
                         <div title='Open' style={{backgroundImage: 'url(/icons/Folder.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 10 }}></div>
                         <div style={{width: '75%'}}>{folder.name}</div>  
                       </div>
                       <div title='Edit' onClick={() => showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, EDIT_FOLDER, {folderName: folder.name, id: folder.id})} style={{backgroundImage: 'url(/icons/ACPA_Edit.png)', backgroundRepeat: 'no-repeat',height: 25, minWidth: 25, marginRight: 15, cursor: 'pointer' }} ></div>
                       <div style={{backgroundImage: 'url(/icons/Blue_Trash.png)', backgroundRepeat: 'no-repeat',height: 25, minWidth: 25, cursor: 'pointer' }} title='Delete' onClick={this.onClickDeleteFolderModal.bind(this, folder.name, folder.id)}></div>
                     </li> 
                    )
                    })

                   } 
               </ul> 
            </div>
            <div style={{cursor: 'pointer', color: 'blue', fontSize: 10, position: 'absolute', left: '75%',marginTop: 36, zIndex: 2, display: 'flex', alignItems: 'center', height: '5%'}} onClick={() => this.setState({newFolderDropdownVisible: true})}>
              <i  className='fa fa-plus nav-icon' ></i>
              <div style={{paddingLeft: 5}}>New Folder</div> 
            </div>
           </div>
  
         </div> 
         <div style={{width: '70%', display: 'flex', flexDirection: 'column', paddingLeft: 20, paddingRight: 40}}>
           <div style={{color: 'rgb(15, 175, 175)', textAlign: 'center', fontSize: 20, marginBottom: 20}}>DESIGNS</div>
           <div style={{paddingLeft: 20}}>
             <label style={{width: '25%'}}>Design Name</label>
             <label style={{width: '15%', marginLeft: 3}}>Created</label>
             <label style={{width: '21%'}}>Last Updated</label>
           </div>
           <div style={{height: '75%', overflowY: 'auto'}}>
             {currentlySelectedFolder && !isEmpty(userProjectsByFolder) && userProjectsByFolder[currentlySelectedFolder].map((values, index) => 
               <div key={index} style={{display: 'flex', border: '1px solid', height: 40, paddingLeft: 20, alignItems: 'center'}}>
                 <div style={{width: '25%'}}>{values.name}</div>
                 <div style={{width: '15%', marginLeft: 5}}>{this.getFormattedDate(values.dateCreated)}</div>
                 <div style={{width: '21%'}}>{this.getFormattedDate(values.lastModified)}</div>
                 <div style={{width: '39%', display: 'flex', justifyContent: 'flex-end'}}>
                    <div title='Edit' onClick={this.onLoadProject.bind(this, values)} style={{backgroundImage: 'url(/icons/ACPA_Edit.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 20, cursor: 'pointer' }}></div>
                    <div title='Duplicate' onClick={() => showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, COPY_DESIGN, {id: values.folderId, body: values.body, projectType: values.projectType, name: values.name})} style={{backgroundImage: 'url(/icons/ACPA_Copy.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 20, cursor: 'pointer' }}></div>
                    <div title='Share' onClick={() => showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, SHARE_DESIGN, {id: values.id})} style={{backgroundImage: 'url(/icons/Arrow.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 20, cursor: 'pointer' }}></div>
                    <div title='Delete' onClick={() => showModal(USER_PROJECTS_CONFIRMATION_MODAL, null, DELETE_DESIGN, {id: values.id, name: values.name })} style={{backgroundImage: 'url(/icons/Blue_Trash.png)', backgroundRepeat: 'no-repeat',height: 25, width: 25, marginRight: 20, cursor: 'pointer' }}></div>
                 </div>
               </div> 

             )}
           </div>
         </div> 
         <FooterForm formType='MyProjects' {...this.props} /> 
      </div> 
      
      </div>
    );
  }
}

const mapStateToProps = state => {

  const rootFolder = find(state.userFolders.folders, function(folder) {
     return folder.name === 'root';
  });

  const rootFolderId = rootFolder ? rootFolder.id : '';
  
  return {
    userProjectsByFolder: UserProjectsSelector(state),
    userFolders: state.userFolders.folders,
    currentlySelectedFolder: state.userFolders.currentlySelectedFolder,
    addFolderError: state.userFolders.addFolderError,
    isFetching: state.userFolders.isFetching,
    rootFolderId: rootFolderId,
    formsToDelete: state.form,
    isUserSignedIn: state.auth.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMyProjectsSelectedFolder: (folder) => {
      dispatch(setMyProjectsSelectedFolder(folder));
    },
    showModal: (modal, routingParams, module, projectParams) => {
      dispatch(showModal(modal, routingParams, module, projectParams));
    },
    addOrEditFolder: (folder, message, callback) => {
      dispatch(addOrEditFolder(folder, message)).then(() => {
        if (callback) {
          callback()
        }
      }); 
    },
    addFolderErrorMessage: (errorMessage) => {
      dispatch(addFolderErrorMessage(errorMessage));
    },
    logout: () => {
      dispatch(signOutRequest());
    },  
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProjects));

