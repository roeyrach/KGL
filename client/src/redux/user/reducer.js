import { SET_TOKEN, GET_TOKEN, SET_USER, GET_USER } from "./action"

const initialState = {
	token: null,
	user: null,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload }
		case GET_TOKEN:
			return state.token
		case SET_USER:
			return { ...state, user: action.payload }
		case GET_USER:
			return state.user
		default:
			return state
	}
}

export default authReducer
