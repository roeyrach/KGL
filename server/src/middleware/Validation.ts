import Joi, { ObjectSchema } from "joi"
import { NextFunction, Request, Response } from "express"
import Logging from "../library/Logging"
import User from "../models/User"

export const ValidateSchema = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body)

			next()
		} catch (error) {
			Logging.error(error)
			return res.status(422).json({ error })
		}
	}
}

export const Schema = {
	user: {
		fields: Joi.object<User>({
			username: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			token: Joi.string(),
			amount: Joi.number(),
		}),
		auth: Joi.object<User>({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}),
	},
}
