var LunchDAO = require('../dao/lunch.dao');
var ActivityDAO = require('../dao/activity.dao');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

class LunchController {
    
    static async index(req, res) {
        try {
            let response  = await LunchDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // static async gethome(req, res) {
    //     try {
    //         let response  = await LunchDAO.gethome()
    //         res.json(response)
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
    
    static async single(req, res) {
        try {
            let response  = await LunchDAO.single(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getBy(req, res) {
        try {
            let response  = await LunchDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = LunchController;