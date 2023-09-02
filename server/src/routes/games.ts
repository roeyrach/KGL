import express from "express"
import controller from "../controllers/games"

const router = express.Router()

router.post("/createTable", controller.createTable)
router.get("/getAllGames", controller.getAllGames)
router.get("/insertAllGames", controller.insertAllGames)

export = router
