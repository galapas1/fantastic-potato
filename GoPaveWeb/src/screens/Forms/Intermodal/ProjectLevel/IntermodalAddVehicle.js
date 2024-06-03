
import React, { Component } from 'react';
import { FieldInput, Dropdown, NormalInput } from 'Components';
import { connect } from 'react-redux';
import { Field, FieldArray, change, reduxForm } from 'redux-form';
import {  pick, extend, pluck } from 'underscore';
import { MyImage, GridLine, Axle } from 'Forms/Intermodal/components/addIntermodalVehicleComponents';
import {Layer, Stage, Group, Image, Line, Label, Tag, Text} from 'react-konva';

import { setCurrentProjectUnitType } from 'Actions';
import { getUnits                  } from 'HelperFunctions/getUnits';

import {
  INTERMODAL_ADD_VEHICLE_FORM,
  METRIC
} from  'Constants';

const dropdownValues = [{name: 'Zero'}, {name: 'Single'}, {name: 'Dual'}, {name: 'Tri'}, {name: 'Quad'} ];
const wheelDropdownValues = [{name: '2 Wheels'}, {name: '3 Wheels'}, {name: '4 Wheels'}, {name: '5 Wheels'}, {name: '6 Wheels'}, {name: '7 Wheels'}, {name: '8 Wheels'}, {name: '9 Wheels'}, {name: '10 Wheels'}, {name: '11 Wheels'}, {name: '12 Wheels'}, {name: '13 Wheels'}, {name: '14 Wheels'}, {name: '15 Wheels'}, {name: '16 Wheels'} ];

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

class IntermodalAddVehicle extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.xPosChange = this.xPosChange.bind(this);
    this.yPosChange = this.yPosChange.bind(this);

    // image mouse event handles
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);

    // draw axles handle
    this.drawAxle = this.drawAxle.bind(this);
    this.axleDownHandle = this.axleDownHandle.bind(this);
    this.axleMoveHandle = this.axleMoveHandle.bind(this);
    this.axleUpHandle = this.axleUpHandle.bind(this);

    // wheel event handles
    this.fitWheelGrid = this.fitWheelGrid.bind(this);
    this.fitAllWheelsGrid = this.fitAllWheelsGrid.bind(this);
    this.setWheelPos = this.setWheelPos.bind(this);

    // board event handles
    this.changeBoardWidth = this.changeBoardWidth.bind(this);
    this.changeBoardHeight = this.changeBoardHeight.bind(this);
    this.boardChange = this.boardChange.bind(this);
    this.handleSetSize = this.handleSetSize.bind(this);
    this.handleBoardWidth = this.handleBoardWidth.bind(this);
    this.handleBoardHeight = this.handleBoardHeight.bind(this);
    this.renderStandardAxis = this.renderStandardAxis.bind(this);
  }

    shouldComponentUpdate(nextProps) {
        const { setCurrentProjectUnitType, unitType } = nextProps; 

        const newUnitType = !!this.state.unitType ? this.state.unitType : unitType;

        if (this.props.unitType !== unitType) {
            setCurrentProjectUnitType(newUnitType);
            this.boardChange(newUnitType);
        }
        return true;
    }

  componentWillMount(){
    this.state = {
      sizeRatio: 24,
      unitLength: 15,
      board:{
        width: 500,
        height: 300
      },
      wheel: {
        width: 15,
        height: 50
      },
      wheelCount: '',
      vehicleName: this.props.vehicleName,
      contractArea: this.props.contactArea,
      contractPressure: this.props.contractPressure,
      grossWeight: this.props.grossWeight,
      gearConfiguration: this.props.gearConfiguration,
      image: null,
      wheelPos: [],
      axlesDown: {
        x: null,
        y: null
      },
      axles: [],
      input: {
        width: 550,
        height: 475
      },
      show: false
    };

    //window.removeEventListener("resize", this.boardChange);
  }

  componentDidMount(){
    //window.addEventListener("resize", this.boardChange);
    this.boardChange();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wheelCount !== this.props.wheelCount) {
      this.props.setUserVehicleWheelCount(nextProps.wheelCount);
      // this.setState({wheelCount: nextProps.wheelCount});
    }

    if (nextProps.wheelPos !== this.props.wheelPos) {
      this.drawAxle(nextProps);
      this.props.setUserVehicleWheelPostions(nextProps.wheelPos);
      // this.setState({wheelPos: nextProps.wheelPos});
    }
  }

  handleChange(value){
    let wheelPosTemp = [];
    this.props.setUserVehicleWheelCount(numberOfWheels[value]);
    //this.setState({wheelCount: numberOfWheels[value]});
    for (let i=0; i<numberOfWheels[value]; i++) {
        wheelPosTemp.push({
            x: i*this.state.wheel.width,
            y: -this.state.wheel.height
        })
    }
    this.props.setUserVehicleWheelPostions(wheelPosTemp);
    // this.setState({wheelPos: wheelPosTemp}, function () {
    //     this.drawAxle();
    // });
  }

  boardChange(newUnitType){
    var boardWidth = 300,
        boardHeight = 350;
    var sizeRatio = 24;

    if(newUnitType === METRIC) {
        boardWidth = 550;
        boardHeight = 650;
        sizeRatio = 48;
    }

    let tempBoard = {
        width: boardWidth,
        height: boardHeight
    }

    // if(tempBoard.height > window.innerHeight){
    //     tempBoard.height = window.innerHeight;
    // }
    // set wheel width and height
    let wheelSize = this.state.wheel;
    wheelSize.width = (tempBoard.width - (tempBoard.width % sizeRatio)) / sizeRatio;
    wheelSize.height = (tempBoard.height - (tempBoard.height % sizeRatio)) / sizeRatio;

    this.setState({wheel: wheelSize});

    let boardPan = this.state.board;
    boardPan.width = wheelSize.width * sizeRatio;
    boardPan.height = wheelSize.height * sizeRatio;

    this.setState({board: boardPan});
    this.setState({sizeRatio: sizeRatio});

    this.drawGridLines();

    // fit wheels to grids
    for(let index=0; index<this.props.wheelPos.length; index++){
        let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
        let wheelPos = this.props.wheelPos;
        wheelPos[index].x = tempPos.x;
        wheelPos[index].y = tempPos.y;
        this.setState({
            wheelPos: wheelPos
        });
    }

    // fit wheels to default position
    let wheelPosTemp = [];

    for (let i=0; i<this.props.wheelCount; i++) {
        wheelPosTemp.push({
            x: i*this.state.wheel.width,
            y: -this.state.wheel.height
        })
    }

    this.props.setUserVehicleWheelPostions(wheelPosTemp);
    // this.setState({wheelPos: wheelPosTemp}, function () {
    //     this.drawAxle();
    // });
  }

  changeBoardWidth(event){
    this.boardChange();
  }

  changeBoardHeight(event){
    this.boardChange();
  }

  xPosChange(event, index){
    let wheelPos = this.props.wheelPos;

    let tempPos = {
        x: wheelPos[index].x,
        y: wheelPos[index].y
    };

    wheelPos[index].x = this.revertStandardAxis(event.target.value, 'x');

    this.setState({
        axlesDown: tempPos
    });

     this.props.setUserVehicleWheelPostions(wheelPos);
    // this.setState({
    //     wheelPos: wheelPos
    // }, function () {
    //     this.drawAxle();
    // });
    // this.fitAllWheelsGrid();
  }

  yPosChange(event, index){
    let wheelPos = this.props.wheelPos;
    // let unitCoordinate = this.renderStandardAxis(event.target.value, 'y');

    let tempPos = {
        x: wheelPos[index].x,
        y: wheelPos[index].y
    };
    wheelPos[index].y = this.revertStandardAxis(-event.target.value, 'y');

    this.setState({
        axlesDown: tempPos
    });

    this.props.setUserVehicleWheelPostions(wheelPos);

    // this.setState({
    //     wheelPos: wheelPos
    // }, function () {
    //     // draw grid lines
    //     this.drawAxle();
    // });

    // this.fitAllWheelsGrid();
  }

  handleMouseUp(event, index){
    let x = event.target.attrs.x;
    let y = event.target.attrs.y;

    let posFactor = 1;
    if(this.props.unitType === METRIC) {
        //posFactor = 2.54;
    }

    // let index = event.target.index;
    // let tempPos = this.fitWheelGrid(x, y, index);
 
    let tempPos = {
        x: x,
        y: y
    };

    let wheelPos = this.props.wheelPos;
    wheelPos[index].x = tempPos.x;
    wheelPos[index].y = tempPos.y;
    this.props.setUserVehicleWheelPostions(wheelPos);
    // this.setState({
    //     wheelPos: wheelPos
    // });

    // draw grid lines
    this.drawAxle();
  }

  handleDragMove(event, index){
    if(event.target._lastPos.x < 0 || event.target._lastPos.x >= (this.state.board.width - 2* this.state.wheel.width)){
        // let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
        let tempPos = this.props.wheelPos[index];
        this.setWheelPos(index, tempPos);
    }
    if(event.target._lastPos.y < 0 || event.target._lastPos.y >= (this.state.board.height - this.state.wheel.height)){
        // let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
        let tempPos = this.props.wheelPos[index];
        this.setWheelPos(index, tempPos);
    }
  }

  setWheelPos(index, tempPos){
    let wheelPos = this.props.wheelPos;
    wheelPos[index].x = tempPos.x;
    wheelPos[index].y = tempPos.y;
    this.props.setUserVehicleWheelPostions(wheelPos);
    // this.setState({
    //     wheelPos: wheelPos
    // });
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
      for(let index=0; index<this.props.wheelPos.length; index++){
          let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
          let wheelPos = this.props.wheelPos;
          wheelPos[index].x = tempPos.x;
          wheelPos[index].y = tempPos.y;
          this.props.setUserVehicleWheelPostions(wheelPos);
          // this.setState({
          //     wheelPos: wheelPos
          // });
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

  drawAxle(passedInProps){
    let props;
    if (passedInProps) {
      props = passedInProps
    } else {
      props = this.props;
    }
    let axles = [];
    // debugger;
    for(let i=0; i<props.wheelPos.length-1; i++){
      for(let j=i+1; j<props.wheelPos.length; j++){
        if(props.wheelPos[i].y == props.wheelPos[j].y){
          axles.push(
            <GridLine
              key={300+i*16+j}
              points={
                [
                  parseFloat(props.wheelPos[i].x)+parseFloat(this.state.wheel.width/2),
                  parseFloat(props.wheelPos[i].y)+parseFloat(this.state.wheel.height/2),
                  parseFloat(props.wheelPos[j].x)+parseFloat(this.state.wheel.width/2),
                  parseFloat(props.wheelPos[j].y)+parseFloat(this.state.wheel.height/2)
                ]
              }
              x={0} y={0}
              stroke="#4d4d4d"
              strokeWidth={this.state.wheel.height/4}
              onDragStart={(event) => this.axleDownHandle(event, i, j)}
              onDragMove={(event) => this.axleMoveHandle(event, i, j)}
              onDragEnd={(event) => this.axleUpHandle(event, i, j)}
            />
          );
        }
      }
    }
    this.setState({axles: axles});
    return(axles);
  }

  // axles functions
  axleDownHandle(event, i, j){
    let tempPos = {
        x: event.evt.offsetX,
        y: event.evt.offsetY
    };
    this.setState({
        axlesDown: tempPos
    });
  }

  axleMoveHandle(event, i, j){
    let wheelPos = this.props.wheelPos;
    wheelPos[i].x = wheelPos[i].x + (event.evt.offsetX - this.state.axlesDown.x);
    wheelPos[i].y = wheelPos[i].y + (event.evt.offsetY - this.state.axlesDown.y);
    wheelPos[j].x = wheelPos[j].x + (event.evt.offsetX - this.state.axlesDown.x);
    wheelPos[j].y = wheelPos[j].y + (event.evt.offsetY - this.state.axlesDown.y);

    this.props.setUserVehicleWheelPostions(wheelPos);

    // this.setState({
    //     wheelPos: wheelPos
    // });
    // if(event.target._lastPos.x < 0 || event.target._lastPos.x >= (this.state.board.width - 2* this.state.wheel.width)){
    //     // let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
    //     this.setWheelPos(index, tempPos);
    // }
    // if(event.target._lastPos.y < 0 || event.target._lastPos.y >= (this.state.board.height - this.state.wheel.height)){
    //     // let tempPos = this.fitWheelGrid(this.props.wheelPos[index].x, this.props.wheelPos[index].y, index);
    //     this.setWheelPos(index, tempPos);
    // }
    let tempPos = {
        x: event.evt.offsetX,
        y: event.evt.offsetY
    };
    this.setState({
        axlesDown: tempPos
    });
  }

  axleUpHandle(event, i, j){
    // let wheelPos = this.props.wheelPos;
    // wheelPos[i].x = event.target.attrs.points[0] - this.state.wheel.width/2;
    // wheelPos[i].y = event.target.attrs.points[1] - this.state.wheel.height/2;
    // wheelPos[j].x = event.target.attrs.points[2] - this.state.wheel.width/2;
    // wheelPos[j].y = event.target.attrs.points[3] - this.state.wheel.height/2;
    //
    // this.setState({
    //     wheelPos: wheelPos
    // });
    // this.fitAllWheelsGrid();
    this.drawAxle();
  }

  handleSetSize(){
    this.setState({
        board: this.state.input
    }, function () {
        this.boardChange();
    })
    // this.refs.board.offsetWidth = this.state.input.width;
    // this.refs.board.offsetHeight = this.state.input.height;
  }

  handleBoardWidth(event){
    let input = this.state.board;
    input.width = event.target.value;
    this.setState({
        board: input
    }, function () {
        this.boardChange();
        this.drawAxle();
    })

  }

  handleBoardHeight(event){
    let input = this.state.board;
    input.height = event.target.value;
    this.setState({
        board: input
    }, function () {
        this.boardChange();
        this.drawAxle();
    })
  }

  renderStandardAxis(realCoordinate, axis){
    let unit;
    if(axis == 'x') {
        unit = realCoordinate / this.state.wheel.width;
    } else{
        unit = realCoordinate / this.state.wheel.height;
    }

    let posFactor = 1;
    if(this.props.unitType === METRIC) {
//        posFactor = 2.54;
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

  isVehicleNameAlreadyPresent(vehicleName) {
    return find(this.props.vehicles , function(vehicle) {
      return vehicle.name === vehicleName
    })
  }
 
  addIntermodalVehicle(id) {
    let vehicleValues = {};
    const xCoords = pluck(this.props.wheelPos, 'x');
    const yCoords = pluck(this.props.wheelPos, 'y');

    extend(vehicleValues, pick(this.props, 'contactArea', 'contactPressure', 'grossWeight','gearConfiguration'));
    extend(vehicleValues, {name: this.props.vehicleName});
    extend(vehicleValues, {unitType: this.props.unitType});
    extend(vehicleValues, {canEdit: true, numberOfWheels: numberOfWheels[this.props.wheelCount], yAxleCoords: yCoords, xAxleCoords: xCoords });

    if(id) {
      extend(vehicleValues, {id: id});
    }
    this.props.addIntermodalVehicle(vehicleValues, id, this.props.hidePopup.bind(this));
  }

  saveVehicle() {

    if (this.props.id) {
      this.addIntermodalVehicle(this.props.id); 

    } else {
      if (!this.props.vehicleName) {
        this.props.focusElement(INTERMODAL_ADD_VEHICLE_FORM, 'vehicleName');
        return;
      }

      const isVehicleNameAlreadyPresent = this.isVehicleNameAlreadyPresent(this.props.vehicleName);
      if (isVehicleNameAlreadyPresent) {
        this.props.focusElement(INTERMODAL_ADD_VEHICLE_FORM, 'vehicleName');
        this.props.addNotification('You need to enter a unique name', 'error', 5, 'You need to enter a unique name');
        return;
      }

     this.addIntermodalVehicle();   
    }
  }

  render() {
    return (
       <div>
        <div style={{display: 'flex', paddingTop: 10, marginLeft: 20}}>
            <div style={{width:'25%', display: 'flex', flexDirection: 'column', marginRight: 20}}>
                <label style={{marginBottom: 15}}>WHEEL LOCATION COORDINATES</label>
                <Field name='wheelCount' component={Dropdown} setParentDropdownValue={this.handleChange} list={wheelDropdownValues}  style={{width: '65%', marginLeft: 50, marginTop: 10, zIndex: 10, marginBottom: 15}} /> 

                <div style={{display: 'flex', marginBottom: 10, marginLeft: 55}}>
                  <label style={{width: '47%', paddingLeft: 15}}>X POS ({getUnits('inx', this.props.unitType === METRIC)})</label>
                  <label style={{width: '47%', paddingLeft: 15}}>Y POS ({getUnits('inx', this.props.unitType === METRIC)})</label>
                </div>
                {
                  this.props.wheelPos.map((wheelPos, i) => {
                    let xPosValue = wheelPos ? this.renderStandardAxis( wheelPos.x, 'x') : "0.00";
                    let yPosValue = wheelPos ? this.renderStandardAxis(-wheelPos.y, 'y') : "0.00";
                    let maxPosForUnitType = 350; // US
                    let invalidCoordError = '';
                    if(this.props.unitType === METRIC) {
                        maxPosForUnitType = 889;
                    }
                    if(xPosValue > maxPosForUnitType) {
                        xPosValue = maxPosForUnitType;
                        invalidCoordError = 'Max X pos: ' + maxPosForUnitType + ' ' + getUnits('in', this.props.unitType === METRIC);
                    }
                    if(yPosValue > maxPosForUnitType) {
                        yPosValue = maxPosForUnitType;
                        invalidCoordError = 'Max Y pos: ' + maxPosForUnitType + ' ' + getUnits('in', this.props.unitType === METRIC);
                    }
                    return(
                      <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div key={(i+1)*500}  style={{display: 'flex', marginBottom: 10}}>
                          <label  style={{display: 'flex', marginBottom: 0, alignItems: 'center', width: '5%', marginRight: 10}}>{i+1}</label>
                          <input
                            type="text"
                            style={{width: '47%', marginRight: 5, borderRadius: 20, border: '1px solid rgb(204, 204, 204', paddingLeft: 20 }}
                            placeholder="0.00"
                            value={xPosValue}
                            onChange={(event) => this.xPosChange(event, i)}
                          />
                          <input
                            type="text"
                            style={{width: '47%', marginRight: 5, borderRadius: 20, border: '1px solid rgb(204, 204, 204', paddingLeft: 20 }}
                            placeholder="0.00"
                            className="text-width"
                            value={yPosValue}
                            onChange={(event) => this.yPosChange(event, i)}
                          />
                        </div>
                        <div className="error" style={{fontSize: 10, color: 'red'}}>{invalidCoordError}</div>
                      </div>
                    );
                  })
                  }
            </div>
            <div  style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} ref="board" onChange={() => this.boardChange}>
              <label style={{marginBottom: 15}}>CUSTOM VEHICLE DISPLAY</label>
              <Stage
                  ref="stage"
                  width={this.state.board.width}
                  height={this.state.board.height}
                  y={this.state.wheel.height * this.state.sizeRatio}
                  // x={}
                  className="mt-100 stage-border mb-30"
              >
                  <Layer ref="background">
                      {
                          this.drawGridLines()
                      }
                  </Layer>
                  <Layer ref="axle">
                      {
                          this.state.axles
                      }
                  </Layer>
                  <Layer ref="layer">
                      {
                          this.props.wheelPos.map((wheelPos, i) => {
                              console.log("Add Custom Vehicle wheelPos (x,y): " + this.props.wheelPos[i].x + "," + this.props.wheelPos[i].y);
                              let _x = this.props.wheelPos[i].x;
                              let _y = this.props.wheelPos[i].y;
                              if(_x == 0) _x =  this.state.wheel.width;
                              if(_y == 0) _y = -this.state.wheel.height;
                              return(
                                  <MyImage
                                      key={i}
                                      x={_x}
                                      y={_y}
                                      width={this.state.wheel.width}
                                      height={this.state.wheel.height}
                                      mouseUp={(event) => this.handleMouseUp(event, i)}
                                      dragMove={(event) => this.handleDragMove(event, i)}
                                  />
                              );
                          })
                      }
                      {
                          this.props.wheelPos.map((wheelPos, i) => {
                              let wheelPosX = wheelPos.x;
                              let wheelPosY = wheelPos.y;
                              return(
                                  <Label key={(i+1) * 1000} x={parseFloat(wheelPosX)+parseFloat(this.state.wheel.width/2)} y={wheelPosY - 10} opacity="0.75">
                                      <Tag
                                          key={(i+1) * 2000}
                                          fill="green"
                                          pointerDirection="down"
                                          pointerWidth={10}
                                          pointerHeight={10}
                                          lineJoin="round"
                                          shadowColor="black"
                                          shadowBlur={10}
                                          shadowOffset={10}
                                          shadowOpacity={0.5}
                                      />
                                      <Text
                                          key={(i+1) * 3000}
                                          text={"(" + this.renderStandardAxis(wheelPosX, 'x') + ", " + this.renderStandardAxis(-wheelPosY, 'y') + ")"}
                                          fontSize={15}
                                          padding={5}
                                          fill="white"
                                      />
                                  </Label>
                              );
                          })
                      }
                  </Layer>
              </Stage>
          </div>
          <div style={{width:'25%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <label>VEHICLE INFORMATION</label>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft: 20, marginRight: 20, height: '100%', width: '100%', marginTop: 20}}>
              <div className='form-group-div' style={{width: '85%', marginBottom: 20}}>
                <label className="form-label">VEHICLE NAME</label>
                <Field name='vehicleName'  style={{ width: '75%', borderRadius: 20, height: 30, border: '1px solid #ccc', textAlign: 'center', fontSize: 12}} component={NormalInput} />
              </div>
              <div className='form-group-div' style={{ width: '85%', marginBottom: 20 }}>
                  <label style={{ fontWeight: "bold" }} className="form-label">GROSS WEIGHT ({getUnits('lbs', this.props.unitType === METRIC)})</label>
                  <Field name='grossWeight' component={FieldInput} className='form-group-div-input text-align-center' type="text" />
              </div>
              <div className='form-group-div' style={{ width: '85%', marginBottom: 20 }}>
                  <label style={{ fontWeight: "bold" }} className="form-label">CONTACT PRESSURE ({getUnits('psi', this.props.unitType === METRIC)})</label>
                  <Field name='contactPressure' component={FieldInput} className='form-group-div-input text-align-center' type="text" />
              </div>  
              <div className='form-group-div' style={{width: '85%', marginBottom: 20}}>
                <label  style={{fontWeight: "bold"}} className="form-label">CONTACT AREA ({getUnits('inx', this.props.unitType === METRIC)}<sup>2</sup>)</label>
                <Field name='contactArea' className='form-group-div-input text-align-center' type="text" component={FieldInput}/>
              </div>      
              <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginRight: 60, marginTop: 50}}>
                <button onClick={this.saveVehicle.bind(this)} style={{backgroundColor: '#669900'}}>SAVE</button> 
              </div>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const unitType = state.currentProject.projectDetails.unitType;
    return {
        unitType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentProjectUnitType: (value) => {
            dispatch(setCurrentProjectUnitType(value));
        },
    };
}

IntermodalAddVehicle = connect(
    mapStateToProps, mapDispatchToProps
)(IntermodalAddVehicle);

export default IntermodalAddVehicle;
