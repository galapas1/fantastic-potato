
import { getUnits } from 'HelperFunctions/getUnits';

import {
 NEW_COMPOSITE_TRAFFIC_FORM,
 CONCRETE_TRAFFIC_FORM,
 CONCRETE_GLOBAL_FORM,
 CONCRETE_CONCRETE_FORM,
 CONCRETE_SUBGRADE_FORM,
 CONCRETE_STRUCTURE_FORM,
 CONCRETE_CRCP_SUMMARY_FORM,
 CONCRETE_JPCP_SUMMARY_FORM,
 CONCRETE_RCC_SUMMARY_FORM,
 OVERLAY_TRAFFIC_FORM,
 OVERLAY_GLOBAL_FORM,
 OVERLAY_ASPHALT_ANALYIS_FORM,
 OVERLAY_UNBONDED_ASPHALT_SUMMARY_FORM,
 OVERLAY_BONDED_CONCRETE_SUMMARY_FORM,
 OVERLAY_UNBONDED_CONCRETE_SUMMARY_FORM,
 OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
 OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
 OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
 OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
 OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
 OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
 NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
 NEW_COMPOSITE_TRAFFIC_SUMMARY_DEAILS_FORM,
 NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
 NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
 NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
 NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
 NEW_COMPOSITE_RCC_STRUCTURE_FORM,
 NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_RCC_SUBGRADE_FORM,
 NEW_COMPOSITE_BST_STRUCTURE_FORM,
 NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_BST_SUBGRADE_FORM,
 NEW_COMPOSITE_HMA_STRUCTURE_FORM,
 NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_HMA_SUBGRADE_FORM,
 NEW_COMPOSITE_JPCP_SUMMARY_FORM,
 NEW_COMPOSITE_RCC_SUMMARY_FORM,
 PARKING_TRAFFIC_FORM,
 PARKING_SUBGRADE_FORM,
 PARKING_SUBBASE_FORM,
 PARKING_CONCRETE_FORM,
 PARKING_SUMMARY_FORM,
 INTERMODAL_STRUCTURE_FORM,
 INTERMODAL_SUBGRADE_FORM,
 INTERMODAL_CONCRETE_FORM
} from 'Constants'

export const formsPresentInDifferentModules = {
  concrete: [ CONCRETE_TRAFFIC_FORM,
              CONCRETE_GLOBAL_FORM,
              CONCRETE_CONCRETE_FORM,
              CONCRETE_SUBGRADE_FORM,
              CONCRETE_STRUCTURE_FORM,
              CONCRETE_CRCP_SUMMARY_FORM,
              CONCRETE_JPCP_SUMMARY_FORM,
              CONCRETE_RCC_SUMMARY_FORM ],
  overlay: [  OVERLAY_TRAFFIC_FORM,
              OVERLAY_GLOBAL_FORM,
              OVERLAY_ASPHALT_ANALYIS_FORM,
              OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
              OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
              OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
              OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
              OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
              OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
              OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
              OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
              OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
              OVERLAY_UNBONDED_ASPHALT_SUMMARY_FORM,
              OVERLAY_BONDED_CONCRETE_SUMMARY_FORM,
              OVERLAY_UNBONDED_CONCRETE_SUMMARY_FORM],
  parking: [  PARKING_TRAFFIC_FORM,
              PARKING_SUBGRADE_FORM,
              PARKING_SUBBASE_FORM,
              PARKING_CONCRETE_FORM,
              PARKING_SUMMARY_FORM],
  newComposite: [NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
                 NEW_COMPOSITE_TRAFFIC_SUMMARY_DEAILS_FORM,
                 NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM,
                 NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
                 NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
                 NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
                 NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
                 NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
                 NEW_COMPOSITE_RCC_STRUCTURE_FORM,
                 NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
                 NEW_COMPOSITE_RCC_SUBGRADE_FORM,
                 NEW_COMPOSITE_BST_STRUCTURE_FORM,
                 NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
                 NEW_COMPOSITE_BST_SUBGRADE_FORM,
                 NEW_COMPOSITE_HMA_STRUCTURE_FORM,
                 NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM,
                 NEW_COMPOSITE_HMA_SUBGRADE_FORM,
                 NEW_COMPOSITE_TRAFFIC_FORM,
                 NEW_COMPOSITE_JPCP_SUMMARY_FORM,
                 NEW_COMPOSITE_RCC_SUMMARY_FORM,],
  intermodal: [ INTERMODAL_STRUCTURE_FORM,
                INTERMODAL_SUBGRADE_FORM,
                INTERMODAL_CONCRETE_FORM]
}

// Default Structure Layer values
export const CEMENT_TREATED_BASE_DROPDOWN_VALUE         = 600000;
export const RCC_BASE_DROPDOWN_VALUE                    = 4000000;
export const FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE      = 600000;
export const LEAN_CONCRETE_BASE_DROPDOWN_VALUE          = 1500000;
export const HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE = 450000;
export const BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE  = 170000;
export const CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE    = 100000;
export const LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE      = 50000;
export const GRANULAR_BASE_DROPDOWN_VALUE               = 25000;

export const METRIC_CEMENT_TREATED_BASE_DROPDOWN_VALUE         = 4136;
export const METRIC_RCC_BASE_DROPDOWN_VALUE                    = 27580;
export const METRIC_FULL_DEPTH_RECLAMATION_DROPDOWN_VALUE      = 4136;
export const METRIC_LEAN_CONCRETE_BASE_DROPDOWN_VALUE          = 10342;
export const METRIC_HOTMIX_WARMMIX_ASPHALT_BASE_DROPDOWN_VALUE = 3102;
export const METRIC_BITUMINOUS_STABILIZED_BASE_DROPDOWN_VALUE  = 1172;
export const METRIC_CEMENT_MODIFIED_SUBGRADE_DROPDOWN_VALUE    = 690;
export const METRIC_LIME_MODIFIED_SUBGRADE_DROPDOWN_VALUE      = 345;
export const METRIC_GRANULAR_BASE_DROPDOWN_VALUE               = 172;

export const CEMENT_TREATED_BASE         = 'Cement-Treated Base';
export const ROLLER_COMPACTED_BASE       = 'Roller-Compacted Concrete Base';
export const FULL_DEPTH_RECLAMATION      = 'Full-Depth Reclamation';
export const LEAN_CONCRETE_BASE          = 'Lean Concrete Base';
export const HOTMIX_WARMMIX_ASPHALT_BASE = 'Hot-Mix or Warm-Mix Asphalt Base';
export const BITUMINOUS_STABILIZED_BASE  = 'Bituminous Stabilized Base';
export const CEMENT_MODIFIED_SUBGRADE    = 'Cement Stabilized Subgrade';
export const LIME_MODIFIED_SUBGRADE      = 'Lime Stabilized Subgrade';
export const GRANULAR_BASE               = 'Granular Base';

export const trafficSpectrumDropdownValues = [{ name: 'Residential' },
                                              { name: 'Collector' },
                                              { name: 'Minor Arterial' },
                                              { name: 'Major Arterial' },
                                              { name: 'ACI 330 Traffic Spectrum A' },
                                              { name: 'ACI 330 Traffic Spectrum B' },
                                              { name: 'ACI 330 Traffic Spectrum C' },
                                              { name: 'ACI 330 Traffic Spectrum D' },
                                              { name: 'ACI 330 Traffic Spectrum E' },
                                              { name: 'Custom Traffic Spectrum'} ];

export const structureTableLayerValues = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)'           },
                                          { name: FULL_DEPTH_RECLAMATION                          },
                                          { name: LEAN_CONCRETE_BASE, subName: '(LCB, Econocrete)'},
                                          { name: HOTMIX_WARMMIX_ASPHALT_BASE                     },
                                          { name: BITUMINOUS_STABILIZED_BASE                      },
                                          { name: CEMENT_MODIFIED_SUBGRADE                        },
                                          { name: LIME_MODIFIED_SUBGRADE                          },
                                          { name: GRANULAR_BASE                                   }];

export const compositeJpcpLimitedStructureTableLayerValues = [{ name: CEMENT_TREATED_BASE, subName: '(CTB)'           }, 
                                                              { name: LEAN_CONCRETE_BASE, subName: '(LCB, Econocrete)'}, 
                                                              { name: HOTMIX_WARMMIX_ASPHALT_BASE                     }, 
                                                              { name: BITUMINOUS_STABILIZED_BASE                      }];

export const parkingTrafficSpectrumDropdownValues = [{ name: 'ACI 330 Traffic Spectrum A' },
                                                     { name: 'ACI 330 Traffic Spectrum B' },
                                                     { name: 'ACI 330 Traffic Spectrum C' },
                                                     { name: 'ACI 330 Traffic Spectrum D' },
                                                     { name: 'ACI 330 Traffic Spectrum E' }];

export const saveProjectTypesFromFormTypes = {
  concrete    : 'STREET_CONCRETE',
  overlay     : 'STREET_OVERLAY',
  newComposite: 'STREET_COMPOSITE',
  parking     : 'PARKING',
  intermodal  : 'INTERMODAL'
}

export const saveProjectTypesFromCreateProjectModal = {
  'CONCRETE STREET'  : 'STREET_CONCRETE',
  'OVERLAY'          : 'STREET_OVERLAY',
  'NEW COMPOSITE'    : 'STREET_COMPOSITE',
  'PARKING STRUCTURE': 'PARKING',
  'INTERMODAL'       : 'INTERMODAL'
}

export const projectTypesToDisplayToUser = {
  STREET_CONCRETE : 'Concrete',
  STREET_OVERLAY  : 'Overlay',
  STREET_COMPOSITE: 'Composite',
  PARKING         : 'Parking',
  INTERMODAL      : 'Intermodal'
}

export const getGraphValues = (isMetric) => {
    return {
        'k-value': 
        { xAxisValue: 'k-value, ' + getUnits('psi/in.', isMetric),
            xAxisDataValue: 'kValue',
            title: 'Effect of k-value on Thickness'
        },
        'Flexural Strength' : 
        { xAxisValue: 'Modulus of Rupture (Flexural Strength), ' + getUnits('psi', isMetric),
            xAxisDataValue: 'flexuralStrength',
            title: 'Effect of Flexural Strength on Thickness'
        },
        'Reliability': 
        {xAxisValue: 'Reliability', 
            xAxisDataValue: 'reliability',
            title: 'Effect of Reliability on Thickness'
        },
        'Design Life': 
        { xAxisValue: 'Design Life, years',
            xAxisDataValue: 'designLife', 
            title: 'Effect of Design Life on Thickness'
        },
        'Slabs Cracked': 
        { xAxisValue: '% Slabs Cracked',
            xAxisDataValue: 'slabsCracked', 
            title: 'Effect of Slabs Cracked on Thickness'
        },
        'Predicted Damages in Percentages': 
        {
            xAxisValue: 'Year',
            title: 'Predicted Damage By Analysis Layer Over Design Life',
            yAxisValue: 'Predicted Damage (%)',
            xAxisDataValue: 'designLife',
        }
    }

}

export const asphaltSummaryLayerGraphValues = [ 'HMA/WMA Dense Graded',
// exclude as not an analysis layer             'BST Chip Seal',
                                                'Cement-Treated Base',
                                                'Roller-Compacted Concrete Base',
                                                'Full-Depth Reclamation',
                                                'Lean Concrete Base',
                                                'Hot Mix or Warm Mixed Asphalt Base',
                                                'Bituminous Stabilized Base',
                                                'Cement Stabilized Subgrade',
                                                'Soil'];

export const allSubbaseLayers = ['Cement-Treated Base',
                                 'Roller-Compacted Concrete Base',
                                 'Full-Depth Reclamation',
                                 'Lean Concrete Base',
                                 'Hot Mix or Warm Mixed Asphalt Base',
                                 'Bituminous Stabilized Base',
                                 'Cement Stabilized Subgrade',
                                 'Lime Stabilized Subgrade',
                                 'Granular Base' ];

export const asphaltSummaryLayerGraphLayerValues = {
  'HMA/WMA Dense Graded' : {
    yAxisValue: 'HMA/WMA Dense Graded',
    failureAnalysisText: 'Asphalt Fatigue',
    color: 'green', rgb: '0,128,0'
  },
  'BST Chip Seal': {
     yAxisValue: 'BST Chip Seal',
     failureAnalysisText: 'Asphalt Fatigue',
  },
  'Cement-Treated Base': {
     yAxisValue: 'Cement-Treated Base (CTB)',
     failureAnalysisText: 'NCHRP 1-37A CTB',
     thickness: '3.0',
     failureAnalysis: '1',
     color:  'slategray', rgb: '112,128,144',
     displayName: 'Cement-Treated Base (CTB)'
  },
  'Roller-Compacted Concrete Base': {
      yAxisValue: 'Roller-Compacted Concrete Base (RCC)',
      failureAnalysisText: 'RCC Fatigue',
      thickness: '3.0',
      failureAnalysis: '1',
      color: 'slategray', rgb: '112,128,144',
      displayName: 'Roller-Compacted Concrete Base (RCC)'
  },
  'Full-Depth Reclamation': {
      yAxisValue: 'Full-Depth Reclamation (FDR)',
      failureAnalysisText: 'NCHRP 1-37A CTB',
      thickness: '3.0',
      failureAnalysis: '1',
      color: 'slategray', rgb: '112,128,144',
      displayName: 'Full-Depth Reclamation (FDR)'
  },
  'Lean Concrete Base': {
     yAxisValue: 'Lean Concrete Base',
     failureAnalysisText: 'NCHRP 1-37A CTB',
     thickness: '2.3',
     color:  'lightgray', rgb: '211,211,211',
     displayName: 'Lean Concrete Base'
  } ,
  'Hot-Mix or Warm-Mix Asphalt Base': {
      yAxisValue: 'Hot-Mix or Warm-Mix Asphalt Base',
     failureAnalysisText: 'Asphalt Fatigue',
     thickness: '1.1',
     color:  'darkgreen', rgb: '0,100,0',
     displayName: 'Hot Mix or Warm Mixed Asphalt Base'
  },
  'Bituminous Stabilized Base': {
      yAxisValue: 'Bituminous Stabilized Base',
     failureAnalysisText: 'Asphalt Fatigue',
     thickness: '0.08',
     color:  'dimgray', rgb: '105,105,105',
     displayName: 'Bituminous Stabilized Base'
  },
  'Cement Stabilized Subgrade': {
      yAxisValue: 'Cement Stabilized Subgrade',
     failureAnalysisText: 'NCHRP 1-37A CMS',
     thickness: '2.8',
     color:  'saddlebrown', rgb: '139,69,19',
     displayName: 'Cement Stabilized Subgrade'
  },
  'Lime Stabilized Subgrade': {
     thickness: '1.2',
     color:  'tan', rgb: '210,180,140',
     displayName: 'Lime Stabilized Subgrade'
  },
  'Granular Base': {
     thickness: '0.25',
     color:  'gray', rgb: '128,128,128',
     displayName: 'Granular Base'
  },

  'Soil': {
      yAxisValue: 'Subgrade',
     failureAnalysisText: 'Subgrade Rutting',
     thickness: '3.0',
     color:  'black', rgb: '0,0,0',
     displayName: 'Subgrade'
  }
}

//Structure layers validation values

// Structure form 
export const MINIMUM_CEMENT_TREATED_BASE_MODULUS = 250000;
export const MAXIMUM_CEMENT_TREATED_BASE_MODULUS = 2000000;

export const MINIMUM_RCC_BASE_MODULUS = 3000000;
export const MAXIMUM_RCC_BASE_MODULUS = 6000000;

export const MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS = 250000;
export const MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS = 2000000;

export const MINIMUM_LEAN_CONCRETE_BASE_MODULUS = 1000000;
export const MAXIMUM_LEAN_CONCRETE_BASE_MODULUS = 2000000;

export const MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = 350000;
export const MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = 1000000;

export const MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = 40000;
export const MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = 300000;

export const MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = 40000;
export const MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = 200000;

export const MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = 20000;
export const MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = 100000;

export const MINIMUM_GRANULAR_BASE_MODULUS = 15000;
export const MAXIMUM_GRANULAR_BASE_MODULUS = 45000;

export const MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO  = 0.10;
export const MAXIMUM_ALL_STRUCTURE_LAYERS__POISSON_RATIO = 0.50;

export const DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS = '250,000';
export const DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS = '2,000,000';

export const DISPLAY_MINIMUM_RCC_BASE_MODULUS = '3,000,000';
export const DISPLAY_MAXIMUM_RCC_BASE_MODULUS = '6,000,000';

export const DISPLAY_MINIMUM_FULL_DEPTH_RECLAMATION_MODULUS = '250,000';
export const DISPLAY_MAXIMUM_FULL_DEPTH_RECLAMATION_MODULUS = '2,000,000';

export const DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS = '1,000,000';
export const DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS = '2,000,000';

export const DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = '350,000';
export const DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = '1,000,000';

export const DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = '40,000';
export const DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = '300,000';

export const DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = '40,000';
export const DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = '200,000';

export const DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = '20,000';
export const DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = '100,000';

export const DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS = '15,000';
export const DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS = '45,000';

export const DISPLAY_MINIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO = '0.10';
export const DISPLAY_MAXIMUM_ALL_STRUCTURE_LAYERS_POISSON_RATIO = '0.50';

export const MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 25;
export const MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 1000;

export const MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 400;
export const MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 1000;

export const DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '25';
export const DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '1,000';

export const DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '400';
export const DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '1,000';

//WARNINGS

export const HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO = 0.25;
export const LOW_WARNING_CEMENT_TREATED_POISSON_RATIO  = 0.15;

export const HIGH_WARNING_RCC_POISSON_RATIO = 0.25;
export const LOW_WARNING_RCC_POISSON_RATIO  = 0.10;

export const HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO = 0.25;
export const LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO  = 0.15;

export const HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO = 0.40;
export const LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO  = 0.25;

export const HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO = 0.40;
export const LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO  = 0.25;

export const HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO = 0.30;
export const LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO  = 0.20;

export const HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO = 0.30;
export const LOW_WARNING_LIME_MODIFIED_POISSON_RATIO  = 0.20;

export const HIGH_WARNING_GRANULAR_POISSON_RATIO = 0.40;
export const LOW_WARNING_GRANULAR_POISSON_RATIO  = 0.25;

export const LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 50;
export const HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 250;

export const LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 500;
export const HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 900;

export const LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 25;
export const HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 100;

export const DISPLAY_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = '50';
export const DISPLAY_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '250';

export const DISPLAY_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = '500';
export const DISPLAY_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '900';

export const DISPLAY_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = '25';
export const DISPLAY_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '100';


export const METRIC_MINIMUM_CEMENT_TREATED_BASE_MODULUS = 1724;
export const METRIC_MAXIMUM_CEMENT_TREATED_BASE_MODULUS = 13790;

export const METRIC_MINIMUM_RCC_BASE_MODULUS = 20684;
export const METRIC_MAXIMUM_RCC_BASE_MODULUS = 41368;

export const METRIC_MINIMUM_LEAN_CONCRETE_BASE_MODULUS = 6895;
export const METRIC_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS = 13790;

export const METRIC_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = 2413;
export const METRIC_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = 6895;

export const METRIC_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = 276;
export const METRIC_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = 2068;

export const METRIC_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = 276;
export const METRIC_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = 1379;

export const METRIC_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = 138;
export const METRIC_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = 690;

export const METRIC_MINIMUM_GRANULAR_BASE_MODULUS = 103;
export const METRIC_MAXIMUM_GRANULAR_BASE_MODULUS = 310;

export const METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_BASE_MODULUS = '1,724';
export const METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_BASE_MODULUS = '13,790';

export const METRIC_DISPLAY_MINIMUM_RCC_BASE_MODULUS = '20,684';
export const METRIC_DISPLAY_MAXIMUM_RCC_BASE_MODULUS = '41,368';

export const METRIC_DISPLAY_MINIMUM_LEAN_CONCRETE_BASE_MODULUS = '6,895';
export const METRIC_DISPLAY_MAXIMUM_LEAN_CONCRETE_BASE_MODULUS = '13,790';

export const METRIC_DISPLAY_MINIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = '2,413';
export const METRIC_DISPLAY_MAXIMUM_HOTMIX_WARMMIX_ASPHALT_BASE_MODULUS = '6,895';

export const METRIC_DISPLAY_MINIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = '276';
export const METRIC_DISPLAY_MAXIMUM_BITUMINOUS_STABILIZED_BASE_MODULUS = '2,068';

export const METRIC_DISPLAY_MINIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = '276';
export const METRIC_DISPLAY_MAXIMUM_CEMENT_MODIFIED_SUBGRADE_MODULUS = '1,379';

export const METRIC_DISPLAY_MINIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = '138';
export const METRIC_DISPLAY_MAXIMUM_LIME_MODIFIED_SUBGRADE_MODULUS = '690';

export const METRIC_DISPLAY_MINIMUM_GRANULAR_BASE_MODULUS = '103';
export const METRIC_DISPLAY_MAXIMUM_GRANULAR_BASE_MODULUS = '310';

export const METRIC_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 0.17;
export const METRIC_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 6.9;

export const METRIC_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 2.76;
export const METRIC_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 6.9;

export const METRIC_DISPLAY_MINIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '0.17';
export const METRIC_DISPLAY_MAXIMUM_CEMENT_TREATED_AND_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '6.9';

export const METRIC_DISPLAY_MINIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '2.76';
export const METRIC_DISPLAY_MAXIMUM_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = '6.9';

//WARNINGS
export const METRIC_HIGH_WARNING_CEMENT_TREATED_POISSON_RATIO = 0.25;
export const METRIC_LOW_WARNING_CEMENT_TREATED_POISSON_RATIO  = 0.15;

export const METRIC_HIGH_WARNING_RCC_POISSON_RATIO = 0.25;
export const METRIC_LOW_WARNING_RCC_POISSON_RATIO  = 0.10;

export const METRIC_HIGH_WARNING_LEAN_CONCRETE_POISSON_RATIO = 0.25;
export const METRIC_LOW_WARNING_LEAN_CONCRETE_POISSON_RATIO  = 0.15;

export const METRIC_HIGH_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO = 0.40;
export const METRIC_LOW_WARNING_HOTMIX_WARMMIX_ASPHALT_POISSON_RATIO  = 0.25;

export const METRIC_HIGH_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO = 0.40;
export const METRIC_LOW_WARNING_BITUMINOUS_STABILIZED_POISSON_RATIO  = 0.25;

export const METRIC_HIGH_WARNING_CEMENT_MODIFIED_POISSON_RATIO = 0.30;
export const METRIC_LOW_WARNING_CEMENT_MODIFIED_POISSON_RATIO  = 0.20;

export const METRIC_HIGH_WARNING_LIME_MODIFIED_POISSON_RATIO = 0.30;
export const METRIC_LOW_WARNING_LIME_MODIFIED_POISSON_RATIO  = 0.20;

export const METRIC_HIGH_WARNING_GRANULAR_POISSON_RATIO = 0.40;
export const METRIC_LOW_WARNING_GRANULAR_POISSON_RATIO  = 0.25;

export const METRIC_LOW_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 0.34;
export const METRIC_HIGH_WARNING_CEMENT_TREATED_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 1.72;

export const METRIC_LOW_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 3.45;
export const METRIC_HIGH_WARNING_RCC_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 6.2;

export const METRIC_LOW_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE  = 0.17;
export const METRIC_HIGH_WARNING_LEAN_CONCRETE_STRUCTURE_LAYERS_MODULUS_OF_RUPUTRE = 0.69;

