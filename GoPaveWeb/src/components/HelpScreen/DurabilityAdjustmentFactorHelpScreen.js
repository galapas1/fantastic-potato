import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const DurabilityAdjustmentFactorHelpScreen = (props) => 
<div>
 <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                    This factor adjusts for an extra loss in pavement serviceability index (PSI) of the overlay when the exsiting slab has durability problems such as cracking or reactive aggregate distress. Using condition survey data for the existing concrete pavement, the value is determined as follows:</div>
                <div style={{ display: 'flex', paddingright: 1 }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>No Sign of Durability Problems</div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>1.00</div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Durability Cracking Exists, but no Spaling: </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>0.96-0.99</div>
                </div>
                <div style={{ display: 'flex' }}>
                        <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Cracking and Spaling Exist </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>0.80-0.95</div>
                </div>
            </div> 
              </HelpScreenWrapper>
</div>


export default DurabilityAdjustmentFactorHelpScreen;