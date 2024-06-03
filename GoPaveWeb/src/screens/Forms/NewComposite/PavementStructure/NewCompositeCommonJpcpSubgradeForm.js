import React , { Component } from 'react';
import { FieldInput, MrsgForm } from 'Components';
import '../../../../components/Forms/Forms.scss';
import { Field } from 'redux-form';
import {
  PERCENTAGE_OF_CRACKED_SLABS,
  RELIABILITY
} from  'Constants';

class NewCompositeCommonJpcpSubgradeForm extends Component {

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', 
        width: '100%'}}>
        <div style={{ width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 20}}>SUBGRADE</div>
        <div style={{height: '100%', width: '100%'}}>
         <MrsgForm kvalueOutputForm={this.props.kvalueOutputForm} mrsgOutputForm={this.props.mrsgOutputForm} height='40%' {...this.props} />
         <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid'}}>
              <div style={{ width: "100%", textAlign: "center", paddingTop: 20, paddingBottom: 15, fontWeight: 'bold'}}>GLOBAL</div>
              <div className="form-group-div" style={{fontWeight: "normal"}}>
                <label  style={{fontWeight: "bold"}} className="form-label">Reliability</label>
                <Field className="form-group-div-input" name={RELIABILITY} type="text" component={FieldInput} spanValue="%" />
              </div>
              <div className="form-group-div" style={{width: "90%", marginBottom: 0, }}>
                <label style={{fontWeight: "bold"}} className="form-label">% of Slabs Cracked at End of Design Life</label>
              </div>
              <div className="form-group-div" style={{fontWeight: "normal"}}>
                <Field className="form-group-div-input width-input" name={PERCENTAGE_OF_CRACKED_SLABS} type="text" component={FieldInput} spanValue="%" />
              </div>
            </div>
      </div>
    </div>
    );
  }
}

export default NewCompositeCommonJpcpSubgradeForm;
