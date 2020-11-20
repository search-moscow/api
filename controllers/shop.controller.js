var ShopDAO = require('../dao/shop.dao');

class ShopController {
    
    static async index(req, res) {
        try {
            let response  = await ShopDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async gethome(req, res) {
        try {
            let response  = await ShopDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await ShopDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = ShopController;