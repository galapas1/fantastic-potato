import React, { Component } from 'react';
import '../Popup/Popup.scss';
import './Forms.scss';
import { FieldInput, Dropdown } from 'Components';
import { connect } from 'react-redux';
import { Field, FieldArray, untouch, touch, reset, change } from 'redux-form';
import AsphaltAnalysisFormArrayFields from './AsphaltAnalysisFormArrayFields';
import { showModal,
         addNotification,
         calculateAsphaltAnalysis,
         setEditAsphaltAnalysisButtonValue,
         setEditDefaultAsphaltAnalysisParametres,
         setAsphaltAnalysisFormValues,
         initialize,
         setMrsgInputValue,
         setCurrentProjectUnitType } from 'Actions';
import { each, pick, extend, map, isUndefined } from 'underscore';
import { getUnits } from 'HelperFunctions/getUnits';
import {
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_LAYERS,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN,
  SELECT_MATERIAL,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO,
  CONCRETE_MODULUS_OF_ELASTICITY,
  INIITAL_SERVICABILITY,
  TERMINAL_SERVICABILITY,
  DESIGN_LIFE,
  ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER,
  ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS,
  ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY,
  ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE,
  ASPHALT_ANALYSIS_LAYERS_DROPDOWN,
  RELIABILITY,
  ASPHALT_ANALYSIS_CONFIRMATION_MODAL,
  ASPHALT_ANALYSIS_LAYERS,
  SINGLE_AXLE_WEIGHT,
  SINGLE_AXLE_PER_1000,
  TANDEM_AXLE_WEIGHT,
  TANDEM_AXLE_PER_1000,
  TRIDEM_AXLE_WEIGHT,
  TRIDEM_AXLE_PER_1000,
  METRIC
} from  'Constants';

const popupStyle = {
  left: '5%',
  width: '90%',
  overflowY: 'auto'
};

const ONE_LAYER = '1 Layer';
const TWO_LAYERS = '2 Layers'
const THREE_LAYERS = '3 Layers';
const FOUR_LAYERS = '4 Layers'
const FIVE_LAYERS = '5 Layers';
const SIX_LAYERS = '6 Layers';

const dropdownValues = [{name: '1 Layer'}, {name: '2 Layers'}, {name: '3 Layers'}, {name: '4 Layers'}, {name: '5 Layers'}, {name: '6 Layers'} ];

class AsphaltAnalysisForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps[ASPHALT_ANALYSIS_LAYERS_DROPDOWN] && this.props[ASPHALT_ANALYSIS_LAYERS_DROPDOWN] && nextProps[ASPHALT_ANALYSIS_LAYERS_DROPDOWN] !== this.props[ASPHALT_ANALYSIS_LAYERS_DROPDOWN]) {
      this.checkIfAllFieldsAreValidAndAutomaticallyCalculate(nextProps);
    }
  }

  performCalculations(onlyCalculate, message, passedInProps) {
    
    let props;
    if (passedInProps) {
      props = passedInProps;
    } else {
      props = this.props;
    }

    let calculatorParams = {};
      extend(calculatorParams, pick(props, 
        INIITAL_SERVICABILITY,
        TERMINAL_SERVICABILITY,  
        CONCRETE_MODULUS_OF_ELASTICITY, 
        DESIGN_LIFE,
        ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
        ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
        ASPHALT_ANALYSIS_FORM_RELIABILITY,
        ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
        ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
        ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
      ));

    if (props.unitType === METRIC) {
      extend(calculatorParams, {convertToMetric: true});
    }

    const singleItems = props.trafficSummaryFormValues['singleItems'];
    const tandemItems = props.trafficSummaryFormValues['tandemItems'];
    const tridemItems = props.trafficSummaryFormValues['tridemItems'];

    const singleAxleWeight = map(singleItems, function(item) {
      return item.axleLoad;
     })

    const singleAxlesPer1000 = map(singleItems, function(item) {
      return item.axlesPer1000;
    })
    const tandemAxleWeight = map(tandemItems, function(item) {
      return item.axleLoad;
    })
    const tandemAxlesPer1000 = map(tandemItems, function(item) {
      return item.axlesPer1000;
    })
    const tridemAxleWeight = map(tridemItems, function(item) {
      return item.axleLoad;
    })
    const tridemAxlesPer1000 = map(tridemItems, function(item) {
      return item.axlesPer1000;
    })
    extend(calculatorParams, {[SINGLE_AXLE_WEIGHT]:singleAxleWeight}, {[SINGLE_AXLE_PER_1000]:singleAxlesPer1000}, {[TRIDEM_AXLE_WEIGHT]:tridemAxleWeight}, {[TRIDEM_AXLE_PER_1000]:tridemAxlesPer1000}, {[TANDEM_AXLE_WEIGHT]:tandemAxleWeight}, {[TANDEM_AXLE_PER_1000]:tandemAxlesPer1000});
    props.calculateAsphaltAnalysis(calculatorParams, onlyCalculate, message, props.asphaltAnalysisForm, props.outputForm);
  }

  // Returns an error Object with three values 1) haveAllInputsBeenFilledOut 2) inputsHaveErrors 3) inputsTobeFocussed
  checkFormForErrorsAndEmptyInputs(passedInProps) {
    
    let props;
    if (passedInProps) {
      props = passedInProps;
    } else {
      props = this.props;
    }

    const dropdownValue = this.numberOfLayers(props[ASPHALT_ANALYSIS_LAYERS_DROPDOWN]);
    const { subgradeResilientModulus } = props;
    let haveAllInputsBeenFilledOut  = true;
    let asphaltAnalysisFormErrors;
    if (props.asphaltAnalysisFormErrors ) {
      asphaltAnalysisFormErrors = props.asphaltAnalysisFormErrors[ASPHALT_ANALYSIS_FORM_LAYERS];
    }

    const asphaltAnalysiFormErrors = props.asphaltAnalysisFormErrors;
    let inputsHaveErrors = false;
    let inputsTobeFocussed = [];

    each(props[ASPHALT_ANALYSIS_FORM_LAYERS], function(layer, index){
      if (dropdownValue > index ) {
        let currentLayerErrors;

        if (asphaltAnalysisFormErrors) {
          currentLayerErrors = asphaltAnalysisFormErrors[index];
        }

        if (isUndefined(layer[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT])) {
          inputsTobeFocussed.push(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT}]`);
          haveAllInputsBeenFilledOut  = false;
        }
         
        if(currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT]) {
          inputsHaveErrors = true;
        }

        if (isUndefined(layer[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT])) {
          inputsTobeFocussed.push(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT}]`);
          haveAllInputsBeenFilledOut  = false;
        }

        if(currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT]) {
          inputsHaveErrors = true;
        }

        if (isUndefined(layer[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS])) {
          inputsTobeFocussed.push(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS}]`);
          haveAllInputsBeenFilledOut  = false;
        } 

        if (currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS]) {
          inputsHaveErrors = true;
        }

        if (layer[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] === SELECT_MATERIAL) {
          inputsTobeFocussed.push(`${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN}]`);
          haveAllInputsBeenFilledOut  = false;
        } 

        if (currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]) {
          inputsHaveErrors = true;
        }

      }
    })
    
    // Subgrade Resilieint Modulus has no default value. Hence, if user does not fill it out, an error needs to be shown in the input
    if (isUndefined(subgradeResilientModulus)) {
      inputsTobeFocussed.push(ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS);
      haveAllInputsBeenFilledOut  = false;
    }

    if(asphaltAnalysisFormErrors) {
      if(asphaltAnalysiFormErrors[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] || asphaltAnalysiFormErrors[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] ||
         asphaltAnalysiFormErrors[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY]  || asphaltAnalysiFormErrors[ASPHALT_ANALYSIS_FORM_RELIABILITY] || 
         asphaltAnalysiFormErrors[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS]) {
         inputsHaveErrors = true;
      } 
    }

    return {
      haveAllInputsBeenFilledOut: haveAllInputsBeenFilledOut,
      inputsHaveErrors: inputsHaveErrors,
      inputsTobeFocussed: inputsTobeFocussed
    }
  }

    applyFormValues() {
        const { changeFieldValue,
                asphaltAnalysisForm,
                addNotification,
                hidePopup,
                setAsphaltAnalysisFormValues,
                setMrsgInputValue,
                module,
                reliabilityForm,
                setEditAsphaltAnalysisButtonValue,
                setEditDefaultAsphaltAnalysisParametres } = this.props;
        const errorsObject = this.checkFormForErrorsAndEmptyInputs();
        const self = this;
        // If any top level inputs have errors, then the user is not allowed to proceed either
        if (!errorsObject.haveAllInputsBeenFilledOut) {
            addNotification('You need to fill out all the inputs', 'error', 5, 'You need to fill out all the inputs');
            if (!errorsObject.inputsTobeFocussed) {
                return;
            }
            each(errorsObject.inputsTobeFocussed, function (input) {
                self.props.focusElement(asphaltAnalysisForm, input);
            })
        } else if (errorsObject.inputsHaveErrors) {
            addNotification('You cannot save the changes. Certain inputs have errors', 'error', 5, 'You cannot save the changes. Certain inputs have errors');
        } else {

            //performAsphaltAnalysisCalculations
            setEditDefaultAsphaltAnalysisParametres(module, false);
            hidePopup(); 
            setEditAsphaltAnalysisButtonValue(module, true);
            setAsphaltAnalysisFormValues(this.props.module, this.props.asphaltAnlaysisEnteredFormValues);

            // Set global form value
            changeFieldValue(reliabilityForm, RELIABILITY, this.props[ASPHALT_ANALYSIS_FORM_RELIABILITY]);

            // Set Mrsg input value
            setMrsgInputValue(module, this.props[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS]);
            this.performCalculations(false);
        }

    }

  setNillCalculatorValues() {
    this.setAsphaltAnalysisFormNullValues()
  }

  setAsphaltAnalysisFormNullValues() {
    const { changeFieldValue, asphaltAnalysisForm } = this.props;
    changeFieldValue(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER, '');
    changeFieldValue(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS, '');
    changeFieldValue(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY, '');
    changeFieldValue(asphaltAnalysisForm, ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE, '');
  }

  numberOfLayers(item) {
    let number;
    if (item ===  ONE_LAYER) { 
      number= 1;
    } else if (item ===  TWO_LAYERS) { 
      number= 2;
    } else if (item ===  THREE_LAYERS) { 
      number= 3;
    } else if (item ===  FOUR_LAYERS) { 
      number= 4;
    } else if (item ===  FIVE_LAYERS) { 
      number= 5;
    } else if (item ===  SIX_LAYERS) { 
      number= 6;
    } 

    return number;
  }
 
  untouchAndSetDefaultValue(index, field) {
    const { changeFieldValue, asphaltAnalysisForm, untouch } = this.props;
    changeFieldValue(asphaltAnalysisForm, `${ASPHALT_ANALYSIS_LAYERS}[${index}][${field}]`, '');
    untouch(asphaltAnalysisForm, `${ASPHALT_ANALYSIS_LAYERS}[${index}][${field}]`); 
  }

  setDisabledFieldValues(item) {
    const asphaltAnalysisFormErrors =  this.props.asphaltAnalysisFormErrors && this.props.asphaltAnalysisFormErrors[ASPHALT_ANALYSIS_FORM_LAYERS];
    let self = this;
    if (this.props[ASPHALT_ANALYSIS_FORM_LAYERS]) {
      each(this.props[ASPHALT_ANALYSIS_FORM_LAYERS], function(layer,index) {
        let currentLayerErrors;
        if (asphaltAnalysisFormErrors) {
          currentLayerErrors = asphaltAnalysisFormErrors[index];
        }
        
        if (index + 1 > item) {
          if (layer[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] || (currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT])){
           self.untouchAndSetDefaultValue(index, ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT)
          }
     
          if (layer[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] || (currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT])){
            self.untouchAndSetDefaultValue(index, ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT)
          }
          if (layer[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] || (currentLayerErrors && currentLayerErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS])){
            self.untouchAndSetDefaultValue(index, ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS)
          }
          self.props.changeFieldValue(self.props.asphaltAnalysisForm, `${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN}]`, SELECT_MATERIAL);
          self.props.untouch(self.props.asphaltAnalysisForm, `${ASPHALT_ANALYSIS_LAYERS}[${index}][${ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN}]` ); 
        }
      })
     }
  }

  setParentDropdownValue(item) {
    // Untouch disbale fields and set to default values
    this.setDisabledFieldValues(this.numberOfLayers(item));
  }

  // This method is called to automatically calculate values if all valid values have been entered. Any time a user enters a valid value into a input,  a check is
  // done to see if the form has valid values. If it does, then calculation is automatically done
  checkIfAllFieldsAreValidAndAutomaticallyCalculate(props) {
    const errorsObject = this.checkFormForErrorsAndEmptyInputs(props);
    const message = 'Asphalt Analysis Calculation was successful. To save, click the save button';

    if (!errorsObject.haveAllInputsBeenFilledOut) {
      this.setAsphaltAnalysisFormNullValues();
    }
    if (errorsObject.haveAllInputsBeenFilledOut && !errorsObject.inputsHaveErrors) {
      this.performCalculations(true, message, props);
    }  
  }

  closePopup() {
    const { hidePopup,setEditDefaultAsphaltAnalysisParametres, showEditAnalysisButton, changeFieldValue, module, trafficForm } = this.props;
    hidePopup();
    setEditDefaultAsphaltAnalysisParametres(module, false);
    if (!showEditAnalysisButton) {
      changeFieldValue(trafficForm, TRAFFIC_FORM_INPUTS_DROPDOWN, TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO);
    }
  }

  setArrayFieldValueOnDropdownValueChange(field, value) {
    const {changeFieldValue, asphaltAnalysisForm } = this.props;
    changeFieldValue(asphaltAnalysisForm, field, value);
  }

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 

        if(this.props.unitType != unitType) {
            this.props.resetForm();
            setCurrentProjectUnitType(!!unitType ? unitType : this.props.unitType);
        }

        return true;
    }

  render() {
    return (
      <div className={(this.props.currentPopup === this.props.asphaltAnalysisPopup && this.props.showPopup) ? 'render-popup asphalt-analysis-popup-height' : 'base-popup'} style={popupStyle}>
        <i style={{float: "right", fontSize: 30, paddingTop: 10, paddingRight: 10}} onClick={this.closePopup.bind(this)} className="fa fa-times" ></i>
        <div style={{height: '100%'}}>
          <div style={{color: '#0FAFAF', height: 30, marginTop: 15, marginLeft: 20, fontSize: 16}}>ESTIMATED TRAFFIC FROM ASPHALT DESIGN</div>
          <div style={{display: 'flex'}}>
            <div style={{width: '79%'}}>
              <div style={{marginLeft: 20, display: 'flex', marginBottom: 20, position: 'relative', zIndex: 1000}}>
                <div style={{width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <label style={{marginBottom: 10, fontSize: 12}}>Number of layers</label>
                  <Field name={ASPHALT_ANALYSIS_LAYERS_DROPDOWN} component={Dropdown} list={dropdownValues} setParentDropdownValue={this.setParentDropdownValue.bind(this)} defaultValue={{name: ONE_LAYER}} /> 
                </div>
                 <div style={{width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label style={{marginBottom: 10, fontSize: 12}}>Reliability</label>
                    <Field name={ASPHALT_ANALYSIS_FORM_RELIABILITY} className='form-group-div-input text-align-center'  type="text" component={FieldInput} setParentValue={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)}  setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}/>
                  </div>
                <div style={{width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                   <label style={{marginBottom: 10, fontSize: 12}}>Subgrade Resilient Modulus</label>
                   <Field name={ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS} component={FieldInput} type="text" className='form-group-div-input' spanValue={`(${getUnits('psi', this.props.unitType === METRIC)})`} setParentValue={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)} />
                </div>
              </div>
              <div style={{display: 'flex', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                  <div style={{display:'flex', marginBottom: 10, marginLeft: 20, width: '100%'}}>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: '24%', marginRight: 30, textAlign: 'center'}}>Material</div>
                    <div style={{width: '22%'}}>Layer Coefficient, a</div>
                    <div style={{width: '22%'}}>Drainage Coefficient, m</div>
                    <div style={{width: '22%'}}>Thickness</div>
                  </div>
                  <FieldArray withRef checkIfAllFieldsAreValidAndAutomaticallyCalculate={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)} setArrayFieldValueOnDropdownValueChange={this.setArrayFieldValueOnDropdownValueChange.bind(this)} dropdownValue={this.numberOfLayers.bind(this,this.props[ASPHALT_ANALYSIS_LAYERS_DROPDOWN])} zIndexValues={[100, 90, 80, 70, 60, 50]} name={ASPHALT_ANALYSIS_FORM_LAYERS} isUnitTypeMetric={this.props.unitType === METRIC} component={AsphaltAnalysisFormArrayFields} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}/>
                </div>
              </div>
            </div>
            <div style={{width: '21%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft: 20, marginRight: 20, borderBottom: '1px solid', width: '100%'}}>
                <div style={{color: '#0FAFAF', fontSize: 13, textAlign: 'center', marginBottom: 8}}>DEFAULT PARAMETERS</div>
                  <div className='form-group-div' style={{width: '75%'}}>
                    <label  style={{fontWeight: "bold"}} className="form-label">Overall Standard Deviation</label>
                    <Field name={ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION} className='form-group-div-input text-align-center' isFieldDisabled={!this.props.editDefaultParametres}  type="text" component={FieldInput}  setParentValue={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}/>
                  </div>
                <div className='form-group-div' style={{width: '75%'}}>
                  <label  style={{fontWeight: "bold"}} className="form-label">Initial Serviceability</label>
                  <Field name={ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY} className='form-group-div-input text-align-center' type="text" isFieldDisabled={!this.props.editDefaultParametres} component={FieldInput} setParentValue={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}/>
                </div>
                <div className='form-group-div' style={{width: '75%'}}>
                  <label  style={{fontWeight: "bold"}} className="form-label">Terminal Serviceability</label>
                  <Field name={ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY} className='form-group-div-input text-align-center' type="text" isFieldDisabled={!this.props.editDefaultParametres} component={FieldInput}  setParentValue={this.checkIfAllFieldsAreValidAndAutomaticallyCalculate.bind(this)} setNillCalculatorValues={this.setNillCalculatorValues.bind(this)}/>
                </div>
                <div onClick={this.props.showModal.bind(this,ASPHALT_ANALYSIS_CONFIRMATION_MODAL, null, this.props.module)} style={{color: 'blue', cursor:'pointer', fontSize: 10, marginBottom: 5}}>EDIT</div>
              </div>
              <div style={{width: '100%'}}>
                 <div style={{color: '#0FAFAF', fontSize: 13, textAlign: 'center', marginBottom: 8, marginTop: 5}}>TRAFFIC OUTPUTS</div>
                  <div className="form-group-div" style={{width: '100%'}}>
                   <label style={{fontWeight: "bold"}} className="form-label">Structural Number (SN)</label>
                   <Field name={ASPHALT_ANALYSIS_OUTPUT_STRUCTURAL_NUMBER} component={FieldInput} type="text" className='form-group-div-input asphalt-analysis-output' isCalculatedOutput={true} noUnits={true} readOnly={true} />
                 </div>
                 <div className="form-group-div" style={{width: '100%'}}>
                   <label style={{fontWeight: "bold"}} className="form-label">Flexible ESALs</label>
                   <Field name={ASPHALT_ANALYSIS_OUTPUT_FLEXIBLE_ESALS} component={FieldInput} type="text" className='form-group-div-input asphalt-analysis-output' isCalculatedOutput={true} noUnits={true} readOnly={true} />
                 </div>
                  <div className="form-group-div" style={{width: '100%'}}>
                   <label style={{fontWeight: "bold"}} className="form-label">Average Trucks/Day</label>
                   <Field name={ASPHALT_ANALYSIS_OUTPUT_AVERAGE_TRUCKS_PER_DAY} component={FieldInput} type="text"  className='form-group-div-input asphalt-analysis-output' isCalculatedOutput={true} noUnits={true} readOnly={true} />
                 </div>
                 <div className="form-group-div" style={{width: '100%'}}>
                   <label style={{fontWeight: "bold"}} className="form-label">Total Trucks Over Design Life</label>
                   <Field name={ASPHALT_ANALYSIS_OUTPUT_TOTAL_TRUCKS_OVER_DESIGN_LIFE} component={FieldInput} type="text" className='form-group-div-input asphalt-analysis-output' isCalculatedOutput={true} noUnits={true} readOnly={true} />
                 </div>
              </div>
              <div>
                <button onClick={this.applyFormValues.bind(this)} style={{backgroundColor: '#669900'}}>SAVE</button> 
              </div>
            </div>
          </div>
       </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (modal, routingParams, module) => {
      dispatch(showModal(modal, routingParams, module))
    },
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    untouch: (form, field) => {
      dispatch(untouch(form, field));
    },
    focusElement: (form, field) => {
      dispatch(touch(form, field));
    },
    addNotification: (message, level, autoDismiss, uid) => {
      dispatch(addNotification(message, level, autoDismiss, uid));
    },
    calculateAsphaltAnalysis: (formValues, isOnlyCalculate, message, aaForm, outputForm) =>  {
      dispatch(calculateAsphaltAnalysis(formValues, isOnlyCalculate, message, aaForm, outputForm));
    },
    setEditAsphaltAnalysisButtonValue: (module, showEditButton) => {
      dispatch(setEditAsphaltAnalysisButtonValue(module, showEditButton));
    }, 
    setEditDefaultAsphaltAnalysisParametres: (module, canEdit) => {
      dispatch(setEditDefaultAsphaltAnalysisParametres(module, canEdit));
    },
    setAsphaltAnalysisFormValues: (module, formValues) => {
      dispatch(setAsphaltAnalysisFormValues(module, formValues));
    },
    resetForm:(form) => {
      dispatch(reset(form));
    },
    initializeAsphaltAnalysisForm: (form, formValues) => {
      dispatch(initialize(form, formValues));
    },
    setMrsgInputValue: (module, mrsgValue) => {
      dispatch(setMrsgInputValue(module, mrsgValue));  
    },
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

AsphaltAnalysisForm = connect(
    mapStateToProps, 
    mapDispatchToProps      
)(AsphaltAnalysisForm)

export default AsphaltAnalysisForm;

