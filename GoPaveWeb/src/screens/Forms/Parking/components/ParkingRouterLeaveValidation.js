import {
  TRUCKS_PER_DAY,
  DESIGN_LIFE,  
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  TRAFFIC_SPECTRUM_DROPDOWN,
  CALIFORNIA_BEARING_RATIO,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  COMPRESSIVE_STREGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  SPLIT_TESILE_STRENGTH,
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  USER_DEFINED_COMPOSITE_K_VALUE,
  DEFAULT_SPECTRUM_DROPDOWN_VALUE,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  DROPDOWN_COMPRESSIVE_STRENGTH,
  DROPDOWN_SPLIT_TENSILE_STRENGTH,
  DROPDOWN_MODULUS_OF_ELASTICITY,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';
import { each, isUndefined} from 'underscore';

export const parkingProjectLevelRouterLeaveValidation = (props) => {
  const { trucksPerDay, designLife, reliability, percentageOfSlabs, trafficFormErrors, trafficSpectrumDropdown, trafficForm, isTrafficFormPristine } = props;
  const trafficFormInputsObject = {
    [TRUCKS_PER_DAY]: trucksPerDay, 
    [DESIGN_LIFE]: designLife,
    [RELIABILITY]: reliability,
    [PERCENTAGE_OF_CRACKED_SLABS]: percentageOfSlabs
  };

  let trafficSpectrumDropdownisValid = trafficSpectrumDropdown === DEFAULT_SPECTRUM_DROPDOWN_VALUE ? false : true;
  let inputsToBeFocussed = [];
  let isFormInvalid;
 
  each(trafficFormInputsObject, function(value, key) {
    if (isUndefined(value)) {
      inputsToBeFocussed.push([trafficForm, key]);
    }
  })

  if (!trafficSpectrumDropdownisValid) {
    inputsToBeFocussed.push([trafficForm, TRAFFIC_SPECTRUM_DROPDOWN]);
  }

  if (inputsToBeFocussed.length > 0) {
    isFormInvalid = true;
  }

  return {
    isFormInvalid: isFormInvalid,
    areErrorsPresent: trafficFormErrors,
    inputsToBeFocussed: inputsToBeFocussed,
    areFormsPristine: isTrafficFormPristine,
    pavementStructurePath: '/projectTypes/parking/pavementStructureForm',
    summaryPath: '/projectTypes/parking/summaryForm',
  }  
}

export const parkingPavementStructureFormRouterLeaveValidation = (props) => {
  const { structureLayerForm, mrsgForm, flexuralOutputForm, concreteDropdown, concreteModulusOfElasticity, californiaBearingRatio, flexOutputFormErrors, compressiveStrength, twentyEightDayFlexStrength, splitTensileStrength, structureLayerFormErrors, compositeKValueRadioButtonValue, userDefinedCompositeKValue, showCompositeKValueRadioButton, structureLayerMembers } = props;
  let inputsToBeFocussed = [];
  let isFormInvalid;
  let areErrorsPresent;
  let isPavementFormFilled = true;

  //Mrsg form
  if  (isUndefined(californiaBearingRatio)) {
    inputsToBeFocussed.push([mrsgForm, CALIFORNIA_BEARING_RATIO]);
  }  

   //FlexOutput form
  if (concreteDropdown === DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH) {
    if (isUndefined(twentyEightDayFlexStrength)) {
        inputsToBeFocussed.push([flexuralOutputForm, TWENTYEIGHTDAY_FLEX_STRENGTH]);
    }
    if (twentyEightDayFlexStrength && flexOutputFormErrors && flexOutputFormErrors[TWENTYEIGHTDAY_FLEX_STRENGTH]) {
      areErrorsPresent = true;
    }
  } 
  if (concreteDropdown === DROPDOWN_COMPRESSIVE_STRENGTH) {
    if (isUndefined(compressiveStrength)) {
      inputsToBeFocussed.push([flexuralOutputForm, COMPRESSIVE_STREGTH]);
    }
  }   

  if (concreteDropdown === DROPDOWN_SPLIT_TENSILE_STRENGTH) {
    if (isUndefined(splitTensileStrength)) {
      inputsToBeFocussed.push([flexuralOutputForm, SPLIT_TESILE_STRENGTH]); 
    }
  }

  if (concreteDropdown === DROPDOWN_MODULUS_OF_ELASTICITY) {
    if (isUndefined(concreteModulusOfElasticity)) {
      inputsToBeFocussed.push([flexuralOutputForm, CONCRETE_MODULUS_OF_ELASTICITY]);
    }
    if (concreteModulusOfElasticity && flexOutputFormErrors && flexOutputFormErrors[CONCRETE_MODULUS_OF_ELASTICITY]) {
      areErrorsPresent = true;
    }
  } 

   //Structure Layers Form
  if (structureLayerMembers) {
    each(structureLayerMembers, function(member,index) {
      if (isUndefined(member[MODULUS_OF_ELASTICITY])){
        inputsToBeFocussed.push([structureLayerForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${MODULUS_OF_ELASTICITY}]`]);
      }
      if (member[MODULUS_OF_ELASTICITY] && structureLayerFormErrors && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS] && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS][index] && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS][index][MODULUS_OF_ELASTICITY]) {
        areErrorsPresent = true;
      }
      if (isUndefined(member[LAYER_THICKNESS])){
        inputsToBeFocussed.push([structureLayerForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${LAYER_THICKNESS}]`]);
      }
      if (member[LAYER_THICKNESS] && structureLayerFormErrors && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS] && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS][index] && structureLayerFormErrors[STRUCTURE_LAYER_MEMBERS][index][LAYER_THICKNESS]) {
        areErrorsPresent = true;
      }
    })
   }

  if (showCompositeKValueRadioButton && compositeKValueRadioButtonValue === COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED) {
    if (isUndefined(userDefinedCompositeKValue)) {
       inputsToBeFocussed.push([structureLayerForm, USER_DEFINED_COMPOSITE_K_VALUE]);
    }
   }

  if (inputsToBeFocussed.length > 0) {
    isFormInvalid = true;
  }

  // isPavementFormFilled is used to figure out if user can navigate from Project Level Form to Summary Form
  if (!structureLayerForm || !mrsgForm || !flexuralOutputForm || !concreteDropdown || !structureLayerMembers || !californiaBearingRatio || isFormInvalid || areErrorsPresent) {
    isPavementFormFilled = false;
  }

  return {
    isFormInvalid: isFormInvalid,
    areErrorsPresent: areErrorsPresent,
    inputsToBeFocussed: inputsToBeFocussed,
    isPavementFormFilled: isPavementFormFilled,
    summaryPath: `/projectTypes/parking/summaryForm`
  } 
}
