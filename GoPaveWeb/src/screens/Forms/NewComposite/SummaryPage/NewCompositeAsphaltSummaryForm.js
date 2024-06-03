import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { PropTypes } from 'prop-types';
import { showPopup, removePavementStructureType, addNotification, createNewProject, pngCollector, saveImages } from 'Actions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import { AxisLabel, CustomTooltip } from 'Forms/components/graphComponents'

import { getGraphValues,
         asphaltSummaryLayerGraphValues,
         asphaltSummaryLayerGraphLayerValues } from 'Data/appValues';
import { getUnits                            } from 'HelperFunctions/getUnits';

import { FieldInput, ToggleButton, Popup } from 'Components';
import { browserHistory, withRouter } from 'react-router';
import { pluck, compact} from 'underscore';

import '../../../../components/Forms/Forms.scss';

import {
  SUMMARY_FORM_PREDICTED_DAMAGE,
  BST,
  HDG,
  NEW_COMPOSITE_OTHER,
  SURFACE_LAYER_THICKNESS,
  METRIC
} from 'Constants';

const radioKButtonTooltipMessage = 'Go Back to Pavement Structure';
const radioKButtonTooltipID = 'concretePavementStructureForm';

class NewCompositeAsphaltSummaryForm extends Component {    

  render() {
    let xAxisValue;
    let yAxisValue;
    let graphTitle;
    let xAxisDataValue;
    const graphData = this.props.graphData;
    const type = SUMMARY_FORM_PREDICTED_DAMAGE;
    let summaryFormTitle;
    let solutiontype;
      let analysistypesurface;
    if (this.props.type === HDG) {
        summaryFormTitle = 'HMA Surface Layer';
        solutiontype = 'HMA/WMA Dense Graded';
        analysistypesurface = 'Asphalt Fatigue';
    } else if (this.props.type === BST) {
        summaryFormTitle = 'BST Surface Layer';
        solutiontype = 'BST Chip Seal';
        analysistypesurface = 'N/A - No Structural Support'
    } else if (this.props.type === NEW_COMPOSITE_OTHER) {
       summaryFormTitle = 'Other Surface Layer';
    }
    if (type) {
      const graphValues = getGraphValues(this.props.unitType === METRIC);

      xAxisValue     = graphValues[type]['xAxisValue'];
      yAxisValue     = graphValues[type]['yAxisValue'];
      graphTitle     = graphValues[type]['title'];
      xAxisDataValue = graphValues[type]['xAxisDataValue'];
    }

    return (
     <div className='summary-page' style={{zIndex: 10, paddingTop: 10, display: 'flex', flex: '1 1 0%', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div style={{ paddingLeft: 30, paddingTop: 10 }}>
                <div style={{ paddingLeft: 30, display: 'flex', width: '600px', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                    <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' />
                    <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                    <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Street</div>
                    <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                    <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>New Composite</div>
                    <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                    <div onClick={browserHistory.goBack} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{ paddingLeft: 5, color: "#3299CC", textDecoration: 'underline', cursor: 'pointer', fontSize: 16 }}>{solutiontype}</div>
                </div></div>
            <div style={{ display: 'flex', width: 'calc(100% - 100px)', height: '100%', margin: '0 auto', flex: 1 }}>
          <div style={{width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, marginRight: 10}}>
            <label style={{paddingBottom: 15}}>{summaryFormTitle}</label>
            <div ref="CompositeAnalysis" style={{
                        display: 'flex', flexDirection: 'column', width: '100%', fontSize: 12, backgroundColor:'gainsboro'}}>
              <div style={{display: 'flex', width: '100%'}}>
                <div style={{width: '45%', border: '1px solid'}}>Surface Layers</div>
                <div style={{ width: '20%', border: '1px solid', textAlign: 'center' }}>Thickness (in.)</div>
                <div style={{width: '35%', border: '1px solid'}}>Failure Analysis</div>
              </div>

              <div style={{display: 'flex', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                <div style={{display: 'flex', width: '100%', backgroundColor: '#D9E1F2', color: 'black'}}>
                  <div style={{width: '45%', border: '1px solid black'}}>{solutiontype}</div>
                    <div style={{ width: '20%', border: '1px solid black', textAlign: 'center' }}>{this.props.surfaceLayerThickness}</div>
                                <div style={{ width: '35%', border: '1px solid black' }}>{analysistypesurface}</div>
                  </div>
              </div>

              <div style={{display: 'flex', width: '100%'}}>
                <div style={{width: '45%', border: '1px solid'}}>Subbase Layers</div>
                <div style={{ width: '20%', border: '1px solid', textAlign: 'center' }}>Thickness (in.)</div>
                <div style={{width: '35%', border: '1px solid'}}>Failure Analysis</div>
              </div>
              <div style={{display: 'flex', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                {this.props.allStructureLayers && this.props.allStructureLayers.map((layer, index) => 
                  <div key={index} style={{display: 'flex', width: '100%', backgroundColor: asphaltSummaryLayerGraphLayerValues[layer]['color'] ? asphaltSummaryLayerGraphLayerValues[layer]['color'] : '', color: 'white'}}>
                    <div style={{width: '45%', border: '1px solid black'}}>{asphaltSummaryLayerGraphLayerValues[layer]['displayName']}</div>
                    <div style={{ width: '20%', border: '1px solid black', textAlign: 'center' }}>{this.props.allStructurethickness[index]}</div>
                    <div style={{width: '35%', border: '1px solid black'}}>{asphaltSummaryLayerGraphLayerValues[layer]['failureAnalysisText'] ? asphaltSummaryLayerGraphLayerValues[layer]['failureAnalysisText'] : '' }</div>  
                  </div>
                )}
              </div>
              <div style={{display: 'flex', width: '100%', backgroundColor: 'black', color: 'white'}}>
                <div style={{width: '45%', border: '1px solid black'}}>Subgrade</div>
                <div style={{ width: '20%', border: '1px solid black', textAlign: 'center'  }}>{this.props.thicknesstorigidfoundation}</div>
                <div style={{width: '35%', border: '1px solid black'}}>Subgrade Rutting</div>
              </div>
             
            </div>
            <div ref="ReportPDLogo" style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>

          </div>
        
          <div ref='PredictedDamageGraph' style={{ border: '1px solid', marginTop: 20, borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%', backgroundColor: 'white', height: '80%'}}>
            <div style={{width: '70%', border: '1px solid', backgroundColor: '#0FAFAF', color: 'white', borderRadius: 30,  alignItems: 'center', display: 'flex', justifyContent: 'center', marginLeft: 50, height: 45, marginTop: 30, textAlign: 'center', marginBottom: 15}}>{graphTitle}</div>
            <ResponsiveContainer width='100%' height={350}>
              <LineChart
                data={graphData}
                margin={{ top: 20, right: 50, left: 10, bottom: 20 }}
              >
                 <XAxis padding={{right: 10, bottom: 20}} tick={{stroke: '0FAFAFA'}} name="kValue" dataKey={xAxisDataValue} label={{ value: 'Year',stroke:'#0FAFAF' , position: 'top', offset:-33}} tickLine={false} />
                 <YAxis height={100} label={<AxisLabel x={-140} y={30} width={0} height={0} offset={100} axisType='yAxis'>{yAxisValue}</AxisLabel>} tickLine={false} />
                 <Tooltip cursor={false} />
                 <CartesianGrid horizontal={false} vertical={false} />
               {this.props.designLayerValues && this.props.designLayerValues.map((designLayer, index) => {
                return (
                  <Line key={index} dot={{ stroke: asphaltSummaryLayerGraphLayerValues[designLayer]['color'] ?  asphaltSummaryLayerGraphLayerValues[designLayer]['color'] : "orange", strokeWidth: 2, r: 4}} activeDot={false} dataKey={asphaltSummaryLayerGraphLayerValues[designLayer]['yAxisValue']}  type="monotone" stroke={asphaltSummaryLayerGraphLayerValues[designLayer]['color'] ?  asphaltSummaryLayerGraphLayerValues[designLayer]['color'] : "#0FAFAF"} strokeWidth={2} yAxisId={0} unit="%" />
                  )
                }
                )}}
                
                 <ReferenceLine x={this.props.designLife} stroke="green" label={{ value: 'Design Life',stroke:'#0FAFAF' , position: 'top', angle:-90, offset: -40 }}/>
                 <ReferenceLine y={this.props.allowableDamage} stroke="red" label={{ value: 'Allowable Damage',stroke:'purple' , position: 'right', offset:-100}} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <FooterForm formType='summaryForm' {...this.props} />
      </div>
    );
    }

  componentDidMount() {
      var imgRefs = [{
          fields: [
              { type: 'png', ref: this.refs.ReportPDLogo, image: '', key: '@ReportPDLogo' },
              { type: 'png', ref: this.refs.CompositeAnalysis, image: '', key: '@CompositeAnalysis', w: 200, h: 50 },
              { type: 'png', ref: this.refs.PredictedDamageGraph, image: '', key: '@PredictedDamageGraph', w: 400, h: 245 },
          ]
      }];
      setTimeout(function() { pngCollector(0, this, imgRefs, saveImages) }, 3000);
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

NewCompositeAsphaltSummaryForm = connect(
    mapStateToProps, null
)(NewCompositeAsphaltSummaryForm);

export default NewCompositeAsphaltSummaryForm;
