import express, { json } from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routers/index"
import errorsHendler from "../src/middlewers/errorsHendler"


dotenv.config()

const server = express()

server.use(cors())
server.use(json())
server.use(router)
server.use(errorsHendler)

const PORT: number = Number(process.env.PORT)

server.listen(PORT, () => console.log(`Servidor Rodando na porta: ${PORT}`))