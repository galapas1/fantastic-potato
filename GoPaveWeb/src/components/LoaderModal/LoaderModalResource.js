import React, { Component } from 'react';
import { connect } from 'react-redux';;
import LoadingModal from './LoadingModal';
import {
 LOADING_INDICATOR_MODAL,
} from  'Constants';

class LoaderModalResource extends Component {

  render() {
    switch (this.props.loaderModal) {
      case LOADING_INDICATOR_MODAL:
        return <LoadingModal noBackgroundClickOption={true} {...this.props}/>;
      default:
        return null;
    }   
  }
}

function mapStateToProps(state) {
  return {
    loaderModal: state.currentProject.modal.loaderModal
  };
}

LoaderModalResource  = connect(mapStateToProps)(LoaderModalResource);

export default LoaderModalResource;