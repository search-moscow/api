var DistrictDAO = require('../dao/district.dao');

class DistrictController {
    
    static async index(req, res) {
        try {
            let response  = await DistrictDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response = await DistrictDAO.single(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
    
module.exports = DistrictController;