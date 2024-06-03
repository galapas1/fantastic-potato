import React, { Component } from 'react';
import { connect } from 'react-redux';
import DesignLifeHelpScreen from './DesignLifeHelpScreen';
import TrafficSpectrumHelpScreen from './TrafficSpectrumHelpScreen';
import MetricTrafficSpectrumHelpScreen from './MetricTrafficSpectrumHelpScreen';
import MetricFlexStrengthHelpScreen from './MetricFlexStrengthHelpScreen';
import MetricLoadTransferHelpScreen from './MetricLoadTransferHelpScreen';
import MetricMacrofibersHelpScreen from './MetricMacrofibersHelpScreen';
import MetricMRSGHelpScreen from './MetricMRSGHelpScreen';
import TrucksPerDayHelpScreen from './TrucksPerDayHelpScreen';
import TrafficGrowthHelpScreen from './TrafficGrowthHelpScreen';
import DirectionalDistributionHelpScreen from './DirectionalDistributionHelpScreen';
import DesignLaneDistributionHelpScreen from './DesignLaneDistributionHelpScreen';
import ReliabilityHelpScreen from './ReliabilityHelpScreen';
import SlabsCrackedHelpScreen from './SlabsCrackedHelpScreen';
import CalcMRSGHelpScreen from './CalcMRSGHelpScreen';
import MRSGHelpScreen from './MRSGHelpScreen';
import FlexStrengthHelpScreen from './FlexStrengthHelpScreen';
import ElasticityHelpScreen from './ElasticityHelpScreen';
import ElasticityForMetricHelpScreen from './ElasticityForMetricHelpScreen';
import MacrofibersHelpScreen from './MacrofibersHelpScreen';
import LoadTransferHelpScreen from './LoadTransferHelpScreen';
import LoadTransferCoefficientHelpScreen from './LoadTransferCoefficientHelpScreen';
import DrainageCoefficientHelpScreen from './DrainageCoefficientHelpScreen';
import InitialServicabilityHelpScreen from './InitialServicabilityHelpScreen';
import TerminalServicabilityHelpScreen from './TerminalServicabilityHelpScreen';
import JCAdjustmentFactorHelpScreen from './JCAdjustmentFactorHelpScreen';
import FatigueAdjustmentFactorHelpScreen from './FatigueAdjustmentFactorHelpScreen';
import DurabilityAdjustmentFactorHelpScreen from './DurabilityAdjustmentFactorHelpScreen';

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
    FLEX_STRENGTH_HELP_SCREEN,
    ELASTICITY_HELP_SCREEN,
    FIBERS_HELP_SCREEN,
    LOAD_TRANSFER_HELP_SCREEN,
    LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN,
    DRAINAGE_COEFFICIENT_HELP_SCREEN,
    INITIAL_SERVICEABILITY_HELP_SCREEN,
    TERMINAL_SERVICEABILITY_HELP_SCREEN,
    JC_ADJUSTMENT_FACTOR_HELP_SCREEN,
    FATIGUE_ADJUSTMENT_FACTOR_HELP_SCREEN,
    DURABILITY_ADJUSTMENT_FACTOR_HELP_SCREEN,
    METRIC
} from  'Constants';

class HelpScreenResource extends Component {

  render() {
    const isMetric = this.props.unitType === METRIC;

    switch (this.props.currentHelpScreen) {
      case DESIGN_LIFE_HELP_SCREEN:
        return <DesignLifeHelpScreen {...this.props}/>
        case SELECT_SPECTRUM_HELP_SCREEN:
            if (isMetric) {
                return <MetricTrafficSpectrumHelpScreen {...this.props} />
            }
          return <TrafficSpectrumHelpScreen {...this.props} /> 
      case TRUCKS_PER_DAY_HELP_SCREEN:
          return <TrucksPerDayHelpScreen {...this.props} /> 
      case TRAFFIC_GROWTH_RATE_HELP_SCREEN:
          return <TrafficGrowthHelpScreen {...this.props} /> 
      case DIRECTIONAL_DISTRIBUTION_HELP_SCREEN:
            return <DirectionalDistributionHelpScreen {...this.props} /> 
      case DESIGN_LANE_DISTRIBUTION_HELP_SCREEN:
          return <DesignLaneDistributionHelpScreen {...this.props} /> 
      case RELIABILITY_HELP_SCREEN:
          return <ReliabilityHelpScreen {...this.props} /> 
      case SLABS_CRACKED_HELP_SCREEN:
          return <SlabsCrackedHelpScreen {...this.props} /> 
      case CALC_MRSG_HELP_SCREEN:
          return <CalcMRSGHelpScreen {...this.props} /> 
      case MRSG_HELP_SCREEN:
            if (isMetric) {
                return <MetricMRSGHelpScreen {...this.props} />
            }  
            return <MRSGHelpScreen {...this.props} /> 
      case CBR_HELP_SCREEN:
          return <MRSGHelpScreen {...this.props} /> 
      case FLEX_STRENGTH_HELP_SCREEN:
            if (isMetric) {
                return <MetricFlexStrengthHelpScreen {...this.props} />
            }     
            return <FlexStrengthHelpScreen {...this.props} />
      case ELASTICITY_HELP_SCREEN:
            if (isMetric) {
                return <ElasticityForMetricHelpScreen {...this.props} /> 
            }
            return <ElasticityHelpScreen {...this.props} /> 
      case FIBERS_HELP_SCREEN:
            if (isMetric) {
                return <MetricMacrofibersHelpScreen {...this.props} />
            }
            return <MacrofibersHelpScreen {...this.props} /> 
      case LOAD_TRANSFER_HELP_SCREEN:
            if (isMetric) {
                return <MetricLoadTransferHelpScreen {...this.props} />
            }     
            return <LoadTransferHelpScreen {...this.props} /> 
      case LOAD_TRANSFER_COEFFICIENT_HELP_SCREEN:
            return <LoadTransferCoefficientHelpScreen {...this.props} /> 
      case DRAINAGE_COEFFICIENT_HELP_SCREEN:
            return <DrainageCoefficientHelpScreen {...this.props} /> 
      case INITIAL_SERVICEABILITY_HELP_SCREEN:
            return <IniitalServicabilityHelpScreen {...this.props} /> 
      case TERMINAL_SERVICEABILITY_HELP_SCREEN:
          return <TerminalServicabilityHelpScreen {...this.props} /> 
      case JC_ADJUSTMENT_FACTOR_HELP_SCREEN:
            return <JCAdjustmentFactorHelpScreen {...this.props} /> 
      case FATIGUE_ADJUSTMENT_FACTOR_HELP_SCREEN:
            return <FatigueAdjustmentFactorHelpScreen {...this.props} /> 
      case DURABILITY_ADJUSTMENT_FACTOR_HELP_SCREEN:
            return <DurabilityAdjustmentFactorHelpScreen {...this.props} /> 
      default:
          return null;     
        
   }
 }
}

function mapStateToProps(state) {
  let currentHelpScreen;
  let helpScreenTitle;
  if (state.currentProject.popup.popupDetails && state.currentProject.popup.popupDetails.helpScreenType) {
    currentHelpScreen = state.currentProject.popup.popupDetails.helpScreenType
    helpScreenTitle = state.currentProject.popup.popupDetails.helpScreenTitle
  }
    const unitType = state.currentProject.projectDetails.unitType;
  return {
    unitType,
    currentHelpScreen: currentHelpScreen,
    helpScreenTitle: helpScreenTitle
  };
}

HelpScreenResource  = connect(mapStateToProps)(HelpScreenResource);

export default HelpScreenResource;
