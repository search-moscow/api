var NewsDAO = require('../../dao/news.dao')

module.exports = {
    Query: {
        newsFindAll: () => {
            return NewsDAO.findAll()
        },
        newsFindLast: () => {
            return NewsDAO.findLast()
        },
        newsFindHome: () => {
            return NewsDAO.findHome()
        }
    }
}