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
        const { name, username } = score

        // Posição do usuário na classificação
        const position = index + 1

        // Converte os valores em bigint para int
        const hunches = parseInt(score.hunches)
        const points = parseInt(score.points)

        // Percentual de acerto do usuário
        const performance = numberUtils.getPercentual(points, hunches)

        return {
            position,
            user: { name, username },
            points, 
            hunches,
            performance
        }
    })
}