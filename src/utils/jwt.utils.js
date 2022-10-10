import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export function sign(user, expiresIn = '7d') {
    const payload = {
        username: user.username,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, secret, {
        expiresIn,
        subject: user.id.toString()
    })
}

export function verifyToken(token) {
    return jwt.verify(token, secret)
}