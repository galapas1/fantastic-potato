import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const MetricFlexStrengthHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        The modulus of rupture (MR), or flexural strength of the concrete, is stated in units of MPa. It is measured at 28 days using the third-point loading of a simple beam test, ASTM C78 or AASHTO T97. The value used for design should be the average 28-day in-field stength and should be greater than the minimum specified strength for construction. Typical values range from 3.45-4.83 MPa.</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>28-Day Compressive Strength (ASTM C39), MPa</span></div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Typical Flexural Strength (ASTM C78) Corresponding to 28-Day Compressive Strength, MPa</span></div>
         
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>20.7 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.10-3.79 </div>
                 
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>27.6 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.52-4.34 </div>

         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>34.5 </div>
             <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.93-4.90 </div>

         </div>
  </div>   
   </div>
 </HelpScreenWrapper>
    </div >

export default MetricFlexStrengthHelpScreen;