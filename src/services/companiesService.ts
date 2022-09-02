import * as companiesRepository from "../repositories/companiesRepository"

export async function buscarEmpresa(apiKey:string) {
    const { rows : existeEmpresa}: any = await companiesRepository.buscarApiKeyEmpresa(apiKey)
    console.log(existeEmpresa)
    if(existeEmpresa.length === 0){
        throw {code:"NotFound",message:"Essa ApiKey não existe"}
    }

    return existeEmpresa
}