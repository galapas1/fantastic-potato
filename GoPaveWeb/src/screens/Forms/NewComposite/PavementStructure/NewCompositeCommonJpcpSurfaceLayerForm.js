import React , { Component } from 'react';
import { ToggleButton, FlexuralOutputForm } from 'Components';
import { Field } from 'redux-form';
import '../../../../components/Forms/Forms.scss';
import { 
  MACROFIBRES_IN_CONCRETE,
  EDGE_SUPPORT,
  NEW_COMPOSITE_JPCP_MODULE
} from  'Constants';

class NewCompositeCommonJpcpSurfaceLayerForm extends Component {

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', 
        width: '100%'}}>
        <div style={{ width: '100%', textAlign: 'center', paddingTop: 20, fontWeight: 'bold', paddingBottom: 20}}>SURFACE LAYER</div>
        <div style={{height: '100%', width: '100%'}}>
         <div style={{width: '100%', display: 'flex', flexDirection: 'column', height: 'inherit', borderRight: '1px solid', alignItems: 'center'}}>
            <FlexuralOutputForm flexStrengthOutputForm={this.props.flexStrengthOutputForm} {...this.props} />
            <div style={{display: 'flex', justifyContent: 'center', width: '75%', borderTop: '1px solid grey'}}>
             <div style={{ width: this.props.module === NEW_COMPOSITE_JPCP_MODULE ? '50%' : '100%', marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                <label style={{fontWeight: 'bold'}} className='form-label'>Edge Support</label>
                <Field name={EDGE_SUPPORT} buttonSelected={this.props[EDGE_SUPPORT]} options={['Yes', 'No']} component={ToggleButton}/>
              </div>
              {this.props.module === NEW_COMPOSITE_JPCP_MODULE && <div style={{ width: this.props.module === NEW_COMPOSITE_JPCP_MODULE ? '50%' : '100%', marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'column',justifyContent: 'space-between'}}>
                <label style={{fontWeight: 'bold'}} className='form-label'>Macrofibers in Concrete</label>
                <Field name={MACROFIBRES_IN_CONCRETE} buttonSelected={this.props[MACROFIBRES_IN_CONCRETE]} options={['Yes', 'No']} component={ToggleButton}/>
              </div> }
           </div>
   
          </div>
        </div>
      </div>
    );
  }
}

export default NewCompositeCommonJpcpSurfaceLayerForm;