import dotenv from "dotenv"

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000
const SERVER_HOST_NAME = process.env.SERVER_HOST_NAME || "localhost"

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost"
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "test"
const MYSQL_USER = process.env.MYSQL_USER || "root"
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "mysql"
const SALT = Number(process.env.SALT)

const MYSQL = {
	host: MYSQL_HOST,
	database: MYSQL_DATABASE,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
}

const config = {
	server: {
		mysql: MYSQL,
		port: SERVER_PORT,
	},
	keys: {
		salt: SALT,
	},
}

export default config
