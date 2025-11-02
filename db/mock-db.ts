export type Highscore = {
    name: string,
    score: number,
    time: Date,
}

export const mockHighscores: { name: string; score: number; time: Date }[] = [
	{ name: "nelly", score: 5, time: new Date("2025-11-02T12:34:56Z") },
	{ name: "nel", score: 13, time: new Date("2025-11-02T12:34:56Z") },
	{ name: "eleanor", score: 5, time: new Date("2025-11-02T12:34:56Z") },
]
