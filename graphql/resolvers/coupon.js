var CouponDAO = require('../../dao/coupon.dao')

module.exports = {
    Query: {
        couponsFindHome: () => {
            return CouponDAO.findHome()
        }
    }
}