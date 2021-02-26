namespace leaf {

    export abstract class Render extends ecs.Component {

        readonly shader: Shader;

        static allowMultiply = false;

        alpha: number = 1;

        blendMode: BlendMode = BlendMode.NONE;

        onDestroy() {
            this.alpha = 1;
        }

        abstract preRender();

    }

}