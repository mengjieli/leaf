namespace leaf {

    export class RectMask extends ecs.Component {

        x: number;

        y: number;

        width: number;

        height: number;

        init(x = 0, y = 0, w = 0, h = 0) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }

    }

}