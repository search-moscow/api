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

    static async create(slug, title, description, color) {
        const result = await metros.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
                color: color
            }
        )
        return `New listing created with the following id: ${result.insertedId}`
    }

    static async delete(id) {
        const result = await metros.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async update(object) {
        const result = await metros.update(
            { _id: new ObjectID(object.id) },
            {
              $set: {
                slug: object.slug,
                title: object.title,
                description: object.description,
                color: object.color
              }
            }
            )
                          
        if (result) {
            console.log(`Update a listing in the collection:'`);
            return result
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