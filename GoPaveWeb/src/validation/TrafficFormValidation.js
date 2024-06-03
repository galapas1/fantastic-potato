import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import {
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  TRAFFIC_SPECTRUM_DROPDOWN,
  DEFAULT_TRAFFIC_SPECTRUM_DROPDOWN_VALUE
} from  'Constants';

const MAXIMUM_TRUCKS_PER_DAY = 200000;
const DISPLAY_MAXIMUM_TRUCKS_PER_DAY = '200,000';

const MINIMUM_TRUCKS_PER_DAY = 1;

const MAXIMUM_TRAFFIC_GROWTH_RATE = 50;
const MINIMUM_TRAFFIC_GROWTH_RATE = 0;

const HIGH_WARNING_TRAFFIC_GROWTH_RATE = 10;
const DISPLAY_HIGH_WARNING_TRAFFIC_GROWTH_RATE = 'Number is a little high. Typical Range is 1-10%';


const MAXIMUM_DIRECTIONAL_DISTRIBUTION = 100;
const MINIMUM_DIRECTIONAL_DISTRIBUTION = 1;

const MAXIMUM_DESIGN_LANE_DISTRIBUTION = 100;
const MINIMUM_DESIGN_LANE_DISTRIBUTION = 1;

const MAXIMUM_DESIGN_LIFE = 200;
const MINIMUM_DESIGN_LIFE = 1;

export const validate = (values) => {
  const errors = {};

  const enterValueString = "Please enter a value";

  const inputs = [TRUCKS_PER_DAY, TRAFFIC_GROWTH_RATE, DIRECTIONAL_DISTRIBUTION, DESIGN_LANE_DISTRIBUTION, DESIGN_LIFE];

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
  
  // Traffic Growth Rate
  if (values[TRAFFIC_GROWTH_RATE] < MINIMUM_TRAFFIC_GROWTH_RATE) {
    errors[TRAFFIC_GROWTH_RATE] = minimumValueString(MINIMUM_TRAFFIC_GROWTH_RATE);
  }
  if (values[TRAFFIC_GROWTH_RATE] > MAXIMUM_TRAFFIC_GROWTH_RATE) {
    errors[TRAFFIC_GROWTH_RATE] = maximumValueString(MAXIMUM_TRAFFIC_GROWTH_RATE);
  }

  //DIRECTIONAL_DISTRIBUTION
  if (values[DIRECTIONAL_DISTRIBUTION] < MINIMUM_DIRECTIONAL_DISTRIBUTION) {
    errors[DIRECTIONAL_DISTRIBUTION] = minimumValueString(MINIMUM_DIRECTIONAL_DISTRIBUTION);
  }
  if (values[DIRECTIONAL_DISTRIBUTION] > MAXIMUM_DIRECTIONAL_DISTRIBUTION) {
    errors[DIRECTIONAL_DISTRIBUTION] = maximumValueString(MAXIMUM_DIRECTIONAL_DISTRIBUTION);
  }

  //DESIGN_LANE_DISTRIBUTION
  if (values[DESIGN_LANE_DISTRIBUTION] < MINIMUM_DESIGN_LANE_DISTRIBUTION) {
    errors[DESIGN_LANE_DISTRIBUTION] = minimumValueString(MINIMUM_DESIGN_LANE_DISTRIBUTION);
  }
  if (values[DESIGN_LANE_DISTRIBUTION] > MAXIMUM_DESIGN_LANE_DISTRIBUTION) {
    errors[DESIGN_LANE_DISTRIBUTION] = maximumValueString(MAXIMUM_DESIGN_LANE_DISTRIBUTION);
  }

  //DESIGN LIFE
  if (values[DESIGN_LIFE] < MINIMUM_DESIGN_LIFE) {
    errors[DESIGN_LIFE] = minimumValueString(MINIMUM_DESIGN_LIFE);
  }
  if (values[DESIGN_LIFE] > MAXIMUM_DESIGN_LIFE) {
    errors[DESIGN_LIFE] = maximumValueString(MAXIMUM_DESIGN_LIFE);
  }

  return errors;
}

export const warn = (values) => {
  const warnings = {};

  if (values[TRAFFIC_GROWTH_RATE] > HIGH_WARNING_TRAFFIC_GROWTH_RATE) {
    warnings[TRAFFIC_GROWTH_RATE] = DISPLAY_HIGH_WARNING_TRAFFIC_GROWTH_RATE;
  }

  return warnings;
}
