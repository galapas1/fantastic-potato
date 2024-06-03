import { each, isUndefined } from 'underscore';
import { minimumValueString, maximumValueString} from 'Validation/validationHelper';
import {
  ASPHALT_ANALYSIS_FORM_RELIABILITY,
  ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
  ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY,
  ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN,
  ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT,
  ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS,
  ASPHALT_CEMENT_CONCRETE,
  ASPHALT_TREATED_AGGREGRIATE_BASE,
  BITUM_TREATED_AGGREGRIATE_BASE,
  ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
  US,
  METRIC
} from  'Constants';

const        MINIMUM_LAYER_COEFFICIEINT = 0;
const METRIC_MINIMUM_LAYER_COEFFICIEINT = 0;

const        MAXIMUM_LAYER_COEFFICIEINT = 0.5;
const METRIC_MAXIMUM_LAYER_COEFFICIEINT = 0.5;

const        MINIMUM_SUBGRADE_RESILIENT_MODULUS = 2000;
const METRIC_MINIMUM_SUBGRADE_RESILIENT_MODULUS = 13.8;

const        DISPLAY_MINIMUM_SUBGRADE_RESILIENT_MODULUS = '2000';
const METRIC_DISPLAY_MINIMUM_SUBGRADE_RESILIENT_MODULUS = '13.8';

const        MAXIMUM_SUBGRADE_RESILIENT_MODULUS  = 50000;
const METRIC_MAXIMUM_SUBGRADE_RESILIENT_MODULUS  = 344.7;

const        DISPLAY_MAXIMUM_SUBGRADE_RESILIENT_MODULUS  = '50,000';
const METRIC_DISPLAY_MAXIMUM_SUBGRADE_RESILIENT_MODULUS  = '344.7';

const        MINIMUM_DRAINAGE_COEFFICIEINT = 0.4;
const METRIC_MINIMUM_DRAINAGE_COEFFICIEINT = 0.4;

const        MAXIMUM_DRAINAGE_COEFFICIEINT = 1.4;
const METRIC_MAXIMUM_DRAINAGE_COEFFICIEINT = 1.4;

const        MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE = 1
const METRIC_MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE = 1

const        MINIMUM_LAYER_THICKNESS = 4
const METRIC_MINIMUM_LAYER_THICKNESS = 101.6

const        MAXIMUM_LAYER_THICKNESS = 30;
const METRIC_MAXIMUM_LAYER_THICKNESS = 762;

const        MINIMUM_RELIABILITY= 50;
const METRIC_MINIMUM_RELIABILITY= 50;

const        MAXIMUM_RELIABILITY = 99.99;
const METRIC_MAXIMUM_RELIABILITY = 99.99;

const        MAXIMUM_OVERALL_STANDARD_DEVIATION = 0.49;
const METRIC_MAXIMUM_OVERALL_STANDARD_DEVIATION = 0.49;

const        MINIMUM_OVERALL_STANDARD_DEVIATION = 0.45;
const METRIC_MINIMUM_OVERALL_STANDARD_DEVIATION = 0.45;

const        MAXIMUM_INITIAL_SERVICEABILITY = 5;
const METRIC_MAXIMUM_INITIAL_SERVICEABILITY = 5;

const        MINIMUM_INITIAL_SERVICEABILITY = 3;
const METRIC_MINIMUM_INITIAL_SERVICEABILITY = 3;

const        MAXIMUM_TERMINAL_SERVICEABILITY = 4;
const METRIC_MAXIMUM_TERMINAL_SERVICEABILITY = 4;

const        MINIMUM_TERMINAL_SERVICEABILITY = 1;
const METRIC_MINIMUM_TERMINAL_SERVICEABILITY = 1;

//Warnings
const        LOW_WARNING_ASPHALT_CEMENT_CONCRETE = 0.2;
const METRIC_LOW_WARNING_ASPHALT_CEMENT_CONCRETE = 0.2;

const DISPLAY_LOW_WARNING_ASPHALT_CEMENT_CONCRETE = 'Number is a little low.';

const        HIGH_WARNING_ASPHALT_CEMENT_CONCRETE = 0.44;
const METRIC_HIGH_WARNING_ASPHALT_CEMENT_CONCRETE = 0.44;

const DISPLAY_HIGH_WARNING_ASPHALT_CEMENT_CONCRETE = 'Number is a little high.';

const        LOW_WARNING_ASPHALT_TREATED_AGG_BASE = 0.2;
const METRIC_LOW_WARNING_ASPHALT_TREATED_AGG_BASE = 0.2;

const DISPLAY_LOW_WARNING_ASPHALT_TREATED_AGG_BASE = 'Number is a little low.';

const        HIGH_WARNING_ASPHALT_TREATED_AGG_BASE  = 0.38;
const METRIC_HIGH_WARNING_ASPHALT_TREATED_AGG_BASE  = 0.38;

const DISPLAY_HIGH_WARNING_ASPHALT_TREATED_AGG_BASE  = 'Number is a little high.'

const        LOW_WARNING_BITUM_TREATED_AGG_BASE= 0.1;
const METRIC_LOW_WARNING_BITUM_TREATED_AGG_BASE= 0.1;

const DISPLAY_LOW_WARNING_BITUM_TREATED_AGG_BASE= 'Number is a little low.';

const        HIGH_WARNING_BITUM_TREATED_AGG_BASE = 0.3;
const METRIC_HIGH_WARNING_BITUM_TREATED_AGG_BASE = 0.3;

const DISPLAY_HIGH_WARNING_BITUM_TREATED_AGG_BASE = 'Number is a little high.';

export const validate = (values, props) => {
  const errors = {};
  const enterValueString = 'REQUIRED';
  const unitType = props.unitType;
  const inputs = [ ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS,
                   ASPHALT_ANALYSIS_FORM_RELIABILITY,
                   ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION,
                   ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY,
                   ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY ];

  each(inputs, function(input) {
    if (isUndefined(values[input])) {
      errors[input] = enterValueString;
    }
  })

  let membersArrayErrors = [];

  if (!values.asphaltAnalysisLayers) {
    return;
  }

  if (unitType === US) {
    if (values[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] < MINIMUM_SUBGRADE_RESILIENT_MODULUS) {
      errors[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] = minimumValueString(DISPLAY_MINIMUM_SUBGRADE_RESILIENT_MODULUS);
    }
    if (values[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] > MAXIMUM_SUBGRADE_RESILIENT_MODULUS) {
      errors[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] = maximumValueString(DISPLAY_MAXIMUM_SUBGRADE_RESILIENT_MODULUS);
    }

    if (values[ASPHALT_ANALYSIS_FORM_RELIABILITY] < MINIMUM_RELIABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_RELIABILITY] = minimumValueString(MINIMUM_RELIABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_RELIABILITY] > MAXIMUM_RELIABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_RELIABILITY] = maximumValueString(MAXIMUM_RELIABILITY);
    }

    if (values[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] < MINIMUM_OVERALL_STANDARD_DEVIATION) {
      errors[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] = minimumValueString(MINIMUM_OVERALL_STANDARD_DEVIATION);
    }
    if (values[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] > MAXIMUM_OVERALL_STANDARD_DEVIATION) {
      errors[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] = maximumValueString(MAXIMUM_OVERALL_STANDARD_DEVIATION);
    }

    if (values[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] < MINIMUM_INITIAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] = minimumValueString(MINIMUM_INITIAL_SERVICEABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] > MAXIMUM_INITIAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] = maximumValueString(MAXIMUM_INITIAL_SERVICEABILITY);
    }

    if (values[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] < MINIMUM_TERMINAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] = minimumValueString(MINIMUM_TERMINAL_SERVICEABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] > MAXIMUM_TERMINAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] = maximumValueString(MAXIMUM_TERMINAL_SERVICEABILITY);
    }

    values.asphaltAnalysisLayers.forEach((member, memberIndex) => {

      let layerType;
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]) {
         layerType = member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]; 
      }

      let memberErrors = {}
      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }

      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] || member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] === 'Select Material' ) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }

      if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < MINIMUM_LAYER_COEFFICIEINT) {
         memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = minimumValueString(MINIMUM_LAYER_COEFFICIEINT);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > MAXIMUM_LAYER_COEFFICIEINT) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = maximumValueString(MAXIMUM_LAYER_COEFFICIEINT);
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] < MINIMUM_DRAINAGE_COEFFICIEINT) {
         memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = minimumValueString(MINIMUM_DRAINAGE_COEFFICIEINT);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] > MAXIMUM_DRAINAGE_COEFFICIEINT) {
        memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = maximumValueString(MAXIMUM_DRAINAGE_COEFFICIEINT);
        membersArrayErrors[memberIndex] = memberErrors;
      }

      // Asphalt_cement_concrete has a diferent minimum value
      if (layerType === ASPHALT_CEMENT_CONCRETE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] < MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE) {
           memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = minimumValueString(MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
      } else {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] < MINIMUM_LAYER_THICKNESS) {
           memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = minimumValueString(MINIMUM_LAYER_THICKNESS);
           membersArrayErrors[memberIndex] = memberErrors;
        }  
      }

      if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] > MAXIMUM_LAYER_THICKNESS) {
          memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = maximumValueString(MAXIMUM_LAYER_THICKNESS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

    });
    
  } else if (unitType === METRIC) {
    // Need to enter metric values

    if (values[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] < METRIC_MINIMUM_SUBGRADE_RESILIENT_MODULUS) {
      errors[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] = minimumValueString(METRIC_DISPLAY_MINIMUM_SUBGRADE_RESILIENT_MODULUS);
    }
    if (values[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] > METRIC_MAXIMUM_SUBGRADE_RESILIENT_MODULUS) {
      errors[ASPHALT_ANALYSIS_FORM_SUBGRADE_RESILIENT_MODULUS] = maximumValueString(METRIC_DISPLAY_MAXIMUM_SUBGRADE_RESILIENT_MODULUS);
    }

    if (values[ASPHALT_ANALYSIS_FORM_RELIABILITY] < METRIC_MINIMUM_RELIABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_RELIABILITY] = minimumValueString(METRIC_MINIMUM_RELIABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_RELIABILITY] > METRIC_MAXIMUM_RELIABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_RELIABILITY] = maximumValueString(METRIC_MAXIMUM_RELIABILITY);
    }

    if (values[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] < METRIC_MINIMUM_OVERALL_STANDARD_DEVIATION) {
      errors[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] = minimumValueString(METRIC_MINIMUM_OVERALL_STANDARD_DEVIATION);
    }
    if (values[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] > METRIC_MAXIMUM_OVERALL_STANDARD_DEVIATION) {
      errors[ASPHALT_ANALYSIS_FORM_OVERALL_STANDARD_DEVIATION] = maximumValueString(METRIC_MAXIMUM_OVERALL_STANDARD_DEVIATION);
    }

    if (values[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] < METRIC_MINIMUM_INITIAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] = minimumValueString(METRIC_MINIMUM_INITIAL_SERVICEABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] > METRIC_MAXIMUM_INITIAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_INITIAL_SERVICEABILITY] = maximumValueString(METRIC_MAXIMUM_INITIAL_SERVICEABILITY);
    }

    if (values[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] < METRIC_MINIMUM_TERMINAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] = minimumValueString(METRIC_MINIMUM_TERMINAL_SERVICEABILITY);
    }
    if (values[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] > METRIC_MAXIMUM_TERMINAL_SERVICEABILITY) {
      errors[ASPHALT_ANALYSIS_FORM_TERMINAL_SERVICEABILITY] = maximumValueString(METRIC_MAXIMUM_TERMINAL_SERVICEABILITY);
    }

    values.asphaltAnalysisLayers.forEach((member, memberIndex) => {

      let layerType;
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]) {
         layerType = member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]; 
      }

      let memberErrors = {}
      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS]) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }

      if (!member || !member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] || member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] === 'Select Material' ) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN] = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }

      if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < METRIC_MINIMUM_LAYER_COEFFICIEINT) {
         memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = minimumValueString(METRIC_MINIMUM_LAYER_COEFFICIEINT);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > METRIC_MAXIMUM_LAYER_COEFFICIEINT) {
        memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = maximumValueString(METRIC_MAXIMUM_LAYER_COEFFICIEINT);
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] < METRIC_MINIMUM_DRAINAGE_COEFFICIEINT) {
         memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = minimumValueString(METRIC_MINIMUM_DRAINAGE_COEFFICIEINT);
         membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] > METRIC_MAXIMUM_DRAINAGE_COEFFICIEINT) {
        memberErrors[ASPHALT_ANALYSIS_FORM_DRAINAGE_COEFFICIENT] = maximumValueString(METRIC_MAXIMUM_DRAINAGE_COEFFICIEINT);
        membersArrayErrors[memberIndex] = memberErrors;
      }

      // Asphalt_cement_concrete has a diferent minimum value
      if (layerType === ASPHALT_CEMENT_CONCRETE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] < METRIC_MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE) {
           memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = minimumValueString(METRIC_MINIMUM_LAYER_THICKNESS_ASPHALT_CEMENT_CONCRETE);
           membersArrayErrors[memberIndex] = memberErrors;
        }
      } else {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] < METRIC_MINIMUM_LAYER_THICKNESS) {
           memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = minimumValueString(METRIC_MINIMUM_LAYER_THICKNESS);
           membersArrayErrors[memberIndex] = memberErrors;
        }  
      }

      if (member[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] > METRIC_MAXIMUM_LAYER_THICKNESS) {
          memberErrors[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = maximumValueString(METRIC_MAXIMUM_LAYER_THICKNESS);
          membersArrayErrors[memberIndex] = memberErrors;
        }

    });
  }


  if(membersArrayErrors.length) {
    errors.asphaltAnalysisLayers = membersArrayErrors
  }

  return errors;
}

export const warn = (values, props) => {
  const warnings = {};
  const unitType = props.unitType;

  let membersArrayWarnings = [];

  if (!values.asphaltAnalysisLayers) {
    return;
  }

  if (unitType === US) {
    values.asphaltAnalysisLayers.forEach((member, memberIndex) => {

      let memberWarnings = {}

      let layerType;
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]) {
         layerType = member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]; 
      }

      if (layerType === ASPHALT_CEMENT_CONCRETE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < LOW_WARNING_ASPHALT_CEMENT_CONCRETE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = DISPLAY_LOW_WARNING_ASPHALT_CEMENT_CONCRETE;
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > HIGH_WARNING_ASPHALT_CEMENT_CONCRETE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = DISPLAY_HIGH_WARNING_ASPHALT_CEMENT_CONCRETE;
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerType === ASPHALT_TREATED_AGGREGRIATE_BASE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < LOW_WARNING_ASPHALT_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] =  DISPLAY_LOW_WARNING_ASPHALT_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > HIGH_WARNING_ASPHALT_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = DISPLAY_HIGH_WARNING_ASPHALT_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerType === BITUM_TREATED_AGGREGRIATE_BASE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < LOW_WARNING_BITUM_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = DISPLAY_LOW_WARNING_BITUM_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > HIGH_WARNING_BITUM_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] =DISPLAY_HIGH_WARNING_BITUM_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      }

    });
    
  } else if (unitType === METRIC) {

    values.asphaltAnalysisLayers.forEach((member, memberIndex) => {

      let memberWarnings = {}

      let layerType;
      if (member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]) {
         layerType = member[ASPHALT_ANALYSIS_FORM_LAYER_TYPE_DROPDOWN]; 
      }

      if (layerType === ASPHALT_CEMENT_CONCRETE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < METRIC_LOW_WARNING_ASPHALT_CEMENT_CONCRETE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = METRIC_LOW_WARNING_ASPHALT_CEMENT_CONCRETE
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > METRIC_HIGH_WARNING_ASPHALT_CEMENT_CONCRETE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = METRIC_HIGH_WARNING_ASPHALT_CEMENT_CONCRETE
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerType === ASPHALT_TREATED_AGGREGRIATE_BASE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < METRIC_LOW_WARNING_ASPHALT_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_THICKNESS] = METRIC_LOW_WARNING_ASPHALT_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > METRIC_HIGH_WARNING_ASPHALT_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = METRIC_HIGH_WARNING_ASPHALT_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      } else if (layerType === BITUM_TREATED_AGGREGRIATE_BASE ) {
        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] < METRIC_LOW_WARNING_BITUM_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = METRIC_LOW_WARNING_BITUM_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
         }

        if (member[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] > METRIC_HIGH_WARNING_BITUM_TREATED_AGG_BASE) {
            memberWarnings[ASPHALT_ANALYSIS_FORM_LAYER_COEFFICIENT] = METRIC_HIGH_WARNING_BITUM_TREATED_AGG_BASE;
            membersArrayWarnings[memberIndex] = memberWarnings;
        }
      }

    });
  }

  if(membersArrayWarnings.length) {
    warnings.asphaltAnalysisLayers = membersArrayWarnings;
  }

  return warnings;
}
