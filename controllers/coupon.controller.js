var CouponDAO = require('../dao/coupon.dao');
var ActivityDAO = require('../dao/activity.dao');

class CouponController {
    
    static async index(req, res) {
        try {
            let response  = await CouponDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // static async gethome(req, res) {
    //     try {
    //         let response  = await CouponDAO.gethome()
    //         res.json(response)
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
    
    static async single(req, res) {
        try {
            let response  = await CouponDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = CouponController;