import { createSelector } from 'reselect';
import { each, reject } from 'underscore';

const userProjectsSelector = state => state.userProjects.projects
const userFoldersSelector = state => state.userFolders.folders

const getUserProjectsByFolders = (projects, folders) => {
  let userProjectsByFolder = {};
  // Create an object with folderId's as keys and an empty array as values
  each(folders, function(folder) {
     userProjectsByFolder[folder.id] = [];
  })

  // Add each project 
  each(projects, function(project) {
    userProjectsByFolder[project.folderId].push(project);
  })

  return userProjectsByFolder;
  
}

export default createSelector(
  userProjectsSelector, // pick off a piece of state
  userFoldersSelector, // pick off a piece of state
  getUserProjectsByFolders // last argument is the function that has select logic
);


