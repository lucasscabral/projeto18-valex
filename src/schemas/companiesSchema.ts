import joi from "joi"

const validaCorpoCriacaoCard = joi.object({
    typeCard: joi.string().required()
})

const validaCorpoRecarga = joi.object({
    cardId: joi.number().min(0).required(),
    amount: joi.number().integer().min(0).required()
})


export { validaCorpoCriacaoCard, validaCorpoRecarga }