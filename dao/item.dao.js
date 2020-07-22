ObjectID = require('mongodb').ObjectID

let items
let snake

class ItemDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            snake = await conn.db('snake')
            items = await snake.collection("items")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in items DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await items
        .aggregate([
            {$sort: {_id: -1}}
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
        const cursor = items
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "convertedId": { $toObjectId: "$category"}}},
                { $lookup: { from: "categories", localField: "convertedId", foreignField: "_id", as: "inventory_docs" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await items.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, type, category, filename, text) {

        const result = await items.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                type: type,
                category: category,
                filename: filename,
                views: 0,
                text: text
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
    static async delete(id) {
        const result = await items.deleteOne( { _id: new ObjectID(id) } )
                          
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
            const result = await items.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    category: object.category,
                    type: type,
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
            const result = await items.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    category: object.category,
                    type: type,
                    filename: object.filename
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
}

module.exports = ItemDAO;