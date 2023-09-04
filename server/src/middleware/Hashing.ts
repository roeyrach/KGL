import { Request, Response, NextFunction } from "express"
import Logging from "../library/Logging"
import config from "../config/config"
const bcrypt = require("bcrypt")

export const Encrypt = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { password } = req.body

			const hashedPassword = await bcrypt.hash(password, config.keys.salt)
			req.body.password = hashedPassword

			next()
		} catch (error) {
			Logging.error(error)
			next(error)
		}
	}
}
