const initalstate={
    raw:null,
    images:null,
    token:null
}


const reducer=(state=initalstate,action)=>{
    if(action.type==='Document'){
        return{
            ...state,
            raw:action.raw,
            images:action.images,
            token:action.token
        }
    }
    return state
}


export default reducer