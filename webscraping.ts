import * as scrapeIt from "scrape-it";
import * as fs from 'fs';


const url = "https://www.google.com.pe/search?q=";
const createFile = (dest: string, data: string) => {
    fs.appendFile(dest, data, (err) => {
        if (err) throw err;
        console.log('Archivo Creado Satisfactoriamente');
    });
}

const filterDataNotRepeat = (definitionsData: string[]) => {
    return definitionsData.filter((item, index) => {
        return definitionsData.indexOf(item) === index;
    })
}

const filterLinkImages = (definitionsData: any[]) => {
    let filtered = definitionsData.filter((item, index) => {
        if (item.link.includes("/imgres?imgurl")) {
            item.link = item.link.replace("/imgres?imgurl=", "");
            item.link = item.link.replace("https://www.google.com", "");
            item.link = item.link.split("&")[0];
            return item;
        }
    }).map(e => e.link);
    return filtered as string[];
}
export const searchDefinition = async (definition: string, fullData: boolean = false): Promise<any> => {
    let urlDefinition = `${url}${encodeURI(definition)}`;
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
        },


    });
    let definitions = filterDataNotRepeat(resp.data.definitions as string[]);
    let images = filterLinkImages(resp.data.images);
    createFile(__dirname + "/index.html", resp.body);
    return fullData ? { definitions, images } : {
        definitions: definitions[0],
        images: images[0],
    }
}

export const searchImages = async (search: string): Promise<any> => {
    search = encodeURI(search);
    let resp = await scrapeIt<any>(`https://www.google.com.pe/search?q=${search}&sxsrf=AOaemvJcuJGnW-kgddjlV1jI4GWbm40bMg:1631465768765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwivz_DM8_nyAhU7JrkGHTsyCCcQ_AUIBigB`, {

        images: {
            listItem: ".NZWO1b img.yWs4tf",
            data: {
                link: {
                    attr: "src"
                }
            }
        },


    });
    console.log(resp.data.images.map(e => e.link));

}


searchImages("Angel Monje").then(console.log);

