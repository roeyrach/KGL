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
exports.Encrypt = void 0;
const Logging_1 = __importDefault(require("../library/Logging"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt = require("bcrypt");
const Encrypt = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const hashedPassword = yield bcrypt.hash(password, config_1.default.keys.salt);
            req.body.password = hashedPassword;
            next();
        }
        catch (error) {
            Logging_1.default.error(error);
            next(error);
        }
    });
};
exports.Encrypt = Encrypt;
