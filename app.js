if (process.env.NODE_ENV == 'production') {
    process.env.URI = "mongodb+srv://admin:VEscgeFSc7bKM1y6@cluster0.ayqqt.gcp.mongodb.net/snake?retryWrites=true&w=majority";
} else {
    process.env.URI = "mongodb://localhost:27017/";
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const MongoClient = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var categoriesRouter = require('./routes/categories');

var UsersDAO = require('./dao/users.dao');
var ItemDAO = require('./dao/item.dao');
var CategoryDAO = require('./dao/category.dao');

var app = express();

MongoClient(process.env.URI).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await UsersDAO.injectDB(client)
    await ItemDAO.injectDB(client)
    await CategoryDAO.injectDB(client)
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
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);

module.exports = app;
