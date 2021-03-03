namespace syncData {

  const getDataType = function (target: any, propertyName: string): DataType {
    if (!target.constructor.properties) {
      target.constructor.properties = new Map();
    }
    const properties: Map<string, DataType> = target.constructor.properties;
    let dataType = properties.get(propertyName);
    if (!dataType) {
      dataType = {
        type: 0,
        classType: null,
        key: propertyName,
        recordFlag: false,
        useDefaultValue: false
      };
      properties.set(propertyName, dataType);
    }
    return dataType;
  }

  export const type = function (type: number, classType?): PropertyDecorator {
    return function (target: any, propertyName: string) {
      const dataType: DataType = getDataType(target, propertyName);
      dataType.type = type;
      dataType.classType = classType;
    }
  }

  export const record = function (value: boolean): PropertyDecorator {
    return function (target: any, propertyName: string) {
      const dataType: DataType = getDataType(target, propertyName);
      dataType.recordFlag = value;
    }
  }
  export const defaultValue = function (value: boolean): PropertyDecorator {
    return function (target: any, propertyName: string) {
      const dataType: DataType = getDataType(target, propertyName);
      dataType.useDefaultValue = value;
    }
  }
}