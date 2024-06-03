import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ModalWrapper } from 'Components';
import { connect } from 'react-redux';
import './Modals.scss';
import { setEditDefaultAsphaltAnalysisParametres  } from 'Actions';

const modalStyle = {
   width: 350,
   height: 200,
   backgroundColor: 'white',
   borderRadius: 20,
   padding: 10,
   display: 'table',
   textAlign: 'center'
}

class AsphaltAnalysisConfirmation extends Component {

  onClickConfirmation() {
    this.props.hideModal();
    this.props.setEditDefaultAsphaltAnalysisParametres(this.props.module, true);
  }

  render() {
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}> 
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', height: 'inherit', alignItems: 'center', paddingBottom: 10}}>
            <div style={{paddingTop: 5, color: '#0FAFAF'}}>USER WARNING</div>
            <div style={{width: 'inherit'}}>These  default values should not be changed by users without AASHTO 93 Flexible Pavement Design experience</div>
            <button onClick={this.onClickConfirmation.bind(this)} style={{width: '40%', backgroundColor: 'rgb(50, 153, 204)'}} className='btn btn-primary'>CONFIRM</button>
          </div>
        </ModalWrapper>
      </div>
    )
    
  }
}

function mapStateToProps(state) {
  return {
    module: state.currentProject.modal.module
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditDefaultAsphaltAnalysisParametres: (module, canEdit) => {
      dispatch(setEditDefaultAsphaltAnalysisParametres(module, canEdit));
    }
  };
}

AsphaltAnalysisConfirmation  = connect(mapStateToProps, mapDispatchToProps)(AsphaltAnalysisConfirmation);

export default AsphaltAnalysisConfirmation;
