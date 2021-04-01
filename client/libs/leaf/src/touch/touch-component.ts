namespace leaf {

    export class TouchComponent extends ecs.Component {

        readonly onTouchStart = new ecs.Broadcast<TouchEvent>();

        readonly onTouchMove = new ecs.Broadcast<TouchEvent>();

        readonly onTouchEnd = new ecs.Broadcast<TouchEvent>();

        onDestroy() {
            this.onTouchStart.removeAll();
            this.onTouchMove.removeAll();
            this.onTouchEnd.removeAll();
        }
    }

}