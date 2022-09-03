import { buscarCartaoDoUsuario } from "../repositories/employeeRepository";
import { verificaExistenciaDeUsuario } from "../utils/utilsService";

export async function verificaCartaoDeUsuario(idUsuario: number, idCartao: number) {
    await verificaExistenciaDeUsuario(idUsuario)
    const cartaoDoUsuario = await buscarCartaoDoUsuario(idUsuario, idCartao)
    if (cartaoDoUsuario.length === 0) {
        throw { code: "NotFound", message: "Esse cartão não pertence a esse usuário" }
    }
}