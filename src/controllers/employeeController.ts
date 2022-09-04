import { Request, Response } from "express";
import { verificaCartaoDeUsuario, verificaExpiracaoDoCartao, verificaCartaoCadastrado, verificaCodigoCvc, ativacaoDeCartao, pegaTodasTransacoes } from "../services/employeeService";
import { verificaExistenciaDeCartao } from "../utils/utilsService";

export async function ativaCartao(req: Request, res: Response) {
    const idUsuario = Number(req.params.idUser)
    const { idCartao, codigoCvc, senha } = res.locals.body

    try {
        const cartaoDoUsuario = await verificaCartaoDeUsuario(idUsuario, idCartao)

        await verificaExpiracaoDoCartao(cartaoDoUsuario[0].expirationDate)

        await verificaCartaoCadastrado(cartaoDoUsuario[0].password)

        await verificaCodigoCvc(cartaoDoUsuario[0].securityCode, codigoCvc)

        await ativacaoDeCartao(senha)
        res.sendStatus(201)
    } catch ({ code, message }) {
        if (code === "NotFound") {
            return res.status(404).send(message)
        }
        if (code === "Unauthorized") {
            return res.status(401).send(message)
        }
        res.sendStatus(500)
    }

}

export async function listaTransacoesSaldo(req: Request, res: Response) {
    const { idUser, idCard } = req.params

    try {
        await verificaExistenciaDeCartao(Number(idCard))

        await verificaCartaoDeUsuario(Number(idUser), Number(idCard))

        const todasTransacoes = await pegaTodasTransacoes(Number(idCard))

        res.status(200).send(todasTransacoes)
    } catch ({ code, message }) {
        if (code === "NotFound") {
            return res.status(404).send(message)
        }
        if (code === "Unauthorized") {
            return res.status(401).send(message)
        }
        res.sendStatus(500)
    }
}

export async function bloquearCartao(req: Request, res: Response) {



}