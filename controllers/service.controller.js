var ServiceDAO = require('../dao/service.dao');

class ServiceController {
    
    static async index(req, res) {
        try {
            let response  = await ServiceDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async gethome(req, res) {
        try {
            let response  = await ServiceDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await ServiceDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = ServiceController;