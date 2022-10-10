import { BaseError } from './baseError.js'

export class UserNotFoundError extends BaseError {
    constructor() {
        super(404, 'Usuário não encontrado')
    }
}