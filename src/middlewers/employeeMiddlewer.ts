import { Request, Response, NextFunction } from "express";
import { validaSenha, validaBlockUnLock } from "../schemas/employeeSchema";

export async function validarCorpoSenha(req: Request, res: Response, next: NextFunction) {
    const body = req.body
    const senha = (body.senha).toString()
    const codigoCvc = (body.codigoCvc).toString()
    const validou = validaSenha.validate(body)

    if (validou.error || senha.length > 4 || senha.length < 4 || codigoCvc.length > 3 || codigoCvc.length < 3) {
        return res.status(403).send("Todos os dados são obrigatórios e certifique-se que todos os dados estão corretos")
    }
    res.locals.body = body
    next()
}


export async function validarCorpoBlockUnlLock(req: Request, res: Response, next: NextFunction) {
    const body = req.body
    const senha = (body.senha).toString()
    const validou = validaBlockUnLock.validate(body)

    if (validou.error || senha.length > 4 || senha.length < 4) {
        return res.status(403).send("Todos os dados são obrigatórios e certifique-se que todos os dados estão corretos")
    }
    res.locals.body = body
    next()
}

