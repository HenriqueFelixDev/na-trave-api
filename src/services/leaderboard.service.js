import fs from 'fs/promises'
import { resolve } from 'path'

import { client } from '../database/prismaClient.js'

export class LeaderboardService {
    async getLeaderboard() {
        return client.$queryRaw`
            SELECT
                User.id as user_id,
                User.name as user_name,
                User.username as user_username,
                (
                    SELECT COUNT(Hunch.id)
                    FROM Hunch
                    WHERE Hunch.userId = User.id AND Hunch.won is not null
                ) as hunches,
                (
                    SELECT COUNT(Hunch.id)
                    FROM Hunch
                    WHERE Hunch.userId = User.id AND Hunch.won = true
                ) as points
            FROM User
            ORDER BY points DESC;
        `
    }

    createLeaderboardCache(leaderboard) {
        const path = resolve('public', 'leaderboard.json')
        return fs.writeFile(path, JSON.stringify(leaderboard))
    }
}