const { mergeResolvers } = require('@graphql-tools/merge');
const restaurant = require('./restaurant');
const shopResolver = require('./shop.resolver');
const product = require('./product');
const news = require('./news');

const resolvers = [
    restaurant,
    shopResolver,
    product,
    news
];

module.exports = mergeResolvers(resolvers);

// const path = require('path');
// const { mergeResolvers } = require('@graphql-tools/merge');
// const { loadFilesSync } = require('@graphql-tools/load-files');

// const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

// module.exports = mergeResolvers(resolversArray);