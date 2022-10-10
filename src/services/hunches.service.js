import { client } from '../database/prismaClient.js'

export class HunchesService {
    getHunches(username, minDate, maxDate) {
        return client.hunch.findMany({
            where: {
                user: { username },
                match: {
                    datetime: {
                        lte: maxDate,
                        gte: minDate
                    }
                }
            },

        })
    }
    
    getUserMatchHunches(userId, matchId) {
        return client.hunch.findFirst({
            where: {
                matchId,
                userId
            }
        })
    }

    async createOrUpdateHunch(userId, matchId, homeTeamScore, awayTeamScore) {
        const hunch = await this.getUserMatchHunches(userId, matchId)

        if (!hunch) {
            return this.createHunch(
                userId, matchId, homeTeamScore, awayTeamScore
            )
        }

        return this.updateHunch(
            hunch.id, homeTeamScore, awayTeamScore
        )
    }

    createHunch(userId, matchId, homeTeamScore, awayTeamScore) {
        return client.hunch.create({
            data: {
                userId,
                matchId,
                homeTeamScore,
                awayTeamScore
            }
        })
    }

    updateHunch(id, homeTeamScore, awayTeamScore) {
        return client.hunch.update({
            data: {
                homeTeamScore,
                awayTeamScore
            },
            where: { id }
        })
    }

    updateWonHunches(matchId, homeTeamScore, awayTeamScore) {
        return client.hunch.updateMany({
            data: {
                won: true
            },
            where: {
                AND: {
                    matchId,
                    homeTeamScore,
                    awayTeamScore,
                }
            }
        })
    }

    updateLoseHunches(matchId, homeTeamScore, awayTeamScore) {
        return client.hunch.updateMany({
            data: {
                won: false
            },
            where: {
                matchId,
                OR: [
                    {
                        homeTeamScore: { not: homeTeamScore }
                    },
                    {
                        awayTeamScore: { not: awayTeamScore }
                    }
                ]
            }
        })
    }
}