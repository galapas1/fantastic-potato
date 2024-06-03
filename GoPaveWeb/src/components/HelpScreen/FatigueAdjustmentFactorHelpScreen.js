import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const FatigueAdjustmentFactorHelpScreen = (props) => 
<div>
 <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                    This factor adjusts for past fatigue damage that may exist in the slab. It is determined by the extent of transverse cracking (JPCP, JRCP) that may be caused primarily by repeated loading.</div>
                <div style={{ display: 'flex', paddingright: 1 }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Few transverse cracks (less than 5% slabs cracked) </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>0.97-1.00</div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>A significant number of transverse cracks (5%-15% slabs cracked) </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>0.94-0.96</div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>A large number of transverse cracks (more than 15% slabs cracked) </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>0.90-0.93</div>
                </div>
                </div> 
              </HelpScreenWrapper>
</div>


export default FatigueAdjustmentFactorHelpScreen;