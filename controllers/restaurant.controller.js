var RestauranttDAO = require('../dao/restaurant.dao');

class RestaurantController {
    
    static async findAll(req, res) {
        try {
            let response  = await RestauranttDAO.findAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findHome(req, res) {
        try {
            let response  = await RestauranttDAO.findHome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findLast(req, res) {
        try {
            let response  = await RestauranttDAO.findLast()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortUp(req, res) {
        try {
            let response  = await RestauranttDAO.getSortUp()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSortDown(req, res) {
        try {
            let response  = await RestauranttDAO.getSortDown()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async findOne(req, res) {
        try {
            let response  = await RestauranttDAO.findOne(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async filter(req, res) {
        try {
            let response  = await RestauranttDAO.filter(req.query.price)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = RestaurantController;