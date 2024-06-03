import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../ProjectPanels.scss';
import { withRouter } from 'react-router';
import {
  SLIDE_OUT,
  PROJECT_LEVEL_FORM,
  STREET
} from  'Constants';
 
class ProjectPanel extends Component {
  
  navigatePage() {
    let linkObject;
    const  { projectType, showProjectLevelFormOnClick, navigatePage, constructionType } = this.props.options;
    // Depending on which screen you are on, necxt screen can either be more project panels or Project Level form. Config param can be specified in PanelValues.js
    if (showProjectLevelFormOnClick) {
      if (projectType === STREET) {
        linkObject = ({ pathname: `/projectTypes/${projectType}/${constructionType}/${PROJECT_LEVEL_FORM}`, state: { transition: SLIDE_OUT }});
      } else if (projectType === 'parking' || projectType === 'intermodal' ) {
        // Parking and Intermodal have no constructionType option
        linkObject = ({ pathname: `/projectTypes/${projectType}/${PROJECT_LEVEL_FORM}`, state: { transition: SLIDE_OUT }});
      }

    } else if (navigatePage) {
      linkObject = ({ pathname: `projectTypes/${projectType}`, state: { transition: SLIDE_OUT }});
    }

    this.props.router.push(linkObject);
  }


  infoToShow(type) {

      if (type === 'PARKING') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>{[type]}</div>
                          <div className='panel-description'>Concrete Parking facilities provide a long-lasting pavement solution for areas with trucks, buses, cars, and other vehicles with conventional axles and over the road tires. For loadings with non-conventional axles (i.e. forklifts, loader, etc.) the Intermodal module should be utilized.</div>
                          <div className='panel-footer'>METHODOLOGY: ACI 330, StreetPave/PCA Method</div>
                      </div>
                  </div>
              </div>
          )

      }

      if (type === 'STREET') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>CONCRETE STREETS</div>
                          <div className='panel-description'>A long-lasting solution for conventional over the road traffic. This module can be used to design jointed plain concrete pavement (JPCP), continuously reinforced concrete pavement (CRCP), roller-compacted concrete pavement (RCC), overlays, and composite pavements with stabilized bases and soils.
This module should be used for the design of county, town, and city streets.</div>
                      </div>
                  </div>
              </div>
          )

      }

      if (type === 'INTERMODAL') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>{[type]}</div>
                          <div className='panel-description'>Concrete Industrial and Intermodal facilities offer a long-lasting pavement solution for non-over the road traffic. This may include forklifts, loaders, and other vehicles that use pneumatic tires and hard-rubber/plastic tires only. Facilities that have truck or bus traffic should use the parking or street design modules.
                          </div>
                          <div className='panel-footer'>METHODOLOGY: ACPA AirPave</div>
                      </div>
                  </div>
              </div>
          )

      }

      if (type === 'OVERLAY') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>{[type]}</div>
                          <div className='panel-description'>For existing pavements that require additional capacity or rehabilitation. Overlays can be unbonded or bonded to existing asphalt or concrete pavements. By utilizing the existing structure, overlays provide a long-lasting pavement.</div>
                          <div className='panel-footer'>METHODOLOGY: ACPA StreetPave/PCA Method, AASHTO 93</div>
                      </div>
                  </div>
              </div>
          )

      }

      if (type === 'CONCRETE') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>{[type]}</div>
                          <div className='panel-description'>Concrete Streets provide a long-lasting pavement for city streets and local roads. This module can be used to design conventional jointed plain concrete pavements (JPCP), roller-compacted concrete pavements (RCC), or continuously reinforced concrete pavements (CRCP).</div>
                          <div className='panel-footer'>METHODOLOGY: ACPA StreetPave/PCA Method, AASHTO 93</div>
                      </div>                 
                  </div>
              </div>
          )

      }

      if (type === 'NEW COMPOSITE') {

          let style = { backgroundImage: this.props.options.bgImage, backgroundSize: 'cover' };
          return (
              <div className='flip-container' style={style} onClick={this.navigatePage.bind(this)}>
                  <div className='content'>
                      <div className='front'>
                          {this.renderFrontText(type)}
                      </div>
                      <div className='back'>
                          <div className='panel-title'>{[type]}</div>
                          <div className='panel-description'>New composite pavements are a design option that utilize a stabilized layer to improve the structural capacity of the support layers. This module can be used to gain the best benefits of stabilized bases and subgrades to help optimize the pavement design to achieve long-term life.</div>
                          <div className='panel-footer'>METHODOLOGY: PCAPave, Layer Elastic, ACPA StreetPave</div>
                      </div>
                      </div>
              </div>
          )

      }
        
  }

  // Project Panel cam sometimes have two words on the fornt which need to be shown on separate lines
  renderFrontText(type) {
    if (this.props.options.constructionTypeDisplayTextDoubleLine) {
      let typeWordsArray = type.split(' ');
      return (
        <div>
          <div className='front-text'>{typeWordsArray[0]}</div>
          <div className='front-text'>{typeWordsArray[1]}</div>
          <div className='front-text'>{typeWordsArray[2]}</div>
        </div>
      )

    } else {
      return (
        <div className='front-text'>{type}</div>
      )
    }
  }

  render() {
    const { panelHeight, projectType, showProjectLevelFormOnClick, constructionTypeDisplayText, bgImage, flipOptions } = this.props.options;
    let type;
    if (projectType === 'street' && showProjectLevelFormOnClick) {
      type = constructionTypeDisplayText;
    } else {
      type = projectType.toUpperCase();
    }
    let style =  {backgroundImage: bgImage, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center'};
    if (!flipOptions) {
      return (
        <div className='content-option' onClick={this.navigatePage.bind(this)} style={{height: panelHeight ? panelHeight : '100%'}}> 
          <div className='flip-container' style={style}>
              {this.renderFrontText(type)}
            </div>
          </div>
      );
    } else {
      return (
        <div className='content-option' style={{height: panelHeight ? panelHeight : '100%'}}>
          {this.infoToShow(type)}
        </div>
      ); 
    }
  }
}

export default withRouter(ProjectPanel);
