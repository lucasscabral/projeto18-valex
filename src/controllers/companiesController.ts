import { Request, Response } from "express";
import { buscarEmpresa, buscarUsuario, formaNumeroCartaoFormatado, formatarNomeCartao, geraDataDeValidade, geraCodigoCvc } from "../services/companiesService";

export async function createCards(req: Request, res: Response) {
    const apiKey = res.locals.apiKey
    const tipoCartao = res.locals.tipoCartao
    const idUsuario = Number(req.params.idUser)
    try {
        const verificaEmpresa = await buscarEmpresa(apiKey)
        const verificaIdUsuario = await buscarUsuario(idUsuario)
        const numeroCartao = await formaNumeroCartaoFormatado()
        const nomeCartao = await formatarNomeCartao(verificaIdUsuario.fullName)
        const dataVencimento = await geraDataDeValidade()
        const codigoCvc = await geraCodigoCvc()

        console.log(dataVencimento)

        res.status(200).send(verificaIdUsuario)
    } catch ({ code, message }) {
        if (code === "NotFound") {
            return res.status(404).send(message)
        }
        res.sendStatus(500)
    }

}