var ItemDAO = require('../dao/item.dao');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

class ItemController {
    
    static async index(req, res) {
        try {
            let response  = await ItemDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async single(req, res) {
        try {
            let response  = await ItemDAO.getBy(req.params.id)
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


                var buffer = fs.readFileSync(path.join(__dirname, '../uploads/items/originals/' + filename));
                
                sharp(buffer)
                .resize(3000, 2000)
                .toFile(path.join(__dirname, '../uploads/items/3x/' + '3x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(2000, 1000)
                .toFile(path.join(__dirname, '../uploads/items/2x/' + '2x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(1000, 500)
                .toFile(path.join(__dirname, '../uploads/items/1x/' + '1x' + filename), (err, info) => { 
              
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
                
                let response  = await ItemDAO.create(
                    slug,
                    req.body.title,
                    req.body.description,
                    req.body.type,
                    req.body.category,
                    filename,
                    req.body.text
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
                let response  = await ItemDAO.update(req.body)
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
    
                    var buffer = fs.readFileSync(path.join(__dirname, '../uploads/items/originals/' + filename));
                    
                    sharp(buffer)
                    .resize(3000, 2000)
                    .toFile(path.join(__dirname, '../uploads/items/3x/' + '3x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(2000, 1000)
                    .toFile(path.join(__dirname, '../uploads/items/2x/' + '2x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(1000, 500)
                    .toFile(path.join(__dirname, '../uploads/items/1x/' + '1x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
                    

                    // Get editable Article for get current filename to remove
                    let current  = await ItemDAO.getBy(req.body.slug)
                    
                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/items/1x/' + '1x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/items/2x/' + '2x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/items/3x/' + '3x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/items/originals/' + current[0].filename))
                    } catch(err) {
                        console.error(err)
                    }
                    

                    // Set new filename uploaded on body for send update new
                    req.body['filename'] = filename;

                    let response  = await ItemDAO.update(req.body)
                    
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
            let response  = await ItemDAO.delete(id)

            try {
                fs.unlinkSync(path.join(__dirname, '../uploads/items/1x/' + '1x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/items/2x/' + '2x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/items/3x/' + '3x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/items/originals/' + filename))
            } catch(err) {
                console.error(err)
            }

            res.json(response)

        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = ItemController;