import { isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  MODULUS_OF_ELASTICITY,
  LAYER_THICKNESS,
  US, 
  METRIC
} from  'Constants';

import {
  MINIMUM_CEMENT_TREATED_BASE_MODULUS,
  MAXIMUM_CEMENT_TREATED_BASE_MODULUS,
  MINIMUM_RCC_BASE_MODULUS,
  MAXIMUM_RCC_BASE_MODULUS,
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
  MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO,
  MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO,
  HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO,
  LOW_WARNING_CEMENT_TREATED_POISSON_RATIO,
  HIGH_WARNING_RCC_POISSON_RATIO,
  LOW_WARNING_RCC_POISSON_RATIO,
  HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO,
  LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO,
  HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO, 
  LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO, 
  HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO,
  LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO, 
  HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO, 
  LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO,
  HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO, 
  LOW_WARNING_LIME_MODIFIED_POISSON_RATIO,
  HIGH_WARNING_GRANULAR_POISSON_RATIO,
  LOW_WARNING_GRANULAR_POISSON_RATIO,
  MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  DISPLAY_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
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
  METRIC_DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS,
  METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO,
  METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO,
  METRIC_HIGH_WARNING_RCC_POISSON_RATIO,
  METRIC_LOW_WARNING_RCC_POISSON_RATIO,
  METRIC_HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO,
  METRIC_LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO,
  METRIC_HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO, 
  METRIC_LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO, 
  METRIC_HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO,
  METRIC_LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO, 
  METRIC_HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO, 
  METRIC_LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO,
  METRIC_HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO, 
  METRIC_LOW_WARNING_LIME_MODIFIED_POISSON_RATIO,
  METRIC_HIGH_WARNING_GRANULAR_POISSON_RATIO,
  METRIC_LOW_WARNING_GRANULAR_POISSON_RATIO,
  METRIC_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE,
  METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE 
} from 'Data/appValues';

export const validate = (values, props) => {
  const errors = {};
  const unitType = props.unitType;

  if (!values.structureLayerMembers) {
    return;
  }

  let membersArrayErrors = []
  values.structureLayerMembers.forEach((member, memberIndex) => {

    let layerTypeName;
    if (member['layerTypeName']) {
       layerTypeName = member['layerTypeName']; 
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

    if (!member || isUndefined(member['poissonsRatio'])) {
      memberErrors['poissonsRatio'] = 'Required'
      membersArrayErrors[memberIndex] = memberErrors
    }

     if (!member || isUndefined(member['modulusOfRupture'])) {
      memberErrors['modulusOfRupture'] = 'Required'
      membersArrayErrors[memberIndex] = memberErrors
    }

    if (!layerTypeName) {
      return;
    }

    if (unitType === US) {
     if (member['poissonsRatio'] < MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO) {
         memberErrors['poissonsRatio'] = minimumValueString(MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member['poissonsRatio'] > MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO) {
        memberErrors['poissonsRatio'] = maximumValueString(MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO);
        membersArrayErrors[memberIndex] = memberErrors;
      }


      if (layerTypeName === CEMENT_TREATED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

        if (member['modulusOfRupture'] < MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberErrors['modulusOfRupture'] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member['modulusOfRupture'] > MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberErrors['modulusOfRupture'] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }

      else if (layerTypeName === ROLLER_COMPACTED_BASE) {
          if (member[MODULUS_OF_ELASTICITY] < MINIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }

          if (member['modulusOfRupture'] < MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = minimumValueString(DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member['modulusOfRupture'] > MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = maximumValueString(DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }

      else if (layerTypeName === FULL_DEPTH_RECLAMATION) {
          if (member[MODULUS_OF_ELASTICITY] < MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }

          if (member['modulusOfRupture'] < MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member['modulusOfRupture'] > MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }

       else if (layerTypeName === LEAN_CONCRETE_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_LEAN_CONCRETE_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_LEAN_CONCRETE_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

        if (member['modulusOfRupture'] < MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberErrors['modulusOfRupture'] = minimumValueString(DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member['modulusOfRupture'] > MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberErrors['modulusOfRupture'] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === HOTMIX_WARMMIX_ASPHALT_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === BITUMINOUS_STABILIZED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === CEMENT_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] < MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === LIME_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] <  MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] >  MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === GRANULAR_BASE) {
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

     if (member['poissonsRatio'] < MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO) {
         memberErrors['poissonsRatio'] = minimumValueString(MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member['poissonsRatio'] > MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO) {
        memberErrors['poissonsRatio'] = maximumValueString(MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO);
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (layerTypeName === CEMENT_TREATED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

        if (member['modulusOfRupture'] < METRIC_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberErrors['modulusOfRupture'] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member['modulusOfRupture'] > METRIC_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberErrors['modulusOfRupture'] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }

      else if (layerTypeName === ROLLER_COMPACTED_BASE) {
          if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_RCC_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_RCC_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }

          if (member['modulusOfRupture'] < METRIC_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = minimumValueString(METRIC_DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member['modulusOfRupture'] > METRIC_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = maximumValueString(METRIC_DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }

      else if (layerTypeName === FULL_DEPTH_RECLAMATION) {
          if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS) {
              memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS);
              membersArrayErrors[memberIndex] = memberErrors;
          }

          if (member['modulusOfRupture'] < METRIC_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
          if (member['modulusOfRupture'] > METRIC_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
              memberErrors['modulusOfRupture'] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
              membersArrayErrors[memberIndex] = memberErrors;
          }
      }

       else if (layerTypeName === LEAN_CONCRETE_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_LEAN_CONCRETE_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

        if (member['modulusOfRupture'] < METRIC_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberErrors['modulusOfRupture'] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member['modulusOfRupture'] > METRIC_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberErrors['modulusOfRupture'] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === HOTMIX_WARMMIX_ASPHALT_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === BITUMINOUS_STABILIZED_BASE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === CEMENT_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === LIME_MODIFIED_SUBGRADE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS) {
          memberErrors[MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS);
          membersArrayErrors[memberIndex] = memberErrors;
        }
      } else if (layerTypeName === GRANULAR_BASE) {
        if (member[MODULUS_OF_ELASTICITY] <  METRIC_MINIMUM_GRANULAR_BASE_MODULUS) {
           memberErrors[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS);
           membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member[MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_GRANULAR_BASE_MODULUS) {
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

export const warn = (values, props) => {
  const warnings = {};
  const unitType = props.unitType;

  let membersArrayWarnings = []
  values.structureLayerMembers.forEach((member, memberIndex) => {

    let layerTypeName;
    let memberWarnings = {}
    if (member['layerTypeName']) {
       layerTypeName = member['layerTypeName']; 
    }
    if (!layerTypeName) {
      return;
    }

    if (unitType === US) {

        if (layerTypeName === CEMENT_TREATED_BASE) {
            if (member['poissonsRatio'] < LOW_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['poissonsRatio'] > HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }

            if (member['modulusOfRupture'] < LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = minimumValueString(LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['modulusOfRupture'] > HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = maximumValueString(HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
        }
        else if (layerTypeName === ROLLER_COMPACTED_BASE) {
            if (member['poissonsRatio'] < LOW_WARNING_RCC_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_RCC_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['poissonsRatio'] > HIGH_WARNING_RCC_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_RCC_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }

            if (member['modulusOfRupture'] < LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = minimumValueString(LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['modulusOfRupture'] > HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = maximumValueString(HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
        }

        else if (layerTypeName === FULL_DEPTH_RECLAMATION) {
            if (member['poissonsRatio'] < LOW_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['poissonsRatio'] > HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }

            if (member['modulusOfRupture'] < LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = minimumValueString(LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['modulusOfRupture'] > HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = maximumValueString(HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
      }
       else if (layerTypeName === LEAN_CONCRETE_BASE) {
        if (member['poissonsRatio'] < LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;

        }

        if (member['modulusOfRupture'] < LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberWarnings['modulusOfRupture'] = minimumValueString(DISPLAY_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['modulusOfRupture'] > HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberWarnings['modulusOfRupture'] = maximumValueString(DISPLAY_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO) {
        if (member['poissonsRatio'] <  MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === BITUMINOUS_STABILIZED_BASE) {
        if (member['poissonsRatio'] < LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO) {
         memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings
        }
      } else if (layerTypeName === CEMENT_MODIFIED_SUBGRADE) {
        if (member['poissonsRatio'] < LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === LIME_MODIFIED_SUBGRADE) {
        if (member['poissonsRatio'] <  LOW_WARNING_LIME_MODIFIED_POISSON_RATIO) {
           memberWarnings[MODULUS_OF_ELASTICITY] = minimumValueString(LOW_WARNING_LIME_MODIFIED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] >  HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === GRANULAR_BASE) {
        if (member['poissonsRatio'] <  LOW_WARNING_GRANULAR_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(LOW_WARNING_GRANULAR_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] >  HIGH_WARNING_GRANULAR_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(HIGH_WARNING_GRANULAR_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } 
    } else if (unitType === METRIC) {
      
          if (layerTypeName === CEMENT_TREATED_BASE) {
              if (member['poissonsRatio'] < METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                  memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }
              if (member['poissonsRatio'] > METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                  memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }

              if (member['modulusOfRupture'] < METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                  memberWarnings['modulusOfRupture'] = minimumValueString(METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }
              if (member['modulusOfRupture'] > METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                  memberWarnings['modulusOfRupture'] = maximumValueString(METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }
          }

          else if (layerTypeName === ROLLER_COMPACTED_BASE) {
              if (member['poissonsRatio'] < METRIC_LOW_WARNING_RCC_POISSON_RATIO) {
                  memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_RCC_POISSON_RATIO);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }
              if (member['poissonsRatio'] > METRIC_HIGH_WARNING_RCC_POISSON_RATIO) {
                  memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_RCC_POISSON_RATIO);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }

              if (member['modulusOfRupture'] < METRIC_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                  memberWarnings['modulusOfRupture'] = minimumValueString(METRIC_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }
              if (member['modulusOfRupture'] > METRIC_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                  memberWarnings['modulusOfRupture'] = maximumValueString(METRIC_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                  membersArrayWarnings[memberIndex] = memberWarnings;
              }

          }

        else if (layerTypeName === FULL_DEPTH_RECLAMATION) {
            if (member['poissonsRatio'] < METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['poissonsRatio'] > METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO) {
                memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }

            if (member['modulusOfRupture'] < METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = minimumValueString(METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }
            if (member['modulusOfRupture'] > METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
                memberWarnings['modulusOfRupture'] = maximumValueString(METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
                membersArrayWarnings[memberIndex] = memberWarnings;
            }     

      }
       else if (layerTypeName === LEAN_CONCRETE_BASE) {
        if (member['poissonsRatio'] < METRIC_LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > METRIC_HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;

        }

        if (member['modulusOfRupture'] < METRIC_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
           memberWarnings['modulusOfRupture'] = minimumValueString(METRIC_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['modulusOfRupture'] > METRIC_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE) {
          memberWarnings['modulusOfRupture'] = maximumValueString(METRIC_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === METRIC_LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO) {
        if (member['poissonsRatio'] <  METRIC_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS) {
           memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > METRIC_HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === BITUMINOUS_STABILIZED_BASE) {
        if (member['poissonsRatio'] < METRIC_LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > METRIC_HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO) {
         memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings
        }
      } else if (layerTypeName === CEMENT_MODIFIED_SUBGRADE) {
        if (member['poissonsRatio'] < METRIC_LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] > METRIC_HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === LIME_MODIFIED_SUBGRADE) {
        if (member['poissonsRatio'] <  METRIC_LOW_WARNING_LIME_MODIFIED_POISSON_RATIO) {
           memberWarnings[MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_LOW_WARNING_LIME_MODIFIED_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] >  METRIC_HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerTypeName === GRANULAR_BASE) {
        if (member['poissonsRatio'] <  METRIC_LOW_WARNING_GRANULAR_POISSON_RATIO) {
           memberWarnings['poissonsRatio'] = minimumValueString(METRIC_LOW_WARNING_GRANULAR_POISSON_RATIO);
           membersArrayWarnings[memberIndex] = memberWarnings;
        }
        if (member['poissonsRatio'] >  METRIC_HIGH_WARNING_GRANULAR_POISSON_RATIO) {
          memberWarnings['poissonsRatio'] = maximumValueString(METRIC_HIGH_WARNING_GRANULAR_POISSON_RATIO);
          membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } 
    }

  });

  if(membersArrayWarnings.length) {
    warnings.structureLayerMembers = membersArrayWarnings
  }

    return warnings;
}
