namespace leaf {

    export class TouchEvent {

        touchId: number;

        localX: number;

        localY: number;

        stageX: number;

        stageY: number;

        target: ecs.Entity;

        currentTarget: ecs.Entity;
    }

}