namespace ecs {

    export interface IdObject {
        id: number | string;
    }

    export interface IReaonlyLink<T extends IdObject> {
        readonly head: Node<T>;
        readonly tail: Node<T>;
        readonly length: number;
    }

    export class Link<T extends IdObject> {

        public head: Node<T> = null;
        public tail: Node<T> = null;
        public length: number = 0;
        private nodes: { [index: number]: Node<T> } = {};

        static addCount = 0;
        static removeCount = 0;

        /**
         * @internal
         */
        static addPoints = new Link<{ id: number, call: Function }>();
        /**
         * @internal
         */
        static removePoints = new Link<{ id: number, call: Function }>();
        /**
         * @internal
         */
        static debugPoints = false;

        add(item: T): T {
            if (Link.debugPoints && Link.addPoints.length) {
                for (let node = Link.addPoints.head; node; node = node.next) {
                    if (node.value.id == item.id) {
                        node.value.call && node.value.call();
                        Link.addPoints.remove(node.value);
                    }
                }
            }
            Link.addCount++;
            let key = item.id;
            if (this.nodes[key] !== undefined) {
                return;
            }
            let node = ObjectPools.linkPool.length ? ObjectPools.linkPool.pop() : new Node<T>();
            node.key = key;
            node.value = item;
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                node.prev = this.tail;
                this.tail._next = node;
                this.tail = node;
            }
            this.length++;
            this.nodes[key] = node;
            return item;
        }

        remove(item: T) {
            if (Link.debugPoints && Link.removePoints.length) {
                for (let node = Link.removePoints.head; node; node = node.next) {
                    if (node.value.id == item.id) {
                        node.value.call && node.value.call();
                        Link.removePoints.remove(node.value);
                    }
                }
            }
            let key = item.id;
            Link.removeCount++;
            let node: Node<T> = this.nodes[key];
            if (node === undefined) return;
            if (node == this.head) {
                this.head = node._next;
            } else {
                node.prev._next = node._next;
            }
            if (node == this.tail) {
                this.tail = node.prev;
            } else {
                node._next.prev = node.prev;
            }
            this.length--;
            delete this.nodes[key];
            let value = node.value;
            node.value = null;
            // node.prev = node.next = null;
            ObjectPools.linkPrePool.push(node);
            return value;
        }

        get toArray(): T[] {
            let list = [];
            for (let node = this.head; node; node = node.next) {
                list.push(node.value);
            }
            return list;
        }

        hasId(key: number | string): boolean {
            return this.nodes[key] !== undefined;
        }

        has(item: T): boolean {
            return this.nodes[item.id] !== undefined;
        }

        get(item: T): T {
            if (this.nodes[item.id] === undefined) return;
            return this.nodes[item.id].value;
        }

        getById(id: number | string): T {
            if (this.nodes[id] === undefined) return;
            return this.nodes[id].value;
        }

        clear(releaseValue = false) {
            if (this.length == 0) return;
            for (let node = this.head, next = null; node;) {
                if (releaseValue && node.value) {
                    ObjectPools.releaseRecyableObject(node.value as any);
                }
                next = node._next;
                node.value = null;
                ObjectPools.linkPrePool.push(node);
                node = next;
                Link.removeCount++;
            }
            this.nodes = {};
            this.length = 0;
            this.head = this.tail = null;
        }
    }

    export interface IReadOnlyNode<T extends IdObject> {

        readonly prev: IReadOnlyNode<T>;
        readonly value: T;
        readonly next: IReadOnlyNode<T>;

    }

    export class Node<T extends IdObject> {

        public key: number | string;
        public prev: Node<T> = null;
        public value: T = null;
        /**
         * @internal
         */
        _next: Node<T> = null;

        get next(): Node<T> {
            let val = this._next;
            if (!val || val.value) return val;
            while (val && !val.value) {
                val = val._next;
            }
            return val;
        }

        constructor() {

        }
    }
}