import db from "./db/connection.js"

const fetchHighScores = async () => {
	const query = `
		SELECT highscores.name, highscores.score, highscores.time 
		FROM highscores
		ORDER BY highscores.score DESC
		LIMIT 20`
	const values: [] = []

	const body = await db.query(query, values)
	console.log(body.rows)
	if (body.rows.length === 0) {
		throw { status: 404, message: "no records found" }
	} else {
		return body.rows
	}
}

const insertHighScores = async (name: string, score: number, time: string) => {
	if (name && name.length < 3) {
		return Promise.reject({
			status: 404,
			message: "name too short - must be at least 3 characters",
		})
	}
	if (name && name.length > 8) {
		return Promise.reject({ status: 404, message: "name too long - maximum 8 characters" })
	}
	if (score && score <= 0) {
		return Promise.reject({ status: 400, message: "invalid score" })
	}

	const query = `INSERT INTO highscores (name, score, time) VALUES ($1, $2, $3) RETURNING *`
	const values: [] = []

	const result = await db.query(query, [name, score, time])
	return result.rows[0]
}
