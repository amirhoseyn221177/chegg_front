import React, { useState, Fragment } from 'react'
import {Button, Input} from '@material-ui/core'
import './Signin.css'
import {withRouter} from 'react-router-dom'
import axios from 'axios'




const SignIn=(props)=>{
    const [password , setpassword]=useState(null)
    const [username, setusername]=useState(null)

    var getusername=(e)=>{
        let content=e.target.value
        setusername(content)
    }
    var getpassword=(e)=>{
        let content=e.target.value
        setpassword(content)
    }

    var sendAuth=async()=>{
        const resp= await axios.post('http://localhost:9000/signin',{username,password})
        const data= resp.data
        console.log(data)
    }

    return(
        <Fragment >
            <form>
            <div >
                <Input onChange={getusername} className="input" placeholder="Username" required={true}/>
            </div>
            <div>
                <Input onChange={getpassword} className="input" placeholder="Password" required={true}/>
            </div>
            <button onClick={sendAuth} type='button' style={{color:'red'}}  className='button pulse'>
                <span >
                Sign-in
                </span>
            </button>
            </form>
       
        </Fragment>
    )
}

export default SignIn