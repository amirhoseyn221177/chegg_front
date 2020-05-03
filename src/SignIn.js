import React, { useState, Fragment,useEffect, useRef } from 'react'
import {Input} from '@material-ui/core'
import './Signin.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendAuth,signupAuth} from './action'
import chegg from  './chegglogo.jpeg'
import Modal from './Modal'
import axios from 'axios'





const SignIn=(props)=>{
    const [password , setpassword]=useState(null)
    const [username, setusername]=useState(null)
    const [modal , setmodal]=useState(false)
    const [ip,setip]=useState(null)
    const [errorLogin, setErrorLogin]=useState(null)
    const [errorSignup,setErrorSignup]=useState(null)
    const AuthValid=useRef(false)


    useEffect(()=>{
        //  getting the ip from ipify
        var getIP=async()=>{
          const resp= await axios.get('https://api.ipify.org?format=json')
          setip(await resp.data.ip)
          await verifyToken()
        }
        const verifyToken=async()=>{
            let token=localStorage.getItem('token')
              try{
                await axios.get('http://localhost:9000/verifyToken',{
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                    
                })
                 AuthValid.current=true
                 console.log(42)
                 props.history.push('/question')
              }catch(e){
                console.log(e)  
                AuthValid.current=false
              }
            }
        getIP()
        // verifyToken()


    //eslint-disable-next-line
      },[])
// if(AuthValid){
//     props.history.push('/question')
// }
    var getusername=(e)=>{
        e.preventDefault()
        let content=e.target.value
        setusername(content)
        setErrorSignup(null)
        setErrorLogin(null)
    }
    var getpassword=(e)=>{
        e.preventDefault()
        let content=e.target.value
        setpassword(content)
        setErrorSignup(null)
        setErrorLogin(null)
    }

    var sendingAuthtoBackend=async()=>{
        setErrorSignup(null)
        setErrorLogin(null)
        const resp=await props.sendAuth(username,password)
        if(resp)setErrorLogin(resp)
        else{
            props.history.push('/question')
        }
    }
    var  closeModal=()=>{
        setmodal(!modal)
    }

    var SignUP=async()=>{
        setErrorSignup(null)
        setErrorLogin(null)
      const resp= await props.signUpAuth(username,password,ip)
      if (resp) setErrorSignup(resp)
      else{
          props.history.push('/question')
      }
    }

    return(
        <Fragment >
            {errorLogin ? <p style={{color:'red', position:'absolute',fontSize:'small',top:'500px',left:'42%'}}>Username is not valid or password is wrong</p>:null}
            {errorSignup ? <p style={{color:'red', position:'absolute',fontSize:'small',top:'500px',left:'44%'}}> This username is taken</p>:null}
            {modal ? <Modal close={closeModal} show={modal}> If you don't have an account just type your username and  password you will be logged in automatically </Modal>:null}
            <h1 className='header'>
                <img src={chegg} alt='' style={{position:'relative', top:'300px',left:'760px'}} />
            </h1>
            <form>
            <div >
                <Input type='text' onChange={getusername} className="input" placeholder="Username" required={true}/>
            </div>
            <div>
                <Input type='password' onChange={getpassword} className="input" placeholder="Password" required={true}/>
            </div>
            <button style={{left:'1000px',color:'white'}} onClick={sendingAuthtoBackend} type='button'   className='button pulse'>
                <span >
                Sign-in
                </span>
            </button>
            <button onClick={SignUP} type='button' style={{left:'670px'}} className='button pulse'>
                <span>
                    sign-up
                </span>
            </button>
            </form>
       
        </Fragment>
    )
}


const maptoprops=dispatch=>{
    return{
        sendAuth:(username,password)=>dispatch(sendAuth(username,password)),
        signUpAuth:(username,password,ip)=>dispatch(signupAuth(username,password,ip))
    }
}



export default connect(null,maptoprops)(withRouter(SignIn));