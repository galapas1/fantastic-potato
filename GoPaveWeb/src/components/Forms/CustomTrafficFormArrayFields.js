import React , { Component } from 'react';
import { FieldInput } from 'Components';
import { Field } from 'redux-form';
import {isUndefined} from 'underscore';
import './Forms.scss';

class CustomTrafficFormArrayFields extends Component {

  setArrayFieldValue(index, name) {
    let field = this.props.fields.get(index);
   if (!isUndefined(field.axleLoad) && !isUndefined(field.axlesPer1000)) {
      this.props.setEnabledFormFields(name, index + 2);
   }
  }
  render() {
    const { enabledFormFields, isCustomTrafficPopupDropdown, customStyle } = this.props;
    const name = this.props.fields.name;
    let disabledValue;
    if (enabledFormFields) {
      disabledValue = enabledFormFields[name];
    }
    return (
      <div style={{width: '80%', ...customStyle}}>
        {this.props.fields.map((member, index) =>
          <div style={{display: 'flex', marginBottom: 10, justifyContent: 'space-between'}}key={index}>
            <Field name={`${member}.axleLoad`} component={FieldInput} type='text'  setArrayFieldValue={this.setArrayFieldValue.bind(this, index, name)} className='form-group-div-input custom-traffic-popup-input'  isFieldDisabled={isCustomTrafficPopupDropdown && (index + 1) > disabledValue ? true : false} customInputWidth='100%' parentInputWidth='45%' noUnits='true' inputStyle={{width: '100%', height: 28, marginRight: 10, borderRadius: 6}} />
            <Field name={`${member}.axlesPer1000`} component={FieldInput} type='text'  setArrayFieldValue={this.setArrayFieldValue.bind(this, index, name)} className='form-group-div-input custom-traffic-popup-input' isFieldDisabled={isCustomTrafficPopupDropdown && (index + 1) > disabledValue ? true : false} customInputWidth='100%' parentInputWidth='45%' noUnits='true' inputStyle={{width: '100%', height: 28, marginRight: 10, borderRadius: 6}} />
          </div>
        )}  
      </div>
    )
    
  }
}

export default CustomTrafficFormArrayFields;