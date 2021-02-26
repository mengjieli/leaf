"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./lib/lib");
var file = new lib.File("./../Eliminate_wxgame/resource/version.json");
var content = file.readContent();
// console.log(content);

var json = JSON.parse(content);

var fileName = json["eui_skins/total_EUI.json"] + ".json";


var all = {

}

var preloadingEUI = ["RankV4Bg", "skins.EmptyScrollerSkin", "skins.EmptyButtonSkin", "RedPackageButtonSkin", "RankV4Bg$Skin3", "MainSiderButtonSkin", "MainStartButtonSkin", "MainMasterAndAppsButtonSkin", "RankTabSkin", "RankTabSkin", "RankTabSkin", "RankItemSkin", "RankItemSkin", "RankItemSkin", "RankItemSkin", "RankItemSkin", "RankItemSkin", "EverydayRewardBg", "GreenButtonSkin"];

for (let k in json) {
    if (k.indexOf(".json") != -1) {
        var fileName = json[k] + ".json";
        var file = new lib.File("./../Elimination_resource/resource/assets/" + fileName);
        content = file.readContent();
        // let cfg = JSON.parse(content);
        k = k.split("/")[k.split("/").length - 1];
        if (k == "config.json") {
            // console.error(typeof content)
            let cfg = JSON.parse(content);
            for (let k in cfg.GameLevel) {
                let stg = cfg.GameLevel[k];
                if (stg.stageId > 0) delete cfg.GameLevel[k];
            }
            content = JSON.stringify(cfg);
        }
        // all[k] = content;//JSON.parse(content);
        console.log(k)
        if (k == 'total_EUI.json') {
            let eui = JSON.parse(content);
            let preEUI = {};
            let otherEUI = {};
            for (let k in eui) {
                if (preloadingEUI.indexOf(k) != -1) {
                    preEUI[k] = eui[k];
                } else {
                    preEUI[k] = eui[k];
                }
            }
            var file = new lib.File("./../Eliminate_wxgame/resource/total_EUI.txt");
            // file.save(lib.compressJSON(content, k == "config.json" ? true : false));
            file.save(lib.compressJSON(JSON.stringify(preEUI), false));
            var file = new lib.File("./../Eliminate_wxgame/resource/total_EUI2.txt");
            // file.save(lib.compressJSON(content, k == "config.json" ? true : false));
            file.save(lib.compressJSON(JSON.stringify(otherEUI), false));
        } else {
            var file = new lib.File("./../Eliminate_wxgame/resource/" + k.split(".")[0] + ".txt");
            file.save(lib.compressJSON(content, k == "config.json" ? true : false));
        }
    }
}


// // var file = new lib.File("./../Elimination_resource/resource/assets/" + json["eui_skins/total_EUI.json"] + ".json");
// var file = new lib.File("./../Eliminate_wxgame/resource/eui_skins/total_EUI.json");
// // content = file.readContent();
// // let cfg = JSON.parse(content);
// file.save(lib.compressJSON(all));

// file.save((JSON.stringify(all)));

var ff = new lib.File("./../Eliminate_wxgame/resource/assets");
ff.delete();

ff = new lib.File("./../Eliminate_wxgame/resource/linshi");
ff.delete();

ff = new lib.File("./../Elimination_resource/resource/assets/atlas");
ff.delete();
// ff = new lib.File("./../Elimination_resource/resource/assets/dragonBones");
// ff.delete();
ff = new lib.File("./../Elimination_resource/resource/assets/samples");
ff.delete();
ff = new lib.File("./../Elimination_resource/resource/assets/scattered");
ff.delete();

var file = new lib.File("./../Eliminate/resource/assets");
var list = file.readFilesWithEnd(["png", "jpg"]);
// console.log(list)
for (let f of list) {
    if (f.url.indexOf("/samples/") != -1) continue;
    if (f.url.indexOf("/dragonBones/") != -1) continue;
    if (f.url.indexOf("/goose/") != -1) continue;
    if (f.url.indexOf("/linshi/") != -1) continue;
    // if (f.url.indexOf("pure.png") != -1) continue;
    // if (f.url.indexOf("common.png") != -1) continue;
    // if (f.url.indexOf("common2.png") != -1) continue;
    // if (f.url.indexOf("commonbig.png") != -1) continue;
    if (!(
        f.url.indexOf("scattered/pure/") != -1 ||

        f.url.indexOf("title.png") != -1 ||
        f.url.indexOf("farmv3.png") != -1 ||
        f.url.indexOf("icon.png") != -1 ||
        f.url.indexOf("levelui.png") != -1 ||
        f.url.indexOf("levelui2.png") != -1 ||
        f.url.indexOf("levelui3.png") != -1 ||
        // f.url.indexOf("purebig.png") != -1 ||
        // f.url.indexOf("newcommer.png") != -1 ||
        f.url.indexOf("local.png") != -1 ||
        f.url.indexOf("pure2.png") != -1 ||
        f.url.indexOf("pure26.png") != -1 ||
        f.url.indexOf("pure28.png") != -1 ||
        f.url.indexOf("pure29.png") != -1 ||
        f.url.indexOf("pure32.png") != -1 ||
        f.url.indexOf("pure34.png") != -1 ||
        f.url.indexOf("pure41.png") != -1 ||
        f.url.indexOf("pure43.png") != -1 ||
        f.url.indexOf("pure45.png") != -1 ||
        f.url.indexOf("pure46.png") != -1 ||
        f.url.indexOf("pureitem4.png") != -1 ||
        f.url.indexOf("sider-img1.png") != -1 ||
        f.url.indexOf("levelui-img-progress2.png") != -1 ||
        f.url.indexOf("common.png") != -1 ||
        f.url.indexOf("common2.png") != -1 ||
        f.url.indexOf("commonbig.png") != -1 ||
        f.url.indexOf("bg_mainscene.jpg") != -1
    )) continue;
    if (f.url.indexOf("editor.png") != -1) continue;
    let sf = new lib.File("./../Eliminate_wxgame/resource/" + f.url.split("/resource/")[1])
    sf.save(f.readContent("binary"), "binary");
}

// console.log(content);
//# sourceMappingURL=main.js.map