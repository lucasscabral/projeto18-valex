import { buscarCartaoDoUsuario, insereSenhaDoCartao, buscaTodasTransacoes } from "../repositories/employeeRepository";
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
    if (converteDataAtual >= dataExpiracaoCartao) {
        throw { code: "Unauthorized", message: "Esse cartão ja expirou" }
    }
}

export async function verificaCartaoCadastrado(senhaCadastrada: string | null) {
    if (senhaCadastrada !== null) {
        throw { code: "Unauthorized", message: "Esse cartão já está ativado" }
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

export async function ativacaoDeCartao(senha: number) {
    const senhaEncryptografada: string = bcrypt.hashSync(senha.toString(), 10)
    await insereSenhaDoCartao(senhaEncryptografada)
}

export async function pegaTodasTransacoes(idCartao: number) {
    const todasTransacoes = await buscaTodasTransacoes(idCartao)
    return todasTransacoes
}