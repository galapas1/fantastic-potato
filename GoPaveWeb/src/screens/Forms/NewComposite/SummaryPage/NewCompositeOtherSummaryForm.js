import React, { Component} from 'react';
import { showPopup} from 'Actions';
import { FooterForm } from 'Components';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { pluck, compact} from 'underscore';
import NewCompositeAsphaltSummaryForm from './NewCompositeAsphaltSummaryForm';
import '../../../../components/Forms/Forms.scss';
import {
  NEW_COMPOSITE_OTHER_SUMMARY_FORM,
  NEW_COMPOSITE_TRAFFIC_FORM,
  TRAFFIC_SPECTRUM_DROPDOWN,
  MINIMUM_REQUIRED_THICKNESS,
  SURFACE_LAYER_THICKNESS,
  ALLOWABLE_DAMAGE_PER_LAYER,
  NEW_COMPOSITE_OTHER_SUBGRADE_FORM,
  THICKNESS_TO_RIGID_FOUNDATION,
  NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM,
  DESIGN_LIFE,
  NEW_COMPOSITE_OTHER_STRUCTURE_FORM,
  STRUCTURE_LAYER_MEMBERS,
  LAYER_THICKNESS
} from  'Constants';

class NewCompositeOtherSummaryForm extends Component {



  render() {
    return (
      <NewCompositeAsphaltSummaryForm  {...this.props} />
    )
  } 
}

NewCompositeOtherSummaryForm = connect(
  state => {
    const trafficFormSelector = formValueSelector(NEW_COMPOSITE_TRAFFIC_FORM);
    const trafficSummaryDropdownValue = trafficFormSelector(state, TRAFFIC_SPECTRUM_DROPDOWN);
    const graphData = state.currentProject.newCompositeFormValues.asphaltSummaryOtherGraphValues;
    const graphReferenceLines = state.currentProject.newCompositeFormValues.asphaltSummaryOtherGraphDamageReferenceLinesValues;
    const subgradeLayerSelector = formValueSelector(NEW_COMPOSITE_OTHER_SUBGRADE_FORM)
    const thicknesstorigidfoundation = subgradeLayerSelector(state, THICKNESS_TO_RIGID_FOUNDATION);


    const surfaceLayerSelector = formValueSelector(NEW_COMPOSITE_OTHER_SURFACE_LAYER_FORM)
    const surfaceLayerThickness = surfaceLayerSelector(state, SURFACE_LAYER_THICKNESS);
    const allowableDamage = surfaceLayerSelector(state, ALLOWABLE_DAMAGE_PER_LAYER);
    const designLayerValues = state.currentProject.newCompositeFormValues.asphaltSummaryOtherGraphDesignlayerValues
    const designLife =  trafficFormSelector(state, DESIGN_LIFE);
    const structureSelector = formValueSelector(NEW_COMPOSITE_OTHER_STRUCTURE_FORM)
    const structureLayerMembers = structureSelector(state, STRUCTURE_LAYER_MEMBERS);
    const allStructureLayers = compact(pluck(structureLayerMembers, 'layerTypeName'));
    const allStructurethickness = compact(pluck(structureLayerMembers, LAYER_THICKNESS));
    const summarySelector = formValueSelector(NEW_COMPOSITE_OTHER_SUMMARY_FORM);
    const minimumRequiredThickness = summarySelector(state, MINIMUM_REQUIRED_THICKNESS );

    return {
        trafficSummaryDropdownValue, graphData, graphReferenceLines, surfaceLayerThickness, allowableDamage, designLayerValues, designLife, allStructureLayers, minimumRequiredThickness, thicknesstorigidfoundation, allStructurethickness
    }
  }
)(NewCompositeOtherSummaryForm)



NewCompositeOtherSummaryForm = reduxForm({
 form: NEW_COMPOSITE_OTHER_SUMMARY_FORM,
})(NewCompositeOtherSummaryForm);

export default NewCompositeOtherSummaryForm;
