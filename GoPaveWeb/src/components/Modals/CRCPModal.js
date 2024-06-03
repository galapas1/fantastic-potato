import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Modals.scss';
import { ModalWrapper } from 'Components';
import '../CommonControls.scss'
import { withRouter } from 'react-router';
import {
 USER_PROJECTS_CONFIRMATION_MODAL,
 SAVE_PROJECT
} from  'Constants';

const modalStyle = {
   width:550,
   height:250,
   backgroundColor:"white",
   borderRadius:20,
   padding:10,
   display:"table"
}

class CRCPModal extends Component {

  navigatePage() {
    const { projectType, constructionType, formType } = this.props.routingParams;
    const { router, hideModal } = this.props;
    const link = `/projectTypes/${projectType}/${constructionType}/${formType}/CRCP`;
    hideModal();
    router.push(link);  
  }
 
  render() {
    return (
      <div className='crcp-modal'>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}>
        <div style={{height: 320, display: "flex"}}>
          <div style={{width: '50%', height: 200, backgroundImage: "url(/images/CRCP.png)", paddingRight: 120, marginRight: 30, borderRadius: "10%"}}></div>
          <div style={{display: "flex", flexDirection: "column", width: '50%'}}>
          <div style={{paddingBottom: 30}}>
                            <div style={{ fontWeight: "bold" }}>Continuously Reinforced Concrete Pavement (CRCP)</div>            
          </div>
          <div style={{paddingBottom: 20}}>CRCP is a pavement type typically reserved for long-life, high volume roadways due to a high steel content. For best design results, AASHTOWare’s Pavement ME Design program should be utilized.</div>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className='btn btn-custom' style={{ marginRight: 20, fontSize: 15 }} onClick={() => window.open("http://wikipave.org/index.php?title=Continuously_Reinforced_Concrete_Pavement_(CRCP)", "_blank")}>MORE INFO</button>
            <button className='btn btn-custom' onClick={this.navigatePage.bind(this)} style={{marginRight: 20, fontSize: 15, backgroundColor: "#FE8350", color: 'white'}}>DESIGN CRCP</button>
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

CRCPModal  = withRouter(connect(mapStateToProps)(CRCPModal));

export default CRCPModal;

