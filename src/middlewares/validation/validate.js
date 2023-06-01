import Joi from "joi";


export const validate = (schema, typeSchema = 'body') => {
    return (req, res, next) => {
        try{
           let validation = schema.validate(req[typeSchema])
           if(validation.error){
              req.validationError = validation.error
           }
           next()
        } catch(err) {
            next(err)
        }
    }
}
