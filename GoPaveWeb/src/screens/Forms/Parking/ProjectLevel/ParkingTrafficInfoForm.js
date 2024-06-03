import React, { Component } from 'react';
import HelpScreenWrapper from './HelpScreenWrapper';

const TRUCK_TYPES = 'truckTypes';
const TRAFFIC_SPECTRUM_TABLE = 'trafficSpectrumTable'

class ParkingTrafficInfoForm extends Component {

  constructor(props) {
    super(props);
    this.state = { displayedTable : TRAFFIC_SPECTRUM_TABLE};
  }

  onClick(value) {
    this.setState({displayedTable: value})
  }

  renderTables() {
    const { displayedTable } = this.state;
    if (displayedTable === TRAFFIC_SPECTRUM_TABLE ) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 5, paddingRight: 5, border: '1px solid', borderTop: 'none', backgroundColor: 'white', fontSize: 11}}>
          <div style={{display: 'flex', borderBottom: '1px solid', paddingTop: 5, paddingBottom: 5}}>
            <div style={{width: '4%'}}>1.</div>
            <div style={{width: '56%'}}>Car parking area and access lanes:</div>
            <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM A</div>
          </div>
          <div style={{display: 'flex', borderBottom: '1px solid', paddingTop: 5, paddingBottom: 5}}>
            <div style={{width: '4%'}}>2.</div>
            <div style={{width: '56%'}}>Shopping center entrance and service lanes:</div>
            <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM B</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', borderBottom: '1px solid', paddingTop: 5, paddingBottom: 5}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '4%'}}>3.</div>
              <div style={{width: '56%'}}>Bus parking areas, city and school buses:</div>
              <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM C</div>
            </div>
            <div style={{display: 'flex'}}>
              <div style={{width: '4%'}}></div>
              <div style={{width: '56%'}}>Parking, Area & interior lanes:</div>
              <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM B</div>
            </div>
            <div style={{display: 'flex'}}>
              <div style={{width: '4%'}}></div>
              <div style={{width: '56%'}}>Entrance & exterior lanes:</div>
              <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM C</div>
            </div>
          </div>
          <div style={{display: 'flex', paddingTop: 5, paddingBottom: 5}}>
            <div style={{width: '4%'}}>4.</div>
            <div style={{width: '56%'}}>Truck parking areas:</div>
            <div style={{width: '40%', textAlign: 'center'}}>SPECTRUM B, C, D</div>
          </div>
        </div>

      )
    } else if (displayedTable === TRUCK_TYPES ) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 5, paddingRight: 5, border: '1px solid', borderTop: 'none', backgroundColor: 'white', fontSize: 11}}>
        <div style={{display: 'flex', paddingBottom: 10, paddingTop: 10, borderBottom : '1px solid', paddingLeft: 10}}>
          <div style={{width: '44%'}}>TRUCK TYPE</div>
          <div style={{width: '28%', textAlign: 'center'}}>Parking Areas & Interior Lanes</div>
          <div style={{width: '28%', textAlign: 'center'}}>Entrance & Exterior Lanes</div>
        </div>
        <div style={{display: 'flex', paddingBottom: 10, paddingTop: 10, borderBottom : '1px solid', paddingLeft: 10}}>
          <div style={{width: '44%'}}>
            <div>Single Units</div>
            <div  style={{fontSize: 10, fontStyle: 'italic'}}>bobtailed trucks</div>
          </div>
          <div style={{width: '28%', textAlign: 'center'}}>SPECTRUM B</div>
          <div style={{width: '28%', textAlign: 'center'}}>SPECTRUM C</div>
        </div>
        <div style={{display: 'flex', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
          <div style={{width: '44%'}}>
            <div>Multiple Units</div>
            <div style={{fontSize: 10, fontStyle: 'italic'}}>Tractor trailer units w/ one or more trailers</div>
          </div>
          <div style={{width: '28%', textAlign: 'center'}}>SPECTRUM C</div>
          <div style={{width: '28%', textAlign: 'center'}}>SPECTRUM D</div>
        </div>
        </div>

      )
    }
  }

  render() {
    const { displayedTable } = this.state;
    const isTrafficSpectrumTable = displayedTable === TRAFFIC_SPECTRUM_TABLE;
    const isTruckTypes = displayedTable === TRUCK_TYPES;
    return (
       <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '60%', width: '70%', paddingTop: 100}}>
         <div style={{display: 'flex', width: '100%', borderBottom: 'none', fontSize: 13}}>
           <div onClick={this.onClick.bind(this, TRAFFIC_SPECTRUM_TABLE)}  style={{width: '50%', textAlign: 'center', marginRight: 2, cursor: 'pointer', border: '1px solid', 
           color: isTrafficSpectrumTable ? 'white' : 'rgb(15, 175, 175)', backgroundColor: isTrafficSpectrumTable ? 'rgb(15, 175, 175)' : 'white',
           borderColor: isTrafficSpectrumTable ? 'rgb(15, 175, 175)' : 'black', borderTopLeftRadius: 4, borderTopRightRadius: 4  }}>TRAFFIC SPECTRUMS</div>
           <div onClick={this.onClick.bind(this, TRUCK_TYPES)}  style={{width: '50%', textAlign: 'center', cursor: 'pointer',border: '1px solid',  color: isTruckTypes ? 'white' : 'rgb(15, 175, 175)', backgroundColor: isTruckTypes ? 'rgb(15, 175, 175)' : 'white',  borderColor: isTruckTypes ? 'rgb(15, 175, 175)' : 'black', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>TRUCK TYPES</div> 
         </div>
         {this.renderTables()}
       </div>
      
   )
  }
}

export default ParkingTrafficInfoForm;
