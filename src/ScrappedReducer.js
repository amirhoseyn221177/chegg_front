const initalstate={
    raw:null,
    images:null
}


const reducer=(state=initalstate,action)=>{
    if(action.type==='Document'){
        return{
            ...state,
            raw:action.raw,
            images:action.images
        }
    }
    return state
}


export default reducer