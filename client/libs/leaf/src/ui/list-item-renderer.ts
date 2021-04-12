namespace leaf {


    export abstract class ListItemRenderer<T> extends ecs.Component {

        data: T;

        onData?(data?: T);

        onDestroy() {
            this.data = null;
        }

    }

}