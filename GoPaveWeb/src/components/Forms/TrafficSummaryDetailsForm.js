import React , { Component } from 'react';
import './TrafficSummaryDetails.scss';
import { TrafficSummaryDetailsData } from 'Data/trafficSummary';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType,
         setInitialCustomTrafficSpectrumFormValues, setTrafficSummaryDetailFormValues } from 'Actions';
import { getUnits } from 'HelperFunctions/getUnits';

import {
  METRIC
} from  'Constants';

const axelImageHeight = 20;
const tableHeaderWidth = 52;

class TrafficSummaryDetailsForm extends Component {

    shouldComponentUpdate(nextProps){
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }

    componentWillReceiveProps(nextProps) {
        const { unitType } = nextProps;
        const useMetric = unitType === METRIC ? 1 : 0;

        // This is only needed when custom Traffic Spectrum is selected and it has not been set. 
        // In this case, we use the old dropdown value and display its Traffic Spectrum values
        // Ideal solution would to use local state instead of redux state. 
        // But, local state does not work because when user leaves the page, local state goes away.
        // Because of above limitation, a redux store value (concreteInitialCustomTrafficSpectrumFormValues) 
        // needs to be added which remembers the old values.
        if (nextProps.trafficDropdown === 'Custom Traffic Spectrum' &&
            nextProps.trafficDropdown !== this.props.trafficDropdown && 
            !nextProps.customTrafficSpectrumFormValues){
            if(!!TrafficSummaryDetailsData[this.props.trafficDropdown]) {
                this.props.setInitialCustomTrafficSpectrumFormValues(nextProps.module, 
                    TrafficSummaryDetailsData[this.props.trafficDropdown][useMetric]);
            }
        }

        // Need to set Traffic Summary Detail Form Values in the store so that store has access to 
        // it to send to Backend for multiple purposes.  // This only needs to be set if current dropdown 
        // value has changed and current dropdown value is not Custom Traffic Spectrum Traffic Summary 
        // Detail Form Values from the store is set to the Custom Traffic Spectrum in CustomTrafficSpectrumForm 
        // when user hits Apply
        if (nextProps.trafficDropdown !== this.props.trafficDropdown && 
            nextProps.trafficDropdown !== 'Custom Traffic Spectrum') {
            if(!!TrafficSummaryDetailsData[nextProps.trafficDropdown]) {
                this.props.setTrafficSummaryDetailFormValues(nextProps.module,
                    TrafficSummaryDetailsData[nextProps.trafficDropdown][useMetric]);  
            }
        }
    }

    renderListItems(typeOfAxle) {
        if (!TrafficSummaryDetailsData) {
            return;
        }

        const trafficDropdownValue = this.props.trafficDropdown;

        if (!trafficDropdownValue) {
            return;
        }

        const useMetric = (this.props.unitType === METRIC) ? 1 : 0;

        let axleValuesObject = [];

        if (trafficDropdownValue === 'Custom Traffic Spectrum') {
            if(this.props.customTrafficSpectrumFormValues &&
                this.props.customTrafficSpectrumFormValues[typeOfAxle]) {

                axleValuesObject = this.props.customTrafficSpectrumFormValues[typeOfAxle];
            } else if (this.props.concreteInitialCustomTrafficSpectrumFormValues &&
                this.props.concreteInitialCustomTrafficSpectrumFormValues[typeOfAxle]) {

                axleValuesObject = this.props.concreteInitialCustomTrafficSpectrumFormValues[typeOfAxle]; 
            }
        } else {
            axleValuesObject = TrafficSummaryDetailsData[trafficDropdownValue][useMetric][typeOfAxle];  
        }

        let items = [];

        for (let i = 0; i < axleValuesObject.length; i++) {
            const item = axleValuesObject[i];
            items.push(<tr key={`${trafficDropdownValue}${item.axleLoad},${item.axlesPer1000},${typeOfAxle},${i}`}> 
                <td style={{backgroundColor: '#DEB887'}}>{item.axleLoad}</td>
                <td style={{backgroundColor: 'white'}}>{item.axlesPer1000}</td>
                </tr>);
        }
        return items;
    }

    render() {
        return (
            <div className='traffic-summary-form' style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
                    width: "100%"}}>
                <div style={{ width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>TRAFFIC SUMMARY DETAILS</div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                 <div style={{marginRight: 5, marginTop: (2 * axelImageHeight) + 1}}>
                  <div style={{display: "flex"}}>
                   <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div>
                   <div style={{fontSize: 12, width: tableHeaderWidth}}>Single</div>
                 </div>
                <div>
            <table>
                <tbody style={{fontSize: 11, textAlign: "center"}}>
                <tr style={{backgroundColor: "#606060"}}>
                 <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
                  <div>AXLE</div>
                  <div>LOAD</div>
                  <div>({getUnits('kips', this.props.unitType === METRIC)})</div>
                 </th>
                <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
                 <div>AXLES/</div>
                 <div>1000</div>
                 <div>TRUCKS</div>
                </th>
                </tr>
                {this.renderListItems('singleItems')} 
                </tbody>
            </table>
            </div>
            </div>
            <div style={{marginRight: 5, marginTop: axelImageHeight + 1}}>
                <div style={{display: "flex"}}>
                <div style={{width: 53}}>
                    <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div>
                    <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 3, fontSize: 12, width: tableHeaderWidth}}>Tandem</div>
                </div>
                <div>
                 <table>
                 <tbody style={{fontSize: 11, textAlign: "center"}}>
                    <tr style={{backgroundColor: "#606060"}}>
                     <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
                        <div>AXLE</div>
                        <div>LOAD</div>
                        <div>({getUnits('kips', this.props.unitType === METRIC)})</div>
                    </th>
                    <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
                        <div>AXLES/</div>
                        <div>1000</div>
                        <div>TRUCKS</div>
                    </th>
                    </tr>
                    {this.renderListItems('tandemItems')} 
                </tbody>
                </table>
                </div>
            </div>
    <div style={{marginRight: 5}}>
    <div style={{display: "flex"}}>
    <div style={{width: 53}}>
    <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div>
    <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div>
    <div style={{backgroundImage: "url(/images/Axel_icon.png)", backgroundRepeat: "no-repeat",height: 15, width: tableHeaderWidth, marginBottom: 5 }}></div> 
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 3, fontSize: 12, width: tableHeaderWidth}}>Tridem</div>
    </div>
    <div>
    <table>
    <tbody style={{fontSize: 11, textAlign: "center"}}>
    <tr style={{backgroundColor: "#606060"}}>
    <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
    <div>AXLE</div>
    <div>LOAD</div>
    <div>({getUnits('kips', this.props.unitType === METRIC)})</div>
    </th>
    <th style={{fontSize: 11, color: "white", textAlign: "center"}}>
    <div>AXLES/</div>
    <div>1000</div>
    <div>TRUCKS</div>
    </th>
    </tr>
    {this.renderListItems('tridemItems')}
    </tbody>
    </table>
    </div>
    </div>
    </div> 
    </div>
);
    }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setInitialCustomTrafficSpectrumFormValues: (module, values) => {
            dispatch(setInitialCustomTrafficSpectrumFormValues(module, values));
        },
        setTrafficSummaryDetailFormValues: (module, values) => {
            dispatch(setTrafficSummaryDetailFormValues(module, values));
        },
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

TrafficSummaryDetailsForm = connect(
    mapStateToProps, mapDispatchToProps      
)(TrafficSummaryDetailsForm)

export default TrafficSummaryDetailsForm;
