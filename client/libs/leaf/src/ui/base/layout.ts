namespace leaf {


    export class Layout extends ecs.Component {

        readonly itemWidth: number;

        readonly itemHeight: number;

        updatePosition?(item: ecs.Entity, index: number, max: number, width: number, height: number);

        getPosition?(index: number, max: number, width: number, height: number): { x: number, y: number };
    }


}