import React , { Component } from 'react';
import { connect } from 'react-redux';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { AxisLabel, CustomTooltip } from 'Forms/components/graphComponents'

import { getGraphValues } from 'Data/appValues';
import { getUnits       } from 'HelperFunctions/getUnits';

import '../../../../components/Forms/Forms.scss';

import {
 NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP,
 TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
 SUMMARY_FORM_K_VALUE,
 SUMMARY_FORM_FLEXURAL_STRENGTH,
 SUMMARY_FORM_RELIABILITY,
 SUMMARY_FORM_DESIGN_LIFE,
 SUMMARY_FORM_SLABS_CRACKED,
 SUMMARY_FORM_DOWELED,
 SUMMARY_FORM_UNDOWELED,
 JPCP,
 RCC,
 METRIC
} from  'Constants';

const popupStyle = {
  left: '14%',
  width: '72%',
  overflowY: 'auto'
}

class NewCompositeSummaryFormGraphPopup extends Component {

  constructor(props) {
    super(props);
    this.state = { optionSelected : '', selectedGraphData: []};
  }

  componentWillReceiveProps(nextProps) {
    // This is called when someone clicks on a graph from the summary page. Redux store  value popupDtails refer to the previous popup that was shown to the user
    // Important thing to remember is that this component is rendered when summary page is shown to the user --> Component needs to be rendered so that only height 
    // can animate
    if (nextProps.popupDetails !== this.props.popupDetails) {
      let currentType = nextProps.popupDetails  && nextProps.popupDetails.type;
      let previousType = this.props.popupDetails  && this.props.popupDetails.type;
      if (currentType !== previousType) {
        this.setState({
          optionSelected: currentType,
          selectedGraphData: nextProps.graphData
        });
      }  
    }
   // This is called when user exits out of popup. THis is necessary because the next time a user clicks on a particular type from the Summary Page, 
   // that particular graph type needs to be shown (instead of what the user previosly chose from graph selection within the popup)
    if (nextProps.popupDetails && nextProps.popupDetails.type !== this.state.optionSelected) {
      this.setState({
        optionSelected: nextProps.popupDetails.type,
        selectedGraphData: nextProps.graphData
      });
    }

    if (nextProps.jpcpSummaryThicknessOption !== this.props.jpcpSummaryThicknessOption && nextProps.showPopup) {
      this.changeGraphShown( nextProps, this.state.optionSelected);
    }

  }
  
  changeGraphShown( passedInProps, type) {

    let props;
     let graphData;
    if (passedInProps) {
      props = passedInProps; 
    } else {
      props = this.props;
    }

    if (props.type === JPCP) {
      if (type === SUMMARY_FORM_K_VALUE && props.jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
       graphData = props.jpcpDoweledKValueGraphData;
      }
      if (type === SUMMARY_FORM_K_VALUE && props.jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
        graphData = props.jpcpUndoweledKValueGraphData
      }

      if (type === SUMMARY_FORM_FLEXURAL_STRENGTH && props.jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
        graphData = props.jpcpDoweledFlexuralStrengthGraphData;
      }
      if (type === SUMMARY_FORM_FLEXURAL_STRENGTH && props.jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
        graphData = props.jpcpUndoweledFlexuralStrengthGraphData;
      }

      if (type === SUMMARY_FORM_RELIABILITY && props.jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
        graphData = props.jpcpDoweledReliabilityGraphData;
      }
      if (type === SUMMARY_FORM_RELIABILITY && props.jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
        graphData = props.jpcpUndoweledReliabilityGraphData;
      }

      if (type === SUMMARY_FORM_DESIGN_LIFE && props.jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
        graphData = props.jpcpDoweledDesignLifeGraphData;
      }
      if (type === SUMMARY_FORM_DESIGN_LIFE && props.jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
        graphData = props.jpcpUndoweledDesignLifeGraphData;
      }
      
      if (type === SUMMARY_FORM_SLABS_CRACKED && props.jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
        graphData = props.jpcpDoweledSlabsCrackedGraphData;
      }
      if (type === SUMMARY_FORM_SLABS_CRACKED && props.jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
        graphData = props.jpcpUndoweledSlabsCrackedGraphData;
      }
    }

    if (props.type === RCC) {
      if (type === SUMMARY_FORM_K_VALUE) {
        graphData = props.rccKValueGraphData;
      } else if (type === SUMMARY_FORM_FLEXURAL_STRENGTH) {
        graphData = props.rccFlexuralStrengthGraphData;
      } else if (type === SUMMARY_FORM_RELIABILITY) {
        graphData = props.rccReliabilityGraphData;
      } else if (type === SUMMARY_FORM_DESIGN_LIFE) {
        graphData = props.rccDesignLifeGraphData 
      } else if (type === SUMMARY_FORM_SLABS_CRACKED) {
        graphData = props.rccSlabsCrackedGraphData ;
      } 
    }

    this.setState({optionSelected: type});
    this.setState({selectedGraphData: graphData})

  }

  render() {
    let xAxisValue;
    let graphTitle;
    let xAxisDataValue;
    const graphData = this.state.selectedGraphData;
    const type = this.state.optionSelected;
    const concreteType = this.props.concreteType;
    if (type) {
      const graphValues = getGraphValues(this.props.unitType === METRIC);

      xAxisValue     = graphValues[type]['xAxisValue'];
      graphTitle     = graphValues[type]['title'];
      xAxisDataValue = graphValues[type]['xAxisDataValue'];
    }

    return (
      <div className={(this.props.currentPopup === NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP && this.props.showPopup) ? 'render-popup summary-form-graph-popup-height render-graph-popup' : 'base-popup base-graph-popup'} style={popupStyle}>
        <i style={{ fontSize: 25, position: 'absolute', top: 16, right: 10,  zIndex: 11, color: '#0FAFAF'}} onClick={this.props.hidePopup} className='fa fa-times' ></i>
        <div style={{ display: 'flex', height: 'inherit'}}>
          <div style={{width: '14%', borderRadius: 5, marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'inherit'}}>
           <div className={((type === SUMMARY_FORM_K_VALUE) ?'active graph-option': 'graph-option')} style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}} onClick={this.changeGraphShown.bind(this, null, SUMMARY_FORM_K_VALUE)}>K-value</div>
           <div className={(( type === SUMMARY_FORM_FLEXURAL_STRENGTH) ?'active graph-option': 'graph-option')} onClick={this.changeGraphShown.bind(this, null, SUMMARY_FORM_FLEXURAL_STRENGTH)} >CONCRETE STRENGTH</div>
           {this.props.trafficFormInputDropdown !== TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN && <div className={(('Design Life' === this.state.optionSelected) ?'active graph-option': 'graph-option')} style={{flexDirection: 'column'}} onClick={this.changeGraphShown.bind(this, null, 'Design Life' )}>
            <div>DESIGN</div>
            <div>LIFE</div>
           </div> }
           <div className={((type === SUMMARY_FORM_RELIABILITY) ?'active graph-option': 'graph-option')} onClick={this.changeGraphShown.bind(this, null, SUMMARY_FORM_RELIABILITY)} style={{ borderBottomLeftRadius: concreteType === 'CRCP' ? 5 : 0, borderBottomRightRadius: concreteType === 'CRCP' ? 5 : 0}} >RELIABILITY</div>
           <div className={((type === SUMMARY_FORM_SLABS_CRACKED) ?'active graph-option': 'graph-option')} onClick={this.changeGraphShown.bind(this, null, SUMMARY_FORM_SLABS_CRACKED)} style={{flexDirection: 'column', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
             <div>SLABS</div>
             <div>CRACKED</div>
           </div>
          </div>
          <div style={{ border: '1px solid', marginTop: 20, borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '81%'}}>
            <div style={{width: '70%', border: '1px solid', backgroundColor: '#0FAFAF', color: 'white', borderRadius: 30,  alignItems: 'center', display: 'flex', justifyContent: 'center', marginLeft: 50, height: 45, marginTop: 30, textAlign: 'center', marginBottom: 15}}>{graphTitle}</div>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                data={graphData}
                margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
              >
                 <XAxis padding={{right: 10}} tick={{stroke: '0FAFAFA'}} name="kValue" dataKey={xAxisDataValue} label={{ value: xAxisValue , stroke:'#0FAFAF' , position: 'top', offset:-33}} tickLine={false} />
                            <YAxis dataKey="thickness" height={100} label={<AxisLabel x={-120} y={30} width={0} height={0} stroke='FF4500' axisType='yAxis'>Thickness, {getUnits('in', this.props.unitType === METRIC)}</AxisLabel>} tickLine={false} />
                 <Tooltip cursor={false} content={<CustomTooltip xAxisValue={xAxisDataValue} />} />
                 <CartesianGrid horizontal={false} vertical={false} />
                 <Line dot={{ stroke: 'orange', strokeWidth: 2, r: 4}} activeDot={false} dataKey="thickness" type="monotone" stroke="#0FAFAF" strokeWidth={2} yAxisId={0} unit={getUnits('in', this.props.unitType === METRIC)} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    jpcpDoweledKValueGraphData: state.currentProject.newCompositeFormValues.jpcpDoweledKValueGraphData,
    jpcpUndoweledKValueGraphData: state.currentProject.newCompositeFormValues.jpcpUndoweledKValueGraphData,
    jpcpDoweledFlexuralStrengthGraphData: state.currentProject.newCompositeFormValues.jpcpDoweledFlexuralStrengthGraphData,
    jpcpUndoweledFlexuralStrengthGraphData: state.currentProject.newCompositeFormValues.jpcpUndoweledFlexuralStrengthGraphData,
    jpcpDoweledReliabilityGraphData: state.currentProject.newCompositeFormValues.jpcpDoweledReliabilityGraphData,
    jpcpUndoweledReliabilityGraphData: state.currentProject.newCompositeFormValues.jpcpUndoweledReliabilityGraphData,
    jpcpDoweledDesignLifeGraphData: state.currentProject.newCompositeFormValues.jpcpDoweledDesignLifeGraphData,
    jpcpUndoweledDesignLifeGraphData: state.currentProject.newCompositeFormValues.jpcpUndoweledDesignLifeGraphData,
    jpcpDoweledSlabsCrackedGraphData: state.currentProject.newCompositeFormValues.jpcpDoweledSlabsCrackedGraphData,
    jpcpUndoweledSlabsCrackedGraphData:state.currentProject.newCompositeFormValues.jpcpUndoweledSlabsCrackedGraphData,
    rccKValueGraphData: state.currentProject.newCompositeFormValues.rccKValueGraphData,
    rccFlexuralStrengthGraphData: state.currentProject.newCompositeFormValues.rccFlexuralStrengthGraphData,
    rccReliabilityGraphData: state.currentProject.newCompositeFormValues.rccReliabilityGraphData,
    rccDesignLifeGraphData: state.currentProject.newCompositeFormValues.rccDesignLifeGraphData,
    rccSlabsCrackedGraphData: state.currentProject.newCompositeFormValues.rccSlabsCrackedGraphData,
    rccCrackingValues: state.currentProject.newCompositeFormValues.rccCrackingValues,
    rccFaultingValues: state.currentProject.newCompositeFormValues.rccFaultingValues,
    rccErosionUsedValue: state.currentProject.newCompositeFormValues.rccErosionUsedValue,
    rccFatigueUsedValue: state.currentProject.newCompositeFormValues.rccErosionUsedValue,
    unitType: state.currentProject.projectDetails.unitType,
  };
}

NewCompositeSummaryFormGraphPopup  = connect(
    mapStateToProps, null
)(NewCompositeSummaryFormGraphPopup);

export default NewCompositeSummaryFormGraphPopup;
