ObjectID = require('mongodb').ObjectID

let owners
let moscow

class RestaurantDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            owners = await moscow.collection("owners")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in owners DAO: ${e}`,
          )
        }
    }

    static async getAll() {
        const cursor = await owners.find();
        const results = await cursor.toArray();
                          
        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

    static async create(shop, user) {

        const result = await owners.insertOne(
            {
                shop_id: shop,
                user_id: user,
                type: 'shop'
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

    static async createOfRestaurant(restaurant, user) {

        const result = await owners.insertOne(
            {
                document_id: restaurant,
                user_id: user,
                type: 'restaurant'
            }
        );
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

    static async getBy(id) {
        const result = await owners.findOne({ _id: new ObjectID(id) })
                              
        if (result) {
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async update(object) {
        const result = await owners.update(
            { _id: new ObjectID(object.id) },
            {
              $set: {
                shop_id: object.shop,
                user_id: object.user
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

    static async delete(id) {
        const result = await owners.deleteOne( { _id: new ObjectID(id) } )
                          
        if (result) {
            console.log(`Delete a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }
    static async check(id) {
        const cursor = owners
        .aggregate([
            { $match:{user_id: id}},
            { $addFields: { "shop": { $toObjectId: "$shop_id"}}},
            { $lookup: { from: "shops", localField: "shop", foreignField: "_id", as: "shops" } }
            // { $limit: 1 }
        ]);

        const result = await cursor.toArray();

                          
        if (result) {
            console.log(result)
            console.log(`Check a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async checkOfRestaurants(id) {
        const cursor = owners
        .aggregate([
            { $match:{user_id: id}},
            { $addFields: { "restaurant": { $toObjectId: "$restaurant_id"}}},
            { $lookup: { from: "restaurants", localField: "restaurant", foreignField: "_id", as: "restaurants" } }
            // { $limit: 1 }
        ]);

        const result = await cursor.toArray();

                          
        if (result) {
            console.log(result)
            console.log(`Check a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = RestaurantDAO;