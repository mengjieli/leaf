namespace tiny2d {

    /**
     * 力
     */
    export class Force extends ecs.Component  {

        v: Vector = new Vector();

        init(r: number, d: number) {
            this.v.init(Utils.cos(r), Utils.sin(r), d);
        }

    }

}