import { debug } from "console";
import { createServer } from "./create-server";
import { addRoutes } from "./routes";
import { staticRoute } from "./routes/static.route";

const {app, port} = createServer({
  addRoutes,
  addStaticRoutes: staticRoute
})

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Open http://localhost:${port} to start!`) 
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')

  server.close(() => {
    debug('HTTP server closed')
  })
})