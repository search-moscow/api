var HouseDAO = require('../dao/house.dao');

class HouseController {
    
    static async index(req, res) {
        try {
            let response  = await HouseDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gethome(req, res) {
        try {
            let response  = await HouseDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async getSortUp(req, res) {
        try {
            let response  = await HouseDAO.getSortUp()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortDown(req, res) {
        try {
            let response  = await HouseDAO.getSortDown()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await HouseDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async filter(req, res) {
        try {
            let response  = await HouseDAO.filter(req.query.price)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = HouseController;