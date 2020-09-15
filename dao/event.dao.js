ObjectID = require('mongodb').ObjectID

let events
let moscow

class EventDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            events = await moscow.collection("events")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in events DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await events
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

    static async getCount() {
        const result = await events.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async gethome() {
        const cursor = await events
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
        const cursor = events
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
            await events.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, metro, filename, text, phone, website, district, startDate, finishDate) {

        let dateAdded = new Date()
        let lastModified = new Date()

        let status = false
        // if (type == "true") {
        //     status = true
        // }

        // if (type == "false") {
        //     status = false
        // }

        const result = await events.insertOne(
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
                startDate: startDate,
                finishDate: finishDate,
                dateAdded: dateAdded,
                lastModified: lastModified
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
    static async delete(id) {
        const result = await events.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }


    static async enable(id) {
        const result = await events.update( { _id: new ObjectID(id) }, { $set: { status: true } } )
                          
        if (result) {
            console.log(`Enable a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async disable(id) {
        const result = await events.update( { _id: new ObjectID(id) }, { $set: { status: false } } )
                          
        if (result) {
            console.log(`Disable a listing in the collection:'`);
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
            const result = await events.update(
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
                    startDate: object.startDate,
                    finishDate: object.finishDate,
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
            const result = await events.update(
                { _id: new ObjectID(object.id) },
                {
                $set: {
                    slug: object.slug,
                    title: object.title,
                    description: object.description,
                    text: object.text,
                    category: object.category,
                    type: type,
                    filename: object.filename,
                    phone: object.phone,
                    website: object.website,
                    startDate: object.startDate,
                    finishDate: object.finishDate,
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

        const result = await events.update(
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

        const result = await events.update(
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

module.exports = EventDAO;