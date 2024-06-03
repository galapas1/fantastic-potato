import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const ReliabilityHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        Reliability, simply stated, is the factor of safety of the pavement design. It is a measure of how likely the specified design will perform before "failure." In concrete pavements, that means the pavement will "fail" either due to fatigue (a crack will form) or erosion (the subgrade material will pump out from under the pavement). The recommended level of reliability depends on the type of roadway that is being designed. A relatively high reliability is used for high traffic, high speed roadways, while low traffic, low speed roads typically need a low level of reliability.</div>
    <div style={{ marginBottom: 15 }}>
       PavementDesigner incorporates the user-entered reliability via probabilistic models, based on accumulated fatigue damage in beam tests, to estimate the probability of obtaining a certain percentage of cracking at a given level of reliability.  Consistent with asphalt industry practice, StreetPave incorporates the user-entered reliability by directly adjusting the resilient modulus of the subgrade (MRSG Design) for asphalt pavement designs.</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
      <div style={{display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)'}}>
                        <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Functional Classification of Roadway</span></div>
                        <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Recommended Reliability Level</span></div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Urban</span></div>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Rural</span></div>
                                </div>
                            </div>
                        </div>
                           
      </div>
      <div style={{display: 'flex', borderBottom: '1px solid'}}>
        <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Interstates, Freeways, and Tollways</div>
        <div style={{width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>85% - 99% </div>
        <div style={{width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>80% - 99% </div>
       </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Principal Arterials</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>80% - 99% </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>75% - 95% </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Collectors</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>80% - 99% </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>75% - 95% </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Local Roads</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>50% - 80% </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>50% - 80% </div>
      </div>
    </div>   
   </div>
 </HelpScreenWrapper>
    </div>


export default ReliabilityHelpScreen;