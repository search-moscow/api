ObjectID = require('mongodb').ObjectID

let metros
let moscow

class MetroDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            metros = await moscow.collection("metros")

        } catch (e) {
          console.error(
            `Unable to establish a collection handle in metros DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await metros.find();
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }

    }

    static async single(id) {
        const result = await metros.findOne({slug: id})
                              
        if (result) {
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = MetroDAO