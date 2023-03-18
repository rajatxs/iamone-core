import { createConnection, Connection, ConnectionOptions } from 'mysql2'
import { ENV, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PSWD, MYSQL_DB } from '../config/env'
import log from '../utils/log'

var db: Connection

/** Returns MySQL Database instance */
export function mysql() {
   if (!db) {
      connectMySQLDatabase()
   }
   return db
}

/** Opens new connection with MySQL Database */
export function connectMySQLDatabase(showLog: boolean = false): Promise<void> {
   return new Promise(function (resolve, reject) {
      if (db) {
         return resolve()
      }

      const config: ConnectionOptions = {
         host: MYSQL_HOST,
         port: MYSQL_PORT,
         user: MYSQL_USER,
         password: MYSQL_PSWD,
         database: MYSQL_DB,
         multipleStatements: true,
      }

      // require ssl options for PlanetScale
      if (ENV === 'production') {
         config.ssl = {
            rejectUnauthorized: true,
         }
      }

      db = createConnection(config)
      db.on('connect', () => {
         if (showLog) {
            log.info('mysql', 'connected at %s:%d', MYSQL_HOST, MYSQL_PORT)
         }
         resolve()
      })
      db.on('error', function (error: Error) {
         if (showLog) {
            log.error('mysql', error)
         }
         reject(error)
      })
   })
}

/** Closes the active database connection */
export function disconnectMySQLDatabase(showLog: boolean = false): Promise<void> {
   return new Promise((resolve, reject) => {
      if (!db) {
         return resolve()
      }

      db.end((err) => {
         if (err) {
            if (showLog) {
               log.error('mysql', err)
            }
            return reject(err)
         }

         if (showLog) {
            log.info('mysql', 'disconnected')
         }

         db = null
         resolve()
      })
   })
}
