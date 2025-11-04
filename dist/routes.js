"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const highscoreRouter = express_1.default.Router();
const controller_1 = require("./controller");
highscoreRouter.get("/", controller_1.getHighScores);
highscoreRouter.post("/", controller_1.postHighScores);
exports.default = highscoreRouter;
