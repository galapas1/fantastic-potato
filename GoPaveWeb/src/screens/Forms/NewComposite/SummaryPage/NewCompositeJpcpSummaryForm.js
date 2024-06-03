import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePdf, showPopup, removePavementStructureType, addNotification, createNewProject } from 'Actions';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import { FieldInput, ToggleButton, Popup } from 'Components';
import ReactTooltip from 'react-tooltip';
import { getUnits } from 'HelperFunctions/getUnits';
import { browserHistory, withRouter } from 'react-router';
import '../../../../components/Forms/Forms.scss';
import {
    NEW_COMPOSITE_JPCP_SUMMARY_FORM,
    NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP,
    NEW_COMPOSITE_TRAFFIC_FORM,
    NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
    NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
    NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
    NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM,
    JPCP_DOWELED_DESIGN_THICKNESS,
    JPCP_UNDOWELED_DESIGN_THICKNESS,
    JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS,
    JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS,
    JPCP_DOWELED_MAXIMUM_JOINT_SPACING,
    JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING,
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
    SUMMARY_FORM_LOAD_TRANSFER,
    SUMMARY_FORM_JOINT_SPACING,
    SUMMARY_FORM_SENSITIVITY,
    SUMMARY_FORM_DOWELED,
    SUMMARY_FORM_UNDOWELED,
    SUMMARY_FORM_TOGGLE,
    JPCP_SUMMARY_FORM_THICKNESS_TOGGLE,
    SUMMARY_FORM_K_VALUE,
    SUMMARY_FORM_FLEXURAL_STRENGTH,
    SUMMARY_FORM_RELIABILITY,
    SUMMARY_FORM_DESIGN_LIFE,
    SUMMARY_FORM_SLABS_CRACKED,
    METRIC
} from 'Constants';

const radioKButtonTooltipMessage = 'Go Back to Pavement Structure';
const radioKButtonTooltipID = 'concretePavementStructureForm';

const newCompositeJpcpSummaryTooltipMessage = 'Dowels are not typically used in pavements <br />  less than 7 inches thick. Conventional round dowels are <br />  more difficult to use in thin pavements. Alternative dowel technologies<br />   and geometries  (such as plate dowels) may be considered if <br />  faulting is still a significant concern';
const newCompositeJpcpSummaryTooltipID = 'concreteJpcpSummaryRadioButton';

class NewCompositeJpcpSummaryForm extends Component {

    static childContextTypes = {
        summaryContext: PropTypes.object.isRequired,
    };

    onClickGraphButton(typePopup) {
        let graphData;
        let jpcpSummaryThicknessOption = this.props.jpcpSummaryFormThicknessToggle;
        if (typePopup === SUMMARY_FORM_K_VALUE && jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
            graphData = this.props.jpcpDoweledKValueGraphData;
        }
        if (typePopup === SUMMARY_FORM_K_VALUE && jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
            graphData = this.props.jpcpUndoweledKValueGraphData
        }

        if (typePopup === SUMMARY_FORM_FLEXURAL_STRENGTH && jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
            graphData = this.props.jpcpDoweledFlexuralStrengthGraphData;
        }
        if (typePopup === SUMMARY_FORM_FLEXURAL_STRENGTH && jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
            graphData = this.props.jpcpUndoweledFlexuralStrengthGraphData;
        }

        if (typePopup === SUMMARY_FORM_RELIABILITY && jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
            graphData = this.props.jpcpDoweledReliabilityGraphData;
        }
        if (typePopup === SUMMARY_FORM_RELIABILITY && jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
            graphData = this.props.jpcpUndoweledReliabilityGraphData;
        }

        if (typePopup === SUMMARY_FORM_DESIGN_LIFE && jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
            graphData = this.props.jpcpDoweledDesignLifeGraphData;
        }
        if (typePopup === SUMMARY_FORM_DESIGN_LIFE && jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
            graphData = this.props.jpcpUndoweledDesignLifeGraphData;
        }

        if (typePopup === SUMMARY_FORM_SLABS_CRACKED && jpcpSummaryThicknessOption === SUMMARY_FORM_DOWELED) {
            graphData = this.props.jpcpDoweledSlabsCrackedGraphData;
        }
        if (typePopup === SUMMARY_FORM_SLABS_CRACKED && jpcpSummaryThicknessOption === SUMMARY_FORM_UNDOWELED) {
            graphData = this.props.jpcpUndoweledSlabsCrackedGraphData;
        }

        this.props.showPopup(NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP, { type: typePopup }, graphData)
    }

    renderListItems(type) {
        let object;
        let displayOption = this.props[SUMMARY_FORM_TOGGLE];
        let dowelOption = this.props[JPCP_SUMMARY_FORM_THICKNESS_TOGGLE];

        if (dowelOption === SUMMARY_FORM_DOWELED && displayOption === SUMMARY_FORM_CRACKING) {
            object = this.props.doweledCrackingValues;
        } else if (dowelOption === SUMMARY_FORM_UNDOWELED && displayOption === SUMMARY_FORM_CRACKING) {
            object = this.props.undoweledCrackingValues;
        } else if (dowelOption === SUMMARY_FORM_DOWELED && displayOption === SUMMARY_FORM_EROSION) {
            object = this.props.doweledFaultingValues;
        } else if (dowelOption === SUMMARY_FORM_UNDOWELED && displayOption === SUMMARY_FORM_EROSION) {
            object = this.props.undoweledFaultingValues;
        }

        let displayItems = object[type];

        let items = [];
        for (let i = 0; i < 10; i++) {
            //const item = axleValuesObj;
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
        let dowelOption = this.props.jpcpSummaryFormThicknessToggle;
        const isMetric = this.props.unitType === METRIC;
        if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_SENSITIVITY) {
            return (
                <div>
                    <div style={{ display: 'flex', marginTop: 20, paddingBottom: 10 }}>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_K_VALUE)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/kValueGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>K-Value</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_FLEXURAL_STRENGTH)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/FlexuralStrengthGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Flexural Strength</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_DESIGN_LIFE)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/DesignLifeGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Design Life</label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 20, justifyContent: 'center', paddingBottom: 80 }}>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_RELIABILITY)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/ReliabilityGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
                            <label>Reliability</label>
                        </div>
                        <div style={{ width: '33%', height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={this.onClickGraphButton.bind(this, SUMMARY_FORM_SLABS_CRACKED)} style={{ width: '100%', height: 175, backgroundImage: 'url(/images/DesignLifeGraph.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer', boxShadow: '5px 5px 10px', marginBottom: 10, backgroundSize: 'cover' }}></div>
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
                        <div style={{ fontSize: 11 }}>{`TOTAL FATIGUE USED %: ${dowelOption === SUMMARY_FORM_DOWELED ? this.props.doweledFatigueUsedValue : this.props.undoweledFatigueUsedValue}`}</div>
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
                        <div style={{ fontSize: 11 }}>{`TOTAL EROSION USED %: ${dowelOption === SUMMARY_FORM_DOWELED ? this.props.doweledErosionUsedValue : this.props.undoweledErosionUsedValue}`}</div>
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

        else if (this.props[SUMMARY_FORM_TOGGLE] === SUMMARY_FORM_LOAD_TRANSFER) {
            if (isMetric) {
                return (
                    <div style={{ height: '100%', backgroundColor: 'whitesmoke', borderRadius: '10px', padding: 10 }}>

                        <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                            <div style={{ marginBottom: 15 }}>
                                The key to excellent long-term performance of doweled joints is adequate load transfer over the life of the pavement. Load transfer devices generally are recommended for jointed plain concrete pavements that have an initial design thickness greater than about 200 mm because traffic levels that require such thicknesses for fatigue resistance also are of a level that might result in pumping and faulting of the joints if load transfer devices are not included in the joints. When the initial design thickness is less than 200 mm, load transfer devices are recommended only if faulting is the predicted cause of failure. </div>

                            <div style={{ marginBottom: 15 }}>
                                Although other geometries (e.g., elliptical, plate, square, etc.) and materials (e.g., stainless or microcomposite steel, zinc alloy-sleeved, etc.) can be used to transfer load across transverse joints in jointed plain concrete pavements, round and smooth steel dowel bars are the most commonly used load transfer device. Typical size recommendations for round steel dowel bars placed at 300 mm on-center are:</div>

                            <div style={{ marginBottom: 15, fontWeight: "bold" }}>
                                Recommended Dowel Bar Size </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
                                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Concrete Design Thickness, mm</span></div>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Dowel Bar Size, mm</span></div>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 203.2 mm and cracking is predicated cause of failure </div>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Dowel not recommended </div>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 203.2 mm and faulting is predicted cause of failure </div>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>25.40 mm </div>
                            </div>   <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>between 203.2 mm and 254 mm </div>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>31.75 mm </div>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>greater than 254 mm </div>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>38.10 mm </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 15, paddingBottom: 80 }}>
                            <div>Required load transfer device size and spacing can, however, vary based on load transfer technology geometry and material (see manufacturer's recommendations), and some non-uniform spacings offer opportunities to optimize/minimize steel content at the joints while causing minimal impacts on pavement responses (<a href="http://www.acpa.org/dowelcad" target="_blank"><span>see ACPA's DowelCAD 2.0</span></a>). Other exceptions also exist, like the lack of a need for load transfer devices in bonded concrete overlays on asphalt or composite pavements.  The National Concrete Consortium (NCC) also has developed, ''Recommendations for Standardized Dowel Load Transfer Systems for Jointed Concrete Pavements,'' which are available through the <a href="http://www.cptechcenter.org" target="_blank"><span>National Concrete Pavement Technology (CP Tech) Center</span></a></div>
                        </div>

                    </div>

                )
            }
            return (
                <div style={{ height: '100%', backgroundColor: 'whitesmoke', borderRadius: '10px', padding: 10 }}>

                    <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
                        <div style={{ marginBottom: 15 }}>
                            The key to excellent long-term performance of doweled joints is adequate load transfer over the life of the pavement. Load transfer devices generally are recommended for jointed plain concrete pavements that have an initial design thickness greater than about 8 inches (200 mm) because traffic levels that require such thicknesses for fatigue resistance also are of a level that might result in pumping and faulting of the joints if load transfer devices are not included in the joints. When the initial design thickness is less than 8 inches (200 mm), load transfer devices are recommended only if faulting is the predicted cause of failure. </div>

                        <div style={{ marginBottom: 15 }}>
                            Although other geometries (e.g., elliptical, plate, square, etc.) and materials (e.g., stainless or microcomposite steel, zinc alloy-sleeved, etc.) can be used to transfer load across transverse joints in jointed plain concrete pavements, round and smooth steel dowel bars are the most commonly used load transfer device. Typical size recommendations for round steel dowel bars placed at 12 in. (300 mm) on-center are:</div>

                        <div style={{ marginBottom: 15, fontWeight: "bold" }}>
                            Recommended Dowel Bar Size </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, border: '1px solid' }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid', backgroundColor: 'rgb(50, 153, 204)' }}>
                            <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Concrete Design Thickness, in.</span></div>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}> <span style={{ color: 'white' }}>Dowel Bar Size, in.</span></div>
                        </div>
                        <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                            <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 8 in. and cracking is predicated cause of failure </div>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>Dowel not recommended </div>
                        </div>
                        <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                            <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>less than 8 in. and faulting is predicted cause of failure </div>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.00 in. </div>
                        </div>   <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                            <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>between 8 in. and 10 in. </div>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.25 in. </div>
                        </div>
                        <div style={{ display: 'flex', borderBottom: '1px solid' }}>
                            <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>greater than 10 in. </div>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid' }}>1.50 in. </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 15, paddingBottom: 80 }}>
                        <div>Required load transfer device size and spacing can, however, vary based on load transfer technology geometry and material (see manufacturer's recommendations), and some non-uniform spacings offer opportunities to optimize/minimize steel content at the joints while causing minimal impacts on pavement responses (<a href="http://www.acpa.org/dowelcad" target="_blank"><span>see ACPA's DowelCAD 2.0</span></a>). Other exceptions also exist, like the lack of a need for load transfer devices in bonded concrete overlays on asphalt or composite pavements.  The National Concrete Consortium (NCC) also has developed, ''Recommendations for Standardized Dowel Load Transfer Systems for Jointed Concrete Pavements,'' which are available through the <a href="http://www.cptechcenter.org" target="_blank"><span>National Concrete Pavement Technology (CP Tech) Center</span></a></div>
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
        const customSpanStyle = { 'backgroundColor': 'lightgray' };
        const customInputStyle = { 'backgroundColor': 'lightgray' };
        let tooltipAndStylesForDowelslessThanSevenInches = {
            ...(parseFloat(this.props[JPCP_UNDOWELED_DESIGN_THICKNESS]) < 7 && { 'showTooltip': true, 'tooltipId': newCompositeJpcpSummaryTooltipID, 'toolTipMessage': newCompositeJpcpSummaryTooltipMessage, customSpanStyle, customInputStyle })
        };
        return (
            <div className='summary-page' style={{ zIndex: 10, paddingTop: 10, display: 'flex', flex: '1 1 0%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ paddingLeft: 30, paddingTop: 10 }}>
                    <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                        <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' />
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Street</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>New Composite</div>
                        <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
                        <div onClick={browserHistory.goBack} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{ paddingLeft: 5, color: "#3299CC", textDecoration: 'underline', cursor: 'pointer', fontSize: 16 }}>JPCP</div>
                    </div></div>
                <div style={{ display: 'flex', width: 'calc(100% - 100px)', height: '100%', margin: '0 auto', flex: 1 }}>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Calculated Minimum Thickness</label>
                            <div ref='MinimumDesignThickness' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Doweled</div>
                                    <Field className='form-group-div-input' name={JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS} readOnly={true} type='text'
                                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Undoweled</div>
                                    <Field className='form-group-div-input' name={JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS} readOnly={true} type='text'
                                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} />
                                </div>
                            </div>
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Recommended Design Thickness</label>
                            <div ref='RecommendedDesignThickness' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Doweled</div>
                                    <ReactTooltip id={newCompositeJpcpSummaryTooltipID} multiline={true} place='right' type='warning' effect='solid' />
                                    <Field className='form-group-div-input' name={JPCP_DOWELED_DESIGN_THICKNESS} readOnly={true} type='text'
                                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} {...tooltipAndStylesForDowelslessThanSevenInches} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Undoweled</div>
                                    <Field className='form-group-div-input' name={JPCP_UNDOWELED_DESIGN_THICKNESS} readOnly={true} type='text'
                                           spanValue={getUnits('in', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} />
                                </div>
                            </div>
                        </div>
                        <div className='form-group-div' style={{ width: '100%', marginBottom: 20 }}>
                            <label style={{ paddingBottom: 20, fontSize: 15 }}>Maximum Joint Spacing</label>
                            <div ref='MaximumJointSpacing' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Doweled</div>
                                    <Field className='form-group-div-input' name={JPCP_DOWELED_MAXIMUM_JOINT_SPACING} readOnly={true} type='text'
                                           spanValue={getUnits('ft', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit' }}>
                                    <div style={{ paddingBottom: 20, fontSize: 12 }}>Undoweled</div>
                                    <Field className='form-group-div-input' name={JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING} readOnly={true} type='text'
                                           spanValue={getUnits('ft', this.props.unitType === METRIC)}
                                           isCalculatedOutput={true} component={FieldInput} />
                                </div>
                            </div>
                        </div>
                        <div ref='ReportLogo' style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>

                    </div>
                    <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                        <div style={{ width: '90%', display: 'flex' }}>
                            <div style={{ display: 'flex', width: '5%', justifyContent: 'center' }}>

                            </div>
                            <div style={{ width: '100%' }}>
                                <div><label style={{ fontSize: 15, paddingRight: 10 }}>Analysis and Guidance</label></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Field name={SUMMARY_FORM_TOGGLE} buttonSelected={this.props[SUMMARY_FORM_TOGGLE]} options={[SUMMARY_FORM_SENSITIVITY, SUMMARY_FORM_CRACKING, SUMMARY_FORM_EROSION, SUMMARY_FORM_LOAD_TRANSFER, SUMMARY_FORM_JOINT_SPACING]} component={ToggleButton} />
                                    <Field name={JPCP_SUMMARY_FORM_THICKNESS_TOGGLE} buttonSelected={this.props[JPCP_SUMMARY_FORM_THICKNESS_TOGGLE]} options={[SUMMARY_FORM_DOWELED, SUMMARY_FORM_UNDOWELED]} component={ToggleButton} />
                                </div>
                                {this.renderToogleSection()}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterForm formType='summaryForm' {...this.props} />
                <Popup type='JPCP' jpcpSummaryThicknessOption={this.props.jpcpSummaryFormThicknessToggle} popup={NEW_COMPOSITE_SUMMARY_FORM_GRAPH_POPUP} />
            </div>
        );
    }

    getChildContext() {
        return { summaryContext: this };
    }
}

NewCompositeJpcpSummaryForm = reduxForm({
    form: NEW_COMPOSITE_JPCP_SUMMARY_FORM,
    destroyOnUnmount: false,
    initialValues: {
        [SUMMARY_FORM_TOGGLE]: SUMMARY_FORM_SENSITIVITY,
        [JPCP_SUMMARY_FORM_THICKNESS_TOGGLE]: SUMMARY_FORM_DOWELED
    }
})(NewCompositeJpcpSummaryForm);

function mapStateToProps(state, ownProps, context) {
    const selector = formValueSelector(NEW_COMPOSITE_JPCP_SUMMARY_FORM);
    const summaryFormToggle = selector(state, SUMMARY_FORM_TOGGLE);
    const jpcpSummaryFormThicknessToggle = selector(state, JPCP_SUMMARY_FORM_THICKNESS_TOGGLE);

    const jpcpDoweledDesignThickness = selector(state, JPCP_DOWELED_DESIGN_THICKNESS);
    const jpcpDoweledMinimumThickness = selector(state, JPCP_DOWELED_MINIMUM_REQUIRED_THICKNESS);
    const jpcpUnDoweledDesignThickness = selector(state, JPCP_UNDOWELED_DESIGN_THICKNESS);
    const jpcpUnDoweledMinimumThickness = selector(state, JPCP_UNDOWELED_MINIMUM_REQUIRED_THICKNESS);
    const jpcpDoweledJointSpacing = selector(state, JPCP_DOWELED_MAXIMUM_JOINT_SPACING);
    const jpcpUnDoweledJointSpacing = selector(state, JPCP_UNDOWELED_MAXIMUM_JOINT_SPACING);


    const jpcpDoweledKValueGraphData = state.currentProject.newCompositeFormValues.jpcpDoweledKValueGraphData;
    const jpcpUndoweledKValueGraphData = state.currentProject.newCompositeFormValues.jpcpUndoweledKValueGraphData;
    const jpcpDoweledFlexuralStrengthGraphData = state.currentProject.newCompositeFormValues.jpcpDoweledFlexuralStrengthGraphData;
    const jpcpUndoweledFlexuralStrengthGraphData = state.currentProject.newCompositeFormValues.jpcpUndoweledFlexuralStrengthGraphData;
    const jpcpDoweledReliabilityGraphData = state.currentProject.newCompositeFormValues.jpcpDoweledReliabilityGraphData;
    const jpcpUndoweledReliabilityGraphData = state.currentProject.newCompositeFormValues.jpcpUndoweledReliabilityGraphData;
    const jpcpDoweledDesignLifeGraphData = state.currentProject.newCompositeFormValues.jpcpDoweledDesignLifeGraphData;
    const jpcpUndoweledDesignLifeGraphData = state.currentProject.newCompositeFormValues.jpcpUndoweledDesignLifeGraphData;
    const jpcpDoweledSlabsCrackedGraphData = state.currentProject.newCompositeFormValues.jpcpDoweledSlabsCrackedGraphData;
    const jpcpUndoweledSlabsCrackedGraphData = state.currentProject.newCompositeFormValues.jpcpUndoweledSlabsCrackedGraphData;

    const doweledCrackingValues = state.currentProject.newCompositeFormValues.jpcpDoweledCrackingValues;
    const undoweledCrackingValues = state.currentProject.newCompositeFormValues.jpcpUndoweledCrackingValues;
    const doweledFaultingValues = state.currentProject.newCompositeFormValues.jpcpDoweledFaultingValues;
    const undoweledFaultingValues = state.currentProject.newCompositeFormValues.jpcpUndoweledFaultingValues;

    const doweledFatigueUsedValue = state.currentProject.newCompositeFormValues.jpcpDoweledFatigueUsedValue;
    const undoweledFatigueUsedValue = state.currentProject.newCompositeFormValues.jpcpUndoweledFatigueUsedValue;
    const doweledErosionUsedValue = state.currentProject.newCompositeFormValues.jpcpDoweledErosionUsedValue;
    const undoweledErosionUsedValue = state.currentProject.newCompositeFormValues.jpcpUndoweledErosionUsedValue;

    const trafficFormSelector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trafficSummaryDropdownValue = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);

    const globalForm = getFormValues(NEW_COMPOSITE_JPCP_SUBGRADE_FORM)(state);
    const trafficForm = getFormValues(NEW_COMPOSITE_TRAFFIC_FORM)(state);
    const calculatedtrafficForm = getFormValues(NEW_COMPOSITE_CALCULATED_TRAFFIC_RESULTS_FORM)(state);
    const concreteSubgradeForm = getFormValues(NEW_COMPOSITE_JPCP_SUBGRADE_FORM)(state);
    const concreteSubbaseForm = getFormValues(NEW_COMPOSITE_JPCP_STRUCTURE_FORM)(state);
    const concreteConcreteForm = getFormValues(NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM)(state);

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
        projectDetails,
        globalForm,
        trafficForm,
        calculatedtrafficForm,
        concreteSubgradeForm,
        concreteSubbaseForm,
        concreteConcreteForm,
        summaryFormToggle,
        jpcpDoweledDesignThickness,
        jpcpDoweledMinimumThickness,
        jpcpUnDoweledDesignThickness,
        jpcpUnDoweledMinimumThickness,
        jpcpDoweledJointSpacing,
        jpcpUnDoweledJointSpacing,
        jpcpDoweledKValueGraphData,
        jpcpUndoweledKValueGraphData,
        jpcpDoweledFlexuralStrengthGraphData,
        jpcpUndoweledFlexuralStrengthGraphData,
        jpcpDoweledReliabilityGraphData,
        jpcpUndoweledReliabilityGraphData,
        jpcpDoweledDesignLifeGraphData,
        jpcpUndoweledDesignLifeGraphData,
        jpcpSummaryFormThicknessToggle,
        doweledCrackingValues,
        undoweledCrackingValues,
        doweledFaultingValues,
        undoweledFaultingValues,
        trafficSummaryDropdownValue,
        doweledFatigueUsedValue,
        undoweledFatigueUsedValue,
        doweledErosionUsedValue,
        undoweledErosionUsedValue,
        jpcpDoweledSlabsCrackedGraphData,
        jpcpUndoweledSlabsCrackedGraphData,
        jpcpDoweledDesignThickness,
        unitType,
    };
}

function buildConcreteSubbaseFormData(concreteSubbaseForm, isMetric) {
    if(concreteSubbaseForm.compositeKValueRadioButtonValue === 'compositeKValueRadioButtonValueUserDefined') {
        return [{
            type: 'text', text: 'User-Defined Composite K-Value of Substructure:',
            value: concreteSubbaseForm.userDefinedCompositeKValueOfSubstructure + ' ' +
            getUnits('psi/in', isMetric), x: 5, y: 25, xPad: 170, sm: true
        }];
    }
    return [{
        type: 'text', text: 'Calculated Composite K-Value of Substructure:',
        value: concreteSubbaseForm.compositeKValueOfSubstructure + ' ' +
        getUnits('psi/in', isMetric), x: 5, y: 25, xPad: 170, sm: true
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

function mapDispatchToProps(dispatch, ownProps, context) {
    let reportdate = Date();
    return {
        generatePdf: (summaryContext) => {
            const isMetric = summaryContext.props.unitType === METRIC;

            let imgRefs = [{
                title: '', x: 10, y: 10,
                fields: [
                    { type: 'png', ref: summaryContext.refs.ReportLogo, image: '', key: '', x: 10, y: 0 },
                    { type: 'text', text: 'DESIGN SUMMARY REPORT FOR', value: '', x: 200, y: 20, xPad: 70, lg: true },
                    { type: 'text', text: 'COMPOSITE JOINTED-PLAIN CONCRETE PAVEMENT (JPCP)', value: '', x: 200, y: 35, xPad: 70, lg: true },
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
                        { type: 'text', text: '', value: 'Doweled' + '            ' + 'Undoweled' + '    ', x: 5, y: 5, xPad: 125, sm: true },
                        { type: 'text', text: 'Recommended Design Thickness:',
                            value: summaryContext.props.jpcpDoweledDesignThickness + ' ' +
                            getUnits('in', isMetric) + '          ' + summaryContext.props.jpcpUnDoweledDesignThickness + ' ' +
                            getUnits('in', isMetric), x: 5, y: 15, xPad: 125 },
                        { type: 'text', text: 'Calculated Minimum Thickness:',
                            value: summaryContext.props.jpcpDoweledMinimumThickness + ' ' +
                            getUnits('in', isMetric) + '          ' + summaryContext.props.jpcpUnDoweledMinimumThickness + ' ' +
                            getUnits('in', isMetric), x: 5, y: 25, xPad: 125 },
                        { type: 'text', text: '',
                            value: 'Doweled' + '         ' + 'Undoweled' + '    ', x: 235, y: 5, xPad: 100, sm: true },
                        { type: 'text', text: 'Maximum Joint Spacing:',
                            value: summaryContext.props.jpcpDoweledJointSpacing + ' ' +
                            getUnits('ft', isMetric) + '            ' + summaryContext.props.jpcpUnDoweledJointSpacing + ' ' +
                            getUnits('ft', isMetric), x: 235, y: 15, xPad: 100 },
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
                        { type: 'text', text: 'Edge Support:',
                            value: summaryContext.props.concreteConcreteForm.edgeSupport, x: 150, y: 210, xPad: 80, sm: true },
                        { type: 'text', text: 'Macrofibers in Concrete:',
                            value: summaryContext.props.concreteConcreteForm.macrofibersInConcrete, x: 150, y: 220, xPad: 80, sm: true },
                        { type: 'line', x: 280, y: 190, x2: 280, y2: 240 },
                        { type: 'text', text: 'SUBGRADE', value: '', x: 315, y: 200, xPad: 0 },
                        // concreteSubgradeFormData gets spliced here
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
                        value: summaryContext.props.calculatedtrafficForm.averageTrucksPerDayInDesignLaneOverDesignLife, x: 225, y: 50, xPad: 145, sm: true
                    },
                    {
                        type: 'text', text: 'Total Trucks in Design Lane Over the  Design Life:',
                        value: summaryContext.props.calculatedtrafficForm.totalTrucksInDesignLaneOverDesignLife, x: 225, y: 60, xPad: 145, sm: true
                    },
                    { type: 'line', plot: 'h', x: 5, y: 90, x2: 410, y2: 90 },
                    ]
                },
                {
                    title: 'Design Method', x: 10, y: 600,
                    fields: [
                        { type: 'text', text: 'The PCA design methodology from StreetPave, was used to produce these results.',
                            value: '', x: 5, y: 15, xPad: 70 },
                    ]
                },
                {
                    title: '', x: 0, y: 0,
                    fields: [
                      { type: 'no-preview' },
                    ]
                }
            ];

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

NewCompositeJpcpSummaryForm = connect(
    mapStateToProps, mapDispatchToProps,
)(NewCompositeJpcpSummaryForm)

export default NewCompositeJpcpSummaryForm;
