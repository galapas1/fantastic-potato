import React, { Component } from 'react';
import { ThreeColumnForm } from 'Components';
import { Dropdown } from 'Components';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType,
         addNewCompositePavementStructureType, createNewProject, addNotification } from 'Actions';
import { touch } from 'redux-form';
import { findWhere } from 'underscore';
import { panelValues } from 'Data/PanelValues';
import {
  NEW_COMPOSITE,
  STREET,
  PAVEMENTS_STRUCTURE_COLUMNS,
  PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS,
  VALUES
} from  'Constants';

const dropdownValues = [{name: 'Jointed Plain Concrete'}, {name: 'Roller-Compacted Concrete'}, {name: 'HMA / WMA Dense Graded'}, {name: 'BST Chip Seal'}];

const reduxStoreDropdownValue = {
  'Jointed Plain Concrete': 'JPCP',
  'Roller-Compacted Concrete': 'RCC',
  'HMA / WMA Dense Graded': 'HDG',
  'BST Chip Seal': 'BST',
  'Other': 'Other'
}

const displayDropdownValue = {
  JPCP: 'Jointed Plain Concrete',
  RCC: 'Roller-Compacted Concrete',
  HDG: 'HMA / WMA Dense Graded',
  BST: 'BST Chip Seal',
  Other: 'Other'
}

const routeTextMatch = {
  newComposite: 'Composite'
}

class NewCompositePavementStructureForm extends Component {

  setParentDropdownValue(item) {
    this.props.addNewCompositePavementStructureType(reduxStoreDropdownValue[item]);
  }

  getThreeColumnForms() {
    const options = panelValues[STREET];
    const values = options[VALUES];
    const FormValues = findWhere(values, {constructionType: NEW_COMPOSITE});
    const reduxStoreValue = reduxStoreDropdownValue[this.props.newCompositeModule];

    if (reduxStoreValue === 'JPCP' || reduxStoreValue === 'RCC' ) {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][reduxStoreValue];
    } else if (reduxStoreValue === 'HDG') {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][reduxStoreValue];
    } else if (reduxStoreValue === 'BST') {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][reduxStoreValue];
    } else if (reduxStoreValue === 'Other') {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][reduxStoreValue];
    }
  }

  getThreeColumnWidths() {
    const options = panelValues[STREET];
    const values = options[VALUES];
    const reduxStoreValue = reduxStoreDropdownValue[this.props.newCompositeModule];
    const FormValues = findWhere(values, {constructionType: NEW_COMPOSITE});
    if (reduxStoreValue === 'JPCP' || reduxStoreValue === 'RCC' ) {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS]['JPCP'];
    } else {
      return FormValues[PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS]['Other'];
    }
  }

  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  render() {
    const { constructionType, projectType } =  this.props.params; 
    const forms = this.getThreeColumnForms();
    const formColumnWidths = this.getThreeColumnWidths();
    return (
        <div style={{ zIndex: 10, paddingLeft: 30, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column"}}>
            <div style={{ paddingLeft: 30, display: 'flex', width: '600px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>

                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
           <div style={{paddingRight: 10, textTransform: 'capitalize', fontSize: 16}}>{routeTextMatch[constructionType]}</div>
           <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
          <Dropdown value={this.props.newCompositeModule} style={{ zIndex: 11, width: 200}} list={dropdownValues} setParentDropdownValue={this.setParentDropdownValue.bind(this)} />
        </div>
        <ThreeColumnForm constructionType={constructionType} forms={forms} formColumnWidths={formColumnWidths} params={this.props.params} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    const newCompositeModule = displayDropdownValue[state.currentProject.newCompositeFormValues.type];
    return {
        newCompositeModule, unitType,
    }   
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCompositePavementStructureType: (type) => {
      dispatch(addNewCompositePavementStructureType(type));
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
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

NewCompositePavementStructureForm = connect(mapStateToProps, mapDispatchToProps)(NewCompositePavementStructureForm);

export default NewCompositePavementStructureForm;
