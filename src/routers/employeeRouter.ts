import { Router } from "express";
import { ativaCartao, listaTransacoesSaldo, bloquearCartao, desbloquearCartao } from "../controllers/employeeController";
import { validarCorpoSenha, validarCorpoBlockUnlLock, checaCorpoPagamento } from "../middlewers/employeeMiddlewer";

const employeeRoutes = Router()

employeeRoutes.post("/employee/:idUser/card", validarCorpoSenha, ativaCartao)
employeeRoutes.get("/employee/:idUser/:idCard/cardTransactions", listaTransacoesSaldo)
employeeRoutes.post("/employee/blockCard/:idUser", validarCorpoBlockUnlLock, bloquearCartao)
employeeRoutes.post("/employee/unlockCard/:idUser", validarCorpoBlockUnlLock, desbloquearCartao)
employeeRoutes.post("/companies/payments", checaCorpoPagamento)

export default employeeRoutes