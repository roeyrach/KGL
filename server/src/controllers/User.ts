import { NextFunction, Request, Response } from "express"
import mysql from "mysql2"
import config from "../config/config"
import Logging from "../library/Logging"
const bcrypt = require("bcrypt")

const params = config.server.mysql
const pool = mysql.createPool(params).promise()

async function createUser(req: Request, res: Response, next: NextFunction) {
	const { username, email, password, token } = req.body

	try {
		const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

		// Check if user already exists
		if (!Array.isArray(existingUsers) || existingUsers.length !== 0) return res.status(400).send({ status: "User already exists" })

		// Insert the new user
		await pool.query("INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?)", [username, email, password, token])

		res.sendStatus(201)
	} catch (error) {
		Logging.error("Error creating user:" + error)
		res.sendStatus(500)
	}
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
	const { email } = req.params
	try {
		const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
		// Check if user already exists
		if (Array.isArray(existingUser) && existingUser.length === 0) return res.status(400).send({ error: "User not found" })

		//Delete the user
		await pool.query("DELETE FROM users WHERE email = ?", [email])

		res.status(201).send({ message: "User deleted successfully" })
	} catch (error) {
		Logging.error("Error deleting user:" + error)
		res.status(500).json({ error: "Internal server error" })
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body
	try {
		const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
		// Check if user already exists
		if (Array.isArray(existingUser) && existingUser.length === 0) return res.status(401).json({ message: "User not found" })
		const existingPassword: any = existingUser

		// Compare hashed passwords
		const passwordMatch = await bcrypt.comapred(password, existingPassword[0].password)
		if (!passwordMatch) return res.status(401).json({ message: "Password does not match" })

		return res.status(200).json({ message: true })
	} catch (error) {
		Logging.error("Error login user:" + error)
		res.status(500).json({ error: "Internal server error" })
	}
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	const [result] = await pool.query(`SELECT * FROM users`)
	return res.status(200).send(result)
}

export default { createUser, getAllUsers, deleteUser, login }
