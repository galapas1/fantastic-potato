import { createSelector } from 'reselect';
import { pick, extend } from 'underscore';

const userProjectsSelector = state => state.userProjects.projects
const previousProjectSelector = state => state.currentProject.projectDetails.id;

const previousProjectState = (projects, previousProjectId) => { 
  // Create an object with folderId's as keys and an empty array as values

  let formValues = {};
  let project
  if (projects && previousProjectId) {
    project =  projects[previousProjectId] || '';
    if (project) {
      formValues = JSON.parse(project.body); 
      formValues.projectDetails = pick(project, 'name', 'description', 'route', 'zipCode', 'designer', 'projectType', 'id', 'ownersAgency', 'folderId', 'unitType');
    }
  }
  return { formValues }      
}

export default createSelector(
  userProjectsSelector, // pick off a piece of state
  previousProjectSelector, // pick off a piece of state
  previousProjectState // last argument is the function that has select logic
);

