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
exports.deleteById = exports.createNote = exports.getById = exports.getAll = exports.createNewTable = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = __importDefault(require("../config/config"));
const Logging_1 = __importDefault(require("../library/Logging"));
const params = config_1.default.server.mysql;
const pool = mysql2_1.default.createPool(params).promise();
function createNewTable(tableName, columnDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Define the SQL query to create the table
            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
            ${columnDefinitions.join(", ")}
            )
            `;
            yield pool.query(createTableQuery);
        }
        catch (error) {
            const err = Error(`createNewTable: ${error}`);
            Logging_1.default.error(err);
        }
    });
}
exports.createNewTable = createNewTable;
function getAll(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM ${db}`);
        return result;
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
        return result;
    });
}
exports.getById = getById;
function createNote(title, contents) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents]);
        return result;
    });
}
exports.createNote = createNote;
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`DELETE FROM notes WHERE id = ?`, [id]);
        return result;
    });
}
exports.deleteById = deleteById;
