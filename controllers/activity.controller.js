var ActivityDAO = require('../dao/activity.dao');

class ActivityController {
    
    static async index(req, res) {
        try {
            let response  = await ActivityDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    

    static async create(req, res) {
        try {
            let response  = await ActivityDAO.create(
                req.body.slug,
                req.body.title,
                req.body.description
            )
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = ActivityController;