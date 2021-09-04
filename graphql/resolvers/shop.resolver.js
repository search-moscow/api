var ShopDAO = require('../../dao/shop.dao');

module.exports = {
  Query: {
    shops: () => {
      return ShopDAO.getAll();
    }
  }
}