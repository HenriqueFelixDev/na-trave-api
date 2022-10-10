import { TeamsService } from '../services/index.js'

const teamsService = new TeamsService()

export async function getTeams(ctx) {
    const teams = await teamsService.getTeams()

    const formattedTeams = teams.map(team => ({
        ...team,
        logo: `/flags/${team.logo}`
    }))
    
    ctx.body = formattedTeams
}