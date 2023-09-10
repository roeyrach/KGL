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
Object.defineProperty(exports, "__esModule", { value: true });
const MySqlGames_1 = require("../database/MySqlGames");
const mysql_1 = require("../database/mysql");
const getAllGames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, MySqlGames_1.getAll)();
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const createTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, name } = req.body;
    try {
        const result = yield (0, mysql_1.createNewTable)(name, data);
        return res.status(201).json({ message: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const insertAllGames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, MySqlGames_1.insertData)();
        return res.status(201).json({ message: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, slug, title, providerName, thumb } = req.body;
    const game = {
        id: id,
        slug: slug,
        title: title,
        providerName: providerName,
        thumb: thumb,
    };
    try {
        const result = yield (0, MySqlGames_1.createNew)(game);
        return res.status(201).json({ message: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = { createTable, getAllGames, insertAllGames, createGame };
