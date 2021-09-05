const { mergeResolvers } = require('@graphql-tools/merge');
const restaurantResolver = require('./restaurant.resolver');
const shopResolver = require('./shop.resolver');
const product = require('./product');

const resolvers = [
    restaurantResolver,
    shopResolver,
    product,
];

module.exports = mergeResolvers(resolvers);

// const path = require('path');
// const { mergeResolvers } = require('@graphql-tools/merge');
// const { loadFilesSync } = require('@graphql-tools/load-files');

// const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

// module.exports = mergeResolvers(resolversArray);