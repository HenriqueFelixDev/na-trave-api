import { BaseError } from '../errors/index.js'

export async function errorMiddleware(ctx, next) {
    try {
        await next()
    } catch (e) {
        if(e instanceof BaseError) {
            ctx.status = e.code
            ctx.body = {
                ...e,
                code: e.code,
                message: e.message,
            }
            return
        }

        // Erro lançado pelo Koa JWT
        if (e.status === 401) {
            throw e
        }

        console.error('Error: ' + e)

        ctx.status = 500
        ctx.body = e
    }
}