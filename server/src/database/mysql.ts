import mysql from "mysql2"
import config from "../config/config"
import Logging from "../library/Logging"

const params = config.server.mysql

const pool = mysql.createPool(params).promise()

export async function createNewTable(tableName: string, columnDefinitions: string[]) {
	try {
		// Define the SQL query to create the table
		const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
            ${columnDefinitions.join(", ")}
            )
            `
		await pool.query(createTableQuery)
	} catch (error) {
		const err = Error(`createNewTable: ${error}`)
		Logging.error(err)
	}
}

async function getAll(db: string) {
	const [result] = await pool.query(`SELECT * FROM ${db}`)
	return result
}

async function getById(id: string) {
	const [result] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id])
	return result
}

async function createNote(title: string, contents: string) {
	const result = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
	return result
}

async function deleteById(id: string) {
	const [result] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id])
	return result
}

export { getAll, getById, createNote, deleteById }
