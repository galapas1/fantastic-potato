import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  TRUCKS_PER_DAY,
  DESIGN_LIFE,  
  TRAFFIC_SPECTRUM_DROPDOWN,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE,
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS
} from  'Constants';

const MAXIMUM_TRUCKS_PER_DAY = 200000;
const DISPLAY_MAXIMUM_TRUCKS_PER_DAY = '200,000';

const MINIMUM_TRUCKS_PER_DAY = 1;

const MAXIMUM_DESIGN_LIFE = 200;
const MINIMUM_DESIGN_LIFE = 1;

const MAXIMUM_RELIABILITY = 99.5;
const MINIMUM_RELIABILITY= 1;

const MAXIMUM_PERCENTAGE_OF_CRACKED_SLABS = 50;
const MINIMUM_PERCENTAGE_OF_CRACKED_SLABS = 1;

export const validate = (values) => {
  const errors = {};

  const enterValueString = "Please enter a value";
  //Between 1 and 100 with 9 decimal points 
  //const regEx = /^(?:100|[1-9]\d(?:\.\d{0,9})?|0?[1-9](?:\.\d{0,9})?)$/;

  const inputs = [TRUCKS_PER_DAY,  DESIGN_LIFE, PERCENTAGE_OF_CRACKED_SLABS, RELIABILITY];

  each(inputs, function(input) {
    if (isUndefined(values[input])) {
      errors[input] = enterValueString;
    }
  })
  
  if (values[TRAFFIC_SPECTRUM_DROPDOWN] === DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE ){
    errors[TRAFFIC_SPECTRUM_DROPDOWN] = 'Please choose a Value';
  }
  // Trucks Per Day
  if (values[TRUCKS_PER_DAY] < MINIMUM_TRUCKS_PER_DAY) {
    errors[TRUCKS_PER_DAY] = minimumValueString(MINIMUM_TRUCKS_PER_DAY);
  }
  if (values[TRUCKS_PER_DAY] > MAXIMUM_TRUCKS_PER_DAY) {
    errors[TRUCKS_PER_DAY] = maximumValueString(DISPLAY_MAXIMUM_TRUCKS_PER_DAY);
  }

  //DESIGN LIFE
  if (values[DESIGN_LIFE] < MINIMUM_DESIGN_LIFE) {
    errors[DESIGN_LIFE] = minimumValueString(MINIMUM_DESIGN_LIFE);
  }
  if (values[DESIGN_LIFE] > MAXIMUM_DESIGN_LIFE) {
    errors[DESIGN_LIFE] = maximumValueString(MAXIMUM_DESIGN_LIFE);
  }

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

