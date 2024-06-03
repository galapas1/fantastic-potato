import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePdf, 
         showPopup, 
         removePavementStructureType, 
         addNotification, 
         createNewProject } from 'Actions';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import { ToggleButton, Popup, FieldInput } from 'Components';
import ReactTooltip from 'react-tooltip';
import { browserHistory, withRouter } from 'react-router';
import '../../Concrete/SummaryPage/ConcreteSummaryPage.scss';
import '../../../../components/Forms/Forms.scss';
import { getUnits } from 'HelperFunctions/getUnits';
import {
    OVERLAY_GLOBAL_FORM,
    OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
    OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
    OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
    OVERLAY_BONDED_CONCRETE_SUMMARY_FORM,
    OVERLAY_SUMMARY_FORM_GRAPH_POPUP,
    OVERLAY_TRAFFIC_FORM,
    TRAFFIC_SPECTRUM_DROPDOWN,
    AXLE_WEIGHT,
    AXLE_PER_1000,
    AXLE_EXPECTED_REPETITIONS,
    AXLE_STRESS_RATIO,
    AXLE_ALLOWABLE_REPETIONS_LOW,
    AXLE_ALLOWABLE_REPETIONS,
    AXLE_FATIGUE_CONSUMED,
    AXLE_DAMAGE,
    SUMMARY_FORM_CRACKING,
    SUMMARY_FORM_EROSION,
    SUMMARY_FORM_SENSITIVITY,
    SUMMARY_FORM_TOGGLE,
    OVERLAY_BONDED_DESIGN_THICKNESS,
    OVERLAY_BONDED_MINIMUM_REQUIRED_THICKNESS,
    SUMMARY_FORM_K_VALUE,
    SUMMARY_FORM_FLEXURAL_STRENGTH,
    SUMMARY_FORM_RELIABILITY,
    SUMMARY_FORM_DESIGN_LIFE,
    SUMMARY_FORM_SLABS_CRACKED,
    BONDED_CONCRETE,
    METRIC,
} from 'Constants';

const radioKButtonTooltipMessage = 'Go Back to Pavement Structure';
const radioKButtonTooltipID = 'concretePavementStructureForm';

class UnbondedBondedConcreteSummaryForm extends Component {

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

    static childContextTypes = {
        summaryContext: PropTypes.object.isRequired,
    };

    onClickGraphButton(typePopup, graphData) {
        this.props.showPopup(OVERLAY_SUMMARY_FORM_GRAPH_POPUP, { type: typePopup }, graphData)
    }

    renderListItems(type) {
        let object;
        let displayOption = this.props[SUMMARY_FORM_TOGGLE];
        if (displayOption === SUMMARY_FORM_CRACKING) {
            object = this.props.bondedConcreteCrackingValues;
        } else if (displayOption === SUMMARY_FORM_EROSION) {
            object = this.props.bondedConcreteFaultingValues;
        }

        let displayItems = object[type];

        let items = [];
        for (let i = 0; i < 10; i++) {
            items.push(<tr key={`${i}`}>
                <td style={{ backgroundColor: '#DEB887' }}>{displayItems[AXLE_WEIGHT][i]}</td>
                <td style={{ backgroundColor: 'white' }}>{displayItems[AXLE_PER_1000][i]}</td>
                <td style={{ backgroundColor: '#DEB887' }}>{displayItems[AXLE_EXPECTED_REPETITIONS][i]}</td>
                <td style={{ backgroundColor: 'white' }}>{displayItems[AXLE_STRESS_RATIO][i]}</td>
                <td style={{ backgroundColor: '#DEB887' }}>{displayOption === SUMMARY_FORM_CRACKING ? displayItems[AXLE_ALLOWABLE_REPETIONS_LOW][i] : displayItems[AXLE_ALLOWABLE_REPETIONS][i]}</td>
                <td style={{ backgroundColor: 'white' }}>{displayOption === SUMMARY_FORM_CRACKING ? displayItems[AXLE_FATIGUE_CONSUMED][i] : displayItems[AXLE_DAMAGE][i]}</td>
            </tr>);
        }
        return items;
    }

    renderToogleSection() {
        if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_SENSITIVITY) {
            return (
                <div>
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_K_VALUE, this.props.bondedConcreteKValueGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/kValueGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>K-Value</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_FLEXURAL_STRENGTH, this.props.bondedConcreteFlexuralStrengthGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/FlexuralStrengthGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Flexural Strength</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_DESIGN_LIFE, this.props.bondedConcreteDesignLifeGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/DesignLifeGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Design Life</label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 20, justifyContent: 'center' }}>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_RELIABILITY, this.props.bondedConcreteReliabilityGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/ReliabilityGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Reliability</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_SLABS_CRACKED, this.props.bondedConcreteSlabsCrackedGraphData)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/DesignLifeGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>% Slabs Cracked</label>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_CRACKING) {
            return (
                <div style={{ height: '100%' }}>
                    <div style={{ display: 'flex', width: '82%', justifyContent: 'space-between', fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
                        <div style={{ fontSize: 11 }}>{`TRAFFIC SUMMARY DETAILS: ${this.props.trafficSummaryDropdownValue}`}</div>
                        <div style={{ fontSize: 11 }}>{`TOTAL FATIGUE USED %: ${this.props.bondedConcreteFatigueUsedValue}`}</div>
                    </div>
                    <div style={{ width: '85%', height: '75%', overflowY: 'auto', minWidth: 400 }}>
                        <table style={{ width: '97%' }}>
                            <tbody style={{ fontSize: 11, textAlign: 'center' }}>
                                <tr style={{ backgroundColor: '#606060', border: '1px solid' }}>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>AXLE LOAD</div>
                                        <div>({getUnits('kips', this.props.unitType === METRIC)})</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>AXLES/</div>
                                        <div>1000 TRUCKS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>EXPECTED</div>
                                        <div>REPETITIONS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>STRESS</div>
                                        <div>RATIO</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>ALLOWABLE</div>
                                        <div>REPETITIONS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>FATIGUE</div>
                                        <div>CONSUMED</div>
                                    </th>
                                </tr>
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>SINGLE AXLES</td>
                                </tr>
                                {this.renderListItems('singleItems')}
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>TANDEM AXLES</td>
                                </tr>
                                {this.renderListItems('tandemItems')}
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>TRIDEM AXLES</td>
                                </tr>
                                {this.renderListItems('tridemItems')}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_EROSION) {
            return (
                <div style={{ height: '100%' }}>
                    <div style={{ display: 'flex', width: '82%', justifyContent: 'space-between', fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
                        <div style={{ fontSize: 11 }}>{`TRAFFIC SUMMARY DETAILS: ${this.props.trafficSummaryDropdownValue}`}</div>
                        <div style={{ fontSize: 11 }}>{`TOTAL EROSION USED %: ${this.props.bondedConcreteErosionUsedValue}`}</div>
                    </div>
                    <div style={{ width: '85%', height: '75%', overflowY: 'auto', minWidth: 400 }}>
                        <table style={{ width: '97%' }}>
                            <tbody style={{ fontSize: 11, textAlign: 'center' }}>
                                <tr style={{ backgroundColor: '#606060', border: '1px solid' }}>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>AXLE LOAD</div>
                                        <div>({getUnits('kips', this.props.unitType === METRIC)})</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>AXLES/</div>
                                        <div>1000 TRUCKS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>EXPECTED</div>
                                        <div>REPETITIONS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>POWER</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>ALLOWABLE</div>
                                        <div>REPETITIONS</div>
                                    </th>
                                    <th style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                                        <div>EROSION</div>
                                        <div>CONSUMED</div>
                                    </th>
                                </tr>
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>SINGLE AXLES</td>
                                </tr>
                                {this.renderListItems('singleItems')}
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>TANDEM AXLES</td>
                                </tr>
                                {this.renderListItems('tandemItems')}
                                <tr style={{ backgroundColor: '#606060', color: 'white', fontSize: 11 }}>
                                    <td colSpan='6'>TRIDEM AXLES</td>
                                </tr>
                                {this.renderListItems('tridemItems')}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }

    render() {
        const { constructionType, projectType, type } = this.props.params; 
        return (
            <div className='summary-page' style={{ zIndex: 10, paddingTop: 10, display: 'flex', flex: '1 1 0%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ paddingLeft: 30, paddingTop: 10 }}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' />
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{constructionType}</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div onClick={browserHistory.goBack} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{ paddingLeft: 5, color: "#3299CC", textDecoration: 'underline', cursor: 'pointer', fontSize: 16 }}>Bonded Concrete</div>
                    </div></div>

                <div style={{ display: 'flex', width: 'calc(100% - 100px)', height: '100%', margin: '0 auto', flex: 1 }}>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Calculated Minimum Thickness</label>
                            <div ref='MinimumDesignThickness' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <Field className='form-group-div-input'
                                       name={OVERLAY_BONDED_MINIMUM_REQUIRED_THICKNESS}
                                       readOnly={true}
                                       type='text'
                                       spanValue={getUnits('in', this.props.unitType === METRIC)}
                                       isCalculatedOutput={true}
                                       component={FieldInput}
                                       customInputWidth='60%' />
                            </div>
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Recommended Design Thickness</label>
                            <div ref='RecommendedDesignThickness' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <Field className='form-group-div-input'
                                       name={OVERLAY_BONDED_DESIGN_THICKNESS}
                                       readOnly={true}
                                       type='text' 
                                       spanValue={getUnits('in', this.props.unitType === METRIC)}
                                       isCalculatedOutput={true}
                                       component={FieldInput}
                                       customInputWidth='60%' />
                            </div>
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Maximum Joint Spacing</label>
                            <div ref='MaximumJointSpacing' style={{ fontSize: 12 }}>Match spacing to existing joint spacing</div>
                        </div>
                        <div ref='ReportLogo' style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>

                    </div>
                    <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div style={{ width: '90%', display: 'flex' }}>
                            <div style={{ display: 'flex', width: '15%', justifyContent: 'center' }}>
                                <label style={{ fontSize: 15, paddingRight: 30 }}>Analysis</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Field name={SUMMARY_FORM_TOGGLE} buttonSelected={this.props[SUMMARY_FORM_TOGGLE]} options={[SUMMARY_FORM_SENSITIVITY, SUMMARY_FORM_CRACKING, SUMMARY_FORM_EROSION]} component={ToggleButton} />
                                {this.renderToogleSection()}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterForm formType='summaryForm' {...this.props} />
                <Popup type={BONDED_CONCRETE} popup={OVERLAY_SUMMARY_FORM_GRAPH_POPUP} />
            </div>
        );
    }

    getChildContext() {
        return { summaryContext: this };
    }
}

UnbondedBondedConcreteSummaryForm = reduxForm({
    form: OVERLAY_BONDED_CONCRETE_SUMMARY_FORM,
    destroyOnUnmount: false,
    initialValues: { [SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY }
})(UnbondedBondedConcreteSummaryForm);

function mapStateToProps(state, ownProps, context) {
    const selector = formValueSelector(OVERLAY_BONDED_CONCRETE_SUMMARY_FORM);
    const summaryFormToggle = selector(state, SUMMARY_FORM_TOGGLE);
    const bondedConcreteKValueGraphData = state.currentProject.overlayFormValues.bondedConcreteKValueGraphData;
    const bondedConcreteFlexuralStrengthGraphData = state.currentProject.overlayFormValues.bondedConcreteFlexuralStrengthGraphData;
    const bondedConcreteReliabilityGraphData = state.currentProject.overlayFormValues.bondedConcreteReliabilityGraphData;
    const bondedConcreteDesignLifeGraphData = state.currentProject.overlayFormValues.bondedConcreteDesignLifeGraphData;
    const bondedConcreteSlabsCrackedGraphData = state.currentProject.overlayFormValues.bondedConcreteSlabsCrackedGraphData;
    const trafficFormSelector = formValueSelector(OVERLAY_TRAFFIC_FORM);
    const trafficSummaryDropdownValue = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const bondedConcreteCrackingValues = state.currentProject.overlayFormValues.bondedConcreteCrackingValues;
    const bondedConcreteFaultingValues = state.currentProject.overlayFormValues.bondedConcreteFaultingValues;
    const bondedConcreteErosionUsedValue = state.currentProject.overlayFormValues.bondedConcreteErosionUsedValue;
    const bondedConcreteFatigueUsedValue = state.currentProject.overlayFormValues.bondedConcreteFatigueUsedValue;

    const bccUnDoweledDesignThickness = selector(state, OVERLAY_BONDED_DESIGN_THICKNESS);
    const bccUnDoweledMinimumThickness = selector(state, OVERLAY_BONDED_MINIMUM_REQUIRED_THICKNESS);   

    const globalForm = getFormValues(OVERLAY_GLOBAL_FORM)(state);
    const trafficForm = getFormValues(OVERLAY_TRAFFIC_FORM)(state);
    const concreteSubgradeForm = getFormValues(OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM)(state);
    const concreteSubbaseForm = getFormValues(OVERLAY_BONDED_CONCRETE_SUBBASE_FORM)(state);
    const concreteConcreteForm = getFormValues(OVERLAY_BONDED_CONCRETE_CONCRETE_FORM)(state);

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
        projectDetails, globalForm, trafficForm, bccUnDoweledDesignThickness, bccUnDoweledMinimumThickness, concreteSubgradeForm, concreteSubbaseForm, concreteConcreteForm,
        summaryFormToggle, bondedConcreteKValueGraphData, bondedConcreteFlexuralStrengthGraphData, bondedConcreteReliabilityGraphData, bondedConcreteDesignLifeGraphData, bondedConcreteSlabsCrackedGraphData, bondedConcreteCrackingValues, bondedConcreteFaultingValues, bondedConcreteErosionUsedValue, bondedConcreteFatigueUsedValue, trafficSummaryDropdownValue, unitType
    };
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
        value: dropdownValue + ' ' + getUnits('psi', isMetric), x: 5, y: startY, xPad: 65
    }];
    startY += 10;
    if (needModulusOfElasticity) {
        imgRefs.push({
            type: 'text', text: 'Modulus of Elasticity:', sm: true,
            value: concreteConcreteForm.modulusOfElasticity + ' ' + getUnits('psi', isMetric),
            x: 5, y: startY, xPad: 65
        });
        startY += 10;
    }

    if (needCalculatedFlexuralStrength) {
        imgRefs.push({
            type: 'text', text: 'Calculated Flexural Strength:', sm: true,
            value: concreteConcreteForm.calculatedFlexuralStrength + ' ' + getUnits('psi', isMetric),
            x: 5, y: startY, xPad: 80
        });
    }
    return imgRefs;
}

function buildConcreteSubbaseFormData(concreteSubbaseForm, isMetric) {
    if(concreteSubbaseForm.compositeKValueRadioButtonValue === 'compositeKValueRadioButtonValueUserDefined') {
        return [{
            type: 'text', text: 'User-Defined Composite K-Value of Substructure:',
            value: concreteSubbaseForm.userDefinedCompositeKValueOfSubstructure + ' ' +
            getUnits('psi/in', isMetric), x: 80, y: 10, xPad: 170, sm: true
        }];
    }
    return [{
        type: 'text', text: 'Calculated Composite K-Value of Substructure:',
        value: concreteSubbaseForm.compositeKValueOfSubstructure + ' ' +
        getUnits('psi/in', isMetric), x: 80, y: 10, xPad: 170, sm: true
    }];
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
        value: dropdownValue.toLocaleString() + unitValue, x: 290, y: 240, xPad: 70
    }];
    if (needCalculatedMrsgValue) {
        imgRefs.push({
            type: 'text', text: 'Calculated MRSG Value', sm: true,
            value: concreteSubgradeForm.calculatedMrsgValue.toLocaleString() + ' ' +
            getUnits('psi', isMetric), x: 290, y: 250, xPad: 70
        });
    }
    return imgRefs;
}

function mapDispatchToProps(dispatch) {
    let reportdate = Date();
    return {
        generatePdf: (summaryContext) => {
            const isMetric = summaryContext.props.unitType === METRIC;

            let imgRefs = [{
                title: '', x: 10, y: 10,
                fields: [
                    { type: 'png', ref: summaryContext.refs.ReportLogo, image: '', key: '', x: 10, y: 0 },
                    { type: 'text', text: 'DESIGN SUMMARY REPORT FOR', value: '', x: 200, y: 20, xPad: 70, lg: true },
                    { type: 'text', text: 'BONDED CONCRETE ON CONCRETE OVERLAY', value: '', x: 200, y: 35, xPad: 70, lg: true },
                    { type: 'text', text: 'REPORT PRODUCED ON:', value: '', x: 200, y: 50, xPad: 70, sm: true },
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
                    { type: 'text', text: '', value: 'Undoweled' + '            ', x: 5, y: 5, xPad: 125, sm: true },
                    { type: 'text', text: 'Recommended Design Thickness:',
                        value: summaryContext.props.bccUnDoweledDesignThickness + ' ' +
                        getUnits('in', isMetric), x: 5, y: 15, xPad: 125 },
                    { type: 'text', text: 'Calculated Minimum Thickness:',
                        value: summaryContext.props.bccUnDoweledMinimumThickness + ' ' +
                        getUnits('in', isMetric), x: 5, y: 25, xPad: 125 },
                    { type: 'text', text: 'Maximum Joint Spacing:',
                        value: ' Match to Existing Joint Spacing', x: 185, y: 15, xPad: 85 },
                    { type: 'line', plot: 'h', x: 5, y: 35, x2: 410, y2: 35 },
                ]
            },
            {
                title: 'Pavement Structure', x: 10, y: 220,
                fields: [
                    { type: 'text', text: 'SUBBASE', value: '', x: 5, y: 10, xPad: 0 },
                    // composite k-value (user provided or calculated) gets spliced here
                    { type: 'key', ref: '', image: '', key: '@PavementStructureSubbase', x: 5, y: 20 },

                    { type: 'text', text: 'CONCRETE', value: '', x: 5, y: 200, xPad: 0 },
                    // concreteConcreteFormData gets spliced here
                    { type: 'text', text: 'Macrofibers in Concrete:',
                        value: summaryContext.props.concreteConcreteForm.macrofibersInConcrete, x: 5, y: 240, xPad: 80, sm: true },
                    { type: 'text', text: 'Edge Support:',
                        value: summaryContext.props.concreteConcreteForm.edgeSupport, x: 5, y: 250, xPad: 80, sm: true },
                   
                   
                    { type: 'text', text: 'EXISTING CONCRETE', value: '', x: 150, y: 200, xPad: 0 },
                    { type: 'text', text: 'Thickness:',
                        value: summaryContext.props.concreteSubgradeForm.existingThickness + ' ' +
                        getUnits('in', isMetric), x: 150, y: 210, xPad: 110, sm: true },
                    { type: 'text', text: 'Unrepaired Joints, Cracks & Other:',
                        value: summaryContext.props.concreteSubgradeForm.jointCrackingTimeToLive + ' ' +
                        getUnits('#/mile', isMetric), x: 150, y: 220, xPad: 100, sm: true },
                    { type: 'text', text: 'Joints/Cracks Adjustment Factor:',
                        value: summaryContext.props.concreteSubgradeForm.jointCrackingAdjustmentFactor, x: 150, y: 230, xPad: 110, sm: true },
                    { type: 'text', text: 'Fatigue Adjustment Factor:',
                        value: summaryContext.props.concreteSubgradeForm.fatigueAdjustmentFactor, x: 150, y: 240, xPad: 110, sm: true },
                    { type: 'text', text: 'Durability Adjustment Factor:',
                        value: summaryContext.props.concreteSubgradeForm.durabilityAdjustmentFactor, x: 290, y: 200, xPad: 80, sm: true },
                    { type: 'text', text: 'Effective Thickness:',
                        value: summaryContext.props.concreteSubgradeForm.effectiveThickness + ' ' +
                        getUnits('in', isMetric), x: 290, y: 210, xPad: 80, sm: true },
                    { type: 'text', text: 'SUBGRADE', value: '', x: 315, y: 230, xPad: 0 },
                    // concreteSubbaseFormData gets spliced here
               
                    { type: 'line', x: 140, y: 200, x2: 140, y2: 250 },
                    { type: 'line', x: 300, y: 220, x2: 400, y2: 220 },
                    { type: 'line', x: 285, y: 200, x2: 285, y2: 250 },
                    { type: 'line', plot: 'h', x: 5, y: 255, x2: 410, y2: 255 },
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
                    { type: 'text', text: 'USER DEFINED TRAFFIC',
                        value: '', x: 60, y: 40, xPad: 0 },
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
                    { type: 'text', text: 'The PCA design methodology, from StreetPave, and AASHTO 93 was used to produce these results.',
                        value: '', x: 5, y: 15, xPad: 70 },
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
        },
    };
}

UnbondedBondedConcreteSummaryForm = connect(
    mapStateToProps, mapDispatchToProps
)(UnbondedBondedConcreteSummaryForm)

export default UnbondedBondedConcreteSummaryForm;
