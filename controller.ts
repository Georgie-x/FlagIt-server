import { fetchHighSores, insetHighScores } from "./model"

const getHighScores = async (req, res, next) => {
	try {
		const { name, score, date } = req.query
		const highscores = await fetchHighScores(name, score, date)
		return res.status(200).send(highscores)
	} catch (err) {
		next(err)
	}
}
const postHighScores = async (req, res, next) => {
	try {
		const newScore = req.body
		const { name, score, time } = req.params
		const result = newScore(name, score, time)
		return res.status(201).send({ result })
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getHighScores,
	postHighScores,
}
