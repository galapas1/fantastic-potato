
import {
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP,
  SHOW_LOADER_MODAL,
  HIDE_LOADER_MODAL
} from './types';

export function showModal(modal, routingParams, module, projectValues, callback) {
  return {
    type: SHOW_MODAL,
    modal,
    routingParams,
    module,
    projectValues,
    callback
  };
}

export function hideModal() {
  return {
    type:  HIDE_MODAL
  };
}

export function showLoaderModal(modal) {
  return {
    type: SHOW_LOADER_MODAL,
    modal,
  };
}

export function hideLoaderModal() {
  return {
    type:  HIDE_LOADER_MODAL
  };
}

export function addNotification(message, level, autoDismiss, uid) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level,
    autoDismiss,
    uid
  };
}

export function removeNotification() {
  return {
    type: REMOVE_NOTIFICATION
  };
}

export function showPopup(popup, popupDetails, graphData) {
  return {
    type: SHOW_POPUP,
    popup,
    popupDetails,
    graphData
  };
}

export function hidePopup() {
  return {
    type: HIDE_POPUP
  };
}
