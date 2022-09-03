import { Request, Response } from "express";
import { verificaCartaoDeUsuario } from "../services/employeeService";

export async function ativaCartao(req: Request, res: Response) {
    const idUsuario = Number(req.params.idUser)
    const { idCartao, codigoCvc, senha } = res.locals.body
    try {
        await verificaCartaoDeUsuario(idUsuario, idCartao)

    } catch ({ code, message }) {
        if (code === "NotFound") {
            return res.status(404).send(message)
        }
        res.sendStatus(500)
    }

}