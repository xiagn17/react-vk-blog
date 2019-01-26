const MongoClient = require('mongodb').MongoClient;
const Promise = require('promise');

const {
    DB_NAME,
    MONGO_SERVER_URL
} = require('../constants');


const connectDB = () =>
    new Promise((resolve, reject) =>
        MongoClient.connect(`${MONGO_SERVER_URL}/${DB_NAME}`, { useNewUrlParser: true })
            .then(db => {
                console.log("Successfully connected to the DB");
                resolve(db);
            })
            .catch(err => reject(err))
    );


module.exports = connectDB;