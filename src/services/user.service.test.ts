import * as assert from 'assert'
import { connectMySQLDatabase, disconnectMySQLDatabase } from '../services/mysql.service'
import { createUser, getUserById } from './user.service'

const rand = Math.floor(Math.random() * 10e4)

var userId = NaN
var username = `rxx_${rand}`
var email = `rxx_${rand}@example.com`
var password_hash = '32ref8h3882ejfijffej89jmqkm'

describe('User Service', function () {
   this.beforeAll((done) => {
      connectMySQLDatabase().then(done)
   })

   this.afterAll((done) => {
      disconnectMySQLDatabase().finally(done)
   })

   it('should create new user', async () => {
      const result = await createUser({
         username,
         email,
         password_hash,
      })

      assert.ok(result.insertId > 0, 'incorrect userId inserted')
      assert.equal(result.affectedRows, 1, 'more rows are affected')

      userId = result.insertId
   })

   it('should reject to inserting duplicate username', async () => {
      try {
         await createUser({
            username,
            email: `user_${rand * 2}@example.com`,
            password_hash,
         })
         assert.fail('allow to add duplicate username')
      } catch (error) {
         assert.strictEqual(error.code, 'ER_DUP_ENTRY', 'not rejected duplicate username')
      }
   })

   it('should reject to inserting duplicate email', async () => {
      try {
         await createUser({
            username: `user_${rand * 3}`,
            email,
            password_hash,
         })
         assert.fail('allow to add duplicate email')
      } catch (error) {
         assert.strictEqual(error.code, 'ER_DUP_ENTRY', 'not rejected duplicate email')
      }
   })

   it('should return user record by given id', async () => {
      const user = await getUserById(userId)

      assert.ok(user, 'user not found')
      assert.strictEqual(user.active, true, 'user account should be enabled by default')
      assert.strictEqual(user.username, username, 'username is different')
      assert.strictEqual(user.email, email, 'email is different')
      assert.strictEqual(user.fullname, '', 'fullname should be empty by default')
      assert.strictEqual(user.bio, '', 'bio should be empty by default')
      assert.strictEqual(user.bod, '', 'bod should be empty by default')
      assert.strictEqual(user.passwordHash, password_hash, 'password_hash is different')
      assert.strictEqual(user.emailVerified, false, 'email should not verified by default')
      assert.strictEqual(user.imageUrl, '', 'image_url should be empty by default')

      assert.ok(user.createdAt, 'createdAt is empty')
      assert.ok(user.createdAt instanceof Date, 'invalid data type of createdAt')

      assert.ok(user.updatedAt, 'updatedAt is empty')
      assert.ok(user.updatedAt instanceof Date, 'invalid data type of updatedAt')

      assert.equal(user.createdAt.getTime(), user.updatedAt.getTime(), 'createdAt and updatedAt should be same')
   })
})
