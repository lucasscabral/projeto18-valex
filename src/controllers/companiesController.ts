import { Request,Response } from "express";
import { buscarEmpresa } from "../services/companiesService";

export async function createCards(req:Request,res:Response) {
    const apiKey = res.locals.apiKey
    const {typeCard} = res.locals.body
    const {idUser} = req.params

    const verificaEmpresa = await buscarEmpresa(apiKey)

    res.status(200).send(verificaEmpresa)
}