import React,{useState,Fragment, useEffect, useRef} from 'react'
import axios from 'axios'
import UNAUTHORIZED from './Unauth'
import {Input,LinearProgress} from '@material-ui/core'
import './Signin.css'
import ReactHtmlParser from 'react-html-parser';
import chegg from  './chegglogo.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Modal from './Modal'





const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      color:'orange'
    },
  }));
  

var Question=(props)=>{
    const classes=useStyles()
    const [question,setQuestion]=useState(null)
    const [error, seterror]=useState(null)
    const [rawDoc, setrawdoc]=useState(null)
    const [spinner, setspinner]=useState(false)
    const [showModal, setshowModal]=useState(false)
    const AuthValid=useRef(true)

    useEffect(()=>{
        const verifyToken=async()=>{
        let token=localStorage.getItem('token')
          try{
            await axios.get('http://localhost:9000/verifyToken',{
                headers:{
                    authorization: `Bearer ${token}`
                }
                
            })
            console.log(token)
            AuthValid.current=true
          }catch(e){
              seterror(e)
              AuthValid.current=false
          }
        }
        verifyToken()

    },[])

  
    var gettingQuestion=(e)=>{
        let content=e.target.value
        setQuestion(content)
    }
    
    var sendingQuestion=async()=>{
        try{
            if(!question){
                return alert('You have to type a question in the field provided')
            }
             setspinner(true)
            let obj={}
            obj.question=question
            const data = await axios.post('http://localhost:9000/question/chegg',obj)
            const resp=await data.data
            setrawdoc(resp.rawDoc)
            
        }catch(e){
            console.log(e)
            setshowModal(true)

        }finally{
            setspinner(false)
        }
     
    }

    var  closeModal=()=>{
        setshowModal(!showModal)
    }

    let render=null
    if(showModal){
        render=(
        <Modal show={showModal} close={closeModal}> Your request couldn't be complete, Please try again</Modal>
        )
    }else if(spinner){
        render=(
            <div className={classes.root}><LinearProgress variant='query' style={{width:'700px', position:'absolute', top:'70%',left:'33%'}}  /></div>
        )
    }else if(rawDoc){
        render=(
            <Fragment>
               <div className='hr'/>
                <h1 className='answer'>Answers</h1>
                <div className='answerimage'>{ReactHtmlParser(rawDoc)}</div>
            </Fragment>
        )
    }
    

   


    return(
        <Fragment>
            {error ?  <UNAUTHORIZED/>:
            <div>
                  <h1 className='header'>
                <img src={chegg} alt='' className='qimage'/>
            </h1>
                <Input className='qinput' placeholder="Please paste your question here!" onChange={gettingQuestion}/>
                <button  className='button3 pulse' onClick={sendingQuestion}>Submit</button>
                {render}
            </div>}
        </Fragment>
    )
}


export default Question