namespace leaf {


    export interface ScollerTarget extends ecs.Component {
        viewPort: ecs.Transform;
        contentWidth: number;
        contentHeight: number;
        width: number;
        height: number;
        refresh?: Function;
    }

}