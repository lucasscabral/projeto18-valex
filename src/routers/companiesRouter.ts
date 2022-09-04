import { Router } from "express";
import * as companiesController from "../controllers/companiesController"
import { checaCorpoDeCriacaoCard, checaCorpoRecarga } from "../middlewers/companiesMiddlewer";

const companiesRouter = Router()

companiesRouter.post("/companies/:idUser/card", checaCorpoDeCriacaoCard, companiesController.criarCartao)
companiesRouter.post("/companies/recharges", checaCorpoRecarga)

export default companiesRouter 