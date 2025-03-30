import express from 'express'
import imageRoutes from './routes/image.route'
import basicRoutes from './routes/basic.route'

export const addRoutes = (app: express.Express) => {
  app.use(imageRoutes)
  app.use(basicRoutes)
}
