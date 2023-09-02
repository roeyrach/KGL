import mysql from "mysql2"
import config from "../config/config"

const params = config.server.mysql

const pool = mysql.createPool(params).promise()

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
