import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const DesignLaneDistributionHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
             Design lane distribution refers to the percent of vehicles in one direction that use one lane of the roadway the most. For example, on 4-lane divided highways, 90% of the traffic on average uses the right lane (or driving lane), and 10% of the traffic uses the left lane (or passing lane). The table lists the percentage of trucks that use the design lane, based on number of lanes in both directions:</div> 
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Number of Lanes</span></div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Recommended Design Lane Distribution (%)</span></div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Recommended Range for Design Lane Distribution(%)</span></div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2</div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>100 </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>100 </div>                   
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4</div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>90 </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>80-100 </div>
         </div>   <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>6</div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>70 </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>60-80 </div>                   
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>8</div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>50 </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>40-75 </div>
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>10</div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>40 </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>30-60 </div>
         </div>
  </div>   
   </div>
 </HelpScreenWrapper>
    </div >

export default DesignLaneDistributionHelpScreen;