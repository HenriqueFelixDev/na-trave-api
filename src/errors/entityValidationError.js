import { BaseError } from './baseError.js'

export class EntityValidationError extends BaseError {
    constructor(errors) {
        super(400, 'Existe(m) campo(s) com valor(es) inválido(s)')
        this.errors = errors
    }
}