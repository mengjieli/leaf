export declare class EventDispatcher {
    __EventDispatcher: any;
    __hasDispose: boolean;
    constructor(target?: any);
    readonly hasDispose: boolean;
    destroy(): void;
    $release(): void;
    /**
     *
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     */
    once(type: any, listener: any, thisObject: any, priority?: number, args?: any): void;
    /**
     *
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     */
    addListener(type: any, listener: any, thisObject: any, priority?: number, args?: any): void;
    /**
     * 监听事件
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     * @param once
     * @private
     */
    __addListener(type: any, listener: any, thisObject: any, priority: any, once: any, args: any): boolean;
    removeListener(type: any, listener: any, thisObject: any): void;
    removeAllListener(): void;
    hasListener(type: any): boolean;
    dispatch(event: any): void;
    dispatchWith(type: any, data?: any): void;
}
