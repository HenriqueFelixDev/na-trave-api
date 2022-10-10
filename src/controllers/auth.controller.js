import { UsersService } from '../services/index.js'
import { jwtUtils, cryptUtils, basicAuthUtils } from '../utils/index.js'
import { UserNotFoundError } from '../errors/index.js'

const userService = new UsersService()

export async function signUp(ctx) {
    const bodyParams = ctx.request.body

    const encryptedPassword = 
        await cryptUtils.hashPassword(bodyParams.password)

    const user = {
        name: bodyParams.name,
        username: bodyParams.username,
        email: bodyParams.email,
        password: encryptedPassword
    }
    
    const createdUser = await userService.createUser(user)

    const token = jwtUtils.sign(createdUser)

    ctx.body = { token }
}

export async function login(ctx) {
    const {
        email,
        password: plainTextPassword
    } = basicAuthUtils.decodeToken(ctx.headers.authorization)

    const user = await userService.getUserByEmail(email)

    if (!user) {
        throw new UserNotFoundError()
    }

    const passwordMatch = 
        await cryptUtils.comparePassword(plainTextPassword, user.password)

    if (!passwordMatch) {
        throw new UserNotFoundError()
    }

    const token = jwtUtils.sign(user)

    ctx.body = { token }
}