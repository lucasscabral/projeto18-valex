import validaCorpoCriacaoCard from "../schemas/companiesSchema"
import { Request, Response, NextFunction } from "express"

export async function checarRequisicaoCriacaoCard(req:Request,res:Response,next:NextFunction) {
    const {['x-api-key']: apiKey} = req.headers
    if(!apiKey){
        return res.status(403).send('Informe uma API KEY')
    }
    const body = req.body

    const validouCorpo = validaCorpoCriacaoCard.validate(body)

    if(validouCorpo.error){
        return res.status(403).send("Informe todos os dados")
    }
    console.log(apiKey)
    res.locals.body = body
    res.locals.apiKey = apiKey
    
    next()
}
