import { Injectable } from '@nestjs/common';
import * as scrapeIt from "scrape-it";
import { ResultGoogle } from 'src/types/ResultGoogle';
import { config } from '../config'

@Injectable()
export class GoogleService {

    filterDataNotRepeat = (data: string[]) => {
        return data.filter((item, index) => {
            return data.indexOf(item) === index;
        })
    }
    filterDataDefinitions = (data: string[]) => {
        return this.filterDataNotRepeat(data);
    }
    filterLinkImages = (definitionsData: any[]) => {
        let filtered = definitionsData.filter((item, index) => {
            if (item.link.includes("/imgres?imgurl")) {
                item.link = item.link.replace("/imgres?imgurl=", "");
                item.link = item.link.replace("https://www.google.com", "");
                item.link = item.link.split("&")[0];
                return item;
            }
        }).map(e => e.link).filter(e => e.includes(".jpg") || e.includes(".png"));
        return filtered as string[];
    }
    searchDefinition = async (definition: string, fullData: boolean = false): Promise<ResultGoogle> => {
        let urlDefinition = `${config.urlGoogleSearch}${encodeURI(definition)}`;
        let resp = await scrapeIt<any>(urlDefinition, {
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
        let definitions = this.filterDataDefinitions(resp.data.definitions as string[]);
        let images = this.filterLinkImages(resp.data.images);

        return fullData ? { definitions, images } : {
            definitions: [definitions[0]],
            images: [images[0]],
        }
    }

}
