class Type {

    constructor(str) {
        //int	int	(AI)int	(Avatar)int	(HitPoint)Array(int)	number
        if (!str) {
            this.ignore = true;
            return;
        }
        try {
            str = StringDo.replaceString(str, "整数数组", "Array(int)");
            str = StringDo.replaceString(str, "长整数数组", "Array(int64)");
            str = StringDo.replaceString(str, "小数数组", "Array(float)");
            str = StringDo.replaceString(str, "长小数数组", "Array(float64)");
            str = StringDo.replaceString(str, "文本数组", "Array(string)");
            str = StringDo.replaceString(str, "长整数", "int64");
            str = StringDo.replaceString(str, "整数", "int");
            str = StringDo.replaceString(str, "小数", "float");
            str = StringDo.replaceString(str, "长小数", "float64");
            str = StringDo.replaceString(str, "文本", "string");
            str = StringDo.replaceString(str, " ", "");
            this.isArray = false;
            this.isClass = false;
            this.className = "";
            this.classId = "id";
            this.baseType = "";
            this.error = false;
            if (str.charAt(0) == "(") {
                this.isClass = true;
                this.className = str.slice(1, str.indexOf(")"));
                str = str.slice(str.indexOf(")") + 1, str.length);
                if (this.className.indexOf("<") != -1) {
                    this.classId = this.className.slice(this.className.indexOf("<") + 1, this.className.indexOf(">"));
                    this.className = this.className.slice(0, this.className.indexOf("<"));
                }
            }
            if (str.indexOf("(") >= 0) {
                this.isArray = true;
                this.baseType = str.slice(str.indexOf("(") + 1, str.length - 1);
            } else {
                this.baseType = str;
            }
            if (!this.isBaseType(this.baseType)) {
                // console.log("错误的基本类型：" + this.baseType);
                this.error = true;
            }
        } catch (e) {
            console.log('类型解析错误: ' + str)
        }
    }

    isBaseType(type) {
        return type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32" || type == "uint64" ||
            type == "number" || type == "float" || type == "float32" || type == "float64" || type == "range" ||
            type == "string" ? true : false;
    }

    isString() {
        return this.baseType == "string" ? true : false;
    }

    isNumber() {
        let type = this.baseType;
        if (type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32" || type == "uint64" ||
            type == "number" || type == "float" || type == "float32" || type == "float64" || type == "range") return true;
        return false;
    }

    getTypeString(type, language) {
        if (language == "ts") {
            if (type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32" || type == "uint64" ||
                type == "number" || type == "float" || type == "float32" || type == "float64") return "number";
            if (type == "range") return "Range";
            if (type == "string") return "string";
        }
    }
}

global.Type = Type;