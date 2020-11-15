var ActivityDAO = require('../dao/activity.dao');
var RestauranttDAO = require('../dao/restaurant.dao');
var LunchDAO = require('../dao/lunch.dao');
var ServiceDAO = require('../dao/service.dao');
var ShopDAO = require('../dao/shop.dao');
var EventDAO = require('../dao/event.dao');
var RealestateDAO = require('../dao/realestate.dao');
var HotelDAO = require('../dao/hotel.dao');

class ActivityController {
    
    static async index(req, res) {
        try {
            let response  = await ActivityDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    

    static async create(req, res) {
        try {
            let response  = await ActivityDAO.create(
                req.body.slug,
                req.body.title,
                req.body.description
            )
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async count(req, res) {
        try {
            let restaurantCount  = await RestauranttDAO.getCount()
            let lunchCount  = await LunchDAO.getCount()
            let serviceCount  = await ServiceDAO.getCount()
            let shopCount  = await ShopDAO.getCount()
            let eventCount  = await EventDAO.getCount()
            let realestateCount = await RealestateDAO.getCount()
            let hotelCount = await HotelDAO.getCount()

            const response = {
                'restaurants': restaurantCount,
                'lunches': lunchCount,
                'services': serviceCount,
                'shops': shopCount,
                'events': eventCount,
                'realestates': realestateCount,
                'hotels': hotelCount
            }

            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
    
module.exports = ActivityController;