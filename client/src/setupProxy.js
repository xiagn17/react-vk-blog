const proxy = require('http-proxy-middleware');

const { PORT } = require('../../constants');

module.exports = function(app) {
    app.use(proxy('/posts', { target: `http://localhost:${PORT}/` }));
};