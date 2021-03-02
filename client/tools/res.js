var json = {
    "files": [
        {
            "name": "pure_json",
            "path": "elimination/image/pure/pure.json",
            "type": 2,
            "frames": [
                "chicken-1", "chicken-2"
            ]
        },
        {
            "name": "item_txt",
            "path": "config/item.txt"
        }
    ]

}

// class EMResourceType {
//     static TEXTURE = 1;
//     static SPRITE_SHEET = 2;
//     static SPRITE_SHEET_FRAME = 3;
//     static TEXT = 4;
//     static JSON = 5;
// };

var all = {
    files: []
};
var lib = require("./js/lib/com/requirecom");
var before = "./../resources/";
var files = (new File(before)).readFilesWithEnd("json");
var sprireSheetTextures = [];
for (let file of files) {
    let url = file.url;
    url = url.slice(before.length, url.length);
    let name = file.name + "_" + file.end;
    name = name.replace(/\./g, "_").toString();
    let isSpriteSheet = false;
    try {
        let cfg = JSON.parse(file.readContent());
        let res = {};
        res.name = name;
        res.path = url;
        res.type = 2;
        res.frames = [];
        for (let k in cfg.frames) {
            res.frames.push(k);
        }
        if (res.frames.length) {
            let texture_url = url.slice(0, url.length - file.name.length - 1 - file.end.length) + cfg.file;
            sprireSheetTextures.push(texture_url);
            // console.error(texture_url);
            isSpriteSheet = true;
            all.files.push(res);
        }
    } catch (e) {

    }
    if (!isSpriteSheet) {
        let url = file.url;
        url = url.slice(before.length, url.length);
        let name = file.name + "_" + file.end;
        name = name.replace(/\./g, "_").toString();
        // console.error(file.url, file.name + "_" + file.end)
        try {
            let res = {};
            res.name = name;
            res.path = url;
            res.type = 5;
            all.files.push(res);
        } catch (e) {

        }
    }
}
let ends = ["txt"];
files = (new File(before)).readFilesWithEnd(ends);
for (let file of files) {
    let url = file.url;
    url = url.slice(before.length, url.length);
    let name = file.name + "_" + file.end;
    name = name.replace(/\./g, "_").toString();
    // console.error(file.url, file.name + "_" + file.end)
    try {
        let res = {};
        res.name = name;
        res.path = url;
        res.type = 4;
        all.files.push(res);
    } catch (e) {

    }
}

ends = ["jpg", "png","jpeg"];
files = (new File(before)).readFilesWithEnd(ends);
for (let file of files) {
    let url = file.url;
    url = url.slice(before.length, url.length);
    if (sprireSheetTextures.indexOf(url) != -1) continue;
    let name = file.name + "_" + file.end;
    name = name.replace(/\./g, "_").toString();
    // console.error(file.url, file.name + "_" + file.end)
    try {
        let res = {};
        res.name = name;
        res.path = url;
        res.type = 1;
        all.files.push(res);
    } catch (e) {

    }
}
let urls = {

};
for (let res of all.files) {
    if (!urls[res.name]) urls[res.name] = [];
    urls[res.name].push(res.path);
}
for (let k in urls) {
    if (urls[k].length > 1) {
        console.error("[错误] 资源名重复:", k, urls[k]);
    }
}
// console.error(all);
(new File(before + "default.res.json")).save(JSON.stringify(all, null, 2));