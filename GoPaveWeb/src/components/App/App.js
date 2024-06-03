import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './App.scss';
import { ModalResource, NotificationContainer, LoaderModalResource } from 'Components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  SLIDE_OUT,
  SLIDE_IN
} from  'Constants';

class App extends Component  {

  render() {
    let segment;
    if (this.props.location.state && this.props.location.key) {
      segment =  this.props.location.key;
    }
    let transitionNameProperty = '';
    if (this.props.location.state) {
      if (this.props.location.state.transition === SLIDE_OUT) {
        transitionNameProperty = 'pageSlider';
      } else if (this.props.location.state.transition === SLIDE_IN) {
        transitionNameProperty = 'pageSliderReverse'
      }
    }
    return (
      <div style={{backgroundImage: 'url(/images/streetBackground.jpg)', backgroundSize: 'cover', height: '100vh', display: 'flex'}}>
        <Navbar /> 
          <ReactCSSTransitionGroup 
            component='div'
            className='parent-animation'
            transitionName={transitionNameProperty}
            transitionEnterTimeout={1000} 
            transitionLeaveTimeout={1000}>
            {React.cloneElement(this.props.children, {key: segment})}
          </ReactCSSTransitionGroup>
        {/* Separate modal for loader so that it can show if other modals are showing*/}
        <LoaderModalResource {...this.props}/>
        <ModalResource {...this.props}/>
        <NotificationContainer {...this.props}/>
        <div style={{ height: 40, backgroundColor: 'lightGrey', width: '100%', position: 'absolute', bottom: 0 }}>

        <div  style={{ paddingRight: 46, paddingLeft: 46, paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>


                   <div style={{ display: "flex" }}></div>

                    <div style={{ display: "flex" }}>
                        <a target='_blank' href='http://features.pavementdesigner.org/privacy-policy/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                            <div className='nav-text'>Privacy Policy</div>
                        </a>
                    </div>

                    <div style={{ display: "flex" }}>
                        <a target='_blank' href='http://features.pavementdesigner.org/terms-of-service/' style={{ color: 'dimgray', textDecoration: 'none' }}>
                            <div className='nav-text'>Terms of Service</div>
                        </a>
                    </div>

                    <div style={{ display: "flex" }}></div>
            </div>
            </div>
      </div>
      )
    
  }
}
export default App;
