import { NextFunction, Request, Response } from "express"
import { getAll, insertData, createNew } from "../database/MySqlGames"
import { createNewTable } from "../database/mysql"
import Game from "../models/Game"

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await getAll()
		return res.status(200).json({ result })
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const createTable = async (req: Request, res: Response, next: NextFunction) => {
	const { data, name } = req.body
	try {
		const result = await createNewTable(name, data)
		return res.status(201).json({ message: result })
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const insertAllGames = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await insertData()
		return res.status(201).json({ message: result })
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const createGame = async (req: Request, res: Response, next: NextFunction) => {
	const { id, slug, title, providerName, thumb } = req.body
	const game: Game = {
		id: id,
		slug: slug,
		title: title,
		providerName: providerName,
		thumb: thumb,
	}
	try {
		const result = await createNew(game)
		return res.status(201).json({ message: result })
	} catch (error) {
		return res.status(500).json({ error })
	}
}

export default { createTable, getAllGames, insertAllGames, createGame }
