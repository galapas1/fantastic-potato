import React, { Component } from 'react';
import ParentFormHeader from './ParentFormHeader';
import { signOutRequest } from 'Actions';
import { connect } from 'react-redux';
import './Forms.scss';

class ParentForm  extends Component {

  handleLogout = () => {
    this.props.router.push('/');
    this.props.logout();
  }

  render() {
    const { isUserSignedIn } = this.props;
    return(
      <div className='user-form'>
        <div className='background-div'></div> 
        {isUserSignedIn && <div onClick={this.handleLogout} style={{width: '10%', color: 'black', zIndex: 10, marginRight: 50, borderRadius: 20, border: '1px solid', marginTop: 5, marginBottom: 5, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>LOGOUT</div>}
        <ParentFormHeader routingParams={this.props.params} />
        {this.props.children}
      </div>    
    )
  }
}

function mapStateToProps(state) {
  const unitType = state.currentProject.projectDetails.unitType;
  const isUserSignedIn = state.auth.authenticated;

  return {
    isUserSignedIn, unitType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(signOutRequest());
    },  
  };
}

ParentForm  = connect(mapStateToProps, mapDispatchToProps)(ParentForm);

export default ParentForm;
