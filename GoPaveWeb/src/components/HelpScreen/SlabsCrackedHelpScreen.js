import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const SlabsCrackedHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        This input should reflect the allowable percent of concrete slabs that are cracked at the end of the design life of the pavement.  This number could correspond to the percent of slabs that are intended to be replaced in determining future rehabilitation of the pavement for life cycle cost analysis.  Recommended percentages are as follows:</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
      <div style={{display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)'}}>
                        <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Type</span></div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Recommended Percent of Concrete Slabs Cracked at End of Design Life</span></div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Terminal Serviceability</span></div>
      </div>
            <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                        <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Interstate Highways, Expressways,Tollways, Turnpikes</div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5% </div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2.50 </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                        <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>State Roads, Arterials, Collectors, County Roads</div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>15% </div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2.00-2.25 </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                        <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Residential Streets</div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>25% </div>
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2.00 </div>
      </div>
    </div>   
   </div>
 </HelpScreenWrapper>
    </div>


export default SlabsCrackedHelpScreen;