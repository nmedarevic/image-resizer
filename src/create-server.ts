import express from 'express'

export const createServer = ({
  addRoutes,
}: {
  addRoutes: (app: express.Express) => void
}) => {
  const app = express()
  const port = process.env.SERVER_PORT || 3000

  addRoutes(app)

  return {app, port}
}