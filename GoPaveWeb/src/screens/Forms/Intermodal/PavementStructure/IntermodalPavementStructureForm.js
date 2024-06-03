import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ThreeColumnForm } from 'Components';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType,
         addNewCompositePavementStructureType, createNewProject, addNotification } from 'Actions';
import { touch } from 'redux-form';
import { extend, each, findWhere } from 'underscore';
import { panelValues } from 'Data/PanelValues';
import {
  PAVEMENTS_STRUCTURE_COLUMNS,
  PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS,
  VALUES,
} from  'Constants';

class IntermodalPavementStructureForm extends Component {
    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }

  getThreeColumnForms(projectType) {
    const values = panelValues[VALUES];
    const FormValues = findWhere(values, {projectType: projectType});
    return FormValues['PAVEMENTS_STRUCTURE_COLUMNS'];
  }

  getThreeColumnWidths(projectType) {
    const values = panelValues[VALUES];
    const FormValues = findWhere(values, {projectType: projectType});
    return FormValues['PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS'];
  }

  render() {
    const { constructionType, projectType } =  this.props.params; 
    const forms = this.getThreeColumnForms(projectType);
    const formColumnWidths = this.getThreeColumnWidths(projectType);
    return (
        <div style={{ zIndex: 10, paddingTop: 10, paddingLeft: 30, display: "flex", flex: "1 1 0%", flexDirection: "column"}}>
            <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
            </div>
            <ThreeColumnForm constructionType={constructionType} forms={forms} formColumnWidths={formColumnWidths} params={this.props.params} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newCompositeModule: state.currentProject.newCompositeFormValues.type
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

IntermodalPavementStructureForm = connect(mapStateToProps, mapDispatchToProps)(IntermodalPavementStructureForm);

export default IntermodalPavementStructureForm;
