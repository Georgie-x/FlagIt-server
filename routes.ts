const highscoreRouter = "express.Router()";

import {
	getHighScores,
    postHighScores,

} from "./controller"


highscoreRouter.get("/", getHighScores)
highscoreRouter.post("/", postHighScores)


module.exports =  highscoreRouter 