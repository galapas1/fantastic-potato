import React , { Component } from 'react';
import {Layer, Stage, Group, Image, Line, Label, Tag, Text} from 'react-konva';

export class MyImage extends Component {
    constructor(props){
        super(props);
    }

    state = {
        image: null
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = '/images/right.png';
        image.onload = () => {
            this.setState({
                image: image
            });
        }
    }

    render() {
        return (
            <Image
                image={this.state.image}
                draggable="true"
                width={this.props.width}
                height={this.props.height}
                x={this.props.x}
                y={this.props.y}
                onMouseUp={this.props.mouseUp}
                onDragMove={this.props.dragMove}
            />
        );
    }
}

export class GridLine extends Component {
    constructor(props){
        super(props);
    }

    state = {
        line: null
    }

    render() {
        return (
            <Line
                draggable="false"
                points={this.props.points}
                x={this.props.x}
                y={this.props.y}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                tension={5}
                onDragStart={this.props.onDragStart}
                onDragMove={this.props.onDragMove}
                onDragEnd={this.props.onDragEnd}
            />
        );
    }
}

export class Axle extends Component {
    constructor(props){
        super(props);
    }

    state = {
        line: null
    }

    render() {
        return (
            <Line
                draggable="true"
                points={this.props.points}
                x={this.props.x}
                y={this.props.y}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                tension={5}
            />
        );
    }
}
