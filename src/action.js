import axios from 'axios'


export const sendAuth=async(username,password)=>{
    return  async dispatch=>{
        dispatch(sendAuthtoReducer(username,password))
        const resp= await axios.post('http://localhost:9000/signin',{username,password})
        const data= resp.data
        console.log(data)

    }
    
}


export const sendAuthtoReducer=(username,password)=>{
    return{
        type:'Document',
        username:username,
        password:password
    }
}