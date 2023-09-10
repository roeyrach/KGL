import express from "express"
import controller from "../controllers/Game"

const router = express.Router()

router.post("/createTable", controller.createTable)
router.get("/getAllGames", controller.getAllGames)
router.get("/insertAllGames", controller.insertAllGames)
router.post("/createGame", controller.createGame)

export = router
