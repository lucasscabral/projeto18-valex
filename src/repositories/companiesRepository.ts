import connection from "../database/pg";

export async function buscarApiKeyEmpresa(apiKey: string) {
    const existeApiKeyEmpresa = await connection.query(`SELECT * FROM companies WHERE "apiKey" = $1`, [apiKey])
    return existeApiKeyEmpresa;
}
export async function buscarIdUsuario(idUsuario: number) {
    const existeUsuario = await connection.query(`SELECT * FROM employees WHERE  id = $1`, [idUsuario])
    return existeUsuario;
}

export async function existenciaDoTipoCartao(idUsuario: number, tipoCartao: string) {
    const usuarioObtemTipoDeCard = await connection.query(`SELECT * FROM cards WHERE "employeeId" = $1 AND type = $2`, [idUsuario, tipoCartao])
    return usuarioObtemTipoDeCard;
}