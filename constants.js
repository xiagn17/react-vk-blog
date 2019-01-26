const MONGO_SERVER_URL = 'mongodb://sweetnik:18102000nN@ds111765.mlab.com:11765';
const DB_NAME = 'blog';
const DB_COLLECTION_POSTS = 'posts';

const PORT = process.env.PORT || 4000;

const VK_APP_ID = 6804979;
const VK_TOKEN = '3b4a681d1b830ee237727f7992c2216235c0dfa8b83d2d94f4c25c2dde9b823a3493978364718b43d6af5';
const VK_GROUP_SCOPE = 'messages,manage';
const VK_WEBHOOK_SECRET = 'secret_N_g11';
const VK_WEBHOOK_CONF = 'c3c0a51d';
const VK_WEBHOOK_PATH = '/webhook';
const GROUP_ID = 176087653;

const POSTS_PAGE_LIMIT = 3;



module.exports = Object.freeze({
    GROUP_ID,
    MONGO_SERVER_URL,
    DB_NAME,
    DB_COLLECTION_POSTS,
    VK_APP_ID,
    VK_TOKEN,
    VK_GROUP_SCOPE,
    VK_WEBHOOK_SECRET,
    VK_WEBHOOK_CONF,
    VK_WEBHOOK_PATH,
    PORT,
    POSTS_PAGE_LIMIT
});






