var MetroDAO = require('../dao/metro.dao');

class MetroController {
    
    static async index(req, res) {
        try {
            let response  = await MetroDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    

    static async create(req, res) {
        try {
            let response  = await MetroDAO.create(
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
            let response  = await MetroDAO.update(req.body)
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async delete(req, res) {
        let id = req.body.doc._id
        
        try {
            let response  = await MetroDAO.delete(id)
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = MetroController;