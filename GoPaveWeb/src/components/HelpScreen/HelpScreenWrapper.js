import React from 'react';

const HelpScreenWrapper = (props) => 
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
    <div style={{color: 'rgb(15, 175, 175)'}}>{`Help (${props.helpScreenTitle})`}</div>
    {props.children}
  </div>


export default HelpScreenWrapper;