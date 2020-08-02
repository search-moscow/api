ObjectID = require('mongodb').ObjectID

let restaurants
let moscow

class RestaurantDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            restaurants = await moscow.collection("restaurants")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in restaurants DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await restaurants
        .aggregate([
            { $addFields: { "convertedId": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "convertedId", foreignField: "_id", as: "metros" } },
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

    static async getBy(id) {
        const cursor = restaurants
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "convertedId": { $toObjectId: "$metro"}}},
                { $lookup: { from: "metros", localField: "convertedId", foreignField: "_id", as: "inventory_docs" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await restaurants.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, type, metro, filename, text, phone) {

        const result = await restaurants.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                type: type,
                metro: metro,
                filename: filename,
                views: 0,
                text: text,
                phone: phone
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
    static async delete(id) {
        const result = await restaurants.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async update(object) {
        let type
        if (object.type == "true") {
            type = true
        }

        if (object.type == "false") {
            type = false
        }

        if (!object.filename) { 
            const result = await restaurants.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    type: type,
                    phone: object.phone
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
            const result = await restaurants.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    type: type,
                    filename: object.filename,
                    phone: object.phone
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

    static async search(text) {
        const cursor = await restaurants.find( { $text: { $search: text } });
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }
}

module.exports = RestaurantDAO;