namespace orange {

    export class Debug {

        /**
         * 已运行过的 autorun 函数总和
         */
        public static autorunSum = 0;

        /**
         * 当前正在运行的 autorun 函数
         */
        public static autorunCount = 0;

        // /**
        //  * 打印调试信息
        //  */
        // public static print() {
        //     if (!orange.debug) {
        //         console.warn('[orange debug] 未开启 orange 调试信息')
        //         return;
        //     }
        //     //   console.log(JSON.stringify({
        //     //     "autorunCount": Debug.autorunCount,
        //     //     "autorunSum": Debug.autorunSum
        //     //   }, null, 2))
        // }
    }
}

namespace orange {

    /**
     * 检测对象或类（这个类所有的对象）某个属性 何时变成 特定值
     * @param host 对象或者类定义
     * @param property 属性名称
     * @param val 属性值
     */
    export function whenEquals(host, property, val) {
        let isClass = false;
        let d = getPropertyOf(host, property);
        let newHost = host;
        if (d == null) {
            try {
                newHost = new host();
                d = getPropertyOf(newHost, property);
                isClass = true;
            } catch (e) {
                newHost = host;
                d = null;
            }
        }
        if (d && d.set && d.get) {
            let orgSet = d.set;
            d.set = function (value: any) {
                if (isClass || this == host) {
                    if (value == val) {
                        if (isClass) console.warn("[检测到属性改变] ", val, property, host);
                        else console.warn("[检测到属性改变] ", host[property], val, property, host);
                        console.warn("[在这一行打断点就可以 debug 了] ");
                    }
                }
                orgSet.call(this, value);
            };
            Object.defineProperty(Object.getPrototypeOf(newHost), property, {
                set: d.set,
                get: d.get,
                enumerable: true,
                configurable: true
            });
            console.warn("whenEquals: 点击打断点查看 ⬆");
        } else {
            console.warn("whenEquals 调用失败，没有查到对应的属性：" + property);
        }
    }


    export function getPropertyOf(host, property) {
        let prototype = Object.getPrototypeOf(host);;
        while (prototype) {
            let d = Object.getOwnPropertyDescriptor(prototype, property);
            if (d) return d;
            prototype = prototype.__proto__;
        }
        return null;
    }

}