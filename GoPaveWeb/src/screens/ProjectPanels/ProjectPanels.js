/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router';
import ProjectPanel from './components/ProjectPanel';
import { signOutRequest } from 'Actions';
import { connect } from 'react-redux';
import './ProjectPanels.scss';
import { panelValues } from 'Data/PanelValues';
import {
  SLIDE_IN
} from 'Constants';


class ProjectPanels extends Component {

  handleLogout = () => {
    this.props.router.push('/');
    this.props.logout();
  }

  addBackButton(projectType) {
    const { isUserSignedIn } = this.props;
    if (projectType) {
      return (
        <div style={{width: '90%', height: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {isUserSignedIn && <div onClick={this.handleLogout} style={{width: '10%', color: 'black', zIndex: 10, marginRight: 50, borderRadius: 20, border: '1px solid', marginTop: 5, marginBottom: 5, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>LOGOUT</div>}
          <div className='user-form-header' style={{justifyContent: 'center', height: 60, marginTop: isUserSignedIn ? '' : 20}}>
            <div style={{ fontSize: 16, width: 200}}>
              <Link to={{ pathname: '/projectTypes', state: { transition: SLIDE_IN } }} style={{color: 'white'}}>
              <i className='fa fa-chevron-left' style={{paddingLeft: 10, cursor: 'pointer'}} ></i>
              <label style={{paddingLeft: 5, cursor: 'pointer' }}>Select Project Type</label>  
              </Link>
            </div>
            <label style={{fontSize: 25, textTransform: 'capitalize', width: '86%', paddingRight: 40}}>{`Select ${projectType} Project Type`}</label>
            </div> 
        </div>
      );
    } else {
        return (
          <div style={{width: '90%', height: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {isUserSignedIn && <div onClick={this.handleLogout} style={{width: '10%', color: 'black', zIndex: 10, marginRight: 50, borderRadius: 20, border: '1px solid', marginTop: 5, marginBottom: 5, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>LOGOUT</div>}
            <div className='user-form-header' style={{justifyContent: 'center', marginTop: isUserSignedIn ? '' : 20}}>
              <label style={{fontSize: 25, textTransform: 'capitalize'}}>Select Project Type</label>
            </div>
            
          </div>
        )
    }
  }

  render() {
    const projectType = this.props.params.projectType;
    
    let options;

    if (projectType) {
      options = panelValues[projectType];
    } else {
      options = panelValues;
    }
    
    return (
        <div className='new-projects'> 
         {this.addBackButton(projectType)}
        <div className='parent-content'>
           <ProjectPanel options={options['values'][0]}>{options['types'][0]}></ProjectPanel>
           <ProjectPanel options={options['values'][1]}>{options['types'][1]}></ProjectPanel>
           <ProjectPanel options={options['values'][2]}>{options['types'][2]}></ProjectPanel>
        </div>        
     </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUserSignedIn:state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(signOutRequest());
    },    
  };
}

ProjectPanels  = connect(mapStateToProps, mapDispatchToProps)(ProjectPanels);

export default ProjectPanels;
