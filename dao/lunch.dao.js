ObjectID = require('mongodb').ObjectID

let lunches
let moscow

class LunchDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            lunches = await moscow.collection("lunches")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in lunches DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await lunches
        .aggregate([
            { $match: { status: true } },
            { $addFields: { "restaurant": { $toObjectId: "$restaurant"}}},
            { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } },
            { $unwind: "$restaurants" },
            { $addFields: { "restaurants.metro": { $toObjectId: "$restaurants.metro"}}},
            { $lookup: { from: "metros", localField: "restaurants.metro", foreignField: "_id", as: "restaurants.metros" } },
            { $addFields: { "restaurants.district": { $toObjectId: "$restaurants.district"}}},
            { $lookup: { from: "districts", localField: "restaurants.district", foreignField: "_id", as: "restaurants.districts" } },
            // { $arrayElemAt: [] }
            // { $match: {'restaurants.0.type': true} },
            // { $match: {status: true} },
            // { $elemMatch: { restaurants: 0 } }
            // restaurants.metros: "1"
            // { $sort: {_id: -1} }
        ]);

        // await cursor.aggregate([
        //     { $match: { status: true } },
        // ])

        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async gethome() {
        const cursor = await lunches
        .aggregate([
            // { $match: { status: true } },
            { $addFields: { "restaurant": { $toObjectId: "$restaurant"}}},
            { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } },
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
        const cursor = lunches
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "restaurant": { $toObjectId: "$restaurant"}}},
                { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await lunches.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(slug, title, description, text, restaurant, startDate, finishDate, timeFrom, timeTo, items, dishes) {

        let dateAdded = new Date()
        let lastModified = new Date()

        let status = false
        // if (type == "true") {
        //     status = true
        // }

        // if (type == "false") {
        //     status = false
        // }

        const result = await lunches.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                status: status,
                views: 0,
                text: text,
                restaurant: restaurant,
                startDate: startDate,
                finishDate: finishDate,
                timeFrom: timeFrom,
                timeTo: timeTo,
                items: items,
                dishes: dishes,
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
        const result = await lunches.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async enable(id) {
        const result = await lunches.update( { _id: new ObjectID(id) }, { $set: { status: true } } )
                          
        if (result) {
            console.log(`Enable a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async disable(id) {
        const result = await lunches.update( { _id: new ObjectID(id) }, { $set: { status: false } } )
                          
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
            const result = await lunches.update(
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
            const result = await lunches.update(
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

}

module.exports = LunchDAO;