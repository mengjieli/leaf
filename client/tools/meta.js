var UUID = require('uuid');
require("./js/lib/com/requirecom");

let ends = ["ts", "png", "jpg", "json", "txt"];
let files = (new File("./../resources")).readFilesWithEnd(ends);
let files2 = (new File("./../src")).readFilesWithEnd(ends);
let list = files.concat(files2);
let urlMeta = {};
for (let file of list) {
    if (!checkMetaExist(file.url)) {
        createMeta(file.url);
    } else {
        readMeta(file.url);
    }
    checkMD5(file.url);
}

function checkMetaExist(url) {
    url += ".meta";
    return (new File(url)).isExist();
}

function createMeta(url) {
    let oldURL = url;
    url += ".meta";
    let json = {
        "uuid": UUID.v1()
    };
    urlMeta[oldURL] = json.uuid;
    (new File(url)).save(JSON.stringify(json, null, 2));
}

function readMeta(url) {
    let oldURL = url;
    url += ".meta";
    let json = JSON.parse(
        (new File(url)).readContent()
    );
    urlMeta[oldURL] = json.uuid;
}

function checkMD5(url) {
    let md5 = md5Binary((new File(url)).readContent("binary", "Buffer"));
    let meta = urlMeta[url];
    let oldmd5 = "";
    let md5url = "./../temp/hash/" + meta + ".hash";
    let file = new File(md5url);
    if (file.isExist()) {
        oldmd5 = file.readContent();
    }
    if (oldmd5 != md5) {
        file.save(md5);
        fileMD5Change(url);
    }
}

function fileMD5Change(url) {
    let meta = urlMeta[url];
    let file = new File(url);
    if (file.end === "ts") {
        (new File("./../temp/src/" + meta + ".ts")).save((new File(url)).readContent());
    }
}

checkMD5("./meta.js");

// console.error(urlMeta)
let metas = {};
let urls = {};
for (let k in urlMeta) {
    metas[urlMeta[k]] = k.replace(/\.\/\.\.\//g, "");
    urls[k.replace(/\.\/\.\.\//g, "")] = urlMeta[k];
}
(new File("./../tmp/metas.json")).save(JSON.stringify({
    metas, urls
}, null, 2));