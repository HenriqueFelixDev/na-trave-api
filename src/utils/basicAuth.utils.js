import { InvalidBasicTokenError } from '../errors/invalidBasicTokenError.js'

export function decodeToken(authorizationValue) {
    if (!authorizationValue) {
        throw new InvalidBasicTokenError()
    }
    
    const [type, token] = authorizationValue.split(' ')
    
    if (!token) {
        throw new InvalidBasicTokenError()
    }

    const decodedToken = Buffer.from(token, 'base64').toString()
    const [email, password] = decodedToken.split(':')

    if (!email || !password) {
        throw new InvalidBasicTokenError()
    }

    return {
        email,
        password
    }
}