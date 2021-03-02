class ConfigV2 extends ConfigBase {

    parseHead() {
        this.version = 2
        //检查表名格式
        this.checkTableName();
        //读取输出语言
        this.readLanguages();
        this.language = this.languages[0];
        if (this.language == 'none' || this.language != params.l && this.language != 'all') {
            this.igonre = true;
            return;
        }
        //读取 types
        this.readTypes();
        //读取名称
        this.readNames();
        //检测第一列是不是 id 并且类型是否正确
        this.checkId();
        //过滤提示信息行
        this.readDescs();
        //准备读取数据
        this.readyToData();
        // console.log(this.tableName);
        // this.mapRow((rowIndex)=>{
        //     console.log(this.tableName + "行：" + rowIndex);
        //     this.mapCol(rowIndex,(colIndex,type,name,item)=>{
        //         console.log("列")
        //         console.log(colIndex,type,name,item);
        //     })
        // })
    }

    /**
     * 检查表名格式
     */
    checkTableName() {
        if (!this.name || this.name == "" || typeof this.name != "string") throw "解析表格类名出错 表单:" + this.tableName + "  类名:" + this.name;
        if (!StringDo.isId(this.name)) throw "表格类名错误，必须以字母开头，其它字符为字母或数组 表单:" + this.tableName + "  类名:" + this.name;
    }

    static mergeHead(name, fileData, list, vertical) {
        return ConfigBase.mergeHead(name, fileData, list, 4, vertical);
    }

    static merge(name, fileData, list) {
        ConfigBase.merge(name, fileData, list, 4);
    }

    static getContentList(list) {
        return list.slice(4, list.length);
    }

    static addVerticalContent(source, pos, list) {
        var res = [];
        for (var i = 0; i < list.length; i++) {
            res.push(list[i][4]);
        }
        for (var i = 0; i < source.length; i++) {
            source[i][4 + pos] = res[i];
        }
    }

    static getHeadLen() {
        return 4;
    }
}

global.ConfigV2 = ConfigV2;