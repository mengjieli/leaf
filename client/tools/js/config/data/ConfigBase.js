class ConfigBase {

    constructor(params, tableName, url, list, tables) {
        this.params = params;
        //表导出名称
        this.name = tableName;
        //多张表格
        this.tables = tables;
        this.vertical = false;
        if (params.direction && params.direction.indexOf(tableName) != -1) {
            this.vertical = true;
        }
        let name = url.split("/")[url.split("/").length - 1];
        this.tableName = tableName + "(" + name + ")";
        this.url = url;
        this.list = list;
        //类型数组
        this.types = null;
        //忽略的列
        this.igonreCols = {};
        //列名称数组
        this.names = null;
        /**
         * 当前读取的行数索引
         */
        this.lineIndex = 0;
        this.dataStartIndex = 0;
        this.parseHead();
        this.parseContent();
    }

    /**
     * 准备读取数据
     */
    readyToData() {
        this.dataStartIndex = this.lineIndex;
    }

    /**
     * 检测第一列是否为 id 并且类型是否正确
     */
    checkId() {
        if (this.vertical) return;
        // if ((!this.names || !this.names.length || this.names[0] != "id"))
        //     throw "[error] 解析配置文件出错  表单:" + this.tableName + " 第一列不是 id";
        if (!this.types || !this.types.length || this.types[0].isArray || this.types[0].isClass
            || this.types[0].baseType != "int" && this.types[0].baseType != "int32" && this.types[0].baseType != "int64" && this.types[0].baseType != "string")
            throw "[error] 解析配置文件出错  表单:" + this.tableName + "  id 类型错误，目前支持的类型为 int32 或 int64 或 string";
    }

    readNames() {
        this.names = this.readLine();
        if (!this.names || this.names.length < this.types.length) {
            throw "[error] 解析配置文件出错  表单:" + this.tableName + "  读取列名称出错";
        }
        if(!this.vertical) {
          this.keyName = this.names[0];
        }
        for (let i = 0; i < this.types.length; i++) {
            this.checkColName(i);
        }
    }

    checkColName(index) {
        if (this.igonreCols[index]) return;
        if (index >= this.names.length)
            throw "[error] 解析配置文件出错  表单:" + this.tableName + "  读取列名称出错，第 " + (index + 1) + " 列";
        if (!this.names[index]) {
            this.addIgnoreCol(index);
            throw "忽略第 " + (index + 1) + " 列，没有填写字段名称  表单:" + this.tableName;
        }
    }

    /**
     * 读取输出语言
     */
    readLanguages() {
        let list = this.readLine();
        this.languages = list;
    }

    /**
     * 读取类型
     */
    readTypes() {
        let list = this.readLine();
        this.types = [];
        if (!list || !list.length) {
            throw "[error] 解析配置文件出错  表单:" + this.tableName + "  读取类型出错";
        }
        for (let i = 0; i < list.length; i++) {
            this.types[i] = new Type(list[i]);
            if (this.types[i].error) { //类型错误忽略
                if (list[i].charAt(0) != "#" && list[i] != "#")
                    console.log("[warn] 忽略第 " + (i + 1) + " 列，类型出错，当前类型:" + list[i] + "  表单:" + this.tableName);
                this.addIgnoreCol(i);
            } else if (this.types[i].ignore) { //忽略列
                this.addIgnoreCol(i);
                // console.log("[warn] 忽略第 " + (i + 1) + " 列  表单:" + this.tableName);
            } else if (this.languages && i < this.languages.length && this.languages[i] && (this.languages[i] == 'none' || this.languages[i] != 'all' && this.languages[i] != params.l)) {
                this.addIgnoreCol(i);
                // console.log("[warn] 忽略第 " + (i + 1) + " 列  表单:" + this.tableName);
            }
        }
    }

    /**
     * 描述信息
     */
    readDescs() {
        let list = this.readLine();
        this.descs = [];
        for (let i = 0; i < list.length; i++) {
            this.descs[i] = list[i];
        }
    }

    addIgnoreCol(index) {
        this.igonreCols[index] = true;
    }

    /**
     * 遍历表的每一列
     * @param {回掉函数} func (index,name,type)=>{}
     */
    mapColHead(func) {
        for (let i = 0; i < this.types.length; i++) {
            if (this.igonreCols[i]) continue;
            func(i, this.names[i], this.types[i], this.descs[i]);
        }
    }

    /**
     * 便利数据的每一行
     * @param {回掉函数} func  (rowIndex)=>{}
     */
    mapRow(func) {
        for (let i = this.dataStartIndex; i < this.list.length; i++) {
            const type = typeof this.list[i][0];
            if (type == 'string' && (+this.list[i][0]) + '' == this.list[i][0] + '') {
                this.list[i][0] = +this.list[i][0];
            }
            if (type != "number" && type != "string") {
                if (!this.vertical)
                    console.log("[warn] 忽略第 " + (i + 1) + "行，id 字段不为数字， 解析表格 表单:" + this.tableName);
                continue;
            }
            func(i);
        }
    }

    /**
     * 
     * @param {行数} rowIndex 
     * @param {回掉函数}} func  (colIndex,type,name,item)
     */
    mapCol(rowIndex, func) {
        let list = this.list[rowIndex];
        for (let i = 0; i < this.types.length; i++) {
            if (this.igonreCols[i]) continue;
            func(i, this.types[i], this.names[i], list[i]);
        }
    }

    parseHead() { }

    parseContent() { }

    readLine() {
        if (this.lineIndex >= this.list.length) return null;
        return this.list[this.lineIndex++];
    }

    static mergeHead(name, fileData, list, start, vertical) {
        if (vertical) return false;
        let old = fileData.list.concat();
        old.forEach((list, index) => old[index] = list.concat());
        //合并表头
        for (let i = 1; i < list[0].length; i++) {
            for (let j = 0; j < start; j++) {
                old[j].push(list[j][i]);
            }
        }
        let first = "";
        let error = "";
        for (let j = start; j < old.length; j++) {
            let find = false;
            for (let i = start; i < list.length; i++) {
                if (old[j][0] == list[i][0]) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                first == "" && (first = '\n\x1B[31m没有找到相同的 id:' + old[j][0] + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m');
                error += '\n\x1B[31m没有找到相同的 id:' + old[j][0] + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m';
            }
        }
        //合并表的内容
        for (let j = start; j < list.length; j++) {
            //查找 id
            let id = list[j][0];
            let find = false;
            for (let k = start; k < old.length; k++) {
                if (old[k][0] == id) {
                    for (let i = 1; i < list[0].length; i++) {
                        old[k].push(list[j][i]);
                    }
                    find = true;
                    break;
                }
            }
            if (!find) {
                error += '\n\x1B[31m没有找到相同的 id:' + id + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m';
            }
        }
        console.log(error)
        return error === "";
    }

    static merge(name, fileData, list, start) {
        let old = fileData.list;
        //合并表头
        for (let i = 1; i < list[0].length; i++) {
            for (let j = 0; j < start; j++) {
                old[j].push(list[j][i]);
            }
        }
        let first = "";
        let error = "";
        for (let j = start; j < old.length; j++) {
            let find = false;
            for (let i = start; i < list.length; i++) {
                if (old[j][0] == list[i][0]) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                first == "" && (first = '\n\x1B[31m没有找到相同的 id:' + old[j][0] + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m');
                error += '\n\x1B[31m没有找到相同的 id:' + old[j][0] + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m';
            }
        }
        //合并表的内容
        for (let j = start; j < list.length; j++) {
            //查找 id
            let id = list[j][0];
            let find = false;
            for (let k = start; k < old.length; k++) {
                if (old[k][0] == id) {
                    for (let i = 1; i < list[0].length; i++) {
                        old[k].push(list[j][i]);
                    }
                    find = true;
                    break;
                }
            }
            if (!find) {
                error += '\n\x1B[31m没有找到相同的 id:' + id + '  (' + name + ') ，多张表格的 id 必须完全一致(顺序可以不一样)\x1B[39m';
            }
        }
        // if (error) {
        //     if (params.info) throw error
        //     throw first
        // }
    }



    static merge2(name, fileData, list, start) {

    }
}

global.ConfigBase = ConfigBase;