namespace syncData {

  export class UpdateEvent extends orange.Event {

    /**
     * 当前被更新的数据
     */
    public data: DataBase;

    /**
     * 通过哪个网络类更新的
     */
    public proxy: Proxy;

    /**
     * 数据在最后一个对象中的属性名
     */
    public name: string;

    /**
     * 相对于 root 数据的路径，比如 root.player.items.attribute 这里的 path 就是 player.items.attribute
     */
    public path: string;


    /**
     * @internal
     */
    static $proxy: Proxy;

    public static RESET_DATA: string = 'reset_data';

    private static ist: UpdateEventEmitter;

    public static get emitter(): UpdateEventEmitter {
      if (!UpdateEvent.ist) UpdateEvent.ist = new orange.EventEmitter() as any;
      return UpdateEvent.ist;
    }
  }

  export interface UpdateEventEmitter extends orange.EventEmitter {
    on(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
    once(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
    removeListener(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
  }
}