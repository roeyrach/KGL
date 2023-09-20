import express from "express"
import controller from "../controllers/User"
import { Schema, ValidateSchema } from "../middleware/Validation"
import { Encrypt } from "../middleware/Hashing"

const router = express.Router()

router.post("/createUser", ValidateSchema(Schema.user.fields), Encrypt(), controller.createUser)
// router.get("/get/:userId", controller.readUser)
router.get("/getAllUsers", controller.getAllUsers)
// router.patch("/update/:userId", controller.updateUser)
router.delete("/deleteUser", ValidateSchema(Schema.user.auth), Encrypt(), controller.deleteUser)
router.post("/login", ValidateSchema(Schema.user.auth), controller.login)
router.post("/rewardHandler", controller.rewardHandler)
router.get("/getGambles", controller.getGambles)

export = router
