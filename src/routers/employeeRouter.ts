import { Router } from "express";
import { ativaCartao, listaTransacoesSaldo } from "../controllers/employeeController";
import { validarCorpoSenha } from "../middlewers/employeeMiddlewer";

const employeeRoutes = Router()

employeeRoutes.post("/employee/:idUser/card", validarCorpoSenha, ativaCartao)
employeeRoutes.get("/employee/:idUser/:idCard/cardTransactions", listaTransacoesSaldo)
employeeRoutes.post("/employee/blockCard/:idUser", validarCorpoSenha)
employeeRoutes.post("/employee/unlockCard/:idUser", validarCorpoSenha)

export default employeeRoutes