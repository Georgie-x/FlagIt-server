"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHighScores = exports.fetchHighScores = void 0;
const mock_db_1 = require("./db/mock-db");
const fetchHighScores = async () => {
    return mock_db_1.mockHighscores.slice(0, 20);
};
exports.fetchHighScores = fetchHighScores;
const insertHighScores = async (name, score, time) => {
    const newScore = { name, score, time };
    mock_db_1.mockHighscores.push(newScore);
    return newScore;
};
exports.insertHighScores = insertHighScores;
