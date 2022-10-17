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

    ctx.status = 204
}