import connection from "../database/pg";


export async function buscarCartaoDoUsuario(idUsuario: number, idCartao: number) {
    const { rows: cartaoDoUsuario } = await connection.query(`SELECT * FROM cards WHERE "employeeId" = $1 AND id = $2`, [idUsuario, idCartao])

    return cartaoDoUsuario
}