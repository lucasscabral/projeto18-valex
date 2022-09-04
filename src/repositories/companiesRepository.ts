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

export async function criaCartaoUsuario(idUsuario: number, numeroCartao: string, nomeCartao: string, codigoCvc: string, dataVencimento: string, tipoCartao: string) {
    await connection.query(`INSERT INTO cards("employeeId",number,"cardholderName","securityCode","expirationDate",type,"isVirtual","isBlocked") VALUES($1,$2,$3,$4,$5,$6,false,false)`, [idUsuario, numeroCartao, nomeCartao, codigoCvc, dataVencimento, tipoCartao])
}

export async function insereRegarga(idCartao: number, dataRecarga: string, recarga: number) {
    await connection.query(`INSERT INTO recharges("cardId",timestamp,amount) VALUES($1,$2,$3);`, [idCartao, dataRecarga, recarga])
}