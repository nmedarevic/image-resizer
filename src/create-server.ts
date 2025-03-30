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

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  return {app, port}
}