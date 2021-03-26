namespace orange {

    export class GetUtil {

        /**
         * 根据一个字符串获取全局变量
         * @param attribute "Formula.countAttack"
         */
        public static getFromGlobal(attribute: string, root?: any): any {
            let arr = attribute.split(".");
            let res = root || window;
            for (let i = 0; i < arr.length; i++) {
                res = res[arr[i]];
                if (res == null) return res;
            }
            return res;
        }

        public static setFromGlobal(attribute: string, value: any, root?: any): any {
            let arr = attribute.split(".");
            let res = root || window;
            for (let i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                    res[arr[i]] = value;
                    if (GetUtil.watchs.has(attribute)) GetUtil.watchs.get(attribute).forEach(call => call(value));
                } else {
                    if (!res[arr[i]]) res[arr[i]] = {};
                    res = res[arr[i]];
                }
            }
            return res;
        }

        /**
         * @internal
         */
        private static watchs = new Map<string, ((value: any) => void)[]>();

        public static watchFromGlobal(attribute: string, back: (value: any) => void): () => void {
            if (!GetUtil.watchs.has(attribute)) {
                GetUtil.watchs.set(attribute, []);
            }
            GetUtil.watchs.get(attribute).push(back);
            back(GetUtil.getFromGlobal(attribute))
            return () => {
                GetUtil.watchs.get(attribute).splice(GetUtil.watchs.get(attribute).indexOf(back), 1);
            }
        }
    }
}