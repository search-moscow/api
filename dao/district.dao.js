ObjectID = require('mongodb').ObjectID

let districts
let moscow

class DistrictDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            districts = await moscow.collection("districts")

        } catch (e) {
          console.error(
            `Unable to establish a collection handle in districts DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await districts.find();
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }

    }

    static async single(id) {
        const result = await districts.findOne({slug: id})
                              
        if (result) {
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }
}

module.exports = DistrictDAO