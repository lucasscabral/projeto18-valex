import joi from "joi";

const validaSenha = joi.object({
    idCartao: joi.number().min(0).required(),
    codigoCvc: joi.number().min(3).required(),
    senha: joi.number().min(4).required()
})

const validaBlockUnLock = joi.object({
    idUsuario: joi.number().min(0).required(),
    senha: joi.number().min(4).required()
})


export { validaSenha, validaBlockUnLock }