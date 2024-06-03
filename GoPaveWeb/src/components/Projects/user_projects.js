import React from 'react';
import { connect } from 'react-redux';

import UserProjectsSelector from 'Selectors/user_projects_by_folder';

const UserProjects = (props) => {
  return null;
}

const mapStateToProps = state => {
  return {
    userProjects: UserProjectsSelector(state)
  }
}

export default connect(mapStateToProps)(UserProjects);
