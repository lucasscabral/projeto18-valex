import { Router } from "express";
import * as companiesController from "../controllers/companiesController"
import { checarRequisicaoCriacaoCard } from "../middlewers/companiesMiddlewer";

const companiesRouter = Router()

companiesRouter.post("/companies/:idUser/card", checarRequisicaoCriacaoCard, companiesController.createCards)

export default companiesRouter 