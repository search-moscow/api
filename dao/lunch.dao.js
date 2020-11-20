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

    static async getCount() {
        const result = await lunches.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async getAll() {

        // var start = new Date(2020, 7, 28);
        // var end = new Date(2020, 9, 1);

        const cursor = await lunches
        .aggregate([
            { $match: { status: true }},
            // { $match: { status: true, dateAdded: {$gte: start, $lt: end} } },
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
            { $sort: {_id: -1} }
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

    static async single(id) {
        const cursor = lunches
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "restaurant": { $toObjectId: "$restaurant"}}},
                { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } },
                { $unwind: "$restaurants" },
                { $addFields: { "restaurants.metro": { $toObjectId: "$restaurants.metro"}}},
                { $lookup: { from: "metros", localField: "restaurants.metro", foreignField: "_id", as: "restaurants.metros" } },
                { $addFields: { "restaurants.district": { $toObjectId: "$restaurants.district"}}},
                { $lookup: { from: "districts", localField: "restaurants.district", foreignField: "_id", as: "restaurants.districts" } },
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


    static async getBy(id) {
        const cursor = lunches
            .aggregate([
                { $match:{restaurant: id}},
                { $addFields: { "restaurant": { $toObjectId: "$restaurant"}}},
                { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } },
                { $unwind: "$restaurants" },
                { $addFields: { "restaurants.metro": { $toObjectId: "$restaurants.metro"}}},
                { $lookup: { from: "metros", localField: "restaurants.metro", foreignField: "_id", as: "restaurants.metros" } },
                { $addFields: { "restaurants.district": { $toObjectId: "$restaurants.district"}}},
                { $lookup: { from: "districts", localField: "restaurants.district", foreignField: "_id", as: "restaurants.districts" } },
                // { $limit: 1 }
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

}

module.exports = LunchDAO;