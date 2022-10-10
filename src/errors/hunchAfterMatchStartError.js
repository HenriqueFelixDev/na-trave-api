import { BaseError } from './baseError.js'

export class HunchAfterMatchStartError extends BaseError {
    constructor() {
        super(400, 'Não é possível enviar um palpite após a data de início da partida')
    }
}