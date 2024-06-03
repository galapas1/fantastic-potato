import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const FlexStrengthHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        The modulus of rupture (MR), or flexural strength of the concrete, is stated in units of psi. It is measured at 28 days using the third-point loading of a simple beam test, ASTM C78 or AASHTO T97. The value used for design should be the average 28-day in-field stength and should be greater than the minimum specified strength for construction. Typical values range from 500 to 700 psi.</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>28-Day Compressive Strength (ASTM C39), psi</span></div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Typical Flexural Strength (ASTM C78) Corresponding to 28-Day Compressive Strength, psi</span></div>
         
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3,000 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>450-550 </div>
                 
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4,000 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>510-630 </div>

         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5,000 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>570-710 </div>

         </div>
  </div>   
   </div>
 </HelpScreenWrapper>
    </div >

export default FlexStrengthHelpScreen;