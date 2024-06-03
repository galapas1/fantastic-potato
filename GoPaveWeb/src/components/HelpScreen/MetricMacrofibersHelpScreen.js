import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const MetricMacrofibersHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
       Fiber-reinforced concrete (FRC) mixtures can be used in a concrete pavement to create a concrete composite that provides improved ductility and toughness, fatigue capacity, abrasion and impact resistance, and extended pavement service life. Both synthetic and steel macrofibers are used to improve the structural capacity of concrete pavements. Macrofibers have larger cross-sectional areas, lengths, and elastic moduli. Macrofibers typically have lengths around 25.4 to 63.5 mm and aspect ratios between 50 and 150. Macrofibers also provide significant post-peak toughness to the concrete with the magnitude depending on the fiber geometry, volume fraction, and concrete strength. The optimal fiber dosage for a specified level of pavement performance should be determined based on the residual strength ratio of the FRC. Macrofibers are typically used in concrete pavements at volume fractions between 0.2 and 0.5 percent. Lower modulus fibers typically are used at relatively small dosage rates to control plastic shrinkage and should never be accounted for in a concrete pavement structural design.</div>
   <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
     ASTM C1609, 'Standard Test Method for Flexural Performance of Fiber-Reinforced Concrete,' should be used to determine the residual strength of fiber-reinforced concrete. Residual strength ratio is defined as the ratio of the post-peak flexural strength (also called residual strength) at a given net deflection (3.05 mm) to the concrete modulus of rupture (MOR). ASTM C1609 currently offers the best test procedure to determine the relative toughness benefits between different macrofibers and has been shown to be a good indicator of the effectiveness of adding a certain fiber type to a specific plain concrete mixture. Other test procedures exist to determine the residual strength of FRC materials, such as ASTM C1399, C1550, and C1018, but these tests don't provide equivalent residual strength values. Research has shown that ASTM C1609 best relates flexural beam with concrete slab on ground test data. The residual strength for a concrete pavement shall be determined using a beam with cross-sectional dimensions of 152.4 mm by 152.4 mm and a loading span of 457.2 mm. Practical ranges of residual strength ratio for concrete pavement applications are between 15 and 35 percent.</div>
        </HelpScreenWrapper>
</div>


export default MetricMacrofibersHelpScreen;