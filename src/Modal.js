import React,{memo, Fragment} from 'react';
import "./modal.css"
import {Backdrop} from '@material-ui/core'



const Modal=memo((props)=>{
   return(
   <Fragment>
       <Backdrop style={{zIndex:'100'}} open={props.show}/>
    <div className="modal-wrapper " style={{opacity :props.show ? "1":"0",
        transform: props.show ? "translateY(0vh)" : 'translateY(-100vh)' }}>
        <div className="modal-header" >
        <label>Attention!!!</label>

        <span  className="close-modal-btn" onClick={props.close}>x</span>
        </div>
        <div className="modal-body">
            <div> {props.children}</div>
        </div>
        <div className="modal-footer">
            <button className="btn-cancel" onClick={props.close}  >Continue </button>
    
        </div>
    </div>


   </Fragment>
   )})

export default Modal