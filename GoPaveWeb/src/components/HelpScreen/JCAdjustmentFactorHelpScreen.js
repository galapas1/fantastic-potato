import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const JCAdjustmentFactorHelpScreen = (props) => 
<div>
 <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                 This factor adjusts for the extra loss in pavement serviceability index (PSI) caused by deteriorated reflected cracks in the overlay that could result from any unrepaired deteriorated joints, cracks, and other discontinuities in the existing slab. </div>
                <div style={{ marginBottom: 5 }}>According to figure 5.12 in the AASHTO Guide, the minimum for Fjc is 0.56. It is recomended that all deteriorated joints and cracks and any other major discountinuities in the existing concrete slab be repaired full-depth prior to placing the overlay so that Fjc = 1.0. If it is not possible to repair all deteriorated areas, the summation of the following should be used in this field to calculate the Joint/Crack Adjustment Factor:</div>
                <div style={{ display: 'list-item', paddingLeft: 20}}>Number of unrepaired deteriorated joints per mile</div>
                <div style={{ display: 'list-item', paddingLeft: 20 }}>Number of unrepaired deteriorated cracks per mile</div>
                <div style={{ display: 'list-item', paddingLeft: 20 }}>Number of unrepaired punchouts per mile</div>
                <div style={{ display: 'list-item', paddingLeft: 20 }}>Number of expansion joints, exceptionally wide joints (> 1 inch), or full-depth asphalt patches per mile</div>               
                </div>
              </HelpScreenWrapper>
</div>


export default JCAdjustmentFactorHelpScreen;