import { startHttpServer, stopHttpServer } from '../services/http.service'
import { connectMySQLDatabase, disconnectMySQLDatabase } from '../services/mysql.service'
import log from '../utils/log'

async function terminate(): Promise<void> {
   try {
      await disconnectMySQLDatabase(true)
      await stopHttpServer()
      process.exit(0)
   } catch (error) {
      log.error('app', error)
      process.exit(1)
   }
}

;(async function (): Promise<void> {
   await connectMySQLDatabase(true)
   await startHttpServer()

   process.on('SIGINT', terminate)
   process.on('SIGTERM', terminate)
})()
