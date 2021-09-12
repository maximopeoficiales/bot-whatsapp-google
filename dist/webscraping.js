"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDefinition = void 0;
const scrapeIt = require("scrape-it");
const fs = require("fs");
const url = "https://www.google.com.pe/search?q=";
const createFile = (dest, data) => {
    fs.appendFile(dest, data, (err) => {
        if (err)
            throw err;
        console.log('Archivo Creado Satisfactoriamente');
    });
};
const filterDataNotRepeat = (definitionsData) => {
    return definitionsData.filter((item, index) => {
        return definitionsData.indexOf(item) === index;
    });
};
const filterLinkImages = (definitionsData) => {
    let filtered = definitionsData.filter((item, index) => {
        if (item.link.includes("/imgres?imgurl")) {
            item.link = item.link.replace("/imgres?imgurl=", "");
            item.link = item.link.replace("https://www.google.com", "");
            item.link = item.link.split("&")[0];
            return item;
        }
    }).map(e => e.link);
    return filtered;
};
const searchDefinition = async (definition, fullData = false) => {
    let urlDefinition = `${url}${encodeURI(definition)}`;
    let resp = await scrapeIt(urlDefinition, {
        definitions: {
            listItem: "div .BNeawe.s3v9rd.AP7Wnd div",
        },
        images: {
            listItem: "a.BVG0Nb",
            data: {
                link: {
                    attr: "href"
                }
            }
        },
    });
    let definitions = filterDataNotRepeat(resp.data.definitions);
    let images = filterLinkImages(resp.data.images);
    createFile(__dirname + "/index.html", resp.body);
    return fullData ? { definitions, images } : {
        definitions: definitions[0],
        images: images[0],
    };
};
exports.searchDefinition = searchDefinition;
(0, exports.searchDefinition)("perro", true).then(console.log);
//# sourceMappingURL=webscraping.js.map