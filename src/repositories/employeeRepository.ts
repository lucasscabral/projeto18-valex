import connection from "../database/pg";


export async function buscarCartaoDoUsuario(idUsuario: number, idCartao: number) {
    const { rows: cartaoDoUsuario } = await connection.query(`SELECT * FROM cards WHERE "employeeId" = $1 AND id = $2`, [idUsuario, idCartao])

    return cartaoDoUsuario
}
export async function insereSenhaDoCartao(senha: string) {
    await connection.query(`UPDATE cards SET password = $1;`, [senha])
}

export async function buscaTodasTransacoes(idCartao: number) {
    const { rows: todasTransacoes } = await connection.query(``)
    return todasTransacoes
}