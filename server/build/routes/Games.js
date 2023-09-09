"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Games_1 = __importDefault(require("../controllers/Games"));
const router = express_1.default.Router();
router.post("/createTable", Games_1.default.createTable);
router.get("/getAllGames", Games_1.default.getAllGames);
router.get("/insertAllGames", Games_1.default.insertAllGames);
module.exports = router;
