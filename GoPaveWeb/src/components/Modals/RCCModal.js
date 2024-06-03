/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Modals.scss';
import { ModalWrapper } from 'Components';
import '../CommonControls.scss'
import { withRouter } from 'react-router';

const modalStyle = {
   width:550,
   height:250,
   backgroundColor:"white",
   borderRadius:20,
   padding:10,
   display:"table"
}

class RCCModal extends Component {

  navigatePage() {
    this.props.hideModal();
    const link = `/projectTypes/${this.props.routingParams.projectType}/${this.props.routingParams.constructionType}/${this.props.routingParams.formType}/RCC`;
    this.props.router.push(link);
    }

 
     //<button className='btn btn-custom' style={{ marginRight: 20, fontSize: 15 }} onClick={this.props.hideModal}>CANCEL</button>

  render() {
    return (
      <div className='crcp-modal'>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}>
        <div style={{height: 320, display: "flex"}}>
          <div style={{width: '50%', height: 271, backgroundImage: "url(/images/RCC.png)", paddingRight: 120, marginRight: 30, borderRadius: "10%"}}></div>
          <div style={{display: "flex", flexDirection: "column", width: '50%'}}>
          <div style={{paddingBottom: 30}}>
                            <div style={{ fontWeight: "bold" }}>Roller-Compacted Concrete (RCC)</div>           
          </div>
          <div style={{ paddingBottom: 20 }}>RCC is a jointed plain concrete pavement installed using asphalt type pavers and rollers. Historically RCC has been used for industrial applications, but is now also being used in street, parking lot, and other applications. Due to the construction process, dowels cannot be incorporated into RCC Pavements. Consequently, load transfer is dependent on aggregate interlock.</div>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
                         
                            <button className='btn btn-custom' style={{ marginRight: 20, fontSize: 15 }} onClick={() => window.open("http://wikipave.org/index.php?title=Roller-compacted_concrete_(RCC)_pavement", "_blank")}>MORE INFO</button>           
            <button className='btn btn-custom' onClick={this.navigatePage.bind(this)} style={{marginRight: 20, fontSize: 15, backgroundColor: "#FE8350", color: 'white'}}>DESIGN RCC</button>
          </div>
         </div>
        </div>
        </ModalWrapper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routingParams: state.currentProject.modal.routingParams
  };
}

RCCModal = withRouter(connect(mapStateToProps, null)(RCCModal));

export default RCCModal;

