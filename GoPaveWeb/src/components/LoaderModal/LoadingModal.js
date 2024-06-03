import React from 'react';
import '../Modals/Modals.scss';
import { ModalWrapper } from 'Components';
import Loader from 'halogen/ClipLoader';

const LoadingModal = (props) => 
   <div>
    <ModalWrapper {...props} showClose={false}> 
    <div><Loader color="#3299CC" size="100px" margin="2px"/></div>
    </ModalWrapper>
  </div>
  
export default LoadingModal;
