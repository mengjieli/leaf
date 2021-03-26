/**
 * @internal
 */
namespace egretExtend {


  export class ArrayCollection<T> implements eui.ICollection {

    [key: number]: T;

    /**
     * @internal
     */
    private source = new eui.ArrayCollection;

    constructor() {
      if (ArrayCollection.lock) {
        throw "请通过工厂方法 ArrayCollection.create 创建"
      }
    }

    indexOf(item: T): number {
      for (let i = 0, len = this.length; i < len; i++) {
        if (this.source.getItemAt(i) == item) {
          return i;
        }
      }
      return -1;
    }

    push(...items: T[]) {
      this.splice(this.length, 0, ...items);
    }

    pop(): T | undefined {
      return this.source.length ? this.source.removeItemAt(this.source.length - 1) : undefined;
    }

    shift(): T | undefined {
      return this.source.length ? this.source.removeItemAt(0) : undefined;
    }

    splice(start: number, deleteCount: number, ...items: T[]): T[] {
      if (deleteCount <= 0) {
        for (let i = 0; i < items.length; i++) {
          this.source.addItemAt(items[i], start + i);
        }
        return items;
      } else {
        let arr = [];
        for (let i = 0; i < deleteCount; i++) {
          arr.push(this.source.removeItemAt(start));
        }
        return arr;
      }
    }

    sort(compareFn?: (a: T, b: T) => number): ArrayCollection<T> {
      let source = this.source;
      for (let i = 0; i < this.length - 1; i++) {
        if (compareFn(source.getItemAt(i), source.getItemAt(i + 1)) > 0) {
          let item = source.getItemAt(i);
          source.replaceItemAt(source.getItemAt(i + 1), i);
          source.replaceItemAt(item, i + 1);
          i = 0;
        }
      }
      return this;
    }

    set length(len: number) {
      if (len < 0) return;
      if (this.length > len) {
        while (this.length > len) {
          this.source.removeItemAt(this.length - 1);
        }
      } else {
        while (this.length < len) {
          this.source.addItemAt(null, this.length);
        }
      }
    }

    get length(): number {
      return this.source.length;
    }

    get(key, receiver) {
      return this.source.getItemAt(+key);
    }

    set(key, value, receiver) {
      key = +key;
      if (key >= this.length) this.source.addItemAt(value, key);
      else this.source.replaceItemAt(value, key);
    }

    [Symbol.iterator](): Iterator<T> {
      return ArrayCollectionIterator.create<T>(this);
    }

    getItemAt(index: number): T {
      return this.source.getItemAt(index);
    }

    getItemIndex(item: T): number {
      return this.indexOf(item);
    }

    addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
      this.source.addEventListener.call(this.source, ...arguments);
    }

    once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
      this.source.once.call(this.source, ...arguments);
    }

    removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {
      this.source.removeEventListener.call(this.source, ...arguments);
    }

    hasEventListener(type: string): boolean {
      return this.source.hasEventListener.call(this.source, ...arguments);
    }

    dispatchEvent(event: egret.Event): boolean {
      return this.source.dispatchEvent.call(this.source, ...arguments);
    }

    willTrigger(type: string): boolean {
      return this.source.willTrigger.call(this.source, ...arguments);
    }

    get $hashCode(): number {
      return this.source.$hashCode;
    }

    get hashCode(): number {
      return this.source.hashCode;
    }

    private static lock = true;

    public static create<T>(): ArrayCollection<T> {
      ArrayCollection.lock = false;
      let a = new Proxy<ArrayCollection<T>>(new ArrayCollection(), {
        get: function (target, key: any, receiver) {
          try {
            if (!(key instanceof Symbol) && (+key) + '' === key) return target.get(key, receiver);
          } catch (e) {

          }
          return Reflect.get(target, key, receiver);
        },
        set: function (target, key: any, value, receiver) {
          try {
            if ((+key) + '' === key) return target.set(key, value, receiver) as any;
          } catch (e) {

          }
          return Reflect.set(target, key, value, receiver);
        }
      });
      ArrayCollection.lock = true;
      return a;
    }
  }

  /**
   * @internal
   * 遍历器
   */
  class ArrayCollectionIterator<T> implements Iterator<T> {

    public list: ArrayCollection<T>;

    private __nextIndex: number;
    private __nextObject: IteratorResult<T> = { "done": false, "value": null };

    public next(): IteratorResult<T> {
      let list = this.list;
      if (this.__nextIndex < list.length) {
        this.__nextObject.done = false;
        this.__nextObject.value = list[this.__nextIndex++];
        return this.__nextObject;
      }
      this.__nextObject.value = null;
      this.__nextObject.done = true;
      this.list = null;
      ArrayCollectionIterator.release<T>(this);
      return this.__nextObject;
    }

    private static pools = [];

    private static release<T>(iterator: ArrayCollectionIterator<T>): void {
      ArrayCollectionIterator.pools.push(iterator);
    }

    public static create<T>(list: ArrayCollection<T>): ArrayCollectionIterator<T> {
      let iterator = ArrayCollectionIterator.pools.length ? ArrayCollectionIterator.pools.pop() : new ArrayCollectionIterator<T>();
      iterator.__nextIndex = 0;
      iterator.list = list;
      return iterator;
    }
  }
}