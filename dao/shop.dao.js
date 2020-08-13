ObjectID = require('mongodb').ObjectID

let shops
let moscow

class ShopDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            shops = await moscow.collection("shops")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in shops DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await shops
        .aggregate([
            { $match: { type: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
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
        const cursor = await shops
        .aggregate([
            { $match: { type: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
            { $sort: {_id: -1} },
            { $limit: 4}
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
        const cursor = shops
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "metro": { $toObjectId: "$metro"}}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
                { $addFields: { "district": { $toObjectId: "$district"}}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await shops.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }


    static async getById(id) {
        const cursor = shops
            .aggregate([
                { $match:{ _id: new ObjectID(id)  }},
                { $addFields: { "metro": { $toObjectId: "$metro"}}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
                { $addFields: { "district": { $toObjectId: "$district"}}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await shops.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, type, metro, filename, text, phone, website, district) {

        let dateAdded = new Date()
        let lastModified = new Date()

        let status
        if (type == "true") {
            status = true
        }

        if (type == "false") {
            status = false
        }

        const result = await shops.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                type: status,
                metro: metro,
                filename: filename,
                views: 0,
                text: text,
                phone: phone,
                website: website,
                district: district,
                dateAdded: dateAdded,
                lastModified: lastModified
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
    static async delete(id) {
        const result = await shops.deleteOne( { _id: new ObjectID(id) } )
                          
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
            const result = await shops.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    district: object.district,
                    type: type,
                    phone: object.phone,
                    website: object.website,
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
            const result = await shops.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    district: object.district,
                    type: type,
                    filename: object.filename,
                    phone: object.phone,
                    website: object.website,
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

        const result = await shops.update(
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
        
        const result = await shops.update(
            { _id: new ObjectID(body.id) },
            {
                $set: {
                    address: body.params.address,
                    keywords: body.params.keywords,
                    geo: body.params.geo
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

module.exports = ShopDAO;