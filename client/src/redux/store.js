import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./user/reducer"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

const rootReducer = combineReducers({
	auth: authReducer,
})

const persistConfig = {
	key: "root", // key for the subset of state to be persisted
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer, // Use the persisted reducer
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

const persistor = persistStore(store) // Create a persistor object

export { store, persistor } // Export both the store and persistor
