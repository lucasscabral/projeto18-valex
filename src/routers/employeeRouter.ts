import { Router } from "express";
import { ativaCartao, listaTransacoesSaldo } from "../controllers/employeeController";
import { validarCorpoSenha, validarCorpoBlockUnlLock } from "../middlewers/employeeMiddlewer";

const employeeRoutes = Router()

employeeRoutes.post("/employee/:idUser/card", validarCorpoSenha, ativaCartao)
employeeRoutes.get("/employee/:idUser/:idCard/cardTransactions", listaTransacoesSaldo)
employeeRoutes.post("/employee/blockCard", validarCorpoBlockUnlLock)
// employeeRoutes.post("/employee/unlockCard", validarCorpoSenha)

export default employeeRoutes