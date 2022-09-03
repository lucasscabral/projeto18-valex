import connection from "../database/pg";


export async function buscaUsuario(idUsuario: number) {
    const usuarioEncontrado = await connection.query(`SELECT * FROM employees WHERE id = $1;`, [idUsuario])
    return usuarioEncontrado
}

export async function buscaCartao(idCartao: number) {
    const cartaoEncontrado = await connection.query(`SELECT * FROM cards WHERE id = $1;`, [idCartao])
    return cartaoEncontrado
}