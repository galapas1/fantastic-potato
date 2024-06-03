import React, { Component } from 'react';
import './Forms.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { each } from 'underscore';
import { addNotification } from 'Actions';
import { touch, formValueSelector, isPristine, getFormSyncErrors, getFormValues } from 'redux-form';
import { parkingProjectLevelRouterLeaveValidation, parkingPavementStructureFormRouterLeaveValidation } from 'Forms/Parking/components/ParkingRouterLeaveValidation';
import { newCompositeProjectLevelRouterLeaveValidation, newCompositePavementStructureFormRouterLeaveValidation} from 'Forms/NewComposite/components/NewCompositeRouterLeaveValidation';
import { concreteProjectLevelRouterLeaveValidation,concretePavementStructureFormRouterLeaveValidation  } from 'Forms/Concrete/components/ConcreteRouterLeaveValidation';
import { overlayProjectLevelRouterLeaveValidation, overlayPavementStructureFormRouterLeaveValidation } from 'Forms/Overlay/components/OverlayRouterLeaveValidation';
import { intermodalPavementStructureFormRouterLeaveValidation } from 'Forms/Intermodal/components/IntermodalRouterLeaveValidation';
import {
  CONCRETE_GLOBAL_FORM,
  CONCRETE_TRAFFIC_FORM,
  OVERLAY_TRAFFIC_FORM,
  TRUCKS_PER_DAY,
  TRAFFIC_GROWTH_RATE,
  DIRECTIONAL_DISTRIBUTION, 
  DESIGN_LANE_DISTRIBUTION, 
  DESIGN_LIFE,  
  RELIABILITY,
  PERCENTAGE_OF_CRACKED_SLABS,
  TRAFFIC_SPECTRUM_DROPDOWN,
  TRAFFIC_FORM_INPUTS_DROPDOWN,
  NEW_COMPOSITE_TRAFFIC_FORM,
  OVERLAY_GLOBAL_FORM,
  CONCRETE_CONCRETE_FORM,
  CONCRETE_STRUCTURE_FORM,
  CONCRETE_SUBGRADE_FORM,
  PARKING_TRAFFIC_FORM,
  PARKING_SUBGRADE_FORM,
  PARKING_CONCRETE_FORM,
  PARKING_SUBBASE_FORM,
  CALIFORNIA_BEARING_RATIO,
  TWENTYEIGHTDAY_FLEX_STRENGTH,
  COMPRESSIVE_STREGTH,
  CONCRETE_MODULUS_OF_ELASTICITY,
  SPLIT_TESILE_STRENGTH,
  COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  USER_DEFINED_COMPOSITE_K_VALUE,
  CONCRETE_DROPDOWN,
  SUBGRADE_DROPDOWN,
  NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
  NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  INPUT_MRSG_VALUE,
  RESISTANCE_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
  OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  EXISTING_THICKNESS,
  JOINT_CRACKING_TIME_TO_LIVE,
  FATIGUE_ADJUSTMENT_FACTOR,
  DURABILITY_ADJUSTMENT_FACTOR,
  OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  PROJECT_LEVEL_FORM,
  PAVEMENT_STRUCTURE_FORM,
  SUMMARY_FORM,
  STREET,
  CONCRETE,
  NEW_COMPOSITE,
  OVERLAY,
  PARKING,
  JPCP,
  RCC,
  UNBONDED_ASPHALT,
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
  STRUCTURE_LAYER_MEMBERS,
  PROJECT_TYPES,
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
  INTERMODAL_STRUCTURE_FORM,
  INTERMODAL_SUBGRADE_FORM,
  INTERMODAL_CONCRETE_FORM,
  INTERMODAL
} from  'Constants';

const INPUTS_TO_BE_FOCUSSED = 'inputsToBeFocussed';
const IS_PAVEMENT_FORM_FILLED = 'isPavementFormFilled';
const IS_FORM_INVALID = 'isFormInvalid';
const ARE_ERRORS_PRESENT = 'areErrorsPresent';

class ParentFormHeader extends Component {
  constructor(props) {
    super(props);
    let option = PROJECT_LEVEL_FORM;
    if (props.routingParams && props.routingParams.formType) {
      option = props.routingParams.formType
    }
    this.state = { optionSelected : option};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routingParams.formType !== nextProps.routingParams.formType) {
      this.setState({optionSelected: nextProps.routingParams.formType});
    }
  }

  showErrors(routerLeaveValidationObj) {
    let messageShownToUser;
    if (routerLeaveValidationObj[IS_FORM_INVALID]) {
       messageShownToUser = 'You cannot move onto the next step without filling out all the inputs';
       this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
    } else if (routerLeaveValidationObj[ARE_ERRORS_PRESENT]) {
       messageShownToUser = 'You have errors in the forms. You cannot move on without correcting these errors';
       this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
    }
  }

  focusInputs(inputsToBeFocussed) {
    const self= this;
    if (inputsToBeFocussed && inputsToBeFocussed.length > 0) {
      each(inputsToBeFocussed, function(inputArray) {
        const form = inputArray[0];
        const input = inputArray[1]
        self.props.focus(form, input);
      })
    }
  }

  navigatePage(clickedOnNavOption) {
    let projectLevelRouterLeaveValdiationObject;
    let pavementStructureRouterLeaveValdiationObject;
    let isPavementFormFilled;
    let link;
    const { projectType, constructionType, formType } = this.props.routingParams;
    const { pavementStructureType, intermodalSelectedVehicles, router } = this.props;

    // This code runs when user tries to go to Summary Form but has not chosen a pavement Structure Type yet - When user is on Pavement Type form
    if (clickedOnNavOption === SUMMARY_FORM && projectType === STREET && (constructionType === OVERLAY || constructionType === CONCRETE)) {
      if (formType === PAVEMENT_STRUCTURE_FORM && !pavementStructureType) {
         let messageShownToUser = 'You cannot go to Summary Page without choosing a Pavement Structure type and filling out the form';
         this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
         return;
      }
    }

    const parkingOrIntemodalLink = `/${PROJECT_TYPES}/${projectType}/${clickedOnNavOption}`;
    const streetSummaryOrPavementStructureLink = `/${PROJECT_TYPES}/${projectType}/${constructionType}/${clickedOnNavOption}`;  
    const streetPavementStructureLink = `/${PROJECT_TYPES}/${projectType}/${constructionType}/${clickedOnNavOption}/${pavementStructureType}`;
    
    // For intermodal, as long as user has chosen one vehicle on Project Level page, he can continue to pavement structure form
    if (clickedOnNavOption === PAVEMENT_STRUCTURE_FORM && projectType === INTERMODAL) {
      if (intermodalSelectedVehicles.length > 0) {
        link = parkingOrIntemodalLink;
        router.push(link);
      } else {
        let message = 'Choose at least one vehicle to move onto the Pavement Structure Page'
        this.props.addNotification(message, 'error', 5, message);
        return;
      }
    }

    // For intermodal, no check needs to be done to go to Project Level Page
    if (clickedOnNavOption === PROJECT_LEVEL_FORM && projectType === INTERMODAL) {
       link = parkingOrIntemodalLink;
       router.push(link);
    }

    // Assigning the router Leave Validation objects
    if (projectType === STREET) {
      if (constructionType === NEW_COMPOSITE) {
         projectLevelRouterLeaveValdiationObject = newCompositeProjectLevelRouterLeaveValidation(this.props);
         pavementStructureRouterLeaveValdiationObject = newCompositePavementStructureFormRouterLeaveValidation(this.props);
      } else if  (constructionType === CONCRETE) {
         projectLevelRouterLeaveValdiationObject = concreteProjectLevelRouterLeaveValidation(this.props);
         pavementStructureRouterLeaveValdiationObject = concretePavementStructureFormRouterLeaveValidation(this.props);
      } else if  (constructionType === OVERLAY) {
         projectLevelRouterLeaveValdiationObject = overlayProjectLevelRouterLeaveValidation(this.props);
         pavementStructureRouterLeaveValdiationObject = overlayPavementStructureFormRouterLeaveValidation(this.props);
      } 
    } else if (projectType === PARKING) {
      projectLevelRouterLeaveValdiationObject = parkingProjectLevelRouterLeaveValidation(this.props);
      pavementStructureRouterLeaveValdiationObject = parkingPavementStructureFormRouterLeaveValidation(this.props);
    } else if (projectType === INTERMODAL) {
      pavementStructureRouterLeaveValdiationObject = intermodalPavementStructureFormRouterLeaveValidation(this.props);
    } 
    
    // if (!projectLevelRouterLeaveValdiationObject || !pavementStructureRouterLeaveValdiationObject) {
    //   return;
    // }

    if (clickedOnNavOption === PROJECT_LEVEL_FORM) {
      link = projectType === PARKING || projectType === INTERMODAL ? parkingOrIntemodalLink : streetSummaryOrPavementStructureLink;
    } else if (clickedOnNavOption === PAVEMENT_STRUCTURE_FORM) {
     if (formType === PROJECT_LEVEL_FORM) {
       let inputsToBeFocussed = projectLevelRouterLeaveValdiationObject[INPUTS_TO_BE_FOCUSSED];
       this.focusInputs(inputsToBeFocussed);
       if (projectLevelRouterLeaveValdiationObject[IS_FORM_INVALID] || projectLevelRouterLeaveValdiationObject[ARE_ERRORS_PRESENT]) {
         this.showErrors(projectLevelRouterLeaveValdiationObject);
         return;
       } else {
        // No errors when going from ProjectLevelForm to PavementStructureForm
        link = projectType === PARKING ? parkingOrIntemodalLink : streetSummaryOrPavementStructureLink;
       }
     } else {
      // If user is  going to Pavement Structure Form from Summary Form or user is on Pavement Structure Form and clicks on Pavement Structure Form 
       link = projectType === PARKING ? parkingOrIntemodalLink : streetSummaryOrPavementStructureLink;
     }
    } else if (clickedOnNavOption === SUMMARY_FORM) {
      if (formType === PROJECT_LEVEL_FORM) {
        isPavementFormFilled = pavementStructureRouterLeaveValdiationObject[IS_PAVEMENT_FORM_FILLED];
        let messageShownToUser;
        let inputsToBeFocussed = projectLevelRouterLeaveValdiationObject[INPUTS_TO_BE_FOCUSSED];
        this.focusInputs(inputsToBeFocussed);
        if (projectLevelRouterLeaveValdiationObject[IS_FORM_INVALID] || projectLevelRouterLeaveValdiationObject[ARE_ERRORS_PRESENT]) {
          this.showErrors(projectLevelRouterLeaveValdiationObject);
          return;
        } else if (!isPavementFormFilled) {
          messageShownToUser = 'You need to fill out Pavement Structure Form before moving onto Summary Form';
          this.props.addNotification(messageShownToUser, 'error', 5, messageShownToUser);
          return; 
        } else {
          // If I am going to Summary Form from Project Level Form
          if (projectType === PARKING || projectType === INTERMODAL) {
            link = parkingOrIntemodalLink; 

          } else {
           // For modules which are not parking or newComposite
            link = streetPavementStructureLink; 
          }
        }
      } else if (formType === PAVEMENT_STRUCTURE_FORM) { 
          let inputsToBeFocussed =  pavementStructureRouterLeaveValdiationObject[INPUTS_TO_BE_FOCUSSED];
          this.focusInputs(inputsToBeFocussed);

          if (pavementStructureRouterLeaveValdiationObject[IS_FORM_INVALID] || pavementStructureRouterLeaveValdiationObject[ARE_ERRORS_PRESENT]) {
            this.showErrors(pavementStructureRouterLeaveValdiationObject);
            return;
          } else {
            // If I am going to Summary Form from Pavement Structure Form
            if (projectType === PARKING) {
             link = parkingOrIntemodalLink;    
            } else {
              // For modules which are not parking or newComposite
              link = streetPavementStructureLink; 
            } 
          }
      }
    }
  
    router.push(link);
  }

  render() {
    const { optionSelected } =  this.state;
    const { isUserSignedIn } =  this.props;
    return (
      <div className='user-form-header' style={{paddingLeft: 40, paddingRight: 40, marginTop: isUserSignedIn ? '' : 20}}>
        <div className={((optionSelected === PROJECT_LEVEL_FORM) ?'active header-option': 'header-option')} onClick={this.navigatePage.bind(this, PROJECT_LEVEL_FORM)}>
          <div className='header-option-container'>
           <div className='header-option-value'><label className='value-label'>1</label></div>
            <div className='header-option-label'>Project Level</div>  
          </div>
        </div>
        <div className={((optionSelected === PAVEMENT_STRUCTURE_FORM) ?'active header-option': 'header-option')}  onClick={this.navigatePage.bind(this, PAVEMENT_STRUCTURE_FORM)}>
          <div className='header-option-container'>
            <div className='header-option-value'><label className='value-label'>2</label></div>
            <div className='header-option-label'>Pavement Structure</div>  
          </div>  
        </div>
        <div className={((optionSelected ===SUMMARY_FORM ) ?'active header-option': 'header-option')} onClick={this.navigatePage.bind(this, SUMMARY_FORM)}>
          <div className='header-option-container'>
            <div className='header-option-value'><label className='value-label'>3</label></div>
            <div className='header-option-label'>Summary</div>  
          </div>
        </div> 
      </div>
    )
  }
}

// For New Composite section, type needs to gathered from the redux store and appended to the url
function mapStateToProps(state, ownProps) {
  let pavementStructureType;
  let intermodalSelectedVehicles;

  const { projectType, constructionType } = ownProps.params;

  if(projectType === INTERMODAL) {
    intermodalSelectedVehicles =  state.currentProject.intermodalFormValues.selectedVehicles;
  }

  const isUserSignedIn =  state.auth.authenticated;
  //Traffic Form
  let trafficFormSelector;
  let trucksPerDay;
  let trafficGrowthRate;
  let directionalDistribution;
  let designLaneDistribution;
  let trafficSpectrumDropdown;
  let trafficFormInputsDropdown;
  let designLife;
  let isTrafficFormPristine;
  let trafficFormErrors;
  let trafficForm;
  let trafficFormInputDropdown;

  // Global Form
  let globalForm;
  let globalFormSelector;
  let percentageOfSlabs;
  let isGlobalFormPristine;
  let globalFormErrors;
  let reliability;

  // Mrsg form
  let mrsgForm;
  let structureLayerForm;
  let parkingPavementStructureTableRowChosen;
  let mrsgFormSelector;
  let structureFormSelector;
  let compositeKValueRadioButtonValue;
  let userDefinedCompositeKValue;
  let showCompositeKValueRadioButton;
  let californiaBearingRatio;
  let inputMrsgValue;
  let resistanceValue;
  let subgradeDropdown;
  let structureDropdown;
  let mrsgFormErrors;

  //Flexural Output Form 
  let flexuralOutputForm;
  let flexuralOutputFormSelector;
  let compressiveStrength;
  let splitTensileStrength;
  let twentyEightDayFlexStrength;
  let concreteModulusOfElasticity;
  let concreteDropdown;
  let structureFormValues;
  let structureLayerMembers;

  let flexOutputFormErrors;
  let structureLayerFormErrors;
  let isFlexOutputFormPristine;
  let isMrsgFormPristine;
  let isStructureLayersFormPristine;
  let isPavementFormPristine;

  //New Composite Pavement Structure Form - These need separate form names because they are different from every other part of the app
  let newCompositeOtherSurfaceLayerForm;
  let newCompositeOtherSubgradeForm;
  let newCompositeOtherStructureForm;

  let newCompositeOtherSurfaceLayerFormSelector;
  let newCompositeOtherSubgradeFormSelector;
  let newCompositeOtherStructureFormSelector;

  let newCompositeOtherStructureFormErrors;
  let newCompositeOtherSurfaceLayerFormErrors;
  let newCompositeOtherSubgradeFormErrors;

  let surfaceLayerPoissonsRatio;
  let otherSurfaceModulusOFElasticity;
  let surfaceLayerThickness;
  let allowableDamagePerLayer;

  let subgradePoissonsRatio;
  let otherSubgradeModulusOFElasticity;
  let thicknessToRigidFoundation;

  // only for Overlay Module
  let existingThickness;
  let timeToLive;
  let durabilityAdjustmentFactor;
  let fatigueAdjustmentFactor;

  if (projectType === STREET) {
    if (constructionType === NEW_COMPOSITE) {
      trafficForm = NEW_COMPOSITE_TRAFFIC_FORM;
    } else if (constructionType === CONCRETE) {
      trafficForm = CONCRETE_TRAFFIC_FORM;
      globalForm = CONCRETE_GLOBAL_FORM;
    }  else if (constructionType === OVERLAY) {
      trafficForm = OVERLAY_TRAFFIC_FORM;
      globalForm = OVERLAY_GLOBAL_FORM;
    } 
  } else if (projectType === PARKING) {
    trafficForm = PARKING_TRAFFIC_FORM;  
  }

  // If a module does not have a traffic form, then no need to grab any values from the redux store
  // if (!trafficForm) {
  //   return {};
  // }

  if (trafficForm) {
    trafficFormSelector = formValueSelector(trafficForm);
    trucksPerDay = trafficFormSelector(state, TRUCKS_PER_DAY);
    trafficGrowthRate = trafficFormSelector(state, TRAFFIC_GROWTH_RATE);
    directionalDistribution = trafficFormSelector(state, DIRECTIONAL_DISTRIBUTION);
    designLaneDistribution = trafficFormSelector(state, DESIGN_LANE_DISTRIBUTION);
    trafficSpectrumDropdown = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    trafficFormInputsDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
    designLife = trafficFormSelector(state, DESIGN_LIFE);
    isTrafficFormPristine = isPristine(trafficForm)(state);
    trafficFormErrors = getFormSyncErrors(trafficForm)(state);  
  }


  // Having a global form is not necessary for all modules
  if (globalForm) {
    globalFormSelector = formValueSelector(globalForm);
    reliability = globalFormSelector(state, RELIABILITY);
    percentageOfSlabs = globalFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);
    isGlobalFormPristine = isPristine(globalForm)(state);
    globalFormErrors = getFormSyncErrors(globalForm)(state);   
  }

  if (projectType === STREET && constructionType === CONCRETE) {
    trafficFormInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);
  }

  //only parking has global inputs
  if (projectType === PARKING) {
    reliability = trafficFormSelector(state, RELIABILITY);
    percentageOfSlabs = trafficFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);  
  }
 
  if (projectType === STREET) {
    if (constructionType === NEW_COMPOSITE) {
      pavementStructureType = state.currentProject.newCompositeFormValues.type
      if (pavementStructureType === JPCP) {
        mrsgForm = NEW_COMPOSITE_JPCP_SUBGRADE_FORM;
        structureLayerForm = NEW_COMPOSITE_JPCP_STRUCTURE_FORM;
        flexuralOutputForm = NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM;
        showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.jpcpShowCompositeKValueRadioButton;
      } else if (pavementStructureType ===  RCC) {
        mrsgForm = NEW_COMPOSITE_RCC_SUBGRADE_FORM;
        structureLayerForm = NEW_COMPOSITE_RCC_STRUCTURE_FORM;
        flexuralOutputForm = NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM;
        showCompositeKValueRadioButton = state.currentProject.newCompositeFormValues.rccShowCompositeKValueRadioButton;
      } else if (pavementStructureType === HDG) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_HMA_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_HMA_STRUCTURE_FORM
      } else if (pavementStructureType === BST) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_BST_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_BST_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_BST_STRUCTURE_FORM
      } else if (pavementStructureType === NEW_COMPOSITE_OTHER) {
        newCompositeOtherSurfaceLayerForm = NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM
        newCompositeOtherSubgradeForm = NEW_COMPOSITE_OTHER_SUBGRADE_FORM
        newCompositeOtherStructureForm = NEW_COMPOSITE_OTHER_STRUCTURE_FORM
      }
    } else if (constructionType === CONCRETE) {
      mrsgForm = CONCRETE_SUBGRADE_FORM;
      structureLayerForm = CONCRETE_STRUCTURE_FORM;
      flexuralOutputForm = CONCRETE_CONCRETE_FORM;
      pavementStructureType = state.currentProject.concreteFormValues.pavementStructureType;
      showCompositeKValueRadioButton = state.currentProject.concreteFormValues.showCompositeKValueRadioButton;
    } else if (constructionType === OVERLAY) {
      pavementStructureType = state.currentProject.overlayFormValues.pavementStructureType;
      if (pavementStructureType === UNBONDED_ASPHALT) {
        mrsgForm = OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM;
        structureLayerForm = OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedAsphaltShowCompositeKValueRadioButton;
      } else if (pavementStructureType === UNBONDED_CONCRETE) {
        mrsgForm = OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM;
        structureLayerForm = OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.unbondedConcreteShowCompositeKValueRadioButton;
      } else if (pavementStructureType === BONDED_CONCRETE) {
        mrsgForm = OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM;
        structureLayerForm = OVERLAY_BONDED_CONCRETE_SUBBASE_FORM;
        flexuralOutputForm = OVERLAY_BONDED_CONCRETE_CONCRETE_FORM;
        showCompositeKValueRadioButton = state.currentProject.overlayFormValues.bondedConcreteShowCompositeKValueRadioButton;
      } 
    } 
  } else if (projectType === PARKING) {
    mrsgForm = PARKING_SUBGRADE_FORM;
    structureLayerForm = PARKING_SUBBASE_FORM;
    flexuralOutputForm = PARKING_CONCRETE_FORM;
    showCompositeKValueRadioButton = state.currentProject.parkingFormValues.showCompositeKValueRadioButton;  
    parkingPavementStructureTableRowChosen =  state.currentProject.parkingFormValues.parkingPavementStructureTableRowChosen; 
  } else if (projectType === INTERMODAL) {
    mrsgForm = INTERMODAL_SUBGRADE_FORM;
    structureLayerForm = INTERMODAL_STRUCTURE_FORM;
    flexuralOutputForm = INTERMODAL_CONCRETE_FORM;
    showCompositeKValueRadioButton = state.currentProject.intermodalFormValues.showCompositeKValueRadioButton;
  }

  if (mrsgForm && structureLayerForm && flexuralOutputForm) {
    mrsgFormSelector = formValueSelector(mrsgForm);
    structureFormSelector = formValueSelector(structureLayerForm);
    flexuralOutputFormSelector = formValueSelector(flexuralOutputForm);

    if (projectType === STREET && constructionType === OVERLAY) {
      if (pavementStructureType === UNBONDED_CONCRETE || pavementStructureType === BONDED_CONCRETE) {
        existingThickness = mrsgFormSelector(state, EXISTING_THICKNESS);
        timeToLive = mrsgFormSelector(state, JOINT_CRACKING_TIME_TO_LIVE);
      }
      if (pavementStructureType === BONDED_CONCRETE) {
        durabilityAdjustmentFactor = mrsgFormSelector(state, DURABILITY_ADJUSTMENT_FACTOR);
        fatigueAdjustmentFactor = mrsgFormSelector(state, FATIGUE_ADJUSTMENT_FACTOR);
      }
    }

    compositeKValueRadioButtonValue = structureFormSelector(state, COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE);
    userDefinedCompositeKValue = structureFormSelector(state, USER_DEFINED_COMPOSITE_K_VALUE);

    // New Compsite has global inputs in structure layers form and user defined k values in mrsg form
    if (projectType === STREET && constructionType === NEW_COMPOSITE) {
      reliability = mrsgFormSelector(state, RELIABILITY);
      percentageOfSlabs = mrsgFormSelector(state, PERCENTAGE_OF_CRACKED_SLABS);  
    }


    californiaBearingRatio = mrsgFormSelector(state, CALIFORNIA_BEARING_RATIO);
    inputMrsgValue = mrsgFormSelector(state, INPUT_MRSG_VALUE);
    californiaBearingRatio = mrsgFormSelector(state, CALIFORNIA_BEARING_RATIO);
    resistanceValue = mrsgFormSelector(state, RESISTANCE_VALUE);
    subgradeDropdown = mrsgFormSelector(state, SUBGRADE_DROPDOWN);

    //Flexural Output Form
    compressiveStrength = flexuralOutputFormSelector(state, COMPRESSIVE_STREGTH);
    splitTensileStrength = flexuralOutputFormSelector(state, SPLIT_TESILE_STRENGTH);
    twentyEightDayFlexStrength = flexuralOutputFormSelector(state, TWENTYEIGHTDAY_FLEX_STRENGTH);
    concreteModulusOfElasticity = flexuralOutputFormSelector(state, CONCRETE_MODULUS_OF_ELASTICITY);
    concreteDropdown = flexuralOutputFormSelector(state, CONCRETE_DROPDOWN);

    structureFormValues = getFormValues(structureLayerForm)(state);
    structureLayerMembers = structureFormSelector(state, STRUCTURE_LAYER_MEMBERS);
    mrsgFormErrors = getFormSyncErrors(mrsgForm)(state);

    //Struture Form
    flexOutputFormErrors = getFormSyncErrors(flexuralOutputForm)(state);
    structureLayerFormErrors = getFormSyncErrors(structureLayerForm)(state);

    isFlexOutputFormPristine = isPristine(flexuralOutputForm)(state);
    isMrsgFormPristine = isPristine(mrsgForm)(state);
    isStructureLayersFormPristine = isPristine(structureLayerForm)(state);
    isPavementFormPristine = isMrsgFormPristine && isStructureLayersFormPristine && isFlexOutputFormPristine 
  }

  if (newCompositeOtherSurfaceLayerForm && newCompositeOtherSubgradeForm && newCompositeOtherStructureForm ) {
    newCompositeOtherSurfaceLayerFormSelector = formValueSelector(newCompositeOtherSurfaceLayerForm);
    newCompositeOtherSubgradeFormSelector = formValueSelector(newCompositeOtherSubgradeForm);
    newCompositeOtherStructureFormSelector = formValueSelector(newCompositeOtherStructureForm);

    surfaceLayerPoissonsRatio = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_POISSONS_RATIO);
    otherSurfaceModulusOFElasticity = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_LAYER_MODULUS_ELASTICITY);
    surfaceLayerThickness = newCompositeOtherSurfaceLayerFormSelector(state, SURFACE_LAYER_THICKNESS);
    allowableDamagePerLayer = newCompositeOtherSurfaceLayerFormSelector(state, ALLOWABLE_DAMAGE_PER_LAYER);

    newCompositeOtherStructureFormErrors = getFormSyncErrors(newCompositeOtherStructureForm)(state);
    newCompositeOtherSurfaceLayerFormErrors = getFormSyncErrors(newCompositeOtherSurfaceLayerForm)(state);
    newCompositeOtherSubgradeFormErrors = getFormSyncErrors(newCompositeOtherSubgradeForm)(state);

    subgradePoissonsRatio = newCompositeOtherSubgradeFormSelector(state, SUBGRADE_POISSONS_RATIO);
    otherSubgradeModulusOFElasticity = newCompositeOtherSubgradeFormSelector(state, SUBGRADE_MODULUS_OF_ELASTICITY);
    thicknessToRigidFoundation = newCompositeOtherSubgradeFormSelector(state, THICKNESS_TO_RIGID_FOUNDATION);
    
    structureLayerMembers = newCompositeOtherStructureFormSelector(state, STRUCTURE_LAYER_MEMBERS);
  }


  return {
     trafficForm, globalForm, trucksPerDay, trafficGrowthRate , directionalDistribution, designLaneDistribution, trafficSpectrumDropdown, trafficFormInputsDropdown,
    designLife, reliability, percentageOfSlabs, isTrafficFormPristine, isGlobalFormPristine,trafficFormErrors, globalFormErrors, isPavementFormPristine, structureLayerMembers, concreteModulusOfElasticity, flexOutputFormErrors, structureFormValues, concreteDropdown, californiaBearingRatio, twentyEightDayFlexStrength, compressiveStrength, splitTensileStrength, mrsgForm, structureLayerForm, flexuralOutputForm, structureLayerFormErrors, compositeKValueRadioButtonValue, userDefinedCompositeKValue, parkingPavementStructureTableRowChosen, showCompositeKValueRadioButton, inputMrsgValue, resistanceValue, subgradeDropdown, structureDropdown, mrsgFormErrors, pavementStructureType, trafficFormInputDropdown, existingThickness, timeToLive, durabilityAdjustmentFactor, fatigueAdjustmentFactor, isUserSignedIn, surfaceLayerPoissonsRatio, otherSurfaceModulusOFElasticity, surfaceLayerThickness, allowableDamagePerLayer, subgradePoissonsRatio, otherSubgradeModulusOFElasticity,
    thicknessToRigidFoundation, newCompositeOtherSurfaceLayerForm, newCompositeOtherSubgradeForm,  newCompositeOtherStructureForm, newCompositeOtherStructureFormErrors, intermodalSelectedVehicles, newCompositeOtherSurfaceLayerFormErrors, 
    newCompositeOtherSubgradeFormErrors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNotification: (message, level, autoDismiss, uid) => {
      dispatch(addNotification(message, level, autoDismiss, uid));
    },
    focus: (form, field) => {
      dispatch(touch(form, field));
    },
  };
}

ParentFormHeader = withRouter(connect(mapStateToProps, mapDispatchToProps)(ParentFormHeader));

export default ParentFormHeader;
