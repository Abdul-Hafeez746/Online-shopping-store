let INCREAMENT = (data) => {
    return{
        type:"ADD_TO_CART",
        payload:data
    }
}



let DECREAMENT = (itemid) => {
    return{
        type:"REMOVE_FROM_CART",
        payload:itemid
    }
}




let EMPTY = (data) => {
    return{
    type:"EMPTY_CART",
    payload:data
    }
}


export {INCREAMENT,DECREAMENT,EMPTY}