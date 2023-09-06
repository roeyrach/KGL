export const SET_TOKEN = "SET_TOKEN"
export const GET_TOKEN = "GET_TOKEN"
export const SET_USER = "SET_USER"
export const GET_USER = "GET_USER"

export const setToken = (token) => ({
	type: SET_TOKEN,
	payload: token,
})

export const getToken = () => ({
	type: GET_TOKEN,
})

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
})

export const getUser = () => ({
	type: GET_USER,
})
