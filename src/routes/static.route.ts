import express from 'express'
import path from 'path'

export const staticRoute = (app: express.Express) => {
  app.use('/', express.static(path.join(__dirname, "../../public")))
}