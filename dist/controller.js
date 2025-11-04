"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHighScores = exports.getHighScores = void 0;
const model_1 = require("./model");
const getHighScores = async (req, res, next) => {
    try {
        const highscores = await (0, model_1.fetchHighScores)();
        res.status(200).json(highscores);
    }
    catch (err) {
        next(err);
    }
};
exports.getHighScores = getHighScores;
const postHighScores = async (req, res, next) => {
    try {
        const { name, score, time } = req.body;
        if (!name || !score || !time) {
            return res
                .status(400)
                .json({ message: "Missing required fields: name, score, and time are required" });
        }
        if (typeof name !== "string") {
            return res.status(400).json({ message: "Name must be a string" });
        }
        if (typeof score !== "number" || score < 0) {
            return res.status(400).json({ message: "Score must be a positive number" });
        }
        const dateTime = new Date(time);
        if (isNaN(dateTime.getTime())) {
            return res.status(400).json({ message: "Time must be a valid date" });
        }
        const result = await (0, model_1.insertHighScores)(name, score, dateTime);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.postHighScores = postHighScores;
