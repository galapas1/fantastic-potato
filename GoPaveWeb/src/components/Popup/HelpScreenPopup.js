import React , { Component } from 'react';
import HelpScreenResource from '../HelpScreen/HelpScreenResource'
import {
 HELP_SCREEN_POPUP,
} from  'Constants';

const popupStyle = {
  left: '14%',
  width: '72%',
  overflowY: 'auto',
  zIndex: 1000
}

class HelpScreenPopup extends Component {

  render() {
    return (
      <div className={(this.props.currentPopup === HELP_SCREEN_POPUP && this.props.showPopup) ? 'render-popup' : 'base-popup'} style={popupStyle}>
        <i style={{ fontSize: 25, position: 'absolute', top: 16, right: 10,  zIndex: 11, color: '#0FAFAF'}} onClick={this.props.hidePopup} className='fa fa-times' ></i>
       <HelpScreenResource {...this.props}/>  
      </div> 
    )
  }
}

export default HelpScreenPopup;
