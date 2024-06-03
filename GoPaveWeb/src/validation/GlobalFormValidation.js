import { each } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,  
} from  'Constants';

const MAXIMUM_RELIABILITY = 99.5;
const MINIMUM_RELIABILITY= 1;

const MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS = 50;
const MINIMUM_PERCENTAGE_OF_CRACKED_SLABS = 1;

export const validate = (values) => {
  const errors = {};
  const enterValueString = "Please enter a value";
  const inputs = [RELIABILITY, PERCENTAGE_OF_CRACKED_SLABS];

  each(inputs, function(input) {
    if (!values[input]) {
      errors[input] = enterValueString;
    }
  })

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

  return errors;
}
