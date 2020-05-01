import React, { useState, Fragment } from 'react'
import {Input} from '@material-ui/core'
import './Signin.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendAuth} from './action'
import chegg from  './chegglogo.jpeg'
import Modal from './Modal'





const SignIn=(props)=>{
    const [password , setpassword]=useState(null)
    const [username, setusername]=useState(null)
    const [modal , setmodal]=useState(true)

    var getusername=(e)=>{
        let content=e.target.value
        setusername(content)
    }
    var getpassword=(e)=>{
        let content=e.target.value
        setpassword(content)
    }

    var sendingAuthtoBackend=async()=>{
        props.sendAuth(username,password)
    }

    var  closeModal=()=>{
        setmodal(!modal)
    }

    return(
        <Fragment >
            {modal ? <Modal close={closeModal} show={modal}> If you don't have an account just type your username and  password you will be logged in automatically </Modal>:null}
            <h1 className='header'>
                <img src={chegg} alt='' style={{position:'relative', top:'300px',left:'730px'}} />
            </h1>
            <form>
            <div >
                <Input onChange={getusername} className="input" placeholder="Username" required={true}/>
            </div>
            <div>
                <Input onChange={getpassword} className="input" placeholder="Password" required={true}/>
            </div>
            <button onClick={sendingAuthtoBackend} type='button' style={{color:'white'}}  className='button pulse'>
                <span >
                Sign-in
                </span>
            </button>
            </form>
       
        </Fragment>
    )
}


const maptoprops=dispatch=>{
    return{
        sendAuth:(username,password)=>dispatch(sendAuth(username,password))
    }
}



export default connect(null,maptoprops)(withRouter(SignIn));