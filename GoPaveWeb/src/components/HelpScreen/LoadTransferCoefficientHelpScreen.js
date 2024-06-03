import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const LoadTransferCoefficientHelpScreen = (props) => 
<div>
 <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                    The following modified AASHTO load transfer coefficients are recommended by the American Concrete Pavement Association: </div>
                <div style={{ marginBottom: 15 }}>Recommended Values of the Drainage Coefficient (Cd) for Concrete Pavement Design  </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>

                    <div style={{ display: 'flex', backgroundColor: 'rgb(50, 132, 204)' }}>                    
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Millions of ESALs</span></div>
                        <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Edge Support</span></div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <span style={{ color: 'white' }}>Pavement Class</span></div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 132, 204)' }}>             
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: 'white' }}>No </span></div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}><span style={{ color: 'white' }}>Yes </span> </div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </div>
                    </div>
                                 
              
                    <div style={{ display: 'flex' }}>                   
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>0 to 0.3</div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Local </div>
                    </div>
                    <div style={{ display: 'flex' }}>   
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>0.3 to 1</div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Streets & </div>
                    </div>
                    <div style={{ display: 'flex' }}>   
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1 to 3</div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>-- </div>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid' }}>Roads </div>
                    </div>               

                    <div style={{ display: 'flex', backgroundColor: 'rgb(220, 220, 220)' }}>                     
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>3 to 10</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>2.9 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>2.5 </div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Arterials </div>
                    </div>
                    <div style={{ display: 'flex', backgroundColor: 'rgb(220, 220, 220)' }}>   
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>10 to 30</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>3.0 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>2.6 </div>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>and </div>
                    </div>
                    <div style={{ display: 'flex', backgroundColor: 'rgb(220, 220, 220)' }}>                           
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1 to 3</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3.1 </div>
                        <div style={{width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2.6 </div>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Highways </div>
                     </div>           
                </div> </div> 
              </HelpScreenWrapper>
</div>


export default LoadTransferCoefficientHelpScreen;