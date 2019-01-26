const Promise = require('promise');

const {
    POSTS_PAGE_LIMIT
} = require('../constants');

const pullData = (client, collection, params = {
    page: 1,
    count: false
}) => {
    const table = collection;

    return new Promise((resolve, reject) => {

        const collection = client.db().collection(table);
        const skipTo = (params.page - 1) * POSTS_PAGE_LIMIT;

        if (params.count) {
            var count = collection.find().count();
        }

        collection.find().sort({ unixTime: -1 })
            .skip(skipTo).limit(POSTS_PAGE_LIMIT)
            .toArray((err, items) => {
                if (err) {
                    reject(err);
                }
                else {
                    count ?
                        count.then(count => {
                            resolve({
                                articles: items,
                                count
                            });
                        })
                        :
                        resolve({
                            articles: items
                        });
                }
            });
    })
        .catch(err => console.log(err));

};


module.exports = pullData;

