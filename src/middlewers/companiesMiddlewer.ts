import validaCorpoCriacaoCard from "../schemas/companiesSchema"
import { Request, Response, NextFunction } from "express"

export async function checarRequisicaoCriacaoCard(req: Request, res: Response, next: NextFunction) {
    const { ['x-api-key']: apiKey } = req.headers
    if (!apiKey) {
        return res.status(403).send('Informe uma API KEY')
    }
    const tipoCartao: string = req.body.typeCard

    const validouCorpo = validaCorpoCriacaoCard.validate({ typeCard: tipoCartao })

    if (validouCorpo.error) {
        return res.status(403).send("Informe todos os dados")
    }

    if (!checaTipoDoCArtao(tipoCartao)) {
        return res.status(403).send("O Tipo do cartão deve ser válido")
    }

    res.locals.tipoCartao = tipoCartao
    res.locals.apiKey = apiKey

    next()
}

function checaTipoDoCArtao(tipoCartao: string): boolean {
    let checado = false
    if ((tipoCartao === 'groceries') || (tipoCartao === 'restaurant') || (tipoCartao === 'transport') || (tipoCartao === 'education') || (tipoCartao === 'health')) {
        checado = true
        return checado
    }
    return checado
}