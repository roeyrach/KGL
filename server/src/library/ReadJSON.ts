import fs from "fs"

interface Game {
	id: string
	slug: string
	title: string
	providerName: string
	thumb: {
		url: string
	}
}

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
