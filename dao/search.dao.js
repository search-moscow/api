ObjectID = require('mongodb').ObjectID

let restaurants
let events
let shops
let moscow

class RestaurantDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            restaurants = await moscow.collection("restaurants")
            events = await moscow.collection("events")
            shops = await moscow.collection("shops")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in restaurants DAO: ${e}`,
          )
        }
    }

    static async search(text) {
        const resultsRestaurants = await restaurants
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();
              
        const resultsEvents = await events
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();

        const resultsShops = await shops
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();
            
        const results = [].concat(resultsRestaurants, resultsEvents, resultsShops)

        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = RestaurantDAO;