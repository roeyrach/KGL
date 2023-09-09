import { NextFunction, Request, Response } from "express"
import mysql from "mysql2"
import config from "../config/config"
import Logging from "../library/Logging"
import jwt from "jsonwebtoken"
const bcrypt = require("bcrypt")

const params = config.server.mysql
const pool = mysql.createPool(params).promise()

async function createUser(req: Request, res: Response, next: NextFunction) {
	const { username, email, password, amount } = req.body

	try {
		const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

		// Check if user already exists
		if (!Array.isArray(existingUsers) || existingUsers.length !== 0) return res.status(400).send({ status: "User already exists" })

		// Create JWT access token
		const token = jwt.sign({ password, email }, config.keys.token)

		// Insert the new user
		await pool.query("INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?, ?)", [
			username,
			email,
			password,
			token,
			amount,
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

async function rewardHandler(req: Request, res: Response, next: NextFunction) {
	const { result, email } = req.body
	console.log(result, email)

	try {
		const query = `UPDATE users
		SET amount = amount + ?
		WHERE email = ?;
	  `

		let amount = 0

		if (result[0] === "cherry" && result[1] === "cherry" && result[2] === "cherry") {
			amount = 50
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if ((result[0] === "cherry" && result[1] === "cherry") || (result[1] === "cherry" && result[2] === "cherry")) {
			amount = 40
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if (result[0] === "apple" && result[1] === "apple" && result[2] === "apple") {
			amount = 20
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if ((result[0] === "apple" && result[1] === "apple") || (result[1] === "apple" && result[2] === "apple")) {
			amount = 10
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if (result[0] === "banana" && result[1] === "banana" && result[2] === "banana") {
			amount = 15
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if ((result[0] === "banana" && result[1] === "banana") || (result[1] === "banana" && result[2] === "banana")) {
			amount = 5
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else if (result[0] === "lemon" && result[1] === "lemon" && result[2] === "lemon") {
			amount = 3
			await pool.query(query, [amount, email])
			return res.status(200).json({ amount })
		} else {
			// Retrieve the updated amount from the database
			const [ret] = await pool.query(
				`SELECT amount
						  FROM users
						  WHERE email = ? AND amount > 0;
						`,
				[email]
			)

			if (Array.isArray(ret) && ret.length > 0) {
				amount = -1
			}

			// Execute the query with the determined amount
			await pool.query(query, [amount, email])

			return res.status(200).json({ amount: amount })
		}
	} catch (error) {
		console.error(error)
		res.sendStatus(500)
	}
}

export default { createUser, getAllUsers, deleteUser, login, rewardHandler }
