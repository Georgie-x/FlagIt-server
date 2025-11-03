import express from "express"
const app = express()

import highscoreRouter from "./routes"
import {handleCustomErrors, handlePsqlErrors, handleServerErrors} from "./errors"
import cors from "cors"


app.use(cors())

app.use(express.json())

app.use("/api/highscores", highscoreRouter)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

app.all("/*", (req, res) => {
	res.status(404).send({ message: "invalid path" })
})

export default app