var RestauranttDAO = require('../dao/restaurant.dao');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

class RestaurantController {
    
    static async index(req, res) {
        try {
            let response  = await RestauranttDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response  = await RestauranttDAO.getBy(req.params.id)
            res.json(response) 
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async create(req, res) {
        try {
            let filedata = req.file;
            let filename = filedata.filename;

            if (!filedata) {
                res.json("Ошибка при загрузке файла");
            } else {


                var buffer = fs.readFileSync(path.join(__dirname, '../uploads/restaurants/originals/' + filename));
                
                sharp(buffer)
                .resize(3000, 2000)
                .toFile(path.join(__dirname, '../uploads/restaurants/3x/' + '3x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(2000, 1000)
                .toFile(path.join(__dirname, '../uploads/restaurants/2x/' + '2x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(1000, 500)
                .toFile(path.join(__dirname, '../uploads/restaurants/1x/' + '1x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });
                
                let slug
                
                if (!req.body.slug) {
                    slug = Math.random().toString(15).substring(3, 5) + Math.random().toString(15).substring(2, 5);
                } else {
                    slug = req.body.slug
                }
                
                let response  = await RestauranttDAO.create(
                    slug,
                    req.body.title,
                    req.body.description,
                    req.body.type,
                    req.body.metro,
                    filename,
                    req.body.text,
                    req.body.phone,
                    req.body.district
                )
                
                res.json(response)
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async update(req, res) {
        
        
        if (!req.file) {
            try {
                let response  = await RestauranttDAO.update(req.body)
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
    
                    var buffer = fs.readFileSync(path.join(__dirname, '../uploads/restaurants/originals/' + filename));
                    
                    sharp(buffer)
                    .resize(3000, 2000)
                    .toFile(path.join(__dirname, '../uploads/restaurants/3x/' + '3x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(2000, 1000)
                    .toFile(path.join(__dirname, '../uploads/restaurants/2x/' + '2x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(1000, 500)
                    .toFile(path.join(__dirname, '../uploads/restaurants/1x/' + '1x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
                    

                    // Get editable Article for get current filename to remove
                    let current  = await RestauranttDAO.getBy(req.body.slug)
                    
                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/1x/' + '1x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/2x/' + '2x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/3x/' + '3x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/originals/' + current[0].filename))
                    } catch(err) {
                        console.error(err)
                    }
                    

                    // Set new filename uploaded on body for send update new
                    req.body['filename'] = filename;

                    let response  = await RestauranttDAO.update(req.body)
                    
                    res.json(response)
                }
            } catch (error) {
                res.status(500).json(error);
            }

        }

    }
    
    static async delete(req, res) {
        let id = req.body.doc._id
        let filename = req.body.doc.filename

        try {
            let response  = await RestauranttDAO.delete(id)

            try {
                fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/1x/' + '1x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/2x/' + '2x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/3x/' + '3x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/restaurants/originals/' + filename))
            } catch(err) {
                console.error(err)
            }

            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async search(req, res) {
        try {
            let response  = await RestauranttDAO.search(req.query.text)
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = RestaurantController;