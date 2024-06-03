import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const ElasticityHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        The concrete modulus of elasticity, E, is stated in units of psi. It is roughly equal to 6,750 x MR, but is often assumed to be 4,000,000 psi.</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>28-Day Flexural Strength (ASTM C78), psi </span></div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Approximate Modulus of Elasticity (ASTM C469), psi </span></div>

         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>500 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3,375,000 </div>                     
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>550 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3,715,500 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>600 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4,050,000 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>650 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4,387,500 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>700 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4,725,000 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>750 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5,062,500 </div>
         </div>
  </div>   
   </div>
 </HelpScreenWrapper>
    </div >

export default ElasticityHelpScreen;