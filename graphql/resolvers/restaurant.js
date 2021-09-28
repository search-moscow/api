var RestaurantDAO = require('../../dao/restaurant.dao')

module.exports = {
    Query: {
        restaurantsFindHome: () => {
            return RestaurantDAO.findHome()
        }
    }
}