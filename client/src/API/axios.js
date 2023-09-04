import axios from "axios"

const BASE_URL = "http://localhost:5000"

export async function createUser(user) {
	try {
		const response = await axios.post(`${BASE_URL}/users/createUser`, user, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (response.status === 201) return response.status
	} catch (error) {
		return error.message
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
