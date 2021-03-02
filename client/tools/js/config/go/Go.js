require("./GoTemp");

function changeNameToNameS(name) {
    return ('' + name.charAt(0)).toLocaleLowerCase() + name.slice(1, name.length);
}

function getClassName(name) {
    return upperFirstChar(name) + "Config";
}

function getAttributeName(name) {
    return upperFirstChar(name);
}

function changeAttribute(name) {
    return "C_item_" + getAttributeName(name);
}

function changeAttributeToSave(name) {
    return "c_item_" + getAttributeName(name);
}

function getGetFunctionName(className, name) {
    return "Get" + className.charAt(0).toLocaleUpperCase() + className.slice(1, className.length) + "By" + getAttributeName(name);
}

function getSubTableName(name) {
    return upperFirstChar(name);
}

function upperFirstChar(str) {
  return ('' + str.charAt(0)).toLocaleUpperCase() + str.slice(1, str.length);
}

var version = 2.0;

class GoFile {

    constructor(fileName, config) {
        this.fileName = fileName;
        this.config = config;
    }

    getClassDefine() {
        /**
         type HitPoint struct {
        id int32
        x int32
        y int32
        r int32
    }
    
    type HitPointTable struct {
        HitPoint [] HitPoint
    }
    
    func DecodeHitPoint() []HitPoint {
        v := HitPointTable{}
        Load(tableURL + "HitPoint.json", &v)
        return v.HitPoints
    }

    func GetHitPoint(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.id == value) return v
        }
        return nil
    }

    func GetHitPointByX(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.X == value) return v
        }
        return nil
    }
         */
        let content = "type " + getClassName(this.fileName) + " struct {\n";
        this.config.mapColHead((colIndex, name, type) => {
            if (type.isClass) {
                content += "  " + changeAttribute(name) + " "
                    + this.getTypeString2(type) + "\n";
            }
            content += "  " + getAttributeName(name) + " "
                + this.getTypeString(type) + "\n";
        });
        content += "}\n\n"
        content += "type " + this.getTableName() + " struct {\n"
        if (this.config.tables) {
            for (var k in this.config.tables) {
                if (params.array) content += "    " + this.getClassName() + getSubTableName(k) + " " + (this.config.vertical ? "" : "[]") + "*" + getClassName(this.fileName) + "\n";
                else content += "    " + this.getClassName() + getSubTableName(k) + " " + (this.config.vertical ? "" : `map[${this.getKeyType()}]`) + "*" + getClassName(this.fileName) + "\n";
            }
        } else {
            if (params.array) content += "    " + this.getClassName() + " " + (this.config.vertical ? "" : "[]") + "*" + getClassName(this.fileName) + "\n";
            else content += "    " + this.getClassName() + " " + (this.config.vertical ? "" : `map[${this.getKeyType()}]`) + "*" + getClassName(this.fileName) + "\n";
        }
        content += "}\n\n";

        if (global.params.declaration) {
            return content;
        }

        content += "func " + this.getFunctionName() + "()(err error) {\n";
        content += "  v := " + this.getTableName() + "{}\n";
        content += "  err = Load(tableURL + \"" + this.fileName + ".json\", &v)\n";
        content += `  if err != nil { return } \n`;
        if (this.config.vertical) {
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += "  tables." + this.getClassName() + getSubTableName(k) + " = v." + this.getClassName() + getSubTableName(k) + "\n";
                }
            } else {
                content += "  tables." + this.getClassName() + " = v." + this.getClassName() + "\n";
            }
        } else {
            content += `  maps.${this.getClassName()} = map[${this.getKeyType()}]*${getClassName(this.fileName)}{}\n`;
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += `  maps.${this.getClassName() + getSubTableName(k)} = map[${this.getKeyType()}]*${getClassName(this.fileName)}{}\n`;
                }
            }
            if (this.config.tables) {
                for (var k in this.config.tables) {
                    content += `  for _,v1 := range v.${this.getClassName() + getSubTableName(k)} {\n`;
                    content += `    maps.${this.getClassName()}[v1.${upperFirstChar(this.config.keyName)}] = v1\n`;
                    content += `    maps.${this.getClassName() + getSubTableName(k)}[v1.${upperFirstChar(this.config.keyName)}] = v1\n`;
                    content += `    tables.${this.getClassName() + getSubTableName(k)} = append(tables.${this.getClassName() + getSubTableName(k)}, v1)\n`;
                    content += `  }\n`;
                }
            } else {
                content += `  for _,v1 := range v.${this.getClassName()} {\n`;
                content += `    maps.${this.getClassName()}[v1.${upperFirstChar(this.config.keyName)}] = v1\n`;
                content += `    tables.${this.getClassName()} = append(tables.${this.getClassName()}, v1)\n`;
                content += `  }\n`;
            }
        }

        content += `  return\n`;
        content += "}\n\n";

        let linkContent = "";
        let hasLink = false;
        linkContent += "func " + this.getLinkFunctionName() + "() {\n";
        linkContent += "    for _, v := range tables." + this.getClassName() + " {\n";
        // linkContent += "        var v *" + getClassName(this.fileName) + " = &tables." + this.getClassName() + "[k]\n"
        this.config.mapColHead((colIndex, name, type) => {
            if (type.isClass) {
                hasLink = true;
                let keyName;
                const files = global.configParse.files;
                for(let i = 0 ; i < files.length ;++i) {
                  const config = files[i].config;
                  if(upperFirstChar(config.name) === type.className) {
                    keyName = config.keyName;
                    break;
                  }
                }
                if (type.isArray) {
                    linkContent += `        v.${getAttributeName(name)} = make([]*${getClassName(type.className)}, len(v.${changeAttribute(name)}))\n`;
                    linkContent += "        for k2, v2 := range v." + changeAttribute(name) + " {\n";
                    linkContent += "            v." + getAttributeName(name) + "[k2] = " + getGetFunctionName(type.className, keyName) + "(v2)\n";
                    linkContent += "        }\n";
                } else {
                    linkContent += "        v." + getAttributeName(name) + " = " + getGetFunctionName(type.className, keyName) + "(v." + changeAttribute(name) + ")\n";
                }
            }
        });
        linkContent += "    }\n";
        linkContent += "}\n\n";
        if (!hasLink) linkContent = "";
        this.hasLink = hasLink;
        content += linkContent;

        this.config.mapColHead((colIndex, name, type) => {
            if (type.isArray) return;
            if (type.isClass) {

            } else {
                if (name == this.config.keyName) {
                    if (!this.config.vertical) {
                        content += "func " + getGetFunctionName(this.getClassName(), name)
                            + " (value " + this.getBaseType(type.baseType) + ") *" + getClassName(this.fileName) + " {\n";
                        content += `    val, ok := maps.${this.getClassName()}[value]\n`;
                        content += `    if(ok) {\n`;
                        content += `      return val\n`;
                        content += `    }\n`
                        content += "    return nil\n";
                        content += "}\n\n";

                        if (this.config.tables) {
                            for (var k in this.config.tables) {
                                content += "func " + getGetFunctionName(this.getClassName(), name) + getSubTableName(k)
                                    + " (value " + this.getBaseType(type.baseType) + ") *" + getClassName(this.fileName) + " {\n";
                                content += `    val, ok := maps.${this.getClassName() + getSubTableName(k)}[value]\n`;
                                content += `    if(ok) {\n`;
                                content += `      return val\n`;
                                content += `    }\n`
                                content += "    return nil\n";
                                content += "}\n\n";
                            }
                        }
                    }
                }
            }
        });
        return content;
    }

    getDecodeTable() {
        /**
         *  DecodeHitPoint()
         */
        let content = `    err = ${this.getFunctionName()}()\n`;
        content += `    if err != nil { return }\n`
        return content;
    }

    getLinkTable() {
        /**
         *  DecodeHitPoint()
         */
        return this.hasLink ? "    " + this.getLinkFunctionName() + "()\n" : "";
    }

    getTableName() {
        return this.getClassName() + "Table";
    }

    getFunctionName() {
        return "Decode" + this.getClassName();
    }

    getLinkFunctionName() {
        return "Link" + this.getClassName();
    }

    getClasses() {
        /**
         * HitPoint [] HitPointConfig
         */
        var content = "";
        if (!(this.config.tables && this.config.vertical))
            content += "  " + this.getClassName() + " " + (this.config.vertical ? "" : "[]") + "*" + getClassName(this.fileName) + "\n";
        if (this.config.tables) {
            for (var k in this.config.tables) {
                content += "  " + this.getClassName() + getSubTableName(k) + " " + (this.config.vertical ? "" : "[]") + "*" + getClassName(this.fileName) + "\n";
            }
        }
        return content;
    }

    getMaps() {
        //Config map[int32]*ConfigConfig
        if (this.config.vertical) return "";
        var content = "  " + this.getClassName() + ` map[${this.getKeyType()}]*` + getClassName(this.fileName) + "\n";
        if (this.config.tables) {
            for (var k in this.config.tables) {
                content += "  " + this.getClassName() + getSubTableName(k) + ` map[${this.getKeyType()}]*` + getClassName(this.fileName) + "\n";
            }
        }
        return content;
    }

    getClassName() {
        let str = changeNameToNameS(this.fileName);
        return upperFirstChar(str);
    }

    getKeyType() {
      return this.getTypeString(this.config.types[0]);
    }

    getTypeString(type) {
        if (type.isArray) {
            if (type.isClass) return "[]*" + getClassName(type.className);
            else return "[]" + this.getBaseType(type.baseType);
        } else if (type.isClass) {
            return "*" + getClassName(type.className);
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
        if (t == "int" || t == "int32") return "int32";
        if (t == "int64") return "int64";
        if (t == "uint" || t == "uint32") return "uint32";
        if (t == "uint64") return "uint64";
        if (t == "number" || t == "float" || t == "float32") return "float32";
        if (t == "float64") return "float64";
        if (t == "string") return "string";
    }
}

class Go {
    constructor() {
        this.files = [];
    }

    printGo(params, fileOut, packageName = "main") {
        let classDefine = "";
        let classes = "";
        let maps = "";
        let decodeTable = "";
        let linkTable = "";
        for (let i = 0; i < this.files.length; i++) {
            classDefine += this.files[i].getClassDefine();
            classes += this.files[i].getClasses();
            maps += this.files[i].getMaps();
            decodeTable += this.files[i].getDecodeTable();
            linkTable += this.files[i].getLinkTable();
        }
        console.log("打印 go 文件:", params.goout)
        let content = GetGoTemp(params.package || "main", classDefine, classes, maps, decodeTable, linkTable, params.out);
        (new File(params.goout ? params.goout : FilePath.join(params.out, params.package + ".go"))).save(content);
    }

    addPage(params, config) {
        // addPage(params, fileName, pageName, list) {
        let fileName = config.name;
        let outURL = params.out;
        // if (list.length < 3) return;
        // let types = list[0];
        // let names = list[1];
        // let descs = list[2];
        let res = [];
        this.files.push(new GoFile(fileName, config));
        global.printConfigCode = () => {
            this.printGo(params);
        }
        config.mapRow((rowIndex) => {
            // let items = list[i];
            let item = {};
            config.mapCol(rowIndex, (colIndex, type, name, itemContent) => {
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
                        if (typeof itemContent == "string") {
                            if (itemContent.indexOf("[") >= 0) {
                                itemContent = JSON.stringify(JSON.parse(itemContent));
                                itemContent = StringDo.replaceString(itemContent, "[", "");
                                itemContent = StringDo.replaceString(itemContent, "]", "");
                            }
                        }
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
                                        // console.log(item[name][f]);
                                        item[name][f] = parseFloat(item[name][f]);
                                    }
                                }
                                // console.log(item[name]);
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
                        if (itemContent != null && type.isString() && typeof itemContent != "string") {
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
            });
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
                    res.forEach((v, ind) => cfg[v[config.keyName]] = v);
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

global.Go = Go;