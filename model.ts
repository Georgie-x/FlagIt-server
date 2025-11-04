import { mockHighscores, Highscore } from './db/mock-db'

const fetchHighScores = async (): Promise<Highscore[]> => {
	return mockHighscores.slice(0, 20)
}

const insertHighScores = async (name: string, score: number, time: Date): Promise<Highscore> => {
	const newScore: Highscore = { name, score, time }
	mockHighscores.push(newScore)
	return newScore
}

export { fetchHighScores, insertHighScores }
