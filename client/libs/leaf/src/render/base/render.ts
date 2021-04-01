namespace leaf {

    export class Render extends ecs.Component {

        readonly shader: Shader;

        static allowMultiply = false;

        blendMode: BlendMode = BlendMode.NONE;

        onDestroy() {
        }

        preRender() {

        }

        get width() {
            return 0;
        }

        get height() {
            return 0;
        }
    }

}