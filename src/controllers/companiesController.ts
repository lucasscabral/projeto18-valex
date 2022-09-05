import { Request, Response } from "express";
import { verificaExistenciaDeCartao } from "../utils/utilsService";
import * as companiesService from "../services/companiesService";
import { verificaExpiracaoDoCartao } from "../services/employeeService";
import dayjs from "dayjs";

export async function criarCartao(req: Request, res: Response) {
    const apiKey = res.locals.apiKey
    const tipoCartao = res.locals.tipoCartao
    const idUsuario = Number(req.params.idUser)
    try {
        await companiesService.buscarEmpresa(apiKey)
        const verificaIdUsuario = await companiesService.buscarUsuario(idUsuario)
        const numeroCartao = await companiesService.formaNumeroCartaoFormatado()
        const nomeCartao = await companiesService.formatarNomeCartao(verificaIdUsuario.fullName)
        const dataVencimento = await companiesService.geraDataDeValidade()
        const codigoCvc = await companiesService.geraCodigoCvc()
        await companiesService.verificaTipoDeCartao(idUsuario, tipoCartao)

        await companiesService.cadastraCartao(idUsuario, numeroCartao, nomeCartao, codigoCvc, dataVencimento, tipoCartao)

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
    const { idCartao, quantia } = res.locals.body
    const data = {
        idCartao,
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        quantia
    }
    console.log(data.timestamp)

    try {
        const cartaoCadastrado = await verificaExistenciaDeCartao(idCartao)

        await companiesService.verificaCartaoCadastrado(cartaoCadastrado[0].password)

        await verificaExpiracaoDoCartao(cartaoCadastrado[0].expirationDate)

        await companiesService.efetuaRecarga(data.idCartao, data.timestamp, data.quantia)

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