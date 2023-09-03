import mysql from "mysql2"
import config from "../config/config"
import insertFromJSON from "../library/ReadJSON"
import Logging from "../library/Logging"

const filename = "C:/Users/97250/git/KGL/server/src/config/game-data.json"

const params = config.server.mysql
const pool = mysql.createPool(params).promise()

export async function getAll() {
	try {
		const [result] = await pool.query(`SELECT * FROM games`)
		return result
	} catch (error) {
		const err = Error(`getAll: ${error}`)
		Logging.error(err)
	}
}

export async function insertData() {
	try {
		const games = await insertFromJSON(filename)
		// Define the SQL query to insert a game
		const insertQuery = `
                            INSERT INTO games (id, slug, title, providerName, thumb)
                            VALUES (?, ?, ?, ?, ?)
                            `
		for (const game of games) {
			const { id, slug, title, providerName, thumb } = game

			// Check if a game with the same id already exists in the database
			const [existingRows] = await pool.query("SELECT id FROM games WHERE id = ?", [id])

			// Check the length of existingRows or if the first element is truthy
			if (Array.isArray(existingRows) && existingRows.length === 0) {
				// If no existing game with the same id found, insert the new game
				await pool.query(insertQuery, [id, slug, title, providerName, thumb?.url || ""])
				Logging.info(`Insert succeeded: ${title}`)
			} else {
				Logging.warn(`Skipping duplicate game: ${title}`)
			}
		}

		console.log("All games inserted successfully")
	} catch (error) {
		const err = Error(`inserting games: ${error}`)
		Logging.error(err)
	} finally {
		if (pool) {
			await pool.end()
		}
	}
}
