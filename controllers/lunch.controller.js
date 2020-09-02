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

    static async gethome(req, res) {
        try {
            let response  = await LunchDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
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
    
    static async create(req, res) {
        try {
            
            let slug
            
            if (!req.body.slug) {
                slug = Math.random().toString(15).substring(3, 5) + Math.random().toString(15).substring(2, 5);
            } else {
                slug = req.body.slug
            }
            
            let response  = await LunchDAO.create(
                slug,
                req.body.title,
                req.body.description,
                req.body.text,
                req.body.restaurant,
                req.body.startDate,
                req.body.finishDate,
                req.body.timeFrom,
                req.body.timeTo,
                req.body.lunches,
                req.body.dishes
            )
            
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async update(req, res) {
        
        
        if (!req.file) {
            try {
                let response  = await LunchDAO.update(req.body)
                res.json(response)
            } catch (error) {
                res.status(500).json(error);
            }
        }

        if (req.file) {

            try {
                let filedata = req.file;
                let filename = filedata.filename;
    
                if (!filedata) {
                    res.json("Ошибка при загрузке файла");
                } else {
    
                    var buffer = fs.readFileSync(path.join(__dirname, '../uploads/events/originals/' + filename));
                    
                    sharp(buffer)
                    .resize(3000, 2000)
                    .toFile(path.join(__dirname, '../uploads/events/3x/' + '3x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(2000, 1000)
                    .toFile(path.join(__dirname, '../uploads/events/2x/' + '2x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(1000, 500)
                    .toFile(path.join(__dirname, '../uploads/events/1x/' + '1x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
                    

                    // Get editable Article for get current filename to remove
                    let current  = await LunchDAO.getBy(req.body.slug)
                    
                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/events/1x/' + '1x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/events/2x/' + '2x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/events/3x/' + '3x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/events/originals/' + current[0].filename))
                    } catch(err) {
                        console.error(err)
                    }
                    

                    // Set new filename uploaded on body for send update new
                    req.body['filename'] = filename;

                    let response  = await LunchDAO.update(req.body)
                    
                    res.json(response)
                }
            } catch (error) {
                res.status(500).json(error);
            }

        }

    }
    
    static async delete(req, res) {
        let id = req.body.doc._id

        try {
            let response  = await LunchDAO.delete(id)
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async enable(req, res) {
        let id = req.body.doc._id

        try {
            let response  = await LunchDAO.enable(id)

            await ActivityDAO.create("lunches", req.body.doc.slug, req.body.doc.title, req.body.doc.dateAdded)
            
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async disable(req, res) {
        let id = req.body.doc._id

        try {
            let response  = await LunchDAO.disable(id)
            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = LunchController;