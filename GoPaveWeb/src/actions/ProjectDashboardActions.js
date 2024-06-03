import axios from 'axios';
import thunk from 'redux-thunk';
import { find, each, extend} from 'underscore';
import { showLoaderModal, hideLoaderModal, hideModal, addNotification } from './ModalsNotificationsActions';
import { MyImage, GridLine, Axle } from 'Forms/Intermodal/components/addIntermodalVehicleComponents';
import {Layer, Stage, Group, Image, Line, Label, Tag, Text} from 'react-konva';
import {
    AUTH_ERROR_MESSAGE,
    AUTH_SUCCESS_MESSAGE,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNUP_SUCCESS,
    REMOVER_SPINNER,
    SET_AUTH_NON_SIGNED_IN_USER,
    ADD_SPINNER,
    SET_STATE_TO_INITIAL_STATE,
    MY_PROJECTS_SET_CURRENTLY_SELECTED_FOLDER,
    RESET_MODAL_TO_INITIAL_STATE,
    RESET_POPUP_TO_INITIAL_STATE,
    RESET_NOTIFICATION_TO_INITIAL_STATE,
    NEW_COMPOSITE_SET_CURRENT_PROJECT_VALUES,
    PARKING_SET_CURRENT_PROJECT_VALUES,
    OVERLAY_SET_CURRENT_PROJECT_VALUES,
    SET_USER_PROJECTS,
    SET_USER_FOLDERS,
    ADD_USER_FOLDER,
    ADD_FOLDER_ERROR_MESSAGE,
    ADD_FOLDER_ADD_SPINNER,
    ADD_FOLDER_REMOVE_SPINNER,
    ADD_PROJECT_ERROR_MESSAGE,
    ADD_PROJECT_SHARE_ERROR_MESSAGE,
    ADD_PROJECT_ADD_SPINNER,
    ADD_PROJECT_REMOVE_SPINNER,
    SET_PROJECT_TYPE,
    SET_PROJECT_NAME,
    UPDATE_USER_PROJECT,
    ADD_USER_PROJECT,
    SET_PROJECT_UNIT_TYPE,
    SET_PROJECT_DESCRIPTION,
    SET_PROJECT_ROUTE,
    SET_PROJECT_OWNERS_AGENCY,
    SET_PROJECT_ZIP_CODE,
    SET_PROJECT_ID,
    SET_CURRENT_PROJECT_FORMTYPE,
    CONCRETE_SET_CURRENT_PROJECT_VALUES,
    SET_PROJECT_CREATED_DATE,
    SET_PROJECT_LAST_MODIFIED_DATE,
    SET_PROJECT_DESIGNER,
    SET_PROJECT_FOLDER_ID,
    SIGNOUT_SUCCESS,
    SET_STORE_STATE_TO_NILL,
    SHOW_NON_SIGNED_IN_USER_MESSAGE,
    SET_USER_VEHICLES,
    SET_INTERMODAL_ADD_VEHICLE_WHEEL_COUNT,
    SET_INTERMODAL_ADD_VEHICLE_WHEEL_POSITIONS,
    INTERMODAL_SET_CURRENT_PROJECT_VALUES,
    ADD_SELECTED_USER_VEHICLE,
    REMOVE_SELECTED_USER_VEHICLE,
    ADD_USER_VEHICLE,
    UPDATE_USER_VEHICLE
} from './types';

import {
    BASE_URL,
} from 'Constants'

const SIGNIN_URL = BASE_URL + '/api/Login/';
const SIGNUP_URL = BASE_URL + '/api/Register/';
const PROJECTS_URL = BASE_URL + '/api/projects';
const SHARE_PROJECT_URL = PROJECTS_URL + '/share/';
const FOLDERS_URL = BASE_URL + '/api/folders';
const FORGOT_PASSWORDS_URL = BASE_URL + '/api/ForgotPassword';
const RESET_PASSWORDS_URL = BASE_URL + '/api/ResetPassword';

//Intermodal
const INTERMODAL_VEHICLES = BASE_URL + "/api/vehicles";

const getConfig = () => {
    return { headers: { Authorization: `${localStorage.userToken}`} };
}

export function signInUser({ email, password }) {
    const possibleMessageOne = 'Successfully logged on';
    const possibleErrorMessage = 'Unauthorized';

    return dispatch => {
        dispatch(signInRequest());
        return axios.post(SIGNIN_URL , {Email: email, Password: password}, getConfig())
            .then(response => {
                dispatch(removeSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());

                dispatch(signInSuccess());
                dispatch(authSuccessMessage('Login Succesful'));
                // Set JWT token for signed in user
                localStorage.setItem('userToken', response.data.token);
                dispatch(fetchFoldersAndProjects());
                dispatch(setNonSignedInUser(false));
                dispatch(showNonSignedInUserMessage(false));
                if (response.data.message.text === possibleMessageOne) {
                    dispatch(addNotification('You have successfully logged in', 'success',  5, 'You have successfully logged in'));
                }

            })
            .catch(error => {
                dispatch(removeSpinner());
                if (error.response.statusText === possibleErrorMessage) {
                    dispatch(addNotification('Invalid Login', 'error',  5, 'Invalid Login'));
                    dispatch(authErrorMessage('Invalid Login'));
                }
            });
    };
}

export function signUpUser({ email, password }) {
    const possibleMessageOne = 'User already exists';
    const possibleMessageTwo = 'New account with password created, email confirmation request sent';
    return dispatch => {
        dispatch(signInRequest());
        return axios.post(SIGNUP_URL , {Email: email, Password: password})
            .then(response => {
                dispatch(removeSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());

                if (response.data.hasError) {
                    dispatch(authErrorMessage(response.result.message.errorDetails));
                } else {
                    if (response.data.message.text === possibleMessageOne) {
                        dispatch(addNotification('You have already registered', 'success',  5, 'You have already registered'));
                    } else if (response.data.message.text === possibleMessageTwo) {
                        dispatch(addNotification('Registration successful. Email Confirmation request has been sent', 'success',  15, 'Registration successful. Email Confirmation request has been sent'));
                    } else {
                        dispatch(addNotification('Registration successful', 'success',  5, 'Registration successful' ));
                    }
                }
            })
            .catch(error => {
                dispatch(removeSpinner());
            });
    };
}

export function forgotPassword({ email }) {
    const possibleMessageOne = 'Successfully sent email';
    const possibleMessageTwo = 'Email not found';
    return dispatch => {
        dispatch(addSpinner());
        axios.post(FORGOT_PASSWORDS_URL , {Email: email})
            .then(response => {
                dispatch(removeSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());

                if (response.data.hasError) {
                    if (response.data.message.errorDetails === possibleMessageTwo) {
                        dispatch(addNotification('Email has not been registered', 'error',  5, 'Email has not been registered'));
                        dispatch(authErrorMessage('Email has not been registered'));
                    }
                } else if (response.data.message.text === possibleMessageOne) {
                    dispatch(authErrorMessage('Email has been sent with instructions to reset password'));
                    dispatch(addNotification('Email has been sent with instructions to reset password', 'success',  5, 'Email has been sent with instructions to reset password'));
                }


            })
            .catch(error => {
                dispatch(removeSpinner());
                if (error.response.message.errorDetails === possibleMessageTwo) {
                    dispatch(addNotification('Email has not been registered', 'error',  5, 'Email has not been registered'));
                    dispatch(authErrorMessage('Email has not been registered'));
                }
            });
    };
}

export function resetPassword({ email, password }) {
    const possibleMessageOne = 'Email not found';
    return dispatch => {
        dispatch(addSpinner());
        axios.post(RESET_PASSWORDS_URL , {Email: email, Password: password})
            .then(response => {
                dispatch(removeSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());

                if (response.data.hasError) {
                    if (response.data.message.errorDetails === possibleMessageOne) {
                        dispatch(addNotification('Email has not been registered', 'error',  5, 'Email has not been registered'));
                        dispatch(authErrorMessage('Email has not been registered'));
                    }
                }
                else {
                    dispatch(authErrorMessage('Password has been reset'));
                    dispatch(addNotification('Password has been reset', 'success',  5, 'Proceed try to login'));
                }
            })
            .catch(error => {
                dispatch(removeSpinner());
                if (error.response.message.errorDetails === possibleMessageTwo) {
                    dispatch(addNotification('Email has not been registered', 'error',  5, 'Email has not been registered'));
                    dispatch(authErrorMessage('Email has not been registered'));
                }
            });
    };
}

export function getProjects() {
    return dispatch => {
        return axios.get(PROJECTS_URL, getConfig() )
            .then(response => {
                dispatch(setUserProjects(response.data));
            })
    };
}

// add Project is used for both adding and updating a project
// nohideLoaderModalAndNoSpinner is used when addOrEditProject is called from differnt Actions and nothing should happen in the UI
export function addOrEditProject(projectValues, message,  nohideLoaderModalAndNoSpinner) {
    let possibleErrorMessageOne = 'Project Name must be unique';
    let possibleErrorMessageTwo = 'Missing Project Name';
    return dispatch => {
        if (!nohideLoaderModalAndNoSpinner) {
            dispatch(addProjectAddSpinner());
        }
        return axios.post(PROJECTS_URL, projectValues, getConfig())
            .then(response => {
                dispatch(addUserProject(response.data.result));
                dispatch(addProjectErrorMessage(''));

                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addNotification(message, 'success',  5, message ));
                    dispatch(addProjectRemoveSpinner());
                    dispatch(hideModal());
                    dispatch(hideLoaderModal());
                }

                dispatch(setCurrentProjectName(response.data.result.name));
                dispatch(setCurrentProjectId(response.data.result.id));
                dispatch(setCurrentProjectType(response.data.result.projectType));
                dispatch(setCurrentProjectUnitType(response.data.result.unitType));
                dispatch(setCurrentProjectCreatedDate(response.data.result.dateCreated));
                dispatch(setCurrentProjectLastModifiedDate(response.data.result.lastModified));
                dispatch(setCurrentProjectFolderId(response.data.result.folderId));
            })
            .catch(error => {
                if (error.response && error.response.data &&  error.response.data.error && error.response.data.error.message) {
                    let errorMessage = error.response.data.error.message;
                    if (errorMessage === possibleErrorMessageOne || errorMessage === possibleErrorMessageTwo) {
                        dispatch(addProjectErrorMessage(errorMessage));
                    } else {
                        dispatch(addNotification('Task was not successful', 'error',  5, 'Task was not successful' ));
                    }
                }
                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addProjectRemoveSpinner());
                }

                // Rethrow so returned Promise is rejected
                throw error;
            });

    };
}

export function shareProject(shareProjectValues, message, nohideLoaderModalAndNoSpinner) {
    let possibleErrorMessageOne = 'project not found';
    let possibleErrorMessageTwo = 'A PavementDesigner user does not exist with this email address.  Projects can only be shared with existing users.';
    return dispatch => {
        if (!nohideLoaderModalAndNoSpinner) {
            dispatch(addProjectAddSpinner());
        }
        return axios.post(SHARE_PROJECT_URL, shareProjectValues, getConfig())
            .then(response => {
                dispatch(addProjectShareErrorMessage(''));

                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addNotification(message, 'success',  5, message ));
                    dispatch(addProjectRemoveSpinner());
                    dispatch(hideModal());
                    dispatch(hideLoaderModal());
                }
            })
            .catch(error => {
                if (error.response && error.response.data &&  error.response.data.error && error.response.data.error.message) {
                    let errorMessage = error.response.data.error.message;
                    if (errorMessage === possibleErrorMessageOne || errorMessage === possibleErrorMessageTwo) {
                        dispatch(addProjectShareErrorMessage(errorMessage));
                    } else {
                        dispatch(addNotification('Task was not successful', 'error',  5, 'Task was not successful' ));
                    }
                }

                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addProjectRemoveSpinner());
                }

                // Rethrow so returned Promise is rejected
                throw error;
            });

    };
}

// add Folder is used for both Adding and updating folders
// nohideLoaderModalAndNoSpinner is used when addOrEditFolder is called from differnt Actions and nothing should happen in the UI
export function addOrEditFolder(folder, message, nohideLoaderModalAndNoSpinner) {
    let possibleErrorMessageOne = 'Folder Name must be unique';
    let possibleErrorMessageTwo = 'Missing Folder Name';
    return dispatch => {
        if (!nohideLoaderModalAndNoSpinner) {
            dispatch(addFolderAddSpinner());
        }
        return axios.post(FOLDERS_URL, folder, getConfig())
            .then(response => {
                dispatch(addUserFolder(response.data.result));
                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addFolderRemoveSpinner());
                    dispatch(addNotification(message, 'success', 5, message));
                    dispatch(hideModal());
                    dispatch(hideLoaderModal());
                }
                dispatch(addFolderErrorMessage(''));
                return response.data.result.id; // return id to chained promise so that new project can be added with this folder id
            })
            .catch(error => {
                if (error.response && error.response.data &&  error.response.data.error && error.response.data.error.message) {
                    let errorMessage = error.response.data.error.message;
                    if (errorMessage === possibleErrorMessageOne || errorMessage === possibleErrorMessageTwo) {
                        dispatch(addFolderErrorMessage(errorMessage));
                    } else {
                        dispatch(addNotification('Task was not successful', 'error',  5, 'Task was not successful' ));
                    }
                }

                if (!nohideLoaderModalAndNoSpinner) {
                    dispatch(addFolderRemoveSpinner());
                }

                // Rethrow so returned Promise is rejected
                throw error;
            });

    };
}

export function addNewFolderAndAddNewProject(folderValues, projectValues) {
    return dispatch => {
        dispatch(addProjectAddSpinner());
        return dispatch(addOrEditFolder(folderValues, null, true))
            .then(id => dispatch(addOrEditProject(extend(projectValues, {folderId:id}),  null, true)))
            .then(() => {
                dispatch(addNotification('Adding project was successful', 'success',  5, 'Adding project was successful' ));
                dispatch(addFolderRemoveSpinner());
                dispatch(addProjectRemoveSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());
            })
            .catch(() => {
                dispatch(addNotification('Task was not successful', 'error',  5, 'Task was not successful' ));
                dispatch(addProjectRemoveSpinner());
            })
    };
}

export function getIntermodalVehicles(unitType) {
    return dispatch => {
        dispatch(showLoaderModal('LOADING_INDICATOR_MODAL'));
        return axios.get(`${INTERMODAL_VEHICLES}/byUnitType?unitType=${unitType}`, getConfig())

            .then(response => {
                dispatch(setUserVehicles(response.data));
                dispatch(hideModal());
                dispatch(hideLoaderModal());
            })
            .catch(error => {
                dispatch(hideModal());
                dispatch(hideLoaderModal());
            });

    };
}

export function addIntermodalVehicle(values, id) {
    return dispatch => {
        if (!values.unitType) {
            console.error("[ERROR: ] missing unitType in addIntermodalVehicle");
        }
        dispatch(showLoaderModal('LOADING_INDICATOR_MODAL'));
        return axios.post(INTERMODAL_VEHICLES, values, getConfig())
            .then(response => {
                if (id) {
                    dispatch(updateUserVehicle(response.data.result));
                } else {
                    dispatch(addUserVehicle(response.data.result));
                }
                dispatch(hideModal());
                dispatch(hideLoaderModal());
                dispatch(addNotification('Vehicle was successfully added', 'success', 5, 'Vehicle was successfully added'));
            })
            .catch(error => {
               console.error("[ERROR: ] addIntermodalVehicle post error: " + error + "\n" + JSON.stringify(error));
            });
    };
}

export function deleteIntermodalVehicle(id) {
    return dispatch => {
        dispatch(showLoaderModal('LOADING_INDICATOR_MODAL'));
        axios.delete(`${INTERMODAL_VEHICLES}/${id}`, getConfig())
            .then(response => {
                dispatch(setUserVehicles(response.data));
                dispatch(hideModal());
                dispatch(hideLoaderModal());
                dispatch(addNotification('Vehicle was successfully deleted', 'success', 5, 'Vehicle was successfully deleted'));
            })
            .catch(error => {
            });

    };
}


export function deleteProject(id, successMessage, errorMessage) {
    return dispatch => {
        dispatch(addProjectAddSpinner());
        axios.delete(`${PROJECTS_URL}/${id}`, getConfig())
            .then(response => {
                // update userProjects value
                dispatch(setUserProjects(response.data.result));
                dispatch(addProjectRemoveSpinner());
                dispatch(addNotification(successMessage, 'success',  5, successMessage ));
                dispatch(hideModal());
                dispatch(hideLoaderModal());
            })
            .catch(error => {
                dispatch(addProjectRemoveSpinner());
                dispatch(addNotification(errorMessage, 'error',  5,errorMessage ));
            });

    };
}

export function getFolders() {
    return dispatch => {
        return axios.get(FOLDERS_URL, getConfig())
            .then(response => {
                dispatch(setUserFolders(response.data));
            })
    };
}

export function deleteFolderWithId(id) {
    return dispatch => {
        return axios.delete(`${FOLDERS_URL}/${id}`, getConfig())
            .then(response => {
                dispatch(setUserFolders(response.data.result));
            })
    };
}

export function deleteProjects(projectIds) {
    return dispatch => {
        let promises = [];
        each(projectIds, function(projectId) {
            let promise = axios.delete(`${PROJECTS_URL}/${projectId}`, getConfig());
            promises.push(promise)
        })
        return Promise.all(promises)
    }
}

export function deleteFolder(id, successMessage, errorMessage, arrayOfProjectIds) {
    return dispatch => {
        dispatch(addFolderAddSpinner()),
            dispatch(deleteProjects(arrayOfProjectIds))
            .then(() => {dispatch(deleteFolderWithId(id))})
            .then(() => {dispatch(getProjects())})
            .then(() => {
                dispatch(addNotification(successMessage, 'success',  5, successMessage ));
                dispatch(setMyProjectsSelectedFolder(1));
                dispatch(addFolderRemoveSpinner());
                dispatch(hideModal());
                dispatch(hideLoaderModal());
            })
            .catch(() => {
                dispatch(addNotification('Task was not successful', 'error',  20, 'Task was not successful', false));
            })
    };
}

export function signOutRequest() {
    return dispatch => {
        localStorage.removeItem('userToken');
        dispatch(signOutSuccess());
        dispatch(setStoreStateToNill());
    };
}

export function fetchFoldersAndProjects() {
    return dispatch => Promise.all([
        dispatch(getFolders()),
        dispatch(getProjects()),
    ])

}

export function setMyProjectsSelectedFolder(object) {
    return {
        type: MY_PROJECTS_SET_CURRENTLY_SELECTED_FOLDER,
        payload: object
    };
}

export function setModalInitiaValues(object) {
    return {
        type: RESET_MODAL_TO_INITIAL_STATE,
        payload: object
    };
}

export function setPopupInitiaValues(object) {
    return {
        type: RESET_POPUP_TO_INITIAL_STATE,
        payload: object
    };
}

export function setNotificationInitiaValues(object) {
    return {
        type: RESET_NOTIFICATION_TO_INITIAL_STATE,
        payload: object
    };
}

export function setCompositeProjectValues(object) {
    return {
        type: NEW_COMPOSITE_SET_CURRENT_PROJECT_VALUES,
        payload: object
    };
}

export function setConcreteProjectValues(object) {
    return {
        type: CONCRETE_SET_CURRENT_PROJECT_VALUES,
        payload: object
    };
}

export function setParkingProjectValues(object) {
    return {
        type: PARKING_SET_CURRENT_PROJECT_VALUES,
        payload: object
    };
}

export function setOverlayProjectValues(object) {
    return {
        type: OVERLAY_SET_CURRENT_PROJECT_VALUES,
        payload: object
    };
}

export function setUserProjects(object) {
    return {
        type: SET_USER_PROJECTS,
        payload: object
    };
}

// export function updateUserProject(object) {
//   return {
//     type: UPDATE_USER_PROJECT,
//     payload: object
//   };
// }

export function setUserFolders(object) {
    return {
        type: SET_USER_FOLDERS,
        payload: object
    };
}

export function setStoreStateToNill() {
    return {
        type: SET_STORE_STATE_TO_NILL,
    };
}

export function addUserFolder(object) {
    return {
        type: ADD_USER_FOLDER,
        payload: object

    };
}

export function addUserVehicle(object) {
    return {
        type: UPDATE_USER_VEHICLE,
        payload: object

    };
}

export function updateUserVehicle(object) {
    return {
        type: UPDATE_USER_VEHICLE,
        payload: object

    };
}

export function addUserProject(object) {
    return {
        type: ADD_USER_PROJECT,
        payload: object

    };
}

export function addFolderErrorMessage(error) {
    return {
        type: ADD_FOLDER_ERROR_MESSAGE,
        payload: error
    }
}

export function addFolderAddSpinner() {
    return {
        type: ADD_FOLDER_ADD_SPINNER
    }
}

export function addFolderRemoveSpinner() {
    return {
        type: ADD_FOLDER_REMOVE_SPINNER
    }
}

export function addProjectErrorMessage(error) {
    return {
        type: ADD_PROJECT_ERROR_MESSAGE,
        payload: error
    }
}

export function addProjectShareErrorMessage(error) {
    return {
        type: ADD_PROJECT_SHARE_ERROR_MESSAGE,
        payload: error
    }
}

export function addProjectAddSpinner() {
    return {
        type: ADD_PROJECT_ADD_SPINNER
    }
}

export function addProjectRemoveSpinner() {
    return {
        type: ADD_PROJECT_REMOVE_SPINNER
    }
}

export function authErrorMessage(error) {
    return {
        type: AUTH_ERROR_MESSAGE,
        payload: error
    }
}

export function authSuccessMessage(message) {
    return {
        type: AUTH_SUCCESS_MESSAGE,
        payload: message
    }
}

export function setNonSignedInUser(boolean) {
    return {
        type: SET_AUTH_NON_SIGNED_IN_USER,
        payload: boolean
    }
}

export function showNonSignedInUserMessage(boolean) {
    return {
        type: SHOW_NON_SIGNED_IN_USER_MESSAGE,
        payload: boolean
    }
}

export function signInRequest() {
    return {
        type: SIGNIN_REQUEST
    }
}

export function signInSuccess() {
    return {
        type: SIGNIN_SUCCESS
    }
}

export function signOutSuccess() {
    return {
        type: SIGNOUT_SUCCESS
    }
}

export function signUpSuccess() {
    return {
        type: SIGNUP_SUCCESS
    }
}

export function removeSpinner() {
    return {
        type: REMOVER_SPINNER
    }
}

export function addSpinner() {
    return {
        type: ADD_SPINNER
    }
}

export function setAuthErrorMessage(message) {
    return {
        type: AUTH_ERROR_MESSAGE,
        payload: message
    }
}

export function setStateToInitialState() {
    return {
        type: SET_STATE_TO_INITIAL_STATE
    };
}

export function setCurrentProjectType(projectType) {
    return {
        type: SET_PROJECT_TYPE,
        payload: projectType
    };
}

export function setCurrentProjectUnitType(unitType) {
    return {
        type: SET_PROJECT_UNIT_TYPE,
        payload: unitType
    };
}

export function setCurrentProjectName(projectName) {
    return {
        type: SET_PROJECT_NAME,
        payload: projectName
    };
}

export function setCurrentProjectId(projectId) {
    return {
        type: SET_PROJECT_ID,
        payload: projectId
    };
}

export function setCurrentProjectRoute(route) {
    return {
        type: SET_PROJECT_ROUTE,
        payload: route
    };
}

export function setCurrentProjectDescription(description) {
    return {
        type: SET_PROJECT_DESCRIPTION,
        payload: description
    };
}

export function setCurrentProjectOwnersAgency(projectOwnersAgency) {
    return {
        type: SET_PROJECT_OWNERS_AGENCY,
        payload: projectOwnersAgency
    };
}
export function setCurrentProjectZipCode(zipCode) {
    return {
        type: SET_PROJECT_ZIP_CODE,
        payload: zipCode
    };
}

export function setCurrentProjectFormType(formType) {
    return {
        type: SET_CURRENT_PROJECT_FORMTYPE,
        payload: formType
    };
}

export function setCurrentProjectCreatedDate(dateCreated) {
    return {
        type: SET_PROJECT_CREATED_DATE,
        payload: dateCreated
    };
}

export function setCurrentProjectLastModifiedDate(lastModified) {
    return {
        type: SET_PROJECT_LAST_MODIFIED_DATE,
        payload: lastModified
    };
}

export function setCurrentProjectDesigner(designer) {
    return {
        type: SET_PROJECT_DESIGNER,
        payload: designer
    };
}

export function setCurrentProjectFolderId(folderId) {
    return {
        type: SET_PROJECT_FOLDER_ID,
        payload: folderId
    };
}

//Intermodal
export function setUserVehicles(values) {
    return {
        type: SET_USER_VEHICLES,
        payload: values
    };
}

export function addSelectedUserVehicles(values) {
    return {
        type: ADD_SELECTED_USER_VEHICLE,
        payload: values
    };
}

export function removeSelectedUserVehiclesAtIndex(index) {
    return {
        type: REMOVE_SELECTED_USER_VEHICLE,
        payload: index
    };
}

export function setUserVehicleWheelCount(values) {
    return {
        type: SET_INTERMODAL_ADD_VEHICLE_WHEEL_COUNT,
        payload: values
    };
}

export function setUserVehicleWheelPostions(values) {
    return {
        type: SET_INTERMODAL_ADD_VEHICLE_WHEEL_POSITIONS,
        payload: values
    };
}

export function setIntermodalProjectValues(values) {
    return {
        type: INTERMODAL_SET_CURRENT_PROJECT_VALUES,
        payload: values
    };
}

