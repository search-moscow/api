var SpaDAO = require('../dao/spa.dao');

class SpaController {
    
    static async index(req, res) {
        try {
            let response  = await SpaDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gethome(req, res) {
        try {
            let response  = await SpaDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortUp(req, res) {
        try {
            let response  = await SpaDAO.getSortUp()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortDown(req, res) {
        try {
            let response  = await SpaDAO.getSortDown()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response  = await SpaDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async filter(req, res) {
        try {
            let response  = await SpaDAO.filter(req.query.price)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = SpaController;