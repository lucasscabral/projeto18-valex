import * as employeeRepository from "../repositories/employeeRepository";
import { verificaExistenciaDeUsuario, calculaMontanteDoCartao } from "../utils/utilsService";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt"

export async function verificaCartaoDeUsuario(idUsuario: number, idCartao: number) {
    await verificaExistenciaDeUsuario(idUsuario)
    const cartaoDoUsuario = await employeeRepository.buscarCartaoDoUsuario(idUsuario, idCartao)
    if (cartaoDoUsuario.length === 0) {
        throw { code: "Unauthorized", message: "Esse cartão não pertence a esse usuário" }
    }
    return cartaoDoUsuario
}

export async function verificaExpiracaoDoCartao(dataExpiracao: string) {
    const dataAtual = dayjs().format("MM/YYYY")
    const converteDataAtual = dataAtual.replace("/", "")
    const dataExpiracaoCartao = dataExpiracao.replace("/", "")
    if (converteDataAtual > dataExpiracaoCartao) {
        throw { code: "Unauthorized", message: "Esse cartão ja expirou" }
    }
}

export async function verificaCartaoCadastrado(senhaCadastrada: string | null) {
    if (senhaCadastrada !== null) {
        throw { code: "Unauthorized", message: "Esse cartão já está ativado" }
    }
}

export async function verificaCartaoAtivo(senhaCadastrada: string | null) {
    if (senhaCadastrada === null) {
        throw { code: "Unauthorized", message: "Esse cartão não está ativado" }
    }
}

export async function verificaCodigoCvc(codigoCvcCadastrado: string, codigoCvc: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const cvcConvertido = Number(codigoCvc)
    const descryptaCvcCadastrado = cryptr.decrypt(codigoCvcCadastrado)

    if (cvcConvertido !== Number(descryptaCvcCadastrado)) {
        throw { code: "Unauthorized", message: "Esse código CVC não pertence a esse cartão" }
    }
}

export async function ativacaoDeCartao(senha: number, idCartao: number) {
    const senhaEncryptografada: string = bcrypt.hashSync(senha.toString(), 10)
    await employeeRepository.insereSenhaDoCartao(senhaEncryptografada, idCartao)
}

export async function pegaTodasTransacoes(idCartao: number) {
    const todasTransacoesDeCompras = await employeeRepository.buscaTodasTransacoesDeCompras(idCartao)
    const todasTransacoesDeRecargas = await employeeRepository.buscaTodasTransacoesDeRecargas(idCartao)
    const saldoTotal = await calculaMontanteDoCartao(idCartao)

    const corpoTransacoes = {
        balance: saldoTotal,
        transactions: todasTransacoesDeCompras.transactions,
        recharges: todasTransacoesDeRecargas.recharges
    }

    return corpoTransacoes
}

export async function comparaSenhaCartao(senha: number, senhaJaCadastrada: string) {
    const comparaSenha = bcrypt.compareSync((senha).toString(), senhaJaCadastrada)
    if (!comparaSenha) {
        throw { code: "Unauthorized", message: "Senha inválida" }
    }
}

export async function verificaBloqueioDoCarato(cartaoBloqueado: boolean) {
    if (cartaoBloqueado) {
        throw { code: "Unauthorized", message: "Esse cartão esta bloqueado" }
    }
}

export async function verificaDesbloqueioDoCarato(cartaoBloqueado: boolean) {
    if (!cartaoBloqueado) {
        throw { code: "Unauthorized", message: "Esse cartão esta desbloqueado" }
    }
}

export async function bloquearOuDesbloquearCartao(statusCartao: boolean, idCartao: number) {
    await employeeRepository.atualizaStatusDoCartao(statusCartao, idCartao)
}

export async function verificaEstabelcimento(idEstabelecimento: number) {
    const estabelecimento = await employeeRepository.buscaEstabelecimento(idEstabelecimento)
    if (estabelecimento.length === 0) {
        throw { code: "NotFound", message: "Esse estabelecimento não está cadastrado" }
    }
    return estabelecimento
}

export async function verificaTipoDoCartao(tipoCartao: string, tipoEstabelecimento: string) {
    if (tipoCartao !== tipoEstabelecimento) {
        throw { code: "Unauthorized", message: "Esse estabelecimento não aceita esse tipo de cartão" }
    }
}

export async function verificaSaldoSuficiente(idCartao: number, saldoCompras: number) {
    const totalSaldoRecarga = await employeeRepository.calculaSaldoRecarga(idCartao)
    const totalSaldoCompras = await employeeRepository.calculaSaldoCompras(idCartao)

    if (totalSaldoCompras.montanteCompras === null) {
        calculaMontante(totalSaldoRecarga.montanteRecargas, saldoCompras, totalSaldoCompras.montanteCompras)

    } else {
        calculaMontante(totalSaldoRecarga.montanteRecargas, saldoCompras, totalSaldoCompras.montanteCompras)
    }
}

function calculaMontante(totalSaldoRecarga: number, saldoCompras: number, totalSaldoCompras: number | null) {

    if (Number(totalSaldoRecarga) < saldoCompras && totalSaldoCompras === null) {
        throw { code: "Unauthorized", message: "Saldo insuficiente" }

    } else if (Number(totalSaldoRecarga) < (saldoCompras + Number(totalSaldoCompras))) {
        throw { code: "Unauthorized", message: "Saldo insuficiente" }
    }
}

export async function efetuaCompra(idCartao: number, idNegocio: number, dataCompra: string, quantia: number) {
    await employeeRepository.insereCompra(idCartao, idNegocio, dataCompra, quantia)
}