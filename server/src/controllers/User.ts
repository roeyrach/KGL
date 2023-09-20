import { NextFunction, Request, Response } from "express"
import mysql from "mysql2"
import config from "../config/config"
import Logging from "../library/Logging"
import jwt from "jsonwebtoken"
import User from "../models/User"
const bcrypt = require("bcrypt")

const params = config.server.mysql
const pool = mysql.createPool(params).promise()

async function createUser(req: Request, res: Response, next: NextFunction) {
	const { username, email, password, amount } = req.body

	try {
		const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

		// Check if user already exists
		if (!Array.isArray(existingUsers) || existingUsers.length !== 0) {
			return res.status(400).send({ status: "User already exists" })
		}

		// Create JWT access token
		const token = jwt.sign({ password, email }, config.keys.token)

		// Insert the new user with an empty "gambles" array
		await pool.query("INSERT INTO users (username, email, password, token, gambles) VALUES (?, ?, ?, ?, ?)", [
			username,
			email,
			password,
			token,
			JSON.stringify([]), // Initialize "gambles" as an empty JSON array
		])

		res.sendStatus(201)
	} catch (error) {
		Logging.error("Error creating user:" + error)
		res.sendStatus(500)
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body
	try {
		const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
		// Check if user already exists
		if (Array.isArray(existingUser) && existingUser.length === 0) return res.status(404).json({ message: "User not found" })
		const resultUser: any = existingUser

		// Compare hashed passwords
		const passwordMatch = await bcrypt.compare(password, resultUser[0].password)
		if (!passwordMatch) return res.status(401).json({ message: "Password does not match", state: false })

		// Create JWT access token
		const token = jwt.sign({ password, email }, config.keys.token)

		// Insert JWT access token
		await pool.query("UPDATE users SET token = ? WHERE email = ?", [token, email])

		return res.status(200).json({
			message: "Password match",
			user: { username: resultUser[0].username, email: resultUser[0].email, amount: resultUser[0].amount, state: true },
		})
	} catch (error) {
		Logging.error("Error login user:" + error)
		res.sendStatus(500)
	}
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body
	try {
		const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
		// Check if user already exists
		if (Array.isArray(existingUser) && existingUser.length === 0) return res.status(400).send({ error: "User not found" })

		const user: any = existingUser

		// Compare hashed passwords
		console.log(password, user[0].password)
		const passwordMatch = await bcrypt.compare(password, user[0].password)
		if (!passwordMatch) return res.status(401).json({ message: "Password does not match", state: false })

		const token = user[0].token

		if (token == null) return res.status(401).json({ message: "Token does not exists", state: false })

		jwt.verify(token, config.keys.token, async (err: unknown) => {
			if (err) return res.status(403).send(err)

			//Delete the user
			await pool.query("DELETE FROM users WHERE email = ?", [email])

			return res.status(201).send({ message: "User deleted successfully" })
		})
	} catch (error) {
		Logging.error("Error deleting user:" + error)
		res.status(500).json({ error: "Internal server error" })
	}
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	const [result] = await pool.query(`SELECT * FROM users`)
	return res.status(200).send(result)
}

async function rewardHandler(req: Request, res: Response) {
	const { result, email } = req.body

	try {
		const query = `UPDATE users SET amount = amount + ?, gambles = JSON_ARRAY_APPEND(gambles, '$', ?) WHERE email = ?`

		let amount = 0

		switch (true) {
			case result.every((r: string) => r === "cherry"):
				amount = 50
				break
			case result.slice(0, 2).every((r: string) => r === "cherry") || result.slice(1).every((r: string) => r === "cherry"):
				amount = 40
				break
			case result.every((r: string) => r === "apple"):
				amount = 20
				break
			case result.slice(0, 2).every((r: string) => r === "apple") || result.slice(1).every((r: string) => r === "apple"):
				amount = 10
				break
			case result.every((r: string) => r === "banana"):
				amount = 15
				break
			case result.slice(0, 2).every((r: string) => r === "banana") || result.slice(1).every((r: string) => r === "banana"):
				amount = 5
				break
			case result.every((r: string) => r === "lemon"):
				amount = 3
				break
			default:
				const [ret] = await pool.query(`SELECT amount FROM users WHERE email = ? AND amount > 0`, [email])

				if (Array.isArray(ret) && ret.length > 0) {
					amount = -1
				}
		}

		const gambleData = {
			betAmount: amount,
			game: "Slot Machine",
			timestamp: new Date().toISOString(),
		}

		// Execute the query with the determined amount and gamble data
		await pool.query(query, [amount, JSON.stringify(gambleData), email])

		return res.status(200).json({ amount })
	} catch (error) {
		Logging.error(error)
		res.sendStatus(500)
	}
}

async function getGambles(req: Request, res: Response) {
	const { email } = req.body

	try {
		const query = `SELECT gambles FROM users WHERE email = 'moshe@gmail.com'`
		const [user] = await pool.query(query, [email])

		if (Array.isArray(user) && user.length > 0) {
			const { gambles }: any = user[0]

			// Parse the "gambles" strings to JSON objects
			const gamblesArray = gambles.map((g: string) => JSON.parse(g))

			console.log(gamblesArray)
			res.json(gamblesArray)
		} else {
			res.status(404).json({ message: "User not found" })
		}
	} catch (error) {
		Logging.error(error)
		res.sendStatus(500)
	}
}
export default { createUser, getAllUsers, deleteUser, login, rewardHandler, getGambles }
