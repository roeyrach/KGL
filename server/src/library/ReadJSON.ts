import fs from "fs"
import Game from "../models/Games"

async function insertFromJSON(filename: string): Promise<Game[]> {
	try {
		// Read the JSON file
		const rawData = fs.readFileSync(filename, "utf8")
		const games: Game[] = JSON.parse(rawData)
		return games
	} catch (error) {
		console.error(error)
		return []
	}
}
export default insertFromJSON
