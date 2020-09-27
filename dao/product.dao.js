ObjectID = require('mongodb').ObjectID

let products
let moscow

class ProductDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            products = await moscow.collection("products")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in products DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await products.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async getAll() {
        const cursor = await products
        .aggregate([
            { $match: { type: true } },
            { $sort: {_id: -1} }
        ]);
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async gethome() {
        const cursor = await products
        .aggregate([
            { $match: { type: true } },
            { $sort: {_id: -1} },
            { $limit: 10}
        ]);
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async getBy(id) {
        const cursor = products
            .aggregate([
                { $match:{slug: id}},
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await products.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, type, filename, text, phone, website, price, rating, email) {

        let dateAdded = new Date()
        let lastModified = new Date()

        let status
        if (type == "true") {
            status = true
        }

        if (type == "false") {
            status = false
        }

        const result = await products.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                type: status,
                filename: filename,
                views: 0,
                text: text,
                phone: phone,
                website: website,
                price: price,
                rating: rating,
                email: email,
                dateAdded: dateAdded,
                lastModified: lastModified
            }
        );
        if (result) {
            console.log(`New listing created with the following id: ${result.insertedId}`);
            return result
        } else {
            console.log(`No listings found`);
        }

    }
    
    static async delete(id) {
        const result = await products.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async update(object) {
        let type
        let lastModified = new Date()
        
        if (object.type == "true") {
            type = true
        }

        if (object.type == "false") {
            type = false
        }

        if (!object.filename) { 
            const result = await products.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    type: type,
                    phone: object.phone,
                    website: object.website,
                    price: object.price,
                    rating: object.rating,
                    email: object.email,
                    lastModified: lastModified
                    // tags: [ "software" ],
                    // "ratings.1": { by: "xyz", rating: 3 }
                }
                }
                )
                            
            if (result) {
                console.log(`Update a listing in the collection:'`);
                return result
            } else {
                console.log(`No listings found`);
            }
        
        
        } else {
            const result = await products.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    type: type,
                    filename: object.filename,
                    phone: object.phone,
                    website: object.website,
                    price: object.price,
                    rating: object.rating,
                    email: object.email,
                    lastModified: lastModified
                    // tags: [ "software" ],
                    // "ratings.1": { by: "xyz", rating: 3 }
                }
                }
                )
                            
            if (result) {
                console.log(`Update a listing in the collection:'`);
                return result
            } else {
                console.log(`No listings found`);
            }
        }
    }

    static async includePhotos(id, photos) {

        const result = await products.update(
            { _id: new ObjectID(id) },
            {
                $set: {
                    photos: photos
                }
            }
            )
        
        if (result) {
            console.log(`Update a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }

    }

    static async includeOptionals(body) {
        
        const result = await products.update(
            { _id: new ObjectID(body.id) },
            {
                $set: {
                    address: body.params.address,
                    keywords: body.params.keywords,
                    geo: body.params.geo,
                    socials: body.params.socials
                }
            }
            )
        
        if (result) {
            console.log(`Update a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }
}

module.exports = ProductDAO;