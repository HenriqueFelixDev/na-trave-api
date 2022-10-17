import { client } from '../database/prismaClient.js'

export class LeaderboardService {
    getLeaderboard() {
        return client.user.findMany({
            include: {
                hunches: {
                    where: {
                        won: { not: null }
                    }
                }
            }
        })
    }
}