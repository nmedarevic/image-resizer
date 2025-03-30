import express from 'express'

export const createServer = ({
  addRoutes,
  addStaticRoutes
}: {
  addRoutes: (app: express.Express) => void
  addStaticRoutes: (app: express.Express) => void
}) => {
  const app = express()
  const port = process.env.SERVER_PORT || 3000

  addRoutes(app)
  addStaticRoutes(app)

  return {app, port}
}