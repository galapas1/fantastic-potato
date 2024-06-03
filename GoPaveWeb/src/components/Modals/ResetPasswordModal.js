import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { resetPassword, setAuthErrorMessage, authSuccessMessage } from 'Actions';
import { Link } from 'react-router';
import './Modals.scss';
import { ModalWrapper } from 'Components';
import Loader from 'halogen/ClipLoader';
import {
 RESET_PASSWORD_MODAL,
} from  'Constants';

const modalStyle = {
  width:400,
  height:310,
  backgroundColor: '#ededed',
  borderRadius:20,
  padding:10,
  display:"table"
}

const renderField = field => (
    <div>
      <input {...field.input} type={field.type} placeholder={field.placeholder} className={field.className} style={{borderColor: field.meta.touched &&  field.meta.error ? 'red' : '' }} />
      {field.meta.touched && field.meta.error && <div className="error" style={{fontSize: 10}}>{field.meta.error}</div>}
    </div>
);

class Reset extends Component {

  componentWillMount() {
    const { setAuthErrorMessage, authSuccessMessage } = this.props;
    setAuthErrorMessage('');
    authSuccessMessage('');
  }

  handleFormSubmit( {email, password}) {
    const {setAuthErrorMessage, resetPassword, callback } = this.props;
    setAuthErrorMessage('');
    resetPassword({ email, password }, callback);  
  }

  showUserMessage() {
    const { authSuccesful,errorMessage } = this.props;
    if (authSuccesful) {
      return (
        <div className="submit-success">
            {authSuccesful}
        </div>
      )
    } else if (errorMessage){
        return (
          <div className="alert alert-danger submit-alert">
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
            <div className='spinnerClass' style={{height: 20, width: '40%', marginTop: 5}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
            <button disabled={true} className='btn btn-primary reset-button' action='submit'>Reset Password</button>
         </div>
       )
     } else {
      return (
        <div style={{display: 'flex', width: '85%'}}>
            <div style={{height: 20, width: '40%', marginTop:5}}></div>
            <button className='btn btn-primary reset-button' action='submit'>Reset Password</button>
         </div>
      )
     }
  }
 
 
  render() {
    const { handleSubmit, isNonSignedInUser, showNonSignedInUserMessage, showModal } = this.props;
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}>
         {isNonSignedInUser && showNonSignedInUserMessage && <div style={{textAlign: 'center', marginBottom: 10, fontWeight: 600}}>You need to sign in to save the project</div>}
         <form className="signin-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <label className="signup-label">RESET PASSWORD</label>
            <div style={{marginBottom: 5, display: 'flex', alignItems: 'center', width: '75%'}}>
              <div style={{backgroundImage: 'url(/images/Logo.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minWidth: 50, height: 50, marginTop: 10}}></div>
              <div style={{marginLeft: 20, color: '#3299CC'}}>Welcome to Pavement Designer</div>
            </div>
            <Field className="signup-fields first-div" name="email" type="text" component={renderField} placeholder="Enter Username"/>
            <Field className="signup-fields" name="password" type="password" component={renderField} placeholder="Choose a new Password"/>
            {this.showButtonAndSpinner()}
            <div style={{marginTop: 15, display: 'flex'}}>
              <div>Dont have an account?</div>
              <div onClick={() => showModal(RESET_PASSWORD_MODAL)} style={{color: '#3299CC', cursor: 'pointer', marginLeft: 3}}>Register Now</div>  
            </div>
            {this.showUserMessage()}
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
  let errorMessage; 
  let authSuccesful;
  let isFetching;
  let callback;
  let isNonSignedInUser;
  let showNonSignedInUserMessage;
  if (state.auth) {
    errorMessage =  state.auth.error;
    authSuccesful = state.auth.sucessMessage;
    isFetching = state.auth.isFetching;
    isNonSignedInUser = state.auth.isNonSignedInUser;
    showNonSignedInUserMessage = state.auth.showNonSignedInUserMessage;
  }

  if (state.currentProject && state.currentProject.modal) {
    if (state.currentProject.modal.callback) {
      callback = state.currentProject.modal.callback;
    }
  }
  return {
    errorMessage: errorMessage,
    authSuccesful: authSuccesful,
    isFetching: isFetching,
    callback:  callback,
    isNonSignedInUser: isNonSignedInUser,
    showNonSignedInUserMessage: showNonSignedInUserMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthErrorMessage: (error) => {
      dispatch(setAuthErrorMessage(error))
    },
    resetPassword: (values, callback) => {
      dispatch(resetPassword(values)).then(() => {
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

Reset = reduxForm({
  form: 'signup',
  validate
})(Reset);

Reset  = connect(
 mapStateToProps, mapDispatchToProps          
)(Reset);

export default Reset;

