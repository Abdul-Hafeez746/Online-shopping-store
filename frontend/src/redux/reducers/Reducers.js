
let Reducer = (state=[],action) => {
    switch(action.type){
        case "ADD_TO_CART":
            console.log("The Data In Action Is ",action)  // the object will not work with + sign so, we will use ,
            return [...state,action.payload]
        case "REMOVE_FROM_CART":
            console.log("The Data In Action Is ",action)
            return (state.filter(item=>item._id !== action.payload))
        case "EMPTY_CART":
            console.log("The Data In Action Is ",action)
            return ([])
        default:
            return state
    }
}

export default Reducer