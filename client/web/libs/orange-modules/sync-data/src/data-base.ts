namespace syncData {
  /**
   * 获取差异变化数值
   * @param target 要获取差异变化的对象
   * @param keys 键值数组，例如：["props", "itemA"]
   */
  export function getDifference(target: syncData.DataBase, keys: string[]): number {
    let historyValue: any = target.history;
    let currentValue: any = target;
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (typeof historyValue.get === "function") {
        historyValue = historyValue.get(key);
      }
      else if (typeof historyValue.getTime === "function") {
        historyValue = historyValue[key].getTime();
      }
      else {
        historyValue = historyValue[key];
      }

      //没有变化
      if (!historyValue) {
        if (i != keys.length - 1 && orange.debug) {
          console.warn("syncData.getDifference 数据非法", keys);
        }
        return currentValue;
      }

      if (typeof currentValue.get === "function") {
        currentValue = currentValue.get(key);
      }
      else if (typeof currentValue.getTime === "function") {
        currentValue = currentValue[key].getTime();
      }
      else {
        currentValue = currentValue[key];
      }
    }
    return currentValue - historyValue;
  }

  /**
   * 获取差异变化 Map
   * @param target 要获取差异变化的对象
   * @param keys 要获取差异变化的Map
   */
  export function getDifferenceMap(target: syncData.DataBase, keys: string | string[]): Map<any, number> {
    if (typeof keys === "string") {
      keys = [keys];
    }
    const result = new Map();
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      let history: Map<any, number> = target.history.get(key);
      let current: Map<any, number> = target[key];
      current.forEach((value, key) => {
        const historyValue = history.get(key) || 0;
        if (value - historyValue !== 0) {
          result.set(key, value - historyValue);
        }
      });
      // current减少为0被清除的情况
      history.forEach((value, key) => {
        if(!result.has(key)) {
            result.set(key, -value);
        }
      });
    }
    return result;
  }
  export function find(keys: string, value: any) {
    var val = orange.GetUtil.getFromGlobal(keys);
    var flag = false;
    if (val && val instanceof DataBase) {
      val.$search("", value, (findKeys, result) => {
        flag = true;
        console.log("[find] 找到对象:", keys + "." + findKeys, result);
      });
      if (!flag) console.log("[find] 没有查找到对应结果");
    } else {
      console.log("[find] 类型错误，无法查找");
    }
  }

  export abstract class DataBase extends orange.HashObject {
    constructor() {
      super();
    }

    _key_: string;

    dispose() {
      orange.stop(this);
      orange.removeAllListeners(this);
      let properties = this.properties;
      properties.forEach((t, key) => {
        if (t.type == 1) {
          if (this[key]) {
            this[key].dispose();
          }
        } else if (t.type == 2) {
          if (t.classType && this[key]) {
            for (let item of this[key]) {
              if (item) item.dispose();
            }
          }
        } else if (t.type == 3) {
          if (t.classType && this[key]) {
            this[key].forEach(item => {
              if (item) item.dispose();
            });
          }
        }
      });
    }

    find(value: any | ((val: any, findKeys: string) => boolean)) {
      var find = false;
      this.$search("", value, key => {
        find = true;
        console.log("[find] 找到结果:", key);
      });
      if (!find) {
        console.log("[find] 没有找到对应的结果");
      }
    }

    $search(
      keys: string,
      findValue: any | ((val: any, findKeys: string) => boolean),
      find: (key: string, value: any) => void
    ) {
      keys += keys == "" ? "" : ".";
      this.properties.forEach((value, key) => {
        var subKeys = keys + key;
        //0:基本类型  1:class  2:Array  3:Map 4:Date
        if (value.type == 0) {
          if (typeof findValue === "function") {
            if ((findValue as any)(this[key], subKeys))
              find(subKeys, this[key]);
          } else {
            if (this[key] == findValue) find(subKeys, this[key]);
          }
        } else if (value.type == 1) {
          this[key] &&
            this[key].$search &&
            this[key].$search(subKeys, findValue, find);
        } else if (value.type == 2) {
          this[key] &&
            this[key].forEach((item, ind) => {
              var ssubKeys = subKeys + `[${ind}]`;
              if (value.classType) {
                item && item.$search(ssubKeys, findValue, find);
              } else {
                if (typeof findValue === "function") {
                  if ((findValue as any)(item, ssubKeys)) find(ssubKeys, item);
                } else {
                  if (item == findValue) find(ssubKeys, item);
                }
              }
            });
        } else if (value.type == 3) {
          this[key] &&
            this[key].forEach((item, k) => {
              var ssubKeys =
                subKeys + `.get(${typeof k === "string" ? '"' + k + '"' : k})`;
              if (value.classType) {
                if (item) {
                  if (item.$search) {
                    item.$search(ssubKeys, findValue, find);
                  } else if (typeof item === "object") {
                    for (var ok in item) {
                      var sssubKeys = ssubKeys + "." + ok;
                      if (typeof findValue === "function") {
                        if ((findValue as any)(item[ok], sssubKeys))
                          find(sssubKeys, item);
                      } else {
                        if (item[ok] == findValue) find(sssubKeys, item[ok]);
                      }
                    }
                  }
                }
              } else {
                if (typeof findValue === "function") {
                  if ((findValue as any)(item, ssubKeys)) find(ssubKeys, item);
                } else {
                  if (item == findValue) find(ssubKeys, item);
                }
              }
            });
        }
      });
    }

    properties: Map<string, DataType> = Object.getPrototypeOf(this).constructor.properties;

    toJSON() {
      let obj = {};
      this.properties.forEach((value, key) => {
        //0:基本类型  1:class  2:Array  3:Map 4:Date
        if (value.type == 0) obj[key] = this[key];
        if (value.type == 1) obj[key] = this[key].toJSON();
        if (value.type == 2) {
          if (!value.classType) {
            obj[key] = this[key];
          } else {
            obj[key] = [];
            for (let item of this[key]) {
              obj[key].push(item.toJSON());
            }
          }
        } else if (value.type == 3) {
          if (!value.classType) {
            obj[key] = this[key];
          } else {
            obj[key] = new Map();
            for (let item of this[key]) {
              obj[key].push(item.toJSON());
            }
          }
        } else if (value.type === 4) {
          obj[key] = this[key].toString();
        }
      });
      return obj;
    }

    /**
     * @param name 属性名称
     * @param clazz 类型
     * @param type 0:简单类型  1:class  2:Array  3:Map 4:Date
     */
    protected createProperty(name: string): any {
      let t: DataType = this.properties.get(name);
      if (t.type == 1) return new t.classType();
      if (t.type == 2) return new Array<any>();
      if (t.type == 3) return new Map();
      if (t.type == 4) return new Date();
      const type = typeof this[name];
      if (type === "string") {
        return '';
      } else if (type === "boolean") {
        return false;
      } else {
        return 0;
      }
    }

    /**
     * 清空数据
     */
    reset(): void {
      let properties = this.properties;
      for (let [k, v] of properties) {
        if (v.type === 0 || v.type === 4) {
          this[k] = this.createProperty(k);
        } else if (v.type === 1) {
          if (this[k]) this[k].reset();
        } else if (v.type === 2) {
          if (!this[k]) this[k] = this.createProperty(k);
          if (this[k]) this[k].length = 0;
        } else if (v.type === 3) {
          if (!this[k]) this[k] = this.createProperty(k);
          if (this[k]) this[k].clear();
        }
      }
    }

    /**
     * 复制一个对象
     */
    clone() {
      let type = Object.getPrototypeOf(this);
      let obj = new type.constructor();
      let properties = this.properties;
      for (let [k, v] of properties) {
        if (v.type === 0) {
          obj[k] = this[k];
        } else if (v.type === 1) {
          if (this[k]) obj[k] = this[k].clone();
          else obj[k] = this.createProperty(k);
        } else if (v.type === 2) {
          obj[k] = this.createProperty(k);
          if (this[k]) this[k].forEach(item => obj[k].push(item));
        } else if (v.type === 3) {
          obj[k] = this.createProperty(k);
          if (this[k])
            this[k].forEach((item, itemKey) => obj[k].set(itemKey, item));
        } else if (v.type === 4) {
          const date: Date = this.createProperty(k);
          date.setTime(this[k].getTime());
          obj[k] = date;
        }
      }
      return obj;
    }

    @orange.watch history = new Map<string, any>();

    /**
     * @internal
     * @param obj
     */
    public setValue(obj: any, path?: string) {
      let properties = this.properties;
      for (let key in obj) {
        let value = obj[key];
        let propertyType = properties.get(key);
        if (!propertyType) continue;
        //如果使用默认值填充，后端传null自动转成默认值
        if (value === null && propertyType.useDefaultValue) {
          if (propertyType.type == 2) {
            this[key].length = 0;
          }
          else if (propertyType.type == 3) {
            this[key].clear();
          }
          else {
            this[key] = this.createProperty(key);
          }
          continue;
        }
        if (propertyType.type == 0) {
          const oldValue = this[key];
          this[key] = value;
          if (propertyType.recordFlag) {
            this.setHistoryValue(key, oldValue, value);
          }
        } else if (propertyType.type == 1) {
          //如果是对象
          if (this[key]) {
            //如果对象不为空
            let objKeyName = this[key]._key_;
            //如果定义了 keyName 并且 value 携带 keyName 并且 value 和当前对象的 keyName 属性不等
            if (
              objKeyName &&
              value.hasOwnProperty(objKeyName) &&
              this[key][objKeyName] != value[objKeyName]
            ) {
              let e = new UpdateEvent(UpdateEvent.RESET_DATA);
              e.data = this[key];
              e.name = key;
              e.path = path + "." + key;
              e.proxy = UpdateEvent.$proxy;
              UpdateEvent.emitter.emit(e);
              this[key].reset();
            }
          } else {
            this[key] = this.createProperty(key);
          }
          this[key].setValue(value, path + "." + key);
        } else if (propertyType.type == 2) {
          //数组只有全量更新
          const oldValue = this[key];
          if (value == null) {
            //如果传过来的内容为 null ，则清空数组
            this[key] = [];
          } else {
            if (propertyType.classType) {
              if (this[key]) {
                for (let item of this[key]) {
                  item && item.dispose();
                }
              }
              this[key] = [];
              for (let itemValue of value) {
                let item = new propertyType.classType();
                if (item.setValue) {
                  item.setValue(
                    itemValue,
                    path + "." + key + "[" + value.indexOf(itemValue) + "]"
                  );
                } else {
                  for (let k in itemValue) {
                    item[k] = value[k];
                  }
                }
                this[key].push(item);
              }
            } else {
              this[key] = value;
            }
          }
          if (propertyType.recordFlag) {
            this.setHistoryValue(key, oldValue, this[key]);
          }
        } else if (propertyType.type == 3) {
          // map 支持增量更新
          let map: Map<any, any> = this[key];
          let oldValue: Map<any, any>;
          if (propertyType.recordFlag) {
            oldValue = new Map<any, any>();
            map.forEach((v, k) => oldValue.set(k, v));
          }
          if (value == null) {
            map.clear();
          } else {
            for (let k in value) {
              if (+k + "" === k) k = +k as any;
              let val = value[k];
              if (val == null) {
                map.delete(k);
              } else if (!map.has(k)) {
                if (!propertyType.classType) {
                  map.set(k, value[k]);
                } else {
                  let item = new propertyType.classType();
                  item.setValue(
                    value[k],
                    path +
                    "." +
                    key +
                    ".get(" +
                    (typeof k == "string" ? '"' + k + '"' : k) +
                    ")"
                  );
                  map.set(k, item);
                }
              } else {
                if (propertyType.classType) {
                  let item = map.get(k);
                  item.setValue(
                    value[k],
                    path +
                    "." +
                    key +
                    ".get(" +
                    (typeof k == "string" ? '"' + k + '"' : k) +
                    ")"
                  );
                } else {
                  map.set(k, value[k]);
                }
              }
            }
          }
          if (propertyType.recordFlag) {
            this.setHistoryValue(key, oldValue, this[key]);
          }
        } else if (propertyType.type === 4) {
          const oldValue: Date = this[key];
          if (value instanceof Array) {
            this[key] = new Date(value[0] * 1000 + value[1] / 10e5);
          } else {
            this[key] = new Date(value);
          }
          if (propertyType.recordFlag) {
            this.setHistoryValue(key, oldValue, this[key]);
          }
        }
      }
    }

    private setHistoryValue(key, oldValue, newValue) {
      if (this.history.has(key)) {
        this.history.set(key, oldValue);
      }
      else {
        this.history.set(key, newValue);
      }
    }

    /**
     * 设置 map 对象
     * @param map
     * @param value
     * @param classDefine
     */
    public setMap(key: string, value, classDefine?: any): void {
      var map = this[key];
      if (!classDefine) classDefine = this.properties.get(key).classType;
      if (value == null) {
        map.clear();
        return;
      }
      for (let k in value) {
        if (+k + "" === k) k = +k as any;
        let val = value[k];
        if (val == null) {
          map.delete(k);
        } else if (!map.has(k)) {
          if (!classDefine) {
            map.set(k, value[k]);
          } else {
            let item = new classDefine();
            item.setValue(value[k]);
            map.set(k, item);
          }
        } else {
          if (classDefine) {
            let item = map.get(k);
            item.setValue(value[k]);
          } else {
            map.set(k, value[k]);
          }
        }
      }
    }

    /**
     * 设置 map 对象
     * @param map
     * @param value
     * @param classDefine
     */
    public static setMap(map: Map<any, any>, value, classDefine: any): void {
      if (value == null) {
        map.clear();
        return;
      }
      for (let k in value) {
        if (+k + "" === k) k = +k as any;
        let val = value[k];
        if (val == null) {
          map.delete(k);
        } else if (!map.has(k)) {
          if (!classDefine) {
            map.set(k, value[k]);
          } else {
            let item = new classDefine();
            item.setValue(value[k]);
            map.set(k, item);
          }
        } else {
          if (classDefine) {
            let item = map.get(k);
            item.setValue(value[k]);
          } else {
            map.set(k, value[k]);
          }
        }
      }
    }
  }
}

try {
  window["syncData"] = syncData;
  window["orange"]["sync"] = syncData;
} catch (e) { }
