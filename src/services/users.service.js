import { client } from '../database/prismaClient.js'

export class UsersService {
    createUser(user) {
        return client.user.create({
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
            }
        })
    }

    getUserByUsername(username) {
        return client.user.findUnique({
            where: { username }
        })
    }
    
    getUserByEmail(email) {
        return client.user.findUnique({
            where: { email }
        })
    }

    getUserById(id) {
        return client.user.findUnique({
            where: { id }
        })
    }
}