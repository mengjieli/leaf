namespace ecs {

    export class Scene extends Entity {

        constructor() {
            super();
            ecs.ObjectPools.setId(this);
            Entity.realNewCount++;
            Entity.newCount++;
            Entity.aliveCount++;
            Entity.onCreateEntity && Entity.onCreateEntity(this);
        }

        $setParent(val: Entity, index: number = -1) {
            if (this.world && this.world.$scene === this) {
                this.world.$scene = null;
            }
            super.$setParent(val, index);
        }

        destroy() {
            super.destroy();
            ecs.ObjectPools.releaseIds();
        }

    }
}