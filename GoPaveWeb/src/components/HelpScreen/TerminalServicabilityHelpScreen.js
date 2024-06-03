import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const TerminalServicabilityHelpScreen = (props) => 
    <div>
        <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                    Typical Terminal (or minimum) Serviceability values for various road and street classifications are listed below.  See the Initial Serviceability help screen for more details on serviceability.</div>
                <div style={{ display: 'flex', paddingright: 1}}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Interstate and Major Highways or Arterials </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>2.50</div>
                    </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Prime Secondary Routes, Industrial and Commercial Streets </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>2.25</div>
                     </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Secondary Routes, Residential Streets and Parking Lots </div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>2.00</div>
                     </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '75%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Failure at the AASHTO Road Test</div>
                    <div style={{ width: '25%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>1.50</div>
                     </div>
                </div>
        </HelpScreenWrapper>
    </div>


export default TerminalServicabilityHelpScreen;