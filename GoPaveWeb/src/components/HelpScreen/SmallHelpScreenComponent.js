import React from 'react';

const SmallHelpScreenComponent = ({title, firstParagraph, secondParagraph, clickMoreInformation}) => 
   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
     <div style={{display: 'flex'}}>
       <i className='fa fa-question-circle nav-icon' style={{fontSize: 14, color: '#3299CC', marginRight: 5}}></i>
       <div>{`${title}`}</div>
     </div>
     <div style={{width: 275, marginBottom: 10, marginTop: 10}}>
       <div style={{marginBottom: 5}}>{firstParagraph}</div>
       <div>{secondParagraph}</div>
     </div>
     <button className='btn btn-primary' style={{width: '50%', padding: 0}}onClick={clickMoreInformation}>More Information</button>
  </div>
  
export default SmallHelpScreenComponent;