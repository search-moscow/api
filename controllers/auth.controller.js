var User = require('../models/user');
var UsersDAO = require('../dao/users.dao');
var OwnersDAO = require('../dao/owners.dao')
var fs = require('fs');
var path = require('path');

class AuthController {

    static async index(req, res, next) {
        try {
            console.log(1)
            next()
        } catch (error) {
            console.log('error')
        }
    }


    static async access(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const user = await User.decoded(userJwt)
            var { error } = user
            // if (error) {
            //   res.status(401).json({ error })
            //   return
            // }
    
            if(!user.email) {
                res.status(401).json({ status: "fail" })
                return
            }

            if (UsersDAO.checkAdmin(user.email)) {
            //   const report = await CommentsDAO.mostActiveCommenters()
            //   res.json({ report })
                next()
            } else {
                res.status(401).json({ status: "fail" })
                return
            }
    
            // res.status(401).json({ status: "fail" })
        } catch {
            res.status(500)
        }
    }

}

module.exports = AuthController;