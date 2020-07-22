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
    

    static async create(req, res) {
        try {
            let response  = await CategoryDAO.create(
                req.body.slug,
                req.body.title,
                req.body.description
            )
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async update(req, res) {
        try {
            let response  = await CategoryDAO.update(req.body)
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async delete(req, res) {
        let id = req.body.doc._id
        
        try {
            let response  = await CategoryDAO.delete(id)
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = CategoryController;