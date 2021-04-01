namespace leaf {

    export class TouchManager {

        static start(touchId: number, touchX: number, touchY: number) {
            console.error("start", touchId, touchX, touchY, touchX / leaf.world.root.transform.scaleX, touchY / leaf.world.root.transform.scaleY);

        }

        static move(touchId: number, touchX: number, touchY: number) {
            console.error("move", touchId, touchX, touchY);
        }

        static end(touchId: number, touchX: number, touchY: number) {
            console.error("end", touchId, touchX, touchY);
        }

    }

}