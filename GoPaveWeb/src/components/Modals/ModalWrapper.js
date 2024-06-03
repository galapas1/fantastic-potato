import React, { Component } from 'react';
import { hideModal } from 'Actions';
import { connect } from 'react-redux';

const styles = {
  back: {
    position: 'fixed',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    cursor: 'default',
    backgroundColor: 'rgba(255,255,255, 0.5)'
  }
};

class ModalWrapper extends Component {

   handleBackgroundClick (e) {
    if (e.target === e.currentTarget)
    {
      this.props.hideModal();
    }
  }

  renderCloseButton() {
    if(this.props.showClose){
        return (<i className="fa fa-times" style={{float: "right", fontSize: 25}} onClick={this.props.hideModal}></i>);
    }
  }

  // customStyle is used to give styles based on form values. Used by userProjectConfirmationModal
  render() {
    const { modalStyle, noBackgroundClickOption, children, customStyle } = this.props
    return (
      <div style={styles.back} onClick={noBackgroundClickOption ? '' : this.handleBackgroundClick.bind(this) }>
        <div style={{...modalStyle, ...customStyle}}>
          {this.renderCloseButton()}
          <div style={{height: '100%', width: 'inherit'}}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal())
    }
  };
}

ModalWrapper  = connect(null, mapDispatchToProps)(ModalWrapper);

export default ModalWrapper;
