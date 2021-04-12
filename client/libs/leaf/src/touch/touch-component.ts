namespace leaf {

    export class TouchComponent extends ecs.Component {

        static allowMultiply = false;

        readonly onTouchStart = new ecs.Broadcast<TouchEvent>();

        readonly onTouchMove = new ecs.Broadcast<TouchEvent>();

        readonly onTouchEnd = new ecs.Broadcast<TouchEvent>();

        touchEnabled = true;

        touchChildrenEnabled = true;

        stopChildrenEvent = false;

        onDestroy() {
            this.touchEnabled = this.touchChildrenEnabled = true;
            this.onTouchStart.removeAll();
            this.onTouchMove.removeAll();
            this.onTouchEnd.removeAll();
        }
    }

}