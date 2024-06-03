import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const MetricMRSGHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
        The Resilient Modulus is one of three basic subgrade soil stiffness/strength characterizations commonly used in structural design of pavements.  Resilient Modulus is a measure of the elastic response of a soil (how well a soil is able to return to its original shape and size after being stressed) under repeated loading.   The table below shows typical CBR and Resilient Modulus values for various common subgrade soils.</div>

    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 132, 204)'}}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Description</span></div>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>AASHTO</span></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>ASTM (Unified)</span></div>
                        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>CBR (%)</span></div>
                        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Resilient Modulus (MPa)</span></div>
                        </div>
                        
            

                          <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Coarse-Grained Soils</span></div>
                               </div>
                   

      <div style={{display: 'flex'}}>
        <div style={{width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Gravel</div>
        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid'}}>A-1-a, well graded </div>
        <div style={{width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>GW,GP </div>
        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid'}}>60-80 </div>
        <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid'}}>221-269 </div>   
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-1-a, poorly graded </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>35-60 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>152-221 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Coarse Sand</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-1-b </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>SW </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>20-40 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>103-172 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Fine Sand</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-3 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>SP </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>15-25 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>83-124 </div>
      </div>



      <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Granular Materials with High Fines</span></div>
      </div>


      <div style={{ display: 'flex' }}>
                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Silt Gravel </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-4, gravelly </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>GM </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>40-80 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>172-269 </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Silt Sandy Gravel</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-5, gravelly </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Silty Sand </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-4, sandy </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>SM </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>20-40 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>103-172 </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Siltly Gravelly Sand </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-5, sandy </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Clayey Gravel </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-6, gravelly </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>GC </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>20-40 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>103-172 </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Clayey Sandy Gravel</div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-7, gravelly </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Clayey Sand </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-6, sandy </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>SC </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>10-20 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>62-103 </div>
      </div>

      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Clayey Gravelly Sand </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>A-2-7, sandy </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>  </div>
      </div>


      <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Fine-Grained Soils</span></div>
      </div>


      <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>Silt </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-4 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>ML, OL </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>4-8 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}>34-55 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Silt/Sand/Gravel Mixture </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5-15 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>41-83 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Poorly Graded Silt </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-5 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>MH </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4-8 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>34-55 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Plastic Clay </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-6 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>CL </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5-15 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>41-83 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Moderately Plastic Elastic Clay </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-7-5 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>CL, OL </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4-15 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>34-83 </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Highly Plastic Elastic Clay </div>
          <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>A-7-6 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>CH, OH </div>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3-5 </div>
          <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>28-41 </div>
      </div>


    </div>   
   </div>
 </HelpScreenWrapper>
    </div>


export default MetricMRSGHelpScreen;