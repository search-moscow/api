ObjectID = require('mongodb').ObjectID

let houses
let moscow

class HouseDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            houses = await moscow.collection("houses")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in houses DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await houses.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async getAll() {
        const cursor = await houses
        .aggregate([
            { $match: { status: true } },
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
        const cursor = await houses
        .aggregate([
            { $match: { status: true } },
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
        const cursor = await houses
        .aggregate([
            { $match: { status: true } },
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

    static async gethome() {
        const cursor = await houses
        .aggregate([
            { $match: { status: true } },
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
        const cursor = houses
            .aggregate([
                { $match:{slug: id}},
                { $addFields: { "category": { $toObjectId: "$category"}}},
                { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await houses.update(
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
        const cursor = houses
            .aggregate([
                { $match:{price: {$gte: Number(id)}}},
                { $addFields: { "category": { $toObjectId: "$category"}}},
                { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categories" } },
                { $sort: {_id: -1} },
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await houses.update(
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

module.exports = HouseDAO;