namespace syncData {

  export type DataType = {
    /**
     * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map 4:Date
     */
    type: number | string;
    /**
     * 关联的类类型
     */
    classType: any;

    /**
     * 属性名
     */
    key: string;

    /**
     * 记录差异值
     */
    recordFlag: boolean;

    /**
     * 遇到服务端传null的情况是否使用默认值填充数据
     */
    useDefaultValue: boolean;
  }
}