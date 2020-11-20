var CategoryDAO = require('../dao/category.dao');

class CategoryController {
    
    static async index(req, res) {
        try {
            let response  = await CategoryDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response = await CategoryDAO.single(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = CategoryController;