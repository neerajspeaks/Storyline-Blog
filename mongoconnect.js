const mongoose = require('mongoose');

const connectToMongo = async (mongoDbUrl) => {
    await mongoose.connect(mongoDbUrl);
};

module.exports = {connectToMongo};