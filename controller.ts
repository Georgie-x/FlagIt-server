import { fetchHighScores, insertHighScores } from "./model"
import { Request, Response, NextFunction } from "express"

const getHighScores = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, score, date } = req.query
		const highscores = await fetchHighScores()
		return res.status(200).send(highscores)
	} catch (err) {
		next(err)
	}
}
const postHighScores = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const newScore = req.body
		const { name, score, time } = req.params
		const result = newScore(name, score, time)
		return res.status(201).send({ result })
	} catch (err) {
		next(err)
	}
}

export { getHighScores, postHighScores }
