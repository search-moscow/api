ObjectID = require('mongodb').ObjectID

let services
let moscow

class ServiceDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            services = await moscow.collection("services")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in services DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await services.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async getAll() {
        const cursor = await services
        .aggregate([
            { $match: { type: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
            { $addFields: { "category": { $toObjectId: "$category"}}},
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
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
        const cursor = await services
        .aggregate([
            { $match: { type: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
            { $addFields: { "category": { $toObjectId: "$category"}}},
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
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
        const cursor = services
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
            await services.update(
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
        const cursor = services
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
            await services.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, type, metro, filename, text, phone, website, district, category) {

        let dateAdded = new Date()
        let lastModified = new Date()

        let status
        if (type == "true") {
            status = true
        }

        if (type == "false") {
            status = false
        }

        const result = await services.insertOne(
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
                category: category,
                dateAdded: dateAdded,
                lastModified: lastModified
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
    static async delete(id) {
        const result = await services.deleteOne( { _id: new ObjectID(id) } )
                          
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
            const result = await services.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    district: object.district,
                    category: object.category,
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
            const result = await services.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    metro: object.metro,
                    district: object.district,
                    category: object.category,
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

        const result = await services.update(
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
        
        const result = await services.update(
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

module.exports = ServiceDAO;