var SearchDAO = require('../dao/search.dao');

class SearchController {

    static async index(req, res) {
        try {
            let response  = await SearchDAO.search(req.query.text)
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = SearchController;