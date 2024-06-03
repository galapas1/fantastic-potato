/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { forgotPassword, setAuthErrorMessage } from 'Actions';
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
  width:440,
  height:225,
  backgroundColor: '#ededed',
  borderRadius:20,
  padding:10,
  display:'table'
}

class ForgotPasswordModal extends Component {

  handleFormSubmit( {email}) {

    const {forgotPassword, hideModal, setAuthErrorMessage } = this.props;
    setAuthErrorMessage('');
    forgotPassword({ email });  
  }

  showUserMessage() {
    const { errorMessage } = this.props;
    if (errorMessage){
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
            <div className='spinnerClass' style={{height: 20, width: '30%', marginTop: 20}}><Loader color='#3299CC' size='35px' margin='1px'/></div>
            <button disabled={true} className='btn btn-primary' style={{marginTop: 20}} action='submit'>Reset Password</button>
         </div>
       )
     } else {
      return (
        <div style={{display: 'flex', width: '85%'}}>
            <div style={{height: 20, width: '30%', marginTop:20}}></div>
            <button className='btn btn-primary'  style={{marginTop: 20}} action='submit'>Reset Password</button>
         </div>
      )
     }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}>
          <form className='signin-form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <label className='signup-label' style={{marginBottom: 20}}>Forgot Password</label>
            <div style={{color: '#3299CC', marginBottom: 20}} >Please enter the Registration Email (Username) to reset password </div>
            <Field className='signup-fields first-div' name='email' type='text' component={renderField} placeholder='Enter Username/Email'/>
             {this.showButtonAndSpinner()}
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

  return errors;
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (error) => {
      dispatch(forgotPassword(error));
    },
    setAuthErrorMessage: (error) => {
      dispatch(setAuthErrorMessage(error))
    }, 
  };
}

ForgotPasswordModal = reduxForm({
  form: 'ForgotPasswordModal',
  validate
})(ForgotPasswordModal);


ForgotPasswordModal  = connect(
 mapStateToProps, mapDispatchToProps          
)(ForgotPasswordModal);


export default ForgotPasswordModal;
