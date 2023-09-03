export const SET_TOKEN = "SET_TOKEN"
export const GET_TOKEN = "GET_TOKEN"
export const SET_USER = "SET_USER"
export const GET_USER = "GET_USER"

export const setToken = (token) => (dispatch) => {
	dispatch({ type: SET_TOKEN, payload: token })
}

export const getToken = () => (dispatch) => {
	return dispatch({ type: GET_TOKEN })
}

export const setUser = (user) => (dispatch) => {
	dispatch({ type: SET_USER, payload: user })
}

export const getUser = () => (dispatch) => {
	return dispatch({ type: GET_USER })
}
