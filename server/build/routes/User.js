"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const Validation_1 = require("../middleware/Validation");
const Hashing_1 = require("../middleware/Hashing");
const router = express_1.default.Router();
router.post("/createUser", (0, Validation_1.ValidateSchema)(Validation_1.Schema.user.fields), (0, Hashing_1.Encrypt)(), User_1.default.createUser);
// router.get("/get/:userId", controller.readUser)
router.get("/getAllUsers", User_1.default.getAllUsers);
// router.patch("/update/:userId", controller.updateUser)
router.delete("/deleteUser", (0, Validation_1.ValidateSchema)(Validation_1.Schema.user.auth), (0, Hashing_1.Encrypt)(), User_1.default.deleteUser);
router.post("/login", (0, Validation_1.ValidateSchema)(Validation_1.Schema.user.auth), User_1.default.login);
router.post("/rewardHandler", User_1.default.rewardHandler);
module.exports = router;
