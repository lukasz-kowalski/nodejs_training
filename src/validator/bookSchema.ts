import Joi from 'joi'

export const bookSchema = Joi.object({
  authors: Joi.array().min(1).required(),
  title: Joi.string().required(),
})
