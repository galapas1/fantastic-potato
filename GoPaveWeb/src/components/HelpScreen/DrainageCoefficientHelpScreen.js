import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const DrainageCoefficientHelpScreen = (props) => 
<div>
 <HelpScreenWrapper {...props}>
            <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                <div style={{ marginBottom: 15 }}>
                  This coefficient accounts for the percent of time the pavement structure is exposed to moisture levels approaching saturation.   </div>
                <div style={{ marginBottom: 15 }}>Recommended Values of the Drainage Coefficient (Cd) for CRCP Design  </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
                    <div style={{ display: 'flex', backgroundColor: 'rgb(50, 132, 204)' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Quality of Drainage</span></div>
                        <div style={{ width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid' }}> <span style={{ color: 'white' }}>Percent of Time Pavement Structure is Exposed to Moisture Levels Approaching Saturation</span></div>
                    </div>     
                    <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 132, 204)' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}></span></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>less than 1%</span></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>1% - 5%</span></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>5% - 25%</span></div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <span style={{ color: 'white' }}>greater than 25%</span></div>
                    </div>   


                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid'}}>Excellent</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.25-1.20 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.20-1.15 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.15-1.10 </div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid' }}>1.10 </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Good</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.20-1.15 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.15-1.10 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.10-1.00 </div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center',borderBottom: '1px solid' }}>1.00 </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Fair</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.15-1.10 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.10-1.00 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.00-0.90 </div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid' }}>0.90 </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Poor</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.10-1.00 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>1.00-0.90 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>0.90-0.80 </div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid' }}>0.80 </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Very Poor</div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'  }}>1.00-0.90 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>0.90-0.80 </div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>0.80-0.70 </div>
                        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0.70 </div>
                    </div>    </div>
                    <div style={{ marginBottom: 15 }}>
                        Appendix DD of Volume II of the 1993 guide offers the following definitions for quality of drainage:</div>
                    <div style={{ marginBottom: 5 }}>Excellent Drainage - Soil drained to 50 percent of saturation in 2 hours. </div>
                    <div style={{ marginBottom: 5 }}>Good Drainage - Soil drained to 50 percent of saturation in 1 day.  </div>
                    <div style={{ marginBottom: 5 }}>Fair Drainage - Soil drained to 50 percent of saturation in 7 days.  </div>
                    <div style={{ marginBottom: 5 }}>Poor Drainage - Soil drained to 50 percent of saturation in 1 month.  </div>
                    <div style={{ marginBottom: 5 }}>Very Poor Drainage - Soil does not drain.  </div>


            
            </div>  </HelpScreenWrapper>
</div>


export default DrainageCoefficientHelpScreen;