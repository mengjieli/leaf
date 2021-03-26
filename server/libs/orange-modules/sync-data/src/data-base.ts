namespace syncData {

  export function find(keys: string, value: any) {
    var val = orange.GetUtil.getFromGlobal(keys);
    var flag = false;
    if (val && val instanceof DataBase) {
      val.$search("", value, (findKeys, result) => {
        flag = true;
        console.log('[find] 找到对象:', keys + '.' + findKeys, result);
      });
      if (!flag) console.log('[find] 没有查找到对应结果')
    } else {
      console.log('[find] 类型错误，无法查找')
    }
  }

  export abstract class DataBase extends orange.HashObject {

    constructor(properties?: Map<string, DataType>) {
      super();
      this.properties = properties;
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
            })
          }
        }
      })
    }

    find(value: any | ((val: any, findKeys: string) => boolean)) {
      var find = false;
      this.$search("", value, key => {
        find = true;
        console.log('[find] 找到结果:', key);
      });
      if (!find) {
        console.log('[find] 没有找到对应的结果')
      }
    }

    $search(keys: string, findValue: any | ((val: any, findKeys: string) => boolean), find: (key: string, value: any) => void) {
      keys += keys == "" ? '' : '.';
      this.properties.forEach((value, key) => {
        var subKeys = keys + key;
        //0:基本类型  1:class  2:Array  3:Map
        if (value.type == 0) {
          if (typeof findValue === 'function') {
            if ((findValue as any)(this[key], subKeys)) find(subKeys, this[key]);
          } else {
            if (this[key] == findValue) find(subKeys, this[key]);
          }
        } else if (value.type == 1) {
          this[key] && this[key].$search && this[key].$search(subKeys, findValue, find);
        } else if (value.type == 2) {
          this[key] && this[key].forEach((item, ind) => {
            var ssubKeys = subKeys + `[${ind}]`;
            if (value.classType) {
              item && item.$search(ssubKeys, findValue, find);
            } else {
              if (typeof findValue === 'function') {
                if ((findValue as any)(item, ssubKeys)) find(ssubKeys, item);
              } else {
                if (item == findValue) find(ssubKeys, item);
              }
            }
          })
        } else if (value.type == 3) {
          this[key] && this[key].forEach((item, k) => {
            var ssubKeys = subKeys + `.get(${typeof k === 'string' ? '"' + k + '"' : k})`;
            if (value.classType) {
              if (item) {
                if (item.$search) {
                  item.$search(ssubKeys, findValue, find);
                } else if (typeof item === 'object') {
                  for (var ok in item) {
                    var sssubKeys = ssubKeys + '.' + ok;
                    if (typeof findValue === 'function') {
                      if ((findValue as any)(item[ok], sssubKeys)) find(sssubKeys, item);
                    } else {
                      if (item[ok] == findValue) find(sssubKeys, item[ok]);
                    }
                  }
                }
              }
            } else {
              if (typeof findValue === 'function') {
                if ((findValue as any)(item, ssubKeys)) find(ssubKeys, item);
              } else {
                if (item == findValue) find(ssubKeys, item);
              }
            }
          })
        }
      });
    }

    properties: Map<string, DataType>;

    toJSON() {
      let obj = {};
      this.properties.forEach((value, key) => {
        //0:基本类型  1:class  2:Array  3:Map
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
        }
      });
      return obj;
    }

    /**
     * @param name 属性名称
     * @param clazz 类型
     * @param type 0:简单类型  1:class  2:Array  3:Map
     */
    protected createProperty(name: string): any {
      let t: DataType = this.properties.get(name);
      if (t.type == 1) return new t.classType();
      if (t.type == 2) return new Array<any>();
      if (t.type == 3) return new Map();
      return t.init;
    }

    /**
     * 清空数据
     */
    reset(): void {
      let properties = this.properties;
      for (let [k, v] of properties) {
        if (v.type === 0) {
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
          if (this[k]) this[k].forEach((item, itemKey) => obj[k].set(itemKey, item));
        }
      }
      return obj;
    }

    @orange.watch history = new Map<string, any>();

    /**
     * @param obj 
     */
    public setValue(obj: any, path: string = '') {
      let properties = this.properties;
      for (let key in obj) {
        let value = obj[key];
        let propertyType = properties.get(key);
        if (!propertyType) continue;
        if (propertyType.type == 0) {
          if (propertyType.recordFlag) {
            this.history.set(key, this[key]);
          }
          this[key] = value;
        } else if (propertyType.type == 1) { //如果是对象
          if (this[key]) { //如果对象不为空
            let objKeyName = this[key]._key_;
            //如果定义了 keyName 并且 value 携带 keyName 并且 value 和当前对象的 keyName 属性不等
            if (objKeyName && value.hasOwnProperty(objKeyName) && this[key][objKeyName] != value[objKeyName]) {
              let e = new UpdateEvent(UpdateEvent.RESET_DATA);
              e.data = this[key];
              e.name = key;
              e.path = path + '.' + key;
              e.proxy = UpdateEvent.$proxy;
              UpdateEvent.emitter.emit(e);
              this[key].reset();
            }
          } else {
            this[key] = this.createProperty(key);
          }
          this[key].setValue(value, path + '.' + key);
        } else if (propertyType.type == 2) { //数组只有全量更新
          if (propertyType.recordFlag) {
            this.history.set(key, this[key]);
          }
          if (value == null) { //如果传过来的内容为 null ，则清空数组
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
                  item.setValue(itemValue, path + '.' + key + '[' + value.indexOf(itemValue) + ']');
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
        } else if (propertyType.type == 3) { // map 支持增量更新
          let map: Map<any, any> = this[key];
          if (propertyType.recordFlag) {
            var m = new Map<any, any>();
            map.forEach((v, k) => m.set(k, v));
            this.history.set(key, m);
          }
          if (value == null) {
            map.clear();
          } else {
            for (let k in value) {
              if (+k + '' === k) k = +k as any;
              let val = value[k];
              if (val == null) {
                map.delete(k);
              } else if (!map.has(k)) {
                if (!propertyType.classType) {
                  map.set(k, value[k]);
                } else {
                  let item = new propertyType.classType();
                  item.setValue(value[k], path + '.' + key + '.get(' + (typeof k == 'string' ? '"' + k + '"' : k) + ')');
                  map.set(k, item);
                }
              } else {
                if (propertyType.classType) {
                  let item = map.get(k);
                  item.setValue(value[k], path + '.' + key + '.get(' + (typeof k == 'string' ? '"' + k + '"' : k) + ')');
                } else {
                  map.set(k, value[k]);
                }
              }
            }
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
    public setMap(key: string, value, classDefine?: any): void {
      var map = this[key];
      if (!classDefine) classDefine = this.properties.get(key).classType;
      if (value == null) {
        map.clear();
        return;
      }
      for (let k in value) {
        if (+k + '' === k) k = +k as any;
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
        if (+k + '' === k) k = +k as any;
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
} catch (e) {
}