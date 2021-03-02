////////////////////////Readme////////////////////////////
//目前支持的语言有  ts  go
//语言参数 --l=ts
//输出目录 --out=./ts
//配置文件目录  --dir=./config
//配置文件 --file=./config/item.xlsx
//////////////////////////////////////////////////////////
require("./../lib/com/requirecom");
require("./Type");
require("./go/Go");
require("./ts/TS");
require("./data/ConfigBase")
require("./data/ConfigV1")
require("./data/ConfigV2")
require("./FileParse")
var csv = require("./../../bin/lib/utils/csv");

// var args = process.argv;

function configTool(args) {

    var newVersion = 2;
    var Language = new Enum(["ts", "go"]);
    var language = "";
    var outURL = "./";
    var flag = true;
    var files = [];
    var params = {};

    global.params = params;
    global.jsons = {};

    // console.log(args);

    for (let i = 0; i < args.length; i++) {
        let param = args[i];
        if (param.slice(0, 2) == "--") {
            if (param.indexOf("=") >= 0) {
                let paramName = param.slice(2, param.indexOf("="));
                let paramValue = param.slice(param.indexOf("=") + 1, param.length);
                paramName = StringDo.replaceString(paramName, " ", "");
                paramValue = StringDo.replaceString(paramValue, " ", "");
                params[paramName] = paramValue;
                // console.log("?~~~",paramName,paramValue)
                if (paramName == "l") {
                    language = paramValue;
                    if (paramValue) continue;
                    if (!Language.assert(language)) {
                        flag = false;
                        console.log("[Error Param Language] support language is: " + Language)
                        break;
                    }
                } else if (paramName == "out") {
                    outURL = paramValue;
                } else if (paramName == "dir") {
                    if (paramValue == 'null' || paramValue == null) continue;
                    files = files.concat((new File(paramValue)).readFilesWidthEnd(["xlsx", 'csv']));
                } else if (paramName == "file") {
                    if (paramValue == 'null' || paramValue == null) continue;
                    files = files.concat((new File(paramValue)));
                } else {
                    // console.log("??~?~?~~?~?~?~?",paramName)
                    // flag = false;
                    // console.log("[Error Param] " + paramName)
                    // break;
                }
            }
        }
    }
    // console.log(files.length)

    if (flag) {
        let parser;
        for (let i = 0; i < files.length; i++) {
            if (files[i].name.slice(0, 1) == "~") {
                // console.log("[tip] 过滤临时文件:" + files[i].url);
                continue;
            }
            new FileParse(language, params, files[i].url, newVersion);
        }
    }

    let map = global.map;
    if (map) {
        let parse = global.configParse;
        for (let arr of map.entries()) {
            let file = arr[1];
            let list = file.list;
            let url = file.url;
            // console.log(file);
            //对数组进行反转
            if (params.direction && params.direction.indexOf(file.name) != -1) {
                let newList = [];
                for (let y = 0; y < list.length; y++) {
                    for (let x = 0; x < list[y].length; x++) {
                        if (!newList[x]) newList[x] = [];
                        newList[x][y] = list[y][x];
                    }
                }
                list = newList;
            }
            let config = null;
            let version = 2;
            version = StringDo.replaceString(version + "", ".", "_");
            if (params.info) {
                console.log("[tip] 解析表格:" + url + " 表单 " + file.name);
            }
            if (!list || !list.length || !list[0].length || !global["ConfigV" + version]) {
                console.log("[warn] 没用找到配置解析器:" + url + " 表单 " + file.name);
            } else {
                try {
                    config = new global["ConfigV" + version](params, file.name, url, list, file.tables);
                    if (config.igonre) {
                        console.log('[warn] 忽略表单:', file.name)
                        continue;
                    }
                    parse.addPage(params, config, file.tables);
                } catch (e) {
                    console.log("\x1B[31m[error] 解析配置出错:" + file.url + " 表单 " + file.name + " Error:\x1B[39m", e);
                }
            }
        }
    }
    if (params.merge) {
        // console.log(params.merge);
        (new File(params.merge)).save(JSON.stringify(global.jsons, null, 2));
    }
    // console.log(process.cwd())
    // console.log("???", params);
    // new File(params.dir)
    if (global.printConfigCode) {
        global.printConfigCode();
    }
}

exports.configTool = configTool;