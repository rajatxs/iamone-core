import { mysql } from '../services/mysql.service'

export function resolveQuery<T>(query: string, params: any[], singleRow: boolean = false): Promise<T> {
   return new Promise((resolve, reject) => {
      mysql().query(query, params, (error, result) => {
         if (error) {
            reject(error)
         } else {
            if (Array.isArray(result) && singleRow) {
               resolve(result[0] as T)
            } else {
               resolve(result as T)
            }
         }
      })
   })
}
