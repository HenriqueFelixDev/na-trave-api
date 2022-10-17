import { client } from '../database/prismaClient.js'

export class LeaderboardService {
    getLeaderboard() {
        return client.$queryRaw`
            SELECT User.name, User.username, 
                (
                    SELECT COUNT(*) FROM Hunch 
                    WHERE won = true AND userId = User.id
                ) as points,
                (
                    SELECT COUNT(*) FROM Hunch 
                    WHERE won is not null AND userId = User.id
                ) as hunches 
            FROM User 
            ORDER BY points DESC
        `
    }
}