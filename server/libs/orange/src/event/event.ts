namespace orange {

    /**
     * @internal
     */
    export var $eventSymbol = Symbol("orange event");

    /**
     * 监听事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    export function on(target: any, type: string, back: (e: orange.Event) => void, owner?: any): void {
        target[$eventSymbol] || (target[$eventSymbol] = {});
        target[$eventSymbol][type] || (target[$eventSymbol][type] = []);
        let list = target[$eventSymbol][type];
        for (let item of list) {
            if (item.back === back && item.owner == owner && item.hasDelete === false) {
                return;
            }
        }
        target[$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false
        });
    }

    /**
     * @internal
     * 监听事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    export function $onAt(target: any, type: string, back: (e: orange.Event) => void, owner?: any, index: number = -1): void {
        target[$eventSymbol] || (target[$eventSymbol] = {});
        target[$eventSymbol][type] || (target[$eventSymbol][type] = []);
        let list = target[$eventSymbol][type];
        for (let item of list) {
            if (item.back == back && item.owner == owner) {
                return;
            }
        }
        index < 0 ? target[$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false
        }) : target[$eventSymbol][type].splice(index, 0, {
            'back': back,
            'owner': owner,
            'hasDelete': false
        });
    }

    /**
     * 监听事件，回调函数调用一次后自动取消监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    export function once(target: any, type: string, back: (e: orange.Event) => void, owner?: any): void {
        target[$eventSymbol] || (target[$eventSymbol] = {});
        target[$eventSymbol][type] || (target[$eventSymbol][type] = []);
        let list = target[$eventSymbol][type];
        for (let item of list) {
            if (item.back == back && item.owner == owner && item.hasDelete === false) {
                return;
            }
        }
        target[$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false,
            'once': true
        });
    }

    /**
     * 抛出事件
     * @param target 抛事件的对象
     * @param event 事件
     */
    export function emit(target: any, event: Event) {
        event.$target = target;
        target[$eventSymbol] || (target[$eventSymbol] = {});
        if (target[$eventSymbol][event.type]) {
            let list = target[$eventSymbol][event.type];
            let hasDelete = false;
            for (let item of list) {
                if (item.once === true) {
                    if (item.hasDelete === false) {
                        item.hasDelete = true;
                        item.back.call(item.owner, event);
                    }
                    hasDelete = true;
                } else {
                    if (!item.hasDelete) item.back.call(item.owner, event);
                    else hasDelete = true;
                }
                if (event.isStop) break;
            }
            if (hasDelete) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].hasDelete) {
                        list.splice(i, 1);
                        i--;
                    }
                }
                if (!list.length) {
                    delete target[$eventSymbol][event.type];
                }
            }
        }
    }

    /**
     * 抛出事件，会自动创建一个 orange.Event
     * @param target 抛事件的对象
     * @param type 事件类型
     * @param data 事件携带的数据
     */
    export function emitWith(target: any, type: string, data?: any) {
        let e = Event.create(type, data);
        emit(target, e);
        Event.release(e);
    }

    /**
     * 移除某个事件监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    export function removeListener(target: any, type: string, back: Function, owner?: any): void {
        if (target[$eventSymbol] && target[$eventSymbol][type]) {
            let list = target[$eventSymbol][type];
            for (let item of list) {
                if (item.back == back && item.owner == owner && item.hasDelete === false) {
                    item.hasDelete = true;
                    break;
                }
            }
        }
    }

    /**
     * 是否有对象监听某个事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     */
    export function hasListener(target: any, type: string): boolean {
        if (target[$eventSymbol] && target[$eventSymbol][type]) {
            return target[$eventSymbol][type].length;
        }
        return false;
    }

    /**
     * 移除所有的事件监听
     * @param target 
     */
    export function removeAllListeners(target: any) {
        target[$eventSymbol] = {};
    }

    export class Event {

        /**
         * @internal
         */
        $type;
        /**
         * @internal
         */
        $cycle = false;
        /**
         * @internal
         */
        $target = null;

        public data;

        constructor(type: string) {
            this.$type = type;
        }

        get type() {
            return this.$type;
        }

        get target() {
            return this.$target;
        }

        /**
         * @internal
         */
        private $isStop: boolean = false;

        /**
         * 事件是否停止，停止后后面的对象无法监听到事件
         */
        get isStop(): boolean {
            return this.$isStop;
        }

        /**
         * 停止事件，停止后后面的对象无法监听到事件
         */
        stop(): void {
            this.$isStop = true;
        }

        clone(): orange.Event {
            return orange.Event.create(this.type, this.data);
        }

        static SEND = "send";
        static DATA = "data";
        static COMPLETE = "complete";
        static CONNECT = "connect";
        static CONNECT_ERROR = "connect_error";
        static RECONNECT = 'reconnect';
        static CLOSE = "close";
        static CHANGE = "change";
        static ERROR = "error";

        /**
         * @internal
         */
        static _eventPool: Map<any, Array<Event>> = new Map<any, Array<Event>>();

        static create(type, data = null, clazz: any = Event) {
            var e;
            if (!Event._eventPool.get(clazz) || !Event._eventPool.get(clazz).length) {
                e = new clazz(type);
            } else {
                e = Event._eventPool.get(clazz).pop();
                e.$cycle = false;
            }
            e.$isStop = false;
            e.$type = type;
            e.data = data;
            return e;
        }

        static release(e) {
            if (e.$cycle) {
                return;
            }
            e.$cycle = true;
            e.data = null;
            e.$target = null;
            if (!Event._eventPool.get(e.__proto__.constructor)) {
                Event._eventPool.set(e.__proto__.constructor, []);
            }
            Event._eventPool.get(e.__proto__.constructor).push(e);
        }
    }
}