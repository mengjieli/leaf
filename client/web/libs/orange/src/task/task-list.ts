namespace orange {

  export class TaskList<T> {

    /**
     * @internal
     */
    private source: Array<T>;
    /**
     * @internal
     */
    private operates: [string, Function][] = [];
    /**
     * @internal
     */
    private over = false;

    constructor(source: Array<T>) {
      this.source = source;
    }

    // public emit<S>(f: (source: Array<T>, currentValue: any, eimit: (item: S, index?: number, source?: Array<T>, taskList?: TaskList<S>) => Promise<any>) => boolean, initValue: any = 0): TaskList<S> {
    //   this.operates.push(['emit', (list: Array<T>): void => {
    //     let arr = [];
    //     for (let i = 0; i < list.length; i++) {
    //       if (this.over) return;
    //       arr = arr.concat(f(list[i], i, list));
    //     }
    //     return arr;
    //   }]);
    //   return this as any;
    // }

    /**
     * 转换任务，拆分任务
     * @param f 
     */
    public transform<S>(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => S[] | S): TaskList<S> {
      this.operates.push(['transform', (list: Array<T>): Array<S> => {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          if (this.over) return;
          arr = arr.concat(f(list[i], i, list));
        }
        return arr;
      }]);
      return this as any;
    }

    /**
     * 串行处理任务
     * @param f 处理函数
     */
    public serial(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => Promise<any>): TaskList<T> {
      this.operates.push(['serial', async (list: Array<T>) => {
        for (let i = 0; i < list.length; i++) {
          if (this.over) return;
          await f(list[i], i, list);
        }
      }]);
      return this;
    }

    /**
     * 并行处理任务，所有任务处理完后进行到下一步
     * @param f 处理函数
     */
    public parallel(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => Promise<any>): TaskList<T> {
      this.operates.push(['parallel', async (list: Array<T>) => {
        return new Promise<void>(resolve => {
          let n = list.length;
          if (!n) {
            resolve();
            return;
          }
          list.forEach(async (item, index, list) => {
            if (this.over) return;
            await f(item, index, list);
            if (this.over) return;
            n--;
            if (n == 0) {
              resolve();
            }
          });
        })
      }]);
      return this;
    }

    /**
     * 执行
     */
    public async execute() {
      if (this.over) return;
      let list = this.source;
      for (let [type, f] of this.operates) {
        if (type == 'serial' || type == 'parallel') {
          await f(list);
          if (this.over) return;
        } else if (type == 'transform') {
          list = f(list);
        }
      }
    }

    /**
     * 停止执行所有的任务
     */
    public stop(): void {
      this.over = true;
    }
  }
}