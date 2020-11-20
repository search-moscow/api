ObjectID = require('mongodb').ObjectID

let categories
let moscow

class CategoryDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            categories = await moscow.collection("categories")

        } catch (e) {
          console.error(
            `Unable to establish a collection handle in categories DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await categories.find();
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }

    }

    static async single(id) {
        const result = await categories.findOne({slug: id})
                              
        if (result) {
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = CategoryDAO