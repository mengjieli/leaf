require("./TSTemp");

function changeNameToNameS(name) {
    return ('' + name.charAt(0)).toLocaleLowerCase() + name.slice(1, name.length);
}

function getClassName(name) {
    return upperFirstChar(name);
}

function getAttributeName(name) {
    return name;
}

function getAttributeFunctionName(name) {
    return upperFirstChar(name);
}


function changeAttribute(name) {
    return "C_item_" + getAttributeName(name);
}

function changeAttributeToSave(name) {
    return "c_item_" + getAttributeName(name);
}

function getGetFunctionName(className, name) {
    return "Get" + className + "By" + getAttributeName(name);
}

function getSubTableName(name) {
    return upperFirstChar(name);
}

function upperFirstChar(str) {
    return ('' + str.charAt(0)).toLocaleUpperCase() + str.slice(1, str.length);
}

var version = 2.0;

class TSFile {

    constructor(fileName, config, packageName) {
        this.fileName = fileName;
        // this.types = types;
        // this.names = names;
        this.config = config;
        this.hasPackage = !!packageName;
    }

    getIndent(indent) {
        let str = "";
        for (let i = 0; i < indent; i++) {
            str += " ";
        }
        if (this.hasPackage) {
            str += "  ";
        }
        return str;
    }

    getClassDefine() {
        /**
    export class HitPoint {

        public id: number;
        public x: number;
        public y: number;
        public r: number;
        public role: Role;
        
        public static list: HitPoint[] = [];

        public static getById(value: number) {
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                if(list[i].id == value) return list[i];
            }
            return null;
        }

        public static decode(list: Array<{}>) {
            HitPoint.list.length = 0;
            for (let i = 0; i < list.length; i++) {
                let item = new HitPoint();
                for(let k in list[i]) {
                    item[k] = list[i];
                }
                HitPoint.list.push(item);
            }
        }

        public static link() {
            HitPoint.list.length = 0;
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                let item = list[i];
                item.role = Role.getById(item["c_item_role"])
            }
            return null;
        }
    }
         */
        let content = "";
        this.hasLink = false;
        content += `${this.getIndent(0)}export class ` + getClassName(this.fileName) + " {\n";
        this.config.mapColHead((colIndex, name, type, desc) => {
            content += `${this.getIndent(2)}/**\n`;
            content += `${this.getIndent(3)}* ` + desc + "\n";
            content += `${this.getIndent(3)}*/\n`;
            content += this.getIndent(2) + getAttributeName(name) + ": " + this.getTypeString(type) + ";\n\n";
        })
        if (this.config.vertical) {
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += `${this.getIndent(2)}static config` + getSubTableName(k) + ": " + getClassName(this.fileName) + ";\n\n";
                }
            } else {
                content += `${this.getIndent(2)}static config: ` + getClassName(this.fileName) + ";\n\n";
            }
        } else {
            content += `${this.getIndent(2)}static list: ` + getClassName(this.fileName) + "[] = [];\n";
            content += `\n${this.getIndent(2)}static map = new Map<${this.getTypeString(this.config.types[0])}, ` + getClassName(this.fileName) + ">();\n\n";
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += `\n${this.getIndent(2)}static list` + getSubTableName(k) + ": Array<" + getClassName(this.fileName) + "> = [];\n";
                    content += `\n${this.getIndent(2)}static map` + getSubTableName(k) + ` = new Map<${this.getTypeString(this.config.types[0])}, ` + getClassName(this.fileName) + ">();\n\n";
                }
            }
        }

        let linkContent = "";
        linkContent += `${this.getIndent(2)}static link() {\n`;
        linkContent += `${this.getIndent(4)}let list = ` + getClassName(this.fileName) + ".list;\n";
        linkContent += `${this.getIndent(4)}for (let i = 0; i < list.length; i++) {\n`;
        linkContent += `${this.getIndent(6)}let item = list[i];\n`;
        this.config.mapColHead((colIndex, name, type) => {
            if (!type.isArray) {
                if (type.isClass) {
                } else {
                    if (name == this.config.keyName && !this.config.vertical) {
                        content += `${this.getIndent(2)}static getBy` + getAttributeFunctionName(name)
                            + "(value: " + this.getTypeString(type) + "): " + getClassName(this.fileName) + " {\n";
                        content += `${this.getIndent(4)}return ` + getClassName(this.fileName) + ".map.get(value);\n"
                        content += `${this.getIndent(2)}}\n\n`;
                        if (this.config.tables) {
                            for (var k in this.config.tables) {
                                content += `${this.getIndent(2)}static getBy` + getAttributeFunctionName(name) + getSubTableName(k)
                                    + "(value: " + this.getTypeString(type) + "): " + getClassName(this.fileName) + " {\n";
                                content += `${this.getIndent(4)}return ` + getClassName(this.fileName) + ".map" + getSubTableName(k) + ".get(value);\n"
                                content += `${this.getIndent(2)}}\n\n`;
                            }
                        }
                    }
                }
            }
            if (type.isClass) {
                this.hasLink = true;
                let keyName;
                const files = global.configParse.files;
                for (let i = 0; i < files.length; ++i) {
                    const config = files[i].config;
                    if (upperFirstChar(config.name) === type.className) {
                        keyName = upperFirstChar(config.keyName);
                        break;
                    }
                }
                if (type.isArray) {
                    linkContent += `${this.getIndent(6)}for(let n = 0; n < item['` + changeAttributeToSave(name) + "'].length; n++) {\n";
                    linkContent += `${this.getIndent(8)}item.` + getAttributeName(name) + "[n] = "
                        + (type.classId == "id" ? getClassName(type.className) + `.getBy${keyName}(item['`
                            + changeAttributeToSave(name) + "'][n]);\n" :
                            `orange.ArrayUtil.getItem(${getClassName(type.className)}.list,"${type.classId}",item["${changeAttributeToSave(name)}"][n]);\n`);
                    linkContent += `${this.getIndent(6)}}\n`;
                    linkContent += `${this.getIndent(6)}delete item['` + changeAttributeToSave(name) + "'];\n";
                } else {
                    linkContent += `${this.getIndent(6)}item.` + getAttributeName(name) + " = "
                        + (type.classId == "id" ? getClassName(type.className) + `.getBy${keyName}(item['`
                            + changeAttributeToSave(name) + "']);\n" :
                            `orange.ArrayUtil.getItem(${getClassName(type.className)}.list,"${type.classId}",item["${changeAttributeToSave(name)}"]);\n`)
                        ;
                    linkContent += `${this.getIndent(6)}delete item['` + changeAttributeToSave(name) + "'];\n";
                }
            }
        });
        linkContent += `${this.getIndent(4)}}\n`;
        linkContent += `${this.getIndent(4)}return null;\n`;
        linkContent += `${this.getIndent(2)}}\n`;

        if (this.config.vertical) {
            content += `${this.getIndent(4)}static decode(obj: any) {\n`;
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += this.getIndent(4) + getClassName(this.fileName) + ".config" + getSubTableName(k) + " = new " + getClassName(this.fileName) + "();\n";
                    content += `${this.getIndent(4)}for(let k in obj.` + changeNameToNameS(this.fileName) + getSubTableName(k) + ") {\n";
                    content += this.getIndent(6) + getClassName(this.fileName) + ".config" + getSubTableName(k) + "[k] = obj." + changeNameToNameS(this.fileName) + getSubTableName(k) + "[k];\n";
                    content += `${this.getIndent(4)}}\n`;
                }
            } else {
                content += this.getIndent(4) + getClassName(this.fileName) + ".config = new " + getClassName(this.fileName) + "();\n";
                content += `${this.getIndent(4)}for(let k in obj) {\n`;
                content += this.getIndent(6) + getClassName(this.fileName) + ".config[k] = obj[k];\n";
                content += `${this.getIndent(4)}}\n`;
            }
            content += `${this.getIndent(2)}}\n`;
        } else {
            if (!params.array) {
                content += `${this.getIndent(2)}static decode(list: Array<{}>) {\n`;
                content += this.getIndent(4) + getClassName(this.fileName) + ".list.length = 0;\n";
            } else {
                content += `${this.getIndent(2)}static decode(list: Array<{}>) {\n`;
                content += this.getIndent(4) + getClassName(this.fileName) + ".list.length = 0;\n";
            }
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    if (!params.array) content += `${this.getIndent(4)}for (let i in list.` + changeNameToNameS(this.fileName) + getSubTableName(k) + ") {\n";
                    else content += `${this.getIndent(4)}for (let i = 0; i < list.` + changeNameToNameS(this.fileName) + getSubTableName(k) + ".length; i++) {\n";
                    content += `${this.getIndent(6)}const item = new ` + getClassName(this.fileName) + "();\n";
                    content += `${this.getIndent(6)}for (let k in list.` + changeNameToNameS(this.fileName) + getSubTableName(k) + "[i]) {\n"
                    content += `${this.getIndent(8)}item[k] = list.` + changeNameToNameS(this.fileName) + getSubTableName(k) + "[i][k];\n";
                    content += `${this.getIndent(6)}}\n`;
                    content += this.getIndent(6) + getClassName(this.fileName) + ".list.push(item);\n"
                    content += this.getIndent(6) + getClassName(this.fileName) + `.map.set(item.${this.config.keyName}, item);\n`;
                    content += this.getIndent(6) + getClassName(this.fileName) + ".list" + getSubTableName(k) + ".push(item);\n"
                    content += this.getIndent(6) + getClassName(this.fileName) + ".map" + getSubTableName(k) + `.set(item.${this.config.keyName}, item);\n`
                    content += `${this.getIndent(4)}}\n`;
                }
            } else {
                if (!params.array) content += `${this.getIndent(4)}for (let i in list) {\n`;
                else content += `${this.getIndent(4)}for (let i = 0; i < list.length; i++) {\n`;
                content += `${this.getIndent(6)}const item = new ` + getClassName(this.fileName) + "();\n";
                content += `${this.getIndent(6)}Object.assign(item, list[i]);\n`;
                content += this.getIndent(6) + getClassName(this.fileName) + ".list.push(item);\n"
                content += this.getIndent(6) + getClassName(this.fileName) + `.map.set(item.${this.config.keyName}, item);\n`;
                content += `${this.getIndent(4)}}\n`;
            }
            content += `${this.getIndent(2)}}\n`;
        }

        if (this.hasLink) content += linkContent;
        content += `${this.getIndent(0)}}\n\n`;
        return content;
    }

    getDecodeTable() {
        /**
         * for(let k in tables) {
            if(k === "HitPoint") {
                HitPoint.decode(tables[k]);
            }
        }
         */
        return `${this.getIndent(4)}if (k === '` + this.fileName + "') " + getClassName(this.fileName) + ".decode(tables[k]);\n";
    }

    getLinkTable() {
        /**
         *  DecodeHitPoint()
         */
        return this.hasLink ? this.getIndent(2) + getClassName(this.fileName) + ".link();\n" : "";
    }

    getTableName() {
        return this.getClassName() + "Table";
    }

    getFunctionName() {
        return "Decode" + this.getClassName();
    }

    getAttributeClassName() {
        return changeNameToNameS(this.fileName);
    }

    getLinkFunctionName() {
        return "Link" + this.getClassName();
    }

    getClasses() {
        /**
         * HitPoint [] HitPointConfig
         */
        return this.getIndent(2) + this.getClassName() + " []" + getClassName(this.fileName) + "\n";
    }

    getClassName() {
        let str = changeNameToNameS(this.fileName);
        return upperFirstChar(str);
    }

    getTableName() {
        return getClassName(this.fileName);
    }

    getTypeString(type) {
        if (type.isArray) {
            if (type.isClass) return "Array<" + getClassName(type.className) + ">";
            else return "Array<" + this.getBaseType(type.baseType) + ">";
        } else if (type.isClass) {
            return getClassName(type.className);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTypeString2(type) {
        if (type.isArray) {
            return "[]" + this.getBaseType(type.baseType);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTableConfig() {
        let name = this.fileName;
        return upperFirstChar(name);
    }

    getBaseType(t) {
        if (t == "int" || t == "int32") return "number";
        if (t == "int64") return "number";
        if (t == "uint" || t == "uint32") return "number";
        if (t == "uint64") return "number";
        if (t == "number" || t == "float" || t == "float32") return "number";
        if (t == "float64") return "number";
        if (t == "string") return "string";
    }
}



class TS {
    constructor() {
        this.files = [];
    }

    printGo(params, fileOut, packageName = "main") {
        let classDefine = "";
        let decodeTable = "";
        let linkTable = "";
        let tablelist = [];
        let numberExtend1 = ``;
        let numberExtend2 = ``;
        for (let i = 0; i < this.files.length; i++) {
            classDefine += this.files[i].getClassDefine();
            decodeTable += this.files[i].getDecodeTable();
            linkTable += this.files[i].getLinkTable();
            tablelist += "'" + this.files[i].fileName + "'" + (i < this.files.length - 1 ? "," : "");
            numberExtend1 += this.files[i].getAttributeClassName() + ":" + (params.package || "main") + "." + this.files[i].getClassName() + "\n";
            numberExtend2 += `Object.defineProperty(Number.prototype, "${this.files[i].getAttributeClassName()}", {
                get: function () { return ${(params.package || "main") + "." + this.files[i].getClassName()}.getById(+this); } 
                ,
                enumerable: true,
                configurable: true
            });`
        }
        let numberExtend = `interface Number {\n
${numberExtend1}
        }

            ${numberExtend2}
       `
        if (!params.tsout || params.tsout == 'null') return;
        if(!params.extends) numberExtend = "";
        console.log("打印 ts 文件:", params.tsout)
        let content = GetTSTemp(classDefine, decodeTable, linkTable, tablelist, params.package,numberExtend);
        (new File(params.tsout)).save(content);
    }

    addPage(params, config) {
        // console.log(config)
        // addPage(params, fileName, pageName, list) {
        let fileName = config.name;
        let outURL = params.out;
        // if (list.length < 3) return;
        // let types = config.types;
        // let names = config.names;
        // let descs = list[2];
        let res = [];
        this.files.push(new TSFile(fileName, config, params.package));
        global.printConfigCode = () => {
            this.printGo(params);
        }
        config.mapRow((rowIndex) => {
            // for (let i = 3; i < list.length; i++) {
            // let items = list[i];
            let item = {};
            config.mapCol(rowIndex, (colIndex, type, name, itemContent) => {
                // for (let t = 0; t < types.length; t++) {
                var oldName = name;
                if (type.isArray) {
                    if (itemContent != null && typeof itemContent == "number") {
                        itemContent = "[" + itemContent + "]";
                    }
                    if (!itemContent) {
                        if (type.isClass) {
                            itemContent = "[]";
                        }
                        else {
                            return;
                        }
                    } else if (typeof itemContent == "string" && itemContent.indexOf("[") >= 0) {
                        itemContent = StringDo.replaceString(itemContent, "[", "");
                        itemContent = StringDo.replaceString(itemContent, "]", "");
                    }
                }

                if (type.isClass) {
                    name = changeAttributeToSave(name);
                    if (type.isArray) {
                        if (itemContent) {
                            if (type.isString()) {
                                if (typeof itemContent == "number") {
                                    item[name] = ["" + itemContent];
                                } else {
                                    let str = itemContent;
                                    let sp = "$$$$$__$$$$$";
                                    str = StringDo.replaceString(str, "\\|", sp);
                                    item[name] = str.split("|");
                                    for (let f = 0; f < item[name].length; f++) {
                                        item[name][f] = StringDo.replaceString(item[name][f], sp, "|");
                                    }
                                }
                            } else if (type.isNumber()) {
                                // console.log(itemContent,typeof itemContent);
                                if (typeof itemContent == "number") {
                                    item[name] = [itemContent];
                                } else {
                                    item[name] = itemContent.split("|");
                                    // console.log(name,item[name],itemContent,itemContent.split(","),itemContent.split("0"));
                                }
                                if (item[name]) {
                                    for (let f = 0; f < item[name].length; f++) {
                                        item[name][f] = parseFloat(item[name][f]);
                                    }
                                }
                            }
                        } else {
                            item[name] = [];
                        }
                        item[oldName] = [];
                    } else {
                        if (itemContent) {
                            if (type.isNumber() && typeof itemContent === "string") {
                                itemContent = +itemContent;
                            }
                            item[name] = itemContent;
                        } else {
                            if (type.isString()) {
                                item[name] = "";
                            } else if (type.isNumber()) {
                                item[name] = 0;
                            }
                        }
                    }
                } else if (type.isArray) {
                    if (itemContent) {
                        if (type.isString()) {
                            if (itemContent != null && type.isString() && typeof itemContent != "string") {
                                itemContent += "";
                            }
                            let str = itemContent;
                            let sp = "$$$$$__$$$$$";
                            str = StringDo.replaceString(str, "\\|", sp);
                            item[name] = str.split("|");
                            for (let f = 0; f < item[name].length; f++) {
                                item[name][f] = StringDo.replaceString(item[name][f], sp, "|");
                            }
                        } else if (type.isNumber()) {
                            item[name] = itemContent.split("|");
                            for (let f = 0; f < item[name].length; f++) {
                                item[name][f] = parseFloat(item[name][f]);
                            }
                        }
                    } else {
                        item[name] = [];
                    }
                } else {
                    if (itemContent != null) {
                        if (type.isString() && typeof itemContent != "string") {
                            itemContent += "";
                        }
                        if (type.isNumber() && typeof itemContent === "string") {
                            itemContent = +itemContent;
                        }
                        item[name] = itemContent;
                    } else {
                        if (type.isString()) {
                            item[name] = "";
                        } else if (type.isNumber()) {
                            item[name] = 0;
                        }
                    }
                }
            })
            res.push(item);
        });
        let fileContent;
        if (config.vertical) {
            fileContent = "{";
            if (config.tables && Object.keys(config.tables).length) {
                for (var k in config.tables) {
                    fileContent += "\"" + changeNameToNameS(fileName) + getSubTableName(k) + "\":" + JSON.stringify(res[config.tables[k].start]) + ","
                }
                fileContent += "\"version\":\"" + version + "\"}";
            } else {
                res = res[0];
                fileContent = "{\"" + changeNameToNameS(fileName) + "\":" + JSON.stringify(res) + ",\"version\":\"" + version + "\"}";
            }
        } else {
            if (config.tables && Object.keys(config.tables).length) {
                var cfg = {};
                for (var k in config.tables) {
                    if (!cfg[changeNameToNameS(fileName) + getSubTableName(k)]) {
                        if (params.array) cfg[changeNameToNameS(fileName) + getSubTableName(k)] = [];
                        else cfg[changeNameToNameS(fileName) + getSubTableName(k)] = {};
                    }
                    res.forEach((v, ind) => {
                        if (ind >= config.tables[k].start && ind <= config.tables[k].end) {
                            if (params.array) cfg[changeNameToNameS(fileName) + getSubTableName(k)].push(v);
                            else cfg[changeNameToNameS(fileName) + getSubTableName(k)][v[config.keyName]] = v;
                        }
                    });
                }
                cfg.version = version;
                fileContent = JSON.stringify(cfg);
            } else {
                if (!params.array) {
                    var cfg = {};

                    res.forEach((v, ind) => { cfg[v[config.keyName]] = v });
                    res = cfg;
                }
                fileContent = "{\"" + changeNameToNameS(fileName) + "\":" + JSON.stringify(res) + ",\"version\":\"" + version + "\"}";
            }
        }
        let json = JSON.parse(fileContent);
        global.jsons[fileName] = json[fileName] || json[changeNameToNameS(fileName)];
        global.params.out && (new File(FilePath.join(outURL, fileName + ".json"))).save(JSON.stringify(json, null, 2));
    }
}

global.TS = TS;