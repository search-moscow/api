var CouponDAO = require('../dao/coupon.dao');
var ActivityDAO = require('../dao/activity.dao');
const ProductDAO = require("../dao/product.dao");

class CouponController {
    
    static async findAll(req, res) {
        try {
            let response  = await CouponDAO.findAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findHome(req, res) {
        try {
            let response  = await CouponDAO.findHome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findLast(req, res) {
        try {
            let response = await CouponDAO.findLast()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findOne(req, res) {
        try {
            let response  = await CouponDAO.findOne(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = CouponController;