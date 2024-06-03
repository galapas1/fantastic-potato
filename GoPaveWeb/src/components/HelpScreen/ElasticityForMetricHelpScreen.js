import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const ElasticityForMetricHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        The concrete modulus of elasticity, E, is stated in units of MPa. It is roughly equal to 6,750 x MR, but is often assumed to be 27,580 Mpa.</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>28-Day Flexural Strength (ASTM C78), MPa </span></div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Approximate Modulus of Elasticity (ASTM C469), MPa </span></div>

         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.45 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>23,270.6 </div>                     
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.79 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>25,597.7 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4.14 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>27,924.8 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4.48 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>30,251.8 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4.83 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>32,578.9 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5.17 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>34,905.9 </div>
         </div>
  </div>   
   </div>
 </HelpScreenWrapper>
    </div >

export default ElasticityForMetricHelpScreen;
