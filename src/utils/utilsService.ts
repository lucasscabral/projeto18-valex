import { calculaSaldoCompras, calculaSaldoRecarga } from "../repositories/employeeRepository";
import { buscaUsuario, buscaCartao } from "./utilsRepository";


export async function verificaExistenciaDeUsuario(idUsuario: number) {
    const { rows: usuario } = await buscaUsuario(idUsuario)
    if (usuario.length === 0) {
        throw { code: "NotFound", message: "Usuário não encontrado" }
    }
    return usuario
}

export async function verificaExistenciaDeCartao(idCartao: number) {
    const { rows: cartao } = await buscaCartao(idCartao)
    if (cartao.length === 0) {
        throw { code: "NotFound", message: "Cartão não encontrado" }
    }
    return cartao
}

export async function calculaMontanteDoCartao(idCartao: number) {
    const totalSaldoRecarga = await calculaSaldoRecarga(idCartao)
    const totalSaldoCompras = await calculaSaldoCompras(idCartao)

    const saldoTotal = Number(totalSaldoRecarga.montanteRecargas) - Number(totalSaldoCompras.montanteCompras)
    return saldoTotal
}