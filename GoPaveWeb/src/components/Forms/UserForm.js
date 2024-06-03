import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ConcreteCrcpSummaryForm from 'Forms/Concrete/SummaryPage/ConcreteCrcpSummaryForm';
import ConcreteJpcpSummaryForm from 'Forms/Concrete/SummaryPage/ConcreteJpcpSummaryForm';
import ConcreteRccSummaryForm from 'Forms/Concrete/SummaryPage/ConcreteRccSummaryForm';
import ConcretePavementStructureForm from 'Forms/Concrete/PavementStructure/ConcretePavementStructureForm';
import OverlayPavementStructureForm from 'Forms/Overlay/PavementStructure/OverlayPavementStructureForm';
import OverlayUnbondedAsphaltSummaryForm from 'Forms/Overlay/SummaryPage/OverlayUnbondedAsphaltSummaryForm';
import OverlayUnbondedConcreteSummaryForm from 'Forms/Overlay/SummaryPage/OverlayUnbondedConcreteSummaryForm';
import OverlayBondedConcreteSummaryForm from 'Forms/Overlay/SummaryPage/OverlayBondedConcreteSummaryForm';
import NewCompositePavementStructureForm from 'Forms/NewComposite/PavementStructure/NewCompositePavementStructureForm';
import NewCompositeJpcpSummaryForm from 'Forms/NewComposite/SummaryPage/NewCompositeJpcpSummaryForm';
import NewCompositeRccSummaryForm from 'Forms/NewComposite/SummaryPage/NewCompositeRccSummaryForm';
import NewCompositeHdgSummaryForm from 'Forms/NewComposite/SummaryPage/NewCompositeHdgSummaryForm';
import NewCompositeBstSummaryForm from 'Forms/NewComposite/SummaryPage/NewCompositeBstSummaryForm';
import NewCompositeOtherSummaryForm from 'Forms/NewComposite/SummaryPage/NewCompositeOtherSummaryForm';
import IntermodalPavementStructure from 'Forms/Intermodal/PavementStructure/IntermodalPavementStructureForm';

import { extend } from 'underscore';

import {
  INTERMODAL,
  CONCRETE,
  JPCP,
  RCC,
  CRCP,
  OVERLAY,
  PAVEMENT_STRUCTURE_FORM,
  SUMMARY_FORM,
  UNBONDED_ASPHALT,
  BONDED_CONCRETE,
  UNBONDED_CONCRETE,
  NEW_COMPOSITE,
  HDG,
  BST,
  NEW_COMPOSITE_OTHER,
  US,
} from  'Constants';

class UserForm extends Component {

  render() {
    const { constructionType, formType, projectType, type } =  this.props.params;
    const { unitType } = this.props;

    if(unitType === undefined) {
      console.log("[WARN]: userForm missing unit type (defaulting to US)");
      extend(this.props, {unitType: US});
    }

    if (constructionType === CONCRETE) {

      if (formType === PAVEMENT_STRUCTURE_FORM) {
        return (
          <ConcretePavementStructureForm {...this.props} />
        );
      }

      if (formType === SUMMARY_FORM) {

        if  (type === CRCP) {
          return (
            <ConcreteCrcpSummaryForm {...this.props} />
          );
        }

        if  (type === JPCP) {
          return (
            <ConcreteJpcpSummaryForm {...this.props} />
          );
        }

        if (type === RCC) {
          return (
           <ConcreteRccSummaryForm {...this.props} />
          );
        }

      }
    }

    if (constructionType === OVERLAY) {
      if (formType === PAVEMENT_STRUCTURE_FORM) {
        return (
          <OverlayPavementStructureForm {...this.props} />
        );
      }

      if (formType === SUMMARY_FORM ) {

        if (type === UNBONDED_ASPHALT) {
          return (
            <OverlayUnbondedAsphaltSummaryForm {...this.props} />
          );
        }

        if (type === BONDED_CONCRETE) {
          return (
            <OverlayBondedConcreteSummaryForm {...this.props} />
          );
        }

        if (type === UNBONDED_CONCRETE) {
          return (
            <OverlayUnbondedConcreteSummaryForm {...this.props} />
          );
        }

      }
    }

    if (constructionType === NEW_COMPOSITE) {
      if (formType === PAVEMENT_STRUCTURE_FORM) {
        return (
          <NewCompositePavementStructureForm {...this.props} />
        );
      }

      if (formType === SUMMARY_FORM) {

        if  (type === JPCP) {
          return (
            <NewCompositeJpcpSummaryForm {...this.props} />
          );
        }

        if  (type === RCC) {
          return (
            <NewCompositeRccSummaryForm {...this.props} />
          );
        }

       if  (type === HDG) {
        return (
          <NewCompositeHdgSummaryForm type={type} {...this.props} />
        );
      }

      if  (type === BST) {
        return (
          <NewCompositeBstSummaryForm type={type} {...this.props} />
        );
      }

      if  (type === NEW_COMPOSITE_OTHER) {
        return (
          <NewCompositeOtherSummaryForm type={type} {...this.props} />
        );
      }

      }
    }

    if  (projectType === INTERMODAL) {
        return (
            <IntermodalPavementStructure type={type} {...this.props} />
        );
    }

    console.error("[ERROR]: UserForm failed to match type");
    return null;
  }
}

export default UserForm;
