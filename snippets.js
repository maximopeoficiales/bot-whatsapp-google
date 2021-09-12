let memesData = [];
document.querySelectorAll("#meme option").forEach((e, index) => {
    memesData.push({
        id: index,
        name: e.value, url: `https://apimeme.com/meme?meme=${e.value}&top=&bottom=`
    });
})
console.log(JSON.stringify(memesData, null, 2));
// 

// funciona que busca los resultados de google
let elements = document.querySelectorAll("div .BNeawe.s3v9rd.AP7Wnd div");
let definitionsData = [];
elements.forEach((e, index) => {
    definitionsData.push(e.innerText);
})
definitionsData = definitionsData.filter((item, index) => {
    return definitionsData.indexOf(item) === index;
})
console.log(definitionsData);
