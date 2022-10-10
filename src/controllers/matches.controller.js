import { client } from '../database/prismaClient.js'

import { dateUtils } from '../utils/index.js'
import { HunchesService, MatchesService, LeaderboardService } from '../services/index.js'

const matchesService = new MatchesService()
const hunchesService = new HunchesService()
const leaderboardService = new LeaderboardService()

export async function getMatches(ctx) {
    const { date } = ctx.query

    const { startDate, endDate } = dateUtils.getStartAndEndDateOfDay(date)

    const matches = await matchesService.getMatches(startDate, endDate)

    ctx.body = matches
}

export async function updateMatchScore(ctx) {
    const { id, homeTeamScore, awayTeamScore } = ctx.request.body

    const result = await client.$transaction([
        matchesService.updateMatchScores(id, homeTeamScore, awayTeamScore),
        hunchesService.updateWonHunches(id, homeTeamScore, awayTeamScore),
        hunchesService.updateLoseHunches(id, homeTeamScore, awayTeamScore)
    ])

    const leaderboardResult = await leaderboardService.getLeaderboard()
    const leaderboard = formatLeaderboardResult(leaderboardResult)
    await leaderboardService.createLeaderboardCache(leaderboard)

    ctx.status = 204
}

function formatLeaderboardResult(leaderboardResult) {
    return leaderboardResult.map((score, index) => {
        // Converte o BigInt retornado do banco de dados
        // para Int
        const hunches = parseInt(score.hunches)
        const points = parseInt(score.points)

        // Caso o dividendo (hunches) seja 0, retorna 0 para evitar
        // o erro de divisão por zero (não é possível dividir um número
        // por zero). Caso contrário, retorna o percentual de acerto
        // do usuário
        const performance = hunches > 0 && points > 0
            ? parseFloat((points / hunches).toFixed(2))
            : 0

        return {
            position: index + 1,
            user: {
                name: score.user_name,
                username: score.user_username,
            },
            hunches,
            points, 
            performance
        }
    })
}