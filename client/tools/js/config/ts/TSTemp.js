/**
 * 
 * @param {*} classDefine 
 export class HitPoint {

        public id:number;
        public x:number;
        public y:number;
        public r:number;
        public role:Role;
        
        public static list:Array<HitPoint> = [];

        public static getById(value:number) {
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                if(list[i].id == value) return list[i];
            }
            return null;
        }

        public static decode(list:Array<any>) {
            HitPoint.list.length = 0;
            for(let i = 0; i < list.length; i++) {
                let item = new HitPoint();
                for(let k in list[i]) {
                    item[k] = list[i];
                }
                HitPoint.list.push(item);
            }
        }

        public static link() {
            HitPoint.list.length = 0;
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                let item = list[i];
                item.role = Role.getById(item["c_item_role"])
            }
            return null;
        }
    }
 * 
 * @param {*} decodeTable 
 * 
        for(let k in tables) {
            if(k == "HitPoint") {
                HitPoint.decode(tables[k]);
            }
        }
* @param {*} linkTable
        for(let k in tables) {
            if(k == "HitPoint") {
                HitPoint.libk(tables[k]);
            }
        }
 */
global.GetTSTemp = function (
    classDefine,
    decodeTable,
    linkTable,
    list,
    package,
    numberExtend
) {
    if (package != null) {
        return `namespace ${package} {
${classDefine}  export function decodeConfig(tables) {
    for (const k in tables) {
${decodeTable}    }
${linkTable}}

  export const configList = [${list}];
}
${numberExtend}
window['${package}'] = ${package};
`;
    } else {
        return `${classDefine}export function decodeConfig(tables) {
  for (const k in tables) {
${decodeTable}  }
${linkTable}}
export const configList = [${list}];
${numberExtend}
`;
    }
};
