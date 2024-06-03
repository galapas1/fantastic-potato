import {
  DESIGN_LIFE_HELP_SCREEN,
  SELECT_SPECTRUM_HELP_SCREEN,
  TRUCKS_PER_DAY_HELP_SCREEN,
  TRAFFIC_GROWTH_RATE_HELP_SCREEN,
  DIRECTIONAL_DISTRIBUTION_HELP_SCREEN,
  DESIGN_LANE_DISTRIBUTION_HELP_SCREEN,
  RELIABILITY_HELP_SCREEN,
  SLABS_CRACKED_HELP_SCREEN,
  CALC_MRSG_HELP_SCREEN,
  MRSG_HELP_SCREEN,
  CBR_HELP_SCREEN,
  CALC_FLEX_HELP_SCREEN,
  FLEX_STRENGTH_HELP_SCREEN,
  ELASTICITY_HELP_SCREEN,
  COMPRESSIVE_HELP_SCREEN,
  TENSILE_HELP_SCREEN,
  FIBERS_HELP_SCREEN,
  EDGE_SUPPORT_HELP_SCREEN,
  LAYER_MODULUS_HELP_SCREEN,
  LAYER_THICKNESS_HELP_SCREEN,
  LOAD_TRANSFER_HELP_SCREEN,
  LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN,
  DRAINAGE_COEFFICIENT_HELP_SCREEN,
  INITIAL_SERVICEABILITY_HELP_SCREEN,
  TERMINAL_SERVICEABILITY_HELP_SCREEN,
  JC_ADJUSTMENT_FACTOR_HELP_SCREEN,
  FATIGUE_ADJUSTMENT_FACTOR_HELP_SCREEN,
  DURABILITY_ADJUSTMENT_FACTOR_HELP_SCREEN,
  METRIC,
  US
} from  'Constants';

const SmallHelpScreenConfig = {
  [DESIGN_LIFE_HELP_SCREEN] : {
    title: 'Design Life',
    firstParagraph: { 
        [US]: 'Enter the expected service life for your pavement design.',
    [METRIC]: 'Enter the expected service life for your pavement design.',
    },
  },
  [SELECT_SPECTRUM_HELP_SCREEN]: {
    title: 'Select Spectrum Type',
    firstParagraph: {
        [US]: 'Select a predefined distribution of axle loads and axles per thousand trucks that best characterizes the truck traffic you expect.',
    [METRIC]: 'Select a predefined distribution of axle loads and axles per thousand trucks that best characterizes the truck traffic you expect.',
    },
    secondParagraph: 'Custom distributions may also be entered.',
  },
  [TRUCKS_PER_DAY_HELP_SCREEN]: {
      title: 'Trucks Per Day',
      firstParagraph: {
          [US]: 'Indicate the daily average for the number of trucks the pavement will service, two-way and at the time of construction.',      
      [METRIC]: 'Indicate the daily average for the number of trucks the pavement will service, two-way and at the time of construction.',      
      },
    },
  [TRAFFIC_GROWTH_RATE_HELP_SCREEN]: {
    title: 'Traffic Growth Rate',
    firstParagraph: {
        [US]: 'Indicate the expected annual growth rate for truck traffic.',          
    [METRIC]: 'Indicate the expected annual growth rate for truck traffic.',          
    },
  },
  [DIRECTIONAL_DISTRIBUTION_HELP_SCREEN]: {
    title: 'Directional Distribution',
    firstParagraph: {
        [US]: 'Enter the directional split of traffic.  For example, if you expect an even split of traffic in both directions, enter 50%.',           
    [METRIC]: 'Enter the directional split of traffic.  For example, if you expect an even split of traffic in both directions, enter 50%.',           
    },
  },
  [DESIGN_LANE_DISTRIBUTION_HELP_SCREEN]: {
    title: 'Design Lane Distribution',
    firstParagraph: {
        [US]: 'Indicate the distribution of traffic when two or more lanes are available in one direction.',
    [METRIC]: 'Indicate the distribution of traffic when two or more lanes are available in one direction.',
    },
    secondParagraph: 'When there is only one lane, this value should be 100%.',
  },
  [RELIABILITY_HELP_SCREEN]: {
      title: 'Reliability',
      firstParagraph: {
          [US]: 'Indicate the liklihood the specified design will perform before failure.  This value is a safety factor for the pavement design.',
      [METRIC]: 'Indicate the liklihood the specified design will perform before failure.  This value is a safety factor for the pavement design.',
      },
   },
  [SLABS_CRACKED_HELP_SCREEN]: {
    title: 'Percent Slabs Cracked',
    firstParagraph: {
        [US]: 'Indicate the allowable percentage of slabs cracked at the end of the design life.',
    [METRIC]: 'Indicate the allowable percentage of slabs cracked at the end of the design life.',
    }
  },
  [CALC_MRSG_HELP_SCREEN]: {
      title: 'MRSG Input Options',
      firstParagraph: {
          [US]: 'The default option is to directly enter a value for MRSG.  Alternatively, select to have MRSG calculated from a known CBR or R-value.',
      [METRIC]: 'The default option is to directly enter a value for MRSG.  Alternatively, select to have MRSG calculated from a known CBR or R-value.',
      },
    },
[MRSG_HELP_SCREEN]: {
    title: 'Resilient Modulus of the Subgrade',
        firstParagraph: {
            [US]: 'Enter a value for MRSG, the elastic response of a soil under repeated loading.',
        [METRIC]: 'Enter a value for MRSG, the elastic response of a soil under repeated loading.',
        },
  },
  [CBR_HELP_SCREEN]: {
      title: 'California Bearing Ratio',
      firstParagraph: {
          [US]: 'Indicate the California Bearing Ratio test value.',
      [METRIC]: 'Indicate the California Bearing Ratio test value.',
      },
  },
  [CALC_FLEX_HELP_SCREEN]: {
      title: '28-Day Flex Strength Input Options',
      firstParagraph: {
          [US]: 'The default option is to directly enter a value for flexural strength.  Alternatively, select to have this value calculated from a known compressive strength, modulus of elasticity, or split tensile strength value.',
      [METRIC]: 'The default option is to directly enter a value for flexural strength.  Alternatively, select to have this value calculated from a known compressive strength, modulus of elasticity, or split tensile strength value.',
      },
  },
  [FLEX_STRENGTH_HELP_SCREEN]: {
      title: '3rd Point Loading 28-Day Flex Strength (MR)',
      firstParagraph: {
          [US]: 'Indicate the flexural strength of the concrete as measured at 28 days using the third-point loading of a simple beam test.',
      [METRIC]: 'Indicate the flexural strength of the concrete as measured at 28 days using the third-point loading of a simple beam test.',
      },
  },
  [ELASTICITY_HELP_SCREEN]: {
      title: 'Modulus of Elasticity (E)',
      firstParagraph: {
          [US]: 'Indicate the concrete modulus of elasticity, which is roughly equal to 6,750 x MR.',
      [METRIC]: 'Indicate the concrete modulus of elasticity, which is roughly equal to 6,750 x MR.',
      },
  },
  [COMPRESSIVE_HELP_SCREEN]: {
      title: 'Compressive Strength',
      firstParagraph: {
          [US]: 'Indicate the measured resistance of a concrete or mortar specimen to axial loading and expressed as pounds per square inch (psi) of cross-sectional area.',
      [METRIC]: 'Indicate the measured resistance of a concrete or mortar specimen to axial loading and expressed as kgs per square mm (MPa) of cross-sectional area.',
      },
  },
  [TENSILE_HELP_SCREEN]: {
      title: 'Split Tensile Strength',
      firstParagraph: {
          [US]: 'Indicate the maximum stress that the material is capable of resisting under axial tensile loading based on the cross-sectional area of the specimen before loading.',
      [METRIC]: 'Indicate the maximum stress that the material is capable of resisting under axial tensile loading based on the cross-sectional area of the specimen before loading.',
      },
  }, 
  [FIBERS_HELP_SCREEN]: {
      title: 'Macrofibers and Residual Strength',
      firstParagraph: {
          [US]: 'Indicate the concrete residual strength when the mixture is fiber reinforced.',
      [METRIC]: 'Indicate the concrete residual strength when the mixture is fiber reinforced.',
      },
    }, 
    [EDGE_SUPPORT_HELP_SCREEN]: {
    title: 'Edge Support',
        firstParagraph: {
            [US]: 'Indicate if edge support (e.g., tied concrete shoulder, curb and gutter, or widened lane) is provided.',
        [METRIC]: 'Indicate if edge support (e.g., tied concrete shoulder, curb and gutter, or widened lane) is provided.',
        },
  },
    [LAYER_MODULUS_HELP_SCREEN]: {
        title: 'Resilient Modulus',
        firstParagraph: {
            [US]: 'Indicate if the resilient modulus for the layer, which is a measure of the layer deformation response to applied loads.',
        [METRIC]: 'Indicate if the resilient modulus for the layer, which is a measure of the layer deformation response to applied loads.',
        },
    },
    [LAYER_THICKNESS_HELP_SCREEN]: {
        title: 'Layer Thickness',
        firstParagraph: {
            [US]: 'Indicate the layer thickness.  See more information for guidance.',
        [METRIC]: 'Indicate the layer thickness.  See more information for guidance.',
        },
    },
    [LOAD_TRANSFER_HELP_SCREEN]: {
        title: 'Load Transfer Recommendation',
        firstParagraph: {
            [US]: 'See more information for dowel bar size and guidance.',
        [METRIC]: 'See more information for dowel bar size and guidance.',
        },
    },
    [LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN]: {
        title: 'Load Transfer Coefficient',
        firstParagraph: {
            [US]: 'Indicate load transfer coefficient, which is a function of the shoulder type and the load transfer condition between the pavement slab and shoulders.',
        [METRIC]: 'Indicate load transfer coefficient, which is a function of the shoulder type and the load transfer condition between the pavement slab and shoulders.',
        },
    },
    [DRAINAGE_COEFFICIENT_HELP_SCREEN]: {
        title: 'Drainage Coefficient',
        firstParagraph: {
            [US]: 'Indicate load transfer coefficient, which is the design capacity of the drainage system.',
        [METRIC]: 'Indicate load transfer coefficient, which is the design capacity of the drainage system.',
        },
    },
    [INITIAL_SERVICEABILITY_HELP_SCREEN]: {
        title: 'Initial Serviceability',
        firstParagraph: {
            [US]: 'Indicate the initial index of serviceability.',
        [METRIC]: 'Indicate the initial index of serviceability.',
        },
    },
    [TERMINAL_SERVICEABILITY_HELP_SCREEN]: {
        title: 'Terminal Serviceability',
        firstParagraph: {
            [US]: 'Indicate the terminal (i.e. end of design life) index of serviceability.',
        [METRIC]: 'Indicate the terminal (i.e. end of design life) index of serviceability.',
        },
    },
    [JC_ADJUSTMENT_FACTOR_HELP_SCREEN]: {
        title: 'Joint/Crack Adjustment Factor',
        firstParagraph: {
            [US]: 'Indicate the extra loss in pavement serviceability index (PSI) due to deteriorated reflective cracks.',
        [METRIC]: 'Indicate the extra loss in pavement serviceability index (PSI) due to deteriorated reflective cracks.',
        },
    }, 
    [FATIGUE_ADJUSTMENT_FACTOR_HELP_SCREEN]: {
        title: 'Fatigue Adjustment Factor',
        firstParagraph: {
            [US]: 'Indicate the adjustment factor for past fatigue damage that may exist in the slab.',
        [METRIC]: 'Indicate the adjustment factor for past fatigue damage that may exist in the slab.',
        },
    }, 
    [DURABILITY_ADJUSTMENT_FACTOR_HELP_SCREEN]: {
        title: 'Durability Adjustment Factor',
        firstParagraph: {
            [US]: 'Indicate the extra loss in pavement serviceability index (PSI) due to durability problems.',
        [METRIC]: 'Indicate the extra loss in pavement serviceability index (PSI) due to durability problems.',
        },
    } 
}
   
export default SmallHelpScreenConfig;

