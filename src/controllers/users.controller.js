import { UserNotFoundError } from '../errors/index.js'
import { UsersService } from '../services/index.js'

const userService = new UsersService()

export async function getUser(ctx) {
    const userId = ctx.state.user.sub
    const user = await userService.getUserById(userId)

    if (!user)
        throw new UserNotFoundError()

    ctx.body = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        points: user.points,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}