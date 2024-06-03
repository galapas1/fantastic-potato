import React, { Component    } from 'react';
import        { connect      } from 'react-redux';
import        { reset        } from 'redux-form';
import        { PropTypes    } from 'prop-types';
import { Popup, ToggleButton } from 'Components';

import './ThreeColumnForm.scss';

import FooterForm                    from './FooterForm';
import { getFormFromString         } from 'HelperFunctions/getFormFromString';
import { setCurrentProjectUnitType } from 'Actions';

import {
    CUSTOM_TRAFFIC_SUMMARY_POPUP,
    CONCRETE_MODULE,
    OVERLAY_MODULE,
    NEW_COMPOSITE_MODULE,
    OVERLAY_ASPHALT_ANALYSIS_POPUP,
    CONCRETE_ASPHALT_ANALYSIS_POPUP,
    HELP_SCREEN_POPUP,
    PROJECT_LEVEL_FORM,
    INTERMODAL,
    PAVEMENT_STRUCTURE_FORM,
    CONCRETE,
    OVERLAY,
} from 'Constants';


/*
Forms callling this form need to provide it with the three forms and the three form column widths
*/
class TwoColumnForm extends Component {

    constructor(props) {
        super(props);
        const { unitType } = this.props;
        this.state = {
            unitType: unitType,
            helpButton: 'Off',
            isMouseInside: false
        }
    }

    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseExit = () => {
        this.setState({ isMouseInside: false });
    }

  // If somehow React Router redirects to a url that does not have formType, then dont render. Seems to happen when Change Design Type button 
  // is pressed from the footer of Project Level Form
    shouldComponentUpdate(nextProps) {
        if (!nextProps.params.formType) {
            return false;
        }
        return true;
    }

  setHelpButtonValue(value) {
      this.setState({ helpButton: value })
  }

  setUnitTypeValue(value) {
      this.setState({ unitType: value })
      setCurrentProjectUnitType(value);
  }

  renderPopup(constructionType, formType, trafficForm) {
      let module = NEW_COMPOSITE_MODULE;
      let popup;
      if (constructionType === CONCRETE) {
          module = CONCRETE_MODULE;
          popup = CONCRETE_ASPHALT_ANALYSIS_POPUP;
      } else if (constructionType === OVERLAY) {
          module = OVERLAY_MODULE;
          popup = OVERLAY_ASPHALT_ANALYSIS_POPUP;
      }

      if (formType === PROJECT_LEVEL_FORM) {
          return (
              <div>
                  <Popup trafficForm={trafficForm} module={module} popup={popup} />
                  <Popup module={module} popup={CUSTOM_TRAFFIC_SUMMARY_POPUP} />
                  <Popup popup={HELP_SCREEN_POPUP} />
              </div>
          )
      } else if (formType === PAVEMENT_STRUCTURE_FORM) {
          return (
              <div>
                  <Popup popup={HELP_SCREEN_POPUP} />
              </div>
          )
      }
  }

  render() {
    const { constructionType, formType } = this.props.params;
    const { formColumnWidths, forms, params } = this.props;
    
    // If the file calling this file does not provide the three forms or the three form widths, then exit out of this method. 
    if (!forms || !formColumnWidths) {
      return null;
    }

    const FirstColumnForm = getFormFromString(forms[0]);
    const SecondColumnForm = getFormFromString(forms[1]);

    const showUnits = true; ///formType === PROJECT_LEVEL_FORM || constructionType === INTERMODAL;
    let style = { display: (showUnits ? 'flex' : 'none'), justifyContent: 'space-between', width: '-webkit-fill-available' };

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: '1 1 0%' }}>
            <div className="inner-column-forms" style={{ overflowY: "auto", flexDirection: 'column' }}>
              <div className="unit-help-wrapper" style={style}>

                <div style={{ width: 150, height: 25, marginTop: 5, marginLeft: 50, display: 'flex' }}>
                    <label style={{ paddingRight: 6, marginTop: 5 }}>Units </label>
                    <ToggleButton options={['US', 'METRIC']}
                                  style={{ padding: 0, paddingLeft: 6, paddingRight: 6, marginTop: 5 }} 
                                  setParentValue={this.setUnitTypeValue.bind(this)}
                                  buttonSelected={this.state.unitType}
                                  isProjectLevelForm={formType === PROJECT_LEVEL_FORM || 
                                                      constructionType === INTERMODAL} />
                </div>

                <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseExit} style={{ width: this.state.isMouseInside ? 130 : 40, marginRight: this.state.isMouseInside ? 40 : 130, height: 25, marginTop: 5, display: 'flex', marginLeft: '45%' }}>
                    <label style={{ paddingRight: 6, marginTop: 5 }}>Help </label>
                    <i className='fa fa-question-circle nav-icon' style={{ fontSize: 30, color: '#3299CC' }}></i>
                    {this.state.isMouseInside ? <ToggleButton options={['On', 'Off']} style={{ padding: 0, paddingLeft: 6, paddingRight: 6, marginTop: 5 }} setParentValue={this.setHelpButtonValue.bind(this)} buttonSelected={this.state.helpButton} /> : null}

                </div>
              </div>

              <div className='two-column-wrapper' style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div className='two-column-one' style={{display: 'flex', flexBasis: formColumnWidths[0]}}>
                        <FirstColumnForm isHelp={this.state.helpButton === 'On'} 
                                         unitType={this.state.unitType}
                                         params={params} />
              </div>
              <div  className='two-column-two' style={{ display: 'flex', flexBasis: formColumnWidths[1], justifyContent: 'center'}}>
                        <SecondColumnForm isHelp={this.state.helpButton === 'On'}
                                          unitType={this.state.unitType}
                                          params={params} />

              </div>
              </div></div>
            <FooterForm formType={formType} {...this.props} />
            {this.renderPopup(constructionType, formType, forms[0])}
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
      },
  };
}

TwoColumnForm = connect(mapStateToProps, mapDispatchToProps)(TwoColumnForm);

export default TwoColumnForm;
