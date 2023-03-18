import * as cors from 'cors'

export default cors({
   origin: '*',
   methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
   allowedHeaders: [
      'Authorization',
      'Content-Type',
      'X-Request-Id',
      'X-Request-Timestamp',
   ],
})
