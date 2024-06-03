import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ThreeColumnForm } from 'Components';
import { connect } from 'react-redux';
import { setCurrentProjectUnitType,
         removePavementStructureType , addNotification, createNewProject } from 'Actions';
import { touch, isPristine } from 'redux-form';
import { findWhere } from 'underscore';
import { withRouter } from 'react-router';
import { panelValues } from 'Data/PanelValues';
import ReactTooltip from 'react-tooltip';
import {
  STREET,
  VALUES,
  PAVEMENTS_STRUCTURE_COLUMNS,
  PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS,
  OVERLAY_MODULE,
  OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM,
  OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM,
  OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM,
  OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_BONDED_CONCRETE_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_SUBBASE_FORM,
  OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM,
  OVERLAY,
  UNBONDED_ASPHALT, 
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
} from  'Constants';

const radioKButtonTooltipMessage = 'Change Overlay Type';
const radioKButtonTooltipID = 'overlayPavementStructureForm';

const routeTextMatch = {
  bc: 'Bonded Concrete',
  uc: 'Unbonded Concrete',
  ua: 'Unbonded Asphalt',
}

class OverlayPavementStructureForm extends Component {
  shouldComponentUpdate(nextProps) {
      const { setCurrentProjectUnitType, unitType } = nextProps; 
      setCurrentProjectUnitType(unitType);
      return true;
  }

  navigatePage() {
   const { projectType, constructionType, formType } =  this.props.params; 
   this.props.removePavementStructureType(OVERLAY_MODULE);
   const link = `/projectTypes/${projectType}/${constructionType}/${formType}`;
   this.props.router.push(link);
  }

  getThreeColumnForms() {
    const options = panelValues[STREET];
    const values = options[VALUES];
    const formType = this.props.params.type; 
    const FormValues = findWhere(values, {constructionType: OVERLAY});
    return FormValues[PAVEMENTS_STRUCTURE_COLUMNS][formType]; 
  }

  getThreeColumnWidths() {
    const options = panelValues[STREET];
    const values = options[VALUES];
    const formType = this.props.params.type;
    const FormValues = findWhere(values, {constructionType: OVERLAY});
    return FormValues[PAVEMENTS_STRUCTURE_COLUMNS_WIDTHS][formType]; 
  }

  render() {
    const { constructionType, projectType, type } =  this.props.params; 
    const forms = this.getThreeColumnForms();
    const formColumnWidths = this.getThreeColumnWidths();

    return (
        <div style={{ zIndex: 10, paddingLeft: 30, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column"}}>
            <div style={{ paddingLeft: 30, display: 'flex', width: '500px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
            <ReactTooltip id={radioKButtonTooltipID} multiline={true} place='right' type='info' effect='solid' /> 
           <div style={{paddingRight: 10, textTransform: 'capitalize', fontSize: 16}}>{projectType}</div>
           <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
           <div style={{paddingRight: 10, textTransform: 'capitalize', fontSize: 16}}>{constructionType}</div>
           <div style={{ paddingRight: 10 }}><i className="fa fa-chevron-circle-right"></i></div>
           <div onClick={this.navigatePage.bind(this)} data-tip={radioKButtonTooltipMessage} data-for={radioKButtonTooltipID} style={{paddingLeft: 5, color: "#3299CC", textDecoration: 'underline', cursor: 'pointer', fontSize: 16}}>{routeTextMatch[type]}</div>
         </div>
        <ThreeColumnForm forms={forms} formColumnWidths={formColumnWidths} constructionType={constructionType} params={this.props.params} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let mrsgForm;
  let structureLayerForm;
  let flexuralOutputForm;
  const type = ownProps.params.type;
  if (type === UNBONDED_ASPHALT) {
    mrsgForm = OVERLAY_UNBONDED_ASPHALT_SUBGRADE_FORM;
    structureLayerForm = OVERLAY_UNBONDED_ASPHALT_SUBBASE_FORM;
    flexuralOutputForm = OVERLAY_UNBONDED_ASPHALT_CONCRETE_FORM;
  } else if (type === UNBONDED_CONCRETE) {
    mrsgForm = OVERLAY_UNBONDED_CONCRETE_EXISTING_CONCRETE_FORM;
    structureLayerForm = OVERLAY_UNBONDED_CONCRETE_SUBBASE_FORM;
    flexuralOutputForm = OVERLAY_UNBONDED_CONCRETE_CONCRETE_FORM;
  } else if (type === BONDED_CONCRETE) {
    mrsgForm = OVERLAY_BONDED_CONCRETE_EXISTING_CONCRETE_FORM;
    structureLayerForm = OVERLAY_BONDED_CONCRETE_SUBBASE_FORM;
    flexuralOutputForm = OVERLAY_BONDED_CONCRETE_CONCRETE_FORM;
  } 

  const isFlexOutputFormPristine = isPristine(flexuralOutputForm)(state);
  const isMrsgFormPristine = isPristine(mrsgForm)(state);
  const isStructureLayersFormPristine = isPristine(structureLayerForm)(state);
  const isPavementFormPristine = isMrsgFormPristine && isStructureLayersFormPristine && isFlexOutputFormPristine;

  return {
    isPavementFormPristine
  }

}

function mapDispatchToProps(dispatch) {
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
    setCurrentProjectUnitType: (value) => {
        dispatch(setCurrentProjectUnitType(value));
    }
  };
}

OverlayPavementStructureForm = connect(
 mapStateToProps, mapDispatchToProps         
)(OverlayPavementStructureForm);

export default withRouter(OverlayPavementStructureForm);
