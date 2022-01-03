ObjectID = require('mongodb').ObjectID

let products
let moscow

class ProductDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            products = await moscow.collection("products")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in products DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await products.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async findAll() {
        const cursor = await products
        .aggregate([
            { $match: { type: true } },
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
        const results = await products
            .aggregate([
                { $match: { type: true }},
                { $addFields: { "shop": { $toObjectId: "$shop" }}},
                { $lookup: { from: "shops", localField: "shop", foreignField: "_id", as: "shop" }},
                { $unwind: "$shop" },
                { $addFields: { "subcategory": { $toObjectId: "$subcategory" }}},
                { $lookup: { from: "subcategories", localField: "subcategory", foreignField: "_id", as: "subcategory" }},
                { $unwind: "$subcategory" },
                { $sort: {_id: -1 }},
                { $limit: 10 }
            ])
            .toArray();
                          
        if (results) return results
    }

    static async findLast() {
        const cursor = await products
            .aggregate([
                { $match: { type: true }},
                { $sort: { _id: -1 }},
                { $limit: 5 }
            ]);

        const results = await cursor.toArray();

        if (results) return results
    }

    static async findOne(id) {
        const cursor = products
            .aggregate([
                { $match:{slug: id}},

                { $addFields: { "shop": { $toObjectId: "$shop"}}},
                { $lookup: { from: "shops", localField: "shop", foreignField: "_id", as: "shop" } },
                { $unwind: "$shop" },
                
                { $addFields: { "subcategory": { $toObjectId: "$subcategory"}}},
                { $lookup: { from: "subcategories", localField: "subcategory", foreignField: "_id", as: "subcategory" } },
                { $unwind: "$subcategory" },

                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await products.update(
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

module.exports = ProductDAO;