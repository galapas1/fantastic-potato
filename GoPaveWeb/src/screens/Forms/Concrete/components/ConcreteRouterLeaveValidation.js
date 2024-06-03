import {
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  TRAFFIC_SPECTRUM_DROPDOWN,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  COMPRESSIVE_STREGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  SPLIT_TESILE_STRENGTH,
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  USER_DEFINED_COMPOSITE_K_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  DEFAULT_SPECTRUM_DROPDOWN_VALUE,
  TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  DROPDOWN_COMPRESSIVE_STRENGTH,
  DROPDOWN_SPLIT_TENSILE_STRENGTH,
  DROPDOWN_KNOWN_MSRG_VALUE,
  DROPDOWN_CBR,
  DROPDOWN_R_VALUE,
  DROPDOWN_MODULUS_OF_ELASTICITY,
  STRUCTURE_LAYER_MEMBERS
} from  'Constants';
import { extend, each, pick, isUndefined, isEmpty } from 'underscore';

export const concreteProjectLevelRouterLeaveValidation = (props) => {
  const { trucksPerDay, trafficGrowthRate, directionalDistribution, designLaneDistribution, designLife, reliability, percentageOfSlabs, trafficFormErrors, globalFormErrors, trafficSpectrumDropdown, trafficFormInputsDropdown, trafficForm, globalForm } = props;
  const type = props.params.type;
  const trafficFormInputsObject = {
    [TRUCKS_PER_DAY]: trucksPerDay, 
    [TRAFFIC_GROWTH_RATE]: trafficGrowthRate, 
    [DIRECTIONAL_DISTRIBUTION]: directionalDistribution, 
    [DESIGN_LANE_DISTRIBUTION]: designLaneDistribution, 
    [DESIGN_LIFE]: designLife
  };
  const globalFormInputsObject =  {[RELIABILITY]: reliability, [PERCENTAGE_OF_CRACKED_SLABS]: percentageOfSlabs};

  let trafficFormInputsToFocus = {};
  let trafficFormErrorsObject = {};
  let inputsToBeFocussed = [];
  let isFormInvalid;
  let trafficSpectrumDropdownisValid = trafficSpectrumDropdown === DEFAULT_SPECTRUM_DROPDOWN_VALUE ? false : true;

  // Need to check different inputs based on whether user entered all form values or used Asphalt Analysis Form
  if (trafficFormInputsDropdown === TRAFFIC_DROPDOWN_USER_DEFINED_TRAFFIC_INFO) {
      trafficFormInputsToFocus = trafficFormInputsObject;
      extend(trafficFormErrorsObject, trafficFormErrors);
    } else {
      trafficFormInputsToFocus = pick(trafficFormInputsObject, DESIGN_LIFE)
      trafficFormErrorsObject = pick(trafficFormErrors, TRAFFIC_SPECTRUM_DROPDOWN, DESIGN_LIFE);
    }
  //combine traffic and global form errors into one object
  extend(trafficFormErrorsObject, globalFormErrors);
 
  each(trafficFormInputsToFocus, function(value, key) {
    if (isUndefined(value)) {
      inputsToBeFocussed.push([trafficForm, key]);
    }
  })

  if (!trafficSpectrumDropdownisValid) {
    inputsToBeFocussed.push([trafficForm, TRAFFIC_SPECTRUM_DROPDOWN]);
  }

  each(globalFormInputsObject, function(value, key) {
    if (isUndefined(value)) {
      inputsToBeFocussed.push([globalForm, key]);
    }
  })

  if (inputsToBeFocussed.length > 0) {
    isFormInvalid = true;
  }

  return {
    isFormInvalid: isFormInvalid,
    areErrorsPresent:!isEmpty(trafficFormErrorsObject),
    inputsToBeFocussed: inputsToBeFocussed,
    pavementStructurePath: '/projectTypes/street/concrete/pavementStructureForm',
    summaryPath: `/projectTypes/street/concrete/summaryForm/${type}`,
  }  
}

export const concretePavementStructureFormRouterLeaveValidation = (props) => {
  const { structureLayerForm, mrsgForm, flexuralOutputForm, subgradeDropdown, concreteDropdown, inputMrsgValue, concreteModulusOfElasticity, californiaBearingRatio, flexOutputFormErrors, mrsgFormErrors, resistanceValue, compressiveStrength, twentyEightDayFlexStrength, splitTensileStrength, trafficFormInputDropdown, structureLayerFormErrors,  userDefinedCompositeKValue, compositeKValueRadioButtonValue, showCompositeKValueRadioButton, structureLayerMembers } = props;
  const type = props.params.type;
  let inputsToBeFocussed = [];
  let isFormInvalid;
  let areErrorsPresent;
  let isPavementFormFilled = true;
   //Mrsg form
  if (trafficFormInputDropdown !== TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
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
   
   // If user has clicked on button to show Radio button and not filled out a value, then show an error
   if (showCompositeKValueRadioButton && compositeKValueRadioButtonValue === COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED) {
    if (isUndefined(userDefinedCompositeKValue)) {
       inputsToBeFocussed.push([structureLayerForm, USER_DEFINED_COMPOSITE_K_VALUE]);
    }
   }

  if (inputsToBeFocussed.length > 0) {
    isFormInvalid = true;
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
    summaryPath: `/projectTypes/street/concrete/summaryForm/${type}`
  } 
}

