import express from "express"
import http from "http"
import config from "./config/config"
import Logging from "./library/Logging"
import cors from "cors"
import gamesRoutes from "./routes/Games"
import userRoutes from "./routes/User"

const router = express()

/** Use cors middlware */
router.use(cors())

/** Start the server */
const StartServer = () => {
	router.use((req, res, next) => {
		/** Log the Request */
		Logging.req(`Incoming -> Method: [${req.method} - Url: ${req.url}] - IP: [${req.socket.remoteAddress}]`)
		res.on("finish", () => {
			/** Log the Response */
			Logging.res(`Incoming -> Method: [${req.method} - Url: ${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
		})

		next()
	})
	router.use(express.urlencoded({ extended: true }))
	router.use(express.json())

	/** Rules of our API */
	router.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Methods", "Origin, X-Requested-with, Content-Type, Accept, Authorization")

		if (req.method == "OPTIONS") {
			res.header("Access-Control-Allow-Origin", "PUT, POST, PATCH, DELETE, GET")
			return res.status(200).json({})
		}

		next()
	})

	/** Routes */
	router.use("/games", gamesRoutes)
	router.use("/users", userRoutes)

	/** Healthcheck */
	router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }))

	/** Error handling */
	router.use((req, res, next) => {
		const error = new Error("not found")
		Logging.error(error)

		return res.status(404).json({ message: error.message })
	})

	http.createServer(router).listen(config.server.port, () => Logging.info(`Server listening on port ${config.server.port}`))
}

Logging.info("Connection established")
StartServer()
