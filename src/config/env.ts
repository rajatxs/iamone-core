export const ENV = process.env.NODE_ENV || 'development'

export const HOST = process.env.IAMONE_HOST || '127.0.0.1'
export const PORT = Number(process.env.IAMONE_PORT) || 5000

export const MYSQL_HOST = process.env.IAMONE_MYSQL_HOST
export const MYSQL_PORT = Number(process.env.IAMONE_MYSQL_PORT)
export const MYSQL_USER = process.env.IAMONE_MYSQL_USER
export const MYSQL_PSWD = process.env.IAMONE_MYSQL_PSWD
export const MYSQL_DB = process.env.IAMONE_MYSQL_DB
