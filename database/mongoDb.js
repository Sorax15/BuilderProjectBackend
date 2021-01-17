const mongoose = require('mongoose');
const dataBaseConf = require('../config/database');

mongoose.connect(dataBaseConf.mongoUrl)
    .then(() => console.log('MongoDb connection'))
    .catch((error) => console.error(error));


module.exports = mongoose;