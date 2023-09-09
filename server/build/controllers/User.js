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
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = __importDefault(require("../config/config"));
const Logging_1 = __importDefault(require("../library/Logging"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcrypt");
const params = config_1.default.server.mysql;
const pool = mysql2_1.default.createPool(params).promise();
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, amount } = req.body;
        try {
            const [existingUsers] = yield pool.query("SELECT * FROM users WHERE email = ?", [email]);
            // Check if user already exists
            if (!Array.isArray(existingUsers) || existingUsers.length !== 0)
                return res.status(400).send({ status: "User already exists" });
            // Create JWT access token
            const token = jsonwebtoken_1.default.sign({ password, email }, config_1.default.keys.token);
            // Insert the new user
            yield pool.query("INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?, ?)", [
                username,
                email,
                password,
                token,
                amount,
            ]);
            res.sendStatus(201);
        }
        catch (error) {
            Logging_1.default.error("Error creating user:" + error);
            res.sendStatus(500);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const [existingUser] = yield pool.query("SELECT * FROM users WHERE email = ?", [email]);
            // Check if user already exists
            if (Array.isArray(existingUser) && existingUser.length === 0)
                return res.status(404).json({ message: "User not found" });
            const resultUser = existingUser;
            // Compare hashed passwords
            const passwordMatch = yield bcrypt.compare(password, resultUser[0].password);
            if (!passwordMatch)
                return res.status(401).json({ message: "Password does not match", state: false });
            // Create JWT access token
            const token = jsonwebtoken_1.default.sign({ password, email }, config_1.default.keys.token);
            // Insert JWT access token
            yield pool.query("UPDATE users SET token = ? WHERE email = ?", [token, email]);
            return res
                .status(200)
                .json({ message: "Password match", user: { username: resultUser[0].username, email: resultUser[0].email, state: true } });
        }
        catch (error) {
            Logging_1.default.error("Error login user:" + error);
            res.sendStatus(500);
        }
    });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const [existingUser] = yield pool.query("SELECT * FROM users WHERE email = ?", [email]);
            // Check if user already exists
            if (Array.isArray(existingUser) && existingUser.length === 0)
                return res.status(400).send({ error: "User not found" });
            const user = existingUser;
            // Compare hashed passwords
            console.log(password, user[0].password);
            const passwordMatch = yield bcrypt.compare(password, user[0].password);
            if (!passwordMatch)
                return res.status(401).json({ message: "Password does not match", state: false });
            const token = user[0].token;
            if (token == null)
                return res.status(401).json({ message: "Token does not exists", state: false });
            jsonwebtoken_1.default.verify(token, config_1.default.keys.token, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.status(403).send(err);
                //Delete the user
                yield pool.query("DELETE FROM users WHERE email = ?", [email]);
                return res.status(201).send({ message: "User deleted successfully" });
            }));
        }
        catch (error) {
            Logging_1.default.error("Error deleting user:" + error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM users`);
        return res.status(200).send(result);
    });
}
function rewardHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { result, email } = req.body;
        console.log(result, email);
        try {
            const query = `UPDATE users
		SET amount = amount + ?
		WHERE email = ?;
		`;
            if (result[0] === "cherry" && result[1] === "cherry" && result[2] === "cherry") {
                yield pool.query(query, [50, email]);
                return res.sendStatus(200);
            }
            if ((result[0] === "cherry" && result[1] === "cherry") || (result[1] === "cherry" && result[2] === "cherry")) {
                yield pool.query(query, [40, email]);
                return res.sendStatus(200);
            }
            if (result[0] === "apple" && result[1] === "apple" && result[2] === "apple") {
                yield pool.query(query, [20, email]);
                return res.sendStatus(200);
            }
            if ((result[0] === "apple" && result[1] === "apple") || (result[1] === "apple" && result[2] === "apple")) {
                yield pool.query(query, [10, email]);
                return res.sendStatus(200);
            }
            if (result[0] === "banana" && result[1] === "banana" && result[2] === "banana") {
                yield pool.query(query, [15, email]);
                return res.sendStatus(200);
            }
            if ((result[0] === "banana" && result[1] === "banana") || (result[1] === "banana" && result[2] === "banana")) {
                yield pool.query(query, [5, email]);
                return res.sendStatus(200);
            }
            if (result[0] === "lemon" && result[1] === "lemon" && result[2] === "lemon") {
                yield pool.query(query, [3, email]);
                return res.sendStatus(200);
            }
            yield pool.query(`UPDATE users
			SET amount = amount - 1
			WHERE email = ? AND amount > 0;			
			`, [email]);
            return res.sendStatus(200);
        }
        catch (error) {
            res.sendStatus(500);
        }
    });
}
exports.default = { createUser, getAllUsers, deleteUser, login, rewardHandler };
