export interface UserRecord {
   id: number
   active?: number
   username: string
   email: string
   fullname?: string | null
   bio?: string | null
   bod?: string | null
   location?: string | null
   password_hash: string
   email_verified?: number
   image_url?: string | null
   created_at?: Date
   updated_at?: Date
}

export interface User {
   id: number
   active?: boolean
   username: string
   email: string
   fullname?: string
   bio?: string
   bod?: string
   location?: string
   passwordHash: string
   emailVerified?: boolean
   imageUrl?: string
   createdAt?: Date
   updatedAt?: Date
}
