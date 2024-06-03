import React, { Component } from 'react';
import { ModalWrapper } from 'Components';
import { Link } from 'react-router';
import './Modals.scss';

const modalStyle = {
   width: 550,
   height: 325,
   backgroundColor: 'white',
   borderRadius: 20,
   padding: 10,
   display: 'table',
   textAlign: 'center'
}

class OverlayBondedAsphaltModal extends Component {

  onClickConfirmation() {
    this.props.hideModal();
    this.props.setEditDefaultAsphaltAnalysisParametres(this.props.module, true);
  }

  render() {
    return (
      <div>
        <ModalWrapper {...this.props} showClose={true} modalStyle={modalStyle}> 
          <div style={{display: "flex", flexDirection: "column", height: 'inherit', width: '95%', alignItems: 'center', paddingBottom: 10, marginBottom: 40}}>
            <div style={{height: '85%', marginBottom: 10, width: 'inherit'}}>
              <div style={{display: 'flex', paddingTop: 10, marginBottom: 20, height: '20%', alignItems: 'center'}}>
                <div style={{width: '20%', backgroundImage: 'url(/images/BCOA_ME.png)', backgroundRepeat: 'no-repeat', height: '100%'}}></div>
                <div style={{color: '#0FAFAF', marginLeft: 20}}>GUIDANCE FOR BONDED CONCRETE ON ASPHALT</div>  
              </div>
              <div>
              The bonded concrete overlay of asphalt mechanistic-empirical design procedure (BCOA-ME) was developed at the University of Pittsburgh under the FHWA Pooled Fund Study TPF 5-165.  This pavement structure has been referred to as thin and ultra-thin white-topping. This site is a repository for all information relating to the BCOA-ME. <br/> <br/>The information has been sorted based on its intended use and can be retrieved by clicking on the “BCOA-ME” button below.
              </div>
            </div> 
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                <a style={{border: '1px solid', backgroundColor: '#808000', color: 'white', padding: 5 }} target="_blank" href="http://www.engineering.pitt.edu/Sub-Sites/Faculty-Subsites/J_Vandenbossche/BCOA-ME/BCOA-ME-Design-Guide/">ACCESS BCOA-ME</a>   
            </div>
          </div>

        </ModalWrapper>
      </div>
    )
    
  }
}


export default OverlayBondedAsphaltModal;
