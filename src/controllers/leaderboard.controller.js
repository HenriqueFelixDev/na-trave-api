import { numberUtils } from '../utils/index.js'
import { LeaderboardService } from '../services/index.js'

const leaderboardService = new LeaderboardService()

export async function getLeaderboard(ctx) {
    const leaderboardResult = await leaderboardService.getLeaderboard()
    const leaderboard = formatLeaderboardResult(leaderboardResult)

    ctx.body = leaderboard
}

function formatLeaderboardResult(leaderboardResult) {
    return leaderboardResult.map((score, index) => {
        const {
            name,
            username,
            hunches
        } = score

        // Posição do usuário no ranking
        const position = index + 1

        // Número de palpites em que o usuário acertou
        const points = hunches
            .filter(hunch => hunch.won === true)
            .length

        // Número de palpites que o usuário realizou (e que o 
        // resultado da partida já foi salvo)
        const totalHunches = hunches.length

        // Percentual de acerto do usuário
        const performance = numberUtils.getPercentual(points, totalHunches)

        return {
            position,
            user: { name, username },
            points, 
            hunches: totalHunches,
            performance
        }
    })
}