import connection from "../database/pg";

export async function buscarApiKeyEmpresa(apiKey:string) {
   const existeApiKeyEmpresa =  connection.query(`SELECT * FROM companies WHERE "apiKey" = $1`,[apiKey])
   return existeApiKeyEmpresa;
}