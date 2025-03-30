import express from 'express'

const imageRoutes = (app: express.Express) => {
  app.get('/resize/:width/:height/:url', async () => {

  })
}

const basicRoutes = (app: express.Express) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}

export const addRoutes = (app: express.Express) => {
  imageRoutes(app)
  basicRoutes(app)
}
