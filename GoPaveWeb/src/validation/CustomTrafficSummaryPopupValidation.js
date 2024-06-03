import React from 'react';
import {filter} from 'underscore';
import {
  MODULUS_OF_ELASTICITY 
} from  'Constants';


export const validate = (values) => {

  const errors = {};
 
  let singleCustomMembersArrayErrors = [];
  values.singleCustomTrafficSpectrum.forEach((member, memberIndex) => {
    let memberErrors = {}
    if (!member) {
      return;
    }

    if (!member || !member.axleLoad) {
      memberErrors.axleLoad = 'Required'
      singleCustomMembersArrayErrors[memberIndex] = memberErrors
    }
    if (!member || !member.axlesPer1000) {
      memberErrors.axlesPer1000 = 'Required'
      singleCustomMembersArrayErrors[memberIndex] = memberErrors
    }
   
  });
    
  if(singleCustomMembersArrayErrors.length) {
    errors.singleCustomTrafficSpectrum = singleCustomMembersArrayErrors;
  }

  let tandemCustomMembersArrayErrors = [];
  values.tandemCustomTrafficSpectrum.forEach((member, memberIndex) => {
    let memberErrors = {}
    if (!member) {
      return;
    }

    if (!member || !member.axleLoad) {
      memberErrors.axleLoad = 'Required'
      tandemCustomMembersArrayErrors[memberIndex] = memberErrors
    }

    if (!member || !member.axlesPer1000) {
      memberErrors.axlesPer1000 = 'Required'
      tandemCustomMembersArrayErrors[memberIndex] = memberErrors
    }
     
  });
  
  if(tandemCustomMembersArrayErrors.length) {
    errors.tandemCustomTrafficSpectrum = tandemCustomMembersArrayErrors;
  }

  let tridemCustomMembersArrayErrors = []
  values.tridemCustomTrafficSpectrum.forEach((member, memberIndex) => {
    let memberErrors = {}
    if (!member) {
      return;
    }

    if (!member || !member.axleLoad) {
      memberErrors.axleLoad = 'Required'
      tridemCustomMembersArrayErrors[memberIndex] = memberErrors
    }
    if (!member || !member.axlesPer1000) {
      memberErrors.axlesPer1000 = 'Required'
      tridemCustomMembersArrayErrors[memberIndex] = memberErrors
    }
     
  });

  if(tridemCustomMembersArrayErrors.length) {
    errors.tridemCustomTrafficSpectrum = tridemCustomMembersArrayErrors
  }

  return errors;
}

