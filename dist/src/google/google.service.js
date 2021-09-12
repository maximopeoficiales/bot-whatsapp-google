"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const scrapeIt = require("scrape-it");
const ResultGoogle_1 = require("../types/ResultGoogle");
const config_1 = require("../config");
let GoogleService = class GoogleService {
    constructor() {
        this.filterDataNotRepeat = (data) => {
            return data.filter((item, index) => {
                return data.indexOf(item) === index;
            });
        };
        this.filterDataDefinitions = (data) => {
            return this.filterDataNotRepeat(data);
        };
        this.filterLinkImages = (definitionsData) => {
            let filtered = definitionsData.filter((item, index) => {
                if (item.link.includes("/imgres?imgurl")) {
                    item.link = item.link.replace("/imgres?imgurl=", "");
                    item.link = item.link.replace("https://www.google.com", "");
                    item.link = item.link.split("&")[0];
                    return item;
                }
            }).map(e => e.link).filter(e => e.includes(".jpg") || e.includes(".png"));
            return filtered;
        };
        this.searchDefinition = async (definition, fullData = false) => {
            let urlDefinition = `${config_1.config.urlGoogleSearch}${encodeURI(definition)}`;
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
                }
            });
            let definitions = this.filterDataDefinitions(resp.data.definitions);
            let images = this.filterLinkImages(resp.data.images);
            return fullData ? { definitions, images } : {
                definitions: [definitions[0]],
                images: [images[0]],
            };
        };
    }
};
GoogleService = __decorate([
    (0, common_1.Injectable)()
], GoogleService);
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map