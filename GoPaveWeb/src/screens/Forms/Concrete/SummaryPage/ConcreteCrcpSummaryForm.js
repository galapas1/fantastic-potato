import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePdf, saveImages, showPopup, calculateCRCPSteelValues, removePavementStructureType, addNotification, createNewProject } from 'Actions';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues, change } from 'redux-form';
import { ToggleButton, Popup, FieldInput, Dropdown, FooterForm } from 'Components';
import { minimumValueString, maximumValueString } from 'Validation/validationHelper';
import './ConcreteSummaryPage.scss';
import { extend, isUndefined } from 'underscore';
import ReactTooltip from 'react-tooltip';
import { getUnits } from 'HelperFunctions/getUnits';
import { browserHistory, withRouter } from 'react-router';
import '../../../../components/Forms/Forms.scss';
import {
    CONCRETE_CRCP_SUMMARY_FORM,
    CONCRETE_CONCRETE_FORM,
    CONCRETE_GLOBAL_FORM,
    CONCRETE_STRUCTURE_FORM,
    CONCRETE_SUBGRADE_FORM,
    CRCP_DESIGN_THICKNESS,
    CRCP_STEEL_SPACING,
    CRCP_MINIMUM_REQUIRED_THICKNESS,
    CONCRETE_SUMMARY_FORM_GRAPH_POPUP,
    CONCRETE_TRAFFIC_FORM,
    TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN,
    TRAFFIC_FORM_INPUTS_DROPDOWN,
    SUMMARY_FORM_SENSITIVITY,
    SUMMARY_FORM_TOGGLE,
    SUMMARY_FORM_STEEL,
    SUMMARY_FORM_K_VALUE,
    SUMMARY_FORM_FLEXURAL_STRENGTH,
    SUMMARY_FORM_RELIABILITY,
    SUMMARY_FORM_DESIGN_LIFE,
    METRIC
} from 'Constants';

const radioKButtonTooltipMessage = 'Go Back to Pavement Structure';
const radioKButtonTooltipID = 'concretePavementStructureForm';

const concreteCRCPSummaryTooltipMessage = 'To adequately control crack width, <br />  the recommended maximum steel spacing <br />  between bars is 9 inches.';
const concreteCRCPSummaryTooltipMessageMetric = 'To adequately control crack width, <br />  the recommended maximum steel spacing <br />  between bars is 228.6 mm.';
const concreteCRCPSummaryTooltipID = 'concreteCRCPSummaryRadioButton';

const concreteCRCPSummaryMATTooltipMessage = 'When the recommended design thickness <br />  exceeds 13", a double versus single mat <br />  design is recommended.  Reference your State DOT guidance.';
const concreteCRCPSummaryMATTooltipMessageMetric = 'When the recommended design thickness <br />  exceeds 330 mm, a double versus single mat <br />  design is recommended.  Reference your State DOT guidance.';
const concreteCRCPSummaryMATTooltipID = 'concreteCRCPSummaryMATRadioButton';

const stateDropdownValues = [{ name: 'CA - California' }, { name: 'IL - Illinois' }, { name: 'OK - Oklahoma' }, { name: 'OR - Oregon' }, { name: 'TX - TEXAS' }, { name: 'VA - Virginia' }, { name: 'CUSTOM' }];
const barSizeDropdownValues = [{ name: '#7 Bar' }, { name: '#6 Bar' }, { name: '#5 Bar' }];
const calcualtorBarSizeValues = {
    '#7 Bar': 7,
    '#6 Bar': 6,
    '#5 Bar': 5,
}

const numberFromPercentage = {
    '0.62%': 0.62,
    '0.70%': 0.70,
    '0.72%': 0.72,
    '0.60%': 0.60,
}

class ConcreteCrcpSummaryForm extends Component {

    navigatePage() {
        const { projectType, constructionType, formType } = this.props.params;
        this.props.removePavementStructureType(CONCRETE_MODULE);
        const link = `/projectTypes/${projectType}/${constructionType}/${formType}`;
        this.props.router.push(link);
    }

    getThreeColumnForms() {
        const options = panelValues[STREET];
        const values = options[VALUES];
        const formType = this.props.params.type;
        const FormValues = findWhere(values, { constructionType: CONCRETE });
        return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][formType];
    }

    getThreeColumnWidths() {
        const options = panelValues[STREET];
        const values = options[VALUES];
        const formType = this.props.params.type;
        const FormValues = findWhere(values, { constructionType: CONCRETE });
        return FormValues[PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS][formType];
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.crcpSummaryBarSize !== this.props.crcpSummaryBarSize) {
            this.calculateValues(nextProps);
        }
        if (nextProps.crcpSummaryStateDropdown !== this.props.crcpSummaryStateDropdown) {
            if (nextProps.crcpSummaryStateDropdown === 'CUSTOM') {
                this.setNillValues();
            }
            this.calculateValues(nextProps);
        }
    }
    static childContextTypes = {
        summaryContext: PropTypes.object.isRequired,
    };

    onClickGraphButton(typePopup, graphData) {
        this.props.showPopup(CONCRETE_SUMMARY_FORM_GRAPH_POPUP, { type: typePopup }, graphData)
    }

    renderDesignLifegraph() {
        if (this.props.trafficFieldInputDropdown !== TRAFFIC_DROPDOWN_ESTIMATED_TRAFFIC_ASPHALT_DESIGN) {
            return (
                <div style={{ width: 300, height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_DESIGN_LIFE, this.props.crcpDesignLifeGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/DesignLifeGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                    <label>Design Life</label>
                </div>
            )
        }
        return null;
    }

    setNillValues() {
        this.props.changeFieldValue(CONCRETE_CRCP_SUMMARY_FORM, 'numberOfBarsPerLane', '');
        //this.props.changeFieldValue(CONCRETE_CRCP_SUMMARY_FORM, CRCP_STEEL_SPACING, '');
        this.props.changeFieldValue(CONCRETE_CRCP_SUMMARY_FORM, 'steelWeightLanePerMile', '');
    }

    calculateValues(passedInProps) {
        let props;
        if (passedInProps) {
            props = passedInProps;
        } else {
            props = this.props;
        }

        if (isUndefined(props.crcpSummaryStateDropdown) || isUndefined(props.crcpSummaryBarSize) || isUndefined(props.percentageSteelRequired)) {
            return;
        }

        let percentageSteelRequired;
        if (props.crcpSummaryStateDropdown === 'CUSTOM') {
            percentageSteelRequired = props['percentageSteelRequired'];
        } else {
            percentageSteelRequired = numberFromPercentage[props['percentageSteelRequired']];
        }

        let calculatorParams = {};
        if (props.unitType === METRIC) {
            extend(calculatorParams, { convertToMetric: true });
        }
        extend(calculatorParams, { thickness: parseFloat(props[CRCP_DESIGN_THICKNESS]) }, { percentageSteelRequired: percentageSteelRequired })
        extend(calculatorParams, { barSize: calcualtorBarSizeValues[props.crcpSummaryBarSize] });

        props.calculateCRCPSteelValues(calculatorParams);
    }

    setParentStateDropdownValue(item) {
        let percentageSteelRequired;
        if (item === 'CA - California') {
            percentageSteelRequired = '0.62%'
        } else if (item === 'IL - Illinois') {
            percentageSteelRequired = '0.70%'
        } else if (item === 'OK - Oklahoma') {
            percentageSteelRequired = '0.72%'
        } else if (item === 'OR - Oregon') {
            percentageSteelRequired = '0.60%'
        } else if (item === 'TX - TEXAS') {
            percentageSteelRequired = '0.60%'
        } else if (item === 'VA - Virginia') {
            percentageSteelRequired = '0.70%'
        } else if (item === 'CUSTOM') {
            percentageSteelRequired = '';
        }
        this.props.changeFieldValue(CONCRETE_CRCP_SUMMARY_FORM, 'percentageSteelRequired', percentageSteelRequired);

    }

    renderSteelSpacing() {
        const customSpanStyle = { 'backgroundColor': 'lightgray' };
        const customInputStyle = { 'backgroundColor': 'lightgray' };
        let tooltipAndStylesForSteelSpacing = {
            ...{ 'showTooltip': true, 'tooltipId': concreteCRCPSummaryTooltipID, 'toolTipMessage': concreteCRCPSummaryTooltipMessage, customSpanStyle, customInputStyle }
        };
        let tooltipAndStylesForSteelSpacingMetric = {
            ...{ 'showTooltip': true, 'tooltipId': concreteCRCPSummaryTooltipID, 'toolTipMessage': concreteCRCPSummaryTooltipMessageMetric, customSpanStyle, customInputStyle }
        };
        if (this.props.unitType != METRIC && parseFloat(this.props[CRCP_STEEL_SPACING]) > 9) {
            return (

                <div className='form-group-div' style={{ width: '100%' }}>
                    <label style={{ fontSize: 12, marginBottom: 10 }}>Steel Spacing</label>
                    <ReactTooltip id={concreteCRCPSummaryTooltipID} multiline={true} place='right' type='warning' effect='solid' />

                    <Field className='form-group-div-input' name={CRCP_STEEL_SPACING} readOnly={true} type="text" 
                           spanValue={getUnits('in', this.props.unitType === METRIC)} 
                           isCalculatedOutput={true} component={FieldInput} customInputWidth='60%'  {...tooltipAndStylesForSteelSpacing} />
                </div>
            )
        }

        else if (this.props.unitType == METRIC && parseFloat(this.props[CRCP_STEEL_SPACING]) > 228.6) {
            return (

                <div className='form-group-div' style={{ width: '100%' }}>
                    <label style={{ fontSize: 12, marginBottom: 10 }}>Steel Spacing</label>
                    <ReactTooltip id={concreteCRCPSummaryTooltipID} multiline={true} place='right' type='warning' effect='solid' />

                    <Field className='form-group-div-input' name={CRCP_STEEL_SPACING} readOnly={true} type="text"
                        spanValue={getUnits('in', this.props.unitType === METRIC)}
                        isCalculatedOutput={true} component={FieldInput} customInputWidth='60%'  {...tooltipAndStylesForSteelSpacingMetric} />
                </div>
            )
        }

        else {
            return (

                <div className='form-group-div' style={{ width: '100%' }}>
                    <label style={{ fontSize: 12, marginBottom: 10 }}>Steel Spacing</label>

                    <Field className='form-group-div-input' name={CRCP_STEEL_SPACING} readOnly={true} type="text" 
                           spanValue={getUnits('in', this.props.unitType === METRIC)} 
                           isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                </div>
            )
        }
    }

    renderDesignThickness() {
        const customSpanStyle = { 'backgroundColor': 'orange' };
        const customInputStyle = { 'backgroundColor': 'orange' };
        let tooltipAndStylesForDesignThickness = {
            ...{ 'showTooltip': true, 'tooltipId': concreteCRCPSummaryMATTooltipID, 'toolTipMessage': concreteCRCPSummaryMATTooltipMessage, customSpanStyle, customInputStyle }
        };
        let tooltipAndStylesForDesignThicknessMetric = {
            ...{ 'showTooltip': true, 'tooltipId': concreteCRCPSummaryMATTooltipID, 'toolTipMessage': concreteCRCPSummaryMATTooltipMessageMetric, customSpanStyle, customInputStyle }
        };


        if (this.props.unitType != METRIC && parseFloat(this.props[CRCP_DESIGN_THICKNESS]) > 13) {
            return (

                <div ref='RecommendedDesignThickness' className='form-group-div'>
                    <ReactTooltip id={concreteCRCPSummaryMATTooltipID} multiline={true} place='right' type='warning' effect='solid' />
                    <Field className='form-group-div-input' name={CRCP_DESIGN_THICKNESS} readOnly={true} type="text" 
                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                           isCalculatedOutput={true} component={FieldInput} customInputWidth='60%'  {...tooltipAndStylesForDesignThickness} />
                </div>
            )
        }
        
        else if (this.props.unitType == METRIC && parseFloat(this.props[CRCP_DESIGN_THICKNESS]) > 330) {
            return (

                <div ref='RecommendedDesignThickness' className='form-group-div'>
                    <ReactTooltip id={concreteCRCPSummaryMATTooltipID} multiline={true} place='right' type='warning' effect='solid' />
                    <Field className='form-group-div-input' name={CRCP_DESIGN_THICKNESS} readOnly={true} type="text"
                        spanValue={getUnits('in', this.props.unitType === METRIC)}
                        isCalculatedOutput={true} component={FieldInput} customInputWidth='60%'  {...tooltipAndStylesForDesignThicknessMetric} />
                </div>
            )
        }
        else {
            return (

                <div ref='RecommendedDesignThickness' className='form-group-div'>
                    <Field className='form-group-div-input' name={CRCP_DESIGN_THICKNESS} readOnly={true} type="text" 
                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                           isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                </div>
            )
        }
    }

    renderToogleSection() {

        if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_SENSITIVITY) {
            return (
                <div>
                    <div style={{ display: 'flex', marginTop: 20, justifyContent: 'center' }}>
                        <div style={{ width: 300, height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_K_VALUE, this.props.crcpKValueGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/kValueGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>K-Value</label>
                        </div>
                        <div style={{ width: 300, height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_FLEXURAL_STRENGTH, this.props.crcpFlexuralStrengthGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/FlexuralStrengthGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Flexural Strength</label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 300, height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_RELIABILITY, this.props.crcpReliabilityGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/ReliabilityGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Reliability</label>
                        </div>
                        {this.renderDesignLifegraph()}
                    </div>
                </div>
            )
        } else if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_STEEL) {
            
            return (
                <div style={{ display: 'flex', paddingTop: 30 }}>
                    <div style={{ width: '50%', borderRight: '1px solid' }}>
                        <div className='form-group-div' style={{ width: '90%', marginBottom: 15 }}>
                            <label style={{ fontSize: 12, marginBottom: 15 }}>State</label>
                            <Field name='crcpSummaryStateDropdown' component={Dropdown} list={stateDropdownValues} setParentDropdownValue={this.setParentStateDropdownValue.bind(this)} style={{ zIndex: 100 }} defaultValue={{ name: 'Select State' }} />
                        </div>
                        <div className='form-group-div' style={{ width: '90%' }}>
                            <label style={{ fontSize: 12, marginBottom: 15 }}>Percentage Steel Required</label>
                            {this.props.crcpSummaryStateDropdown !== 'CUSTOM' && <Field className='form-group-div-input' name='percentageSteelRequired' readOnly={true} type="text" spanValue='%' isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' calculateValues={this.calculateValues.bind(this)} />}
                            {this.props.crcpSummaryStateDropdown === 'CUSTOM' && <Field name='percentageSteelRequired' component={FieldInput} type='text' spanValue='%' className='form-group-div-input' placeholder='Enter %' calculateValues={this.calculateValues.bind(this)} setNillCalculatorValues={this.setNillValues.bind(this)} textAlign='center' />
                            }
                        </div>
                        <div className='form-group-div' style={{ width: '90%' }}>
                            <label style={{ fontSize: 12, marginBottom: 15 }}>Bar Size</label>
                            <Field style={{ zIndex: 11 }} name='crcpSummaryBarSize' component={Dropdown} list={barSizeDropdownValues} defaultValue={{ name: 'Select Bar Size' }} />
                        </div>
                    </div>
                    <div style={{ width: '40%' }}>
                        {this.renderSteelSpacing()}
                        <div className='form-group-div' style={{ width: '100%' }}>
                            <label style={{ fontSize: 12, marginBottom: 10 }}>Number of Bars/Lane</label>
                            <Field className='form-group-div-input' name='numberOfBarsPerLane' readOnly={true} type="text" isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div className='form-group-div' style={{ width: '100%' }}>
                            <label style={{ fontSize: 12, marginBottom: 10 }}>Steel Weight/Lane-Mile</label>
                            <Field className='form-group-div-input' name='steelWeightLanePerMile' readOnly={true} type="text" 
                                   spanValue={getUnits('lbs',  this.props.unitType === METRIC)}
                                   isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {       

        const { constructionType, projectType, type } = this.props.params; 

        return (
            <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ paddingLeft: 30, paddingTop: 10}}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' />
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{constructionType}</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div onClick={browserHistory.goBack} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{ paddingLeft: 5, color: "#3299CC", textDecoration: 'underline', cursor: 'pointer', fontSize: 16 }}>{type}</div>
                    </div></div>
                <div style={{ display: "flex", width: "calc(100% - 100px)", height: "100%", margin: "0 auto", flex: 1 }}>
                    <div style={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Calculated Minumim Thickness</label>
                            <Field className='form-group-div-input' name={CRCP_MINIMUM_REQUIRED_THICKNESS} readOnly={true} type="text" 
                                   spanValue={getUnits('in', this.props.unitType === METRIC)}
                                   isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Recommended Design Thickness</label>

                            {this.renderDesignThickness()}

                        </div>
                        <div ref='ReportLogo' style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>

                    </div>
                    <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div style={{ width: '90%', display: 'flex' }}>
                            <div style={{ display: 'flex', width: '15%', justifyContent: 'center' }}>
                                <label style={{ fontSize: 15, paddingRight: 30 }}>Analysis</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Field name={SUMMARY_FORM_TOGGLE} options={[SUMMARY_FORM_SENSITIVITY, SUMMARY_FORM_STEEL]} buttonSelected={this.props[SUMMARY_FORM_TOGGLE]} component={ToggleButton} />
                                {this.renderToogleSection()}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterForm formType='summaryForm' {...this.props} />
                <Popup concreteType='CRCP' popup={CONCRETE_SUMMARY_FORM_GRAPH_POPUP} />
            </div>
        );
    }

    getChildContext() {
        return { summaryContext: this };
    }
}

function validate(values) {
    const errors = {};

    if (values.percentageSteelRequired < 0.10) {
        errors.percentageSteelRequired = minimumValueString('0.60');
    }
    if (values.percentageSteelRequired > 1.00) {
        errors.percentageSteelRequired = maximumValueString('1.00');
    }

    return errors;
}

ConcreteCrcpSummaryForm = connect(
    state => {
        const selector = formValueSelector(CONCRETE_CRCP_SUMMARY_FORM);
        const summaryFormToggle = selector(state, SUMMARY_FORM_TOGGLE);
        const crcpKValueGraphData = state.currentProject.concreteFormValues.crcpKValueGraphData;
        const crcpFlexuralStrengthGraphData = state.currentProject.concreteFormValues.crcpFlexuralStrengthGraphData;
        const crcpReliabilityGraphData = state.currentProject.concreteFormValues.crcpReliabilityGraphData;
        const crcpDesignLifeGraphData = state.currentProject.concreteFormValues.crcpDesignLifeGraphData;
        const trafficFormSelector = formValueSelector(CONCRETE_TRAFFIC_FORM);
        const trafficFieldInputDropdown = trafficFormSelector(state, TRAFFIC_FORM_INPUTS_DROPDOWN);

        const globalForm = getFormValues(CONCRETE_GLOBAL_FORM)(state);
        const trafficForm = getFormValues(CONCRETE_TRAFFIC_FORM)(state);
        const concreteTrafficForm = getFormValues(CONCRETE_TRAFFIC_FORM)(state);
        const concreteSubgradeForm = getFormValues(CONCRETE_SUBGRADE_FORM)(state);
        const concreteSubbaseForm = getFormValues(CONCRETE_STRUCTURE_FORM)(state);
        const concreteConcreteForm = getFormValues(CONCRETE_CONCRETE_FORM)(state);
        const concreteGlobalForm = getFormValues(CONCRETE_GLOBAL_FORM)(state);

        const crcpdesignThickness = selector(state, CRCP_DESIGN_THICKNESS);
        const crcpminimumThickness = selector(state, CRCP_MINIMUM_REQUIRED_THICKNESS);
        const steelSpacing = selector(state, CRCP_STEEL_SPACING);

        const crcpSummaryStateDropdown = selector(state, 'crcpSummaryStateDropdown');
        const crcpSummaryBarSize = selector(state, 'crcpSummaryBarSize');
        const percentageSteelRequired = selector(state, 'percentageSteelRequired');

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
            projectDetails, globalForm, trafficForm, concreteSubgradeForm, concreteSubbaseForm, concreteConcreteForm, concreteTrafficForm, concreteGlobalForm,
            summaryFormToggle, crcpKValueGraphData, crcpFlexuralStrengthGraphData, crcpReliabilityGraphData, crcpDesignLifeGraphData, trafficFieldInputDropdown, crcpSummaryStateDropdown, crcpSummaryBarSize, percentageSteelRequired, crcpdesignThickness, crcpminimumThickness, steelSpacing
        }
    }
)(ConcreteCrcpSummaryForm)

ConcreteCrcpSummaryForm = reduxForm({
    form: CONCRETE_CRCP_SUMMARY_FORM,
    initialValues: { summaryFormToggle: SUMMARY_FORM_SENSITIVITY },
    destroyOnUnmount: false,
    validate,
    touchOnChange: true
})(ConcreteCrcpSummaryForm);

function buildConcreteSubbaseFormData(concreteSubbaseForm, isMetric) {
    if(concreteSubbaseForm.compositeKValueRadioButtonValue === 'compositeKValueRadioButtonValueUserDefined') {
        return [{
            type: 'text', text: 'User-Defined Composite K-Value of Substructure:',
            value: concreteSubbaseForm.userDefinedCompositeKValueOfSubstructure + ' ' + getUnits('psi/in', isMetric), x: 5, y: 25, xPad: 170, sm: true
        }];
    }
    return [{
        type: 'text', text: 'Calculated Composite K-Value of Substructure:',
        value: concreteSubbaseForm.compositeKValueOfSubstructure + ' ' + getUnits('psi/in', isMetric), x: 5, y: 25, xPad: 170, sm: true
    }];
}

function buildConcreteConcreteFormData(concreteConcreteForm, isMetric) {
    let needModulusOfElasticity = true;
    let needCalculatedFlexuralStrength = true;

    let dropdownValue = '';
    switch (concreteConcreteForm.concreteDropdown) {
        case '28-Day Flex Strength':
            dropdownValue = concreteConcreteForm.twentyEightDayFlexStrength;
            needCalculatedFlexuralStrength = false;
            break;
        case 'Compressive Strength':
            dropdownValue = concreteConcreteForm.compressiveStrength;
            break;
        case 'Split Tensile Strength':
            dropdownValue = concreteConcreteForm.splitTensileStrength;
            break;
        case 'Modulus of Elasticity':
            dropdownValue = concreteConcreteForm.modulusOfElasticity;
            needModulusOfElasticity = false;
            break;
    }
    let startY = 210;
    let imgRefs = [{
        type: 'text', text: concreteConcreteForm.concreteDropdown + ':', sm: true,
        value: dropdownValue.toLocaleString() + ' ' +
        getUnits('psi', isMetric), x: 5, y: startY, xPad: 65
    }];
    startY += 10;
    if (needModulusOfElasticity) {
        imgRefs.push({
            type: 'text', text: 'Modulus of Elasticity:', sm: true,
            value: concreteConcreteForm.modulusOfElasticity.toLocaleString() + ' ' +
            getUnits('psi', isMetric),
            x: 5, y: startY, xPad: 65
        });
        startY += 10;
    }

    if (needCalculatedFlexuralStrength) {
        imgRefs.push({
            type: 'text', text: 'Calculated Flexural Strength:', sm: true,
            value: concreteConcreteForm.calculatedFlexuralStrength.toLocaleString() + ' ' +
            getUnits('psi', isMetric),
            x: 5, y: startY, xPad: 80
        });
    }
    return imgRefs;
}

function buildConcreteSubgradeFormData(concreteSubgradeForm, isMetric) {
    let needCalculatedMrsgValue = true;
    let dropdownValue = '';
    let unitValue = ' ' + getUnits('psi', isMetric);
    switch (concreteSubgradeForm.subgradeDropdown) {
        case 'CBR':
            dropdownValue = concreteSubgradeForm.californiaBearingRatio;
            unitValue = ' %';
            break;
        case 'Known MRSG Value':
            dropdownValue = concreteSubgradeForm.inputMrsgValue;
            needCalculatedMrsgValue = false;
            unitValue = ' ' + getUnits('psi', isMetric);
            break;
        case 'R-Value':
            dropdownValue = concreteSubgradeForm.resistanceValue;
            unitValue = ' ';
            break;
    }

    let imgRefs = [{
        type: 'text', text: concreteSubgradeForm.subgradeDropdown + ':', sm: true,
        value: dropdownValue.toLocaleString() + unitValue, x: 290, y: 210, xPad: 70
    }];
    if (needCalculatedMrsgValue) {
        imgRefs.push({
            type: 'text', text: 'Calculated MRSG Value', sm: true,
            value: concreteSubgradeForm.calculatedMrsgValue.toLocaleString() + ' ' +
            getUnits('psi', isMetric), x: 290, y: 220, xPad: 70
        });
    }
    return imgRefs;
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    let reportdate = Date();
    return {
        removePavementStructureType: (module) => {
            dispatch(removePavementStructureType(module));
        },
        focus: (form, field) => {
            dispatch(touch(form, field));
        },
        addNotification: (message, level, autoDismiss, uid) => {
            dispatch(addNotification(message, level, autoDismiss, uid));
        },
        createNewProject: () => {
            dispatch(createNewProject());
        },
        calculateCRCPSteelValues: (values) => {
            dispatch(calculateCRCPSteelValues(values));
        },
        changeFieldValue: (form, field, value) => {
            dispatch(change(form, field, value));
        },
        generatePdf: (summaryContext) => {
            const isMetric = summaryContext.props.unitType === METRIC;

            let imgRefs = [{
                title: '', x: 10, y: 10,
                fields: [
                    { type: 'png', ref: summaryContext.refs.ReportLogo, image: '', key: '', x: 10, y: 0 },
                    { type: 'text', text: 'DESIGN SUMMARY REPORT FOR', value: '', x: 200, y: 20, xPad: 70, lg: true },
                    { type: 'text', text: 'CONTINUOUSLY REINFORCED CONCRETE PAVEMENT (CRCP)', value: '', x: 200, y: 35, xPad: 70, lg: true },
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
                    { type: 'text', text: 'Recommended Design Thickness:',
                        value: summaryContext.props.crcpdesignThickness + ' ' + getUnits('in', isMetric), x: 5, y: 20, xPad: 125 },
                    { type: 'text', text: 'Calculated Minimum Thickness:',
                        value: summaryContext.props.crcpminimumThickness + ' ' + getUnits('in', isMetric), x: 200, y: 20, xPad: 125 },

                //{ type: 'png', ref: summaryContext.refs.RecommendedDesignThickness, image: '', key: '', x: 80, y: 10 },
                    { type: 'line', plot: 'h', x: 5, y: 35, x2: 410, y2: 35 },
                ]
            },
            {
                title: 'Pavement Structure', x: 10, y: 225,
                fields: [
                    { type: 'text', text: 'SUBBASE', value: '', x: 5, y: 15, xPad: 0 },
                    // composite k-value (user provided or calculated) gets spliced here
                    { type: 'key', ref: '', image: '', key: '@PavementStructureSubbase', x: 5, y: 35 },
                   
                    { type: 'text', text: 'CONCRETE', value: '', x: 5, y: 200, xPad: 0 },
                    // concreteConcreteFormData gets spliced here
                    { type: 'text', text: 'Edge Support:', value: summaryContext.props.concreteConcreteForm.edgeSupport, x: 150, y: 200, xPad: 80, sm: true },
                    { type: 'text', text: 'Load Transfer Coefficient:',
                        value: summaryContext.props.concreteConcreteForm.loadTransferCoefficient, x: 150, y: 210, xPad: 80, sm: true },
                    { type: 'text', text: 'Drainage Coefficient:',
                        value: summaryContext.props.concreteConcreteForm.drainageCoefficient, x: 150, y: 220, xPad: 80, sm: true },
                    { type: 'text', text: 'Terminal Serviceablity:',
                        value: summaryContext.props.concreteConcreteForm.terminalServiceability, x: 150, y: 230, xPad: 80, sm: true },
                    { type: 'text', text: 'Initial Serviceablity:',
                        value: summaryContext.props.concreteConcreteForm.initialServiceability, x: 150, y: 240, xPad: 80, sm: true },
                    //{ type: 'line', x: 170, y: 60, x2: 275, y2: 60 },
                   
                    { type: 'line', x: 280, y: 190, x2: 280, y2: 240 },                   
                    { type: 'text', text: 'SUBGRADE', value: '', x: 315, y: 200, xPad: 0 },
                    // concreteSubgrade gets spliced here
                    { type: 'line', plot: 'h', x: 5, y: 250, x2: 410, y2: 250 },
                ]
            },
            {
                title: 'Project Level', x: 10, y: 490,
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

                    { type: 'text', text: 'GLOBAL', value: '', x: 275, y: 10, xPad: 0 },
                    {
                        type: 'text', text: 'Reliability:',
                        value: summaryContext.props.globalForm.reliability + ' %', x: 225, y: 20, xPad: 125, sm: true
                    },
                    {
                        type: 'text', text: '% Slabs Cracked at End of Design Life:',
                        value: summaryContext.props.globalForm.percentSlabsCracked + ' %', x: 225, y: 30, xPad: 125, sm: true
                    },
                    { type: 'line', x: 215, y: 40, x2: 395, y2: 40 },
                    {
                        type: 'text', text: 'Avg Trucks/Day in Design Lane Over the Design Life:',
                        value: summaryContext.props.globalForm.averageTrucksPerDayInDesignLaneOverDesignLife, x: 225, y: 50, xPad: 145, sm: true
                    },
                    {
                        type: 'text', text: 'Total Trucks in Design Lane Over the  Design Life:',
                        value: summaryContext.props.globalForm.totalTrucksInDesignLaneOverDesignLife, x: 225, y: 60, xPad: 145, sm: true
                    },
                    { type: 'line', plot: 'h', x: 5, y: 90, x2: 410, y2: 90 },
                ]
            },
            {
                title: 'Design Method', x: 10, y: 600,
                fields: [
                    { type: 'text', text: 'The AASHTO 93 design methodology was used to produce these results.', value: '', x: 5, y: 15, xPad: 70 },
                ]
            },
            {
                title: '', x: 0, y: 0,
                fields: [
                  { type: 'no-preview' },
                ]
            }];

            let arr = buildConcreteSubbaseFormData(summaryContext.props.concreteSubbaseForm, isMetric);
            for (let indx = 0; indx < arr.length; indx++) {
                imgRefs[3].fields.splice(1 + indx, 0, arr[indx]);
            }

            arr = buildConcreteConcreteFormData(summaryContext.props.concreteConcreteForm, isMetric);
            for (let indx = 0; indx < arr.length; indx++) {
                imgRefs[3].fields.splice(5 + indx, 0, arr[indx]);
            }

            arr = buildConcreteSubgradeFormData(summaryContext.props.concreteSubgradeForm, isMetric);
            for (let indx = 0; indx < arr.length; indx++) {
                imgRefs[3].fields.splice(10 + indx, 0, arr[indx]);
            }

            dispatch(generatePdf(0, summaryContext, imgRefs));
            
        },
        showPopup: (popup, popupDetails, graphData) => {
            dispatch(showPopup(popup, popupDetails, graphData));
        }
    };
}

ConcreteCrcpSummaryForm = withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(ConcreteCrcpSummaryForm));

export default ConcreteCrcpSummaryForm;
