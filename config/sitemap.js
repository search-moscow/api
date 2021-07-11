const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

var RestaurantDAO = require('../dao/restaurant.dao');
var EventDAO = require('../dao/event.dao');
var ShopDAO = require('../dao/shop.dao');
var ServiceDAO = require('../dao/service.dao');
var CouponDAO = require('../dao/coupon.dao');
var ProductDAO = require('../dao/product.dao');
var RealestateDAO = require('../dao/realestate.dao');
var HotelDAO = require('../dao/hotel.dao');
var HouseDAO = require('../dao/house.dao');
var NewsDAO = require('../dao/news.dao');

let sitemap

class Sitemap {

    static async index(req, res) {
        
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');
        
        // if we have a cached entry send it
        if (sitemap) {
            res.send(sitemap)
            return
        }
       
        try {
            const smStream = new SitemapStream({ hostname: 'https://search.moscow/', lastmodDateOnly: true, xmlns: {image: false}})
            const pipeline = smStream.pipe(createGzip())
            // pipe your entries or directly write them.
          
            // let restaurants = await RestaurantDAO.getAll()
            // let events = await EventDAO.getAll()
            let shops = await ShopDAO.getAll()
            // let services = await ServiceDAO.getAll()
            // let realestates = await RealestateDAO.getAll()
            // let hotels = await HotelDAO.getAll()
            // let houses = await HouseDAO.getAll()
            let news = await NewsDAO.getAll()
            let products = await ProductDAO.getAll()
      
            // restaurants.map((res) => {
            //     smStream.write({
            //         url: 'restaurants/' + res.slug,
            //         changefreq: 'weekly',
            //         lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
            //         priority: 0.5
            //     })
            // })
      
            shops.map((res) => {
                smStream.write({
                    url: 'shops/' + res.slug,
                    changefreq: 'weekly',
                    lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
                    priority: 0.5
                })
            })
      
            // services.map((res) => {
            //     smStream.write({
            //         url: 'services/' + res.slug,
            //         changefreq: 'weekly',
            //         lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
            //         priority: 0.5
            //     })
            // })
      
            // realestates.map((res) => {
            //     smStream.write({
            //         url: 'realestates/' + res.slug,
            //         changefreq: 'weekly',
            //         lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
            //         priority: 0.5
            //     })
            // })

            // houses.map((res) => {
            //     smStream.write({
            //         url: 'houses/' + res.slug,
            //         changefreq: 'weekly',
            //         lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
            //         priority: 0.5
            //     })
            // })

            news.map((res) => {
                smStream.write({
                    url: 'news/' + res.slug,
                    changefreq: 'weekly',
                    lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
                    priority: 0.5
                })
            })

            products.map((res) => {
                smStream.write({
                    url: 'products/' + res.slug,
                    changefreq: 'weekly',
                    lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
                    priority: 0.5
                })
            })
      
            // hotels.map((res) => {
            //     smStream.write({
            //         url: 'hotels/' + res.slug,
            //         changefreq: 'weekly',
            //         lastmod: `${new Date(res.lastModified).getUTCFullYear()}-${new Date(res.lastModified).getUTCMonth()+1}-${new Date(res.lastModified).getUTCDate()+1}`,
            //         priority: 0.5
            //     })
            // })
            
            // cache the response
            streamToPromise(pipeline).then(sm => sitemap = sm)
            // make sure to attach a write stream such as streamToPromise before ending
            smStream.end()
            // stream write the response
            pipeline.pipe(res).on('error', (e) => {throw e})
      
        } catch (e) {
          console.error(e)
          res.status(500).end()
        }
    }
}

module.exports = Sitemap