const axios = require('axios');
const Promise = require('promise');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();
const parseString = xml2js.parseString;


const parseXML = (link) =>
    new Promise((resolve, reject) =>
        axios(link)
            .then(resp => {
                let xmlStr = resp.data;

                const baseTag = /<base.*/gmi;
                const metaTag = /<meta.*utf-.*/gmi;
                const ampersandsReg = /&(?!(?:#\d+|#x[0-9a-f]+|\w+);)/gmi;

                xmlStr = xmlStr
                    .regDelete(baseTag)
                    .regDelete(metaTag)
                    .replace(ampersandsReg, '&amp;');

                parseString(xmlStr, (err, res) => {
                    if (err) {
                        throw new Error(err);
                    }

                    const article_content = res.html.body[0].div[0].div[1].div[1].div[0].div[1].div[0].div[1].div[0].div[0];
                                // res.html.body[0].div[0].div[1].div[1].div[0].div[2].div[0].div[1].div[0].div[0]  = for production because cookie policy
                    let header = article_content.h1[0]['_'];
                    let picUrl;

                    if (article_content.hasOwnProperty('figure')) {
                        const picStr = article_content.figure[0].div[0].div[0].div[0]['$']['data-sizes'];

                        let largePic = picStr.split(']');
                        largePic = largePic[largePic.length - 3];

                        const urlPattern = /https.*\.jpg/gi;
                        picUrl = largePic.match(urlPattern)[0]
                            .replace(/\\\//gmi, '/');

                        delete article_content['figure'];
                    }

                    delete article_content['h1'];
                    delete article_content['div'];

                    let content = builder.buildObject(article_content);

                    const rootTag = /<.*root.*>\n?/gi;
                    const xmlTag = /<\?xml.*>\n?/gi;

                    content = content.regDelete(rootTag, xmlTag);


                    resolve({
                        header,
                        picUrl,
                        content
                    });
                });

            })
            .catch(err => {
                console.log(err);

                reject(err);
            }));




String.prototype.regDelete = function () {
    const args = Array.from(arguments);
    let string = this;

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];

        string = string.replace(arg, '');

        if (i === arguments.length - 1) {
            return string;
        }
    }
};


module.exports = parseXML;

