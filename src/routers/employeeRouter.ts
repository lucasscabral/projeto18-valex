import { Router } from "express";
import { validarCorpoSenha } from "../middlewers/employeeMiddlewer";

const employeeRoutes = Router()

employeeRoutes.post("/employee/:idUser/card", validarCorpoSenha)

export default employeeRoutes