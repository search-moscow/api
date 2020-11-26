ObjectID = require('mongodb').ObjectID

let activities
let moscow

class ActivityDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            activities = await moscow.collection("activities")

        } catch (e) {
          console.error(
            `Unable to establish a collection handle in activities DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await activities
        .aggregate([
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

    static async create(dao, slug, title, dateAdded) {
        const result = await activities.insertOne(
            {
                dao: dao,
                slug: slug,
                title: title,
                dateAdded: dateAdded
            }
        )
        return `New listing created with the following id: ${result.insertedId}`
    }

}

module.exports = ActivityDAO