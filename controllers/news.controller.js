var NewsDAO = require('../dao/news.dao');

class NewsController {
    
    static async findAll(req, res) {
        try {
            let response = await NewsDAO.findAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findHome(req, res) {
        try {
            let response = await NewsDAO.findHome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findLast(req, res) {
        try {
            let response = await NewsDAO.findLast()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findOne(req, res) {
        try {
            let response = await NewsDAO.findOne(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = NewsController;