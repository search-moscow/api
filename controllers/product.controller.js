var ProductDAO = require('../dao/product.dao');
const NewsDAO = require("../dao/news.dao");

class ProductController {
    
    static async findAll(req, res) {
        try {
            let response = await ProductDAO.findAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findHome(req, res) {
        try {
            let response = await ProductDAO.findHome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findLast(req, res) {
        try {
            let response = await ProductDAO.findLast()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async findOne(req, res) {
        try {
            let response = await ProductDAO.findOne(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = ProductController;