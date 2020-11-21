var RestauranttDAO = require('../dao/restaurant.dao');

class RestaurantController {
    
    static async index(req, res) {
        try {
            let response  = await RestauranttDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gethome(req, res) {
        try {
            let response  = await RestauranttDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortUp(req, res) {
        console.log(req.query.sort)
        try {
            let response  = await RestauranttDAO.getSortUp()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortDown(req, res) {
        console.log(req.query.sort)
        try {
            let response  = await RestauranttDAO.getSortDown()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response  = await RestauranttDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = RestaurantController;