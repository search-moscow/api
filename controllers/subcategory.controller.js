var SubcategoryDAO = require('../dao/subcategory.dao');

class SubcategoryController {
    
    static async index(req, res) {
        try {
            let response  = await SubcategoryDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response = await SubcategoryDAO.single(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = SubcategoryController;