let users
let sessions
let snake

class UsersDAO {
  
  static async injectDB(conn) {
    // if (users && sessions) {
    //   return
    // }
    try {
        snake = await conn.db('snake')
        users = snake.collection("users")
        sessions = snake.collection("sessions")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getUser(email) {
    // TODO Ticket: User Management
    // Retrieve the user document corresponding with the user's email.
    
    try {

      return await users.findOne({ email: email })
    } catch(e) {
      console.log(e)
    }
  }

  static async addUser(userInfo) {
    /**
    Ticket: Durable Writes
    Please increase the durability of this method by using a non-default write
    concern with ``insertOne``.
    */

    try {
      // TODO Ticket: User Management
      // Insert a user with the "name", "email", and "password" fields.
      // TODO Ticket: Durable Writes
      // Use a more durable Write Concern for this operation.
      await users.insertOne(
        {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password
        }, {
          w: `majority`,
        }
      )
      return { success: true }
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A user with the given email already exists." }
      }
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }

  static async loginUser(email, jwt) {
    try {
      await sessions.updateOne(
        { user_id: email },
        {
          $set: {
            user_id: email,
            jwt: jwt,
          },
        },
        { upsert: true },
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      return { error: e }
    }
  }

  static async logoutUser(email) {

    try {
      // TODO Ticket: User Management
      // Delete the document in the `sessions` collection matching the email.
      await sessions.deleteOne({ user_id: email })
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging out user, ${e}`)
      return { error: e }
    }
  }

  static async makeAdmin(email) {

    try {
      const updateResponse = users.updateOne(
        { email },
        { $set: { isAdmin: true } },
      )
      return updateResponse
    } catch (e) {
      return { error: e }
    }
  }
  static async checkAdmin(email) {
    try {
      const { isAdmin } = await this.getUser(email)
      return isAdmin || false
    } catch (e) {
      return { error: e }
    }
  }
}

module.exports = UsersDAO;