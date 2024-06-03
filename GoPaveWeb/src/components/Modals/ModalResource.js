import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import CRCPModal from './CRCPModal';
import RCCModal from './RCCModal';
import AsphaltAnalysisConfirmation from './AsphaltAnalysisConfirmation';
import UserProjectsConfirmationModal from './UserProjectsConfirmationModal';
import OverlayBondedAsphaltModal from './OverlayBondedAsphaltModal';
import NonSignedInCreateProjectModal from './NonSignedInCreateProjectModal';
import SignedInCreateProjectModal from './SignedInCreateProjectModal';
import GeneratePdfReportModal from './GeneratePdfReportModal';
import OverwriteModal from './OverwriteModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';
import { setEditDefaultAsphaltAnalysisParametres, hideModal, showModal  } from 'Actions';
import {
 SIGN_IN_MODAL,
 SIGN_UP_MODAL,
 CONCRETE_CRCP_MODAL,
 CONCRETE_RCC_MODAL,
 USER_PROJECTS_CONFIRMATION_MODAL,
 ASPHALT_ANALYSIS_CONFIRMATION_MODAL,
 OVERLAY_BONDED_ASPHALT_MODAL,
 NON_SIGNED_IN_CREATE_PROJECT_MODAL,
 SIGNED_IN_CREATE_PROJECT_MODAL,
 GENERATE_PDF_REPORT_MODAL,
 OVERWRITE_MODAL,
 FORGOT_PASSWORD_MODAL,
 RESET_PASSWORD_MODAL
} from  'Constants';

class ModalResource extends Component {

  render() {
    switch (this.props.currentModal) {
      case SIGN_IN_MODAL:
        return <SignInModal {...this.props}/>;
      case SIGN_UP_MODAL:
        return <SignUpModal {...this.props}/>;
      case FORGOT_PASSWORD_MODAL:
        return <ForgotPasswordModal {...this.props}/>;
      case RESET_PASSWORD_MODAL:
        return <ResetPasswordModal {...this.props}/>;
      case CONCRETE_CRCP_MODAL:
        return <CRCPModal {...this.props}/>;
      case CONCRETE_RCC_MODAL:
        return <RCCModal {...this.props}/>;
      case USER_PROJECTS_CONFIRMATION_MODAL:
        return <UserProjectsConfirmationModal {...this.props}/>;
      case ASPHALT_ANALYSIS_CONFIRMATION_MODAL:
        return <AsphaltAnalysisConfirmation {...this.props}/>;
      case OVERLAY_BONDED_ASPHALT_MODAL:
        return <OverlayBondedAsphaltModal {...this.props}/>;
      case SIGNED_IN_CREATE_PROJECT_MODAL:
        return <SignedInCreateProjectModal {...this.props}/>;
      case NON_SIGNED_IN_CREATE_PROJECT_MODAL:
        return <NonSignedInCreateProjectModal {...this.props}/>;
      case GENERATE_PDF_REPORT_MODAL:
        return <GeneratePdfReportModal {...this.props}/>;
      case OVERWRITE_MODAL:
        return <OverwriteModal {...this.props}/>;
      default:
        return null;
    }   
  }
}

function mapStateToProps(state) {
  return {
    currentModal: state.currentProject.modal.currentModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modal) => {
      dispatch(showModal(modal))
    }
  }
}

ModalResource  = connect(mapStateToProps, mapDispatchToProps)(ModalResource);

export default ModalResource;
