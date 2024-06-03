import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const CalcMRSGHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
              NOTE: Always use the Resilient Modulus of the untreated subgrade soil.  If the subgrade soil is to be treated (or stabilized), include the treated soil as a separate subbase layer in the pavement structure.  It is inappropriate to start with a treated or stabilized soil as the pavement subgrade.</div>
   <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
      You may either directly enter the MRSG value below, or use correlations to California Bearing Ratio (CBR) or Resistance Value (R-value) to estimate MRSG.  Although no perfect correlations between CBR and MRSG or R- value and MRSG exist, PavementDesigner will estimate MRSG using equations developed from NRHCP 128, 'Evaluation of the AASHO Interim Guide for the Design of Pavement Structures.'
</div>
   <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
      The CBR is a penetration test for evaluation of the mechanical strength of road subgrades.  It is performed by measuring the pressure required to penetrate a soil sample with a plunger of standard area.  The measured pressure is then divided by the pressure required to achieve an equal penetration on a standard crushed rock material.  ASTM D1883, ASTM D4429, and AASHTO T193 describe the test in detail.
   </div>

   <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
    The R-value test measures the response of a compacted sample of soil to a vertically applied pressure under specific conditions.  The R-value of a material is determined when the material is in a state of saturation such that water will be exuded from the compacted test specimen when a specified load is applied.  California Test 301 describes the test in detail.</div>
        </HelpScreenWrapper>
</div>


export default CalcMRSGHelpScreen;






