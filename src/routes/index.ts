/* eslint-disable linebreak-style */
import { Router } from 'express'

import serviceRoutes from './service.routes'
import mensageriaRoutes from './mensageria.routes'

import usersRoutes from './user.routes'

const routes = Router()

routes.use('/', serviceRoutes)
routes.use('/', mensageriaRoutes)

routes.use('/', usersRoutes)



export default routes