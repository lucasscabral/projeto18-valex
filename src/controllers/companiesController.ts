import { Request, Response } from "express";
import { buscarEmpresa, buscarUsuario } from "../services/companiesService";

export async function createCards(req: Request, res: Response) {
    const apiKey = res.locals.apiKey
    const tipoCartao = res.locals.tipoCartao
    const idUsuario = Number(req.params.idUser)
    try {
        const verificaEmpresa = await buscarEmpresa(apiKey)
        const varificaIdUsuario = await buscarUsuario(idUsuario)

        res.status(200).send(varificaIdUsuario)
    } catch ({ code, message }) {
        if (code === "NotFound") {
            return res.status(404).send(message)
        }
        res.sendStatus(500)
    }

}