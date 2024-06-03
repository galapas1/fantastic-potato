import React, { Component } from 'react';
import { ThreeColumnForm, FooterForm } from 'Components';
import { connect } from 'react-redux';
import { setParkingPavementStructureRowChosenValue,
         calculateMSRGValue,
         addNotification,
         createNewProject } from 'Actions';
import { change, touch } from 'redux-form';
import { findWhere } from 'underscore';
import { panelValues } from 'Data/PanelValues';
import { getUnits } from 'HelperFunctions/getUnits';

import {
  PARKING_SUBGRADE_FORM,
  VALUES,
  PAVEMENTS_STRUCTURE_COLUMNS,
  PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS,
  CALIFORNIA_BEARING_RATIO,
  METRIC
} from  'Constants';

class ParkingPavementStructureForm extends Component {

  onClickRow(rowChosen) {
    let value;
    if (rowChosen === 'FirstRow') {
      value = 3.0;
    } else if (rowChosen === 'SecondRow') {
      value = 6.0;
    } else if (rowChosen === 'ThirdRow') {
      value = 10.25;
    }
    this.props.changeFieldValue(PARKING_SUBGRADE_FORM, CALIFORNIA_BEARING_RATIO, value)
    this.props.setParkingPavementStructureRowChosenValue(rowChosen);
  }

  getThreeColumnForms(projectType) {
    const values = panelValues[VALUES];
    const FormValues = findWhere(values, {projectType: projectType});
    return FormValues[PAVEMENTS_STRUCTURE_COLUMNS];
  }

  getThreeColumnWidths(projectType) {
    const values = panelValues[VALUES];
    const FormValues = findWhere(values, {projectType: projectType});
    return FormValues[PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS];
  }

  render() {
    const isMetric = this.props.unitType === METRIC;
    const { projectType } = this.props.params; 
    const { parkingPavementStructureTableRowChosen } = this.props;
    const forms = this.getThreeColumnForms(projectType);
    const formColumnWidths = this.getThreeColumnWidths(projectType);
    const isFirstRowChosen = parkingPavementStructureTableRowChosen === 'FirstRow';
    const isSecondRowChosen = parkingPavementStructureTableRowChosen === 'SecondRow';
    const isThirdRowChosen = parkingPavementStructureTableRowChosen === 'ThirdRow';
    if (isMetric) {
      return (
        <div style={{ zIndex: 10, paddingLeft: 30, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: 'column' }}>
            <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                </div>
            <div style={{ width: 'calc(100% - 70px)', margin: '0 auto', paddingTop: 10, display: 'flex', flexDirection: 'column'}}>
          <div style={{ paddingLeft: 30, color: 'rgb(15, 175, 175)', fontWeight: 'bold'}}>SUBGRADE SOIL TYPES & APPROXIMATE SUPPORT VALUES</div>
          <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 40, paddingRight: 40, paddingTop: 30}}>
                    <div style={{ display: 'flex', color: 'rgb(15, 175, 175)', fontSize: 12, fontWeight: 'bold', marginBottom: 5, cursor: 'pointer'}}> 
              <div style={{width: '50%', paddingLeft: 5}}>SELECT SOIL TYPE</div>
              <div style={{width: '10%', textAlign: 'center'}}>SUPPORT</div>

              <div style={{width: '10%', textAlign: 'center'}}>k, {getUnits('psi/in', this.props.unitType === METRIC)}</div>
              <div style={{width: '10%', textAlign: 'center'}}>CBR</div>
              <div style={{width: '10%', textAlign: 'center'}}>R-Value</div>
              <div style={{width: '10%', textAlign: 'center'}}>SSV</div>
            </div>
            <div onClick={this.onClickRow.bind(this, 'FirstRow')} style={{display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isFirstRowChosen ? '#FE8350' : 'white',  cursor: 'pointer',  color:  isFirstRowChosen ? 'white' : 'black', borderColor: isFirstRowChosen ? '#FE8350' : 'black'  }}> 
              <div style={{width: '50%', paddingLeft: 5}}>Fine-Grained Soils in which silt and clay-size particles predominate </div>
              <div style={{width: '10%', textAlign: 'center'}} >LOW</div>
              <div style={{width: '10%', textAlign: 'center'}}>20.4 - 32.6</div>
              <div style={{width: '10%', textAlign: 'center'}}>2.5 - 3.5</div>
              <div style={{width: '10%', textAlign: 'center'}}>10 - 22</div>
              <div style={{width: '10%', textAlign: 'center'}}>2.3 - 3.1</div>
            </div>
            <div onClick={this.onClickRow.bind(this, 'SecondRow')} style={{display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isSecondRowChosen ? '#FE8350' : 'white', marginTop: 2,  cursor: 'pointer', color:  isSecondRowChosen ? 'white' : 'black', borderColor: isSecondRowChosen ? '#FE8350' : 'black'}}> 
              <div style={{width: '50%', paddingLeft: 5}}>Sands and sand-gravel mixtures with moderate amounts of silt and clay</div>
              <div style={{width: '10%', textAlign: 'center'}} >MEDIUM</div>
              <div style={{width: '10%', textAlign: 'center'}}>35.3 - 46.1</div>
              <div style={{width: '10%', textAlign: 'center'}}>4.5 - 7.5</div>
              <div style={{width: '10%', textAlign: 'center'}}>20 - 41</div>
              <div style={{width: '10%', textAlign: 'center'}}>3.5 - 4.9</div>
            </div>
            <div onClick={this.onClickRow.bind(this, 'ThirdRow')} style={{display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isThirdRowChosen ? '#FE8350' : 'white', marginTop: 2,  cursor: 'pointer', color:  isThirdRowChosen ? 'white' : 'black', borderColor: isThirdRowChosen ? '#FE8350' : 'black'}}> 
              <div style={{width: '50%', paddingLeft: 5}}>Sand and sand-gravel mixtures relatively free of plastic fines</div>
              <div style={{width: '10%', textAlign: 'center'}} >HIGH</div>
              <div style={{width: '10%', textAlign: 'center'}}>48.9 - 59.7</div>
              <div style={{width: '10%', textAlign: 'center'}}>8.5 - 12</div>
              <div style={{width: '10%', textAlign: 'center'}}>45 - 52</div>
              <div style={{width: '10%', textAlign: 'center'}}>5.3 - 6.1</div>
            </div>
          </div>
        </div>
        <ThreeColumnForm forms={forms} formColumnWidths={formColumnWidths} params={this.props.params} /> 
      </div>
        );
      } 
      return (
          <div style={{ zIndex: 10, paddingLeft: 30, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: 'column' }}>
              <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                  <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                  <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
              </div>
              <div style={{ width: 'calc(100% - 70px)', margin: '0 auto', paddingTop: 10, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ paddingLeft: 30, color: 'rgb(15, 175, 175)', fontWeight: 'bold' }}>SUBGRADE SOIL TYPES & APPROXIMATE SUPPORT VALUES</div>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 40, paddingRight: 40, paddingTop: 30 }}>
                      <div style={{ display: 'flex', color: 'rgb(15, 175, 175)', fontSize: 12, fontWeight: 'bold', marginBottom: 5, cursor: 'pointer' }}>
                          <div style={{ width: '50%', paddingLeft: 5 }}>SELECT SOIL TYPE</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>SUPPORT</div>

                          <div style={{ width: '10%', textAlign: 'center' }}>k, {getUnits('psi/in', this.props.unitType === METRIC)}</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>CBR</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>R-Value</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>SSV</div>
                      </div>
                      <div onClick={this.onClickRow.bind(this, 'FirstRow')} style={{ display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isFirstRowChosen ? '#FE8350' : 'white', cursor: 'pointer', color: isFirstRowChosen ? 'white' : 'black', borderColor: isFirstRowChosen ? '#FE8350' : 'black' }}>
                          <div style={{ width: '50%', paddingLeft: 5 }}>Fine-Grained Soils in which silt and clay-size particles predominate </div>
                          <div style={{ width: '10%', textAlign: 'center' }} >LOW</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>75 - 120</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>2.5 - 3.5</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>10 - 22</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>2.3 - 3.1</div>
                      </div>
                      <div onClick={this.onClickRow.bind(this, 'SecondRow')} style={{ display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isSecondRowChosen ? '#FE8350' : 'white', marginTop: 2, cursor: 'pointer', color: isSecondRowChosen ? 'white' : 'black', borderColor: isSecondRowChosen ? '#FE8350' : 'black' }}>
                          <div style={{ width: '50%', paddingLeft: 5 }}>Sands and sand-gravel mixtures with moderate amounts of silt and clay</div>
                          <div style={{ width: '10%', textAlign: 'center' }} >MEDIUM</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>130 - 170</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>4.5 - 7.5</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>20 - 41</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>3.5 - 4.9</div>
                      </div>
                      <div onClick={this.onClickRow.bind(this, 'ThirdRow')} style={{ display: 'flex', fontSize: 12, border: '1px solid', backgroundColor: isThirdRowChosen ? '#FE8350' : 'white', marginTop: 2, cursor: 'pointer', color: isThirdRowChosen ? 'white' : 'black', borderColor: isThirdRowChosen ? '#FE8350' : 'black' }}>
                          <div style={{ width: '50%', paddingLeft: 5 }}>Sand and sand-gravel mixtures relatively free of plastic fines</div>
                          <div style={{ width: '10%', textAlign: 'center' }} >HIGH</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>180 - 220</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>8.5 - 12</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>45 - 52</div>
                          <div style={{ width: '10%', textAlign: 'center' }}>5.3 - 6.1</div>
                      </div>
                  </div>
              </div>
              <ThreeColumnForm forms={forms} formColumnWidths={formColumnWidths} params={this.props.params} />
          </div>
        );
    } 
  }


function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    const parkingPavementStructureTableRowChosen = state.currentProject.parkingFormValues.parkingPavementStructureTableRowChosen;
    return {
        unitType, parkingPavementStructureTableRowChosen
    };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    setParkingPavementStructureRowChosenValue: (value) => {
      dispatch(setParkingPavementStructureRowChosenValue(value))
    },
    calculateMSRGValue: (valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm) => {
      dispatch(calculateMSRGValue(valueObject, isUpdateMrsgAndKValue, kvalueOutputForm, mrsgOutputForm));
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
  };
}

ParkingPavementStructureForm = connect(
    mapStateToProps, mapDispatchToProps        
)(ParkingPavementStructureForm)

export default ParkingPavementStructureForm;
