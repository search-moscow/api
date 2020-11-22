var EventDAO = require('../dao/event.dao');
var ActivityDAO = require('../dao/activity.dao');

class EventController {
    
    static async index(req, res) {
        try {
            let response  = await EventDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // static async gethome(req, res) {
    //     try {
    //         let response  = await EventDAO.gethome()
    //         res.json(response)
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
    
    static async single(req, res) {
        try {
            let response  = await EventDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = EventController;