var fs = require("fs");
var path = require("path");

function File(url) {
    if (url.charAt(url.length - 1) == "/") {
        url = url.slice(0, url.length - 1);
    }
    this.url = url;
    try {
        this.state = fs.statSync(this.url);
        //this.type = this.state.mode;
        this.end = !this.isDirection() ? (this.url.split(".")[this.url.split(".").length ? this.url.split(".").length - 1 : 0]) : "";
        this.name = this.url.split("/")[this.url.split("/").length ? this.url.split("/").length - 1 : 0];
        this.name = this.name.slice(0, this.name.length - this.end.length - 1);
        if (!this.isDirection()) {
            this.direction = this.url.slice(0, this.url.length - this.end.length - 1 - this.name.length);
        }
    } catch (e) {
        this.state = null;
        this.type = 0;
        this.end = null;
    }
}

/**
 *
 */
File.prototype.isDirection = function () {
    return this.state.isDirectory();//this.type==global.FileType.DIRECTION?true:false;
}

/**
 * 保存
 * @param content
 * @param format
 */
File.prototype.save = function (data, format, url) {
    url = url || this.url;
    format = format || "utf-8";
    if (url.split("/").length > 1 || url.split(".").length == 1) {
        if (url.split(".").length == 1) {
            var dir = new File(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
            if (dir.isExist() == false || dir.type != FileType.DIRECTION) {
                File.mkdirsSync(url);
            }
        } else {
            File.mkdirsSync(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
        }
    }
    fs.writeFile(url, data, format, function (err) {
        if (err) {
            console.log("保存文件失败！ url = " + url);
        } else {
        }
    })
}

File.prototype.isExist = function () {
    return fs.existsSync(this.url);
}

/**
 * 读取文件内容
 * @param format
 * @returns {*}
 */
File.prototype.readContent = function (format, backFormat) {
    format = format || "utf-8";
    if (this.isDirection()) {
        return null;
    }
    var content = fs.readFileSync(this.url, format);
    if (backFormat == "Buffer" || backFormat == "Array") {
        var array = [];
        for (var i = 0; i < content.length; i++) {
            array.push(content.charCodeAt(i));
        }
        if (backFormat == "Array") {
            return array;
        } else if (backFormat == "Buffer") {
            return Buffer.from(array);
        }
    }
    return content;
}

File.prototype.watch = function(callBack,time = 300) {
    let dir = this.url;
    if(!this.watchs) {
        this.watchId = 0;
        this.watchs = {};
    }
    let id = this.watchId++;
    this.watchs[id] = true;
    let files = {};
    let f = function() {
        let nfiles = {};
        let list = (new File(dir)).readFilesWidthEnd("*");
        for(let i = 0; i < list.length; i++) {
            nfiles[list[i].url] = list[i].createTime 
            + "," + list[i].changeTime + "," + list[i].modifyTime;
        }
        if(Object.keys(files).length != Object.keys(nfiles).length) {
            callBack();
        } else {
            for(let key in nfiles) {
                if(!files[key] || files[key] != nfiles[key]) {
                    callBack();
                    break;
                }
            }
        }
        files = nfiles;
        if(this.watchs[id]) setTimeout(f,time);
    }.bind(this);
    f();
    return id;
}

/**
 * 读取某一个后缀的文件列表
 * @param ends Array 如果为 * 表示读取所有文件
 * @returns {Array<File>}
 */
File.prototype.readFilesWidthEnd = function (ends) {
    if (typeof ends == "string") {
        ends = [ends];
    }
    var files = [];
    if (!this.isDirection()) {
        for (var i = 0; i < ends.length; i++) {
            var end = ends[i];
            if (end == "*" || end == this.end) {
                files.push(this);
            }
        }
    } else if (this.isDirection()) {
        var list = fs.readdirSync(this.url);
        for (var i = 0; i < list.length; i++) {
            file = new File(this.url + "/" + list[i]);
            files = files.concat(file.readFilesWidthEnd(ends));
        }
    }
    return files;
}


File.prototype.readFilesWithEnd = File.prototype.readFilesWidthEnd;

/**
 * 读文件列表，包括文件夹
 * @returns {Array<File>}
 */
File.prototype.readDirectionList = function () {
    var files = [];
    if (!this.isDirection()) {
        files.push(this);
    } else if (this.isDirection()) {
        files.push(this);
        var list = fs.readdirSync(this.url);
        for (var i = 0; i < list.length; i++) {
            file = new File(this.url + "/" + list[i]);
            files = files.concat(file.readDirectionList());
        }
    }
    return files;
}

/**
 * 删除文件或文件夹内（包括文件夹和文件夹内的所有东西）
 */
File.prototype.delete = function () {
    if (this.isExist() == false) {
        return;
    }
    if (!this.isDirection()) {
        fs.unlinkSync(this.url);
    } else if (this.isDirection()) {
        var list = fs.readdirSync(this.url);
        for (var i = 0; i < list.length; i++) {
            file = new File(this.url + "/" + list[i]);
            file.delete();
        }
        try {
            fs.rmdirSync(this.url);
        } catch (e) {
            console.log(e);
        }
    }
}

File.prototype.print = function () {
    console.log(this.name);
}

global.__define(File.prototype, "size",
    function () {
        return this.state.size;
    },
    function (val) {
    }
);

global.__define(File.prototype, "changeTime",
    function () {
        return this.state.ctime.getTime();
    },
    function (val) {
    }
);

global.__define(File.prototype, "modifyTime",
    function () {
        return this.state.mtime.getTime();
    },
    function (val) {
    }
);

global.__define(File.prototype, "createTime",
    function () {
        return this.state.birthtime.getTime();
    },
    function (val) {
    }
);


File.mkdirsSync = function (dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function (dirname) {
            if (dirname == "") {
                pathtmp = "/"
                return;
            }
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}

var FileFormat = {
    "UTF-8": "utf-8",
    "BINARY": "binary"
}

class FilePath {
    static join(path1, path2) {
        if(path2.charAt(0) == "/") path2 = path2.slice(1,path2.length);
        return path1 + (path1.charAt(path1.length - 1) == "/" ? "" : "/") +
            (path2.charAt(path2.length - 1) == "/" ? path2.slice(0, path2.length - 1) : path2);
    }
}

global.FileFormat = FileFormat;
global.File = File;
global.FilePath = FilePath;