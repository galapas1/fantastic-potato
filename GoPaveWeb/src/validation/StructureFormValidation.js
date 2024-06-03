import { isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  STRUCTURE_LAYER_TYPE_DROPDOWN,
  USER_DEFINED_COMPOSITE_K_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED,
  US, 
  METRIC
} from  'Constants';

import {
  MINIMUM_CEMENT_TREATED_BASE_MODULUS,
  MAXIMUM_CEMENT_TREATED_BASE_MODULUS,
  MINIMUM_RCC_BASE_MODULUS,
  MAXIMUM_RCC_BASE_MODULUS,
  MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS,
  MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS,
  MINIMUM_LEAN_CONCRETE_BASE_MODULUS,
  MAXIMUM_LEAN_CONCRETE_BASE_MODULUS,
  MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  MINIMUM_GRANULAR_BASE_MODULUS,
  MAXIMUM_GRANULAR_BASE_MODULUS,
  CEMENT_TREATED_BASE,
  ROLLER_COMPACTED_BASE,
  FULL_DEPTH_RECLAMATION,
  LEAN_CONCRETE_BASE,
  HOTMIX_WARMMIX_ASPHALT_BASE,
  BITUMINOUS_STABILIZED_BASE,
  CEMENT_MODIFIED_SUBGRADE,
  LIME_MODIFIED_SUBGRADE,
  GRANULAR_BASE,
  DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS,
  DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS,
  DISPLAY_MINIMUM_RCC_BASE_MODULUS,
  DISPLAY_MAXIMUM_RCC_BASE_MODULUS,
  DISPLAY_MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS,
  DISPLAY_MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS,
  DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS,
  DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS,
  DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS,
  DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS,
  METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS,
  METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS,
  METRIC_MINIMUM_RCC_BASE_MODULUS,
  METRIC_MAXIMUM_RCC_BASE_MODULUS,
  METRIC_MINIMUM_LEAN_CONCRETE_BASE_MODULUS,
  METRIC_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS,
  METRIC_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  METRIC_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  METRIC_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  METRIC_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  METRIC_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  METRIC_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  METRIC_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  METRIC_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  METRIC_MINIMUM_GRANULAR_BASE_MODULUS,
  METRIC_MAXIMUM_GRANULAR_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_RCC_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_RCC_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS,
  METRIC_DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS,
  METRIC_DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS,
  METRIC_DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS,
  METRIC_DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS
} from 'Data/appValues';

export const validate = (values, props) => {
  const errors = {};
  const unitType = props.unitType;
  if (!values.structureLayerMembers) {
    return;
  }

  if(values[COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_CALCULATED] === true) {
      if (isUndefined(values[USER_DEFINED_COMPOSITE_K_VALUE])) {
        errors[USER_DEFINED_COMPOSITE_K_VALUE] = 'Please enter a value';
      }
  }

  let membersArrayErrors = []
  values.structureLayerMembers.forEach((member, memberIndex) => {

    let layerType;
    if (member[STRUCTURE_LAYER_TYPE_DROPDOWN]) {
       layerType = member[STRUCTURE_LAYER_TYPE_DROPDOWN]; 
    }

    let memberErrors = {}
    if (!member || isUndefined(member[MODULUS_OF_ELASTICITY])) {
      memberErrors[MODULUS_OF_ELASTICITY] = 'Required'
      membersArrayErrors[memberIndex] = memberErrors
    }
    if (!member || isUndefined(member[LAYER_THICKNESS])) {
      memberErrors[LAYER_THICKNESS] = 'Required'
      membersArrayErrors[memberIndex] = memberErrors
    }

    if (!layerType) {
      return;
    }

    if (unitType === US) {
      if (layerType === CEMENT_TREATED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }

      else if (layerType === ROLLER_COMPACTED_BASE) {
          if (member[MODULUS_OF_ELASTICITY] < MINIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }

      else if (layerType === FULL_DEPTH_RECLAMATION) {
          if (member[MODULUS_OF_ELASTICITY] < MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }
       else if (layerType === LEAN_CONCRETE_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_LEAN_CONCRETE_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_LEAN_CONCRETE_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === HOTMIX_WARMMIX_ASPHALT_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === BITUMINOUS_STABILIZED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === CEMENT_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === LIME_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] <  MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] >  MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === GRANULAR_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  MINIMUM_GRANULAR_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] >  MAXIMUM_GRANULAR_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } 

    } else if (unitType === METRIC) {
      
      if (layerType === CEMENT_TREATED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }

      else if (layerType === ROLLER_COMPACTED_BASE) {
          if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }
      else if (layerType === FULL_DEPTH_RECLAMATION) {
          if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }
       else if (layerType === LEAN_CONCRETE_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_LEAN_CONCRETE_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === HOTMIX_WARMMIX_ASPHALT_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === BITUMINOUS_STABILIZED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === CEMENT_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === LIME_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] >  METRIC_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerType === GRANULAR_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_GRANULAR_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] >  METRIC_MAXIMUM_GRANULAR_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } 
    }
  });

  if(membersArrayErrors.length) {
    errors.structureLayerMembers = membersArrayErrors
  }

  return errors;
}
