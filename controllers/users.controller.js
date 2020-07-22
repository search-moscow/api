var User = require('../models/user');
var UsersDAO = require('../dao/users.dao');
var bcrypt = require("bcryptjs");
const hashPassword = async password => await bcrypt.hash(password, 10)

class UserController {
    static async register(req, res) {
      try {
        const userFromBody = req.body
        let errors = {}
        if (userFromBody && userFromBody.password.length < 8) {
          errors.password = "Your password must be at least 8 characters."
        }
        if (userFromBody && userFromBody.name.length < 3) {
          errors.name = "You must specify a name of at least 3 characters."
        }
  
        if (Object.keys(errors).length > 0) {
          res.status(400).json(errors)
          return
        }
  
        const userInfo = {
          ...userFromBody,
          password: await hashPassword(userFromBody.password),
        }
        const insertResult = await UsersDAO.addUser(userInfo)
        
        if (!insertResult.success) {
          errors.email = insertResult.error
        }
        const userFromDB = await UsersDAO.getUser(userFromBody.email)
        if (!userFromDB) {
          errors.general = "Internal error, please try again later"
        }
  
        if (Object.keys(errors).length > 0) {
          res.status(400).json(errors)
          return
        }
  
        const user = new User(userFromDB)
  
        res.json({
          auth_token: user.encoded(),
          info: user.toJson(),
        })
      } catch (e) {
        res.status(500).json({ error: e })
      }
    }
  
  
    static async login(req, res, next) {
      try {
        const { email, password } = req.body
        if (!email || typeof email !== "string") {
          res.status(400).json({ error: "Bad email format, expected string." })
          return
        }
        if (!password || typeof password !== "string") {
          res.status(400).json({ error: "Bad password format, expected string." })
          return
        }
        let userData = await UsersDAO.getUser(email)
        if (!userData) {
          res.status(401).json({ error: "Make sure your email is correct." })
          return
        }
        const user = new User(userData)
  
        if (!(await user.comparePassword(password))) {
          res.status(401).json({ error: "Make sure your password is correct." })
          return
        }
  
        const loginResponse = await UsersDAO.loginUser(user.email, user.encoded())
        if (!loginResponse.success) {
          res.status(500).json({ error: loginResponse.error })
          return
        }
        res.json({ auth_token: user.encoded(), info: user.toJson() })
      } catch (e) {
        res.status(400).json({ error: e })
        return
      }
    }
  
    static async logout(req, res) {
      try {
        console.log(req.get("Authorization"))
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const userObj = await User.decoded(userJwt)
        var { error } = userObj
        if (error) {
          res.status(401).json({ error })
          return
        }
        const logoutResult = await UsersDAO.logoutUser(userObj.email)
        var { error } = logoutResult
        if (error) {
          res.status(500).json({ error })
          return
        }
        res.json(logoutResult)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  
    static async createAdminUser(req, res) {
      try {
        const userFromBody = req.body
        let errors = {}
        if (userFromBody && userFromBody.password.length < 8) {
          errors.password = "Your password must be at least 8 characters."
        }
        if (userFromBody && userFromBody.name.length < 3) {
          errors.name = "You must specify a name of at least 3 characters."
        }
  
        if (Object.keys(errors).length > 0) {
          res.status(400).json(errors)
          return
        }
  
        const userInfo = {
          ...userFromBody,
          password: await hashPassword(userFromBody.password),
        }
  
        const insertResult = await UsersDAO.addUser(userInfo)
        if (!insertResult.success) {
          errors.email = insertResult.error
        }
  
        if (Object.keys(errors).length > 0) {
          res.status(400).json(errors)
          return
        }
  
        const makeAdminResponse = await UsersDAO.makeAdmin(userFromBody.email)
  
        const userFromDB = await UsersDAO.getUser(userFromBody.email)
        if (!userFromDB) {
          errors.general = "Internal error, please try again later"
        }
  
        if (Object.keys(errors).length > 0) {
          res.status(400).json(errors)
          return
        }
  
        const user = new User(userFromDB)
        const jwt = user.encoded()
        const loginResponse = await UsersDAO.loginUser(user.email, jwt)
  
        res.json({
          auth_token: jwt,
          info: user.toJson(),
        })
      } catch (e) {
        res.status(500).json(e)
      }
    }
  
    static async profile(req, res) {
      try {
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const userFromHeader = await User.decoded(userJwt)
        var { error } = userFromHeader
        if (error) {
          res.status(401).json({ error })
          return
        }
        // await UsersDAO.updatePreferences(
        //   userFromHeader.email,
        //   req.body.preferences,
        // )
        const userFromDB = await UsersDAO.getUser(userFromHeader.email)
        if (!userFromDB) {
          errors.general = "Internal error, please try again later"
        }
        // if (Object.keys(errors).length > 0) {
        //   res.status(400).json(errors)
        //   return
        // }
        console.log(userFromDB)
        const user = new User(userFromDB)
        const jwt = user.encoded()
        const loginResponse = await UsersDAO.loginUser(user.email, jwt)
  
        res.json({
          auth_token: jwt,
          info: user.toJson(),
        })
      } catch (e) {
        res.status(500).json(e)
      }
    }
  
    static async checkAdmin(req, res) {
      try {
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const userFromHeader = await User.decoded(userJwt)
        var { error } = userFromHeader
        if (error) {
          res.status(401).json({ error })
          return
        }
        const userFromDB = await UsersDAO.getUser(userFromHeader.email)
        if (!userFromDB) {
          errors.general = "Internal error, please try again later"
        }
        // if (Object.keys(errors).length > 0) {
        //   res.status(400).json(errors)
        //   return
        // }
        const user = new User(userFromDB)
        const jwt = user.encoded()
        const checkResponse = await UsersDAO.checkAdmin(user.email)
        res.json({
          auth_token: jwt,
          info: user.toJson(),
          isAdmin: checkResponse
        })
      } catch (e) {
        res.status(500).json(e)
      }
    }
  
  }

module.exports = UserController;