// if (process.env.NODE_ENV == 'production') {
//     process.env.URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
// } else {
//   process.env.URI = `mongodb://d3c0d3:d3c0d3cgjrbyjrb@130.193.44.49:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Beta&ssl=false`;
// //   process.env.URI = `mongodb://${process.env.NODE_DB}`;
// }

const util = require('util');
const fs = require('fs');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    replSet: {
        sslCA: fs.readFileSync(
        './YandexInternalRootCA.crt')
    }
}

if (process.env.NODE_ENV == 'production') {
  process.env.URI = util.format(
    'mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true',
    'user1',
    'ngM$*6^gWn',
    [
        'rc1b-mjcz7jx2181n7z5f.mdb.yandexcloud.net:27018'
    ].join(','),
    'rs01',
    'db1'
  )

} else if (process.env.NODE_ENV == 'development') {
  process.env.URI = util.format(
    'mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true',
    'user1',
    'ngM$*6^gWn',
    [
        'rc1b-mjcz7jx2181n7z5f.mdb.yandexcloud.net:27018'
    ].join(','),
    'rs01',
    'db1'
  )
} else {
  process.env.URI = `mongodb://localhost`;

}


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const MongoClient = require('mongodb');
const Sitemap = require('./config/sitemap')

var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');
var metrosRouter = require('./routes/metros');
var districtsRouter = require('./routes/districts');
var restaurantsRouter = require('./routes/restaurants');
var spaRouter = require('./routes/spa');
var eventsRouter = require('./routes/events');
var lunchesRouter = require('./routes/lunches');
var shopsRouter = require('./routes/shops');
var servicesRouter = require('./routes/services');
var searchRouter = require('./routes/search');
var widgetRouter = require('./routes/widget');
var activitiesRouter = require('./routes/activities');
var couponsRouter = require('./routes/coupons');
var productsRouter = require('./routes/products');
var realestatesRouter = require('./routes/realestates');
var housesRouter = require('./routes/houses');
var hotelsRouter = require('./routes/hotels');
var newsRouter = require('./routes/news');

var SearchDAO = require('./dao/search.dao');
var CategoryDAO = require('./dao/category.dao');
var SubcategoryDAO = require('./dao/subcategory.dao');
var MetroDAO = require('./dao/metro.dao');
var DistrictDAO = require('./dao/district.dao');
var RestaurantDAO = require('./dao/restaurant.dao');
var SpaDAO = require('./dao/spa.dao');
var EventDAO = require('./dao/event.dao');
var LunchDAO = require('./dao/lunch.dao');
var ShopDAO = require('./dao/shop.dao');
var ServiceDAO = require('./dao/service.dao');
var ActivityDAO = require('./dao/activity.dao');
var CouponDAO = require('./dao/coupon.dao');
var ProductDAO = require('./dao/product.dao');
var RealestateDAO = require('./dao/realestate.dao');
var HouseDAO = require('./dao/house.dao');
var HotelDAO = require('./dao/hotel.dao');
var NewsDAO = require('./dao/news.dao');

var app = express();

app.use(cors({
    origin: ["http://localhost:9000", "http://localhost:4200"], credentials: true
}))

MongoClient(process.env.URI, options).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
  await SearchDAO.injectDB(client)
    await CategoryDAO.injectDB(client)
    await SubcategoryDAO.injectDB(client)
    await MetroDAO.injectDB(client)
    await RestaurantDAO.injectDB(client)
    await SpaDAO.injectDB(client)
    await EventDAO.injectDB(client)
    await LunchDAO.injectDB(client)
    await ShopDAO.injectDB(client)
    await ServiceDAO.injectDB(client)
    await DistrictDAO.injectDB(client)
    await ActivityDAO.injectDB(client)
    await CouponDAO.injectDB(client)
    await ProductDAO.injectDB(client)
    await RealestateDAO.injectDB(client)
    await HouseDAO.injectDB(client)
    await HotelDAO.injectDB(client)
    await NewsDAO.injectDB(client)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/search', searchRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/subcategories', subcategoriesRouter);
app.use('/api/metros', metrosRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/spa', spaRouter);
app.use('/api/events', eventsRouter);
app.use('/api/lunches', lunchesRouter);
app.use('/api/shops', shopsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/widget', widgetRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/products', productsRouter);
app.use('/api/realestates', realestatesRouter);
app.use('/api/houses', housesRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/news', newsRouter);
app.get('/sitemap.xml', Sitemap.index)

module.exports = app;