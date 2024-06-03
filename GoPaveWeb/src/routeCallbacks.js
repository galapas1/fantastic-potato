
import { getSummaryFormValues,
         setCurrentProjectFormType,
         getIntermodalVehicles } from 'Actions';
import React from 'react';
import { pick, extend, map, each , filter} from 'underscore';
import {initialize, change} from 'redux-form';
import { 
  CONCRETE_CONCRETE_FORM,
  CONCRETE_STRUCTURE_FORM,
  CONCRETE_GLOBAL_FORM,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  CALCULATED_FLEXURAL_STRENGTH,
  TOTAL_TRUCKS_PER_DAY,
  INIITAL_SERVICABILITY,
  TERMINAL_SERVICABILITY,
  COMPOSITE_K_VALUE_SUBSTRUCTURE,
  LOAD_TRANSFER_COEFFICIENT,
  CONCRETE_MODULUS_OF_ELASTICITY,
  DRAINAGE_COEFFICIENT,
  RELIABILITY,
  CONCRETE_DROPDOWN,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  TRUCKS_PER_DAY,
  CONCRETE_TRAFFIC_FORM,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
  PERCENTAGE_OF_CRACKED_SLABS,
  OVERLAY_TRAFFIC_FORM,
  OVERLAY_GLOBAL_FORM,
  OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
  EFFECTIVE_THICKNESS,
  VALUES,
  NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
  NEW_COMPOSITE_TRAFFIC_FORM,
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  CONCRETE_SUBGRADE_FORM,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  USER_DEFINED_COMPOSITE_K_VALUE,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED,
  PARKING_TRAFFIC_FORM,
  PARKING_SUBBASE_FORM,
  PARKING_CONCRETE_FORM,
  SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON,
  DESIGN_LIFE,
  NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  PAVEMENT_STRUCTURE_FORM,
  STREET,
  CONCRETE,
  NEW_COMPOSITE,
  OVERLAY,
  PARKING,
  JPCP,
  RCC,
  CRCP,
  UNBONDED_ASPHALT,
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
  INPUT_MRSG_VALUE,
  SUBGRADE_DROPDOWN,
  DROPDOWN_KNOWN_MSRG_VALUE,
  RESIDUAL_STRENGTH,
  EDGE_SUPPORT,
  MACROFIBRES_IN_CONCRETE,
  SINGLE_AXLE_WEIGHT,
  SINGLE_AXLE_PER_1000,
  TANDEM_AXLE_WEIGHT,
  TANDEM_AXLE_PER_1000,
  TRIDEM_AXLE_WEIGHT,
  TRIDEM_AXLE_PER_1000,
  DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH,
  PROJECT_LEVEL_FORM,
  SUMMARY_FORM,
  HDG, 
  BST,
  NEW_COMPOSITE_OTHER,
  NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_HMA_SUBGRADE_FORM, 
  NEW_COMPOSITE_HMA_STRUCTURE_FORM,
  NEW_COMPOSITE_BST_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_BST_SUBGRADE_FORM, 
  NEW_COMPOSITE_BST_STRUCTURE_FORM,
  NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM, 
  NEW_COMPOSITE_OTHER_SUBGRADE_FORM, 
  NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
  THICKNESS_TO_RIGID_FOUNDATION,
  SUBGRADE_POISSONS_RATIO,
  SUBGRADE_MODULUS_OF_ELASTICITY,
  SURFACE_POISSONS_RATIO,
  SURFACE_LAYER_MODULUS_ELASTICITY,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
  STRUCTURE_LAYER_MEMBERS,
  AVG_TRUCKS_PER_DAY,
  INTERMODAL,
  INTERMODAL_STRUCTURE_FORM,
  INTERMODAL_CONCRETE_FORM,
  METRIC
} from  'Constants';

export function formSetup(store, locationObject, nextState, callback) {
  const state = store.getState();

  const { constructionType, projectType, formType, type  } = locationObject.params;
  const unitType = state.currentProject.projectDetails.unitType;

  if(unitType === undefined) {
      console.log("[WARN]: formSetup - unitType missing");
  }

   if (formType === PROJECT_LEVEL_FORM) {
     store.dispatch(setCurrentProjectFormType(formType));

     if (projectType === INTERMODAL) {
       // grab intermodal vehicles
       store.dispatch(getIntermodalVehicles(unitType)).then(() => {
        callback();
      })
     } else {
       callback();   
     }
   } else if (formType === SUMMARY_FORM ) {
    // if forms were loaded from dashboard, then don't run summary page calculations
    if (state.currentProject.projectDetails.projectFormType === SUMMARY_FORM) {
      callback();
      return;
    }

    let globalForm;
    let trafficForm;
    let flexuralOutputForm;
    let compositeKValueForm; // only used to grab the values of Radio button k value
    let trafficSummaryFormValues;
    let popupForm;
    let isOverlayBonded;
    let showCompositeKValueRadioButton;
    let mrsgForm; // only used in New Composite because this form contains the inputs Reliability + Percent Slabs Cracked

    let newCompositeOtherSurfaceLayerForm;
    let newCompositeOtherSubgradeForm;
    let newCompositeOtherStructureForm;
    // Form Type is the form that is loaded when user loads project from My Projects page
    store.dispatch(setCurrentProjectFormType(formType))

    if (projectType === PARKING) {
      globalForm = PARKING_TRAFFIC_FORM;
      trafficForm = PARKING_TRAFFIC_FORM;
      flexuralOutputForm = PARKING_CONCRETE_FORM;
      compositeKValueForm = PARKING_SUBBASE_FORM;
      trafficSummaryFormValues = state.currentProject.parkingFormValues.trafficSummaryFormValues;
      showCompositeKValueRadioButton = state.currentProject.parkingFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];
    } else if (projectType === INTERMODAL) {
      flexuralOutputForm = INTERMODAL_CONCRETE_FORM;
      compositeKValueForm = INTERMODAL_STRUCTURE_FORM;
      showCompositeKValueRadioButton = state.currentProject.intermodalFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];
    } else if (projectType === STREET) {
      if (constructionType  === CONCRETE) {
        globalForm = CONCRETE_GLOBAL_FORM;
        trafficForm = CONCRETE_TRAFFIC_FORM;
        flexuralOutputForm = CONCRETE_CONCRETE_FORM;
        compositeKValueForm = CONCRETE_STRUCTURE_FORM;
        trafficSummaryFormValues = state.currentProject.concreteFormValues.trafficSummaryFormValues;
        showCompositeKValueRadioButton = state.currentProject.concreteFormValues[SHOW_COMPOSITE_K_VALUE_RADIO_BUTTON];
       
      } else if (constructionType === OVERLAY) {
        globalForm = OVERLAY_GLOBAL_FORM;
        trafficForm = OVERLAY_TRAFFIC_FORM;
        if (type === UNBONDED_ASPHALT) {
          flexuralOutputForm = OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM;
          compositeKValueForm = OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM; 
          isOverlayBonded = false;
          showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedAsphaltShowCompositeKValueRadioButton;
        } else if (type === BONDED_CONCRETE) {
          flexuralOutputForm = OVERLAY_BONDED_CONCRETE_CONCRETE_FORM;
          compositeKValueForm = OVERLAY_BONDED_CONCRETE_SUBBASE_FORM;
          isOverlayBonded = true;
          showCompositeKValueRadioButton = state.currentProject.overlayFormValues.bondedConcreteShowCompositeKValueRadioButton;
        } else if (type === UNBONDED_CONCRETE) {
          flexuralOutputForm = OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM;
          compositeKValueForm = OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM;
          isOverlayBonded = false;
          showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedConcreteShowCompositeKValueRadioButton;
        }
        trafficSummaryFormValues = state.currentProject.overlayFormValues.trafficSummaryFormValues;

        //popupForm = true;
      } else if (constructionType === NEW_COMPOSITE) {
        globalForm = NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM;
        trafficForm = NEW_COMPOSITE_TRAFFIC_FORM;
        if (type === JPCP) {
          flexuralOutputForm = NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM;
          compositeKValueForm = NEW_COMPOSITE_JPCP_STRUCTURE_FORM; 
          showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.jpcpShowCompositeKValueRadioButton;
          mrsgForm = NEW_COMPOSITE_JPCP_SUBGRADE_FORM;
        } else if (type === RCC) {
          flexuralOutputForm = NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM;
          compositeKValueForm = NEW_COMPOSITE_RCC_STRUCTURE_FORM; 
          showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.rccShowCompositeKValueRadioButton;
          mrsgForm = NEW_COMPOSITE_RCC_SUBGRADE_FORM;
        } else if (type === HDG) {
          newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM
          newCompositeOtherSubgradeForm = NEW_COMPOSITE_HMA_SUBGRADE_FORM
          newCompositeOtherStructureForm = NEW_COMPOSITE_HMA_STRUCTURE_FORM
      } else if (type === BST) {
          newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_BST_SURFACE_LAYER_FORM
          newCompositeOtherSubgradeForm = NEW_COMPOSITE_BST_SUBGRADE_FORM
          newCompositeOtherStructureForm = NEW_COMPOSITE_BST_STRUCTURE_FORM
      } else if (type === NEW_COMPOSITE_OTHER) {
          newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM
          newCompositeOtherSubgradeForm = NEW_COMPOSITE_OTHER_SUBGRADE_FORM
          newCompositeOtherStructureForm = NEW_COMPOSITE_OTHER_STRUCTURE_FORM
      }
        trafficSummaryFormValues = state.currentProject.newCompositeFormValues.trafficSummaryFormValues;
      }  
    }

    let calculatorParams = {};
    let trafficParams = {};
    let isAsphaltAnalysisDesign;
    if (state.form) {
      // Traffic Form
      if (state.form[trafficForm] && state.form[trafficForm][VALUES]) {
         extend(trafficParams, pick(state.form[trafficForm][VALUES], TRUCKS_PER_DAY, TRAFFIC_GROWTH_RATE, DIRECTIONAL_DISTRIBUTION, DESIGN_LANE_DISTRIBUTION));
         if (state.form[trafficForm][VALUES][TRAFFIC_FORM_INPUTS_DROPDOWN] === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
            isAsphaltAnalysisDesign = true;
         }
         
         // New Composite Asphalt needs design life
         if (projectType === STREET && constructionType === NEW_COMPOSITE) {
           extend(calculatorParams,  pick(state.form[trafficForm][VALUES], DESIGN_LIFE));
         }
      }

      // Global Form
      if (state.form[globalForm] && state.form[globalForm][VALUES]) {
         extend(calculatorParams,  pick(state.form[globalForm][VALUES], TOTAL_TRUCKS_PER_DAY, RELIABILITY));

         if (((constructionType === CONCRETE || constructionType === NEW_COMPOSITE) && (type === JPCP || type === RCC)) || (constructionType === OVERLAY) || projectType === PARKING) {
            extend(calculatorParams, pick(state.form[globalForm][VALUES], PERCENTAGE_OF_CRACKED_SLABS));
         }

         if (projectType === PARKING) {
           extend(calculatorParams,  pick(state.form[globalForm][VALUES], TRUCKS_PER_DAY, DESIGN_LIFE));
         }

         if (constructionType === NEW_COMPOSITE && (type === HDG || type === BST || type === NEW_COMPOSITE_OTHER))  {
            extend(calculatorParams, pick(state.form[globalForm][VALUES], AVG_TRUCKS_PER_DAY));
         }
      }

      // Flexural Output Form
      if (state.form[flexuralOutputForm] && state.form[flexuralOutputForm][VALUES]) {
         const concreteDropdown = state.form[flexuralOutputForm][VALUES][CONCRETE_DROPDOWN];
         let flexStrength;
         if (concreteDropdown === DROPDOWN_TWENTY_EIGHT_FLEX_STRENGTH) {
           flexStrength = state.form[flexuralOutputForm][VALUES][TWENTYEIGHTDAY_FLEX_STRENGTH];
         } else {
           flexStrength =  state.form[flexuralOutputForm][VALUES][CALCULATED_FLEXURAL_STRENGTH];
         }

         extend(calculatorParams, {flexuralStrength: flexStrength});
         extend(calculatorParams, pick(state.form[flexuralOutputForm][VALUES],  CONCRETE_MODULUS_OF_ELASTICITY));
         if (constructionType === CONCRETE && type === CRCP) {
           extend(calculatorParams, pick(state.form[flexuralOutputForm][VALUES], INIITAL_SERVICABILITY,TERMINAL_SERVICABILITY, LOAD_TRANSFER_COEFFICIENT, CONCRETE_MODULUS_OF_ELASTICITY, DRAINAGE_COEFFICIENT));
         }

         if ((constructionType === CONCRETE && type === JPCP) || constructionType === OVERLAY || (constructionType === NEW_COMPOSITE && (type === JPCP || type === RCC))) {
            extend(calculatorParams, {isMacrofibers: state.form[flexuralOutputForm][VALUES][MACROFIBRES_IN_CONCRETE] === 'Yes' ? true : false });
            if (state.form[flexuralOutputForm][VALUES][MACROFIBRES_IN_CONCRETE] === 'Yes') {
              extend(calculatorParams, pick(state.form[flexuralOutputForm][VALUES], RESIDUAL_STRENGTH));  
            }
         }

          if ((constructionType === CONCRETE && (type === RCC || type === JPCP)) || constructionType === OVERLAY || (constructionType === NEW_COMPOSITE && (type === JPCP || type === RCC))) {
            extend(calculatorParams, {[EDGE_SUPPORT]: state.form[flexuralOutputForm][VALUES][EDGE_SUPPORT] === 'Yes' ? true : false });
         }
      }

      // Composite K Value Form
      let compositeKValue;
      if (state.form[compositeKValueForm] && state.form[compositeKValueForm][VALUES]) {
        if (showCompositeKValueRadioButton) {
          if (state.form[compositeKValueForm][VALUES][COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE] === COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE_USER_DEFINED) {
            compositeKValue = state.form[compositeKValueForm][VALUES][USER_DEFINED_COMPOSITE_K_VALUE]; 
          } else {
            compositeKValue =  state.form[compositeKValueForm][VALUES][COMPOSITE_K_VALUE_SUBSTRUCTURE];
          }
        } else {
          compositeKValue =  state.form[compositeKValueForm][VALUES][COMPOSITE_K_VALUE_SUBSTRUCTURE];
        }
        extend(calculatorParams, {[COMPOSITE_K_VALUE_SUBSTRUCTURE]: compositeKValue});
      }

       // Mrsg form - Specific to New Cpmposite JPCP and RCC - Reliability and Percent slabs cracked inputs are present in the Stucture Layers Form
      if (constructionType === NEW_COMPOSITE && (type === JPCP || type === RCC)){
        extend(calculatorParams,  pick(state.form[mrsgForm][VALUES], RELIABILITY, PERCENTAGE_OF_CRACKED_SLABS));
      }

      // Specific to overlay
      if (constructionType === OVERLAY && (type === UNBONDED_ASPHALT || type == BONDED_CONCRETE || type == UNBONDED_CONCRETE)) {
        extend(calculatorParams, {isBonded: isOverlayBonded});

        if (type === UNBONDED_CONCRETE) {
          extend(calculatorParams, pick(state.form[OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM][VALUES], EFFECTIVE_THICKNESS));
        } 

        if (type === BONDED_CONCRETE) {
          extend(calculatorParams, pick(state.form[OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM][VALUES], EFFECTIVE_THICKNESS));
        }    
      }

      // Specific to New Composite Asphalt options
      if (projectType === STREET && constructionType === NEW_COMPOSITE) {
        let surfaceLayerTypeName;
        if (type === HDG) {
           surfaceLayerTypeName = 'HMA/WMA Dense Graded';
        } else if (type === BST) {
           surfaceLayerTypeName = 'BST Chip Seal';
        } else if (type === NEW_COMPOSITE_OTHER) {
            surfaceLayerTypeName = 'Other'
        }
        extend(calculatorParams, {surfaceLayerTypeName: surfaceLayerTypeName});
      }

      if (state.form[newCompositeOtherSurfaceLayerForm] && state.form[newCompositeOtherSurfaceLayerForm][VALUES] ) {
        extend(calculatorParams,  pick(state.form[newCompositeOtherSurfaceLayerForm][VALUES], SURFACE_POISSONS_RATIO, SURFACE_LAYER_MODULUS_ELASTICITY, SURFACE_LAYER_THICKNESS, ALLOWABLE_DAMAGE_PER_LAYER));
      }

      if (state.form[newCompositeOtherSubgradeForm] && state.form[newCompositeOtherSubgradeForm][VALUES] ) {
        extend(calculatorParams,  pick(state.form[newCompositeOtherSubgradeForm][VALUES], SUBGRADE_POISSONS_RATIO, SUBGRADE_MODULUS_OF_ELASTICITY , THICKNESS_TO_RIGID_FOUNDATION));
      }
      
      if (state.form[newCompositeOtherStructureForm] && state.form[newCompositeOtherStructureForm][VALUES] ) {
         extend(calculatorParams, {subbaseLayerDetails:  state.form[newCompositeOtherStructureForm][VALUES][STRUCTURE_LAYER_MEMBERS]});
      }
      
      //if (state.form[popupForm]) {
         //const trafficSummaryFormValues = state.flexuralOutputFormValues.trafficSummaryFormValues;
      let vehicleInfo;

      if (projectType === INTERMODAL) {
        // Specific to Intermodal - Grab all vehicle info for the vehicles selected by the user
        const userVehicles = state.currentProject.intermodalFormValues.vehicles;
        const userSelectedVehicleIds = state.currentProject.intermodalFormValues.selectedVehicles;

        let vehicleIds = {};
        each(userSelectedVehicleIds, function (id) {
          vehicleIds[id] = true; 
        });

        vehicleInfo = filter(userVehicles, function (vehicle) {
          return vehicleIds[vehicle.id];
        });

        extend(calculatorParams, {vehicles: vehicleInfo})     
      }

      // Intermodal does not have traffic Summary form values
      if (projectType !== INTERMODAL) {
        const singleItems = trafficSummaryFormValues['singleItems'];
        const tandemItems = trafficSummaryFormValues['tandemItems'];
        const tridemItems = trafficSummaryFormValues['tridemItems'];

        const singleAxleWeight = map(singleItems, function(item) {
            return item.axleLoad;
        })

        const singleAxlesPer1000 = map(singleItems, function(item) {
            return item.axlesPer1000;
        })
        const tandemAxleWeight = map(tandemItems, function(item) {
            return item.axleLoad;
        })
        const tandemAxlesPer1000 = map(tandemItems, function(item) {
            return item.axlesPer1000;
        })
        const tridemAxleWeight = map(tridemItems, function(item) {
            return item.axleLoad;
        })
        const tridemAxlesPer1000 = map(tridemItems, function(item) {
           return item.axlesPer1000;
        })

        if (projectType === STREET && constructionType === NEW_COMPOSITE && (type === HDG || type === BST || type === NEW_COMPOSITE_OTHER)) {
           extend(calculatorParams, {trafficSummaryDetails: {singleAxleItems:singleItems, tandemAxleItems:tandemItems, tridemAxleItems:tridemItems}});
        } else {
           extend(calculatorParams, {[SINGLE_AXLE_WEIGHT]:singleAxleWeight}, {[SINGLE_AXLE_PER_1000]:singleAxlesPer1000}, {[TRIDEM_AXLE_WEIGHT]:tridemAxleWeight}, {[TRIDEM_AXLE_PER_1000]:tridemAxlesPer1000}, {[TANDEM_AXLE_WEIGHT]:tandemAxleWeight}, {[TANDEM_AXLE_PER_1000]:tandemAxlesPer1000})
        }
      }

      // Unit type
      if (unitType === METRIC) {
        extend(calculatorParams, {convertToMetric: true});
      }
    }

    store.dispatch(getSummaryFormValues(projectType, constructionType, type, calculatorParams, trafficParams, isAsphaltAnalysisDesign)).then(() => {
      callback();
    })
  } else if (formType === PAVEMENT_STRUCTURE_FORM) {
    let mrsgForm;
    let subgradeFormInitialValues = {};
    let trafficForm;
    let trafficFormDropdown;

    store.dispatch(setCurrentProjectFormType(formType));

    if (constructionType  === CONCRETE) {
      mrsgForm = CONCRETE_SUBGRADE_FORM;
      trafficForm = CONCRETE_TRAFFIC_FORM;
    
      if (state.form) {
        if (state.form[trafficForm]) {
          trafficFormDropdown = state.form[trafficForm][VALUES][TRAFFIC_FORM_INPUTS_DROPDOWN];   
        }
        if (!state.form[mrsgForm]) {
          extend(subgradeFormInitialValues, {[SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE})
          if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
            extend(subgradeFormInitialValues, {[INPUT_MRSG_VALUE]: state.currentProject.concreteFormValues.mrsgInputValue});
          } 
          store.dispatch(initialize(mrsgForm, subgradeFormInitialValues));
        } else {
           if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
             store.dispatch(change(mrsgForm, SUBGRADE_DROPDOWN, DROPDOWN_KNOWN_MSRG_VALUE));
             store.dispatch(change(mrsgForm, INPUT_MRSG_VALUE, state.currentProject.concreteFormValues.mrsgInputValue));
          }
        }
        
      }
  
    } else if (constructionType === OVERLAY) {
      trafficForm = OVERLAY_TRAFFIC_FORM;
      let unbondedAsphaltMrsgForm = OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM;
      let unbondedConcreteMrsgForm = OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM;
      let bondedConcreteMrsgForm = OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM;
      trafficForm = OVERLAY_TRAFFIC_FORM;
      if (state.form) {
        if (state.form[trafficForm]) {
          trafficFormDropdown = state.form[trafficForm][VALUES][TRAFFIC_FORM_INPUTS_DROPDOWN];   
        }
        if (state.form[unbondedAsphaltMrsgForm]) {
          if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
              store.dispatch(change(unbondedAsphaltMrsgForm, SUBGRADE_DROPDOWN, DROPDOWN_KNOWN_MSRG_VALUE));
              store.dispatch(change(unbondedAsphaltMrsgForm, INPUT_MRSG_VALUE , state.currentProject.overlayFormValues.mrsgInputValue));
           }
        } else {
           extend(subgradeFormInitialValues, {[SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE})
           if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
            extend(subgradeFormInitialValues, {[INPUT_MRSG_VALUE]: state.currentProject.overlayFormValues.mrsgInputValue});
           } 
           store.dispatch(initialize(unbondedAsphaltMrsgForm, subgradeFormInitialValues));
        }

        if (state.form[unbondedConcreteMrsgForm]) {
            if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
              store.dispatch(change(unbondedConcreteMrsgForm, SUBGRADE_DROPDOWN, DROPDOWN_KNOWN_MSRG_VALUE));
              store.dispatch(change(unbondedConcreteMrsgForm, INPUT_MRSG_VALUE , state.currentProject.overlayFormValues.mrsgInputValue));
             }
          } else {
             extend(subgradeFormInitialValues, {[SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE})
             if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
              extend(subgradeFormInitialValues, {[INPUT_MRSG_VALUE]: state.currentProject.overlayFormValues.mrsgInputValue});
             } 
             store.dispatch(initialize(unbondedConcreteMrsgForm, subgradeFormInitialValues));
        }

        if (state.form[bondedConcreteMrsgForm]) {
          if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
            store.dispatch(change(bondedConcreteMrsgForm, SUBGRADE_DROPDOWN, DROPDOWN_KNOWN_MSRG_VALUE));
            store.dispatch(change(bondedConcreteMrsgForm, INPUT_MRSG_VALUE , state.currentProject.overlayFormValues.mrsgInputValue));
           }
        } else {
           extend(subgradeFormInitialValues, {[SUBGRADE_DROPDOWN]: DROPDOWN_KNOWN_MSRG_VALUE})
           if (trafficFormDropdown === TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN ){
            extend(subgradeFormInitialValues, {[INPUT_MRSG_VALUE]: state.currentProject.overlayFormValues.mrsgInputValue});
           } 
           store.dispatch(initialize(bondedConcreteMrsgForm, subgradeFormInitialValues));
        }
    
      }   
    } 

    callback()
  } 
}
