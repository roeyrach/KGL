import axios from "axios"

const BASE_URL = "http://localhost:5000"

export async function createUser(user) {
	try {
		const response = await axios.post(`${BASE_URL}/users/createUser`, user, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (response.status === 201) return response
	} catch (error) {
		// Handle network or other errors here
		const statusCode = error.response.status
		// Handle different error statuses here
		if (statusCode === 400) {
			// Unauthorized (e.g., invalid credentials)
			return { success: false, error: "The email address is already in use." }
		} else {
			// Handle other error statuses
			return { success: false, error: `Server error: ${statusCode}` }
		}
	}
}

export async function login(user) {
	try {
		const response = await axios.post(`${BASE_URL}/users/login`, user, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (response.status === 200) {
			// Successful response
			return response
		}
	} catch (error) {
		// Handle network or other errors here
		const statusCode = error.response.status
		// Handle different error statuses here
		if (statusCode === 401) {
			// Unauthorized (e.g., invalid credentials)
			return { success: false, error: "Unauthorized" }
		} else if (statusCode === 404) {
			// Not Found (e.g., user not found)
			return { success: false, error: "User not found" }
		} else {
			// Handle other error statuses
			return { success: false, error: `Server error: ${statusCode}` }
		}
	}
}

export async function getAllGames() {
	try {
		const response = await axios.get(`${BASE_URL}/games/getAllGames`)
		return response.data.result
	} catch (error) {
		console.error(error)
	}
}

export async function rewardHandler(result, email) {
	try {
		const response = await axios.post(`${BASE_URL}/users/rewardHandler`, result, email, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (response.status === 200) return response
	} catch (error) {}
}
