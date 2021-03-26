namespace syncData {

  export class DataType {

    /**
     * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map
     */
    public type: number | string = 0;

    /**
     * 关联的类类型
     */
    public classType: any;


    public key: string = "id";

    /**
     * 记录差异值
     */
    public recordFlag: boolean = false;

    /**
     * 初始化值
     */
    public init: any;

    constructor(type: number, classType?: any, init?: any, recordFlag: boolean = false) {
      this.type = type;
      this.classType = classType;
      this.init = init;
      this.recordFlag = recordFlag;
    }
  }
}