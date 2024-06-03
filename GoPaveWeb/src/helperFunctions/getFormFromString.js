
import ConcreteTrafficForm from 'Forms/Concrete/ProjectLevel/ConcreteTrafficForm';
import ConcreteGlobalForm from 'Forms/Concrete/ProjectLevel/ConcreteGlobalForm';
import ConcreteTrafficSummaryDetailsForm from 'Forms/Concrete/ProjectLevel/ConcreteTrafficSummaryDetailsForm';
import ConcreteSubgradeForm from 'Forms/Concrete/PavementStructure/ConcreteSubgradeForm';
import ConcreteConcreteForm from 'Forms/Concrete/PavementStructure/ConcreteConcreteForm';
import ConcreteStructureForm from 'Forms/Concrete/PavementStructure/ConcreteStructureForm';

import OverlayTrafficForm from 'Forms/Overlay/ProjectLevel/OverlayTrafficForm';
import OverlayGlobalForm from 'Forms/Overlay/ProjectLevel/OverlayGlobalForm';
import OverlayTrafficSummaryDetailsForm from 'Forms/Overlay/ProjectLevel/OverlayTrafficSummaryDetailsForm';
import OverlayUnbondedAsphaltSubgradeForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedAsphaltSubgradeForm';
import OverlayUnbondedAsphaltConcreteForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedAsphaltConcreteForm';
import OverlayUnbondedAsphaltSubbaseForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedAsphaltSubbaseForm';
import OverlayUnbondedConcreteConcreteForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedConcreteConcreteForm';
import OverlayBondedConcreteConcreteForm from 'Forms/Overlay/PavementStructure/OverlayBondedConcreteConcreteForm';
import OverlayBondedConcreteSubbaseForm from 'Forms/Overlay/PavementStructure/OverlayBondedConcreteSubbaseForm';
import OverlayUnbondedConcreteSubbaseForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedConcreteSubbaseForm';
import OverlayBondedConcreteExistingConcreteForm from 'Forms/Overlay/PavementStructure/OverlayBondedConcreteExistingConcreteForm';
import OverlayUnbondedConcreteExistingConcreteForm from 'Forms/Overlay/PavementStructure/OverlayUnbondedConcreteExistingConcreteForm';

import NewCompositeTrafficForm from 'Forms/NewComposite/ProjectLevel/NewCompositeTrafficForm';
import NewCompositeCalculatedTrafficResultsForm from 'Forms/NewComposite/ProjectLevel/NewCompositeCalculatedTrafficResultsForm';
import NewCompositeTrafficSummaryDetailsForm from 'Forms/NewComposite/ProjectLevel/NewCompositeTrafficSummaryDetailsForm';
import NewCompositeOtherSurfaceLayerForm from 'Forms/NewComposite/PavementStructure/Other/NewCompositeOtherSurfaceLayerForm';
import NewCompositeOtherSubgradeForm from 'Forms/NewComposite/PavementStructure/Other/NewCompositeOtherSubgradeForm';
import NewCompositeOtherStructureForm from 'Forms/NewComposite/PavementStructure//Other/NewCompositeOtherStructureForm';
import NewCompositeJpcpSubgradeForm from 'Forms/NewComposite/PavementStructure/Jpcp/NewCompositeJpcpSubgradeForm';
import NewCompositeJpcpSurfaceLayerForm from 'Forms/NewComposite/PavementStructure/Jpcp/NewCompositeJpcpSurfaceLayerForm';
import NewCompositeJpcpStructureForm from 'Forms/NewComposite/PavementStructure/Jpcp/NewCompositeJpcpStructureForm';
import NewCompositeRccSubgradeForm from 'Forms/NewComposite/PavementStructure/RCC/NewCompositeRccSubgradeForm';
import NewCompositeRccSurfaceLayerForm from 'Forms/NewComposite/PavementStructure/RCC/NewCompositeRccSurfaceLayerForm';
import NewCompositeRccStructureForm from 'Forms/NewComposite/PavementStructure/RCC/NewCompositeRccStructureForm';
import NewCompositeBstSubgradeForm from 'Forms/NewComposite/PavementStructure/BST/NewCompositeBstSubgradeForm';
import NewCompositeBstSurfaceLayerForm from 'Forms/NewComposite/PavementStructure/BST/NewCompositeBstSurfaceLayerForm';
import NewCompositeBstStructureForm from 'Forms/NewComposite/PavementStructure/BST/NewCompositeBstStructureForm';
import NewCompositeHmaSubgradeForm from 'Forms/NewComposite/PavementStructure/HMA/NewCompositeHmaSubgradeForm';
import NewCompositeHmaSurfaceLayerForm from 'Forms/NewComposite/PavementStructure/HMA/NewCompositeHmaSurfaceLayerForm';
import NewCompositeHmaStructureForm from 'Forms/NewComposite/PavementStructure/HMA/NewCompositeHmaStructureForm';

import ParkingTrafficForm from 'Forms/Parking/ProjectLevel/ParkingTrafficForm';
import ParkingTrafficSummaryDetailsForm from 'Forms/Parking/ProjectLevel/ParkingTrafficSummaryDetailsForm';
import ParkingSubgradeForm from 'Forms/Parking/PavementStructure/ParkingSubgradeForm';
import ParkingSubbaseForm from 'Forms/Parking/PavementStructure/ParkingSubbaseForm';
import ParkingConcreteForm from 'Forms/Parking/PavementStructure/ParkingConcreteForm';

//Intermodal
import IntermodalSubgradeForm from 'Forms/Intermodal/PavementStructure/IntermodalSubgradeForm';
import IntermodalConcreteForm from 'Forms/Intermodal/PavementStructure/IntermodalConcreteForm';
import IntermodalStructureForm from 'Forms/Intermodal/PavementStructure/IntermodalStructureForm';

import {
 CONCRETE_CONCRETE_FORM,
 CONCRETE_SUBGRADE_FORM,
 CONCRETE_STRUCTURE_FORM,
 CONCRETE_TRAFFIC_FORM,
 CONCRETE_GLOBAL_FORM,
 CONCRETE_TRAFFIC_SUMMARY_DEAILS_FORM,
 OVERLAY_TRAFFIC_FORM,
 OVERLAY_GLOBAL_FORM,
 OVERLAY_TRAFFIC_SUMMARY_DEAILS_FORM,
 OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
 OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
 OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
 OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
 OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
 OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
 OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
 NEW_COMPOSITE_TRAFFIC_FORM,
 NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
 NEW_COMPOSITE_TRAFFIC_SUMMARY_DEAILS_FORM,
 NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
 NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
 NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
 NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
 NEW_COMPOSITE_RCC_STRUCTURE_FORM,
 NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_RCC_SUBGRADE_FORM,
 NEW_COMPOSITE_BST_STRUCTURE_FORM,
 NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_BST_SUBGRADE_FORM,
 NEW_COMPOSITE_HMA_STRUCTURE_FORM,
 NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM,
 NEW_COMPOSITE_HMA_SUBGRADE_FORM,
 PARKING_TRAFFIC_FORM,
 PARKING_TRAFFIC_SUMMARY_DEAILS_FORM,
 PARKING_SUBGRADE_FORM,
 PARKING_SUBBASE_FORM,
 PARKING_CONCRETE_FORM,
 INTERMODAL_STRUCTURE_FORM, 
 INTERMODAL_SUBGRADE_FORM,
 INTERMODAL_CONCRETE_FORM 
} from 'Constants'

const FormObject = {
  [CONCRETE_TRAFFIC_FORM]: ConcreteTrafficForm,
  [CONCRETE_GLOBAL_FORM]: ConcreteGlobalForm,
  [CONCRETE_TRAFFIC_SUMMARY_DEAILS_FORM]: ConcreteTrafficSummaryDetailsForm,
  [CONCRETE_SUBGRADE_FORM]: ConcreteSubgradeForm,
  [CONCRETE_STRUCTURE_FORM] : ConcreteStructureForm,
  [CONCRETE_CONCRETE_FORM] : ConcreteConcreteForm,
  [OVERLAY_TRAFFIC_FORM]: OverlayTrafficForm, 
  [OVERLAY_GLOBAL_FORM]: OverlayGlobalForm, 
  [OVERLAY_TRAFFIC_SUMMARY_DEAILS_FORM]: OverlayTrafficSummaryDetailsForm, 
  [OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM]: OverlayUnbondedAsphaltSubgradeForm,
  [OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM]: OverlayUnbondedAsphaltSubbaseForm,
  [OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM]: OverlayUnbondedAsphaltConcreteForm, 
  [OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM]: OverlayUnbondedConcreteConcreteForm, 
  [OVERLAY_BONDED_CONCRETE_CONCRETE_FORM]: OverlayBondedConcreteConcreteForm, 
  [OVERLAY_BONDED_CONCRETE_SUBBASE_FORM]: OverlayBondedConcreteSubbaseForm,
  [OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM]: OverlayUnbondedConcreteSubbaseForm, 
  [OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM]: OverlayBondedConcreteExistingConcreteForm,
  [OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM]: OverlayUnbondedConcreteExistingConcreteForm,
  [NEW_COMPOSITE_TRAFFIC_FORM]: NewCompositeTrafficForm,
  [NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM]: NewCompositeCalculatedTrafficResultsForm,
  [NEW_COMPOSITE_TRAFFIC_SUMMARY_DEAILS_FORM]: NewCompositeTrafficSummaryDetailsForm,
  [NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM]: NewCompositeOtherSurfaceLayerForm,
  [NEW_COMPOSITE_OTHER_SUBGRADE_FORM]: NewCompositeOtherSubgradeForm,
  [NEW_COMPOSITE_OTHER_STRUCTURE_FORM]: NewCompositeOtherStructureForm,
  [NEW_COMPOSITE_JPCP_SUBGRADE_FORM]:NewCompositeJpcpSubgradeForm,
  [NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM]: NewCompositeJpcpSurfaceLayerForm,
  [NEW_COMPOSITE_JPCP_STRUCTURE_FORM]:NewCompositeJpcpStructureForm,
  [NEW_COMPOSITE_RCC_SUBGRADE_FORM]:NewCompositeRccSubgradeForm,
  [NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM]: NewCompositeRccSurfaceLayerForm,
  [NEW_COMPOSITE_RCC_STRUCTURE_FORM]:NewCompositeRccStructureForm,
  [NEW_COMPOSITE_BST_SUBGRADE_FORM]:NewCompositeBstSubgradeForm,
  [NEW_COMPOSITE_BST_SURFACE_LAYER_FORM]: NewCompositeBstSurfaceLayerForm,
  [NEW_COMPOSITE_BST_STRUCTURE_FORM]:NewCompositeBstStructureForm,
  [NEW_COMPOSITE_HMA_SUBGRADE_FORM]:NewCompositeHmaSubgradeForm,
  [NEW_COMPOSITE_HMA_SURFACE_LAYER_FORM]: NewCompositeHmaSurfaceLayerForm,
  [NEW_COMPOSITE_HMA_STRUCTURE_FORM]:NewCompositeHmaStructureForm,
  [PARKING_TRAFFIC_FORM]: ParkingTrafficForm,
  [PARKING_TRAFFIC_SUMMARY_DEAILS_FORM]:  ParkingTrafficSummaryDetailsForm,
  [PARKING_SUBGRADE_FORM]: ParkingSubgradeForm,
  [PARKING_SUBBASE_FORM]: ParkingSubbaseForm,
  [PARKING_CONCRETE_FORM]: ParkingConcreteForm,
  [INTERMODAL_STRUCTURE_FORM]: IntermodalStructureForm,
  [INTERMODAL_SUBGRADE_FORM]: IntermodalSubgradeForm,
  [INTERMODAL_CONCRETE_FORM]: IntermodalConcreteForm
}

export const getFormFromString = (formName) => {
  return FormObject[formName];
}
