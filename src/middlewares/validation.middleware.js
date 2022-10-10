import yup from 'yup'

import { EntityValidationError } from '../errors/index.js'
import { yupUtils } from '../utils/index.js'

export function validationMiddleware(validationSchema, datasource = 'body') {
    return async function(ctx, next) {
        try {
            const entity = ctx.request[datasource]

            const validator = yup.object().shape(validationSchema)
            await validator.validate(entity, { abortEarly: false })
            
            await next()
        } catch (e) {
            if(e instanceof yup.ValidationError) {
                const errors = yupUtils.formatErrors(e)
                throw new EntityValidationError(errors)
            }

            throw e
        }
    }
}