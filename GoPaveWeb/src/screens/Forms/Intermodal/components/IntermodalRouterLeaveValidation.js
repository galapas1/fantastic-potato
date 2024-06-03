import {
  CALIFORNIA_BEARING_RATIO,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  COMPRESSIVE_STREGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  SPLIT_TESILE_STRENGTH,
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  USER_DEFINED_COMPOSITE_K_VALUE,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  DROPDOWN_COMPRESSIVE_STRENGTH,
  DROPDOWN_SPLIT_TENSILE_STRENGTH,
  DROPDOWN_MODULUS_OF_ELASTICITY,
  STRUCTURE_LAYER_MEMBERS,
  DROPDOWN_KNOWN_MSRG_VALUE,
  INPUT_MRSG_VALUE,
  DROPDOWN_CBR,
  DROPDOWN_R_VALUE,
  RESISTANCE_VALUE
} from  'Constants';
import { each, isUndefined} from 'underscore';

export const intermodalPavementStructureFormRouterLeaveValidation = (props) => {
  const { structureLayerForm, mrsgForm, flexuralOutputForm, subgradeDropdown, concreteDropdown, inputMrsgValue, concreteModulusOfElasticity, californiaBearingRatio, flexOutputFormErrors, mrsgFormErrors, resistanceValue, compressiveStrength, twentyEightDayFlexStrength, splitTensileStrength, structureLayerFormErrors, userDefinedCompositeKValue, compositeKValueRadioButtonValue, showCompositeKValueRadioButton, structureLayerMembers } = props;
  let inputsToBeFocussed = [];
  let isFormInvalid;
  let areErrorsPresent;
  let isPavementFormFilled = true;
   //Mrsg form
  if (subgradeDropdown === DROPDOWN_KNOWN_MSRG_VALUE ) {

    if  (isUndefined(inputMrsgValue)) {
      inputsToBeFocussed.push([mrsgForm, INPUT_MRSG_VALUE]);
    }

    if (inputMrsgValue && mrsgFormErrors && mrsgFormErrors[INPUT_MRSG_VALUE]) {
      areErrorsPresent = true;
    }
  } 
  if (subgradeDropdown === DROPDOWN_CBR ) {
    if  (isUndefined(californiaBearingRatio)) {
      inputsToBeFocussed.push([mrsgForm, CALIFORNIA_BEARING_RATIO]);
    }

  } 
  if (subgradeDropdown === DROPDOWN_R_VALUE ) {

    if  (isUndefined(resistanceValue)) {
      inputsToBeFocussed.push([mrsgForm, RESISTANCE_VALUE]);
    }
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

  // If user has clicked on button to show Radio button and not filled out a value, then show an error
  if (showCompositeKValueRadioButton && compositeKValueRadioButtonValue === COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED) {
    if (isUndefined(userDefinedCompositeKValue)) {
       inputsToBeFocussed.push([structureLayerForm, USER_DEFINED_COMPOSITE_K_VALUE]);
    }
   }

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


  if (inputsToBeFocussed.length > 0) {
    isFormInvalid = true
  }
  
  // isPavementFormFilled is used to figure out if user can navigate from Project Level Form to Summary Form
  if (!structureLayerForm || !mrsgForm || !flexuralOutputForm || !concreteDropdown || !structureLayerMembers || isFormInvalid || areErrorsPresent) {
    isPavementFormFilled = false;
  }

  return {
    isFormInvalid: isFormInvalid,
    areErrorsPresent: areErrorsPresent,
    inputsToBeFocussed: inputsToBeFocussed,
    isPavementFormFilled: isPavementFormFilled,
    summaryPath: `/projectTypes/intermodal/summaryForm`
  } 
}
