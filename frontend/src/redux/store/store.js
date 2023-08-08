import combineReducer from "../reducers/COMB_Reducer";
import { createStore } from "redux";
let store = createStore(combineReducer)
export default store
