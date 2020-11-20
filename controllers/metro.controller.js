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
    
    static async single(req, res) {
        try {
            let response = await MetroDAO.single(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = MetroController;