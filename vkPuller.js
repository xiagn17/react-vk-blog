const { VK } = require('vk-io');

const pushToDBase = require('./db/pushToDBase');
const parseXML = require('./actions/parseXML');

const {
    GROUP_ID,
    VK_APP_ID,
    VK_TOKEN,
    VK_GROUP_SCOPE,
    VK_WEBHOOK_SECRET,
    VK_WEBHOOK_CONF
} = require('./constants');



const vk = new VK();
vk.setOptions({
    appId: VK_APP_ID,
    token: VK_TOKEN,
    authScope: VK_GROUP_SCOPE,
    pollingGroupId: GROUP_ID,
    webhookSecret: VK_WEBHOOK_SECRET,
    webhookConfirmation: VK_WEBHOOK_CONF
});

const { updates } = vk;


const webhookUpdates = (io) =>
    (function () {

        updates.on('new_wall_post', (context, next) => {
            console.log('Update has caught!');

            const NEGATIVE_GROUP_ID = -GROUP_ID;
            const wallObject = context.wall || null;

            if (!context.isRepost && wallObject
                && wallObject.authorId === NEGATIVE_GROUP_ID && !wallObject.hasAds) {

                const url = findArticleUrl(wallObject);

                if (url) {
                    parseXML(url).then(data => {
                        const {createdAt, text} = wallObject;
                        const postINFO = {
                            unixTime: createdAt,
                            text,
                            article: {
                                ...data
                            }
                        };

                        pushToDBase(postINFO);

                        io.sockets.emit('new_post');

                    });
                }
            }
        });

    }());






const findArticleUrl = (wallObject) => {
    const attachments = wallObject.getAttachments('link') || [];

    for (let i = 0; i < attachments.length; i++) {
        let attach = attachments[i];

        if (attach && attach.caption === 'm.vk.com' && attach.url) {
            return attach.url
                .replace(/(.*)(m\.)(.*)/gi, '$1$3');
        }
    }

    return null;
};






module.exports = {
    webhookUpdates,
    updates
};

