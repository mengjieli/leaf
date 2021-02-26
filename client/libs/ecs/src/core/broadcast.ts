namespace ecs {

    export class Broadcast<T> {

        /**
         * @internal
         */
        private bindings: ListenerBinding<T>[] = [];

        on(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T> {
            var binding = new ListenerBinding(listener, listenerContext, false, this);
            this.bindings.push(binding);
            return binding;
        }

        once(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T> {
            var binding = new ListenerBinding(listener, listenerContext, true, this);
            this.bindings.push(binding);
            return binding;
        }

        dispatch(...params: T[]) {
            var flag = false;
            for (let item of this.bindings) {
                if (!item.hasDestroyed) {
                    item.execute.apply(item, params);
                } else {
                    flag = true;
                }
            }
            if (flag) {
                for (let i = 0; i < this.bindings.length; i++) {
                    if (this.bindings[i].hasDestroyed) {
                        this.bindings.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        get(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T> {
            for (let item of this.bindings) {
                if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed) return item;
            }
            return null;
        }

        has(listener: (...params: T[]) => void, listenerContext?: any): boolean {
            for (let item of this.bindings) {
                if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed) return true;
            }
            return false;
        }

        remove(listener: (...params: T[]) => void, listenerContext?: any) {
            for (let item of this.bindings) {
                if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed) {
                    return item.destroy();
                }
            }
        }

        removeAll() {
            while (this.bindings.length) {
                this.bindings.pop().destroy();
            }
        }
    }

    export class ListenerBinding<T> {

        constructor(listener: (...params: T[]) => void, listenerContext: any, once: boolean, boradcast: Broadcast<T>) {
            this.listener = listener;
            this.listenerContext = listenerContext;
            this.once = once;
            this.broadcast = boradcast;
            this.hasDestroyed = false;
        }

        readonly listener: (...params: T[]) => void;

        readonly listenerContext: any;

        readonly once: boolean;

        readonly broadcast: Broadcast<T>;

        readonly hasDestroyed: boolean;

        execute(...params: T[]): any {
            if (!this.hasDestroyed) {
                let result = this.listener.apply(this.listenerContext, params);
                if (this.once) {
                    this.destroy();
                }
                return result;
            }
            return null;
        }

        destroySelf = () => {
            this.destroy();
        }

        destroy(): void {
            (this.listener as any) = null;
            (this.listenerContext as any) = null;
            (this.once as any) = null;
            (this.broadcast as any) = null;
            (this.hasDestroyed as any) = true;
        }
    }
}