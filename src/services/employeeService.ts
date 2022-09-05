import { buscarCartaoDoUsuario, insereSenhaDoCartao, buscaTodasTransacoes, atualizaStatusDoCartao, buscaEstabelecimento } from "../repositories/employeeRepository";
import { verificaExistenciaDeUsuario } from "../utils/utilsService";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt"

export async function verificaCartaoDeUsuario(idUsuario: number, idCartao: number) {
    await verificaExistenciaDeUsuario(idUsuario)
    const cartaoDoUsuario = await buscarCartaoDoUsuario(idUsuario, idCartao)
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
    console.log(descryptaCvcCadastrado)
    if (cvcConvertido !== Number(descryptaCvcCadastrado)) {
        throw { code: "Unauthorized", message: "Esse código CVC não pertence a esse cartão" }
    }
}

export async function ativacaoDeCartao(senha: number, idCartao: number) {
    const senhaEncryptografada: string = bcrypt.hashSync(senha.toString(), 10)
    await insereSenhaDoCartao(senhaEncryptografada, idCartao)
}

export async function pegaTodasTransacoes(idCartao: number) {
    const todasTransacoes = await buscaTodasTransacoes(idCartao)
    return todasTransacoes
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
    await atualizaStatusDoCartao(statusCartao, idCartao)
}

export async function verificaEstabelcimento(idEstabelecimento: number) {
    const estabelecimento = await buscaEstabelecimento(idEstabelecimento)
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