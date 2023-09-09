"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = exports.getAll = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = __importDefault(require("../config/config"));
const ReadJSON_1 = __importDefault(require("../library/ReadJSON"));
const Logging_1 = __importDefault(require("../library/Logging"));
const filename = "C:/Users/97250/git/KGL/server/src/config/game-data.json";
const params = config_1.default.server.mysql;
const pool = mysql2_1.default.createPool(params).promise();
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query(`SELECT * FROM games`);
            return result;
        }
        catch (error) {
            const err = Error(`getAll: ${error}`);
            Logging_1.default.error(err);
        }
    });
}
exports.getAll = getAll;
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const games = yield (0, ReadJSON_1.default)(filename);
            // Define the SQL query to insert a game
            const insertQuery = `
                            INSERT INTO games (id, slug, title, providerName, thumb)
                            VALUES (?, ?, ?, ?, ?)
                            `;
            for (const game of games) {
                const { id, slug, title, providerName, thumb } = game;
                // Check if a game with the same id already exists in the database
                const [existingRows] = yield pool.query("SELECT id FROM games WHERE id = ?", [id]);
                // Check the length of existingRows or if the first element is truthy
                if (Array.isArray(existingRows) && existingRows.length === 0) {
                    // If no existing game with the same id found, insert the new game
                    yield pool.query(insertQuery, [id, slug, title, providerName, (thumb === null || thumb === void 0 ? void 0 : thumb.url) || ""]);
                    Logging_1.default.info(`Insert succeeded: ${title}`);
                }
                else {
                    Logging_1.default.warn(`Skipping duplicate game: ${title}`);
                }
            }
            console.log("All games inserted successfully");
        }
        catch (error) {
            const err = Error(`inserting games: ${error}`);
            Logging_1.default.error(err);
        }
        finally {
            if (pool) {
                yield pool.end();
            }
        }
    });
}
exports.insertData = insertData;
