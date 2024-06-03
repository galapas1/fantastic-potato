import React from 'react';

const NormalInput = field => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
    <input {...field.input} type={field.type} placeholder={field.placeholder} style={{borderColor: field.meta.touched &&  field.meta.error ? 'red' : '#ccc', ...field.style}} onBlur={(event) => event.preventDefault()}/>
    {field.meta.touched && field.meta.error && <div className='error' style={{fontSize: 10, color: 'red'}}>{field.meta.error}</div>}
  </div>
);

export default NormalInput;