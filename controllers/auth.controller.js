var User = require('../models/user');
var UsersDAO = require('../dao/users.dao');

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
    
            if (UsersDAO.checkAdmin(user.email)) {
            //   const report = await CommentsDAO.mostActiveCommenters()
            //   res.json({ report })
                next()
            } else {
                // return
                res.status(401).json({ status: "fail" })
            }
    
            // res.status(401).json({ status: "fail" })
        } catch {
            res.status(500)
        }
    }
}

module.exports = AuthController;