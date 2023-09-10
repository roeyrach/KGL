"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config/config"));
const Logging_1 = __importDefault(require("./library/Logging"));
const cors_1 = __importDefault(require("cors"));
const Game_1 = __importDefault(require("./routes/Game"));
const User_1 = __importDefault(require("./routes/User"));
const router = (0, express_1.default)();
/** Use cors middlware */
router.use((0, cors_1.default)());
/** Start the server */
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the Request */
        Logging_1.default.req(`Incoming -> Method: [${req.method} - Url: ${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            /** Log the Response */
            Logging_1.default.res(`Incoming -> Method: [${req.method} - Url: ${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Origin", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use("/games", Game_1.default);
    router.use("/users", User_1.default);
    /** Healthcheck */
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error("not found");
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.default.server.port, () => Logging_1.default.info(`Server listening on port ${config_1.default.server.port}`));
};
Logging_1.default.info("Connection established");
StartServer();
