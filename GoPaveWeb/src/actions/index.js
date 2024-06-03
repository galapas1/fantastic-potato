import axios from 'axios';
export * from './CalculatorActions';
export * from './ModalsNotificationsActions';
export * from './ProjectDashboardActions';
export * from './ThicknessAndGraphActions';
import {
  CONCRETE_ADD_PAVEMENT_STRUCTURE_TYPE,
  CONCRETE_REMOVE_PAVEMENT_STRUCTURE_TYPE,
  CONCRETE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  CONCRETE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  CONCRETE_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  CONCRETE_EDIT_ASPHALT_ANALYSIS_BUTTON,
  CONCRETE_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES,
  CONCRETE_SET_ASPHALT_ANALSIS_FORM_VALUES,
  CONCRETE_SET_MRSG_INPUT_VALUE,
  OVERLAY_SET_MRSG_INPUT_VALUE,
  OVERLAY_EDIT_ASPHALT_ANALYSIS_BUTTON,
  OVERLAY_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES,
  OVERLAY_SET_ASPHALT_ANALSIS_FORM_VALUES,
  OVERLAY_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  OVERLAY_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  OVERLAY_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  NEW_COMPOSITE_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  NEW_COMPOSITE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  NEW_COMPOSITE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES,
  OVERLAY_ADD_PAVEMENT_STRUCTURE_TYPE,
  OVERLAY_REMOVE_PAVEMENT_STRUCTURE_TYPE,
  OVERLAY_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED,
  CONCRETE_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED,
  NEW_COMPOSITE_ADD_PAVEMENT_STRUCTURE_TYPE,
  CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_UNBONDED_ASPHALT_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_BONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  OVERLAY_UNBONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  PARKING_PAVEMENT_STRUCTURE_SET_ROW_CHOSEN,
  PARKING_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  NEW_COMPOSITE_JPCP_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  NEW_COMPOSITE_RCC_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
  PARKING_SET_TRAFFIC_SUMMARY_FORM_VALUES,
  INTERMODAL_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE
} from './types';

import {
  CONCRETE_MODULE,
  OVERLAY_MODULE,
  NEW_COMPOSITE_MODULE,
  PARKING_MODULE
} from 'Constants'

import thunk from 'redux-thunk';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export function pdfBuilder(imgRefs) {
  let showPdfPreview = true;
  let doc = new jsPDF('p', 'px', 'a4');

  let blkX = 0; let blkY = 0;
  for(let blkCount = 0; blkCount < imgRefs.length; blkCount++) {
    blkX = imgRefs[blkCount].x;
    blkY = imgRefs[blkCount].y;

    doc.setFontSize(12);
    doc.setTextColor(15, 118, 196);
    doc.text(blkX, blkY, imgRefs[blkCount].title);

    for(let fieldCnt = 0; fieldCnt < imgRefs[blkCount].fields.length; fieldCnt++) {
      let x = blkX + imgRefs[blkCount].fields[fieldCnt].x;
      let y = blkY + imgRefs[blkCount].fields[fieldCnt].y;

      switch(imgRefs[blkCount].fields[fieldCnt].type) {
        case 'no-preview':
              showPdfPreview = false;
              break;
        case 'page':
              doc.addPage();
              break;
        case 'png':
        case 'key':
          let w = imgRefs[blkCount].fields[fieldCnt].w;
          let h = imgRefs[blkCount].fields[fieldCnt].h;
          if(imgRefs[blkCount].fields[fieldCnt].image == '') {
            console.error('[ERROR: ] missing image ['+blkCount+']['+fieldCnt+']: ' + imgRefs[blkCount].fields[fieldCnt].key);
          }
          else {
            try {
              doc.addImage(imgRefs[blkCount].fields[fieldCnt].image, 'PNG', x, y, w, h);
            } catch(error) {
              console.error(error);
            }
          }
          break;
        case 'text':
          if(imgRefs[blkCount].fields[fieldCnt].value == '') {
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.text(x, y, imgRefs[blkCount].fields[fieldCnt].text);
            doc.text(x+0.2, y+0.2, imgRefs[blkCount].fields[fieldCnt].text);
          }
          else {
            let txt = imgRefs[blkCount].fields[fieldCnt].text;
            let val = imgRefs[blkCount].fields[fieldCnt].value;
            switch(typeof txt) {
              case 'number':
                txt = txt.toLocaleString();
                break;
              case 'undefined':
                txt = '#label';
                break;
            }
            switch(typeof val) {
              case 'number':
                val = val.toLocaleString();
                break;
              case 'undefined':
                val = '0';
                break;
            }
            if(typeof imgRefs[blkCount].fields[fieldCnt].sm == 'undefined') {
              doc.setFontSize(10);
            }
            else {
              doc.setFontSize(8);
            }
            doc.setTextColor(20, 20, 20);
            doc.text(x, y, txt);

            let xPad = imgRefs[blkCount].fields[fieldCnt].xPad;
            if(typeof imgRefs[blkCount].fields[fieldCnt].color == 'undefined') {
              doc.setTextColor(15, 15, 15);
            }
            else {
              let rgb = imgRefs[blkCount].fields[fieldCnt].color;
              let arr = rgb.split(',');
              doc.setTextColor(arr[0], arr[1], arr[2]);
            }
            doc.text(x + xPad, y, val);
          }
          break;
        case 'line':
          let x2 = blkX + imgRefs[blkCount].fields[fieldCnt].x2;
          let y2 = blkY + imgRefs[blkCount].fields[fieldCnt].y2;
          doc.setDrawColor(15, 15, 15);
          doc.line(x, y, x2, y2);
          break;
      }
    }
  }

  if(showPdfPreview) {
    let pdfString = doc.output('datauristring');
    let iframe = "<iframe width='100%' height='100%' src='" + pdfString + "'></iframe>"

    let x = window.open();
    if(x) { // x may be null if browser is blocking new windows
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    }
    else {
      //dispatch(addNotification('Task was not successful', 'error',  5, 'Task was not successful' ));
    }
  }

  doc.save('DesignerSummaryReport.pdf');
}

export function saveImage(blkCount, fieldCnt, imgRefs) {
  if(blkCount < imgRefs.length) {
    if(fieldCnt < imgRefs[blkCount].fields.length) {
      try {
        localStorage.removeItem(imgRefs[blkCount].fields[fieldCnt].key);
        let imgData = {
            image : imgRefs[blkCount].fields[fieldCnt].image,
            width : imgRefs[blkCount].fields[fieldCnt].w,
            height: imgRefs[blkCount].fields[fieldCnt].h
        };
        localStorage.setItem(imgRefs[blkCount].fields[fieldCnt].key, JSON.stringify(imgData));
      } catch (error) {
      }
      saveImage(blkCount, fieldCnt+1, imgRefs);
    }
  }
}

export function saveImages(imgRefs) {
  for(let blkCount = 0; blkCount < imgRefs.length; blkCount++) {
    saveImage(blkCount, 0, imgRefs);
  }
}

export function imageCollectionComplete(imgRefs) {
  for(let blkCount = 0; blkCount < imgRefs.length; blkCount++) {
    for(let fieldCnt = 0; fieldCnt < imgRefs[blkCount].fields.length; fieldCnt++) {
      switch(imgRefs[blkCount].fields[fieldCnt].type) {
          case 'png':
          case 'key':
            if(imgRefs[blkCount].fields[fieldCnt].image == '') {
              return false;
            }
            break;
      }
    }
  }
  return true;
}

function canvasToPngHD(blkCount, context, imgRefs, fieldCnt, paramFunc) {
    const scaleFactor  = 2.5;
    const reduceFactor = 0.6;

    let srcEl = imgRefs[blkCount].fields[fieldCnt].ref;

    let originalWidth  = srcEl.offsetWidth;
    let originalHeight = srcEl.offsetHeight;

    let scaledCanvas = document.createElement('canvas');

    scaledCanvas.width        = originalWidth  * scaleFactor;
    scaledCanvas.height       = originalHeight * scaleFactor;
    scaledCanvas.style.width  = originalWidth  + 'px';
    scaledCanvas.style.height = originalHeight + 'px';

    let scaledContext = scaledCanvas.getContext('2d');
    scaledContext.scale(scaleFactor, scaleFactor);

    html2canvas(srcEl, { canvas: scaledCanvas })
    .then((canvas) => {
        imgRefs[blkCount].fields[fieldCnt].image = canvas.toDataURL('image/png');
        if(imgRefs[blkCount].fields[fieldCnt].w === undefined ||
           imgRefs[blkCount].fields[fieldCnt].h === undefined) {
            imgRefs[blkCount].fields[fieldCnt].w = originalWidth  * reduceFactor;
            imgRefs[blkCount].fields[fieldCnt].h = originalHeight * reduceFactor;
        }
        pngCollector(blkCount+1, context, imgRefs, paramFunc);
    });
}

export function pngCollector(blkCount, context, imgRefs, paramFunc) {
  if( blkCount < imgRefs.length ) {
    // if we find a png, we'll recurse from the promise.resolve
    let doRecurse = true;
    for(let fieldCnt = 0; fieldCnt < imgRefs[blkCount].fields.length; fieldCnt++) {
      if(imgRefs[blkCount].fields[fieldCnt].image != '') {
        // we may have already visited this field for this block
        continue;
      }
      switch(imgRefs[blkCount].fields[fieldCnt].type) {
        case 'png':
          doRecurse = false;
          canvasToPngHD(blkCount, context, imgRefs, fieldCnt, paramFunc);
          paramFunc = null;
          break;
        case 'key':
          doRecurse = false;
          let _data = localStorage.getItem(imgRefs[blkCount].fields[fieldCnt].key);
          if(_data) {
              let imgData = JSON.parse(_data);
              imgRefs[blkCount].fields[fieldCnt].image = imgData.image;
              imgRefs[blkCount].fields[fieldCnt].w     = imgData.width;
              imgRefs[blkCount].fields[fieldCnt].h     = imgData.height;
          }
          pngCollector(blkCount+1, context, imgRefs, paramFunc);
          paramFunc = null;
          break;
      }
    }
    if(doRecurse) {
      // no png or key found, recurse
      pngCollector(blkCount+1, context, imgRefs, paramFunc);
      paramFunc = null;
    }
  }
  else {
    for(let retryCnt = 0; retryCnt < 3; ++retryCnt) {
      if(!imageCollectionComplete(imgRefs)) {
          pngCollector(0, context, imgRefs, paramFunc);
          paramFunc = null;
      }
    }
    if(paramFunc && (typeof paramFunc == 'function')) {
      paramFunc(imgRefs);
    }
  }
}

export function generatePdf(blkCount, summaryContext, imgRefs) {
  return dispatch => {
    pngCollector(blkCount, summaryContext, imgRefs, pdfBuilder);
  };
}

export function showIntermodalUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: INTERMODAL_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}


export function showConcreteUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showParkingUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: PARKING_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showOverlayUnbondedAsphaltUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: OVERLAY_UNBONDED_ASPHALT_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showOverlayBondedConcreteUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: OVERLAY_BONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showOverlayUnbondedConcreteUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: OVERLAY_UNBONDED_CONCRETE_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showNewCompositeJpcpUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: NEW_COMPOSITE_JPCP_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function showNewCompositeRccUserDefinedCompositeKValueRadioButtonValue(value) {
  return {
    type: NEW_COMPOSITE_RCC_SET_COMPOSITE_K_VALUE_RADIO_BUTTON_VALUE,
    payload: value
  };
}

export function setTrafficFormInputDisabled(module, isDisabled) {
  let type;
  if (module === CONCRETE_MODULE) {
     type = CONCRETE_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED;
  } else if (module === OVERLAY_MODULE) {
     type = OVERLAY_SET_TRAFFIC_FORM_INPUTS_DROPDOWN_DISABLED;
  }
  return {
    type: type,
    payload: isDisabled
  }
}

export function addPavementStructureType(module, pavementType) {
  let type;
  if (module === CONCRETE_MODULE) {
     type = CONCRETE_ADD_PAVEMENT_STRUCTURE_TYPE;
  } else if (module === OVERLAY_MODULE) {
     type = OVERLAY_ADD_PAVEMENT_STRUCTURE_TYPE;
  }
  return {
    type: type,
    payload: pavementType
  };
}

export function addNewCompositePavementStructureType(pavementType) {
  return {
    type: NEW_COMPOSITE_ADD_PAVEMENT_STRUCTURE_TYPE,
    payload: pavementType
  };
}

export function removePavementStructureType(module) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_REMOVE_PAVEMENT_STRUCTURE_TYPE;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_REMOVE_PAVEMENT_STRUCTURE_TYPE;
  }
  return {
    type: type
  };
}

export function setCustomTrafficSpectrumFormValues(module, object) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else if (module === NEW_COMPOSITE_MODULE) {
    type = NEW_COMPOSITE_SET_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else {
      console.log("MISSING CustomTrafficSpectrumFormValues for " + module);
  }
  return {
    type: type,
    payload: object
  };
}

export function setMrsgInputValue(module, object) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_SET_MRSG_INPUT_VALUE;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_SET_MRSG_INPUT_VALUE;
  }
  return {
    type: type,
    payload: object
  };
}

export function setEditAsphaltAnalysisButtonValue(module, showEdit) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_EDIT_ASPHALT_ANALYSIS_BUTTON;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_EDIT_ASPHALT_ANALYSIS_BUTTON;
  }
  return {
    type: type,
    payload: showEdit
  };
}

export function setEditDefaultAsphaltAnalysisParametres(module, canEdit) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_EDIT_DEFAULT_ASPHALT_ANALYSIS_PARAMETRES;
  }
  return {
    type: type,
    payload: canEdit
  };
}

export function setAsphaltAnalysisFormValues(module, formValuesObject) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_SET_ASPHALT_ANALSIS_FORM_VALUES;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_SET_ASPHALT_ANALSIS_FORM_VALUES;
  }
  return {
    type: type,
    payload: formValuesObject
  };
}

export function setTrafficSummaryDetailFormValues(module, object) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_SET_TRAFFIC_SUMMARY_FORM_VALUES;
  } else if (module === OVERLAY_MODULE) {
    type = OVERLAY_SET_TRAFFIC_SUMMARY_FORM_VALUES;
  } else if (module === NEW_COMPOSITE_MODULE) {
    type = NEW_COMPOSITE_SET_TRAFFIC_SUMMARY_FORM_VALUES;
  } else if (module === PARKING_MODULE) {
    type = PARKING_SET_TRAFFIC_SUMMARY_FORM_VALUES;
  } 
  return {
    type: type,
    payload: object
  };
}

export function setInitialCustomTrafficSpectrumFormValues(module, object) {
  let type;
  if (module === CONCRETE_MODULE) {
    type = CONCRETE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else if (module ===  OVERLAY_MODULE) {
    type = OVERLAY_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else if (module === NEW_COMPOSITE_MODULE) {
    type = NEW_COMPOSITE_SET_INITIAL_CUSTOM_TRAFFIC_SPECTRUM_FORM_VALUES;
  } else {
    console.log("MISSING InitialCustomTrafficSpectrumFormValues for " + module);
  }
  return {
    type: type,
    payload: object
  };
}

//Parking
export function setParkingPavementStructureRowChosenValue(object) {
  return {
    type:  PARKING_PAVEMENT_STRUCTURE_SET_ROW_CHOSEN,
    payload: object
  };
}
