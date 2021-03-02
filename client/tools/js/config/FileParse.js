var xlsx = require('node-xlsx');
var csv = require('./../../bin/lib/utils/csv')

class FileParse {

    constructor(language, params, url, version) {
        // console.log("[process] 解析文件配置表:" + url);
        let file = new File(url);
        var files;
        if (file.end == 'csv') {
            files = [
                {
                    name: file.name,
                    data: csv.decodeCSV(file.readContent())
                }
            ];
            // files = xlsx.parse(url)
            // files[0].name = file.name;
        } else {
            files = xlsx.parse(url)
        }
        let parse;
        if (!global.configParse) {
            if (language == "ts") {
                global.configParse = new TS();
            } else if (language == "go") {
                global.configParse = new Go();
            }
        }
        parse = global.configParse;
        let map;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let list = file.data;
            map = addFile(file.name, list, url, version, params);
        }
        // console.log(files[0]);
    }
}

class FileData {

    constructor(name, list, url, version, params) {
        this.name = name;
        this.list = list;
        this.url = url;
        url = url.split("/")[url.split("/").length - 1];
        url = url.split(".")[0];
        this.fileName = url;
        this.version = version;
        this.params = params;

        var vertical = false;
        if (this.params.direction && this.params.direction.indexOf(this.name) != -1) {
            vertical = true;
        }
        if (this.params.concat && this.params.concat.indexOf(this.name) != -1) {
            this.tables = {};
            this.tables[this.fileName] = {
                start: 0,
                end: vertical ? 0 : this.list.length - 1 - global["ConfigV" + this.version].getHeadLen()
            };
            this.max = 1;
        }
        // console.log('表格', this.name, this.fileName)
    }

    merge(list, url) {
        // console.log('合并表格', this.name, this.fileName)
        var tomap = false;
        if (this.params.concat && this.params.concat.indexOf(this.name) != -1) tomap = true;
        console.log(this.params.concat, this.name, tomap);
        var vertical = false;
        if (this.params.direction && this.params.direction.indexOf(this.name) != -1) {
            vertical = true;
        }
        try {
            if (!tomap) {// global["ConfigV" + this.version].mergeHead(`${this.url} 表单:${this.name}`, this, list, vertical)) {
                console.log('[tip] 合并表格', this.name)
                global["ConfigV" + this.version].merge(`${this.url} 表单:${this.name}`, this, list);
            } else {
                console.log('[tip] 分离表格', this.name, url)
                if (!this.tables) {
                    this.tables = {};
                    this.tables[this.fileName] = {
                        start: 0,
                        end: vertical ? 0 : this.list.length - 1 - global["ConfigV" + this.version].getHeadLen()
                    };
                    this.max = 1;
                }
                url = url.split("/")[url.split("/").length - 1];
                url = url.split(".")[0];
                if (vertical) {
                    this.tables[url] = {
                        start: this.max,
                        end: this.max
                    };
                    this.max++;
                    global["ConfigV" + this.version].addVerticalContent(this.list, this.max, list)
                    // console.log(list)
                    // console.log(this.list)
                    // this.list = this.list.concat(global["ConfigV" + this.version].getContentList(list));
                }
                else {
                    this.tables[url] = {
                        start: this.list.length - global["ConfigV" + this.version].getHeadLen(),
                        end: 0
                    };
                    this.list = this.list.concat(global["ConfigV" + this.version].getContentList(list));
                    this.tables[url].end = this.list.length - 1 - global["ConfigV" + this.version].getHeadLen();
                }
            }
        } catch (e) {
            console.log('\x1B[31m[error] 合并表格错误(表单:' + this.name + '  ' + url + ' -> ' + this.url + '):\x1B[39m', e)
        }
    }
}

function addFile(name, list, url, version, params) {
    if (global.map == null) {
        global.map = new Map();
    }
    if (map.has(name)) {
        map.get(name).merge(list, url);
    } else {
        map.set(name, new FileData(name, list, url, version, params));
    }
    return map;
}

global.FileParse = FileParse;