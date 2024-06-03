import React, { Component } from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';

import './ToggleButton.scss'

class ToggleButton extends Component {

    onRadioBtnClick(buttonSelected) {
        if (this.props.input) {
            this.props.input.onChange(buttonSelected); 
        }

        if (this.props.setParentValue) {
            this.props.setParentValue(buttonSelected);
        }
    }

    renderToogleButtons() {
        let buttonSelected = this.props.buttonSelected;
        if(!this.props.buttonSelected && this.props.options.length > 0) {
            buttonSelected = this.props.options[0];
        }

        let buttonItems = [];
        for (let i = 0; i < this.props.options.length; i++) {
            let buttonItem = this.props.options[i];
            buttonItems.push(<Button bsSize="small" style={{...this.props.style}} key={i}
                color="primary" onClick={() => this.onRadioBtnClick(buttonItem)}
                active={buttonSelected === buttonItem}>{buttonItem}</Button>)
        }
        return buttonItems;
    }

    renderToogleButton() {
        const buttonDisabled =(typeof this.props.isProjectLevelForm === 'boolean' &&
                                      this.props.isProjectLevelForm === false);

        let buttonSelected = this.props.buttonSelected;
        if(!this.props.buttonSelected && this.props.options.length > 0) {
            buttonSelected = this.props.options[0];
        }

        let buttonItems = [];
        for (let i = 0; i < this.props.options.length; i++) {
            let buttonItem = this.props.options[i];
            if(buttonItem === buttonSelected) {
                buttonItems.push(<Button bsSize="small" style={{...this.props.style}} key='0'
                color="primary" active={buttonSelected === buttonItem}>{buttonItem}</Button>)
            }
        }
        return buttonItems;
    }

    render() {
        const buttonDisabled =(typeof this.props.isProjectLevelForm === 'boolean' &&
                                      this.props.isProjectLevelForm === false);
        let buttonSelected = this.props.buttonSelected;
        if(!this.props.buttonSelected && this.props.options.length > 0) {
            buttonSelected = this.props.options[0];
        }

        if(buttonDisabled) {
            return (
                <ButtonGroup>
                   {this.renderToogleButton()}
                </ButtonGroup>
            );
        }
        return (
            <ButtonGroup>
                {this.renderToogleButtons()}
            </ButtonGroup>
        );
    }
}
export default ToggleButton;
