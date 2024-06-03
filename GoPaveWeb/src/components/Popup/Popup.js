import React, { Component } from 'react';
import './Popup.scss';
import { connect } from 'react-redux';
import { hidePopup } from 'Actions';
import ConcreteAsphaltAnalysisForm from 'Forms/Concrete/ProjectLevel/ConcreteAsphaltAnalysisForm';
import OverlayAsphaltAnalysisForm from 'Forms/Overlay/ProjectLevel/OverlayAsphaltAnalysisForm';
import CustomTrafficSpectrumForm from '../Forms/CustomTrafficSpectrumForm';
import ConcreteSummaryFormGraphPopup from 'Forms/Concrete/SummaryPage/ConcreteSummaryFormGraphPopup';
import OverlaySummaryFormGraphPopup from 'Forms/Overlay/SummaryPage/OverlaySummaryFormGraphPopup';
import NewCompositeSummaryFormGraphPopup from 'Forms/NewComposite/SummaryPage/NewCompositeSummaryFormGraphPopup';
import ParkingSummaryFormGraphPopup from 'Forms/Parking/SummaryPage/ParkingSummaryFormGraphPopup';
import IntermodalAddVehiclePopup from './IntermodalAddVehiclePopup';
import HelpScreenPopup from './HelpScreenPopup';
import {
  OVERLAY_ASPHALT_ANALYSIS_POPUP,
  CONCRETE_ASPHALT_ANALYSIS_POPUP,
  CUSTOM_TRAFFIC_SUMMARY_POPUP,
  CONCRETE_SUMMARY_FORM_GRAPH_POPUP,
  OVERLAY_SUMMARY_FORM_GRAPH_POPUP,
  NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP,
  PARKING_SUMMARY_FORM_GRAPH_POPUP,
  INTERMODAL_CUSTOM_VEHICLE_POPUP,
  HELP_SCREEN_POPUP
} from  'Constants';

class Popup extends Component {
  render() {
    switch (this.props.popup) {
      case OVERLAY_ASPHALT_ANALYSIS_POPUP:
        return <OverlayAsphaltAnalysisForm {...this.props}/>;
      case CONCRETE_ASPHALT_ANALYSIS_POPUP:
        return <ConcreteAsphaltAnalysisForm {...this.props}/>;
      case CUSTOM_TRAFFIC_SUMMARY_POPUP:
        return <CustomTrafficSpectrumForm {...this.props}/>;
      case CONCRETE_SUMMARY_FORM_GRAPH_POPUP:
        return <ConcreteSummaryFormGraphPopup {...this.props}/>;
      case OVERLAY_SUMMARY_FORM_GRAPH_POPUP:
        return <OverlaySummaryFormGraphPopup {...this.props}/>;
      case NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP:
        return <NewCompositeSummaryFormGraphPopup {...this.props}/>;
      case PARKING_SUMMARY_FORM_GRAPH_POPUP:
        return <ParkingSummaryFormGraphPopup {...this.props}/>;
      case INTERMODAL_CUSTOM_VEHICLE_POPUP:
        return <IntermodalAddVehiclePopup {...this.props}/>;
      case HELP_SCREEN_POPUP:
        return <HelpScreenPopup {...this.props}/>;
      default:
        return null;
    }   
  }
}

function mapStateToProps(state) {
  return {
    showPopup: state.currentProject.popup.showPopup,
    currentPopup: state.currentProject.popup.currentPopup,
    popupDetails: state.currentProject.popup.popupDetails,
    graphData: state.currentProject.popup.graphData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hidePopup: () => {
      dispatch(hidePopup())
    }
  };
}

Popup  = connect(mapStateToProps, mapDispatchToProps)(Popup);

export default Popup;