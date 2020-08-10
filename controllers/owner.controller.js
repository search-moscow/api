var OwnersDAO = require('../dao/owners.dao');

class OwnerController {
    
    static async index(req, res) {
        try {
            let response  = await OwnersDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response  = await OwnersDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async update(req, res) {
        try {
            let response  = await OwnersDAO.update(req.body)
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async create(req, res) {
        try {
                
            let response = await OwnersDAO.create(
                req.body.shop,
                req.body.user
            )
            
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async delete(req, res) {
        let id = req.body.doc._id
        
        try {
            let response  = await OwnersDAO.delete(id)
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = OwnerController;