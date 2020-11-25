ObjectID = require('mongodb').ObjectID

let restaurants
let realestates
let events
let shops
let services
let moscow

class RestaurantDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            restaurants = await moscow.collection("restaurants")
            realestates = await moscow.collection("realestates")
            events = await moscow.collection("events")
            shops = await moscow.collection("shops")
            services = await moscow.collection("services")
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
                { $addFields: { "dao":"restaurants" }},
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();

        const resultsRealestates = await realestates
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $addFields: { "dao":"realestates" }},
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();
              
        const resultsEvents = await events
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $addFields: { "dao":"events" }},
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();

        const resultsShops = await shops
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $addFields: { "dao":"shops" }},
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();

        const resultsServices = await services
            .aggregate([
                { $match: { $text: { $search: text } } },
                { $addFields: { "dao":"services" }},
                { $sort: { score: { $meta: "textScore" } } },
            ]).toArray();
            
        const results = [].concat(resultsRestaurants, resultsRealestates, resultsEvents, resultsShops, resultsServices)

        if (results) {
            console.log(`Found a listing in the collection:'`);
            return results
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = RestaurantDAO;