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

    static async getCount() {
        const result = await restaurants.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async findAll() {
        const cursor = await restaurants
        .aggregate([
            { $match: { status: true } },
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

    static async getSortUp() {
        const cursor = await restaurants
        .aggregate([
            { $match: { status: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
            { $addFields: { "category": { $toObjectId: "$category"}}},
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
            { $sort: {views: -1} }
        ]);
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async getSortDown() {
        const cursor = await restaurants
        .aggregate([
            { $match: { status: true } },
            { $addFields: { "metro": { $toObjectId: "$metro"}}},
            { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
            { $addFields: { "district": { $toObjectId: "$district"}}},
            { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
            { $addFields: { "category": { $toObjectId: "$category"}}},
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
            { $sort: {views: 1} }
        ]);
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async findHome() {
        const cursor = await restaurants
            .aggregate([
                { $match: { status: true }},
                { $addFields: { "metro": { $toObjectId: "$metro" }}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" }},
                { $addFields: { "district": { $toObjectId: "$district" }}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" }},
                { $addFields: { "category": { $toObjectId: "$category" }}},
                { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" }},
                { $sort: { _id: -1 }},
                { $limit: 3 }
            ]);
        
        const results = await cursor.toArray();
                          
        if (results) return results
    }

    static async findLast() {
        const cursor = await restaurants
            .aggregate([
                { $match: { status: true }},
                { $sort: { _id: -1 }},
                { $limit: 5 }
            ]);

        const results = await cursor.toArray();

        if (results) return results
    }

    static async findOne(id) {
        const cursor = restaurants
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "metro": { $toObjectId: "$metro"}}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
                { $addFields: { "district": { $toObjectId: "$district"}}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
                { $addFields: { "category": { $toObjectId: "$category"}}},
                { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
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

    static async filter(id) {
        const cursor = restaurants
            .aggregate([
                { $match:{price: {$gte: Number(id)}}},
                { $addFields: { "metro": { $toObjectId: "$metro"}}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" } },
                { $addFields: { "district": { $toObjectId: "$district"}}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" } },
                { $addFields: { "category": { $toObjectId: "$category"}}},
                { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
                { $sort: {_id: -1} },
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

}

module.exports = RestaurantDAO;