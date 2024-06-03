import {
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION,
  DESIGN_LANE_DISTRIBUTION,
  DESIGN_LIFE,
  TRAFFIC_SPECTRUM_DROPDOWN,
  INPUT_MRSG_VALUE,
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  TWENTYEIGHTDAY_FLEX_STRENGTH, 
  COMPRESSIVE_STREGTH, 
  SPLIT_TESILE_STRENGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  USER_DEFINED_COMPOSITE_K_VALUE,
  DEFAULT_SPECTRUM_DROPDOWN_VALUE,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  DROPDOWN_COMPRESSIVE_STRENGTH,
  DROPDOWN_SPLIT_TENSILE_STRENGTH,
  DROPDOWN_KNOWN_MSRG_VALUE,
  DROPDOWN_CBR,
  DROPDOWN_R_VALUE,
  DROPDOWN_MODULUS_OF_ELASTICITY,
  STRUCTURE_LAYER_MEMBERS,
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
  SUBGRADE_MODULUS_OF_ELASTICITY,
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
  CEMENT_TREATED_BASE,  
ROLLER_COMPACTED_BASE,
  FULL_DEPTH_RECLAMATION,
  LEAN_CONCRETE_BASE,
} from  'Constants';
import { each, isUndefined, isEmpty } from 'underscore';

export const newCompositeProjectLevelRouterLeaveValidation = (props) => {
  const { trucksPerDay, trafficGrowthRate , directionalDistribution, designLaneDistribution, designLife, trafficSpectrumDropdown, trafficFormErrors, newCompositeModule, trafficForm } = props;
   const formInputsObject = {
    [TRUCKS_PER_DAY]: trucksPerDay, 
    [TRAFFIC_GROWTH_RATE]: trafficGrowthRate, 
    [DIRECTIONAL_DISTRIBUTION]: directionalDistribution, 
    [DESIGN_LANE_DISTRIBUTION]: designLaneDistribution, 
    [DESIGN_LIFE]: designLife
  };

  let inputsToBeFocussed = [];
  let isFormInvalid;

  let trafficSpectrumDropdownisValid = trafficSpectrumDropdown === DEFAULT_SPECTRUM_DROPDOWN_VALUE ? false : true;

  each(formInputsObject, function(value, key) {
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
    areErrorsPresent: !isEmpty(trafficFormErrors),
    inputsToBeFocussed: inputsToBeFocussed,
    pavementStructurePath: '/projectTypes/street/newComposite/pavementStructureForm',
    summaryPath: `/projectTypes/street/newComposite/summaryForm/${newCompositeModule}`  
  } 
}

export const newCompositePavementStructureFormRouterLeaveValidation = (props) => {
  const { structureLayerForm, mrsgForm, flexuralOutputForm, subgradeDropdown, concreteDropdown, inputMrsgValue, concreteModulusOfElasticity, californiaBearingRatio, flexOutputFormErrors, mrsgFormErrors, resistanceValue, compressiveStrength, twentyEightDayFlexStrength, splitTensileStrength, newCompositeModule, reliability,  percentageOfSlabs, subgradeFormErrors, structureLayerFormErrors, userDefinedCompositeKValue, compositeKValueRadioButtonValue, showCompositeKValueRadioButton, structureLayerMembers,  surfaceLayerPoissonsRatio, otherSurfaceModulusOFElasticity, surfaceLayerThickness, allowableDamagePerLayer, subgradePoissonsRatio, otherSubgradeModulusOFElasticity,
    thicknessToRigidFoundation, newCompositeOtherSurfaceLayerForm, newCompositeOtherSubgradeForm,  newCompositeOtherStructureForm, newCompositeOtherStructureFormErrors, newCompositeOtherSurfaceLayerFormErrors, 
    newCompositeOtherSubgradeFormErrors } = props;
  let inputsToBeFocussed = [];
  let isFormInvalid;
  let areErrorsPresent;
  let isPavementFormFilled = true;

  if (mrsgForm) {

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

    if (isUndefined(reliability)) {
      inputsToBeFocussed.push([mrsgForm, RELIABILITY]); 
    }

    if (reliability && subgradeFormErrors && subgradeFormErrors[RELIABILITY]) {
      areErrorsPresent = true;
    }

    if (isUndefined(percentageOfSlabs)) {
      inputsToBeFocussed.push([mrsgForm, PERCENTAGE_OF_CRACKED_SLABS]);
    }

    if (percentageOfSlabs && subgradeFormErrors && subgradeFormErrors[PERCENTAGE_OF_CRACKED_SLABS]) {
      areErrorsPresent = true;
    }
   //Mrsg form
  }
  //FlexOutput form
  if (flexuralOutputForm) {
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
  }

   //Structure Layers Form
  if (structureLayerForm) {
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
  }

  if (newCompositeOtherSurfaceLayerForm) {
    if (isUndefined(surfaceLayerPoissonsRatio)) {
      inputsToBeFocussed.push([newCompositeOtherSurfaceLayerForm, SURFACE_POISSONS_RATIO]);
    }

    if (surfaceLayerPoissonsRatio && newCompositeOtherSurfaceLayerFormErrors && newCompositeOtherSurfaceLayerFormErrors[SURFACE_POISSONS_RATIO]) {
      areErrorsPresent = true;
    }

    if (isUndefined(otherSurfaceModulusOFElasticity)) {
      inputsToBeFocussed.push([newCompositeOtherSurfaceLayerForm, SURFACE_LAYER_MODULUS_ELASTICITY]);
    }

    if (otherSurfaceModulusOFElasticity && newCompositeOtherSurfaceLayerFormErrors && newCompositeOtherSurfaceLayerFormErrors[SURFACE_LAYER_MODULUS_ELASTICITY]) {
      areErrorsPresent = true;
    }

    if (isUndefined(surfaceLayerThickness)) {
      inputsToBeFocussed.push([newCompositeOtherSurfaceLayerForm, SURFACE_LAYER_THICKNESS]);
    }

    if (isUndefined(allowableDamagePerLayer)) {
      inputsToBeFocussed.push([newCompositeOtherSurfaceLayerForm, ALLOWABLE_DAMAGE_PER_LAYER]);
    }

    if (newCompositeOtherSurfaceLayerFormErrors && newCompositeOtherSurfaceLayerFormErrors[SURFACE_LAYER_THICKNESS]) {
      areErrorsPresent = true;
    }

    if (newCompositeOtherSurfaceLayerFormErrors && newCompositeOtherSurfaceLayerForm[ALLOWABLE_DAMAGE_PER_LAYER]) {
      areErrorsPresent = true;
    }
  }

  if (newCompositeOtherSubgradeForm) { 
    if (isUndefined(thicknessToRigidFoundation)) {
      inputsToBeFocussed.push([newCompositeOtherSubgradeForm, THICKNESS_TO_RIGID_FOUNDATION]);
    }

    if (thicknessToRigidFoundation && newCompositeOtherSubgradeFormErrors && newCompositeOtherSubgradeFormErrors[THICKNESS_TO_RIGID_FOUNDATION]) {
      areErrorsPresent = true;
    }

    if (isUndefined(subgradePoissonsRatio)) {
      inputsToBeFocussed.push([newCompositeOtherSubgradeForm, SUBGRADE_POISSONS_RATIO]);
    }

    if (subgradePoissonsRatio && newCompositeOtherSubgradeFormErrors && newCompositeOtherSubgradeFormErrors[SUBGRADE_POISSONS_RATIO]) {
      areErrorsPresent = true;
    }

    if (isUndefined(otherSubgradeModulusOFElasticity)) {
      inputsToBeFocussed.push([newCompositeOtherSubgradeForm, SUBGRADE_MODULUS_OF_ELASTICITY]);
    }

    if (otherSubgradeModulusOFElasticity && newCompositeOtherSubgradeFormErrors && newCompositeOtherSubgradeFormErrors[SUBGRADE_MODULUS_OF_ELASTICITY]) {
      areErrorsPresent = true;
    }
  }

  if (newCompositeOtherStructureForm) { 
    if (structureLayerMembers) {
      each(structureLayerMembers, function(member,index) {
        if (isUndefined(member[MODULUS_OF_ELASTICITY])){
          inputsToBeFocussed.push([newCompositeOtherStructureForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${MODULUS_OF_ELASTICITY}]`]);
        }

        if (member[MODULUS_OF_ELASTICITY] && newCompositeOtherStructureFormErrors && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index][MODULUS_OF_ELASTICITY]) {
          areErrorsPresent = true;
        }

        if (isUndefined(member[LAYER_THICKNESS])){
          inputsToBeFocussed.push([newCompositeOtherStructureForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${LAYER_THICKNESS}]`]);
        }

        if (member[LAYER_THICKNESS] && newCompositeOtherStructureFormErrors && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index][LAYER_THICKNESS]) {
          areErrorsPresent = true;
        }

        if (isUndefined(member['poissonsRatio'])){
          inputsToBeFocussed.push([newCompositeOtherStructureForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${'poissonsRatio'}]`]);
        }

        if (member['poissonsRatio'] && newCompositeOtherStructureFormErrors && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index]['poissonsRatio']) {
          areErrorsPresent = true;
        }

        if (member['layerTypeName'] === LEAN_CONCRETE_BASE || member['layerTypeName'] === CEMENT_TREATED_BASE || member['layerTypeName'] === ROLLER_COMPACTED_BASE || member['layerTypeName'] === FULL_DEPTH_RECLAMATION) {
          if (isUndefined(member['modulusOfRupture'])){
            inputsToBeFocussed.push([newCompositeOtherStructureForm, `${STRUCTURE_LAYER_MEMBERS}[${index}][${'modulusOfRupture'}]`]);
          }

          if (member['modulusOfRupture'] && newCompositeOtherStructureFormErrors && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index] && newCompositeOtherStructureFormErrors[STRUCTURE_LAYER_MEMBERS][index]['modulusOfRupture']) {
            areErrorsPresent = true;
          }    
        }


      })
     }
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
    summaryPath: `/projectTypes/street/newComposite/summaryForm/${newCompositeModule}`
  } 
}
