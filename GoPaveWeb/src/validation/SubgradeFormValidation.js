import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  CALIFORNIA_BEARING_RATIO,
  RESISTANCE_VALUE,
  CALCULATED_MRSG_VALUE, 
  INPUT_MRSG_VALUE, 
  OVERLAY,
  EXISTING_THICKNESS,
  JOINT_CRACKING_TIME_TO_LIVE,
  FATIGUE_ADJUSTMENT_FACTOR,
  DURABILITY_ADJUSTMENT_FACTOR,
  STREET,
  PERCENTAGE_OF_CRACKED_SLABS,
  RELIABILITY,
  JPCP,
  RCC,
  NEW_COMPOSITE,
  US,
  METRIC
} from  'Constants';

const MAXIMUM_ADJUSTMENT_FACTOR = 1;
const MIMIMUM_ADJUSTMENT_FACTOR = 0;

const        MAXIMUM_INPUT_MRSG_VALUE = 1000000;
const METRIC_MAXIMUM_INPUT_MRSG_VALUE = 6894.8;

const        DISPLAY_MAXIMUM_INPUT_MRSG_VALUE = '1,000,000';
const METRIC_DISPLAY_MAXIMUM_INPUT_MRSG_VALUE = '6,894.8';

const        MIMIMUM_INPUT_MRSG_VALUE = 500;
const METRIC_MIMIMUM_INPUT_MRSG_VALUE = 3.4;

const        MAXIMUM_CONCRETE_RESISTANCE_VALUE = 200;
const METRIC_MAXIMUM_CONCRETE_RESISTANCE_VALUE = 200;

const        MINIMUM_CONCRETE_RESISTANCE_VALUE = 0;
const METRIC_MINIMUM_CONCRETE_RESISTANCE_VALUE = 0;

const        HIGH_WARNING_CONCRETE_RESISTANCE_VALUE = 100;
const METRIC_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE = 100;

const        DISPLAY_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE = 'Number is a little high. Typical Range is 1 - 100';
const METRIC_DISPLAY_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE = 'Number is a little high. Typical Range is 1 - 100';

const        LOW_WARNING_CONCRETE_RESISTANCE_VALUE = 1;
const METRIC_LOW_WARNING_CONCRETE_RESISTANCE_VALUE = 1;

const        DISPLAY_LOW_WARNING_CONCRETE_RESISTANCE_VALUE = 'Number is a little low. Typical Range is 1 - 100';
const METRIC_DISPLAY_LOW_WARNING_CONCRETE_RESISTANCE_VALUE = 'Number is a little low. Typical Range is 1 - 100';

const        MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO = 200;
const METRIC_MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO = 200;

const        MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO = 0;
const METRIC_MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO = 0;

const        HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 100;
const METRIC_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 100;

const        DISPLAY_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 'Number is a little high. Typical Range is 1 - 100 %';
const METRIC_DISPLAY_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 'Number is a little high. Typical Range is 1 - 100 %';

const        LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 1;
const METRIC_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 1;

const        DISPLAY_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 'Number is a little low. Typical Range is 1 - 100 %';
const METRIC_DISPLAY_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO = 'Number is a little low. Typical Range is 1 - 100 %';

const MAXIMUM_RELIABILITY = 99.5;
const METRIC_MAXIMUM_RELIABILITY = 99.5;

const MINIMUM_RELIABILITY= 1;
const METRIC_MINIMUM_RELIABILITY= 1;

const MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS = 50;
const METRIC_MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS = 50;

const MINIMUM_PERCENTAGE_OF_CRACKED_SLABS = 1;
const METRIC_MINIMUM_PERCENTAGE_OF_CRACKED_SLABS = 1;

export const validate = (values, props) => {
  const errors = {};
  const enterValueString = 'Please enter a value';
  const { projectType, constructionType, type } = props.params
  const { pavementStructureType,unitType } = props;

  let inputs = [CALIFORNIA_BEARING_RATIO, RESISTANCE_VALUE, CALCULATED_MRSG_VALUE, INPUT_MRSG_VALUE];

  if (unitType == undefined) {
      console.log('[WARN]: unitType undefined for projectType ' + projectType);
  }

  if (unitType === US) {
    if (projectType === STREET && constructionType === OVERLAY) {
      if (type === 'bc' || type === 'uc') {
        inputs.push(EXISTING_THICKNESS);
        inputs.push(JOINT_CRACKING_TIME_TO_LIVE);
        if (type === 'bc') {
          inputs.push(FATIGUE_ADJUSTMENT_FACTOR);
          inputs.push(DURABILITY_ADJUSTMENT_FACTOR);
        }
      }

      if (type === 'bc') {
        if (values[FATIGUE_ADJUSTMENT_FACTOR] < MIMIMUM_ADJUSTMENT_FACTOR) {
           errors[FATIGUE_ADJUSTMENT_FACTOR] = minimumValueString(MIMIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[FATIGUE_ADJUSTMENT_FACTOR] > MAXIMUM_ADJUSTMENT_FACTOR) {
           errors[FATIGUE_ADJUSTMENT_FACTOR] = maximumValueString(MAXIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[DURABILITY_ADJUSTMENT_FACTOR] < MIMIMUM_ADJUSTMENT_FACTOR) {
           errors[DURABILITY_ADJUSTMENT_FACTOR] = minimumValueString(MIMIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[DURABILITY_ADJUSTMENT_FACTOR] > MAXIMUM_ADJUSTMENT_FACTOR) {
           errors[DURABILITY_ADJUSTMENT_FACTOR] = maximumValueString(MAXIMUM_ADJUSTMENT_FACTOR)
        }
      }
    }

    if (projectType === STREET && constructionType === NEW_COMPOSITE && (pavementStructureType === JPCP || pavementStructureType === RCC)) {
       inputs.push(RELIABILITY);
       inputs.push(PERCENTAGE_OF_CRACKED_SLABS);

      if (values[RELIABILITY] < MINIMUM_RELIABILITY) {
        errors[RELIABILITY] = minimumValueString(MINIMUM_RELIABILITY);
      }
      if (values[RELIABILITY] > MAXIMUM_RELIABILITY) {
        errors[RELIABILITY] = maximumValueString(MAXIMUM_RELIABILITY);
      }

      if (values[PERCENTAGE_OF_CRACKED_SLABS] < MINIMUM_PERCENTAGE_OF_CRACKED_SLABS) {
        errors[PERCENTAGE_OF_CRACKED_SLABS] = minimumValueString(MINIMUM_PERCENTAGE_OF_CRACKED_SLABS);
      }
      if (values[PERCENTAGE_OF_CRACKED_SLABS] > MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS) {
        errors[PERCENTAGE_OF_CRACKED_SLABS] = maximumValueString(MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS);
      }
    }

    each(inputs, function(input) {
      if (isUndefined(values[input])) {
        errors[input] = enterValueString;
      }
    })
   
    if (values[INPUT_MRSG_VALUE] < MIMIMUM_INPUT_MRSG_VALUE) {
      errors[INPUT_MRSG_VALUE] = minimumValueString(MIMIMUM_INPUT_MRSG_VALUE);
    }
    if (values[INPUT_MRSG_VALUE] > MAXIMUM_INPUT_MRSG_VALUE) {
      errors[INPUT_MRSG_VALUE] =  maximumValueString(DISPLAY_MAXIMUM_INPUT_MRSG_VALUE);
    }

    if (values[RESISTANCE_VALUE] < MINIMUM_CONCRETE_RESISTANCE_VALUE) {
        errors[RESISTANCE_VALUE] = minimumValueString(MINIMUM_CONCRETE_RESISTANCE_VALUE);
    }
    if (values[RESISTANCE_VALUE] > MAXIMUM_CONCRETE_RESISTANCE_VALUE) {
        errors[RESISTANCE_VALUE] = maximumValueString(MAXIMUM_CONCRETE_RESISTANCE_VALUE);
    }

    if (values[CALIFORNIA_BEARING_RATIO] < MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO) {
        errors[CALIFORNIA_BEARING_RATIO] = minimumValueString(MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO);
    }
    if (values[CALIFORNIA_BEARING_RATIO] > MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO) {
        errors[CALIFORNIA_BEARING_RATIO] = maximumValueString(MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO);
    }   

  } else if (unitType === METRIC) {
    if (projectType === STREET && constructionType === OVERLAY) {
      if (type === 'bc' || type === 'uc') {
        inputs.push(EXISTING_THICKNESS);
        inputs.push(JOINT_CRACKING_TIME_TO_LIVE);

        if (type === 'bc') {
          inputs.push(FATIGUE_ADJUSTMENT_FACTOR);
          inputs.push(DURABILITY_ADJUSTMENT_FACTOR);
        }
      }

      if (type === 'bc') {
        if (values[FATIGUE_ADJUSTMENT_FACTOR] < MIMIMUM_ADJUSTMENT_FACTOR) {
           errors[FATIGUE_ADJUSTMENT_FACTOR] = minimumValueString(MIMIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[FATIGUE_ADJUSTMENT_FACTOR] > MAXIMUM_ADJUSTMENT_FACTOR) {
           errors[FATIGUE_ADJUSTMENT_FACTOR] = maximumValueString(MAXIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[DURABILITY_ADJUSTMENT_FACTOR] < MIMIMUM_ADJUSTMENT_FACTOR) {
           errors[DURABILITY_ADJUSTMENT_FACTOR] = minimumValueString(MIMIMUM_ADJUSTMENT_FACTOR)
        }

        if (values[DURABILITY_ADJUSTMENT_FACTOR] > MAXIMUM_ADJUSTMENT_FACTOR) {
           errors[DURABILITY_ADJUSTMENT_FACTOR] = maximumValueString(MAXIMUM_ADJUSTMENT_FACTOR)
        }
      }
    }

    if (projectType === STREET && constructionType === NEW_COMPOSITE && (pavementStructureType === JPCP || pavementStructureType === RCC)) {
       inputs.push(RELIABILITY);
       inputs.push(PERCENTAGE_OF_CRACKED_SLABS);

      if (values[RELIABILITY] < METRIC_MINIMUM_RELIABILITY) {
        errors[RELIABILITY] = minimumValueString(METRIC_MINIMUM_RELIABILITY);
      }
      if (values[RELIABILITY] > METRIC_MAXIMUM_RELIABILITY) {
        errors[RELIABILITY] = maximumValueString(METRIC_MAXIMUM_RELIABILITY);
      }

      if (values[PERCENTAGE_OF_CRACKED_SLABS] < METRIC_MINIMUM_PERCENTAGE_OF_CRACKED_SLABS) {
        errors[PERCENTAGE_OF_CRACKED_SLABS] = minimumValueString(METRIC_MINIMUM_PERCENTAGE_OF_CRACKED_SLABS);
      }
      if (values[PERCENTAGE_OF_CRACKED_SLABS] > METRIC_MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS) {
        errors[PERCENTAGE_OF_CRACKED_SLABS] = maximumValueString(METRIC_MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS);
      }
    }

    each(inputs, function(input) {
      if (isUndefined(values[input])) {
        errors[input] = enterValueString;
      }
    })
   
    if (values[INPUT_MRSG_VALUE] < METRIC_MIMIMUM_INPUT_MRSG_VALUE) {
      errors[INPUT_MRSG_VALUE] = minimumValueString(METRIC_MIMIMUM_INPUT_MRSG_VALUE);
    }
    if (values[INPUT_MRSG_VALUE] > METRIC_MAXIMUM_INPUT_MRSG_VALUE) {
      errors[INPUT_MRSG_VALUE] =  maximumValueString(METRIC_DISPLAY_MAXIMUM_INPUT_MRSG_VALUE);
    }

    if (values[RESISTANCE_VALUE] < METRIC_MINIMUM_CONCRETE_RESISTANCE_VALUE) {
        errors[RESISTANCE_VALUE] = minimumValueString(METRIC_MINIMUM_CONCRETE_RESISTANCE_VALUE);
    }
    if (values[RESISTANCE_VALUE] > METRIC_MAXIMUM_CONCRETE_RESISTANCE_VALUE) {
        errors[RESISTANCE_VALUE] = maximumValueString(METRIC_MAXIMUM_CONCRETE_RESISTANCE_VALUE);
    }

    if (values[CALIFORNIA_BEARING_RATIO] < METRIC_MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO) {
        errors[CALIFORNIA_BEARING_RATIO] = minimumValueString(METRIC_MINIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO);
    }
    if (values[CALIFORNIA_BEARING_RATIO] > METRIC_MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO) {
        errors[CALIFORNIA_BEARING_RATIO] = maximumValueString(METRIC_MAXIMUM_CONCRETE_CALIFORNIA_BEARING_RATIO);
    }   
  }

  return errors;
}

export const warn = (values, props) => {
    const warnings = {};
    const { unitType } = props;

    if (unitType === US) {
      if (values[RESISTANCE_VALUE] < LOW_WARNING_CONCRETE_RESISTANCE_VALUE) {
          warnings[RESISTANCE_VALUE] = DISPLAY_LOW_WARNING_CONCRETE_RESISTANCE_VALUE;
      }

      if (values[RESISTANCE_VALUE] > HIGH_WARNING_CONCRETE_RESISTANCE_VALUE) {
          warnings[RESISTANCE_VALUE] = DISPLAY_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE;
      }

      if (values[CALIFORNIA_BEARING_RATIO] < LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO) {
          warnings[CALIFORNIA_BEARING_RATIO] = DISPLAY_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO;
      }

      if (values[CALIFORNIA_BEARING_RATIO] > HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO) {
          warnings[CALIFORNIA_BEARING_RATIO] = DISPLAY_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO;
      }

    } else if (unitType === METRIC) {
      if (values[RESISTANCE_VALUE] < METRIC_LOW_WARNING_CONCRETE_RESISTANCE_VALUE) {
          warnings[RESISTANCE_VALUE] = METRIC_DISPLAY_LOW_WARNING_CONCRETE_RESISTANCE_VALUE;
      }

      if (values[RESISTANCE_VALUE] > METRIC_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE) {
          warnings[RESISTANCE_VALUE] = METRIC_DISPLAY_HIGH_WARNING_CONCRETE_RESISTANCE_VALUE;
      }

      if (values[CALIFORNIA_BEARING_RATIO] < METRIC_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO) {
          warnings[CALIFORNIA_BEARING_RATIO] = METRIC_DISPLAY_LOW_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO;
      }

      if (values[CALIFORNIA_BEARING_RATIO] > METRIC_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO) {
          warnings[CALIFORNIA_BEARING_RATIO] = METRIC_DISPLAY_HIGH_WARNING_CONCRETE_CALIFORNIA_BEARING_RATIO;
      }
    }

    return warnings;
}
