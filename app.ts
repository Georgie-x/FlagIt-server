import express from "express"
const app = express()
import { getEndpoints } from ".//controllers/api-controller"
import {
	articlesRouter,
	commentsRouter,
	usersRouter,
	topicsRouter,
} from "./routes/"
import {handleCustomErrors, handlePsqlErrors, handleServerErrors} from "./errors"
import cors from "cors"


app.use(cors())

app.use(express.json())

app.get("/api", getEndpoints)

app.use("/api/topics", topicsRouter)

app.use("/api/articles", articlesRouter)

app.use("/api/comments", commentsRouter)

app.use("/api/users", usersRouter)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

app.all("/*", (req, res) => {
	res.status(404).send({ message: "invalid path" })
})

module.exports = app