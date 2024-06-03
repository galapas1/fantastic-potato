import React from 'react';

const SmallHelpScreenComponentSimple = ({title, firstParagraph, secondParagraph, clickMoreInformation}) => 
   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
     <div style={{display: 'flex'}}>
       <i className='fa fa-question-circle nav-icon' style={{fontSize: 14, color: '#3299CC', marginRight: 5}}></i>
       <div>{`${title}`}</div>
     </div>
     <div style={{width: 275, marginBottom: 10, marginTop: 10}}>
       <div style={{marginBottom: 5}}>{firstParagraph}</div>
       <div>{secondParagraph}</div>
     </div>
   </div>
  
export default SmallHelpScreenComponentSimple;