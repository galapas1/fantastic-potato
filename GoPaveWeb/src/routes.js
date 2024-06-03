import React from 'react';

import { Route, IndexRoute } from 'react-router';

import Home              from './screens/Home/Home';
import App               from './components/App/App';
import ProjectPanels     from './screens/ProjectPanels/ProjectPanels';
import MyProjects        from './screens/MyProjects/MyProjects';
import ParentForm        from './components/Forms/ParentForm';
import UserForm          from './components/Forms/UserForm';
import ParentFormContent from './components/Forms/ParentFormContent';

import { formSetup } from './routeCallbacks';
import { fetchFoldersAndProjects, showModal } from 'Actions';

import {
    SIGN_IN_MODAL,
    RESET_PASSWORD_MODAL
} from  'Constants';

export const fetchUserDetails = (store, locationObject, nextState, callback) => {

    // After user registers an account and confirms email, link from email will direct to /login
    // which will show the signin popup automatically
    if (locationObject.location.pathname === '/login') {
        store.dispatch(showModal(SIGN_IN_MODAL));
    }

    if (locationObject.location.pathname === '/reset') {
        store.dispatch(showModal(RESET_PASSWORD_MODAL));
    }

    if (store.getState().auth.authenticated) {
        store.dispatch(fetchFoldersAndProjects()).then(() => {
            callback()
        });   
    } else {
        callback();
    }
}

export const getRoutes = (store) => (
    <Route path='/(login)(reset)(sharedProject)' component={App} onEnter={fetchUserDetails.bind(this, store)}>
    <IndexRoute component={Home} />
    <Route path='myDesigns' component={MyProjects} />
    <Route path='projectTypes(/:projectType)' component={ProjectPanels} />
    <Route path='projectTypes/:projectType(/:constructionType)/:formType' component={ParentForm} onEnter={formSetup.bind(this, store)} >
    <IndexRoute component={ParentFormContent} />
    <Route path=':type' component={UserForm}  />
    </Route>
    </Route>
)

