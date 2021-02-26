"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigData = /** @class */ (function () {
    function ConfigData() {
        this.tables = [];
    }
    return ConfigData;
}());
exports.ConfigData = ConfigData;
var TableData = /** @class */ (function () {
    function TableData() {
        /**
         * 表格列
         */
        this.cols = [];
        /**
         * 表格唯一索引
         */
        this.key = 'id';
    }
    return TableData;
}());
exports.TableData = TableData;
var TableItem = /** @class */ (function () {
    function TableItem() {
    }
    /**
     * 是否忽略
     * @param lang 输出语言
     */
    TableItem.prototype.igonre = function (lang) {
        if (this.lang == '' || this.lang == 'all')
            return false;
        return lang == this.lang;
    };
    return TableItem;
}());
exports.TableItem = TableItem;
//# sourceMappingURL=config-data.js.map