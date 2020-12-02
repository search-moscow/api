var NewsDAO = require('../dao/news.dao');

class NewsController {
    
    static async index(req, res) {
        try {
            let response  = await NewsDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gethome(req, res) {
        try {
            let response  = await NewsDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await NewsDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = NewsController;