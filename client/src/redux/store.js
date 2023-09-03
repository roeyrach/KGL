import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./user/reducer"

const rootReducer = combineReducers({
	auth: authReducer,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store
