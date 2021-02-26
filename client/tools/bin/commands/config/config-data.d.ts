import { ConfigCommand } from './config-command';
export declare class ConfigData {
    command: ConfigCommand;
    tables: Array<TableData>;
}
export declare class TableData {
    /**
     * 文件路径
     */
    url: string;
    /**
     * 文件名称(不带后缀)
     */
    fileName: string;
    /**
     * 表名
     */
    tableName: string;
    /**
     * 表格版本号
     */
    version: string;
    /**
     * 表格列
     */
    cols: Array<TableItem>;
    /**
     * 表格唯一索引
     */
    key: string;
    /**
     * 内容
     */
    list: Array<Array<string>>;
}
export declare class TableItem {
    /**
     * 输出语言 all、ts、go 等等
     */
    lang: string;
    /**
     * 类型 int32、int64、float32、float64、string 或其它类名
     */
    type: string;
    /**
     * 是否为数组
     */
    isArray: boolean;
    /**
     * 是否为其它类
     */
    isClass: boolean;
    /**
     * 字段名
     */
    name: string;
    /**
     * 描述
     */
    desc: string;
    /**
     * 是否忽略
     * @param lang 输出语言
     */
    igonre(lang: string): boolean;
}
