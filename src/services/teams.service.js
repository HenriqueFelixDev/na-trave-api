import { client } from '../database/prismaClient.js'

export class TeamsService {
    async getTeams() {
        return client.team.findMany()
    }
}