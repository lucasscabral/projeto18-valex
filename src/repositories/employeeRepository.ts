import connection from "../database/pg";


export async function buscarCartaoDoUsuario(idUsuario: number, idCartao: number) {
    const { rows: cartaoDoUsuario } = await connection.query(`SELECT * FROM cards WHERE "employeeId" = $1 AND id = $2`, [idUsuario, idCartao])
    return cartaoDoUsuario
}
export async function insereSenhaDoCartao(senha: string, idCartao: number) {
    await connection.query(`UPDATE cards SET password = $1 WHERE id = $2;`, [senha, idCartao])
}

export async function buscaTodasTransacoesDeCompras(idCartao: number) {
    const { rows: todasTransacoesDeCompras } = await connection.query(` SELECT ARRAY (select json_build_object('cardId',p2."cardId",'businessId',b.id ,'businessName',b."name",'timestamp',p2.timestamp,'amount',p2.amount)
    FROM payments p2 
    JOIN businesses b  
    ON b.id = p2."cardId"
    WHERE p2."cardId" = $1) as transactions;`, [idCartao])
    return todasTransacoesDeCompras[0]
}

export async function buscaTodasTransacoesDeRecargas(idCartao: number) {
    const { rows: todasTransacoesDeRecargas } = await connection.query(`SELECT ARRAY (SELECT json_build_object('cardId',r."cardId",'timestamp',r.timestamp,'amount',r.amount) AS client
    FROM recharges r WHERE r."cardId" = $1) as recharges;`, [idCartao])
    return todasTransacoesDeRecargas[0]
}

export async function atualizaStatusDoCartao(statusCartao: boolean, idCartao: number) {
    await connection.query(`UPDATE cards SET "isBlocked" = $1 WHERE id = $2;`, [statusCartao, idCartao])
}

export async function buscaEstabelecimento(idEstabelecimento: number) {
    const { rows: estabelecimento } = await connection.query(`SELECT * FROM businesses WHERE id = $1;`, [idEstabelecimento])
    return estabelecimento
}

export async function calculaSaldoRecarga(idCartao: number) {
    const { rows: saldoRecargas } = await connection.query(`SELECT SUM(amount) as "montanteRecargas" FROM recharges WHERE "cardId" = $1;`, [idCartao])
    return saldoRecargas[0]
}

export async function calculaSaldoCompras(idCartao: number) {
    const { rows: saldoCompras } = await connection.query(`SELECT SUM(amount) as "montanteCompras" FROM payments WHERE "cardId" = $1;`, [idCartao])
    return saldoCompras[0]
}

export async function insereCompra(idCartao: number, idNegocio: number, dataCompra: string, quantia: number) {
    await connection.query(`INSERT INTO payments("cardId", "businessId",timestamp,amount) VALUES($1,$2,$3,$4);`, [idCartao, idNegocio, dataCompra, quantia])
}