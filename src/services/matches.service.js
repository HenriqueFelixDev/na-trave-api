import { client } from '../database/prismaClient.js'

export class MatchesService {
    getMatches(minDate, maxDate) {
        return client.match.findMany({
            where: {
                datetime: {
                    lte: maxDate,
                    gte: minDate
                }
            },
            include: {
                homeTeam: true,
                awayTeam: true
            }
        })
    }

    getMatchById(id) {
        return client.match.findUnique({
            where: { id }
        })
    }

    updateMatchScores(id, homeTeamScore, awayTeamScore) {
        return client.match.update({
            data: {
                homeTeamScore,
                awayTeamScore
            },
            where: { id }
        })
    }
}