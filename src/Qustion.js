import React,{useState,Fragment} from 'react'
import axios from 'axios'




var Question=(props)=>{
    const [question,setQuestion]=useState('')


    var gettingQuestion=(e)=>{
        let content=e.target.value
        setQuestion(content)
    }
    
    var sendingQuestion=async()=>{
        let obj={}
        obj.question=question
        const data = await axios.post('http://localhost:9000/question',obj)
        const resp=data.data
        console.log(resp)
    }


    return(
        <Fragment>
            <div>
                <input style={{width:'500px',top:'400px',position:'relative', left:'30%'}} placeholder="Please paste your question here!" onChange={gettingQuestion}/>
                <button style={{top:'400px', position:'relative',left:'600px'}} onClick={sendingQuestion}>Submit</button>
            </div>
        </Fragment>
    )
}


export default Question