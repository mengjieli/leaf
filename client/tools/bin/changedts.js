"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./lib/lib");
function changeDTS(url, find, to, before) {
    if (before === void 0) { before = ""; }
    var file = new lib.File(url);
    var content = file.readContent();
    if (content.indexOf('declare namespace orange ') == -1) {
        var str_1 = content + "";
        find.forEach(function (fstr, index) {
            while (str_1.indexOf(fstr) != -1) {
                str_1 = str_1.replace(fstr, to[index]);
            }
        });
        while (str_1.indexOf("declare") != -1) {
            str_1 = str_1.replace("declare", "");
        }
        content = "\n" + content + "\n" + before + "\ndeclare namespace orange {\n" + str_1 + "\n}";
    }
    file.save(content);
}
function replace(url, find, to, before) {
    if (before === void 0) { before = ""; }
    var file = new lib.File(url);
    var content = file.readContent();
    if (content.indexOf('declare namespace orange ') == -1) {
        var str_2 = content + "";
        find.forEach(function (fstr, index) {
            while (str_2.indexOf(fstr) != -1) {
                console.log('replace ', url, fstr, to[index]);
                str_2 = str_2.replace(fstr, to[index]);
            }
        });
        // while (str.indexOf("declare") != -1) {
        //   str = str.replace("declare", "");
        // }
        content = "\n" + str_2 + "\n";
    }
    new lib.File(url).save(content);
}
changeDTS("./libs/orange-modules/egret-extend/egret-extend.d.ts", ['egretExtend', 'egret.DisplayObjectContainer', 'egret.DisplayObject', 'egret.EventDispatcher', 'egret.Sprite', 'egret.CustomFilter', 'egret.Texture'], ['egret', 'egret_DisplayObjectContainer', 'egret_DisplayObject', 'egret_EventDispatcher', 'egret_Sprite', 'egret_CustomFilter', 'egret_Texture'], "\ndeclare class egret_Texture extends egret.Texture { }\ndeclare class egret_CustomFilter extends egret.CustomFilter{}\ndeclare class egret_DisplayObject extends egret.DisplayObject { }\ndeclare class egret_DisplayObjectContainer extends egret.DisplayObjectContainer { }\ndeclare class egret_EventDispatcher extends egret.EventDispatcher { }\ndeclare class egret_Sprite extends egret.Sprite { }\n");
changeDTS("./libs/orange-modules/sync-data/sync-data.d.ts", ['syncData'], ['sync']);
replace("./libs/orange-modules/native/native.d.ts", ['orangeNative'], ['orange']);
//# sourceMappingURL=changedts.js.map