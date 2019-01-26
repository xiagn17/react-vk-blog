const express = require('express');
const io = require('socket.io')();
const path = require('path');

const pullData = require('./db/pullData');
const connectDB = require('./db/connectDB');
const {
    webhookUpdates,
    updates
} = require('./vkPuller');


const {
    PORT,
    VK_WEBHOOK_PATH
} = require('./constants');




const app = express();


app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(VK_WEBHOOK_PATH, updates.getWebhookCallback());



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/posts', (req, res) => {

    const page = Number(req.query.page);
    const count = (req.query.count === 'null') ? true : false;
    const { clientDB } = app.locals;

    if (clientDB) {
        pullData(clientDB, 'posts', {
            page,
            count
        })
            .then(posts =>
                res.json(posts)
            );
    }

});




const server = app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}`);

    io.listen(server);
    webhookUpdates(io);
});


connectDB()
    .then(client => {
        app.locals.clientDB = client;
    })
    .catch(err => {
        console.log(err);
    });







