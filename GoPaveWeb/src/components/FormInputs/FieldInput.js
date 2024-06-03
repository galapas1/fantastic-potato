import React, { Component } from 'react';
import './FieldInput.scss';
import { debounce } from 'underscore';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';
import { parseStringsToNumbers } from 'HelperFunctions/parseStrings';

class FieldInput extends Component {
  
  componentWillMount() {
    this.delayedCallback = debounce(event => {
      // Convert user input to numbers to store in redux store
      this.props.input.onChange(parseStringsToNumbers(event.target.value));
      
      // setTimeout is necessary if change is made to a field, and then updated value is used to run something. IN this case, there is a automatic check of all inputs for the calcualtor. Hence, setTimeout is necessar for the calculator to run
      if (this.props.calculateValues) {
        if (this.props.meta.valid) {
          setTimeout(this.props.calculateValues());    
        }
      } 

      if (this.props.setNillCalculatorValues && !this.props.meta.valid) {
        const errorPresent = true; // Used in traffic form
        this.props.setNillCalculatorValues(errorPresent);
      }
      
      // Used by Custom Traffic Form
      if (this.props.setArrayFieldValue) {
        this.props.setArrayFieldValue();
      }

      // Used by Parking Subgrade form
      if (this.props.meta.valid && this.props.setParentValueAndPassValueBack) {
        this.props.setParentValueAndPassValueBack(parseStringsToNumbers(event.target.value)); 
      }

      
      // Used by Asphalt Analysis Form
      if (this.props.meta.valid && this.props.setParentValue) {
        this.props.setParentValue(); 
      }
    }, 2000);
  }

  inputChange(event) {
    this.delayedCallback(event);    
  }
  
  // This is needed because onBlurHandler is randomly called by redux form, which is a bug in the redux form
  onBlurInput(event) {
    event.preventDefault();
  }

  render() {
    const { input, readOnly, className, type, placeholder, errorClassName, showTooltip, spanValue, isMinorOutput, dontShowError, customInputWidth, isFieldDisabled, alignInput, noUnits, parentInputWidth, toolTipMessage, tooltipId, isCalculatedOutput, textAlign, customSpanStyle, customInputStyle, showHelpTooltip, helptooltipId, meta: { touched, error, warning } } = this.props;
    let dataToolTipRequired = {
       ...(  showTooltip && { 'data-tip': toolTipMessage, 'data-for': tooltipId } )
    };

    let dataHelpToolTipRequired = {
       ...(  showHelpTooltip && { 'data-tip': true,'data-for': helptooltipId } )
    };
    let calcuatedOutputClass = '';
    if (isCalculatedOutput && noUnits) {
      calcuatedOutputClass = 'form-calculated-input-no-units'
    } else if (isCalculatedOutput && !noUnits && isMinorOutput) {
      calcuatedOutputClass = 'form-calculated-input-minor'
    } else if (isCalculatedOutput && !noUnits) {
      calcuatedOutputClass = 'form-calculated-input'
    }

    let calculatedOutputUnitClass = '';
    if (isCalculatedOutput && isMinorOutput) {
      calculatedOutputUnitClass = 'form-calculated-input-unit-minor'
    } else if (isCalculatedOutput) {
      calculatedOutputUnitClass = 'form-calculated-input-unit'
    }
    return (
      <div style={{display:'flex', flexDirection: 'column', width: parentInputWidth ? parentInputWidth : '100%', alignItems: alignInput ? alignInput : 'center'}}>
        <div {...dataToolTipRequired} {...dataHelpToolTipRequired} style={{width: customInputWidth ? customInputWidth : '75%', display: noUnits ? 'flex' : 'table', position: 'relative', justifyContent: 'center' }} className={`${isFieldDisabled ? 'no-cursor-allowed' : ''}`} >
          <NumberFormat  {...input} 
          thousandSeparator={true}
          type={type} 
          onChange={this.inputChange.bind(this)}
          onBlur={this.onBlurInput.bind(this)}
          placeholder={placeholder} 
          className={`${className} ${!noUnits ? 'no-right-border' : ''} ${touched && error ? 'has-error' : ''} ${touched && !error  && warning ? 'has-warning' : ""} ${isFieldDisabled ? 'field-disabled' : ''} input-height ${calcuatedOutputClass} ${noUnits && !isCalculatedOutput ? 'add-right-border' : ''}
              ` } 
          readOnly={readOnly}
          style={{ textAlign: textAlign ? textAlign : '', ...customInputStyle}}
           /> 
          {!noUnits &&  
          <span 
          className={`input-group-addon unit-font ${touched && error ? 'has-error' : ''} ${touched && !error && warning ? 'has-warning' : ""} ${isFieldDisabled ? 'field-disabled' : ''}  ${calculatedOutputUnitClass} `} 
          style={{borderLeft: 0, backgroundColor: "white", borderRadius: "0px 20px 20px 0px", ...customSpanStyle }}>
          {spanValue}
          </span> }
          </div> 
          {touched && error && !dontShowError && <div className={` has-error-text ${errorClassName ? errorClassName : ""}`}>
          {error}
          </div>} 
          {touched && !error && warning && <div className={`has-warning-text ${errorClassName} ? ${errorClassName} : ""`}>{warning}</div>}
      </div>
    )
  }
}

export default FieldInput;
