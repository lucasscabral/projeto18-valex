import { Request, Response } from "express";
import { verificaExistenciaDeCartao } from "../utils/utilsService";
import { buscarEmpresa, buscarUsuario, formaNumeroCartaoFormatado, formatarNomeCartao, geraDataDeValidade, geraCodigoCvc, verificaTipoDeCartao, cadastraCartao, verificaCartaoCadastrado, efetuaRecarga } from "../services/companiesService";
import { verificaExpiracaoDoCartao } from "../services/employeeService";
import dayjs from "dayjs";

export async function criarCartao(req: Request, res: Response) {
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
        await verificaTipoDeCartao(idUsuario, tipoCartao)

        await cadastraCartao(idUsuario, numeroCartao, nomeCartao, codigoCvc, dataVencimento, tipoCartao)

        res.status(201).send("Cartão criado com sucesso")
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

export async function recarregaCartao(req: Request, res: Response) {
    const { cardId, amount } = res.locals.body
    const data = {
        cardId,
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        amount
    }
    console.log(data.timestamp)

    try {
        const cartaoCadastrado = await verificaExistenciaDeCartao(cardId)

        await verificaCartaoCadastrado(cartaoCadastrado[0].password)

        await verificaExpiracaoDoCartao(cartaoCadastrado[0].expirationDate)

        await efetuaRecarga(data.cardId, data.timestamp, data.amount)

        res.sendStatus(200)
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