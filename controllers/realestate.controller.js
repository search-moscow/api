var RealestateDAO = require('../dao/realestate.dao');

class RealestateController {
    
    static async index(req, res) {
        try {
            let response  = await RealestateDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gethome(req, res) {
        try {
            let response  = await RealestateDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async getSortUp(req, res) {
        try {
            let response  = await RealestateDAO.getSortUp()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortDown(req, res) {
        try {
            let response  = await RealestateDAO.getSortDown()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await RealestateDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async filter(req, res) {
        try {
            let response  = await RealestateDAO.filter(req.query.price)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = RealestateController;