import joi from "joi"

const validaCorpoCriacaoCard = joi.object({
    typeCard: joi.string().required()
})


export default validaCorpoCriacaoCard