import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FieldInput } from 'Components';
import { getUnits } from 'HelperFunctions/getUnits';
import { 
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  USER_DEFINED_COMPOSITE_K_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  METRIC
} from  'Constants';

class RadioButton extends Component {
  
  render() {
    return (
     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 12}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ display: 'flex', width: "100%", fontSize: 11 }}>
                    <label style={{ width: "10%", textAlign: "center" }}></label>
                    <label style={{ width: "70%", textAlign: "center" }}>Calculated Composite K-Value of Substructure</label>
                    <label style={{ width: "20%", textAlign: "right" }}>Select</label>
                </div>
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Field name={COMPOSITE_K_VALUE_SUBSTRUCTURE} component={FieldInput} type='text' className='form-group-div-input' spanValue={getUnits('psi/in', this.props.unitType === METRIC)} customInputWidth='75%' readOnly={true} isCalculatedOutput={true} />
                    <Field name={COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE} component='input' type='radio' value={COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED} />
         </div>
       </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', fontSize: 11}}>
                <div style={{ display: 'flex', width: "100%" }}>
                    <label style={{ width: "10%", textAlign: "center" }}></label>
                    <label style={{ width: "70%", textAlign: "center" }}>User-Defined Composite K-Value of Substructure</label>
                    <label style={{ width: "20%", textAlign: "right" }}></label>
                </div>

         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 30}}>
           <Field name={USER_DEFINED_COMPOSITE_K_VALUE} component={FieldInput} type='text' className="form-group-div-input" textAlign='center' spanValue={getUnits('psi/in', this.props.unitType === METRIC)}/>
           <Field name={COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE} component='input' type='radio' value={COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED} />
         </div>
       </div>
     </div>
    );
  }    
}
export default RadioButton;
