import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const MetricTrafficSpectrumHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
  The four default traffic categories in the left column are each a composite of data averaged from loadometer tables representative of the facility type listed and the five default traffic categories in the right column are from the forthcoming ACI 330-18 design guide, 'Guide for Design and Construction of Concrete Parking Lots.'  ACI 330R-08 describes Category A as passenger cars only, Categories B and C as composites of data averaged from several loadometer tables representing appropriate pavement facilities, and Category D as tractor semitrailer trucks with gross weights of 80 kips (360 kN).  The table below gives general details for each default traffic category in the left column.   
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid'}}>
      <div style={{display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)'}}>
                        <div style={{ width: '13%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Traffic Category</span></div>
                        <div style={{ width: '38%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }} > <span style={{ color: 'white' }}>Description</span></div>
        <div style={{width: '27%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Traffic</span></div>
            <div style={{display: 'flex'}}>
                                    <div style={{ width: '33.3%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>ADT</span></div>
                                    <div style={{ width: '33.3%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>% Trucks</span></div>
                                    <div style={{ width: '33.3%', textAlign: 'center' }}> <span style={{ color: 'white' }}>ADTT**</span></div>
            </div>
          </div>
        </div>
        <div style={{ width: '22%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Maximum Axles Loads (kN)</span></div>            <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Single Axles</span></div>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Tandem Axles</span></div>           
            </div>
                            </div>
          </div>
      </div>
      <div style={{display: 'flex', borderBottom: '1px solid'}}>
        <div style={{width: '13%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Residential</div>
        <div style={{width: '38%', display: 'flex', alignItems: 'left', justifyContent: 'left', borderRight: '1px solid'}} >Residential streets, rural and secondary roads (low to medium*)</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>50-800 </div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 1%-3%</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>1-20 </div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 97.9</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 160.1</div>
      </div>
      <div style={{display: 'flex', borderBottom: '1px solid'}}>
        <div style={{width: '13%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Collector</div>
        <div style={{ width: '38%', display: 'flex', alignItems: 'left', justifyContent: 'left', borderRight: '1px solid'}} >Collector streets, rural and secondary roads (high*), arterial streets and primary roads (low*)</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>700-5,000 </div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 3%-15%</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>40-1,000</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 115.7</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 195.7</div>
      </div>
      <div style={{display: 'flex', borderBottom: '1px solid'}}>
        <div style={{width: '13%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Minor Arterial</div>
        <div style={{ width: '38%', display: 'flex', alignItems: 'left', justifyContent: 'left', borderRight: '1px solid'}} >Arterial streets and primary roads (medium*), expressways and urban and rural interstate (low to medium*)</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>3,000-15,000+</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 5%-25%</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>300-5,000+</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 133.4</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 231.3</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '13%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Major Arterial</div>
        <div style={{ width: '38%', display: 'flex', alignItems: 'left', justifyContent: 'left', borderRight: '1px solid'}} >Arterial streets, primary roads, expressways (high*), urban and rural interstate (medium to high*)</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>4,000-50,000+</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 10%-30%</div>
        <div style={{width: '9%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>700-10,000+</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}> 151.2</div>
        <div style={{width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 266.9</div>
    </div>
    </div>
    <div style={{ marginBottom: 20 }}>*The descriptors high, medium, or low refer to the relative weights of axle loads for the type of street or road; that is, "low" for a rural Interstate would represent heavier loads than "low" for a secondary road.</div>
    <div>** Trucks -- two-axle, four-tire trucks excluded.</div> 
  </div> 
 </HelpScreenWrapper>
</div>


export default MetricTrafficSpectrumHelpScreen;
