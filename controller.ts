import { fetchHighScores, insertHighScores } from "./model"
import { RequestHandler } from "express"

const getHighScores: RequestHandler = async (req, res, next) => {
	try {
		const highscores = await fetchHighScores()
		res.status(200).json(highscores)
	} catch (err) {
		next(err)
	}
}
const postHighScores: RequestHandler = async (req, res, next) => {
	try {
		const { name, score, time } = req.body
		if (!name || !score || !time) {
			return res
				.status(400)
				.json({ message: "Missing required fields: name, score, and time are required" })
		}

		if (typeof name !== "string") {
			return res.status(400).json({ message: "Name must be a string" })
		}

		if (typeof score !== "number" || score < 0) {
			return res.status(400).json({ message: "Score must be a positive number" })
		}

		const dateTime = new Date(time)
		if (isNaN(dateTime.getTime())) {
			return res.status(400).json({ message: "Time must be a valid date" })
		}
		const result = await insertHighScores(name, score, dateTime)
		res.status(201).json(result)
	} catch (err) {
		next(err)
	}
}

export { getHighScores, postHighScores }
