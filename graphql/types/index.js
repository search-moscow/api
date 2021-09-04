// const { mergeTypeDefs } = require('@graphql-tools/merge');
// const restaurantType = require('./restaurant.type');
// const shopType = require('./shop.type');

// const types = [
//     restaurantType,
//     shopType,
// ];

// module.exports = mergeTypeDefs(types);

const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const typesArray = loadFilesSync(path.join(__dirname, './'), { extensions: ['graphql'] });

module.exports = mergeTypeDefs(typesArray);