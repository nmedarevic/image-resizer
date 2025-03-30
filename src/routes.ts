import express from 'express'
import imageRoutes from './routes/image.route'

export const addRoutes = (app: express.Express) => {
  app.use(imageRoutes)
}
