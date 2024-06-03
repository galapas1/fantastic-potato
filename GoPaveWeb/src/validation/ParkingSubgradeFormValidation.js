import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  CALIFORNIA_BEARING_RATIO,
  US,
  METRIC
} from  'Constants';

const        MINIMUM_CALIFORNIA_BEARING_RATIO = 1.0;
const METRIC_MINIMUM_CALIFORNIA_BEARING_RATIO = 1.0;

const        DISPLAY_MINIMUM_CALIFORNIA_BEARING_RATIO = '1.0';
const DISPLAY_METRIC_MINIMUM_CALIFORNIA_BEARING_RATIO = '1.0';

const        MAXIMUM_CALIFORNIA_BEARING_RATIO = 100;
const METRIC_MAXIMUM_CALIFORNIA_BEARING_RATIO = 100;

const        DISPLAY_MAXIMUM_CALIFORNIA_BEARING_RATIO = '100';
const DISPLAY_METRIC_MAXIMUM_CALIFORNIA_BEARING_RATIO = '100';

const        HIGH_WARNING_CALIFORNIA_BEARING_RATIO  = 20 ;
const METRIC_HIGH_WARNING_CALIFORNIA_BEARING_RATIO  = 20;

const        DISPLAY_HIGH_WARNING_CALIFORNIA_BEARING_RATIO  = 'Number is a little high. Typical Range is 1-20%';
const DISPLAY_METRIC_HIGH_WARNING_CALIFORNIA_BEARING_RATIO  = 'Number is a little high. Typical Range is 1-20%';

export const validate = (values, props) => {
  const errors = {};
  const enterValueString = 'Please enter a value';
  const unitType = props.unitType;
  const inputs = [CALIFORNIA_BEARING_RATIO];

  each(inputs, function(input) {
    if (isUndefined(values[input])) {
      errors[input] = enterValueString;
    }
  })

  if (unitType === US) {
    if (values[CALIFORNIA_BEARING_RATIO] < MINIMUM_CALIFORNIA_BEARING_RATIO) {
      errors[CALIFORNIA_BEARING_RATIO] = minimumValueString(DISPLAY_MINIMUM_CALIFORNIA_BEARING_RATIO);
    }
    if (values[CALIFORNIA_BEARING_RATIO] > MAXIMUM_CALIFORNIA_BEARING_RATIO) {
      errors[CALIFORNIA_BEARING_RATIO] = maximumValueString(DISPLAY_MAXIMUM_CALIFORNIA_BEARING_RATIO);
    }   
  } else if (unitType === METRIC) {
    if (values[CALIFORNIA_BEARING_RATIO] < METRIC_MINIMUM_CALIFORNIA_BEARING_RATIO) {
      errors[CALIFORNIA_BEARING_RATIO] = minimumValueString(DISPLAY_METRIC_MINIMUM_CALIFORNIA_BEARING_RATIO);
    }
    if (values[CALIFORNIA_BEARING_RATIO] > METRIC_MAXIMUM_CALIFORNIA_BEARING_RATIO) {
      errors[CALIFORNIA_BEARING_RATIO] = maximumValueString(DISPLAY_METRIC_MAXIMUM_CALIFORNIA_BEARING_RATIO);
    }
  }

  return errors;
}

export const warn = (values, props) => {
  const warnings = {};
  const unitType = props.unitType;

  if (unitType === US) {
    if (values[CALIFORNIA_BEARING_RATIO] > HIGH_WARNING_CALIFORNIA_BEARING_RATIO) {
      warnings[CALIFORNIA_BEARING_RATIO] = DISPLAY_HIGH_WARNING_CALIFORNIA_BEARING_RATIO;
    } 
  } else if (unitType === METRIC){
    if (values[CALIFORNIA_BEARING_RATIO] > METRIC_HIGH_WARNING_CALIFORNIA_BEARING_RATIO) {
      warnings[CALIFORNIA_BEARING_RATIO] = DISPLAY_METRIC_HIGH_WARNING_CALIFORNIA_BEARING_RATIO;
    }
  }

  return warnings;
}

