namespace leaf {

    export abstract class Render extends ecs.Component {

        readonly shader: Shader;

        static allowMultiply = false;

        blendMode: BlendMode = BlendMode.NONE;

        onDestroy() {
        }

        abstract preRender();

    }

}