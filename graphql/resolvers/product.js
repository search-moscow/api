var ProductDAO = require('../../dao/product.dao')

module.exports = {
    Query: {
        products: () => {
            return ProductDAO.getAll()
        },
        product: (_, args) => {
            return ProductDAO.getBy(args.slug)
        }
    }
}