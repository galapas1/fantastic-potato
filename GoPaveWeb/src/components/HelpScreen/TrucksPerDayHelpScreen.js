import React from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const TrucksPerDayHelpScreen = (props) => 

<div>
 <HelpScreenWrapper {...props}>
   <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
    <div style={{marginBottom: 15}}>
  The number of trucks per day (two-way, at time of construction) can be characterized in many different ways.  The average annual daily truck traffic (AADTT) is a daily average of the number of trucks that the pavement will service over an entire year.  The average daily truck traffic (ADTT) is a comparable daily average of trucks but over a period of time shorter than a year.  That is to say, an ADTT is measured (averaged) over a shorter timeframe than the AADTT and, as such, may be an over- or under-prediction of the real average daily truck traffic because ADTT is more prone to seasonal variations in traffic. The average annual daily traffic (AADT), like the AADTT, is an average measurement over an entire year, but the AADT is an average of the number of vehicles that the pavement will service; AADT is multiplied by the percent trucks to yield AADTT.  Comparably, the average daily traffic (ADT) is multiplied by the percent trucks to yield ADTT.  These four means of estimating the average number of trucks per day are differentiated by traffic engineers to emphasize the source of the measurement and the level of accuracy of the design variable.  With regard to pavement design, each of these can be used as proxies for determination of the average number of trucks per day over the design life.</div>
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid'}}>
      <div style={{display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)'}}>
                        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Traffic Category</span></div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>ADTT or AADTT</span></div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Value</span></div>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Range</span></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>ADT or AADT</span></div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Value</span></div>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Range</span></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ borderBottom: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Percent Trucks</span></div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Value</span></div>
                                    <div style={{ width: '50%', borderRight: '1px solid', textAlign: 'center' }}> <span style={{ color: 'white' }}>Typical Range</span></div>
                                </div>
                            </div>
                        </div>       
      </div>
      <div style={{display: 'flex', borderBottom: '1px solid'}}>
        <div style={{width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>Residential</div>
        <div style={{width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>3 </div>
        <div style={{width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>1-20 </div>
        <div style={{width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid'}}>200 </div>
        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>50-800 </div>
        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1% </div>
        <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1%-3% </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Collector</div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>100 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>40-1,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>2,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>700-5,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5% </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3%-15% </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Minor Arterial</div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>500 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>300-5,000+ </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>7,500 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>3,000-15,000+ </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>10% </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>5%-25% </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid' }}>
          <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Major Arterial</div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>700-10,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>10,000 </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>4,000-50,000+ </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>15% </div>
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>10%-30% </div>
      </div>
    </div>   
   </div>
 </HelpScreenWrapper>
    </div>


export default TrucksPerDayHelpScreen;