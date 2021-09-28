var NewsDAO = require('../../dao/news.dao')

module.exports = {
    Query: {
        newsFindLast: () => {
            return NewsDAO.findLast()
        },
        newsFindHome: () => {
            return NewsDAO.findHome()
        }
    }
}