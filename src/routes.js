import Router from 'koa-router'
import jwt from 'koa-jwt'

import {
    validationMiddleware,
    roleMiddleware
} from './middlewares/index.js'

import {
    commonValidator,
    hunchValidator,
    userValidator
} from './validators/index.js'

import {
    authController,
    hunchesController,
    leaderboardController,
    matchesController,
    teamsController,
    usersController
} from './controllers/index.js'

export const router = new Router()

// Auth
router.post(
    '/v1/auth/signup',
    validationMiddleware(userValidator.userCreated),
    authController.signUp
)

router.get(
    '/v1/auth/login',
    authController.login
)

// Hunches (não autenticado)
router.get(
    '/v1/hunches/:username',
    validationMiddleware({date: commonValidator.validateDate()}, 'query'),
    hunchesController.getHunches
)

// Matches (não autenticado)
router.get(
    '/v1/matches',
    validationMiddleware({date: commonValidator.validateDate()}, 'query'),
    matchesController.getMatches
)

// Rotas declaradas abaixo deste middleware precisarão 
// de um token JWT válido para serem acessadas
router.use(jwt({ secret: process.env.JWT_SECRET }))

// Hunches
router.post(
    '/v1/hunches',
    validationMiddleware(hunchValidator.hunchCreated),
    hunchesController.createOrUpdateHunch
)

// Matches
router.patch(
    '/v1/matches',
    roleMiddleware(['admin']),
    matchesController.updateMatchScore
)

// Leaderboard
router.get(
    '/v1/leaderboard',
    leaderboardController.getLeaderboard
)

// Teams
router.get(
    '/v1/teams',
    teamsController.getTeams
)

// Users
router.get('/v1/me', usersController.getUser)