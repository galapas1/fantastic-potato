import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const LoadTransferHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
                    The key to excellent long-term performance of doweled joints is adequate load transfer over the life of the pavement. Load transfer devices generally are recommended for jointed plain concrete pavements that have an initial design thickness greater than about 8 inches (200 mm) because traffic levels that require such thicknesses for fatigue resistance also are of a level that might result in pumping and faulting of the joints if load transfer devices are not included in the joints. When the initial design thickness is less than 8 inches (200 mm), load transfer devices are recommended only if faulting is the predicted cause of failure. </div> 
    <div style={{ marginBottom: 15 }}>
                    Although other geometries (e.g., elliptical, plate, square, etc.) and materials (e.g., stainless or microcomposite steel, zinc alloy-sleeved, etc.) can be used to transfer load across transverse joints in jointed plain concrete pavements, round and smooth steel dowel bars are the most commonly used load transfer device. Typical size recommendations for round steel dowel bars placed at 12 in. (300 mm) on-center are:</div> 
    <div style={{ marginBottom: 15, fontWeight: "bold" }}>
        Recommended Dowel Bar Size </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
         <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
             <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Concrete Design Thickness, in.</span></div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Dowel Bar Size, in.</span></div>
              </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 8 in. and cracking is predicated cause of failure </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Dowel not recommended </div>           
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 8 in. and faulting is predicted cause of failure </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.00 in. </div>           
         </div>   <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>between 8 in. and 10 in. </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.25 in. </div>                         
         </div>
         <div style={{ display: 'flex', borderBottom: '1px solid' }}>
             <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>greater than 10 in. </div>
             <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.50 in. </div>            
         </div>       
    </div> 
    <div style={{ marginBottom: 15 }}>
                    <span>Required load transfer device size and spacing can, however, vary based on load transfer technology geometry and material (see manufacturer’s recommendations), and some non-uniform spacings offer opportunities to optimize/minimize steel content at the joints while causing minimal impacts on pavement responses (<a href="http://www.acpa.org/dowelcad"><span style="font-size: 9pt">see ACPA's DowelCAD 2.0</span></a>). Other exceptions also exist, like the lack of a need for load transfer devices in bonded concrete overlays on asphalt or composite pavements.  The National Concrete Consortium (NCC) also has developed, “Recommendations for Standardized Dowel Load Transfer Systems for Jointed Concrete Pavements,” which are available through the <a href="http://www.cptechcenter.org"><span style="font-size: 9pt">National Concrete Pavement Technology (CP Tech) Center</span></a><br /></span></div>
   </div>
 </HelpScreenWrapper>
    </div >

export default LoadTransferHelpScreen;