namespace ecs {

    /**
     * @internal
     */
    export class UpdateSystem extends ComponentSystem {

        init() {
            super.init("update");
        }


        update(dt: number) {
            for (let node = this.query.head; node; node = node.next) {
                node.value.update(dt);
            }
        }
    }

}