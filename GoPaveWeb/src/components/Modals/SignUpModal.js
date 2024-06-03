/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { signUpUser, setAuthErrorMessage, authSuccessMessage } from 'Actions';
import { Link } from 'react-router';
import './Modals.scss';
import { ModalWrapper } from 'Components';
import Loader from 'halogen/ClipLoader';
import {
 SIGN_IN_MODAL
} from  'Constants';

const renderField = field => (
    <div>
      <input {...field.input} type={field.type} placeholder={field.placeholder} className={field.className} style={{borderColor: field.meta.touched &&  field.meta.error ? 'red' : '' }}/>
      {field.meta.touched && field.meta.error && <div className='error' style={{fontSize: 10}}>{field.meta.error}</div>}
    </div>
);

const modalStyle = {
  width:400,
  height:350,
  backgroundColor: '#ededed',
  borderRadius:20,
  padding:10,
  display:'table'
}

class Signup extends Component {

  componentWillMount() {
    const {setAuthErrorMessage, authSuccessMessage } = this.props;
    setAuthErrorMessage('');
  }

  handleFormSubmit( {email, password}) {
    const {setAuthErrorMessage, authSuccessMessage, signUpUser, callback } = this.props;
    setAuthErrorMessage('');
    signUpUser( { email, password }, callback);
  }

  showUserMessage() {
    const { authSuccesful, errorMessage } = this.props;
    if (authSuccesful) {
      return (
        <div className='submit-success'>
            {authSuccesful}
        </div>
      )
    } else if (errorMessage){
        return (
          <div className='alert alert-danger submit-alert'>
            {errorMessage}
          </div>
        )  
      }
  }

  showButtonAndSpinner() {
    const { isFetching } = this.props;
    if (isFetching) {
       return (
         <div style={{display: 'flex', width: '85%'}}>
            <div className='spinnerClass' style={{height: 20, width: '30%', marginTop: 5}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
            <button disabled={true} className='btn btn-primary signup-button' action='submit'>CREATE ACCOUNT</button>
         </div>
       )
     } else {
      return (
        <div style={{display: 'flex', width: '85%'}}>
            <div style={{height: 20, width: '30%', marginTop:5}}></div>
            <button className='btn btn-primary signup-button' action='submit'>CREATE ACCOUNT</button>
         </div>
      )
     }
  }
 
  render() {
    const { handleSubmit, showModal } = this.props;
    return (
      <div >
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}>
          <form className='signin-form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <label className='signup-label'>Register</label>
            <div style={{marginBottom: 5, display: 'flex', alignItems: 'center', width: '75%'}}>
              <div style={{backgroundImage: 'url(/images/Logo.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minWidth: 50, height: 50, marginTop: 10}}></div>
              <div style={{marginLeft: 20, color: '#3299CC'}}>Welcome to Pavement Designer</div>
            </div>
            <div style={{color: '#3299CC', marginBottom: 15}} >Please enter Email (Username) & Password to Register </div>
            <Field className='signup-fields first-div' name='email' type='text' component={renderField} placeholder='Enter Username'/>
            <Field className='signup-fields' name='password' type="password" component={renderField} placeholder='Enter Password'/>
            {this.showButtonAndSpinner()}
            <div style={{marginTop: 15, display: 'flex'}}>
              <div>Already Registered?</div>
              <div onClick={() => showModal(SIGN_IN_MODAL)} style={{color: '#3299CC', cursor: 'pointer', marginLeft: 3}}>Login Here</div>  
            </div>
          </form>
       </ModalWrapper>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter a username';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  } else if  (values.password.length < 6) {
    errors.password = 'Passwords must be atleast 6 characters';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authSuccesful: state.auth.sucessMessage,
    isFetching: state.auth.isFetching,
    callback:  state.currentProject.modal.callback
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthErrorMessage: (error) => {
      dispatch(setAuthErrorMessage(error))
    },
    signUpUser: (values, callback) => {
      dispatch(signUpUser(values)).then(() => {
        if (callback) {
          callback()
        }
      }); 
    },
    authSuccessMessage: (message) => {
      dispatch(authSuccessMessage(message));
    },
  };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

Signup  = connect(
 mapStateToProps, mapDispatchToProps          
)(Signup)

export default Signup;
