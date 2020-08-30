if (process.env.NODE_ENV == 'production') {
    process.env.URI = "mongodb://d3c0d3:d3d3c0d3cgjrbyjrb@mongo:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
} else {
    process.env.URI = "mongodb://localhost:27017/";
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const MongoClient = require('mongodb');
const expressSitemapXml = require('express-sitemap-xml')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
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
var ownersRouter = require('./routes/owners');
var activitiesRouter = require('./routes/activities');

var SearchDAO = require('./dao/search.dao');
var UsersDAO = require('./dao/users.dao');
var ItemDAO = require('./dao/item.dao');
var CategoryDAO = require('./dao/category.dao');
var MetroDAO = require('./dao/metro.dao');
var DistrictDAO = require('./dao/district.dao');
var RestaurantDAO = require('./dao/restaurant.dao');
var EventDAO = require('./dao/event.dao');
var LunchDAO = require('./dao/lunch.dao');
var ShopDAO = require('./dao/shop.dao');
var ServiceDAO = require('./dao/service.dao');
var OwnersDAO = require('./dao/owners.dao');
var ActivityDAO = require('./dao/activity.dao');

var app = express();

MongoClient(process.env.URI).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
  await SearchDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await ItemDAO.injectDB(client)
    await CategoryDAO.injectDB(client)
    await MetroDAO.injectDB(client)
    await RestaurantDAO.injectDB(client)
    await EventDAO.injectDB(client)
    await LunchDAO.injectDB(client)
    await ShopDAO.injectDB(client)
    await ServiceDAO.injectDB(client)
    await DistrictDAO.injectDB(client)
    await OwnersDAO.injectDB(client)
    await ActivityDAO.injectDB(client)
})

app.use(cors({
    origin:
      ["http://localhost:4200", "https://search.moscow", "http://localhost:4000", "http://search.moscow:4000"]
    , credentials: true
  }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSitemapXml(getUrls, 'https://search.moscow/'))
 
async function getUrls () {
    let restaurants = await RestaurantDAO.getAll()
    let events = await EventDAO.getAll()
    let shops = await ShopDAO.getAll()
    let services = await ServiceDAO.getAll()
    let urls

    urls1 = restaurants.map((res) => { return 'restaurants/' + res.slug })
    urls2 = events.map((res) => { return 'events/' + res.slug })
    urls3 = shops.map((res) => { return 'shops/' + res.slug })
    urls3 = services.map((res) => { return 'services/' + res.slug })

    return [].concat(urls1, urls2, urls3)
  }

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/search', searchRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/metros', metrosRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/lunches', lunchesRouter);
app.use('/api/shops', shopsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/widget', widgetRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/activities', activitiesRouter);



module.exports = app;
