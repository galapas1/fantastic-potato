import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePdf, showPopup, removePavementStructureType, addNotification, createNewProject } from 'Actions';
import { getUnits } from 'HelperFunctions/getUnits';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import { FieldInput, ToggleButton, Popup } from 'Components';
import ReactTooltip from 'react-tooltip';
import { pluck, compact } from 'underscore';
import { browserHistory, withRouter } from 'react-router';
import NewCompositeAsphaltSummaryForm from './NewCompositeAsphaltSummaryForm';
import '../../../../components/Forms/Forms.scss';
import {
  NEW_COMPOSITE_BST_SUMMARY_FORM,
  NEW_COMPOSITE_ASPHALT_SUMMARY_FORM,
  NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
  NEW_COMPOSITE_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  MINIMUM_REQUIRED_THICKNESS,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
  NEW_COMPOSITE_BST_SUBGRADE_FORM,
  THICKNESS_TO_RIGID_FOUNDATION,
  NEW_COMPOSITE_BST_SURFACE_LAYER_FORM,
  DESIGN_LIFE,
  NEW_COMPOSITE_BST_STRUCTURE_FORM,
  STRUCTURE_LAYER_MEMBERS,
  LAYER_THICKNESS,
  METRIC
} from 'Constants';

import { asphaltSummaryLayerGraphValues,
         asphaltSummaryLayerGraphLayerValues } from 'Data/appValues';

class NewCompositeBstSummaryForm extends Component {

    static childContextTypes = {
        summaryContext: PropTypes.object.isRequired,
    };

  render() {
      return (          
              <NewCompositeAsphaltSummaryForm {...this.props} />
      );
    } 

  getChildContext() {
      return { summaryContext: this };
  }
}

NewCompositeBstSummaryForm = reduxForm({
    form: NEW_COMPOSITE_BST_SUMMARY_FORM,
    destroyOnUnmount: false,
})(NewCompositeBstSummaryForm);

function mapStateToProps(state, ownProps, context) {
    const trafficFormSelector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trafficSummaryDropdownValue = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const graphData = state.currentProject.newCompositeFormValues.asphaltSummaryBstGraphValues;
    const graphReferenceLines = state.currentProject.newCompositeFormValues.asphaltSummaryBstGraphDamageReferenceLinesValues;

    const subgradeLayerSelector = formValueSelector(NEW_COMPOSITE_BST_SUBGRADE_FORM)
    const thicknesstorigidfoundation = subgradeLayerSelector(state, THICKNESS_TO_RIGID_FOUNDATION);

    const surfaceLayerSelector = formValueSelector(NEW_COMPOSITE_BST_SURFACE_LAYER_FORM)
    const surfaceLayerThickness = surfaceLayerSelector(state, SURFACE_LAYER_THICKNESS);
    const allowableDamage = surfaceLayerSelector(state, ALLOWABLE_DAMAGE_PER_LAYER);
    const designLayerValues = state.currentProject.newCompositeFormValues.asphaltSummaryBstGraphDesignlayerValues
    const designLife =  trafficFormSelector(state, DESIGN_LIFE);
    const structureSelector = formValueSelector(NEW_COMPOSITE_BST_STRUCTURE_FORM)
    const structureLayerMembers = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const allStructureLayers = compact(pluck(structureLayerMembers, 'layerTypeName'));
    const allStructurethickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    
    const summarySelector = formValueSelector(NEW_COMPOSITE_BST_SUMMARY_FORM);
    const minimumRequiredThickness = summarySelector(state, MINIMUM_REQUIRED_THICKNESS);

    const globalForm = getFormValues(NEW_COMPOSITE_BST_SUBGRADE_FORM)(state);
    const trafficForm = getFormValues(NEW_COMPOSITE_TRAFFIC_FORM)(state);
    const calculatedtrafficForm = getFormValues(NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM)(state);
    const concreteSubgradeForm = getFormValues(NEW_COMPOSITE_BST_SUBGRADE_FORM)(state);
    const concreteSubbaseForm = getFormValues(NEW_COMPOSITE_BST_STRUCTURE_FORM)(state);
    const concreteConcreteForm = getFormValues(NEW_COMPOSITE_BST_SURFACE_LAYER_FORM)(state);

    const projectName         = state.currentProject.projectDetails.name;
    const projectType         = state.currentProject.projectDetails.projectType;
    const unitType            = state.currentProject.projectDetails.unitType;
    const projectDescription  = state.currentProject.projectDetails.description;
    const projectRoute        = state.currentProject.projectDetails.route;
    const projectDesigner     = state.currentProject.projectDetails.designer;
    const projectZipCode      = state.currentProject.projectDetails.zipCode;
    const projectDateCreated  = state.currentProject.projectDetails.dateCreated;
    const projectLastModified = state.currentProject.projectDetails.lastModified;
    const projectOwnersAgency = state.currentProject.projectDetails.ownersAgency;

    const projectDetails = {
        name          : projectName,
        type          : projectType,
        unitType      : unitType,
        description   : projectDescription,
        route         : projectRoute,
        designer      : projectDesigner,
        zipCode       : projectZipCode,
        dateCreated   : projectDateCreated,
        lastModified  : projectLastModified,
        ownersAgency  : projectOwnersAgency
    };

    return {
        projectDetails, globalForm, trafficForm, calculatedtrafficForm, concreteSubgradeForm, concreteSubbaseForm, concreteConcreteForm,
        trafficSummaryDropdownValue, graphData, graphReferenceLines, surfaceLayerThickness, allowableDamage, designLayerValues, designLife, allStructureLayers, minimumRequiredThickness, thicknesstorigidfoundation, allStructurethickness
    };
}

function mapDispatchToProps(dispatch, ownProps, context) {
    let reportdate = Date();
    return {
        generatePdf: (summaryContext) => {
            const isMetric = summaryContext.props.unitType === METRIC;

            let imgRefs = [{
                title: '', x: 10, y: 10,
                fields: [
                    { type: 'key', ref: '', image: '', key: '@ReportPDLogo', x: 10, y: 0 },
                    { type: 'text', text: 'ANALYSIS REPORT FOR COMPOSITE BST CHIP SEAL PAVEMENT', value: '', x: 200, y: 20, xPad: 70, lg: true },
                    { type: 'text', text: 'INSPECT DAMAGE PLOT TO VALIDATE DESIGN', value: '', x: 200, y: 35, xPad: 70, lg: true },
                    { type: 'text', text: 'DATE CREATED:', value: '', x: 200, y: 50, xPad: 70, sm: true },
                    { type: 'text', text: '', value: reportdate, x: 200, y: 65, xPad: 20, sm: true },
                ]
            },           
                {
                    title: 'Project Description', x: 10, y: 100,
                    fields: [
                        { type: 'text', text: 'Project Name:', value: summaryContext.props.projectDetails.name, x: 5, y: 15, xPad: 70 },
                        { type: 'text', text: "Designer's Name:", value: summaryContext.props.projectDetails.designer, x: 5, y: 30, xPad: 70 },
                        { type: 'text', text: 'Owner:', value: summaryContext.props.projectDetails.ownersAgency, x: 150, y: 15, xPad: 50 },
                        { type: 'text', text: 'Route:', value: summaryContext.props.projectDetails.route, x: 150, y: 30, xPad: 50 },
                        { type: 'text', text: 'Zip Code:', value: summaryContext.props.projectDetails.zipCode, x: 300, y: 15, xPad: 50 },
                        // Andy, 92 chars per line, max three lines should be enforce for description
                        { type: 'text', text: 'Project Description:', value: summaryContext.props.projectDetails.description, x: 5, y: 45, xPad: 70 },
                        { type: 'line', plot: 'h', x: 5, y: 60, x2: 410, y2: 60 },
                    ]
                },
                {
                    title: 'Design Summary', x: 10, y: 175,
                    fields: [
                        { type: 'text', text: 'BST SURFACE LAYER', value: '', x: 5, y: 15, xPad: 125 },
                        { type: 'text', text: 'Surface Layer Thickness:',
                            value: summaryContext.props.surfaceLayerThickness + ' ' +
                            getUnits('in', isMetric), x: 5, y: 30, xPad: 125 },
                        { type: 'key', ref: '', image: '', key: '@CompositeAnalysis', x: 200, y: -10 },
                        { type: 'line', plot: 'h', x: 5, y: 45, x2: 410, y2: 45 },
                    ]
                },
                {
                    title: 'Pavement Structure', x: 10, y: 235,
                    fields: [
                        { type: 'text', text: 'SUBBASE', value: '', x: 5, y: 15, xPad: 0 },                       
                        { type: 'key', ref: '', image: '', key: '@PavementStructureSubbase', x: 5, y: 25 },

                        { type: 'text', text: 'SURFACE LAYER', value: '', x: 5, y: 160, xPad: 0 },
                        {
                            type: 'text', text: "Poisson's Ratio:",
                            value: summaryContext.props.concreteConcreteForm.surfaceLayerPoissonsRatio, x: 5, y: 170, xPad: 100, sm: true
                        },
                        {
                            type: 'text', text: 'Modulus of Elasticty:',
                            value: summaryContext.props.concreteConcreteForm.surfaceLayerModulusOfElasticity + ' ' +
                            getUnits('psi', isMetric), x: 5, y: 180, xPad: 100, sm: true
                        },
                        {
                            type: 'text', text: 'Allowable Damage Per Layer:',
                            value: summaryContext.props.concreteConcreteForm.allowableDamagePerLayer + ' %', x: 5, y: 190, xPad: 100, sm: true
                        },
                         { type: 'line', x: 210, y: 160, x2: 210, y2: 190 },
                         { type: 'text', text: 'SUBGRADE', value: '', x: 225, y: 160, xPad: 0 },
                         {
                             type: 'text', text: 'Thickness to Rigid Foundation',
                             value: summaryContext.props.concreteSubgradeForm.thicknessToRigidFoundation + ' ' +
                             getUnits('in', isMetric), x: 225, y: 170, xPad: 100, sm: true
                         },
                         {
                             type: 'text', text: "Poisson's Ratio:",
                             value: summaryContext.props.concreteSubgradeForm.subgradePoissonsRatio, x: 225, y: 180, xPad: 100, sm: true
                         },
                         {
                             type: 'text', text: 'Modulus of Elasticty:',
                             value: summaryContext.props.concreteSubgradeForm.subgradeModulusOfElasticity + ' ' +
                             getUnits('psi', isMetric), x: 225, y: 190, xPad: 100, sm: true
                         },
                         { type: 'line', plot: 'h', x: 5, y: 210, x2: 410, y2: 210 },
                    ]
                },
                {
                    title: 'Project Level', x: 10, y: 460,
                    fields: [
                        { type: 'text', text: 'TRAFFIC', value: '', x: 80, y: 10, xPad: 0 },
                        { type: 'text', text: 'Spectrum Type:',
                            value: summaryContext.props.trafficForm.trafficSpectrumDropdown, x: 25, y: 20, xPad: 100, sm: true },
                        { type: 'text', text: 'Design Life:',
                            value: summaryContext.props.trafficForm.designLife + ' years', x: 25, y: 30, xPad: 100, sm: true },
                        { type: 'text', text: 'USER DEFINED TRAFFIC', value: '', x: 60, y: 40, xPad: 0 },
                        {
                            type: 'text', text: 'Trucks Per Day:',
                            value: summaryContext.props.trafficForm.trucksPerDay, x: 25, y: 50, xPad: 120, sm: true
                        },
                        {
                            type: 'text', text: 'Traffic Growth Rate %:',
                            value: summaryContext.props.trafficForm.trafficGrowthRate + ' % per year', x: 25, y: 60, xPad: 120, sm: true
                        },
                        {
                            type: 'text', text: 'Directional Distribution:',
                            value: summaryContext.props.trafficForm.directionalDistribution + ' %', x: 25, y: 70, xPad: 120, sm: true
                        },
                        {
                            type: 'text', text: 'Design Lane Distribution:',
                            value: summaryContext.props.trafficForm.designLaneDistribution + ' %', x: 25, y: 80, xPad: 120, sm: true
                        },
                        { type: 'line', x: 210, y: 15, x2: 210, y2: 80 },
                        {
                            type: 'text', text: 'Avg Trucks/Day in Design Lane Over the Design Life:',
                            value: summaryContext.props.calculatedtrafficForm.averageTrucksPerDayInDesignLaneOverDesignLife, x: 225, y: 20, xPad: 145, sm: true
                        },
                        {
                            type: 'text', text: 'Total Trucks in Design Lane Over the  Design Life:',
                            value: summaryContext.props.calculatedtrafficForm.totalTrucksInDesignLaneOverDesignLife, x: 225, y: 30, xPad: 145, sm: true
                        },
                        { type: 'line', plot: 'h', x: 5, y: 90, x2: 410, y2: 90 },
                    ]
                },
                {
                    title: 'Design Method', x: 10, y: 600,
                    fields: [
                        { type: 'text', text: 'The PCA layer elastic design methodology, from PCAPave, was used to produce these results.',
                            value: '', x: 5, y: 15, xPad: 70 },
                    ]
                },
                {
                    title: '', x: 0, y: 0,
                    fields: [
                      { type: 'page' },
                    ]
                },
                { // must be last ... see use of 'graphFields' below
                    title: 'Predicted Damage Graph', x: 10, y: 40,
                    fields: [
                      { type: 'key', ref: '', image: '', key: '@PredictedDamageGraph', x: 10, y: 10 },
                      { type: 'text', text: 'Legend:', value: '', x: 10, y: 280 },
                    ]
                },
                {
                    title: '', x: 0, y: 0,
                    fields: [
                      { type: 'no-preview' },
                    ]
                }
            ];

            let yLegendOffset = 290;
            let graphFields = imgRefs[imgRefs.length-1].fields;
            if(summaryContext.props.designLayerValues) {
                summaryContext.props.designLayerValues.map((designLayer, indx) => {
                  let legendEntry = {
                    type: 'text', text: '', color: (asphaltSummaryLayerGraphLayerValues[designLayer]['rgb'] ?
                                                    asphaltSummaryLayerGraphLayerValues[designLayer]['rgb'] : "15,175,175"),
                    value: asphaltSummaryLayerGraphLayerValues[designLayer]['yAxisValue'], x: 5, y: (yLegendOffset+(10*indx)), xPad: 50, sm: true };
                  graphFields.push(legendEntry);
              });
            }
            dispatch(generatePdf(0, summaryContext, imgRefs));
        }
    };
}

NewCompositeBstSummaryForm = connect(
    mapStateToProps, mapDispatchToProps,
)(NewCompositeBstSummaryForm)


export default NewCompositeBstSummaryForm;
