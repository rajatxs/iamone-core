import { ResultSetHeader } from 'mysql2'
import { resolveQuery } from '../utils/mysql'
import { UserRecord, User } from '../types/user'

export function createUser(
   data: Pick<UserRecord, 'username' | 'email' | 'password_hash'>
): Promise<ResultSetHeader> {
   return resolveQuery<ResultSetHeader>(
      'INSERT INTO `users` (username, email, password_hash) VALUES (?, ?, ?);',
      [data.username, data.email, data.password_hash]
   )
}

export async function getUserById(id: number): Promise<User | null> {
   const record = await resolveQuery<Readonly<UserRecord>>(
      'SELECT * FROM `users` WHERE id = ?;',
      [id],
      true
   )

   if (!record) {
      return null
   }

   const user: User = {
      id: record.id,
      active: Boolean(record.active),
      username: record.username,
      email: record.email,
      fullname: record.fullname || '',
      bio: record.bio || '',
      bod: record.bod || '',
      location: record.location || '',
      passwordHash: record.password_hash,
      emailVerified: Boolean(record.email_verified),
      imageUrl: record.image_url || '',
      createdAt: record.created_at,
      updatedAt: record.updated_at,
   }

   return user
}

export function existsUserById() {
   
}
