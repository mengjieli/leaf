namespace ecs {

    /**
     * @internal
     */
    export class StartSystem extends ComponentSystem {

        init() {
            super.init("start");
        }

        update(dt: number) {
            for (let node = this.query.head; node; node = node.next) {
                let value = node.value;
                if (value.awake && !value.$hasAwake) continue;
                this.query.remove(node.value);
                value.start();
            }
        }
    }

}