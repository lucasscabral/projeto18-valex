import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { verificaExistenciaDeCartao } from "../utils/utilsService";
import dayjs from "dayjs";

// { verificaCartaoDeUsuario, verificaExpiracaoDoCartao, verificaCartaoCadastrado, verificaCodigoCvc, ativacaoDeCartao, pegaTodasTransacoes, comparaSenhaCartao, verificaBloqueioDoCarato, verificaDesbloqueioDoCarato, bloquearOuDesbloquearCartao, verificaCartaoAtivo }

export async function ativaCartao(req: Request, res: Response) {
    const idUsuario = Number(req.params.idUser)
    const { idCartao, codigoCvc, senha } = res.locals.body

    try {
        const cartaoDoUsuario = await employeeService.verificaCartaoDeUsuario(idUsuario, idCartao)

        await employeeService.verificaExpiracaoDoCartao(cartaoDoUsuario[0].expirationDate)

        await employeeService.verificaCartaoCadastrado(cartaoDoUsuario[0].password)

        await employeeService.verificaCodigoCvc(cartaoDoUsuario[0].securityCode, codigoCvc)

        await employeeService.ativacaoDeCartao(senha, idCartao)
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

        await employeeService.verificaCartaoDeUsuario(Number(idUser), Number(idCard))

        const todasTransacoes = await employeeService.pegaTodasTransacoes(Number(idCard))

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
    const { idUser } = req.params
    const { idCartao, senha } = res.locals.body
    const bloquearCartao = true

    try {
        const cartaoCadastrado = await verificaExistenciaDeCartao(idCartao)
        await employeeService.verificaCartaoDeUsuario(Number(idUser), Number(idCartao))

        await employeeService.comparaSenhaCartao(senha, cartaoCadastrado[0].password)

        await employeeService.verificaExpiracaoDoCartao(cartaoCadastrado[0].expirationDate)

        await employeeService.verificaBloqueioDoCarato(cartaoCadastrado[0].isBlocked)
        console.log(cartaoCadastrado[0].isBlocked)
        await employeeService.bloquearOuDesbloquearCartao(bloquearCartao, idCartao)
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

export async function desbloquearCartao(req: Request, res: Response) {
    const { idUser } = req.params
    const { idCartao, senha } = res.locals.body
    const bloquearCartao = false

    try {
        const cartaoCadastrado = await verificaExistenciaDeCartao(idCartao)
        await employeeService.verificaCartaoDeUsuario(Number(idUser), Number(idCartao))

        await employeeService.comparaSenhaCartao(senha, cartaoCadastrado[0].password)

        await employeeService.verificaExpiracaoDoCartao(cartaoCadastrado[0].expirationDate)

        await employeeService.verificaDesbloqueioDoCarato(cartaoCadastrado[0].isBlocked)
        console.log(cartaoCadastrado[0].isBlocked)
        await employeeService.bloquearOuDesbloquearCartao(bloquearCartao, idCartao)
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

export async function compras(req: Request, res: Response) {
    const { idCartao, senha, idNegocio, quantia } = res.locals.body
    const data = {
        idCartao,
        senha,
        idNegocio,
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        quantia
    }

    console.log(data.timestamp)

    try {
        const cartaoCadastrado = await verificaExistenciaDeCartao(idCartao)

        await employeeService.verificaCartaoAtivo(cartaoCadastrado[0].password)

        await employeeService.verificaExpiracaoDoCartao(cartaoCadastrado[0].expirationDate)

        await employeeService.verificaBloqueioDoCarato(cartaoCadastrado[0].isBlocked)

        await employeeService.comparaSenhaCartao(senha, cartaoCadastrado[0].password)

        const estabelecimento = await employeeService.verificaEstabelcimento(idNegocio)

        await employeeService.verificaTipoDoCartao(cartaoCadastrado[0].type, estabelecimento[0].type)
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