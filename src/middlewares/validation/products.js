import Joi from "joi";


export const productSchema = Joi.object({
    name: Joi.string().required().min(2),
    price: Joi.number().min(0),
    imgUrl: Joi.string().required(),
    category: Joi.number().required()
})

export const productByCategory = Joi.object({
    id: Joi.number().required()
})