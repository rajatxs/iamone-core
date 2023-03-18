import * as express from 'express'
import type { Server } from 'http'
import { HOST, PORT } from '../config/env'
import routes from '../routes'
import cors from '../config/cors'
import log from '../utils/log'

var app: express.Express
var server: Server

/** Creates app instance with default config */
function prepareAppServer() {
   app = express()
   app.use(cors)
   app.use(routes)
}

/** Starts HTTP Web Server with default config */
export function startHttpServer(): Promise<void> {
   return new Promise(function (resolve, reject) {
      if (app && server) {
         return resolve()
      }

      prepareAppServer()
      server = app.listen(PORT, HOST)
      server.on('listening', function () {
         log.info('http:server', 'listening at %s:%d', HOST, PORT)
         resolve()
      })
      server.on('error', function (error) {
         log.error('http:server', error)
         reject(error)
      })
   })
}

/** Stops active HTTP Web Server */
export function stopHttpServer(): Promise<void> {
   return new Promise(function (resolve, reject) {
      if (!app || !server) {
         return resolve()
      }

      server.close(function (error) {
         if (error) {
            log.error('http:server', error)
            reject(error)
         } else {
            log.info('http:server', 'closed')
            server = null
            app = null
            resolve()
         }
      })
   })
}
