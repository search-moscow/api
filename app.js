if (process.env.NODE_ENV == 'production') {
    process.env.URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
} else {
  process.env.URI = `mongodb://${process.env.NODE_DB}`;
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const MongoClient = require('mongodb');
const Sitemap = require('./config/sitemap')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var metrosRouter = require('./routes/metros');
var districtsRouter = require('./routes/districts');
var restaurantsRouter = require('./routes/restaurants');
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
var hotelsRouter = require('./routes/hotels');

var SearchDAO = require('./dao/search.dao');
var UsersDAO = require('./dao/users.dao');
var CategoryDAO = require('./dao/category.dao');
var MetroDAO = require('./dao/metro.dao');
var DistrictDAO = require('./dao/district.dao');
var RestaurantDAO = require('./dao/restaurant.dao');
var EventDAO = require('./dao/event.dao');
var LunchDAO = require('./dao/lunch.dao');
var ShopDAO = require('./dao/shop.dao');
var ServiceDAO = require('./dao/service.dao');
var ActivityDAO = require('./dao/activity.dao');
var CouponDAO = require('./dao/coupon.dao');
var ProductDAO = require('./dao/product.dao');
var RealestateDAO = require('./dao/realestate.dao');
var HotelDAO = require('./dao/hotel.dao');

var app = express();

MongoClient(process.env.URI).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
  await SearchDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await CategoryDAO.injectDB(client)
    await MetroDAO.injectDB(client)
    await RestaurantDAO.injectDB(client)
    await EventDAO.injectDB(client)
    await LunchDAO.injectDB(client)
    await ShopDAO.injectDB(client)
    await ServiceDAO.injectDB(client)
    await DistrictDAO.injectDB(client)
    await ActivityDAO.injectDB(client)
    await CouponDAO.injectDB(client)
    await ProductDAO.injectDB(client)
    await RealestateDAO.injectDB(client)
    await HotelDAO.injectDB(client)
})

app.use(cors({
  origin: [
    "http://localhost:4200",
    "http://localhost:4210",
    "https://search.moscow",
    "http://admin.search.moscow",
    "http://localhost:4000",
    "http://search.moscow:4000"
  ], credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/search', searchRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/metros', metrosRouter);
app.use('/api/restaurants', restaurantsRouter);
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
app.use('/api/hotels', hotelsRouter);
app.get('/sitemap.xml', Sitemap.index)

module.exports = app;