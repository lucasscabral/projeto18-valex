import { validaCorpoCriacaoCard, validaCorpoRecarga } from "../schemas/companiesSchema"
import { Request, Response, NextFunction } from "express"

export async function checaCorpoDeCriacaoCard(req: Request, res: Response, next: NextFunction) {
    const { ['x-api-key']: apiKey } = req.headers
    if (!apiKey) {
        return res.status(403).send('Informe uma API KEY')
    }
    const tipoCartao: string = req.body.typeCard

    const validouCorpo = validaCorpoCriacaoCard.validate({ typeCard: tipoCartao })

    if (validouCorpo.error) {
        return res.status(403).send("Informe todos os dados")
    }

    if (!checaTipoDoCartao(tipoCartao)) {
        return res.status(403).send("O Tipo do cartão deve ser válido")
    }

    res.locals.tipoCartao = tipoCartao
    res.locals.apiKey = apiKey

    next()
}

function checaTipoDoCartao(tipoCartao: string): boolean {
    let checado = false
    if ((tipoCartao === 'groceries') || (tipoCartao === 'restaurant') || (tipoCartao === 'transport') || (tipoCartao === 'education') || (tipoCartao === 'health')) {
        checado = true
        return checado
    }
    return checado
}

export async function checaCorpoRecarga(req: Request, res: Response, next: NextFunction) {
    const { ['x-api-key']: apiKey } = req.headers
    const body = req.body

    if (!apiKey) {
        return res.status(403).send('Informe uma API KEY')
    }

    const validouCorpo = validaCorpoRecarga.validate(body)
    if (validouCorpo.error) {
        return res.status(403).send("Verifique todos os dados")
    }

    res.locals.body = body
    next()
}

