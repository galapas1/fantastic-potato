import React , { Component } from 'react';
import { FieldInput, Dropdown } from 'Components';
import { Field, Fields, FieldArray, change, registerField, unregisterField } from 'redux-form';
import { connect } from 'react-redux';
import '../../../../components/Forms/Forms.scss';
import { debounce, each } from 'underscore';
import NewCompositeOtherStructureFormTableArrayFields from './NewCompositeOtherStructureFormTableArrayFields';
import { pngCollector, saveImages } from 'Actions';
import { 
  MODULUS_OF_ELASTICITY, 
  LAYER_THICKNESS,
  NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN,
  STRUCTURE_LAYER_MEMBERS,
  CEMENT_TREATED_BASE,
  ROLLER_COMPACTED_BASE,
  FULL_DEPTH_RECLAMATION,
  LEAN_CONCRETE_BASE,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 1}, {name: 2}, {name: 3}];
const fieldNames = [STRUCTURE_LAYER_MEMBERS];

const renderAllErrors = fields => {
   const { meta } = fields[STRUCTURE_LAYER_MEMBERS];
   const numberOfLayers = fields.numberOfLayers;
   let items = [];
   for (let i = 0; i < numberOfLayers; i++) {

     const modulusTouched = meta[i] && meta[i][MODULUS_OF_ELASTICITY] && meta[i][MODULUS_OF_ELASTICITY].touched;
     const modulusError = meta[i] && meta.error && meta.error[i] && meta.error[i][MODULUS_OF_ELASTICITY];
     const thicknessTouched = meta[i] && meta[i][LAYER_THICKNESS] && meta[i][LAYER_THICKNESS].touched;
     const thiicknessError = meta[i] && meta.error && meta.error[i] && meta.error[i][LAYER_THICKNESS];
     const poissonsTouched = meta[i] && meta[i]['poissonsRatio'] && meta[i]['poissonsRatio'].touched;
     const poissonsError = meta[i] && meta.error && meta.error[i] && meta.error[i]['poissonsRatio'];

     let isSecondModuluesPresent = false;
     let dropdownLayerName =  fields.structureLayerMembers.input.value[i]['layerTypeName'];
     if (dropdownLayerName === CEMENT_TREATED_BASE || dropdownLayerName === ROLLER_COMPACTED_BASE || dropdownLayerName == LEAN_CONCRETE_BASE || dropdownLayerName == FULL_DEPTH_RECLAMATION ) {
       isSecondModuluesPresent = true;
     }
     const secondModulusTouched = isSecondModuluesPresent && meta[i] && meta[i]['modulusOfRupture'] && meta[i]['modulusOfRupture'].touched;
     const secondModulusError = isSecondModuluesPresent && meta[i] && meta.error && meta.error[i] && meta.error[i]['modulusOfRupture'];

    items.push(
      <div style={{fontSize: 12}} key={i}>
        {modulusTouched && modulusError && <div>{`Layer ${i+ 1} Modulus of Elasticity -  ${meta.error[i][MODULUS_OF_ELASTICITY]} `}</div>} 
        {thicknessTouched && thiicknessError && <div>{`Layer ${i+ 1} Layer Thickness - ${meta.error[i][LAYER_THICKNESS]} `}</div>}
        {poissonsTouched && poissonsError && <div>{`Layer ${i+ 1} Poissons Ratio - ${meta.error[i]['poissonsRatio']} `}</div>}
        {secondModulusTouched && secondModulusError && <div>{`Layer ${i+ 1} Modulus of Rupture - ${meta.error[i]['modulusOfRupture']} `}</div>}
      </div>
    )

   }
   if (items) {
    return <div style={{color: 'red', marginBottom: 10}}>{items}</div>;
   }
   return null; 
  
}

class NewCompositeCommonOtherStructureForm extends Component {

  constructor(props) {
    super(props);
    this.state = {showModulusOfRuptureLabel: false}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newCompositeStructureNumberOfLayersDropdown !== this.props.newCompositeStructureNumberOfLayersDropdown) {
      const newDropdownValue = nextProps.newCompositeStructureNumberOfLayersDropdown;
      const oldDropdownValue = this.props.newCompositeStructureNumberOfLayersDropdown;
      this.setArrayFieldValues(oldDropdownValue, newDropdownValue);
    }
  }
  
  componentWillMount() {
     this.delayedCallback = debounce(function (cb) {
        cb();    
    }, 750);
  }

  addFieldToStructureLayer(number) {
    for (let i = 0; i < number; i++) {
      this.arrayFieldRef.getRenderedComponent().props.fields.push({});
    }
  }

  removeFieldToStructureLayer(number) {
    for (let i = 0; i < number; i++) {
      this.arrayFieldRef.getRenderedComponent().props.fields.pop();
    }
  }

  setArrayFieldValues(oldDropdownValue, newDropdownValue) {
    let difference;
    if (oldDropdownValue < newDropdownValue) {
      difference = newDropdownValue - oldDropdownValue;
      this.addFieldToStructureLayer(difference);
    } else {
      difference = oldDropdownValue - newDropdownValue;
      this.removeFieldToStructureLayer(difference)
    }
  }

  setArrayFieldValueOnDropdownValueChange(field, value) {
    this.props.changeFieldValue(this.props.structureTableLayerForm, field, value);
  }

  registerModulusOfRupture(field, value) {
    this.props.registerFieldValue(this.props.structureTableLayerForm, field, value )
  }

  unregisterFields(structureLayer) {
    const { unregisterFieldValue } = this.props;
    const inputs = ['layerTypeName', MODULUS_OF_ELASTICITY, LAYER_THICKNESS, 'poissonsRatio', 'modulusOfRupture'];
    const self = this;
    each(inputs, function(input) {
      if (`${structureLayer}[${input}]`) {
        unregisterFieldValue(self.props.structureTableLayerForm, `${structureLayer}[${input}]`);
      }
    })
  }

  setFieldWidths(boolean) {
   if (boolean) {
     this.setState({showModulusOfRuptureLabel: true});
   } else {
     this.setState({showModulusOfRuptureLabel: false});
   }
  }

  render() {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100%", 
        width: "100%"}}>
        <div style={{  width: "100%", textAlign: "center", paddingTop: 20, fontWeight: "bold", paddingBottom: 20}}>STRUCTURE</div>
        <div style={{height: "100%", width: "100%", paddingLeft: 20, paddingRight: 20, borderLeft: '1px solid'}}>
         <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <div className='form-group-div' style={{position: 'relative', zIndex: 101}}>
             <div style={{display: "flex", width: "100%", flexDirection: "column"}}>
              <label style={{fontWeight: "bold"}} className="form-label">{this.props.dropdownLabel}</label>
              <Field name={NEW_COMPOSITE_STRUCTURE_NUMBER_OF_LAYERS_DROPDOWN} list={dropdownValues} defaultValue={{name: '1 Layer'}} isSmallDropdown='true' component={Dropdown} />
            </div>
            </div>
            <div ref="PavementStructureSubbase" className='form-group-div' style={{width: "100%", display: "flex"}}>
                <div style={{fontSize: 10, width: "100%"}}>
                  <label style={{ fontWeight: "bold", width: "33%", textAlign: "center"}}>Layer Type</label>
                  <label style={{ fontWeight: "bold", width: this.state.showModulusOfRuptureLabel ? '23%' : "33%", textAlign: "center"}}>Modulus of Elasiticity</label>
                  <label style={{ fontWeight: "bold", width: this.state.showModulusOfRuptureLabel ? '16%' : "18%", textAlign: "center"}}>Layer Thickness</label>
                  <label style={{ fontWeight: "bold", width: this.state.showModulusOfRuptureLabel ? '12%' : "16%", textAlign: "center"}}>Poisson's Ratio</label>
                  {this.state.showModulusOfRuptureLabel && <label style={{ fontWeight: "bold", width: "16%", textAlign: "center"}}>Modulus of Rupture</label>}
                </div>
                <div style={{width: "100%", border: "1px solid gray", backgroundColor: "silver", marginBottom: 3, textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 30}}>
                  <label style={{margin: 0}}>{this.props.title}</label>
                </div>
                <FieldArray ref={(el) => { this.arrayFieldRef = el;}} withRef name={STRUCTURE_LAYER_MEMBERS} zIndexValues={[100, 90, 80]} component={NewCompositeOtherStructureFormTableArrayFields} setArrayFieldValueOnDropdownValueChange={this.setArrayFieldValueOnDropdownValueChange.bind(this)} doesAnyFieldContainLimeORCement={this.setFieldWidths.bind(this)} isUnitTypeMetric={this.props.unitType === METRIC}  withRef informParentComponentDidUpdate={this.componentDidUpdate.bind(this)}/>

                <div style={{ width: "100%", border: "1px solid gray", backgroundColor: "saddlebrown", textTransform: "uppercase", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", height: 30}}>
                  <label style={{margin: 0}}>SubGrade</label>
                </div>
            </div>
            <Fields numberOfLayers={this.props.newCompositeStructureNumberOfLayersDropdown} names={fieldNames} component={renderAllErrors}/>

          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
      var imgRefs = [{
          fields: [
              { type: 'png', ref: this.refs.PavementStructureSubbase, image: '', key: '@PavementStructureSubbase', w: 400, h: 100 },
          ]
      }];

      if(this.props.anyTouched) {
        pngCollector(0, this, imgRefs, saveImages);
      }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    registerFieldValue: (form, field, value) => {
      dispatch(registerField(form, field, value));
    },
    unregisterFieldValue: (form, field) => {
      dispatch(unregisterField(form, field));
    },

  };
}

NewCompositeCommonOtherStructureForm = connect(
 null, mapDispatchToProps
)(NewCompositeCommonOtherStructureForm)

export default NewCompositeCommonOtherStructureForm;
