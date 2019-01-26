const MongoClient = require('mongodb').MongoClient;


const {
    DB_NAME,
    MONGO_SERVER_URL,
    DB_COLLECTION_POSTS
} = require('../constants');



const pushToDBase = object =>
    MongoClient.connect(`${MONGO_SERVER_URL}/${DB_NAME}`, {useNewUrlParser: true})
        .then(client => {
            console.log('Connected successfully to server to post the data');

            const db = client.db();


            db.collection(DB_COLLECTION_POSTS).insertOne({
                ...object
            });


            client.close();
        })
        .catch(err => console.error(err));




module.exports = pushToDBase;