import React, { Component } from 'react';
import './Dropdown.scss';
import { findWhere } from 'underscore';

const largeDropdownWidth = 190;
const smallDropdownWidth = 80;

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {listVisible: false, selectedItem: ''}
  } 

  renderContent(item) {
    if (item && item.subName) {
      return <span className='dropdown-name'>{item.name}<span className='dropdown-subName'> {item.subName}</span></span>
    } else if (item) {
      return <span className='dropdown-name'>{item.name}</span>
    } 
  }

  setSelectedItem(value) {
    if (!value) {
      return this.renderContent(this.props.defaultValue);
    }

    return this.renderContent(value);
  }

  setDropdownIcon() {
    let dropdownClass;
    if (this.state.listVisible) {
       dropdownClass = 'fa-angle-up'
    } else {
      dropdownClass = 'fa-angle-down';
    }

    return `fa ${dropdownClass} dropdown-icon`;
  }

  select(item) {
    this.setState ({selectedItem: item});
    this.setState ({listVisible: false})
    if (this.props.input) {
      this.props.input.onChange(item.name); 
    }

    // setTimeout is necessary for the Asphalt Analysis Form, which tries to run an automatic calcualtion anytime a input or dropdown is updated
    if (this.props.setParentDropdownValue) {
      setTimeout(this.props.setParentDropdownValue(item.name));
    }
  }

  show() {
    this.setState({ listVisible: !this.state.listVisible});
  }

  hide() {
    this.setState({ listVisible: false });
  }
        
  render() {
    const { isDropup, isFieldDisabled, isSmallDropdown, showTooltip, toolTipMessage, tooltipId, hideDropdownIcon, initialDropdownStyle, style, dropdownContainerStyle, dropdownListStyle, showHelpTooltip, helptooltipId} = this.props;
    let passedInValue;
    let error;
    let myProps = '';
    let touched;
    
     // Certain dropdowns are connected to redux form and certain ones are not
    if (this.props.input) {
      const value = this.props.input.value;
      error = this.props.meta.error;
      passedInValue = findWhere(this.props.list, {name: value});
      myProps = {...this.props.input};
      touched = this.props.meta.touched;
    } else {

      if (this.props.value) {
        passedInValue = findWhere(this.props.list, {name: this.props.value});
      }
    }

    let dataToolTipRequired = {
       ...(  isFieldDisabled && showTooltip && { 'data-tip': toolTipMessage, 'data-for': tooltipId } )
    };

    let dataHelpToolTipRequired;

    if (isFieldDisabled) {
      dataHelpToolTipRequired = {
       ...(  showHelpTooltip && { 'data-for': helptooltipId } )
      };
    } else {
      dataHelpToolTipRequired = {
       ...(  showHelpTooltip && { 'data-tip': true,'data-for': helptooltipId } )
    };
      
    }

    return (
      <div {...dataToolTipRequired} {...dataHelpToolTipRequired} className={`${isFieldDisabled ? 'no-cursor-allowed' : ''} `} style={{width: isSmallDropdown ? smallDropdownWidth : largeDropdownWidth,...style }}>
        <div style={{width: '100%'}} tabIndex='0'  onClick={this.show.bind(this)} 
        className={`dropdown-container  ${this.state.listVisible ? ' show' : ''} ${isFieldDisabled ? 'pointer-events-none' : ''} `} {...myProps} onBlur={this.hide.bind(this)}>
        <div style={{...initialDropdownStyle, ...dropdownContainerStyle}} className={`dropdown-display ${this.state.listVisible ? ' clicked': ''} ${isFieldDisabled ? 'field-disabled' : ''} ${error && touched && this.props.input.value === this.props.defaultValue.name  ? 'has-error' : ""}`}>

          {this.setSelectedItem(passedInValue)}
          {!hideDropdownIcon && <i className={this.setDropdownIcon()}></i>}
        </div>
        <div style={{top: isDropup ? -30 : 2}} className='dropdown-list' >
          <div style={{bottom: isDropup ? '100%' : '', ...dropdownListStyle}}>
            {this.renderListItems()}
          </div>
        </div>
        { error && touched && this.props.input.value === this.props.defaultValue.name && !isFieldDisabled && <div className='has-error-text' >
            {error}</div>} 
        </div>
        
      </div>
     )
  }

  renderListItems() {
    let items = [];
    if (!this.props.list || !(this.props.list.length > 0) ) {
      return null;
    }

    for (let i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      items.push(<div className='list-item' key={i} onClick={this.select.bind(this, item)}>
        {this.renderContent(item)}
      </div>);
    }
    return items;
  }
}

export default Dropdown;