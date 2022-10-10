import { BaseError } from './baseError.js'

export class InvalidBasicTokenError extends BaseError {
    constructor() {
        super(400, 'O basic token com e-mail e senha é inválido')
    }
}