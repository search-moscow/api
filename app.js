if (process.env.NODE_ENV == 'production') {
    process.env.URI = "mongodb://d3c0d3:d3d3c0d3cgjrbyjrb@89.108.103.89:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
} else {
    process.env.URI = "mongodb://localhost:27017/";
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const MongoClient = require('mongodb');
const WebSocket = require('ws');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var categoriesRouter = require('./routes/categories');
var metrosRouter = require('./routes/metros');
var districtsRouter = require('./routes/districts');
var restaurantsRouter = require('./routes/restaurants');
var eventsRouter = require('./routes/events');
var searchRouter = require('./routes/search');
var widgetRouter = require('./routes/widget');

var UsersDAO = require('./dao/users.dao');
var ItemDAO = require('./dao/item.dao');
var CategoryDAO = require('./dao/category.dao');
var MetroDAO = require('./dao/metro.dao');
var DistrictDAO = require('./dao/district.dao');
var RestaurantDAO = require('./dao/restaurant.dao');
var EventDAO = require('./dao/event.dao');

var app = express();

MongoClient(process.env.URI).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await UsersDAO.injectDB(client)
    await ItemDAO.injectDB(client)
    await CategoryDAO.injectDB(client)
    await MetroDAO.injectDB(client)
    await RestaurantDAO.injectDB(client)
    await EventDAO.injectDB(client)
    await DistrictDAO.injectDB(client)
})

app.use(cors())
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
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/metros', metrosRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/widget', widgetRouter);

// Simple server
const wss = new WebSocket.Server({ port: 5050 });

wss.on('connection', function connection(ws) {
  console.log('user connect')
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  
  ws.send(formatAMPM(new Date));

  setInterval(function timeout() {
    ws.send(formatAMPM(new Date));
  }, 1000);

});


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

module.exports = app;
