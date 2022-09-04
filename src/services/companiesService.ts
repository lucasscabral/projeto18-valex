import * as companiesRepository from "../repositories/companiesRepository"
import { faker } from '@faker-js/faker';
import dayjs from "dayjs"
import Cryptr from "cryptr"

export async function buscarEmpresa(apiKey: string) {

    const { rows: existeEmpresa }: any = await companiesRepository.buscarApiKeyEmpresa(apiKey)

    if (existeEmpresa.length === 0) {
        throw { code: "NotFound", message: "Essa ApiKey não existe" }
    }

    return existeEmpresa
}

export async function buscarUsuario(idUsuario: number) {
    const { rows: existeUsuario }: any = await companiesRepository.buscarIdUsuario(idUsuario)

    if (existeUsuario.length === 0) {
        throw { code: "NotFound", message: "Esse usuário não existe" }
    }

    return existeUsuario[0]
}

export async function formatarNomeCartao(nome: string) {
    const nomeArray = nome.split(" ")
    const primeiroNome = nomeArray[0]
    const ultimoNome = nomeArray[nomeArray.length - 1]

    const formarNome = []

    for (let i = 1; i < nomeArray.length - 1; i++) {
        if (nomeArray[i].length > 3) {
            formarNome.push(nomeArray[i][0])
        }
    }
    formarNome.unshift(primeiroNome)
    formarNome.push(ultimoNome)

    return formarNome.join(" ").toUpperCase()
}

export async function formaNumeroCartaoFormatado() {
    const numeroCartaoRandom = faker.random.numeric(16);

    let numeroCartaoFormatado = numeroCartaoRandom.slice(0, 4) + " " + numeroCartaoRandom.slice(4, 8) + " " + numeroCartaoRandom.slice(8, 12) + " " + numeroCartaoRandom.slice(12, 16)
    return numeroCartaoFormatado
}

export async function geraDataDeValidade() {
    const dataAtual = dayjs().format("DD/MM/YYYY")
    const dataArray = dataAtual.split("/")
    const anoVencimento = Number(dataArray[2]) + 5
    const dataVencimento = `${dataArray[1]}/${anoVencimento.toString()}`

    return dataVencimento
}

export async function geraCodigoCvc() {
    const cryptr = new Cryptr('myTotallySecretKey');
    const codigoCvc = faker.random.numeric(3)

    const encryptedcodigoCvc = cryptr.encrypt(codigoCvc);

    return encryptedcodigoCvc
}

export async function verificaTipoDeCartao(idUsuario: number, tipoCartao: string) {
    const { rows: existeTipoDeCardDoUser } = await companiesRepository.existenciaDoTipoCartao(idUsuario, tipoCartao)

    if (existeTipoDeCardDoUser.length > 0) {
        throw { code: "Unauthorized", message: "Usuário não pode ter mais de um cartão de mesmo tipo" }
    }

    return existeTipoDeCardDoUser
}

export async function cadastraCartao(idUsuario: number, numeroCartao: string, nomeCartao: string, codigoCvc: string, dataVencimento: string, tipoCartao: string) {

    await companiesRepository.criaCartaoUsuario(idUsuario, numeroCartao, nomeCartao, codigoCvc, dataVencimento, tipoCartao)
}

export async function verificaCartaoCadastrado(senhaCadastrada: string | null) {
    if (senhaCadastrada === null) {
        throw { code: "Unauthorized", message: "Esse cartão não está ativado" }
    }
}

export async function efetuaRecarga(idCartao: number, dataRecarga: string, recarga: number) {
    await companiesRepository.insereRegarga(idCartao, dataRecarga, recarga)
}