import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePdf, showPopup, removePavementStructureType, addNotification, createNewProject } from 'Actions';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import { ToggleButton, FieldInput, Popup } from 'Components';
import '../../../../components/Forms/Forms.scss';
import { getUnits } from 'HelperFunctions/getUnits';
import { isEmpty } from 'underscore';
import {
    INTERMODAL_SUMMARY_FORM,
    INTERMODAL_STRUCTURE_FORM,
    INTERMODAL_SUBGRADE_FORM,
    INTERMODAL_CONCRETE_FORM,
    INTERMODAL_DESIGN_THICKNESS,
    INTERMODAL_MINIMUM_REQUIRED_THICKNESS,
    INTERMODAL_MAXIMUM_JOINT_SPACING,
    INTERMODAL_STRESS_RATIO,
    SUMMARY_FORM_JOINT_SPACING,
    SUMMARY_FORM_VEHICLES,
    SUMMARY_FORM_TOGGLE,
    METRIC
} from 'Constants';

class IntermodalSummaryForm extends Component {

    static childContextTypes = {
        summaryContext: PropTypes.object.isRequired,
    };

    renderToogleSection() {
        if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_VEHICLES) {
            const { vehiclesInfo } = this.props;
            return (
                <div>
                    {vehiclesInfo.length > 1 && <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}> <span style={{ fontSize: 40 }}>*</span> Control vehicle with greatest fatigue impact</div>}
                    <div ref='vehicleresults' style={{ display: 'flex', flexDirection: 'column', fontSize: 12, width: '62%', marginTop: !(vehiclesInfo.length > 1) ? 40 : 10, marginRight: 10 }}>
                        <div style={{ paddingLeft: 20 }}>
                            <label style={{ width: '35%', textAlign: 'center' }}>Vehicle Name</label>
                            <label style={{ width: '15%', textAlign: 'center' }}>Maximum Angle</label>
                            <label style={{ width: '15%', textAlign: 'center' }}>Maximum Stress</label>
                            <label style={{ width: '25%', textAlign: 'center' }}>Allowable Total Repetitions</label>
                            <label style={{ width: '10%', textAlign: 'center' }}>Thickness</label>
                        </div>
                        {vehiclesInfo && !isEmpty(vehiclesInfo) && vehiclesInfo.map((values, index) => {
                            const moreThanOneVehiclesPresent = vehiclesInfo.length > 1;
                            let stressRatio = values['stressRatio'] + getUnits('psi', this.props.unitType === METRIC);
                            let thickness   = values['thickness'  ] + getUnits( 'in', this.props.unitType === METRIC);
                            return (
                                <div key={index} style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', border: '1px solid', height: 40, paddingLeft: 20, marginRight: 15, alignItems: 'center', backgroundColor: moreThanOneVehiclesPresent && values.maxThickness ? 'lightblue' : 'white' }}>
                                        <div style={{ width: '35%', textAlign: 'center' }}>{values.name}</div>
                                        <div style={{ width: '15%', textAlign: 'center' }}>{values.angle}</div>
                                        <div style={{ width: '15%', textAlign: 'center' }}>{stressRatio}</div>
                                        <div style={{ width: '25%', textAlign: 'center' }}>{values['allowableRepetitions']}</div>
                                        <div style={{ width: '10%', textAlign: 'center' }}>{thickness}</div>
                                    </div>
                                    {moreThanOneVehiclesPresent && values.maxThickness && <div style={{ position: 'absolute', top: -9, right: 0, fontSize: 40 }}>*</div>}
                                </div>
                            )
                        }
                        )}

                    </div>

                </div>
            )
        }

        else if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_JOINT_SPACING) {
            return (
                <div style={{ height: '100%', backgroundColor: 'whitesmoke', borderRadius: '10px', padding: 10 }}>

                    <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                        <div style={{ marginBottom: 15 }}>
                            PavementDesigner does not include joint spacing as a design input variable.  PavementDesigner calculates the recommended joint spacing as 5.25 times the <a href="http://apps.acpa.org/applibrary/RadiusOfRelativeStiffness/" target="_blank">radius of relative stiffness</a>, which has been confirmed through field observations performed by ACPA across the U.S. to provide minimal risk of slab cracking in a variety of in situ conditions.</div>

                        <div style={{ marginBottom: 15 }}>
                            As an alternative, you may elect to determine joint spacing based on the ACPA formulas:</div>

                        <div style={{ marginBottom: 15, marginLeft: 50 }}>
                            RL	 =  T * C<sub>S</sub></div>

                        <div style={{ marginBottom: 15, marginLeft: 50 }}>
                            where:</div>

                        <div style={{ marginBottom: 15, marginLeft: 50 }}>
                            RL 	=	Recommended length between joints (See Notes 1 and 2)<br />
                            T 	=	Slab thickness (Either metric or English units) <br />
                            C<sub>S</sub> 	=	Support constant: <br />
                            Use 24; for subgrades or granular bases. <br />
                            Use 21; for stabilized (cement or asphalt) bases
                                           </div>

                        <div style={{ marginBottom: 15, fontStyle: "italic", marginLeft: 50 }}>
                            Notes:<br />1.  The spacing of transverse joints in plain (unreinforced) concrete pavement should not exceed 20 ft (6 m) for slabs less than 10 in. (250 mm) thick.<br />
                            2. 	A general rule-of-thumb requires that the transverse joint spacing should not exceed 150% of the longitudinal joint spacing.
                    </div>

                        <div style={{ marginBottom: 15, paddingBottom: 80 }}>
                            <div>You should always apply engineering judgment in selecting a joint spacing. This may include equally dividing your facility or lane geometry or require matching an existing or adjacent joint pattern.  Longer joint spacings than are recommended by PavementDesigner may be acceptable if local experience indicates good performance will result. Shorter lengths than recommended by PavementDesigner may further reduce the risk of transverse cracking slightly but may also increase construction and joint maintenance costs.  Be aware that in some countries slab dimensions may also be patented. </div>
                        </div>

                    </div>
                </div>

            )
        }

    }

    render() {

      const { projectType } = this.props.params;

        return (
            <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ zIndex: 10, paddingLeft: 30, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: 'column' }}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                    </div>
                <div style={{ display: "flex", width: "calc(100% - 100px)", height: "100%", margin: "0 auto", flex: 1 }}>
                    <div style={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Recommended Design Thickness</label>
                            <Field className='form-group-div-input' name={INTERMODAL_DESIGN_THICKNESS} readOnly={true} type="text"
                                   spanValue={getUnits('in', this.props.unitType === METRIC)}
                                   isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Calculated Minumim Thickness</label>
                            <Field className='form-group-div-input' name={INTERMODAL_MINIMUM_REQUIRED_THICKNESS} readOnly={true} type="text"
                                   spanValue={getUnits('in', this.props.unitType === METRIC)}
                                   isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Maximum Joint Spacing</label>
                            <Field className='form-group-div-input' name={INTERMODAL_MAXIMUM_JOINT_SPACING} readOnly={true} type="text"
                                   spanValue={getUnits('ft', this.props.unitType === METRIC)}
                                   isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Stress Ratio</label>
                            <Field className='form-group-div-input' name={INTERMODAL_STRESS_RATIO} readOnly={true} type="text"
                                   spanValue='%' isCalculatedOutput={true} component={FieldInput} customInputWidth='60%' />
                        </div>
                        <div ref='ReportLogo' style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>

                    </div>
                    <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div style={{ width: '90%', display: 'flex' }}>
                            <div style={{ display: 'flex', width: '5%', justifyContent: 'center' }}>

                            </div>
                            <div style={{ width: '100%' }}>
                                <div><label style={{ fontSize: 15, paddingRight: 10 }}>Results and Guidance</label></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Field name={SUMMARY_FORM_TOGGLE} buttonSelected={this.props[SUMMARY_FORM_TOGGLE]} options={[SUMMARY_FORM_VEHICLES, SUMMARY_FORM_JOINT_SPACING]} component={ToggleButton} />
                                </div>
                                {this.renderToogleSection()}
                            </div>
                        </div>
                    </div>
                    </div></div>

                <FooterForm formType='summaryForm' {...this.props} />
            </div>
        );
    }

    getChildContext() {
        return { summaryContext: this };
    }
}

IntermodalSummaryForm = reduxForm({
    form: INTERMODAL_SUMMARY_FORM,
    destroyOnUnmount: false,
    initialValues: {
        [SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_VEHICLES
    }
})(IntermodalSummaryForm);

function mapStateToProps(state) {

    const selector = formValueSelector(INTERMODAL_SUMMARY_FORM);
    const summaryFormToggle = selector(state, SUMMARY_FORM_TOGGLE);
    const intermodalDesignThickness = selector(state, INTERMODAL_DESIGN_THICKNESS);
    const intermodalMinimumThickness = selector(state, INTERMODAL_MINIMUM_REQUIRED_THICKNESS);
    const intermodalJointSpacing = selector(state, INTERMODAL_MAXIMUM_JOINT_SPACING);
    const intermodalStressRatio = selector(state, INTERMODAL_STRESS_RATIO);

    const concreteSubgradeForm = getFormValues(INTERMODAL_SUBGRADE_FORM)(state);
    const concreteSubbaseForm = getFormValues(INTERMODAL_STRUCTURE_FORM)(state);
    const concreteConcreteForm = getFormValues(INTERMODAL_CONCRETE_FORM)(state);

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
        vehiclesInfo: state.currentProject.intermodalFormValues.summaryVehiclesInfo,
        unitType: state.currentProject.projectDetails.unitType,
        summaryFormToggle,
        projectDetails,
        intermodalDesignThickness,
        intermodalMinimumThickness,
        intermodalJointSpacing,
        intermodalStressRatio,
        concreteSubgradeForm,
        concreteSubbaseForm,
        concreteConcreteForm
    };
}

function buildConcreteSubbaseFormData(concreteSubbaseForm, isMetric) {
    if(concreteSubbaseForm.compositeKValueRadioButtonValue === 'compositeKValueRadioButtonValueUserDefined') {
        return [{
            type: 'text', text: 'User-Defined Composite K-Value of Substructure:',
            value: concreteSubbaseForm.userDefinedCompositeKValueOfSubstructure + ' ' +
            getUnits('psi/in', isMetric), x: 80, y: 15, xPad: 170, sm: true
        }];
    }
    return [{
        type: 'text', text: 'Calculated Composite K-Value of Substructure:',
        value: concreteSubbaseForm.compositeKValueOfSubstructure + ' ' +
        getUnits('psi/in', isMetric), x: 80, y: 15, xPad: 170, sm: true
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
    let startY = 190;
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
        value: dropdownValue.toLocaleString() + unitValue, x: 290, y: 190, xPad: 70
    }];
    if (needCalculatedMrsgValue) {
        imgRefs.push({
            type: 'text', text: 'Calculated MRSG Value', sm: true,
            value: concreteSubgradeForm.calculatedMrsgValue.toLocaleString() + ' ' +
            getUnits('psi', isMetric), x: 290, y: 200, xPad: 70
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
                    { type: 'text', text: 'INTERMODAL CONCRETE PAVEMENT', value: '', x: 200, y: 35, xPad: 70, lg: true },
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
                    { type: 'text', text: '', value: 'Undoweled' + '            ', x: 5, y: 5, xPad: 125, sm: true },
                    { type: 'text', text: 'Recommended Design Thickness:',
                        value: summaryContext.props.intermodalDesignThickness + ' ' +
                        getUnits('in', isMetric), x: 5, y: 15, xPad: 125 },
                    { type: 'text', text: 'Calculated Minimum Thickness:',
                        value: summaryContext.props.intermodalMinimumThickness + ' ' +
                        getUnits('in', isMetric), x: 5, y: 25, xPad: 125 },
                    { type: 'text', text: '*Control vehicle with greatest fatigue impact', value: '', x: 5, y: 35, xPad: 125 },
                    { type: 'text', text: 'Maximum Joint Spacing:',
                        value: summaryContext.props.intermodalJointSpacing + ' ' +
                        getUnits('ft', isMetric), x: 235, y: 15, xPad: 100 },
                    { type: 'text', text: 'Stress Ratio:',
                        value: summaryContext.props.intermodalStressRatio + ' %', x: 235, y: 25, xPad: 100 },
                    { type: 'png', ref: summaryContext.refs.vehicleresults, image: '', key: '', x: 5, y: 35 },
                    { type: 'line', plot: 'h', x: 5, y: 180, x2: 410, y2: 180 },
                ]
            },
            {
                title: 'Pavement Structure', x: 10, y: 370,
                fields: [
                    { type: 'text', text: 'SUBBASE', value: '', x: 5, y: 15, xPad: 0 },
                    // composite k-value (user provided or calculated) gets spliced here
                    { type: 'key', ref: '', image: '', key: '@PavementStructureSubbase', x: 5, y: 25 },

                    { type: 'text', text: 'CONCRETE', value: '', x: 5, y: 180, xPad: 0 },
                    // concreteConcreteFormData gets spliced here
                    { type: 'text', text: 'Edge Support:', value: 'Yes', x: 150, y: 190, xPad: 80, sm: true },
                    { type: 'line', x: 280, y: 220, x2: 280, y2: 220 },
                    { type: 'text', text: 'SUBGRADE', value: '', x: 315, y: 180, xPad: 0 },
                    // concreteSubgradeFormData gets spliced here
                    { type: 'line', x: 285, y: 180, x2: 285, y2: 215 },
                    { type: 'line', plot: 'h', x: 5, y: 220, x2: 410, y2: 220 },
                ]
            },
            {
                title: 'Design Method', x: 10, y: 600,
                fields: [
                    { type: 'text', text: 'The ACPA AirPave design methodology was used to produce these results.',
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

    };
}

IntermodalSummaryForm = connect(
    mapStateToProps, mapDispatchToProps
)(IntermodalSummaryForm)

export default IntermodalSummaryForm;
