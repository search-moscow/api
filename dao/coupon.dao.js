ObjectID = require('mongodb').ObjectID

let coupons
let moscow

class CouponDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            coupons = await moscow.collection("coupons")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in coupons DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await coupons.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async findAll() {
        const cursor = await coupons
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

    static async findHome() {
        const results = await coupons
            .aggregate([
                { $match: { type: true }},
                { $addFields: { "metro": { $toObjectId: "$metro" }}},
                { $lookup: { from: "metros", localField: "metro", foreignField: "_id", as: "metros" }},
                { $addFields: { "district": { $toObjectId: "$district" }}},
                { $lookup: { from: "districts", localField: "district", foreignField: "_id", as: "districts" }},
                { $sort: {_id: -1 }},
                { $limit: 10 }
            ])
            .toArray()
                          
        if (results) return results
    }

    static async findLast() {
        const cursor = await coupons
            .aggregate([
                { $match: { type: true }},
                { $sort: { _id: -1 }},
                { $limit: 5 }
            ]);

        const results = await cursor.toArray();

        if (results) return results
    }

    static async findOne(id) {
        const cursor = coupons
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
            await coupons.update(
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

module.exports = CouponDAO;