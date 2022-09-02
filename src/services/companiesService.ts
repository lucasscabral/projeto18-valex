import * as companiesRepository from "../repositories/companiesRepository"

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

    return existeUsuario
}