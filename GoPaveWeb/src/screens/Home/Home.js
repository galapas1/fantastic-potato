import React, { Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { hideModal, showModal  } from 'Actions';
import './Home.scss';
import {
  SLIDE_OUT,
  SIGN_IN_MODAL,
  SIGN_UP_MODAL
} from 'Constants';

let usermodalheight = '42%';
if (window.ScreenHeight < 1024) {
    usermodalheight = '75%'
};

class HomePage extends Component {

  onStartDesignButtonClick = () => {
    let linkObject;
    linkObject = ({pathname: '/projectTypes', state: { transition: SLIDE_OUT }});
    this.props.router.push(linkObject);
  }

  render() {
    const { showModal, isUserSignedIn } = this.props;
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgb(237, 237, 237)', backgroundColor: '#ededed', height: isUserSignedIn ? '50%' : [{ usermodalheight }], width: '38%', borderRadius: 20 }}>
                <div style={{ marginBottom: 15, display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: 300, height: 135, backgroundImage: 'url(/images/ReportLogo.png)', backgroundRepeat: 'no-repeat' }}></div>
                </div>
                <div style={{ marginLeft: 20, marginRight: 20, color: '#3299CC', margintop: 10, marginBottom: 10 }}>
                    <div style={{marginBottom: 10 }}>Welcome to Pavement Designer, a free web-based pavement design tool for streets, local roads, parking lots, and intermodal/industrial facilities.</div>                   
                <div>Best viewed using Chrome on Windows or Safari for MacOS.</div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div onClick={() => window.open("https://www.google.com/chrome/browser/", "_blank")} style={{ width: 160, height: 60, backgroundImage: 'url(/images/chrome.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer' }}></div>
                    <div onClick={() => window.open("https://support.apple.com/downloads/#safari", "_blank")} style={{ width: 150, height: 60, alignItems: 'right', backgroundImage: 'url(/images/safari.png)', backgroundRepeat: 'no-repeat', cursor: 'pointer' }}></div>
                </div>
                </div>

                <button onClick={this.onStartDesignButtonClick} className='btn btn-primary signup-button' action='submit'>Start Designing</button>
                {!isUserSignedIn &&
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginTop: 15, display: 'flex' }}>
                            <div>Already Registered?</div>
                            <div onClick={() => showModal(SIGN_IN_MODAL)} style={{ color: '#3299CC', cursor: 'pointer', marginLeft: 3 }}>Login Here</div>
                        </div>
                        <div>or</div>
                        <div style={{ display: 'flex' }}>
                            <div>Dont have an account?</div>
                            <div onClick={() => showModal(SIGN_UP_MODAL)} style={{ color: '#3299CC', cursor: 'pointer', marginLeft: 3 }}>Register Now</div>
                        </div>
                    </div>}
            </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modal) => {
      dispatch(showModal(modal))
    }
  }
}

function mapStateToProps(state) {
  return {
    isUserSignedIn: state.auth.authenticated,
  };
}

HomePage  = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;

