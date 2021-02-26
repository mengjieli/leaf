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

        $setParent(val: Entity) {
            if (this.world && this.world.$scene === this) {
                this.world.$scene = null;
            }
            super.$setParent(val);
        }

        destroy() {
            super.destroy();
            ecs.ObjectPools.releaseIds();
        }

    }
}