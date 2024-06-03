import React from 'react';
import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
  SUBGRADE_MODULUS_OF_ELASTICITY,
  US,
  METRIC
} from  'Constants';

const        MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION = 1200;
const METRIC_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION = 30480;

const        DISPLAY_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION = '1,200';
const METRIC_DISPLAY_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION = '30,480';

const        MINIMUM_THICKNESS_TO_RIGID_FOUNDATION = 1;
const METRIC_MINIMUM_THICKNESS_TO_RIGID_FOUNDATION = 25.4;

const        MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = 1000000;
const METRIC_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = 6894.8;

const        DISPLAY_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = '1,000,000';
const METRIC_DISPLAY_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = '6,894.8';

const        MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = 500;
const METRIC_MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY = 3.45;

const        MAXIMUM_SUBGRADE_POISSONS_RATIO = 0.50;
const METRIC_MAXIMUM_SUBGRADE_POISSONS_RATIO = 0.50;

const        MINIMUM_SUBGRADE_POISSONS_RATIO = 0.10;
const METRIC_MINIMUM_SUBGRADE_POISSONS_RATIO = 0.10;

const HIGH_WARNING_SUBGRADE_POISSONS_RATIO= 0.40;
const METRIC_HIGH_WARNING_SUBGRADE_POISSONS_RATIO= 0.40;

const        LOW_WARNING_SUBGRADE_POISSONS_RATIO = 0.25;
const METRIC_LOW_WARNING_SUBGRADE_POISSONS_RATIO = 0.25;

const DISPLAY_HIGH_WARNING_SUBGRADE_POISSONS_RATIO= 'Number is a little low';
const DISPLAY_LOW_WARNING_SUBGRADE_POISSONS_RATIO = 'Number is a little high';


export const validate = (values, props) => {
  const errors = {};
  const enterValueString = 'Please enter a value';
  const unitType = props.unitType;

  const inputs = [ THICKNESS_TO_RIGID_FOUNDATION,
                   SUBGRADE_POISSONS_RATIO,
                   SUBGRADE_MODULUS_OF_ELASTICITY ];

  each(inputs, function(input) {
    if (isUndefined(values[input])) {
      errors[input] = enterValueString;
    }
  })

  if (unitType === US) {
    if (values[THICKNESS_TO_RIGID_FOUNDATION] < MINIMUM_THICKNESS_TO_RIGID_FOUNDATION) {
      errors[THICKNESS_TO_RIGID_FOUNDATION] = minimumValueString(MINIMUM_THICKNESS_TO_RIGID_FOUNDATION);
    }
    if (values[THICKNESS_TO_RIGID_FOUNDATION] > MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION) {
      errors[THICKNESS_TO_RIGID_FOUNDATION] = maximumValueString(DISPLAY_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION);
    }
    if (values[SUBGRADE_MODULUS_OF_ELASTICITY] < MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY) {
      errors[SUBGRADE_MODULUS_OF_ELASTICITY] = minimumValueString(MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY);
    }
    if (values[SUBGRADE_MODULUS_OF_ELASTICITY] > MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY) {
      errors[SUBGRADE_MODULUS_OF_ELASTICITY] = maximumValueString(DISPLAY_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY);
    }
    if (values[SUBGRADE_POISSONS_RATIO] < MINIMUM_SUBGRADE_POISSONS_RATIO) {
      errors[SUBGRADE_POISSONS_RATIO] = minimumValueString(MINIMUM_SUBGRADE_POISSONS_RATIO);
    }
    if (values[SUBGRADE_POISSONS_RATIO] > MAXIMUM_SUBGRADE_POISSONS_RATIO) {
      errors[SUBGRADE_POISSONS_RATIO] = maximumValueString(MAXIMUM_SUBGRADE_POISSONS_RATIO);
    }
    
  } else if  (unitType === METRIC) {
    if (values[THICKNESS_TO_RIGID_FOUNDATION] < METRIC_MINIMUM_THICKNESS_TO_RIGID_FOUNDATION) {
      errors[THICKNESS_TO_RIGID_FOUNDATION] = minimumValueString(METRIC_MINIMUM_THICKNESS_TO_RIGID_FOUNDATION);
    }
    if (values[THICKNESS_TO_RIGID_FOUNDATION] > METRIC_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION) {
      errors[THICKNESS_TO_RIGID_FOUNDATION] = maximumValueString(METRIC_DISPLAY_MAXIMUM_THICKNESS_TO_RIGID_FOUNDATION);
    }
    if (values[SUBGRADE_MODULUS_OF_ELASTICITY] < METRIC_MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY) {
      errors[SUBGRADE_MODULUS_OF_ELASTICITY] = minimumValueString(METRIC_MINIMUM_SUBGRADE_MODULUS_OF_ELASTICITY);
    }
    if (values[SUBGRADE_MODULUS_OF_ELASTICITY] > METRIC_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY) {
      errors[SUBGRADE_MODULUS_OF_ELASTICITY] = maximumValueString(METRIC_DISPLAY_MAXIMUM_SUBGRADE_MODULUS_OF_ELASTICITY);
    }
    if (values[SUBGRADE_POISSONS_RATIO] < METRIC_MINIMUM_SUBGRADE_POISSONS_RATIO) {
      errors[SUBGRADE_POISSONS_RATIO] = minimumValueString(METRIC_MINIMUM_SUBGRADE_POISSONS_RATIO);
    }
    if (values[SUBGRADE_POISSONS_RATIO] > METRIC_MAXIMUM_SUBGRADE_POISSONS_RATIO) {
      errors[SUBGRADE_POISSONS_RATIO] = maximumValueString(METRIC_MAXIMUM_SUBGRADE_POISSONS_RATIO);
    }
  }


  return errors;
}

export const warn = (values, props) => {
    const warnings = {};
    const unitType = props.unitType;

    if (unitType === US) {
      if (values[SUBGRADE_POISSONS_RATIO] < LOW_WARNING_SUBGRADE_POISSONS_RATIO) {
          warnings[SUBGRADE_POISSONS_RATIO] = DISPLAY_LOW_WARNING_SUBGRADE_POISSONS_RATIO;
      }

      if (values[SUBGRADE_POISSONS_RATIO] > HIGH_WARNING_SUBGRADE_POISSONS_RATIO) {
          warnings[SUBGRADE_POISSONS_RATIO] = DISPLAY_HIGH_WARNING_SUBGRADE_POISSONS_RATIO;
      }
    } else if (unitType === METRIC) {
      // Need to enter metric validation
    }


    return warnings;
}