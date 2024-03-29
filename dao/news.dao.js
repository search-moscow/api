ObjectID = require('mongodb').ObjectID

let news
let moscow

class NewsDAO {

    static async injectDB(conn) {
        try {
            // process.env.MFLIX_NS
            moscow = await conn.db('moscow')
            news = await moscow.collection("news")
        //   this.movies = movies // this is only for testing
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in news DAO: ${e}`,
          )
        }
    }

    static async getCount() {
        const result = await news.count()

        if (result) {
            console.log(`Found a count in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

    static async findAll() {
        const cursor = await news
            .aggregate([
                { $match: { status: true }},
                { $sort: {_id: -1 }}
            ])
        
        const results = await cursor.toArray();
                          
        if (results) return results
    }

    static async findHome() {
        const cursor = await news
            .aggregate([
                { $match: { status: true }},
                { $sort: {_id: -1 }},
                { $limit: 3 }
            ]);
        
        const results = await cursor.toArray();
                          
        if (results) return results
    }

    static async findLast() {
        const cursor = await news
            .aggregate([
                { $match: { status: true }},
                { $sort: { _id: -1 }},
                { $limit: 3 }
            ]);
        
        const results = await cursor.toArray();
                          
        if (results) return results
    }

    static async findOne(id) {
        const cursor = news
            .aggregate([
                { $match:{slug: id}},
                { $limit: 1 }
            ]);
    
        const result = await cursor.toArray();
                              
        if (result) {
            await news.update(
                { slug: id },
                { $inc: { views: 1} }
            );
    
            console.log(`Found a listing in the collection:'`);
            return result
        } else {
            console.log(`No listings found`);
        }
    }

}

module.exports = NewsDAO;