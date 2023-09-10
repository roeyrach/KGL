"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Game_1 = __importDefault(require("../controllers/Game"));
const router = express_1.default.Router();
router.post("/createTable", Game_1.default.createTable);
router.get("/getAllGames", Game_1.default.getAllGames);
router.get("/insertAllGames", Game_1.default.insertAllGames);
router.post("/createGame", Game_1.default.createGame);
module.exports = router;
