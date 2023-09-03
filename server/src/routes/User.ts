import express from "express"
import controller from "../controllers/User"

const router = express.Router()

router.post("/createUser", controller.createUser)
// router.get("/get/:userId", controller.readUser)
router.get("/getAllUsers", controller.getAllUsers)
// router.patch("/update/:userId", controller.updateUser)
router.delete("/deleteUser/:email", controller.deleteUser)
router.post("/login", controller.login)

export = router
