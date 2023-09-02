import axios from "axios"

const BASE_URL = "http://localhost:5000"

export async function getAllGames() {
	try {
		const response = await axios.get(`${BASE_URL}/games/getAllGames`)
		console.log(typeof response.data.result)
		return response.data.result
	} catch (error) {
		console.error(error)
	}
}
