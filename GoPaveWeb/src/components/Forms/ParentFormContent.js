import React, 
       { Component } from 'react';
import { PropTypes } from 'prop-types';

import ThreeColumnForm from './ThreeColumnForm';
import TwoColumnForm   from './TwoColumnForm';

import ConcretePavementTypeForm          from 'Forms/Concrete/PavementStructure/ConcretePavementTypeForm';
import OverlayPavementTypeForm           from 'Forms/Overlay/PavementStructure/OverlayPavementTypeForm';
import NewCompositePavementStructureForm from 'Forms/NewComposite/PavementStructure/NewCompositePavementStructureForm';
import ParkingPavementStructureForm      from 'Forms/Parking/PavementStructure/ParkingPavementStructureForm';
import IntermodalPavementStructureForm   from 'Forms/Intermodal/PavementStructure/IntermodalPavementStructureForm';
import ParkingSummaryForm                from 'Forms/Parking/SummaryPage/ParkingSummaryForm'
import IntermodalProjectLevelForm        from 'Forms/Intermodal/ProjectLevel/IntermodalProjectLevelForm';
import IntermodalSummaryForm             from 'Forms/Intermodal/SummaryPage/IntermodalSummaryForm'

import { connect           } from 'react-redux';
import { touch, isPristine } from 'redux-form';
import { addNotification, 
         createNewProject, 
         setCurrentProjectUnitType } from 'Actions';
import { each, isEmpty, findWhere  } from 'underscore';
import { panelValues               } from 'Data/PanelValues';

import {
  CONCRETE_GLOBAL_FORM,
  CONCRETE_TRAFFIC_FORM,
  OVERLAY_TRAFFIC_FORM,
  NEW_COMPOSITE_TRAFFIC_FORM,
  OVERLAY_GLOBAL_FORM,
  PROJECT_LEVEL_COLUMNS,
  PROJECT_LEVEL_COLUMNS_WIDTHS,
  VALUES,
  PARKING_TRAFFIC_FORM,
  PARKING_SUBGRADE_FORM,
  PARKING_CONCRETE_FORM,
  PARKING_SUBBASE_FORM,
  NEW_COMPOSITE_JPCP_SUBGRADE_FORM,
  NEW_COMPOSITE_JPCP_STRUCTURE_FORM,
  NEW_COMPOSITE_JPCP_SURFACE_LAYER_FORM,
  NEW_COMPOSITE_RCC_SUBGRADE_FORM,
  NEW_COMPOSITE_RCC_STRUCTURE_FORM,
  NEW_COMPOSITE_RCC_SURFACE_LAYER_FORM,
  PROJECT_LEVEL_FORM,
  PAVEMENT_STRUCTURE_FORM,
  SUMMARY_FORM,
  STREET,
  CONCRETE,
  NEW_COMPOSITE,
  OVERLAY,
  PARKING,
  INTERMODAL,
} from  'Constants';

class ParentFormContent extends Component {

  // If somehow React Router redirects to a url that does not have formType, then dont render. Seems to happen when Change Design Type button 
  // is pressed from the footer of Project Level Form
    shouldComponentUpdate(nextProps) {
        if (!nextProps.params.formType) {
            return false;
        }
        const { setCurrentProjectUnitType, unitType } = nextProps; 
        setCurrentProjectUnitType(unitType);
        return true;
    }

    getPavementStructureForms(projectType, constructionType) {
        if (projectType === PARKING) {
            return ParkingPavementStructureForm;

        } else if (projectType === INTERMODAL) {
            return IntermodalPavementStructureForm;

        } else if  (projectType === STREET) {
            if (constructionType === CONCRETE){
                return ConcretePavementTypeForm; 

            } else if (constructionType === NEW_COMPOSITE){
                return NewCompositePavementStructureForm; 

            } else if (constructionType === OVERLAY){
                return OverlayPavementTypeForm; 
            }
        }
    }

    getThreeProjectLevelColumnForms(projectType, constructionType) {
        const streetOptions = panelValues[projectType];
        const values        = streetOptions[VALUES];
        const FormValues    = findWhere(values, {constructionType: constructionType});

        return FormValues[PROJECT_LEVEL_COLUMNS];   
    }

    getThreeProjetLevelColumnWidths(projectType, constructionType) {
        const options    = panelValues[projectType];
        const values     = options[VALUES];
        const FormValues = findWhere(values, {constructionType: constructionType});

        return FormValues[PROJECT_LEVEL_COLUMNS_WIDTHS];
    }

    // Parking Project Level only has 2 columns
    getTwoProjectLevelColumnForms(projectType) {
        const values     = panelValues[VALUES];
        const FormValues = findWhere(values, {projectType: projectType});

        return FormValues[PROJECT_LEVEL_COLUMNS];
    }

    getTwoProjetLevelColumnWidths(projectType) {
        const values = panelValues[VALUES];
        const FormValues = findWhere(values, {projectType: projectType});
        return FormValues[PROJECT_LEVEL_COLUMNS_WIDTHS];
    }

    /*
     * This form returns different things based on formType
     * 1) For ProjectLevel Form, this form either calls the ThreeColumnForm 
     *    or the Two ColumnForm and provides it with forms and formColumnWidths
     * 2) For Pavement Structure Form, this form calls either the Pavement Type Form
     *    or Pavement Structure Form (if no pavementTypes - NewComposite, Parking and Intermodal)
     */
    render() {
        const { formType, constructionType, projectType } = this.props.params;

        let Form;
        let forms;
        let formColumnWidths;

        if (formType === PROJECT_LEVEL_FORM) {
            if (projectType === STREET) {
                Form  = ThreeColumnForm;
                forms = this.getThreeProjectLevelColumnForms(projectType, constructionType);
                formColumnWidths = this.getThreeProjetLevelColumnWidths(projectType, constructionType); 

            } else if (projectType === PARKING) {
                Form  = TwoColumnForm;
                forms = this.getTwoProjectLevelColumnForms(projectType);
                formColumnWidths = this.getTwoProjetLevelColumnWidths(projectType); 

            }  else if (projectType === INTERMODAL) {
                Form = IntermodalProjectLevelForm;
            }
        } else if (formType === PAVEMENT_STRUCTURE_FORM) {
            Form = this.getPavementStructureForms(projectType, constructionType);

        } else if (formType === SUMMARY_FORM) {
            if (projectType === PARKING) {
                Form = ParkingSummaryForm;
            } else if (projectType ===  INTERMODAL) {
                Form = IntermodalSummaryForm;
            } 
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%', zIndex: 100, width: '100%'}}>
            <Form forms={forms} formColumnWidths={formColumnWidths} params={this.props.params} route={this.props.route} />
            </div>
        ); 
    }
}

function mapStateToProps(state, ownProps) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        }
    };
}

ParentFormContent = connect(
    mapStateToProps, mapDispatchToProps
)(ParentFormContent);

export default ParentFormContent;
