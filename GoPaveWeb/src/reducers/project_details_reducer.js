import {
  SET_PROJECT_TYPE,
  SET_PROJECT_NAME,
  SET_PROJECT_DESCRIPTION,
  SET_PROJECT_ROUTE,
  SET_PROJECT_OWNERS_AGENCY,
  SET_PROJECT_ZIP_CODE,
  SET_PROJECT_UNIT_TYPE,
  SET_PROJECT_ID,
  SET_CURRENT_PROJECT_FORMTYPE,
  SET_STATE_TO_INITIAL_STATE,
  SET_PROJECT_CREATED_DATE,
  SET_PROJECT_LAST_MODIFIED_DATE,
  SET_PROJECT_DESIGNER,
  SET_PROJECT_FOLDER_ID
} from '../actions/types';

const initialState = {
  projectType    : '',
  name           : '',
  description    : '',
  designer       : '',
  route          : '',
  ownersAgency   : '',
  zipCode        : '',
  unitType       :'US',
  projectFormType: '',
  dateCreated    : '',
  lastModified   : '',
  folderId       : ''
}

export default function(state = initialState, action) {
   switch (action.type) {
    case SET_PROJECT_TYPE:
      return {...state, projectType: action.payload };
    case SET_PROJECT_NAME:
      return {...state, name: action.payload };
    case SET_PROJECT_DESCRIPTION:
      return {...state, description: action.payload };
    case SET_PROJECT_ROUTE:
      return {...state, route: action.payload };
    case SET_PROJECT_OWNERS_AGENCY:
      return {...state, ownersAgency: action.payload };
    case SET_PROJECT_ZIP_CODE:
      return {...state, zipCode: action.payload };
    case SET_PROJECT_UNIT_TYPE:
      return {...state, unitType: action.payload };
    case SET_PROJECT_ID:
      return {...state, id: action.payload };
    case SET_PROJECT_FOLDER_ID:
      return {...state, folderId: action.payload };
    case SET_PROJECT_CREATED_DATE:
      return {...state, dateCreated: action.payload };
    case SET_PROJECT_LAST_MODIFIED_DATE:
      return {...state, lastModified: action.payload };
    case SET_CURRENT_PROJECT_FORMTYPE:
      return {...state, projectFormType: action.payload };
     case SET_PROJECT_DESIGNER:
      return {...state, designer: action.payload } 
    case SET_STATE_TO_INITIAL_STATE: 
      return initialState;
    default:
      return state;
  }
}
