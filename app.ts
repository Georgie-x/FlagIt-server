import express from "express"
import highscoreRouter from "./routes"
import { handleCustomErrors, handlePsqlErrors, handleServerErrors } from "./errors"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/highscores", highscoreRouter)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

export default app
