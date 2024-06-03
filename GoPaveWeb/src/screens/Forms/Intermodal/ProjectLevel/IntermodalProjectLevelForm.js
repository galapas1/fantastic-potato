import React , { Component } from 'react';
import { Popup, ToggleButton } from 'Components';
import { connect } from 'react-redux';
import { FooterForm } from 'Components';
import { pick, extend } from 'underscore';
import { initialize } from 'redux-form';
import { showPopup,
         setUserVehicleWheelPostions,
         addSelectedUserVehicles,
         removeSelectedUserVehiclesAtIndex,
         deleteIntermodalVehicle,
         setCurrentProjectUnitType,
         setStateToInitialState,
         setStoreStateToNill,
         getIntermodalVehicles } from 'Actions';
import { getUnits            } from 'HelperFunctions/getUnits';
import { MyImage, GridLine, Axle } from 'Forms/Intermodal/components/addIntermodalVehicleComponents';
import { Layer, Stage, Group, Image, Line, Label, Tag, Text} from 'react-konva';
import {
  INTERMODAL_CUSTOM_VEHICLE_POPUP,
  INTERMODAL_ADD_VEHICLE_FORM,
  INTERMODAL,
  METRIC,
  US,
} from  'Constants';

const gearConfigValues = {
  0: 'Zero',
  1: 'Single',
  2: 'Dual',
  3: 'Tri',
  4: 'Quad'
}

const numberOfWheels = {
  '2 Wheels': 2,
  '3 Wheels': 3,
  '4 Wheels': 4,
  '5 Wheels': 5,
  '6 Wheels': 6,
  '7 Wheels': 7,
  '8 Wheels': 8,
  '9 Wheels': 9,
  '10 Wheels': 10,
  '11 Wheels': 11,
  '12 Wheels': 12,
  '13 Wheels': 13,
  '14 Wheels': 14,
  '15 Wheels': 15,
  '16 Wheels': 16,
}
class IntermodalProjectLevelForm extends Component {
    constructor(props){
        super(props);
        const { unitType } = this.props;
        this.state = {
            unitType: unitType,
        }

        // draw axles handle
        this.drawAxle = this.drawAxle.bind(this);

        // wheel event handles
        this.fitWheelGrid       = this.fitWheelGrid.bind(this);
        this.fitAllWheelsGrid   = this.fitAllWheelsGrid.bind(this);
        this.boardChange        = this.boardChange.bind(this);
        this.renderStandardAxis = this.renderStandardAxis.bind(this);
    };

    shouldComponentUpdate(nextProps) {
        if (!nextProps.params.formType) {
            return false;
        }

        const { setCurrentProjectUnitType,
                getIntermodalVehicles,
                unitType } = nextProps; 

        const newUnitType = !!this.state.unitType ? this.state.unitType : unitType;
        const selectedVehicles = this.props.selectedVehicles;

        if(this.props.unitType !== newUnitType) {
            // clear selected vehicles
            var indx = selectedVehicles.length;
            while (indx--) {
                this.props.removeSelectedUserVehiclesAtIndex(indx);
            }

            getIntermodalVehicles(newUnitType);
            setCurrentProjectUnitType(newUnitType);

            this.boardChange(newUnitType);
            return true;
        }

        const vehicles = this.props.vehicles;
        if(JSON.stringify(vehicles) !== JSON.stringify(nextProps.vehicles)) {
            return true;
        }

        if(JSON.stringify(selectedVehicles) !== JSON.stringify(nextProps.selectedVehicles)) {
            return true;
        }

        return false;
    }

    setUnitTypeValue(value) {
      this.setState({ unitType: value })
      this.state.unitType = value;
    }

    componentWillMount(){
        var { unitType } = this.props;
        this.state = {
            unitType,
            sizeRatio: 24,
            unitLength: 15,
            board:{
                width: 300,
                height: 350
            },
            wheel: {
                width: 15,
                height: 50
            },
            wheelCount: 0,
            vehicleName: '',
            image: null,
            wheelPos: [],
            axlesDown: {
                x: null,
                y: null
            },
            axles: [],
            input: {
                width: 570,
                height: 600
            },
            show: false
        };

        for (let i=0; i<this.state.wheelCount; i++) {
             this.state.wheelPos.push({
                 x: this.state.wheelPos[i] ? this.state.wheelPos[i].x : i*this.state.wheel.width,
                 y: this.state.wheelPos[i] ? this.state.wheelPos[i].y : -this.state.wheel.height
             })
        }
        window.removeEventListener("resize", this.boardChange);
    }

    componentDidMount(){
      this.boardChange();
    }

    boardChange(newUnitType){
        if(!newUnitType) {
          newUnitType = this.props.unitType;
        }
        var boardWidth = 300,
            boardHeight = 350;
        var sizeRatio = 24;

        if(newUnitType === METRIC) {
            boardWidth = 400;
            boardHeight = 450;
            sizeRatio = 48;
        }

        let tempBoard = {
            width: boardWidth,
            height: boardHeight
        }

        let wheelSize = this.state.wheel;
        wheelSize.width = (tempBoard.width - (tempBoard.width % this.state.sizeRatio)) / sizeRatio;
        wheelSize.height = (tempBoard.height - (tempBoard.height % this.state.sizeRatio)) / sizeRatio;
        this.setState({wheel: wheelSize});

        let boardPan = this.state.board;
        boardPan.width = wheelSize.width * sizeRatio;
        boardPan.height = wheelSize.height * sizeRatio;
        this.setState({board: boardPan});
        this.setState({sizeRatio: sizeRatio});

        this.drawGridLines();

        // fit wheels to grids
        for(let index=0; index<this.state.wheelPos.length; index++){
            let tempPos = this.fitWheelGrid(this.state.wheelPos[index].x, this.state.wheelPos[index].y, index);
            let wheelPos = this.state.wheelPos;
            wheelPos[index].x = tempPos.x;
            wheelPos[index].y = tempPos.y;
            this.setState({
                wheelPos: wheelPos
            });
        }

        // fit wheels to default position
        let wheelPosTemp = [];

        for (let i=0; i<this.state.wheelCount; i++) {
            wheelPosTemp.push({
                x: i*this.state.wheel.width,
                y: -this.state.wheel.height
            })
        }

        this.props.setUserVehicleWheelPostions(wheelPosTemp);
        //this.setState({wheelPos: wheelPosTemp}, function () {
        //    this.drawAxle();
        //});
    }

    fitWheelGrid(x, y, index){
        if(x%this.state.wheel.width < (this.state.wheel.width/2)) {
            x = Math.floor(x / this.state.wheel.width) * this.state.wheel.width;
        }else{
            x = Math.ceil(x / this.state.wheel.width) * this.state.wheel.width;
        }
        if(y%this.state.wheel.height < (this.state.wheel.height/2)) {
            y = Math.floor(y / this.state.wheel.height) * this.state.wheel.height;
        }else{
            y = Math.ceil(y / this.state.wheel.height) * this.state.wheel.height;
        }
        return {x: x, y:y};
    }

    fitAllWheelsGrid(){
        // fit wheels to grids
        for(let index=0; index<this.state.wheelPos.length; index++){
            let tempPos = this.fitWheelGrid(this.state.wheelPos[index].x, this.state.wheelPos[index].y, index);
            let wheelPos = this.state.wheelPos;
            wheelPos[index].x = tempPos.x;
            wheelPos[index].y = tempPos.y;
            this.setState({
                wheelPos: wheelPos
            });
        }
    }

    drawGridLines(){
        let grid_lines = [];
        for(let h=0; h<this.state.sizeRatio; h++){
            grid_lines.push(
                <GridLine
                    key={100+h}
                    points={[0, -h*this.state.wheel.height, (this.state.wheel.width * this.state.sizeRatio), -h*this.state.wheel.height]}
                    x={0} y={0}
                    stroke="#c0c0c0"
                    strokeWidth={1}
                />)
        }
        for(let w=0; w<this.state.sizeRatio; w++){
            grid_lines.push(
                <GridLine
                    key={200+w}
                    points={[w*this.state.wheel.width, 0, w*this.state.wheel.width, -this.state.wheel.height * this.state.sizeRatio]}
                    x={0} y={0}
                    stroke="#c0c0c0"
                    strokeWidth={1}
                />)
        }
        return(grid_lines);
    }

    drawAxle(){
        let axles = [];
        for(let i=0; i<this.state.wheelPos.length-1; i++){
            for(let j=i+1; j<this.state.wheelPos.length; j++){
                if(this.state.wheelPos[i].y == this.state.wheelPos[j].y){
                    axles.push(
                        <GridLine
                            key={300+i*16+j}
                            points={
                                [
                                    parseFloat(this.state.wheelPos[i].x)+parseFloat(this.state.wheel.width/2),
                                    parseFloat(this.state.wheelPos[i].y)+parseFloat(this.state.wheel.height/2),
                                    parseFloat(this.state.wheelPos[j].x)+parseFloat(this.state.wheel.width/2),
                                    parseFloat(this.state.wheelPos[j].y)+parseFloat(this.state.wheel.height/2)
                                ]
                            }
                            x={0} y={0}
                            stroke="#4d4d4d"
                            strokeWidth={this.state.wheel.height/4}

                        />
                    );

                }
            }
        }
        this.setState({axles: axles});
        return(axles);
    }


    renderStandardAxis(realCoordinate, axis){
        let unit;
        if(axis == 'x') {
            unit = realCoordinate / this.state.wheel.width;
        } else{
            unit = realCoordinate / this.state.wheel.height;
        }
        return Math.round(unit * this.state.unitLength * 10) / 10;
    }

    revertStandardAxis(unitCoordinate, axis){
        let real;
        if(axis == 'x') {
            real = unitCoordinate / this.state.unitLength;
            real = real * this.state.wheel.width;
        } else{
            real = unitCoordinate / this.state.unitLength;
            real = real * this.state.wheel.height;
        }
        return real;
    }

  onClickHandler(vehicleId, vehicle) {
    let selectedVehicles = this.props.selectedVehicles;
    let itemIndex = selectedVehicles.indexOf(vehicleId);

    if (itemIndex === -1) {
      this.props.addSelectedUserVehicles(vehicleId);
    } else {
       this.props.removeSelectedUserVehiclesAtIndex(itemIndex);
    }

    let wheelPos = [];
    for (let i=0; i< vehicle.numberOfWheels; i++) {
      wheelPos.push({
         x: vehicle.xAxleCoords[i],
         y: vehicle.yAxleCoords[i]
       })
     }

    this.setState({wheelCount: vehicle.numberOfWheels});
    this.setState({vehicleName: vehicle.name});

    //this.props.setUserVehicleWheelPostions(wheelPos);
    this.setState({
        wheelPos: wheelPos
    }); //, function () {
    //    this.drawAxle();
    //});
  }

  onClickAddVehicleButton() {
    let numberOfWheelsDropdownValue = '2 Wheels'
    let wheelPos = [];

    for (let i=0; i< numberOfWheels[numberOfWheelsDropdownValue]; i++) {
      wheelPos.push({
         x: wheelPos[i] ? wheelPos[i].x : 0,
         y: wheelPos[i] ? wheelPos[i].y : i*-40
       })
     }

    this.props.setUserVehicleWheelPostions(wheelPos);
    this.props.initializeForm(INTERMODAL_ADD_VEHICLE_FORM, {wheelCount: '2 Wheels'} )
    this.props.showPopup(INTERMODAL_CUSTOM_VEHICLE_POPUP);
  }

  onClickEditVehicleButton(vehicle) {
    let initialValues = {};
    extend(initialValues, {wheelCount: `${vehicle.numberOfWheels} Wheels`})
    extend(initialValues, pick(vehicle, 'contactArea', 'contactPressure', 'id', 'canEdit', 'grossWeight'));
    extend(initialValues, {gearConfiguration: gearConfigValues[vehicle.gearConfiguration] });
    extend(initialValues, {vehicleName: vehicle.name});
    let wheelPos = [];
    for (let i=0; i< vehicle.numberOfWheels; i++) {
      wheelPos.push({
         x: vehicle.xAxleCoords[i],
         y: vehicle.yAxleCoords[i]
       })
     }
    this.props.setUserVehicleWheelPostions(wheelPos);
    this.props.initializeForm(INTERMODAL_ADD_VEHICLE_FORM, initialValues )
    this.props.showPopup(INTERMODAL_CUSTOM_VEHICLE_POPUP, {id: vehicle.id});
  }



  render() {
      const { isNonSignedInUser } = this.props;
      const { isUserSignedIn } = this.props;
      const { projectType } = this.props.params;
      const { unitType } = this.props;

    return (
        <div> <div style={{ zIndex: 10, paddingTop: 10, display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
            <div style={{ paddingTop: 10, paddingLeft: 30 }}>
                <div style={{ paddingLeft: 30, display: 'flex', width: '300px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', backgroundColor: 'whitesmoke', fontWeight: 'bold' }}>
                    <div style={{ paddingRight: 30, textTransform: 'capitalize', fontSize: 16 }}>Project Type:</div>
                    <div style={{ paddingRight: 10, textTransform: 'capitalize', fontSize: 16 }}>{projectType}</div>
                </div></div>
         <div className='inner-column-forms' style={{overflowY: "auto"}}>
         <div style={{display: 'flex', width: '100%'}}>
           <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <div style={{marginTop: 30, marginBottom: 10, fontWeight: 'bold'}}>SELECT INTERMODAL PROJECT VEHICLES</div>
             <div style={{display: 'flex', flexDirection: 'column', width: '80%', height: '80%'}}>
               <div style={{display: 'flex', fontSize: 12, border: '1px solid rgb(15, 175, 175)', color: 'white', backgroundColor: 'rgb(15, 175, 175)', minHeight: '7%', borderTopRightRadius: 5, borderTopLeftRadius: 5, alignItems: 'center' }}>
                <div style={{width: '90%', display: 'flex', height: '100%'}}>
                  <div style={{width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Name</div>
                  <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}># of Wheels</div>
                  <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Gross Weight<span style={{ fontSize: 8, marginLeft: 2 }}>({getUnits('lbs', this.props.unitType === METRIC)})</span></div>
                  <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Contact Pressure <span style={{ fontSize: 8, marginLeft: 2 }}>({getUnits('psi', this.props.unitType === METRIC)})</span></div>
                  <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Contact Area <span style={{ fontSize: 8, marginLeft: 2 }}>({getUnits('inx', this.props.unitType === METRIC)}<sup>2</sup>)</span></div>

                </div>
                <div style={{width: '10%'}}></div>
               </div>
               <div style={{overflowY: 'auto'}}>
                {this.props.vehicles && this.props.vehicles.map((vehicle, index) => {
                const { selectedVehicles } = this.props;

                 return (
                  <div key={index} style={{display: 'flex', height: 40, alignItems: 'center', backgroundColor: selectedVehicles.indexOf(vehicle.id) === -1 ? 'white' : '#FE8350', borderBottom: '1px solid'}}>
                    <div style={{width: '90%', display: 'flex', height: '100%', cursor: 'pointer'}} onClick={this.onClickHandler.bind(this, vehicle.id, vehicle)}>
                      <div style={{width: '40%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{vehicle.name}</div>
                      <div style={{ width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{vehicle.numberOfWheels}</div>
                      <div style={{ width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{vehicle.grossWeight}</div>
                      <div style={{ width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{vehicle.contactPressure}</div>
                      <div style={{width: '15%', height: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{vehicle.contactArea}</div>



                    </div>
                    <div style={{width: '10%', display: 'flex'}}>
                     {vehicle.canEdit && <div onClick={this.onClickEditVehicleButton.bind(this, vehicle)} style={{backgroundImage: 'url(/icons/ACPA_Edit.png)', backgroundRepeat: 'no-repeat',height: 25, minWidth: 25, cursor: 'pointer', marginRight: 10 }}></div>}
                     {vehicle.canEdit && <div onClick={() => this.props.deleteIntermodalVehicle(vehicle.id)}style={{backgroundImage: 'url(/icons/Blue_Trash.png)', backgroundRepeat: 'no-repeat',height: 25, minWidth: 25, cursor: 'pointer' }}></div>}
                    </div>
                  </div>
                 )
                }
                )}
               </div>
             </div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
               <div style={{ width: 150, height: 25, marginTop: 5, marginLeft: 50, display: 'flex' }}>
                   <label style={{ paddingRight: 6, marginTop: 5 }}>Units </label>

                   <ToggleButton options={['US', 'METRIC']}
                                 style={{ padding: 0, paddingLeft: 6, paddingRight: 6, marginTop: 5 }} 
                                 setParentValue={this.setUnitTypeValue.bind(this)}
                                 buttonSelected={this.props.unitType}
                                 isProjectLevelForm={true} />
               </div>

                        {isNonSignedInUser && <div><button className='btn btn-primary' disabled='true' style={{ backgroundColor: "#3299CC", color: "white", marginTop: 30, width: '50%' }} onClick={this.onClickAddVehicleButton.bind(this)}>Add Custom Vehicle</button>
                        <div>Note: To add a custom vehicle you must be a registered user and sign-in.</div></div>}
                        {isUserSignedIn && <button className='btn btn-primary' style={{ backgroundColor: "#3299CC", color: "white", marginTop: 30, width: '50%' }} onClick={this.onClickAddVehicleButton.bind(this)}>Add Custom Vehicle</button>}

             <div>
              {this.state.vehicleName && <div  style={{ marginLeft: -200, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none'}} ref="board">
                  <label> Vehicle Name: {this.state.vehicleName}</label>
                  <label style={{marginBottom: 15}}>Vehicle Image</label>
                   <Stage
                            ref="stage"
                            width={this.state.board.width}
                            height={this.state.board.height}
                            y={this.state.wheel.height * this.state.sizeRatio}
                            x={0}
                            style={{border: '1px solid rgb(15, 175, 175)'}}
                            className="mt-100 stage-border mb-30"
                        >
                            <Layer ref="background">
                                {
                                    this.drawGridLines()
                                }
                            </Layer>
                            <Layer ref="axle">
                                {
                                    //this.state.axles
                                }
                            </Layer>
                            <Layer ref="layer">
                                {
                                    this.state.wheelPos.map((wheelPos, i) => {
                                        let _x = this.state.wheelPos[i].x+30;
                                        if (_x > this.state.board.width) {
                                            _x = this.state.board.width-this.state.wheel.width;
                                        }

                                        let _y = this.state.wheelPos[i].y-30;
                                        if (Math.abs(_y) > this.state.board.height) {
                                            _y = -(this.state.board.height-this.state.wheel.height);
                                        }
                                        return(
                                            <MyImage
                                                key={i}
                                                x={_x}
                                                y={_y}
                                                width={this.state.wheel.width}
                                                height={this.state.wheel.height}
                                            />
                                        );
                                    })
                                }

                            </Layer>
                        </Stage>
              </div>}
             </div>
           </div>
        </div>
        </div>
        <FooterForm formType='projectLevelForm' {...this.props} />
        <Popup popup={INTERMODAL_CUSTOM_VEHICLE_POPUP}/>
      </div></div>
    )
  }
}

IntermodalProjectLevelForm = connect(
  state => {
    const vehicles =  state.currentProject.intermodalFormValues.vehicles;
    const selectedVehicles = state.currentProject.intermodalFormValues.selectedVehicles;
    const isUserSignedIn = state.auth.authenticated;
    const isNonSignedInUser = state.auth.isNonSignedInUser;

    return {
        vehicles, selectedVehicles, isUserSignedIn, isNonSignedInUser
    }
  }
)(IntermodalProjectLevelForm)

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    const constructionType = INTERMODAL;
    return {
        unitType, constructionType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addSelectedUserVehicles: (vehicle) => {
            dispatch(addSelectedUserVehicles(vehicle));
        },
        removeSelectedUserVehiclesAtIndex: (vehicle) => {
            dispatch(removeSelectedUserVehiclesAtIndex(vehicle));
        },
        showPopup: (popup, popupDetails) => {
            dispatch(showPopup(popup, popupDetails));
        },
        initializeForm: (form, formValues) => {
            dispatch(initialize(form, formValues))
        },
        setUserVehicleWheelPostions:(value) => {
            dispatch(setUserVehicleWheelPostions(value));
        },
        deleteIntermodalVehicle:(id) => {
            dispatch(deleteIntermodalVehicle(id));
        },
        setStateToInitialState: () => {
            dispatch(setStateToInitialState());
        },
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
        getIntermodalVehicles: (value) => {
            dispatch(getIntermodalVehicles(value));
        },
    };
}

IntermodalProjectLevelForm = connect(
    mapStateToProps, mapDispatchToProps
)(IntermodalProjectLevelForm);

export default IntermodalProjectLevelForm;
