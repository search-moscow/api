ObjectID = require('mongodb').ObjectID

let subcategories
let moscow

class SubcategoryDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            subcategories = await moscow.collection("subcategories")

        } catch (e) {
          console.error(
            `Unable to establish a collection handle in subcategories DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await subcategories.find();
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }

    }

    static async single(id) {
        const cursor = await subcategories
        .aggregate([
            { $match: { slug: id }},
            { $addFields: { "id": { $toString: "$_id"}}},
            { $lookup: {
              from: "products",
              let: {"id": "$id"},
              pipeline: [
                { $match: { $expr: { $eq: ["$subcategory", "$$id"] }}},
                
                { $addFields: { "shop": { $toObjectId: "$shop"}}},
                
                { $lookup: { from: "shops", localField: "shop", foreignField: "_id", as: "shop" } },
                { $unwind: "$shop" },

                { $sort: { _id: -1 } },
    
              ],
              as: "products"
            }},
          ]);
          
          const result = await cursor.toArray();

        if (result) {
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = SubcategoryDAO