var ShopDAO = require('../dao/shop.dao');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

class ShopController {
    
    static async index(req, res) {
        try {
            let response  = await ShopDAO.getAll()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    static async gethome(req, res) {
        try {
            let response  = await ShopDAO.gethome()
            res.json(response)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async single(req, res) {
        try {
            let response  = await ShopDAO.getBy(req.params.id)
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


                var buffer = fs.readFileSync(path.join(__dirname, '../uploads/shops/originals/' + filename));
                
                sharp(buffer)
                .resize(3000, 2000)
                .toFile(path.join(__dirname, '../uploads/shops/3x/' + '3x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(2000, 1000)
                .toFile(path.join(__dirname, '../uploads/shops/2x/' + '2x' + filename), (err, info) => { 
              
                  if (err) {
                    throw err;
                  }
              
                });

                sharp(buffer)
                .resize(1000, 500)
                .toFile(path.join(__dirname, '../uploads/shops/1x/' + '1x' + filename), (err, info) => { 
              
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
                
                let response  = await ShopDAO.create(
                    slug,
                    req.body.title,
                    req.body.description,
                    req.body.type,
                    req.body.metro,
                    filename,
                    req.body.text,
                    req.body.phone,
                    req.body.website,
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
                let response  = await ShopDAO.update(req.body)
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
    
                    var buffer = fs.readFileSync(path.join(__dirname, '../uploads/shops/originals/' + filename));
                    
                    sharp(buffer)
                    .resize(3000, 2000)
                    .toFile(path.join(__dirname, '../uploads/shops/3x/' + '3x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(2000, 1000)
                    .toFile(path.join(__dirname, '../uploads/shops/2x/' + '2x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
    
                    sharp(buffer)
                    .resize(1000, 500)
                    .toFile(path.join(__dirname, '../uploads/shops/1x/' + '1x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });
                    

                    // Get editable Article for get current filename to remove
                    let current  = await ShopDAO.getBy(req.body.slug)
                    
                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/1x/' + '1x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/2x/' + '2x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/3x/' + '3x' + current[0].filename))
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/originals/' + current[0].filename))
                    } catch(err) {
                        console.error(err)
                    }
                    

                    // Set new filename uploaded on body for send update new
                    req.body['filename'] = filename;

                    let response  = await ShopDAO.update(req.body)
                    
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

            try {
                fs.unlinkSync(path.join(__dirname, '../uploads/shops/1x/' + '1x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/shops/2x/' + '2x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/shops/3x/' + '3x' + filename))
                fs.unlinkSync(path.join(__dirname, '../uploads/shops/originals/' + filename))
            } catch(err) {
                console.error(err)
            }
            
            if (req.body.doc.photos) {
                for (let i = 0; i < req.body.doc.photos.length; i++) {
                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/photos/' + '2x' + req.body.doc.photos[i]))
                    } catch(err) {
                        console.error(err)
                    }
                }
            }

            let response  = await ShopDAO.delete(id)
            res.json(response)
            

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async gallery(req, res) {
        
        let filenames = []
        
        try {
            let filesdata = req.files

            if (!filesdata) {
                res.json("Ошибка при загрузке файла");
            } else {

                let current  = await ShopDAO.getBy(req.body.slug)
                // If have photos 
                
                if (current[0].photos) {
                    for (let i = 0; i < current[0].photos.length; i++) {
                        try {
                            fs.unlinkSync(path.join(__dirname, '../uploads/shops/photos/' + '2x' + current[0].photos[i]))
                        } catch(err) {
                            console.error(err)
                        }
                    }
                }


                for (let i = 0; i < req.files.length; i++) {
                    let filename = filesdata[i].filename;
                    filenames.push(filesdata[i].filename)
                    
                    var buffer = fs.readFileSync(path.join(__dirname, '../uploads/shops/photos/' + filename));


                    sharp(buffer)
                    .resize(2000, 1000)
                    .toFile(path.join(__dirname, '../uploads/shops/photos/' + '2x' + filename), (err, info) => { 
                  
                      if (err) {
                        throw err;
                      }
                  
                    });

                    try {
                        fs.unlinkSync(path.join(__dirname, '../uploads/shops/photos/' + filename))
                    } catch(err) {
                        console.error(err)
                    }

                }

                let response  = await ShopDAO.includePhotos(req.body.id, filenames)
                
                res.json(response)


            }

        } catch (error) {
            res.status(500).json(error)
        }
    }


    static async additionally(req, res) {
        try {
            let response  = await ShopDAO.includeOptionals(req.body)
                
            res.json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = ShopController;