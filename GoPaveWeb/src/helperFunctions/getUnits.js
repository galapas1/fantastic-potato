
export const getUnits = (unit, isMetric) => {
  
  if (unit === 'psi'){
    if (isMetric){
      return 'MPa';
    }
    return unit;
  }

  if (unit === 'in'){
    if (isMetric){
      return 'mm';
    }
    return unit;
  }

  // special case for Intermodal CONTACT AREA
  if (unit === 'inx'){
    if (isMetric){
      return 'cm';
    }
    return 'in';
  }

  if (unit.substring(0, 'psi/in'.length) === 'psi/in'){
    if (isMetric){
      return 'MPa/m';
    }
    return unit;
  }

  if (unit === 'ft'){
    if (isMetric){
      return 'm';
    }
    return unit;
  }

  if (unit === 'kips'){
    if (isMetric){
      return 'kN';
    }
    return unit;
  }

  if (unit === '#/Mile'){
    if (isMetric){
      return '#/km';
    }
    return unit;
  }

  if (unit === '#/mile'){
    if (isMetric){
      return '#/km';
    }
    return unit;
  }

  if (unit === 'lbs'){
    if (isMetric){
      return 'kgs';
    }
    return unit;
  }

  console.log('[WARN] missing unit conversion for ' + unit);
  return unit;
}

