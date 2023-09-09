"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const SERVER_HOST_NAME = process.env.SERVER_HOST_NAME || "localhost";
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "test";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "mysql";
const SALT = Number(process.env.SALT);
const SECRET_KEY = String(process.env.SECRET_KEY);
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
};
const config = {
    server: {
        mysql: MYSQL,
        port: SERVER_PORT,
    },
    keys: {
        salt: SALT,
        token: SECRET_KEY,
    },
};
exports.default = config;
