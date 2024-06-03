
export const parseStringsToNumbers = (value) => {
  // is a user enters '-', then value should be undefined
  if (isNaN(value.replace(/\,/g,''), 10)) {
    return undefined;
  }

  if (value) {
    return parseFloat(value.replace(/\,/g,''), 10);  
  }

  return value;
}
