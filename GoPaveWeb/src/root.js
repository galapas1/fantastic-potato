import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux'
import { getRoutes } from './routes'
import { Router } from 'react-router';
import { SIGNIN_SUCCESS } from './actions/types';
import { setNonSignedInUser } from 'Actions';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-101333687-2');

function fireTracking() {
    ReactGA.pageview(window.location.pathname);
}

const Root = ({ store, history }) => {

  const token = localStorage.getItem('userToken');
  // If we have token , consider the user signed in
  if (token) {
    // we need to update the application state
    store.dispatch({type: SIGNIN_SUCCESS})
    store.dispatch(setNonSignedInUser(false));
  }

  return (
    <Provider store={store}>
          <Router history={history} store={store} onUpdate={fireTracking}>
        {getRoutes(store)}
      </Router>
    </Provider>
  )
}


export default Root
