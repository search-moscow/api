ObjectID = require('mongodb').ObjectID

let categories
let snake

class CategoryDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            snake = await conn.db('snake')
            categories = await snake.collection("categories")

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

    static async create(slug, title, description) {
        const result = await categories.insertOne(
            {
                slug: slug,
                title: title,
                description: description,
            }
        )
        return `New listing created with the following id: ${result.insertedId}`
    }

    static async delete(id) {
        const result = await categories.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async update(object) {
        const result = await categories.update(
            { _id: new ObjectID(object.id) },
            {
              $set: {
                slug: object.slug,
                title: object.title,
                description: object.description
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
}

module.exports = CategoryDAO