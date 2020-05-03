import axios from 'axios'


export const sendAuth=(username,password)=>{
    return  async dispatch=>{
        try{
            const resp= await axios.post('http://localhost:9000/signin/login',{username,password})
            const token= await resp.data
            // console.log(token)
            dispatch(sendAuthtoReducer(username,password,token))
            localStorage.setItem('token',token)
            localStorage.setItem('username',username)
        }catch(e){
            return e
        }
       

    }
    
}


export const signupAuth=(username,password,ip)=>{
    return async dispatch=>{
        try{
            const resp =  await axios.post('http://localhost:9000/signin/signup',{username,password,ip})
            const token= await resp.data
            console.log(token)
            dispatch(sendAuthtoReducer(username,password,token))
            localStorage.setItem('token',token)
            localStorage.setItem('username',username)
        }catch(e){
            console.log(e)
            return e
        }
       
    }
}


export const sendAuthtoReducer=(username,password,token)=>{
    return{
        type:'Document',
        username:username,
        password:password,
        token:token
    }
}