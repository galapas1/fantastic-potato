import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ModalWrapper, ToggleButton } from 'Components';
import { connect } from 'react-redux';
import {  setCurrentProjectUnitType } from 'Actions';
import './Modals.scss';
import { withRouter } from 'react-router';
import {
  METRIC,
  US
} from  'Constants';

const modalStyle = {
  width: 350,
  height: 120,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 10,
  display: 'table',
  textAlign: 'center'
}

class NonSignedInCreateProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectUnitValue: US,
    }
  }
  
  setProjectUnitValue(value) {
    this.setState({projectUnitValue: value})
  }

  onConfimButtonClick() {
    const { hideModal, router } = this.props;
    setCurrentProjectUnitType(this.state.projectUnitValue);
    const linkRoute = '/projectTypes';

    hideModal();
    router.push(linkRoute);
  }
  render() {
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle} customStyle={{border:'1px solid lightblue' }} > 
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', height: 'inherit', alignItems: 'center', paddingBottom: 10}}>
            <div  style={{paddingTop: 5, color: '#0FAFAF', fontSize: 18}}>CREATE NEW PROJECT</div>           
           <button onClick={this.onConfimButtonClick.bind(this)} style={{width: '40%', backgroundColor: 'rgb(102, 153, 0)', color: 'white'}} className='btn'>START PROJECT</button>
          </div>
        </ModalWrapper>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProjectUnitType: (values) => {
      dispatch(setCurrentProjectUnitType(values));
    },
  };
}

NonSignedInCreateProjectModal  = withRouter(connect(null, mapDispatchToProps)(NonSignedInCreateProjectModal));

export default NonSignedInCreateProjectModal;
