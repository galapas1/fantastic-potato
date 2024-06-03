import { combineReducers } from 'redux';

import concreteFormValuesReducer     from './concrete_form_values_reducer';
import overlayFormValuesReducer      from './overlay_form_values_reducer';
import parkingFormValuesReducer      from './parking_form_values_reducer';
import intermodalFormValuesReducer   from './intermodal_form_values_reducer';
import newCompositeFormValuesReducer from './new_composite_form_values_reducer';
import projectDetailsReducer         from './project_details_reducer';
import modal                         from './modal_reducer';
import popup                         from './popup_reducer';
import notification                  from './notification_reducer';

const currentProjectReducer = (state, action) => {
  return _currentProjectReducer(state, action)
}

const _currentProjectReducer = combineReducers({
  projectDetails        : projectDetailsReducer,
  concreteFormValues    : concreteFormValuesReducer,
  overlayFormValues     : overlayFormValuesReducer, 
  newCompositeFormValues: newCompositeFormValuesReducer,
  parkingFormValues     : parkingFormValuesReducer,
  intermodalFormValues  : intermodalFormValuesReducer,
  modal,
  popup,
  notification
});

export default currentProjectReducer;
