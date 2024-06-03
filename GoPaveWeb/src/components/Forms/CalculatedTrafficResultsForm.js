import React , { Component } from 'react';
import { FieldInput } from 'Components';
import { Field } from 'redux-form';
import './Forms.scss';
import { pngCollector, saveImages } from 'Actions';
import { 
  AVG_TRUCKS_PER_DAY,
  TOTAL_TRUCKS_PER_DAY
} from  'Constants';

class CalculatedTrafficResultsForm extends Component {
  render() {
    const { showRightBorder } = this.props;
    return (
      <div style={{fontWeight: "bold", display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{width: "100%", textAlign: "center", paddingTop: 20, paddingBottom: 15}}>CALCULATED TRAFFIC RESULTS</div>
        <div style={{width: "100%", height: "100%", borderRight: showRightBorder ? '1px solid' : '', paddingRight: 20, paddingLeft: 20}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="form-group-div" style={{width: '90%'}}>
              <label style={{fontWeight: "bold"}} className="form-label">Avg Trucks/Day in Design Lane over the Design Life</label>
              <Field name={AVG_TRUCKS_PER_DAY}  component={FieldInput} type="text" className='form-group-div-input' noUnits={true} readOnly isCalculatedOutput={true} noUnits={true} customInputWidth='60%'/>
            </div>
             <div className="form-group-div" style={{width: '90%'}}>
              <label style={{fontWeight: "bold"}} className="form-label">Total Trucks in Design Lane over the Design Life</label>
              <Field name={TOTAL_TRUCKS_PER_DAY} component={FieldInput} type="text" className='form-group-div-input' noUnits={true} readOnly isCalculatedOutput={true} noUnits={true} customInputWidth='60%'/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    var imgRefs = [ { fields: [
//                          { type: 'png', ref: this.refs.AverageTrucksPerDayInDesignLane, image: '', key: '@AverageTrucksPerDayInDesignLane' },
//                          { type: 'png', ref: this.refs.TotalTrucksPerDayInDesignLane,   image: '', key: '@TotalTrucksPerDayInDesignLane'   },
                      ]
                    }];
    if(this.props.anyTouched) {
      pngCollector(0, this, imgRefs, saveImages);
    }
  }
}

export default CalculatedTrafficResultsForm;
