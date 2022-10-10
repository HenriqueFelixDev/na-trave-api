import { HunchAfterMatchStartError, UserNotFoundError } from '../errors/index.js'
import { HunchesService, MatchesService, UsersService } from '../services/index.js'
import { dateUtils } from '../utils/index.js'

const hunchesService = new HunchesService()
const matchesService = new MatchesService()
const usersService = new UsersService()

export async function createOrUpdateHunch(ctx) {
    const userId = ctx.state.user.sub

    const {
        matchId,
        homeTeamScore,
        awayTeamScore
    } = ctx.request.body

    const match = await matchesService.getMatchById(matchId)

    if (dateUtils.dateIsBeforeNow(match.datetime)) {
        throw new HunchAfterMatchStartError()
    }

    const result = await hunchesService.createOrUpdateHunch(
        userId,
        Number(matchId),
        homeTeamScore,
        awayTeamScore
    )

    ctx.status = 200
}

export async function getHunches(ctx) {
    const { username } = ctx.request.params

    const user = await usersService.getUserByUsername(username)

    if (!user) {
        throw new UserNotFoundError()
    }

    const { date } = ctx.request.query
    const { startDate, endDate } = dateUtils.getStartAndEndDateOfDay(date)

    const hunches = await hunchesService.getHunches(username, startDate, endDate)
    
    ctx.body = {
        username: user.username,
        hunches: hunches.map(hunch => ({
            matchId: hunch.matchId,
            homeTeamScore: hunch.homeTeamScore,
            awayTeamScore: hunch.awayTeamScore,
            won: hunch.won
        }))
    }
}