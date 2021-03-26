namespace orange {

  export class ArrayUtil {

    public static getItem(source: any[], key: string, value: any): any {
      for (let item of source) {
        if (item[key] == value) return item;
      }
      return null;
    }

    /**
     * 根据权重，返回随机的索引
     * @param list 权重数组
     */
    public static getRandom(list: number[]): number {
      let sum = 0;
      list.forEach(n => sum += n);
      let r = sum * Math.random();
      for (let i = 0; i < list.length; i++) {
        if (r <= list[i]) return i;
        r -= list[i];
      }
      return list.length - 1;
    }
  }
}