import { BaseError } from './baseError.js'

export class UnauthorizedError extends BaseError {
    constructor() {
        super(403, 'Sem permissão para acessar o recurso')
    }
}