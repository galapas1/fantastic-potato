import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const InitialServicabilityHelpScreen = (props) => 

 <div>
        <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                    According to AASHTO, the serviceability of a pavement is defined as ''its ability to serve the type of traffic which uses the facility''. At the Road Test, a scale was developed to represent the condition of the pavement. This scale, known as the Present Serviceability Index (PSI) ranges from 0 to 5; 0 represents a roadway that is impossible to travel while 5 represents a roadway in perfect condition. In practice, a pavement with a rating of 0 never exists and a pavement which is flawless is very rare. For comparison, the average Initial Serviceability of concrete pavements at the Road Test was 4.5, versus 4.2 for asphalt pavements.</div>
                <div style={{ display: 'flex', paddingright: 1}}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Very Good </div>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>5.0 - 4.0 </div>
                    </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Good </div>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>4.0 - 3.0 </div>
                     </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Fair </div>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>3.0 - 2.0 </div>
                     </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Poor </div>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>2.0 - 1.0 </div>
                     </div>
                     <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>Very Poor </div>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'left', justifyContent: 'left' }}>1.0 - 0.0 </div>
                     </div>
                </div>
        </HelpScreenWrapper>
    </div>

export default InitialServicabilityHelpScreen;